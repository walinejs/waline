import { createRequire } from 'node:module';

import { afterEach, describe, expect, it } from 'vitest';

const require = createRequire(import.meta.url);
const thinkHelper = require('think-helper');
const { isSharded, loadConfig } = require('../src/service/storage/github/mode.js');

const ENTRY = '../src/service/storage/github.js';

// Load the entry point as if it were a fresh process, with the given mode.
const loadEntry = (mode) => {
  const originalThink = globalThis.think;

  globalThis.think = { ...thinkHelper, Service: Object };

  try {
    const entryPath = require.resolve(ENTRY);

    delete require.cache[entryPath];

    if (mode === undefined) {
      delete process.env.GITHUB_STORAGE;
    } else {
      process.env.GITHUB_STORAGE = mode;
    }

    return require(entryPath);
  } finally {
    globalThis.think = originalThink;
  }
};

describe('GitHub storage mode', () => {
  afterEach(() => {
    delete process.env.GITHUB_STORAGE;
  });

  it('treats GITHUB_STORAGE=sharded as the only opt-in', () => {
    expect(isSharded({})).toBe(false);
    expect(isSharded({ GITHUB_STORAGE: '' })).toBe(false);
    expect(isSharded({ GITHUB_STORAGE: 'legacy' })).toBe(false);
    expect(isSharded({ GITHUB_STORAGE: ' SHARDED ' })).toBe(true);
  });

  it('keeps the legacy single-CSV implementation by default', () => {
    const Storage = loadEntry(undefined);

    expect(Storage.name).toBe('GithubStorage');
    // The upstream API (and its quirks) is preserved untouched
    expect(typeof Storage.prototype.collection).toBe('function');
    expect(typeof Storage.prototype.parseWhere).toBe('function');
  });

  it('serves the sharded implementation when enabled', () => {
    const Storage = loadEntry('sharded');

    expect(Storage.name).toBe('GithubShardedStorage');
    expect(typeof Storage.prototype.select).toBe('function');
    expect(typeof Storage.prototype.collection).toBe('undefined');
  });

  it('reads the sharded store settings from the same environment', () => {
    const config = loadConfig({
      GITHUB_TOKEN: 'token',
      GITHUB_REPO: 'owner/repo',
      GITHUB_BRANCH: 'comments',
      CSV_STORE_DIR: 'store',
      SHARD_MAX_ROWS: '500',
      DEDUP_WINDOW_SECONDS: '0',
    });

    expect(config).toMatchObject({
      token: 'token',
      repo: 'owner/repo',
      branch: 'comments',
      storeDir: 'store',
      shardMaxRows: 500,
      dedupWindowSeconds: 0,
    });
    // Defaults keep the documented behaviour when nothing is set
    expect(loadConfig({})).toMatchObject({
      branch: 'main',
      storeDir: 'data',
      shardMaxRows: 2000,
      hashLen: 2,
    });
  });

  it('rejects a non-numeric integer setting instead of silently falling back', () => {
    expect(() => loadConfig({ SHARD_MAX_ROWS: 'many' })).toThrow(/SHARD_MAX_ROWS/u);
  });
});
