'use strict';

/**
 * Storage service for the sharded CSV store.
 *
 * Thin adapter, so the thinkjs service contract stays exactly what the legacy
 * implementation exposes: thinkjs instantiates this per model name and the
 * controllers only ever see select / count / add / update / delete. Querying,
 * indexing, batching and conflict handling belong to csv-model + csv-shard-cache
 * + shard-write-queue.
 *
 * Diff:   the original implementation exposed a `customModel(tableName)` factory
 *         that returned `null` for an unknown table, letting Waline fall back to
 *         its built-in storage.
 * Patch:  a service class instead, because thinkjs loads `storage/github` with
 *         `new Cls(tableName)` and cannot use a null return; an unknown table
 *         throws a descriptive error.
 * Reason: the service loader is the only injection point in this package. Waline
 *         only asks for Comment / Users / Counter, so the branch is unreachable.
 */

const Base = require('../base.js');

const { getStore, createModelFactory } = require('./store.js');

module.exports = class GithubShardedStorage extends Base {
  /**
   * @param {string} tableName Comment / Users / Counter.
   * @param {object} [store] Pre-built store; tests inject one, production uses
   *   the process-wide singleton so the shard cache is shared.
   */
  constructor(tableName, store = null) {
    super(tableName);
    this.store = store ?? getStore();
    this.model = createModelFactory(this.store)(tableName);

    if (!this.model) {
      throw new Error(`分片存储不支持数据表 "${tableName}"，仅支持 Comment / Users / Counter`);
    }
  }

  select(where, options = {}) {
    return this.model.select(where, options);
  }

  count(where = {}, options = {}) {
    return this.model.count(where, options);
  }

  // Row lookup by primary key; only Users can be located without a full load.
  get(objectId) {
    return this.model.get(objectId);
  }

  // The `{ access }` option of the legacy signature is not used by any caller.
  add(data) {
    return this.model.add(data);
  }

  update(data, where) {
    return this.model.update(data, where);
  }

  delete(where) {
    return this.model.delete(where);
  }
};
