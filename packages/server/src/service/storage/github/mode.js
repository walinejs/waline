'use strict';

/**
 * Mode switch and configuration for the two GitHub storage implementations.
 *
 * `GITHUB_STORAGE=sharded` selects the sharded CSV store; anything else (unset
 * included) keeps the legacy one-CSV-per-table behaviour, so a deployment that
 * does not know about this package never changes shape after an upgrade.
 */

const MODE_ENV = 'GITHUB_STORAGE';
const SHARDED_MODE = 'sharded';

const isSharded = (env = process.env) =>
  String(env[MODE_ENV] ?? '')
    .trim()
    .toLowerCase() === SHARDED_MODE;

// Read an integer environment variable; an empty string counts as unset.
const intEnv = (name, fallback, env = process.env) => {
  const raw = env[name];

  if (raw === undefined || raw === null || String(raw).trim() === '') {
    return fallback;
  }
  const value = Number.parseInt(String(raw), 10);

  if (Number.isNaN(value)) {
    throw new Error(`环境变量 ${name} 必须是整数，当前值：${raw}`);
  }

  return value;
};

function loadConfig(env = process.env) {
  return {
    token: env.GITHUB_TOKEN,
    repo: env.GITHUB_REPO,
    branch: env.GITHUB_BRANCH || 'main',
    // Tests and self-hosted proxies only; production talks to api.github.com
    apiBase: env.GITHUB_API_BASE || 'https://api.github.com',

    storeDir: env.CSV_STORE_DIR || 'data',
    shardMaxRows: intEnv('SHARD_MAX_ROWS', 2000, env),
    hashLen: intEnv('SHARD_HASH_LEN', 2, env),

    flushInterval: intEnv('FLUSH_INTERVAL', 30000, env),
    maxBatch: intEnv('MAX_BATCH_SIZE', 50, env),
    maxRetries: intEnv('MAX_RETRIES', 3, env),

    cacheTtl: intEnv('CSV_CACHE_TTL', 60000, env),
    dedupWindowSeconds: intEnv('DEDUP_WINDOW_SECONDS', 60, env),

    snapshotKeepDays: intEnv('SNAPSHOT_KEEP_DAYS', 30, env),
    snapshotHour: intEnv('SNAPSHOT_HOUR', 3, env),
  };
}

module.exports = { isSharded, loadConfig };
