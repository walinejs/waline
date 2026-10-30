'use strict';

/**
 * Middleware for the sharded store: flush before the response, plus the
 * /csv-store/* ops endpoints.
 *
 * Flushing at the end of every request is what makes "200 OK" mean "already
 * persisted": a serverless instance is frozen after responding, so the
 * FLUSH_INTERVAL timer alone would lose whatever was still in memory. The ops
 * endpoints are intercepted before Waline's routes, or they would hit a 404
 * first.
 */

const { createHmac, timingSafeEqual } = require('node:crypto');

const { getStore } = require('./store.js');
const { TABLES } = require('./csv-shard-cache.js');

// ---------------------------------------------------------------------------
// Administrator authentication
// ---------------------------------------------------------------------------

/**
 * Minimal HS256 JWT verification.
 *
 * jsonwebtoken is not required here because it is an internal dependency whose
 * resolution depends on node_modules hoisting and may fail under certain
 * bundling/externalization combinations. Only verification and expiry are
 * needed, which node:crypto covers in twenty lines, and the payload stays
 * compatible with how Waline signs (jwt.sign(userId, jwtKey) signs a bare
 * string).
 */
function verifyHs256(token, secret) {
  const parts = String(token).split('.');

  if (parts.length !== 3 || !secret) {
    return null;
  }
  const [header, payload, signature] = parts;
  const expected = createHmac('sha256', secret).update(`${header}.${payload}`).digest();
  let actual;

  try {
    actual = Buffer.from(signature, 'base64url');
  } catch {
    return null;
  }

  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
    return null;
  }

  let claims;

  try {
    claims = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
  } catch {
    // jsonwebtoken leaves a non-object payload unquoted, so the segment is the
    // bare string that was signed (Waline signs an objectId)
    claims = Buffer.from(payload, 'base64url').toString('utf8');
  }

  if (claims && typeof claims === 'object' && claims.exp && Date.now() >= claims.exp * 1000) {
    return null;
  }

  // Waline's payload is a bare string; the object form is also accepted
  if (typeof claims === 'string') {
    return claims || null;
  }

  return claims?.objectId ?? claims?.id ?? claims?.userId ?? null;
}

// Whether the current request comes from an administrator, matching Waline's
// login and permission semantics.
async function isAdministrator(ctx, cache) {
  // Authorization header only: a token in the URL ends up in proxy logs and
  // browser history
  const token = ctx.get('authorization').replace(/^Bearer /iu, '');

  if (!token) {
    return false;
  }
  // Prefer the jwtKey injected by the Waline runtime (think is the global thinkjs
  // object); fall back to the exact same resolution @waline/vercel's config.js uses
  const jwtKey =
    globalThis.think?.config?.('jwtKey') || process.env.JWT_TOKEN || process.env.GITHUB_TOKEN;
  const objectId = verifyHs256(token, jwtKey);

  if (!objectId) {
    return false;
  }
  await cache.ensureFresh();

  return (await cache.getRow('Users', objectId))?.row?.type === 'administrator';
}

// ---------------------------------------------------------------------------
// Ops endpoints
// ---------------------------------------------------------------------------

const ADMIN_ROUTE = /\/csv-store\/(?<action>[a-z]+)\/?$/u;

// Destructive actions require an explicit confirm, so a stray click or crawler
// cannot wipe history.
const isConfirmed = (value) =>
  ['1', 'true', 'yes'].includes(String(value ?? '').trim().toLowerCase());

async function handleAdminRequest(ctx, action) {
  const { cache, queue, snapshot, manager, github, logger } = getStore();

  if (!(await isAdministrator(ctx, cache))) {
    ctx.status = 401;
    ctx.body = { errno: 1, errmsg: '需要管理员身份' };

    return;
  }

  try {
    switch (`${action}:${ctx.method}`) {
      case 'snapshot:POST': {
        const created = await snapshot.createSnapshot();
        const pruned = await snapshot.pruneSnapshots();

        ctx.body = { errno: 0, data: { created, pruned } };

        return;
      }
      case 'snapshot:GET':
        ctx.body = { errno: 0, data: { snapshots: await snapshot.listSnapshots() } };

        return;
      case 'restore:POST': {
        const date = ctx.request.body?.date || ctx.query?.date;

        ctx.body = { errno: 0, data: await snapshot.restore(date) };

        return;
      }
      case 'compact:POST': {
        const result = {};

        for (const table of TABLES) {
          result[manager.tableDir(table)] = await cache.compact(table);
        }
        await queue.flush();

        ctx.body = { errno: 0, data: result };

        return;
      }
      case 'repair:POST': {
        // Move rows left misplaced by a page rename back to their canonical shard.
        // Refresh normally does this on its own; the endpoint exists for callers
        // who want the result now, or want the report.
        const result = {};

        for (const table of TABLES) {
          result[manager.tableDir(table)] = await cache.repairMisplaced(table);
        }
        await queue.flush();

        ctx.body = { errno: 0, data: result };

        return;
      }
      case 'rebuild:POST': {
        // Reconcile the repository's real files and repair the manifest, for after
        // shards were edited by hand. Flush local changes first so the following
        // remote-wins reload does not wash them out.
        await queue.flush();

        const result = await cache.syncFromTree();

        await queue.flush();
        ctx.body = { errno: 0, data: result };

        return;
      }
      case 'flush:POST':
        ctx.body = { errno: 0, data: await queue.flush() };

        return;
      case 'reset:POST': {
        // Irreversible: discards every historical commit, keeping current data
        const confirm = ctx.request.body?.confirm ?? ctx.query?.confirm;

        if (!isConfirmed(confirm)) {
          ctx.status = 400;
          ctx.body = { errno: 1, errmsg: '重置会丢弃全部历史提交，请显式传 confirm=1' };

          return;
        }
        await queue.flush();
        ctx.body = {
          errno: 0,
          data: await snapshot.resetRepository({
            keepSnapshots: isConfirmed(
              ctx.request.body?.keepSnapshots ?? ctx.query?.keepSnapshots,
            ),
          }),
        };

        return;
      }
      case 'stats:GET': {
        const tables = {};
        const misplaced = {};

        for (const table of TABLES) {
          const state = cache.tables[table];

          tables[table] = state.shards.size;
          misplaced[table] = [...state.aliases.values()].reduce((sum, paths) => sum + paths.size, 0);
        }
        ctx.body = {
          errno: 0,
          data: {
            queue: queue.stats,
            githubRequests: github.requestCount,
            shards: tables,
            // Shards still holding misplaced rows; non-zero means data has not
            // been moved back to its canonical family yet
            misplaced,
            pending: cache.pending.size,
            lastRefresh: cache.lastRefresh,
          },
        };

        return;
      }
      default:
        ctx.status = 404;
        ctx.body = { errno: 1, errmsg: `不支持的运维操作：${action} ${ctx.method}` };
    }
  } catch (err) {
    logger.error?.(`[csv-store] 运维操作 ${action} 失败：`, err);
    ctx.status = 500;
    ctx.body = { errno: 1, errmsg: err.message };
  }
}

/**
 * Waline plugin object.
 *
 * Order is critical — ops endpoints must be intercepted before Waline's routes,
 * and flush has to happen after business processing but before the response
 * goes out. The host server runs plugin middlewares between logic and
 * controller (see ../middleware/plugin.js).
 */
const csvStorePlugin = {
  middlewares: [
    async (ctx, next) => {
      const matched = ADMIN_ROUTE.exec(ctx.path);

      if (matched) {
        await handleAdminRequest(ctx, matched.groups.action);

        return;
      }

      let businessError = null;

      try {
        await next();
      } catch (err) {
        businessError = err;
      }

      try {
        await getStore().queue.flush();
      } catch (err) {
        if (businessError) {
          console.error('[csv-store] 业务异常且落盘失败：', err);
        } else {
          // A write that never persisted must not answer 200, or the user
          // believes the comment was saved
          console.error('[csv-store] 评论落盘失败：', err);
          ctx.status = 500;
          ctx.body = { errno: 1, errmsg: '评论存储提交失败，请稍后重试' };

          return;
        }
      }

      if (businessError) {
        throw businessError;
      }

      try {
        await getStore().snapshot.maybeRunDaily();
      } catch (err) {
        // A failed snapshot must not affect normal requests
        console.error('[csv-store] 每日快照失败：', err);
      }
    },
  ],
};

module.exports = { csvStorePlugin, handleAdminRequest, isAdministrator, verifyHs256, ADMIN_ROUTE };
