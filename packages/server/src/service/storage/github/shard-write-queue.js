'use strict';

/**
 * Shard write queue: coalesced writes, batched Git commits, SHA conflict
 * detection and retry.
 *
 * A queue is needed rather than "PUT the CSV once per edited comment" because:
 *   1. several changes to one shard inside a request rewrite that CSV once
 *      (coalescing), and repeated updates to one row keep only the final state,
 *      since changes are applied to the in-memory row in place;
 *   2. one Git Data API commit can carry many shards, turning N shards into one
 *      commit, which is also atomic: GitHub takes all of it or none of it;
 *   3. a pre-commit SHA check plus "re-fetch only changed shards and merge" on
 *      conflict keeps concurrent writes from overwriting each other silently.
 *
 * Serverless note (the important one): a Netlify/Lambda instance is frozen after
 * responding, so a timer cannot be trusted. Besides the FLUSH_INTERVAL timer for
 * long-lived VPS/Docker deployments, the middleware awaits one flush() before
 * every response, which is what makes "200 OK" mean "already persisted".
 */

const { setTimeout: sleep } = require('node:timers/promises');
const { ShaConflictError, gitBlobSha } = require('./github-client');

class ShardWriteError extends Error {
  constructor(message, cause) {
    super(message);
    this.name = 'ShardWriteError';
    this.cause = cause;
  }
}

class ShardWriteQueue {
  /**
   * @param {object} options
   * @param {import('./csv-shard-cache').CsvShardCache} options.cache
   * @param {import('./github-client').GithubClient} options.github
   * @param {import('./shard-manager').ShardManager} options.manager
   * @param {number} options.flushInterval Periodic flush interval in milliseconds.
   * @param {number} options.maxBatch Shards per commit at most.
   * @param {number} options.maxRetries Attempts per flush, conflicts included.
   */
  constructor({
    cache,
    github,
    manager,
    logger = console,
    flushInterval = 30000,
    maxBatch = 50,
    maxRetries = 3,
  } = {}) {
    this.cache = cache;
    this.github = github;
    this.manager = manager;
    this.logger = logger;
    this.flushInterval = flushInterval;
    this.maxBatch = maxBatch;
    this.maxRetries = maxRetries;
    this.timer = null;
    this.flushing = null;
    // Statistics: quantifies how many commits coalescing saves, for the report.
    this.stats = { flushes: 0, commits: 0, retries: 0, conflicts: 0, rollbacks: 0, failures: 0 };
  }

  start() {
    if (this.timer || this.flushInterval <= 0) {
      return;
    }
    this.timer = setInterval(() => {
      this.flush().catch((err) => {
        this.logger.error?.('[shard-write-queue] 定时刷盘失败：', err);
      });
    }, this.flushInterval);
    // A long-lived process should not be kept alive by a background timer, and
    // serverless never relies on it
    this.timer.unref?.();
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  /**
   * Enqueue one change.
   *
   * operation: { type: 'add' | 'update' | 'delete', table, row | objectId | patch }
   *
   * Applying to memory happens immediately (read-after-write consistency) while
   * persistence waits for flush, so a select() right after add() always sees the
   * new row and a comment never reads as "committed but gone after a refresh".
   */
  async enqueue(operation) {
    const { type, table } = operation;

    switch (type) {
      case 'add':
        // An insert has to load the target family first, since choosing a shard
        // needs the row counts of every shard in it; hence async
        return this.cache.applyAdd(table, operation.row);
      case 'update':
        return this.cache.applyUpdate(table, operation.objectId, operation.patch);
      case 'delete':
        return this.cache.applyDelete(table, operation.objectId);
      default:
        throw new Error(`未知的写入操作类型：${type}`);
    }
  }

  /**
   * Persist. Concurrent callers share one commit, yet each caller's own change
   * must be covered.
   *
   * Why not simply `return this.flushing`: the in-flight commit already snapshotted
   * pending inside commitOnce. A change arriving after that snapshot is not part of
   * it, so returning the in-flight promise would end the request with "200 OK but
   * still only in memory", and the instance freezes with the data lost — the normal
   * case under serverless. The in-flight commit is therefore awaited and then
   * pending is checked again, topping up a round whenever anything is left.
   *
   * runFlush clears its own pending every round, so the loop always terminates;
   * the guard is a defensive ceiling.
   */
  async flush() {
    if (!this.cache.isDirty()) {
      return { skipped: true, shards: 0 };
    }

    const committed = { skipped: false, shards: 0, retries: 0 };
    let guard = 0;

    while (this.cache.isDirty()) {
      if (guard >= 32) {
        this.logger.warn?.('[shard-write-queue] flush 连续多轮仍未清空待提交分片，提前结束');
        break;
      }
      guard += 1;

      if (this.flushing) {
        await this.flushing;
        continue;
      }

      this.flushing = this.runFlush().finally(() => {
        this.flushing = null;
      });
      const batch = await this.flushing;

      committed.shards += batch.shards;
      committed.retries += batch.retries;
    }

    return committed;
  }

  async runFlush() {
    const committed = { skipped: false, shards: 0, retries: 0 };
    let guard = 0;

    // Commit in rounds when pending exceeds maxBatch, to keep a single commit small
    while (this.cache.isDirty()) {
      if (guard >= 1024) {
        break;
      }
      guard += 1;

      const paths = [...this.cache.pending.keys()].slice(0, this.maxBatch);
      const result = await this.commitPaths(paths);

      committed.shards += result.shards;
      committed.retries += result.retries;

      // Stop when a round committed nothing (for instance their pending was
      // already cleared by a concurrent commit), to avoid spinning in a bad state
      if (result.shards === 0) {
        break;
      }
    }

    this.stats.flushes += 1;

    return committed;
  }

  /**
   * Commit the given shards.
   *
   * Every attempt follows a fixed order: read head, refresh the manifest
   * (downloading only shards whose SHA changed and merging with "local wins"),
   * then commit while passing that head to the GitHub client.
   *
   * The order must not be swapped: only "read head, then read data", together
   * with a force=false ref update, guarantees that anything committed after the
   * data read gets our non-fast-forward update rejected, which turns into a
   * retry rather than a silent overwrite of someone else's data.
   */
  async commitPaths(paths) {
    const baselines = this.cache.snapshotShards(paths);
    const touchedTables = [
      ...new Set(paths.map((path) => this.cache.pending.get(path)?.table).filter(Boolean)),
    ];
    let lastError;
    let retries = 0;

    for (let attempt = 1; attempt <= this.maxRetries; attempt += 1) {
      try {
        const head = await this.github.getBranchHead();

        await this.cache.refresh({ force: true, tables: touchedTables });

        return { ...(await this.commitOnce(paths, touchedTables, head)), retries };
      } catch (err) {
        lastError = err;
        retries += 1;

        if (err instanceof ShaConflictError) {
          this.stats.conflicts += 1;
          this.stats.retries += 1;
          this.logger.warn?.(
            `[shard-write-queue] 检测到写冲突（第 ${attempt}/${this.maxRetries} 次）：${err.message}，重新拉取变化分片后重试`,
          );
          // No rollback on conflict: the next refresh merges in the remote's new
          // data while our uncommitted changes stay in memory, and the merge rules
          // keep the local version. Backoff is mandatory — a conflict means another
          // instance really is writing, and retrying at once just jostles.
          if (attempt < this.maxRetries) {
            await sleep(300 * 2 ** (attempt - 1) + Math.floor(Math.random() * 150));
          }
          continue;
        }

        this.stats.retries += 1;
        this.logger.warn?.(
          `[shard-write-queue] 提交失败（第 ${attempt}/${this.maxRetries} 次）：${err.message}`,
        );
        if (attempt < this.maxRetries) {
          await sleep(400 * 2 ** (attempt - 1));
        }
      }
    }

    // Retries exhausted: roll the in-memory view back so process state matches the
    // remote, and surface the error to the caller (the middleware turns it into a
    // 5xx rather than pretending the write succeeded).
    this.cache.restoreShards(baselines);
    this.cache.discardPending(paths);
    this.stats.rollbacks += 1;
    this.stats.failures += 1;
    throw new ShardWriteError(
      `分片提交失败（已重试 ${this.maxRetries} 次，内存变更已回滚）：${lastError?.message}`,
      lastError,
    );
  }

  /**
   * Commit this round's shards, not "everything pending".
   *
   * Batching is the whole point of MAX_BATCH_SIZE: a single oversized tree is slow
   * and likely to hit a limit. Iterating the whole pending here made batching
   * moot, and shards outside the batch got committed while their table's manifest
   * stayed out of touchedTables, leaving "shard content disagrees with the
   * manifest" behind in the repository.
   *
   * The manifest is still rebuilt whole for every table in touchedTables, since it
   * is a projection of the table; that keeps "shard and manifest in the same
   * commit" atomic.
   */
  async commitOnce(paths, touchedTables, head) {
    const upserts = new Map();
    const shardShas = new Map();
    const deletes = [];

    for (const path of paths) {
      const entry = this.cache.pending.get(path);

      if (!entry) {
        continue;
      }
      const shard = this.cache.tables[entry.table].shards.get(path);
      const rows = shard ? shard.rows : [];

      if (rows.length === 0) {
        // An emptied shard is deleted from the repository rather than left as a
        // header-only file
        deletes.push(path);
        continue;
      }

      const content = this.manager.serializeShard(
        entry.table,
        rows,
        this.manager.buildColumns(entry.table, rows),
      );

      upserts.set(path, content);
      shardShas.set(path, gitBlobSha(content));
    }

    // The manifest is a projection of shard state, rebuilt whole from memory, so
    // "manifest disagrees with shard content" can never appear as an intermediate state
    const deletedPaths = new Set(deletes);

    for (const table of touchedTables) {
      upserts.set(
        this.manager.manifestPath(table),
        this.manager.serializeManifest(this.manifestEntriesOf(table, shardShas, deletedPaths)),
      );
    }

    const result = await this.github.commitChanges({
      message: this.buildCommitMessage(touchedTables, upserts.size),
      upserts,
      deletes,
      head,
    });

    this.cache.markClean(shardShas);
    this.cache.markDeleted(deletes);
    this.stats.commits += 1;

    return {
      skipped: false,
      shards: [...upserts.keys()].filter((path) => !path.endsWith('_manifest.csv')).length + deletes.length,
      headSha: result.headSha,
    };
  }

  /**
   * Rebuild a table's manifest entries from current memory.
   *
   * The authoritative listing (entries) is the basis rather than "loaded shards":
   * under on-demand loading an unloaded shard must still appear in the manifest,
   * or it vanishes from the repository's point of view. Emptied shards pending
   * deletion are skipped; shards being written this round use the locally computed
   * git blob SHA; loaded shards rebuild row count and bounds from their rows;
   * unloaded shards keep the listing's metadata.
   */
  manifestEntriesOf(table, shardShas, deletedPaths) {
    const state = this.cache.tables[table];
    const entries = new Map();

    for (const [path, meta] of state.entries) {
      if (deletedPaths.has(path)) {
        continue;
      }
      const shard = state.shards.get(path);
      const sha = shardShas.get(path) ?? shard?.sha ?? meta.sha ?? null;

      if (shard) {
        entries.set(path, this.manager.manifestEntry(table, path, shard.rows, sha));
      } else {
        entries.set(path, { ...meta, sha });
      }
    }

    return entries;
  }

  buildCommitMessage(tables, fileCount) {
    const names = tables.map((table) => this.manager.tableDir(table)).join('/');

    return `chore(csv-store): update ${names} (${fileCount} files)`;
  }
}

module.exports = { ShardWriteQueue, ShardWriteError };
