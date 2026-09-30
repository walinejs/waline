/* oxlint-disable unicorn/catch-error-name, eslint/one-var, eslint/max-statements, eslint/id-length, eslint/curly, eslint/no-console, eslint/max-lines-per-function, eslint/complexity, eslint/prefer-destructuring, typescript/explicit-module-boundary-types, typescript/explicit-function-return-type, typescript/consistent-type-definitions, typescript/no-explicit-any, typescript/no-non-null-assertion, typescript/no-redundant-type-constituents, typescript/no-unnecessary-type-conversion, typescript/strict-boolean-expressions, typescript/no-unsafe-call, typescript/no-unsafe-member-access, typescript/no-unsafe-argument, typescript/no-unsafe-assignment, typescript/prefer-nullish-coalescing, typescript/no-unnecessary-type-assertion, typescript/require-await, typescript/no-base-to-string, promise/prefer-await-to-callbacks */
import { createWalineCore, WalineError } from '@waline/core';
import type {
  CreateWalineCoreOptions,
  WalineContext,
  WalineCore,
  WalineModels,
  WalineServices,
} from '@waline/core';
import { Hono } from 'hono';
import type { Context } from 'hono';
import { cors } from 'hono/cors';

import packageJson from '../package.json' with { type: 'json' };
import { createD1Models } from './d1.js';
import { createDefaultServices } from './services.js';
import type {
  Resolvable,
  WalineWorkerBindings,
  WalineWorkerOptions,
  WorkerResolverContext,
} from './types.js';

const VERSION = packageJson.version;
const isFalse = (value: unknown): boolean =>
  typeof value === 'string' && ['0', 'false'].includes(value.toLowerCase());
const split = (value: unknown): string[] | undefined =>
  typeof value === 'string' ? value.split(/\s*,\s*/u).filter(Boolean) : undefined;

const resolve = async <T, B extends object>(
  value: Resolvable<T, B> | undefined,
  context: WorkerResolverContext<B>,
): Promise<T | undefined> =>
  typeof value === 'function'
    ? (value as (context: WorkerResolverContext<B>) => T | Promise<T>)(context)
    : value;

const queries = (context: Context): Record<string, string | string[]> => {
  const output: Record<string, string | string[]> = {};
  for (const [key, values] of Object.entries(context.req.queries()))
    output[key] = values.length === 1 ? values[0] : values;
  return output;
};

const body = async (context: Context): Promise<Record<string, any>> => {
  if (!context.req.header('content-type')?.includes('application/json')) {
    const parsed = await context.req.parseBody({ all: true });
    return parsed as Record<string, any>;
  }
  return context.req.json<Record<string, any>>().catch(() => ({}));
};

const success = (context: Context, data?: unknown, raw = false): Response =>
  raw ? context.json(data) : context.json(data === undefined ? { errno: 0 } : { errno: 0, data });

const errorResponse = (context: Context, error: unknown): Response => {
  if (error instanceof WalineError) {
    if (error.status === 401 || error.status === 403)
      return context.json({ errno: error.status, errmsg: error.code }, error.status);
    return context.json(
      { errno: 1001, errmsg: error.messageKey ?? error.code, data: error.details },
      error.status as 400 | 500 | 501,
    );
  }
  console.error(error);
  return context.json({ errno: 500, errmsg: 'Internal Server Error' }, 500);
};

const serverUrl = (request: Request): string => {
  const url = new URL(request.url);
  return `${url.protocol}//${url.host}${url.pathname.replace(/\/(?:api\/.*|ui\/.*)?$/u, '')}`.replace(
    /\/$/u,
    '',
  );
};

const dashboard = (
  bindings: WalineWorkerBindings,
  services: { name: string; origin?: string }[],
  asset?: string,
): string => `<!doctype html>
<html><head><meta charset="utf-8"><title>Waline Management System</title><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body><script>
window.SITE_URL=${JSON.stringify(bindings.SITE_URL)};
window.SITE_NAME=${JSON.stringify(bindings.SITE_NAME)};
window.recaptchaV3Key=${JSON.stringify(bindings.RECAPTCHA_V3_KEY)};
window.turnstileKey=${JSON.stringify(bindings.TURNSTILE_KEY)};
window.oauthServices=${JSON.stringify(services)};
window.serverURL=new URL('/api/',location.href).href;
</script><script src="${asset ?? String(bindings.WALINE_ADMIN_MODULE_ASSET_URL ?? '//unpkg.com/@waline/admin')}"></script></body></html>`;

const escapeXml = (value: unknown): string =>
  String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

export const createWalineWorker = <Bindings extends object = WalineWorkerBindings>(
  options: WalineWorkerOptions<Bindings> = {},
) => {
  type Environment = { Bindings: Bindings };
  interface RuntimeState {
    bindings: Bindings & WalineWorkerBindings;
    context: WalineContext;
    core: WalineCore;
    models: WalineModels;
    services: WalineServices;
  }
  const app = new Hono<Environment>();

  app.use('*', cors());
  app.use('*', async (context, next) => {
    context.header('x-waline-version', VERSION);
    await next();
  });

  const runtime = async (context: Context<Environment>) => {
    const bindings = (context.env ?? {}) as Bindings & WalineWorkerBindings;
    const requestContext: WorkerResolverContext<Bindings> = {
      bindings,
      context,
      request: context.req.raw,
    };
    const oauthServices = options.oauthServices ?? [];
    const baseContext: WalineContext = {
      headers: Object.fromEntries(context.req.raw.headers),
      state: { oauthServices },
      ip:
        context.req.header('cf-connecting-ip') ??
        context.req.header('x-forwarded-for')?.split(',')[0]?.trim(),
      origin: context.req.header('origin'),
      referrer: context.req.header('referer'),
      requestUrl: context.req.url,
      serverUrl: serverUrl(context.req.raw),
      signal: context.req.raw.signal,
    };
    const secureDomains = split(bindings.SECURE_DOMAINS);
    if (secureDomains?.length && !['/api/comment/rss', '/comment/rss'].includes(context.req.path)) {
      let checked = '';
      try {
        checked = baseContext.referrer
          ? new URL(baseContext.referrer).hostname
          : baseContext.origin
            ? new URL(baseContext.origin).hostname
            : '';
      } catch {
        throw new WalineError('FORBIDDEN', 403);
      }
      if (
        ![
          ...secureDomains,
          'localhost',
          '127.0.0.1',
          ...oauthServices.map((item) => item.origin ?? ''),
        ].some((domain) => domain === checked)
      )
        throw new WalineError('FORBIDDEN', 403);
    }
    const providedCore = await resolve(options.core, requestContext);
    let models: WalineModels;
    let services: WalineServices;
    let coreOptions: CreateWalineCoreOptions;
    if (providedCore) coreOptions = providedCore;
    else {
      models =
        (await resolve(options.models, requestContext)) ??
        (bindings.DB
          ? createD1Models(bindings.DB, { tablePrefix: options.tablePrefix })
          : (undefined as never));
      if (!models) throw new Error('A D1 DB binding or options.models is required');
      const defaults = createDefaultServices(bindings);
      services = { ...defaults, ...(await resolve(options.services, requestContext)) };
      coreOptions = {
        models,
        services,
        hooks: await resolve(options.hooks, requestContext),
        logger: (await resolve(options.logger, requestContext)) ?? console,
        config: {
          audit: Boolean(bindings.COMMENT_AUDIT && !isFalse(bindings.COMMENT_AUDIT)),
          avatarProxy:
            typeof bindings.AVATAR_PROXY === 'string' && !isFalse(bindings.AVATAR_PROXY)
              ? bindings.AVATAR_PROXY
              : '',
          disableRegion: Boolean(bindings.DISABLE_REGION && !isFalse(bindings.DISABLE_REGION)),
          disableUserAgent: Boolean(
            bindings.DISABLE_USERAGENT && !isFalse(bindings.DISABLE_USERAGENT),
          ),
          forceLogin: bindings.LOGIN === 'force',
          ipQps: Number(bindings.IPQPS ?? 60),
          levels:
            bindings.LEVELS && !isFalse(bindings.LEVELS)
              ? split(bindings.LEVELS)?.map(Number)
              : false,
          likeIncMax: 1,
          normalUserType: 'guest',
          ...(await resolve(options.config, requestContext)),
        },
      };
    }
    models = coreOptions.models;
    services = coreOptions.services ?? {};
    const core = createWalineCore(coreOptions);
    const authorization = context.req.header('authorization');
    const stateToken = queries(context).state;
    const token =
      typeof stateToken === 'string' ? stateToken : authorization?.replace(/^Bearer /u, '');
    if (token) {
      const session = await core.auth.resolveSession({ token }, baseContext);
      if (session) {
        const { token: resolvedToken, ...userInfo } = session;
        baseContext.state.userInfo = userInfo;
        baseContext.state.token = resolvedToken;
      }
    }
    return { bindings, context: baseContext, core, models, services };
  };

  const run =
    (
      handler: (runtime: RuntimeState, context: Context<Environment>) => unknown | Promise<unknown>,
      raw = false,
    ) =>
    async (context: Context<Environment>): Promise<Response> => {
      try {
        const state = await runtime(context);
        return success(context, await handler(state, context), raw);
      } catch (error) {
        try {
          await options.onError?.(error, {
            headers: Object.fromEntries(context.req.raw.headers),
            state: {},
          });
        } catch {
          /* ignore error observer failures */
        }
        return errorResponse(context, error);
      }
    };

  app.get('/', (context) =>
    context.html(
      `<!doctype html><html><head><meta charset="utf-8"><title>Waline Worker</title></head><body><div id="waline"></div><link href="//unpkg.com/@waline/client@v3/dist/waline.css" rel="stylesheet"><script type="module">import{init}from'https://unpkg.com/@waline/client@v3/dist/waline.js';init({el:'#waline',serverURL:location.href.replace(/\\/$/,'')});</script></body></html>`,
    ),
  );
  app.get('/ui/*', async (context) =>
    context.html(
      dashboard(
        (context.env ?? {}) as Bindings & WalineWorkerBindings,
        options.oauthServices ?? [],
        options.adminAssetUrl,
      ),
    ),
  );
  app.get('/ui', (context) => context.redirect('/ui/'));

  const addRoutes = (prefix: string, deprecated: boolean): void => {
    const wrap = <T extends (context: Context<Environment>) => Promise<Response>>(handler: T): T =>
      (async (context: Context<Environment>) => {
        if (deprecated) {
          context.header('deprecation', 'true');
          (context as any).set?.('deprecated', true);
        }
        return handler(context);
      }) as T;
    app.get(
      `${prefix}/comment`,
      wrap(
        run(({ core, context }, request) => {
          context.state.deprecated = deprecated;
          const input = queries(request);
          if (input.type === 'recent') return core.comment.listRecent(input, context);
          if (input.type === 'count') return core.comment.count(input, context);
          if (input.type === 'list') return core.comment.listForAdmin(input, context);
          return core.comment.list(input as any, context);
        }, deprecated),
      ),
    );
    app.post(
      `${prefix}/comment`,
      wrap(
        run(async ({ core, context }, request) => {
          const input = await body(request);
          return core.comment.create(
            {
              ...input,
              captcha: { turnstile: input.turnstile, recaptchaV3: input.recaptchaV3 },
            } as any,
            context,
          );
        }),
      ),
    );
    app.put(
      `${prefix}/comment/:id`,
      wrap(
        run(async ({ core, context }, request) =>
          core.comment.update(
            { objectId: request.req.param('id')!, data: await body(request) },
            context,
          ),
        ),
      ),
    );
    app.delete(
      `${prefix}/comment/:id`,
      wrap(
        run(({ core, context }, request) =>
          core.comment.remove({ objectId: request.req.param('id')! }, context),
        ),
      ),
    );
    app.get(
      `${prefix}/article`,
      wrap(
        run(({ core, context }, request) => {
          context.state.deprecated = deprecated;
          return core.counter.get(queries(request), context);
        }, deprecated),
      ),
    );
    app.post(
      `${prefix}/article`,
      wrap(
        run(async ({ core, context }, request) => {
          context.state.deprecated = deprecated;
          return core.counter.update((await body(request)) as any, context);
        }, deprecated),
      ),
    );
    app.get(
      `${prefix}/user`,
      wrap(
        run(({ core, context }, request) => {
          const input = queries(request);
          return typeof input.email === 'string'
            ? core.user.get(input as any, context)
            : core.user.list(input as any, context);
        }),
      ),
    );
    app.post(
      `${prefix}/user`,
      wrap(
        run(async ({ core, context }, request) =>
          core.user.register((await body(request)) as any, context),
        ),
      ),
    );
    app.put(
      `${prefix}/user/password`,
      wrap(
        run(async ({ core, context }, request) =>
          core.auth.requestPasswordReset((await body(request)) as any, context),
        ),
      ),
    );
    app.put(
      `${prefix}/user/:id?`,
      wrap(
        run(async ({ core, context }, request) =>
          core.user.update(
            { objectId: request.req.param('id') || undefined, data: await body(request) },
            context,
          ),
        ),
      ),
    );
    app.delete(
      `${prefix}/user/:id`,
      wrap(
        run(({ core, context }, request) =>
          core.user.remove({ objectId: request.req.param('id')! }, context),
        ),
      ),
    );
    app.get(`${prefix}/token`, wrap(run(({ context }) => context.state.userInfo)));
    app.post(
      `${prefix}/token`,
      wrap(
        run(async ({ core, context }, request) => ({
          ...(await core.auth.login((await body(request)) as any, context)),
          password: null,
        })),
      ),
    );
    app.delete(`${prefix}/token`, wrap(run(() => Promise.resolve())));
    app.get(
      `${prefix}/token/2fa`,
      wrap(
        run(({ core, context }, request) => {
          const input = queries(request);
          return input.email
            ? core.auth.getTwoFactorStatus(input as any, context)
            : core.auth.createTwoFactorSecret(input, context);
        }),
      ),
    );
    app.post(
      `${prefix}/token/2fa`,
      wrap(
        run(async ({ core, context }, request) =>
          core.auth.enableTwoFactor((await body(request)) as any, context),
        ),
      ),
    );
    app.get(
      `${prefix}/verification`,
      wrap(async (request) => {
        try {
          const { core, context } = await runtime(request);
          await core.verification.verifyEmail(queries(request) as any, context);
          return request.redirect('/ui/login');
        } catch (error) {
          return errorResponse(request, error);
        }
      }),
    );
    app.get(
      `${prefix}/oauth`,
      wrap(async (request) => {
        try {
          const input = queries(request) as Record<string, string>;
          const oauthUrl = String(
            ((request.env ?? {}) as Bindings & WalineWorkerBindings).OAUTH_URL ??
              'https://oauth.lithub.cc',
          );
          if (!input.code) {
            const callback = new URL(`${serverUrl(request.req.raw)}${prefix}/oauth`);
            if (input.redirect) callback.searchParams.set('redirect', input.redirect);
            if (input.type) callback.searchParams.set('type', input.type);
            const target = new URL(`${oauthUrl.replace(/\/$/u, '')}/${input.type}`);
            target.searchParams.set('redirect', callback.href);
            if (input.state) target.searchParams.set('state', input.state);
            return request.redirect(target.href);
          }
          const { core, context } = await runtime(request);
          const result = await core.oauth.authorize(input as any, context);
          if (context.state.userInfo?.objectId && !result.token)
            return request.redirect('/ui/profile');
          if (input.redirect && result.token) {
            const redirect = new URL(input.redirect);
            redirect.searchParams.set('token', result.token);
            return request.redirect(redirect.href);
          }
          return success(request);
        } catch (error) {
          return errorResponse(request, error);
        }
      }),
    );
    app.get(`${prefix}/db`, wrap(run(({ core, context }) => core.database.export({}, context))));
    app.post(
      `${prefix}/db`,
      wrap(
        run(async ({ core, context }, request) =>
          core.database.import(
            { table: String(queries(request).table ?? ''), data: await body(request) },
            context,
          ),
        ),
      ),
    );
    app.put(
      `${prefix}/db`,
      wrap(
        run(async ({ core, context }, request) => {
          const input = queries(request);
          return core.database.update(
            {
              table: String(input.table ?? ''),
              objectId: String(input.objectId ?? ''),
              data: await body(request),
            },
            context,
          );
        }),
      ),
    );
    app.delete(
      `${prefix}/db`,
      wrap(
        run(({ core, context }, request) =>
          core.database.clear({ table: String(queries(request).table ?? '') }, context),
        ),
      ),
    );
    app.get(
      `${prefix}/comment/rss`,
      wrap(async (request) => {
        try {
          const { models } = await runtime(request);
          const input = queries(request);
          const where =
            typeof input.path === 'string'
              ? { url: input.path, status: ['NOT IN', ['waiting', 'spam']] as const }
              : { status: ['NOT IN', ['waiting', 'spam']] as const };
          const comments = await models.Comment.select(where, { desc: 'insertedAt', limit: 20 });
          const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${escapeXml(((request.env ?? {}) as Bindings & WalineWorkerBindings).SITE_NAME ?? 'Waline')}</title><link>${escapeXml(serverUrl(request.req.raw))}</link>${comments.map((comment) => `<item><guid>${escapeXml(comment.objectId)}</guid><title>${escapeXml(comment.nick ?? 'Anonymous')}</title><description>${escapeXml(comment.comment)}</description><link>${escapeXml(comment.url)}</link><pubDate>${new Date(comment.insertedAt).toUTCString()}</pubDate></item>`).join('')}</channel></rss>`;
          return new Response(xml, {
            headers: { 'content-type': 'application/rss+xml; charset=UTF-8' },
          });
        } catch (error) {
          return errorResponse(request, error);
        }
      }),
    );
  };

  addRoutes('/api', false);
  addRoutes('', true);
  app.notFound((context) => context.json({ errno: 404, errmsg: 'Not Found' }, 404));
  app.onError((error, context) => errorResponse(context, error));
  return app;
};
