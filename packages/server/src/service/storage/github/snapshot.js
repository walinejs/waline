'use strict';

/**
 * Snapshots: one manifest file per day, pruned by age, restorable in one call,
 * plus "reset repository".
 *
 * A snapshot is a manifest rather than a copy of every data file because copying
 * makes the file count "shards x (keep days + 1)": 2000 shards over 30 days is
 * about 60k entries, which runs into the Git Trees API truncation limit and takes
 * snapshots, restore and rebuild down together — exactly when they are needed most.
 * A manifest file references blobs that already exist, so nothing is uploaded and
 * the count grows with retention days instead of shard count. The legacy
 * directory format is still readable, so old snapshots never become dead data.
 *
 * Comment history has no value on its own: any point in time can be recovered
 * from a snapshot, while history commits are the main driver of repository size,
 * since every write rewrites whole shards into new blobs. resetRepository()
 * therefore builds a parentless commit from the current data and force-moves the
 * branch, dropping history in one step. It is irreversible, which is why the ops
 * endpoint demands an explicit confirmation.
 */

const { setTimeout: sleep } = require('node:timers/promises');

// Diff:   the original implementation used `csv-parse/sync` and
//         `csv-stringify/sync` for the snapshot manifest.
// Patch:  the same local codec as the shard files (see ./csv.js).
// Reason: one synchronous codec instead of two extra runtime packages.
const { parse, stringify } = require('./csv.js');
const { ShaConflictError } = require('./github-client');

const SNAPSHOT_DIRNAME = '_snapshots';
const SNAPSHOT_MANIFEST_HEADER = ['path', 'sha'];
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/u;

// Local date, not UTC, so directory names match what operators expect.
const localDateString = (date = new Date()) => {
  const pad = (value) => String(value).padStart(2, '0');

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

/**
 * Retry shell for ops writes (snapshot, prune, restore).
 *
 * Unlike the write queue these keep no "local pending changes", so a conflict can
 * simply redo the whole operation; without a retry, one concurrent commit is
 * enough to show an admin a 500.
 */
async function withConflictRetry(operation, { retries = 3, logger } = {}) {
  let lastError;

  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      return await operation();
    } catch (err) {
      lastError = err;

      if (!(err instanceof ShaConflictError)) {
        throw err;
      }
      logger?.warn?.(`[snapshot] 写冲突（第 ${attempt}/${retries} 次），重做：${err.message}`);

      if (attempt < retries) {
        await sleep(300 * 2 ** (attempt - 1));
      }
    }
  }

  throw lastError;
}

class SnapshotManager {
  constructor({
    github,
    manager,
    cache,
    logger = console,
    keepDays = 30,
    snapshotHour = 3,
    maxRetries = 3,
  } = {}) {
    this.github = github;
    this.manager = manager;
    this.cache = cache;
    this.logger = logger;
    this.keepDays = keepDays;
    this.snapshotHour = snapshotHour;
    this.maxRetries = maxRetries;
    this.lastRunDate = null;
  }

  get snapshotRoot() {
    return `${this.manager.storeDir}/${SNAPSHOT_DIRNAME}`;
  }

  // Repository path of one day's snapshot manifest.
  snapshotManifestPath(date) {
    return `${this.snapshotRoot}/${date}.csv`;
  }

  // Current data files, excluding the _snapshots tree itself.
  async dataFiles() {
    const files = await this.github.listTree(`${this.manager.storeDir}/`);
    const result = new Map();

    for (const [path, meta] of files) {
      if (!path.startsWith(`${this.snapshotRoot}/`)) {
        result.set(path, meta);
      }
    }

    return result;
  }

  // Read one day's snapshot as Map<path, {sha}>; the legacy directory format is understood too.
  async snapshotFiles(date) {
    const manifest = await this.github.getFile(this.snapshotManifestPath(date));

    if (manifest) {
      return this.parseSnapshotManifest(manifest.content);
    }

    const prefix = `${this.snapshotRoot}/${date}/`;
    const files = await this.github.listTree(prefix);
    const result = new Map();

    for (const [path, meta] of files) {
      if (path.startsWith(prefix)) {
        result.set(path.slice(prefix.length), meta);
      }
    }

    return result;
  }

  parseSnapshotManifest(text) {
    const result = new Map();

    if (!text || !text.trim()) {
      return result;
    }

    for (const record of parse(text, {
      columns: true,
      skip_empty_lines: true,
      relax_column_count: true,
      bom: true,
    })) {
      const path = String(record.path ?? '').trim();
      const sha = String(record.sha ?? '').trim();

      if (path && sha) {
        result.set(path, { sha });
      }
    }

    return result;
  }

  serializeSnapshotManifest(files) {
    const records = [...files]
      .map(([path, meta]) => ({ path, sha: meta.sha }))
      .sort((a, b) => (a.path < b.path ? -1 : 1));

    return stringify(records, {
      header: true,
      columns: SNAPSHOT_MANIFEST_HEADER,
      record_delimiter: '\n',
    });
  }

  // Extract the date from a path under _snapshots/; both formats are recognized.
  static dateOfSnapshotPath(rest) {
    const [head] = rest.split('/');
    const matched = /^(?<date>\d{4}-\d{2}-\d{2})(?:\.csv)?$/u.exec(head ?? '');

    return matched ? matched.groups.date : null;
  }

  async listSnapshots() {
    const files = await this.github.listTree(`${this.snapshotRoot}/`);
    const dates = new Set();

    for (const path of files.keys()) {
      const date = SnapshotManager.dateOfSnapshotPath(path.slice(this.snapshotRoot.length + 1));

      if (date) {
        dates.add(date);
      }
    }

    return [...dates].sort().reverse();
  }

  // Create a snapshot: only the manifest is uploaded, data uploads nothing.
  createSnapshot(date = localDateString()) {
    return withConflictRetry(
      async () => {
        // Read head before listing, the same order as the write queue, so the
        // snapshot matches the commit baseline
        const head = await this.github.getBranchHead();
        const files = await this.dataFiles();

        if (files.size === 0) {
          return { date, files: 0, skipped: true };
        }

        const upserts = new Map([[this.snapshotManifestPath(date), this.serializeSnapshotManifest(files)]]);
        const result = await this.github.commitChanges({
          message: `chore(csv-store): snapshot ${date} (${files.size} files)`,
          upserts,
          head,
        });

        this.logger.info?.(`[snapshot] 已创建快照 ${date}，包含 ${files.size} 个文件`);

        return { date, files: files.size, skipped: false, headSha: result.headSha };
      },
      { retries: this.maxRetries, logger: this.logger },
    );
  }

  // Keep the most recent SNAPSHOT_KEEP_DAYS days and delete anything older.
  pruneSnapshots() {
    return withConflictRetry(
      async () => {
        if (this.keepDays <= 0) {
          return { removed: [] };
        }

        const dates = await this.listSnapshots();
        const expired = dates.slice(this.keepDays);

        if (expired.length === 0) {
          return { removed: [] };
        }

        const head = await this.github.getBranchHead();
        const files = await this.github.listTree(`${this.snapshotRoot}/`);
        const deletes = [];

        for (const path of files.keys()) {
          const date = SnapshotManager.dateOfSnapshotPath(path.slice(this.snapshotRoot.length + 1));

          if (date && expired.includes(date)) {
            deletes.push(path);
          }
        }

        await this.github.commitChanges({
          message: `chore(csv-store): prune snapshots older than ${this.keepDays} days`,
          deletes,
          head,
        });

        this.logger.info?.(`[snapshot] 已清理 ${expired.length} 个过期快照：${expired.join(', ')}`);

        return { removed: expired };
      },
      { retries: this.maxRetries, logger: this.logger },
    );
  }

  /**
   * Overwrite the data directory with a given day's snapshot.
   *
   * Overwrite means every file in the snapshot is written back to its original
   * path and every extra current file is deleted, so the result is exactly that
   * snapshot rather than a merge of the two.
   */
  async restore(date) {
    const normalized = String(date ?? '').trim();

    if (!DATE_PATTERN.test(normalized)) {
      throw new Error(`快照日期格式应为 YYYY-MM-DD，当前值：${date}`);
    }

    return withConflictRetry(
      async () => {
        const snapshot = await this.snapshotFiles(normalized);

        if (snapshot.size === 0) {
          throw new Error(`快照 ${normalized} 不存在或不包含任何文件`);
        }
        const head = await this.github.getBranchHead();
        const current = await this.dataFiles();
        const upserts = new Map();

        for (const [path, meta] of snapshot) {
          upserts.set(path, { sha: meta.sha });
        }

        const deletes = [...current.keys()].filter((path) => !snapshot.has(path));
        const result = await this.github.commitChanges({
          message: `chore(csv-store): restore snapshot ${normalized}`,
          upserts,
          deletes,
          head,
        });

        // The in-memory view must be invalidated, or it keeps serving pre-restore data
        this.cache.reset();
        await this.cache.refresh({ force: true });

        this.logger.warn?.(
          `[snapshot] 已从 ${normalized} 恢复：写回 ${upserts.size} 个文件，删除 ${deletes.length} 个文件`,
        );

        return { date: normalized, restored: upserts.size, deleted: deletes.length, headSha: result.headSha };
      },
      { retries: this.maxRetries, logger: this.logger },
    );
  }

  /**
   * Reset the data repository: build a parentless commit from the current data
   * files and force-move the branch pointer.
   *
   * Write-per-commit means history accumulates one blob per shard rewrite, so the
   * repository only grows (GitHub recommends staying under 1GB). Comment history
   * has no value — any point in time is recoverable from a snapshot — and one
   * orphan commit clears it all:
   *   - the repository returns to a single commit and .git shrinks to current size;
   *   - the snapshot tree goes with it, since it is history too;
   *   - no new repository and environment variables to switch, so there is no
   *     window with two copies of the data.
   *
   * This is irreversible; the ops endpoint requires explicit confirmation.
   *
   * @param {object} options
   * @param {boolean} options.keepSnapshots Keep snapshots as well (default: discard).
   * @returns {Promise<{reset: boolean, files: number, headSha?: string}>}
   */
  async resetRepository({ keepSnapshots = false } = {}) {
    const head = await this.github.getBranchHead();
    const files = await this.dataFiles();
    const snapshots = keepSnapshots ? await this.github.listTree(`${this.snapshotRoot}/`) : new Map();
    const upserts = new Map();

    for (const [path, meta] of files) {
      upserts.set(path, { sha: meta.sha });
    }
    for (const [path, meta] of snapshots) {
      upserts.set(path, { sha: meta.sha });
    }

    if (upserts.size === 0) {
      return { reset: false, files: 0, reason: '仓库里没有数据文件，无需重置' };
    }

    const result = await this.github.commitChanges({
      message: `chore(csv-store): reset repository (${upserts.size} files, history rewritten)`,
      upserts,
      head,
      orphan: true,
      force: true,
    });

    this.cache.reset();
    await this.cache.refresh({ force: true });
    // The daily snapshot's "already ran today" marker belonged to the discarded
    // history, so a fresh one should be taken after a reset
    this.lastRunDate = null;

    this.logger.warn?.(`[csv-store] 已重置数据仓库：${upserts.size} 个文件，历史提交已丢弃`);

    return { reset: true, files: upserts.size, snapshotsKept: keepSnapshots, headSha: result.headSha };
  }

  /**
   * Daily snapshot.
   *
   * Lazy, request-driven triggering (the first request after SNAPSHOT_HOUR fires
   * it, once per day) rather than a platform cron, because Netlify/Vercel free
   * plans differ in cron support while lazy triggering works everywhere. For a
   * precise time, point a Scheduled Function or a VPS crontab at
   * POST /csv-store/snapshot.
   */
  async maybeRunDaily(now = new Date()) {
    if (this.keepDays <= 0) {
      return { skipped: true, reason: 'SNAPSHOT_KEEP_DAYS <= 0，快照功能已关闭' };
    }

    const today = localDateString(now);

    if (this.lastRunDate === today || now.getHours() < this.snapshotHour) {
      return { skipped: true, reason: '今日已执行或未到执行时点' };
    }

    const created = await this.createSnapshot(today);
    const pruned = await this.pruneSnapshots();

    // Only book it after success: on failure today still needs another attempt,
    // or one hiccup leaves the day without a snapshot
    this.lastRunDate = today;

    return { skipped: false, created, pruned };
  }
}

module.exports = { SnapshotManager, localDateString, SNAPSHOT_DIRNAME, DATE_PATTERN, withConflictRetry };
