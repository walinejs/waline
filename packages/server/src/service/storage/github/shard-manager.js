'use strict';

/**
 * Shard layout, shard routing, manifest and shard-level CSV codec.
 *
 * These three together define the storage format, so they live here as the
 * single source of truth; cache, write queue and snapshot only consume it.
 *
 * Shard rules are pure functions of the key, never of runtime state:
 *   Comment / Counter: <base>/<dir>/<sha1(key)[0:2]>/<sha1(key)[0:4]>.csv
 *   Users:             <base>/users/<objectId[0:2]>/<objectId[0:2]>.csv
 * A family splits into `<prefix>-1.csv`, `-2.csv`... once a file reaches
 * SHARD_MAX_ROWS and compresses back once it shrinks (see planMerge).
 */

const { createHash } = require('node:crypto');

const { parse, stringify } = require('./csv.js');

// Table to storage subdirectory.
const TABLE_DIR = {
  Comment: 'comments',
  Users: 'users',
  Counter: 'counters',
};

/**
 * Canonical columns per table.
 *
 * These are the floor, not the ceiling: controllers also write dynamic columns
 * such as sticky / like / 2fa, which are persisted as "canonical + observed
 * extras" so a shard header stays stable without dropping fields.
 */
const TABLE_COLUMNS = {
  Comment: [
    'objectId',
    'user_id',
    'comment',
    'insertedAt',
    'ip',
    'link',
    'mail',
    'nick',
    'pid',
    'rid',
    'status',
    'ua',
    'url',
    'createdAt',
    'updatedAt',
  ],
  Counter: ['objectId', 'time', 'url', 'createdAt', 'updatedAt'],
  Users: [
    'objectId',
    'display_name',
    'email',
    'password',
    'type',
    'url',
    'avatar',
    'label',
    'github',
    'twitter',
    'facebook',
    'google',
    'weibo',
    'qq',
    'oidc',
    'createdAt',
    'updatedAt',
  ],
};

// Columns compared as time: sorting and range filters must go through Date.parse.
const DATE_FIELDS = new Set(['insertedAt', 'createdAt', 'updatedAt']);

// Columns covered by the in-memory inverted index (candidate narrowing).
const INDEXED_FIELDS = {
  Comment: ['url', 'status', 'user_id'],
  Users: ['email'],
  Counter: ['url'],
};

// The column that decides which shard family a row belongs to.
const SHARD_KEY_FIELD = {
  Comment: 'url',
  Users: 'objectId',
  Counter: 'url',
};

const MANIFEST_HEADER = ['shard_path', 'row_count', 'sha', 'updated_at', 'min_key', 'max_key'];

const sha1 = (value) => createHash('sha1').update(String(value), 'utf8').digest('hex');

// Render any value as a CSV-safe cell; structures degrade to JSON instead of
// losing information, because "[object Object]" is not reversible.
const toCell = (value) => {
  if (value === undefined || value === null) {
    return '';
  }
  if (value instanceof Date) {
    // ISO 8601 everywhere: lexicographic order equals chronological order
    return value.toISOString();
  }
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }
  if (typeof value === 'string') {
    return value;
  }

  return String(value);
};

class ShardManager {
  /**
   * @param {string} options.storeDir Data root, relative to the repository root.
   * @param {number} options.shardMaxRows Row cap for a single shard file.
   * @param {number} options.hashLen Length of the directory hash prefix.
   */
  constructor({ storeDir = 'data', shardMaxRows = 2000, hashLen = 2 } = {}) {
    this.storeDir = String(storeDir).replace(/^\/+|\/+$/gu, '');
    this.shardMaxRows = shardMaxRows;
    this.hashLen = hashLen;
  }

  tableDir(table) {
    const dir = TABLE_DIR[table];

    if (!dir) {
      throw new Error(`未知的数据表 "${table}"，仅支持 Comment / Users / Counter`);
    }

    return dir;
  }

  columns(table) {
    return TABLE_COLUMNS[table];
  }

  indexedFields(table) {
    return INDEXED_FIELDS[table];
  }

  shardKeyField(table) {
    return SHARD_KEY_FIELD[table];
  }

  // Family prefix (no .csv, no split suffix): the definition of "same key, same family".
  shardPrefix(table, key) {
    const dir = this.tableDir(table);

    if (table === 'Users') {
      // Users use only 2 chars: one row per key, so a 4-char prefix would
      // produce one tiny file per user
      const part = String(key).slice(0, this.hashLen);

      return `${this.storeDir}/${dir}/${part}/${part}`;
    }

    const hash = sha1(key);
    const bucket = hash.slice(0, this.hashLen);
    const filePrefix = hash.slice(0, this.hashLen + 2);

    return `${this.storeDir}/${dir}/${bucket}/${filePrefix}`;
  }

  // Repository-relative shard path; suffix is '' (base) or '-1' / '-2'... (split).
  shardPath(table, key, suffix = '') {
    return `${this.shardPrefix(table, key)}${suffix}.csv`;
  }

  manifestPath(table) {
    return `${this.storeDir}/${this.tableDir(table)}/_manifest.csv`;
  }

  // Returns null for paths that are not canonical shards (_manifest.csv, _snapshots).
  parseShardPath(repoPath) {
    if (!repoPath.startsWith(`${this.storeDir}/`) || repoPath.endsWith('_manifest.csv')) {
      return null;
    }
    const rest = repoPath.slice(this.storeDir.length + 1);
    const segments = rest.split('/');

    if (segments.length !== 3 || !segments[2].endsWith('.csv')) {
      return null;
    }
    const name = segments[2].slice(0, -'.csv'.length);
    const matched = /^(?<body>.+?)(?<suffix>-\d+)?$/u.exec(name);

    if (!matched) {
      return null;
    }
    const table = Object.keys(TABLE_DIR).find((name_) => TABLE_DIR[name_] === segments[0]);

    if (!table) {
      return null;
    }

    return {
      table,
      suffix: matched.groups.suffix ?? '',
      prefix: `${this.storeDir}/${segments[0]}/${segments[1]}/${matched.groups.body}`,
    };
  }

  // Resolve a shard path back to its family prefix, i.e. "are these two shards the same family".
  familyOf(repoPath) {
    const parsed = this.parseShardPath(repoPath);

    return parsed ? parsed.prefix : null;
  }

  /**
   * Whether a row sits in the wrong family: the family its key maps to is not
   * the family it physically lives in.
   *
   * This is what a page rename leaves behind: someone rewrites the url column
   * in place, so the row is invisible to every read path that routes by key.
   * Rows with an empty key have no evidence to judge by and are never moved.
   */
  isMisplacedRow(table, repoPath, row) {
    const family = this.familyOf(repoPath);

    if (!family || !row) {
      return false;
    }
    const key = toCell(row[SHARD_KEY_FIELD[table]]);

    if (key === '') {
      return false;
    }

    return this.shardPrefix(table, key) !== family;
  }

  /**
   * Infer from manifest metadata alone whether a whole shard is misplaced.
   *
   * Only conclusive when every row in the file shares one key (min_key === max_key);
   * mixed shards must be judged row by row (see CsvShardCache.repairMisplaced).
   * This cheap check is the trigger for self-healing.
   *
   * @returns {string|null} The family prefix the shard should belong to, or null.
   */
  misplacedFamilyOf(table, entry) {
    if (!entry || !entry.minKey || entry.minKey !== entry.maxKey) {
      return null;
    }
    const family = this.familyOf(entry.path);

    if (!family) {
      return null;
    }
    const canonical = this.shardPrefix(table, entry.minKey);

    return canonical === family ? null : canonical;
  }

  // Ordering inside a family: base shard first, then by split number.
  compareShardPath(left, right) {
    const suffixOf = (path) => {
      const parsed = this.parseShardPath(path);

      if (!parsed || parsed.suffix === '') {
        return 0;
      }

      return Number(parsed.suffix.slice(1));
    };

    return suffixOf(left) - suffixOf(right);
  }

  /**
   * Pick the shard a new row goes to.
   *
   * Fill-first: write to the first file in the family that is still under the
   * row cap; split into a new one only when all are full. Splitting therefore
   * shows up as a plain append instead of a table-wide rewrite.
   *
   * @param {string} table
   * @param {string} key
   * @param {Map<string, number>} familyRowCounts Shard path to current row count.
   */
  resolveWriteShard(table, key, familyRowCounts) {
    const paths = [...familyRowCounts.keys()].sort((a, b) => this.compareShardPath(a, b));

    for (const path of paths) {
      if (familyRowCounts.get(path) < this.shardMaxRows) {
        return path;
      }
    }

    const base = this.shardPath(table, key);

    if (paths.length === 0) {
      return base;
    }

    const maxSuffix = paths.reduce((max, path) => {
      const parsed = this.parseShardPath(path);

      return Math.max(max, parsed && parsed.suffix ? Number(parsed.suffix.slice(1)) : 0);
    }, 0);

    return `${this.shardPrefix(table, key)}-${maxSuffix + 1}.csv`;
  }

  /**
   * Plan a merge: compress a family back into its base shard once its total
   * row count is under the cap again.
   *
   * Pairs with fill-first splitting, so a family that empties out does not
   * keep a pile of small files forever.
   *
   * @param {string} familyPrefix Family prefix from shardPrefix().
   * @param {Map<string, number>} familyRowCounts Shard path to current row count.
   * @returns {{target: string, sources: string[]}|null} Null when nothing to merge.
   */
  planMerge(familyPrefix, familyRowCounts) {
    const paths = [...familyRowCounts.keys()].sort((a, b) => this.compareShardPath(a, b));

    if (paths.length <= 1) {
      return null;
    }
    const total = paths.reduce((sum, path) => sum + familyRowCounts.get(path), 0);

    if (total > this.shardMaxRows) {
      return null;
    }

    return { target: `${familyPrefix}.csv`, sources: paths };
  }

  // --------------------------------------------------------------------------
  // Row normalization
  // --------------------------------------------------------------------------

  /**
   * Normalize an external object into a row that can be stored and read back.
   *
   * Padding canonical columns keeps the row shape identical across shards and
   * makes queries for empty columns mean the same in memory and on disk.
   *
   * @param {boolean} options.defaults Fill createdAt / updatedAt. Only new rows
   *   may get defaults: reading rows back must never invent timestamps.
   */
  normalizeRow(table, raw, { defaults = false } = {}) {
    const row = {};
    const now = new Date().toISOString();

    for (const column of TABLE_COLUMNS[table]) {
      row[column] = '';
    }
    for (const [key, value] of Object.entries(raw ?? {})) {
      row[key] = toCell(value);
    }
    if (defaults) {
      if (!row.createdAt) {
        row.createdAt = now;
      }
      if (!row.updatedAt) {
        row.updatedAt = now;
      }
    }

    return row;
  }

  // --------------------------------------------------------------------------
  // CSV codec
  // --------------------------------------------------------------------------

  /**
   * Serialize a shard as UTF-8 + LF, quoting only when necessary (RFC 4180
   * escaping is delegated to csv-stringify). Every shard carries a header so
   * diffs stay readable and the files open in spreadsheet software.
   */
  serializeShard(table, rows, columns) {
    const header = columns ?? this.buildColumns(table, rows);

    if (rows.length === 0) {
      return `${stringify([], { header: true, columns: header, record_delimiter: '\n' })}`;
    }

    return stringify(rows, {
      header: true,
      columns: header,
      record_delimiter: '\n',
      // Unquoted by default: smaller files and more readable diffs
      quoted: false,
    });
  }

  // Canonical columns in fixed order, dynamic columns appended alphabetically.
  buildColumns(table, rows) {
    const canonical = TABLE_COLUMNS[table];
    const seen = new Set(canonical);
    const extras = new Set();

    for (const row of rows) {
      for (const key of Object.keys(row)) {
        if (!seen.has(key)) {
          extras.add(key);
        }
      }
    }

    return [...canonical, ...[...extras].sort()];
  }

  // Parse a shard; an empty or header-only file yields an empty array.
  parseShard(text) {
    if (!text || !text.trim()) {
      return [];
    }

    return parse(text, {
      columns: true,
      skip_empty_lines: true,
      relax_column_count: true,
      bom: true,
    });
  }

  // --------------------------------------------------------------------------
  // Manifest
  // --------------------------------------------------------------------------

  // Serialize the manifest, ordered by shard_path, with storeDir-relative paths.
  serializeManifest(entries) {
    const prefix = `${this.storeDir}/`;
    const records = [...entries.values()]
      .map((entry) => ({
        shard_path: entry.path.startsWith(prefix) ? entry.path.slice(prefix.length) : entry.path,
        row_count: String(entry.rowCount),
        sha: entry.sha ?? '',
        updated_at: entry.updatedAt ?? new Date().toISOString(),
        min_key: entry.minKey ?? '',
        max_key: entry.maxKey ?? '',
      }))
      .sort((a, b) => (a.shard_path < b.shard_path ? -1 : 1));

    return stringify(records, {
      header: true,
      columns: MANIFEST_HEADER,
      record_delimiter: '\n',
    });
  }

  parseManifest(text) {
    const entries = new Map();

    if (!text || !text.trim()) {
      return entries;
    }

    for (const record of parse(text, {
      columns: true,
      skip_empty_lines: true,
      relax_column_count: true,
      bom: true,
    })) {
      const rel = String(record.shard_path ?? '').trim();

      if (!rel) {
        continue;
      }
      const path = `${this.storeDir}/${rel.replace(/^\/+/u, '')}`;

      entries.set(path, {
        path,
        rowCount: Number(record.row_count) || 0,
        sha: record.sha || null,
        updatedAt: record.updated_at || null,
        minKey: record.min_key ?? '',
        maxKey: record.max_key ?? '',
      });
    }

    return entries;
  }

  // Build the manifest row for one shard from the rows it currently holds.
  manifestEntry(table, path, rows, sha) {
    const keyField = SHARD_KEY_FIELD[table];
    const keys = rows.map((row) => toCell(row[keyField])).filter(Boolean).sort((a, b) =>
      a < b ? -1 : 1,
    );

    return {
      path,
      rowCount: rows.length,
      sha: sha ?? null,
      updatedAt: new Date().toISOString(),
      minKey: keys.length > 0 ? keys[0] : '',
      maxKey: keys.length > 0 ? keys[keys.length - 1] : '',
    };
  }
}

module.exports = {
  ShardManager,
  TABLE_COLUMNS,
  TABLE_DIR,
  INDEXED_FIELDS,
  SHARD_KEY_FIELD,
  DATE_FIELDS,
  MANIFEST_HEADER,
  toCell,
  sha1,
};
