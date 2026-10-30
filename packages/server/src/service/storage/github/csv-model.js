'use strict';

/**
 * Storage adapter implementing Waline's CustomModel contract.
 *
 * It is a thin translation layer from Waline's call convention onto cache +
 * write queue; indexing, querying, committing and conflict handling belong to
 * the three components below.
 *
 * Semantics that must stay aligned with upstream (@waline/vercel) storage,
 * because upper layers depend on them:
 *   - select returns rows carrying objectId, always as fresh objects, since
 *     controllers mutate or delete the result;
 *   - field projection keeps objectId and treats 'id' as its alias;
 *   - update data may be a function, which is how counter increments arrive;
 *   - undefined in a where means "column is empty"; LIKE supports %x / x% / %x%.
 */

// Same base36 key style as upstream add(), so new and old IDs look alike.
const genId = () => Math.random().toString(36).slice(2, 15);

class CsvModel {
  constructor(tableName, { cache, queue, manager, logger = console, dedupWindowSeconds = 60 } = {}) {
    this.tableName = tableName;
    this.cache = cache;
    this.queue = queue;
    this.manager = manager;
    this.logger = logger;
    this.dedupWindowSeconds = dedupWindowSeconds;
  }

  async select(where, { desc, field, limit, offset, order } = {}) {
    await this.cache.ensureFresh();

    return this.cache.select(this.tableName, where, { desc, field, limit, offset, order });
  }

  async count(where = {}, options = {}) {
    await this.cache.ensureFresh();

    return this.cache.count(this.tableName, where, options);
  }

  // Read one row; only Users can be located by primary key without a full load.
  async get(objectId) {
    await this.cache.ensureFresh();

    return this.cache.getRow(this.tableName, objectId);
  }

  /**
   * Insert a row.
   *
   * Writes are applied to memory immediately and persisted at the next flush,
   * so the returned object can be rendered straight away without ever showing
   * "committed but gone after a refresh".
   */
  async add(data = {}) {
    await this.cache.ensureFresh();

    const duplicate = await this.findRecentDuplicate(data);

    if (duplicate) {
      // Idempotent: a retried submit (page refresh, client replay) returns the
      // existing record instead of writing a second one
      this.logger.debug?.('[csv-model] 命中重复提交去重窗口，返回既有记录');
      return { ...duplicate };
    }

    const row = this.manager.normalizeRow(
      this.tableName,
      { ...data, objectId: genId() },
      { defaults: true },
    );

    await this.queue.enqueue({ type: 'add', table: this.tableName, row });

    return { ...row };
  }

  /**
   * Update matching rows and return them (upstream semantics).
   *
   * `data` may be a function, which is how counters increment:
   *   update((counter) => ({ time: (counter.time || 0) + 1 }), { objectId: [...] })
   * Both in-place mutation of the argument and a returned patch are supported.
   */
  async update(data, where) {
    await this.cache.ensureFresh();
    const rows = await this.cache.filterRows(this.tableName, where);
    const updated = [];

    for (const row of rows) {
      const applied = {};
      const result = typeof data === 'function' ? data(row) : data;

      if (result && typeof result === 'object') {
        Object.assign(applied, result);
      }
      // Primary keys are never patched (upstream deletes data.objectId too)
      delete applied.objectId;

      const next = this.cache.applyUpdate(this.tableName, row.objectId, applied);

      if (next) {
        updated.push({ ...next });
      }
    }

    return updated;
  }

  async delete(where) {
    await this.cache.ensureFresh();

    // filterRows returns a fresh array, so removing rows from shards while
    // looping does not disturb the iteration
    for (const row of await this.cache.filterRows(this.tableName, where)) {
      await this.queue.enqueue({ type: 'delete', table: this.tableName, objectId: row.objectId });
    }
  }

  /**
   * Duplicate detection on mail + url + content hash within a time window.
   *
   * It lives here as well as in Waline's controller because a request that is
   * retried after being sent still has to be caught. The fingerprint is computed
   * per url on demand instead of being indexed globally: a Map<hash, Set> costs
   * 20MB+ at 100k comments, while this path runs a handful of times a day.
   * Unparseable timestamps never block a comment; a duplicate is the lesser evil.
   */
  async findRecentDuplicate(data) {
    if (this.tableName !== 'Comment' || this.dedupWindowSeconds <= 0) {
      return null;
    }

    const hash = this.cache.dedupHash(data);

    if (!hash) {
      return null;
    }
    const cutoff = Date.now() - this.dedupWindowSeconds * 1000;

    for (const row of await this.cache.filterRows('Comment', { url: data.url ?? '' })) {
      if (this.cache.dedupHash(row) !== hash) {
        continue;
      }
      const insertedAt = Date.parse(row.insertedAt ?? '');

      if (Number.isNaN(insertedAt)) {
        return null;
      }
      if (insertedAt >= cutoff) {
        return row;
      }
    }

    return null;
  }
}

module.exports = { CsvModel, genId };
