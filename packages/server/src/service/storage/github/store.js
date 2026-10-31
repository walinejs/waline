'use strict';

/**
 * Component wiring for the sharded store plus the process-wide singleton.
 *
 * The cache and the write queue must be shared by every model instance, or the
 * in-memory index is rebuilt per table instance and flushed without coalescing.
 * Assembly is a separate function from `getStore()` so tests can build one
 * against an injected fetch instead of mocking module loading.
 */

const { GithubClient } = require('./github-client.js');
const { ShardManager } = require('./shard-manager.js');
const { CsvShardCache, TABLES } = require('./csv-shard-cache.js');
const { ShardWriteQueue } = require('./shard-write-queue.js');
const { CsvModel } = require('./csv-model.js');
const { SnapshotManager } = require('./snapshot.js');
const { loadConfig } = require('./mode.js');

function createStore(config, { fetchImpl, logger = console } = {}) {
  const github = new GithubClient({
    token: config.token,
    repo: config.repo,
    branch: config.branch,
    apiBase: config.apiBase,
    fetchImpl,
    logger,
    maxRetries: 2,
  });
  const manager = new ShardManager({
    storeDir: config.storeDir,
    shardMaxRows: config.shardMaxRows,
    hashLen: config.hashLen,
  });
  const cache = new CsvShardCache({
    github,
    manager,
    logger,
    cacheTtl: config.cacheTtl,
  });
  const queue = new ShardWriteQueue({
    cache,
    github,
    manager,
    logger,
    flushInterval: config.flushInterval,
    maxBatch: config.maxBatch,
    maxRetries: config.maxRetries,
  });
  const snapshot = new SnapshotManager({
    github,
    manager,
    cache,
    logger,
    keepDays: config.snapshotKeepDays,
    snapshotHour: config.snapshotHour,
    maxRetries: config.maxRetries,
  });

  return { config, logger, github, manager, cache, queue, snapshot };
}

let store = null;

// Process-wide singleton: the shard cache and index must be shared or the index
// is pointless.
function getStore() {
  if (!store) {
    store = createStore(loadConfig());
    store.queue.start();
  }

  return store;
}

// Tests only: drop the singleton so cases cannot pollute each other.
function resetStore() {
  if (store) {
    store.queue.stop();
    store = null;
  }
}

/**
 * Build the "table name to model instance" factory.
 *
 * Waline calls the value of `customModel` rather than constructing it, hence the
 * factory function; the documented `model: class CustomModel {}` form fails with
 * "Class constructor cannot be invoked without 'new'". Returning null for an
 * unknown table lets Waline fall back to its built-in storage.
 */
function createModelFactory(store) {
  return (tableName) => {
    if (!TABLES.includes(tableName)) {
      return null;
    }

    return new CsvModel(tableName, {
      cache: store.cache,
      queue: store.queue,
      manager: store.manager,
      logger: store.logger,
      dedupWindowSeconds: store.config.dedupWindowSeconds,
    });
  };
}

module.exports = { createStore, getStore, resetStore, createModelFactory };
