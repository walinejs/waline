'use strict';

/**
 * In-memory cache and global index over multiple CSV shards.
 *
 * It replaces "download one full CSV per query and filter it in JS" with
 * "read the index, then touch only the shards that matched".
 *
 * Two layers of state: entries is the authoritative manifest listing, shards is
 * the content actually loaded, plus loadedFamilies / allLoaded to record what
 * has been read. A family is decided purely by the shard key, so a query that
 * carries the key loads one family instead of the whole dataset, and cold start
 * no longer means downloading everything.
 *
 * Only equality/IN conditions on the shard key can narrow the load scope; when
 * a query cannot be scoped (admin lists, fuzzy search, delete by pid/rid) the
 * whole table is loaded, because reading more is always better than answering
 * incompletely.
 *
 * Indexes map to row references rather than row numbers, since a number goes
 * stale the moment a row is deleted or merged. They are maintained incrementally
 * per shard; only a full rewrite (compact, rollback, cold reset) rebuilds them.
 */

const { sha1, toCell, DATE_FIELDS } = require('./shard-manager');

const TABLES = ['Comment', 'Users', 'Counter'];

// Shared empty set: avoids allocating a new Set on every hot-path miss.
const EMPTY_SET = new Set();

/**
 * Tables whose numeric columns merge as "remote value + local delta" instead of
 * "local wins".
 *
 * Counters increment concurrently and Waline passes
 * `(counter) => ({ time: counter.time + 1 })`: two instances based on the same
 * baseline each add 1, and whoever commits last wins, which silently erases the
 * other +1 and shows up as view counts lagging behind reality. Recording the
 * delta this instance applied and adding it on top of the remote value keeps
 * both. Comments are whole-row writes, so they keep local priority.
 */
const DELTA_MERGE_TABLES = new Set(['Counter']);

// CSV numbers are strings, and '' must count as "not a number", otherwise
// Number('') === 0 takes part in comparisons.
const numericOf = (value) => {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : Number.NaN;
  }
  if (typeof value !== 'string') {
    return Number.NaN;
  }
  const text = value.trim();

  return text === '' ? Number.NaN : Number(text);
};

// ---------------------------------------------------------------------------
// Query engine (the subset of where semantics Waline / ThinkJS expose)
// ---------------------------------------------------------------------------

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');

// Treat ''/null/undefined uniformly as "empty", matching how CSV round-trips.
const isEmptyValue = (value) => value === '' || value === null || value === undefined;

/**
 * Compare two values, with date fields and date literals compared as timestamps.
 *
 * Upstream compares `item[k] >= where[k][1]` directly, and string vs Date
 * coerces to NaN, making the condition always false — that is why comment
 * frequency limits (IPQPS) never fired.
 */
const compareValues = (left, right) => {
  const leftDate = left instanceof Date;
  const rightDate = right instanceof Date;

  if (leftDate || rightDate) {
    const leftTime = leftDate ? left.getTime() : Date.parse(left);
    const rightTime = rightDate ? right.getTime() : Date.parse(right);

    if (!Number.isNaN(leftTime) && !Number.isNaN(rightTime)) {
      return leftTime === rightTime ? 0 : leftTime > rightTime ? 1 : -1;
    }
  }

  const a = isEmptyValue(left) ? '' : String(left);
  const b = isEmptyValue(right) ? '' : String(right);

  return a === b ? 0 : a > b ? 1 : -1;
};

// LIKE semantics: `%x%` contains, `%x` ends with, `x%` starts with, plain equals.
const buildLikeMatcher = (pattern) => {
  const text = String(pattern);
  const first = text.startsWith('%');
  const last = text.endsWith('%') && text.length > 1;

  if (first && last) {
    const regex = new RegExp(escapeRegex(text.slice(1, -1)), 'u');

    return (value) => regex.test(String(value ?? ''));
  }
  if (first) {
    const suffix = text.slice(1);

    return (value) => String(value ?? '').endsWith(suffix);
  }
  if (last) {
    const prefix = text.slice(0, -1);

    return (value) => String(value ?? '').startsWith(prefix);
  }

  return (value) => String(value ?? '') === text;
};

const asSet = (values) => new Set(values.map((value) => (value === null || value === undefined ? '' : String(value))));

// Turn one field condition into row predicates.
const parseFieldFilters = (field, condition) => {
  if (condition === undefined) {
    return [(row) => isEmptyValue(row[field])];
  }
  if (condition instanceof Date) {
    const expected = condition.toISOString();

    return [(row) => String(row[field] ?? '') === expected];
  }
  if (condition === null || typeof condition !== 'object') {
    return [(row) => String(row[field] ?? '') === String(condition)];
  }
  if (!Array.isArray(condition) || condition.length === 0 || !condition[0]) {
    return [];
  }

  const operator = String(condition[0]).toUpperCase();
  const operand = condition[1];

  switch (operator) {
    case 'IN': {
      const pool = asSet(Array.isArray(operand) ? operand : [operand]);

      return [(row) => pool.has(String(row[field] ?? ''))];
    }
    case 'NOT IN': {
      const pool = asSet(Array.isArray(operand) ? operand : [operand]);

      return [(row) => !pool.has(String(row[field] ?? ''))];
    }
    case 'LIKE': {
      const matches = buildLikeMatcher(operand);

      return [(row) => matches(row[field])];
    }
    case '!=':
      return [(row) => String(row[field] ?? '') !== String(operand)];
    case '>':
      return [(row) => compareValues(row[field], operand) > 0];
    default:
      return [];
  }
};

/**
 * Compile a where into a row predicate.
 *
 * `_complex` deliberately mirrors upstream: outer plain conditions apply to
 * every branch, so
 *   { status: ['NOT IN', [...]], _complex: { user_id, mail, _logic: 'or' } }
 * means status NOT IN (...) AND (user_id = ? OR mail = ?).
 */
const compileWhere = (where) => {
  if (!where || typeof where !== 'object' || Object.keys(where).length === 0) {
    return () => true;
  }

  const outerFilters = [];

  for (const [field, condition] of Object.entries(where)) {
    if (field === '_complex') {
      continue;
    }
    outerFilters.push(...parseFieldFilters(field, condition));
  }

  const complex = where._complex;

  if (!complex || typeof complex !== 'object') {
    return (row) => outerFilters.every((filter) => filter(row));
  }

  const branches = [];

  for (const [field, condition] of Object.entries(complex)) {
    if (field === '_logic') {
      continue;
    }
    branches.push([...outerFilters, ...parseFieldFilters(field, condition)]);
  }

  const isOr = String(complex._logic ?? 'and').toLowerCase() === 'or';
  const combine = isOr ? 'some' : 'every';

  return (row) => branches[combine]((branch) => branch.every((filter) => filter(row)));
};

/**
 * Ordering, equivalent to upstream storage/order.js normalizeOrder + compareByOrder.
 *
 * Reimplemented rather than required from the package: that is an internal path,
 * not a public export, and it may move between releases.
 */
const normalizeOrder = (order, desc, mapField = (field) => field) => {
  const entries = order ?? (desc ? [{ field: desc, direction: 'desc' }] : []);

  return entries.map(({ field, direction = 'asc', nulls }) => {
    const normalizedDirection = String(direction).toLowerCase();
    const normalizedNulls = nulls ? String(nulls).toLowerCase() : undefined;

    if (normalizedDirection !== 'asc' && normalizedDirection !== 'desc') {
      throw new TypeError(`Invalid order direction: ${direction}`);
    }
    if (normalizedNulls && normalizedNulls !== 'first' && normalizedNulls !== 'last') {
      throw new TypeError(`Invalid null order: ${nulls}`);
    }

    return { field: mapField(field), direction: normalizedDirection, nulls: normalizedNulls };
  });
};

const compareByOrder = (order) => (left, right) => {
  for (const { field, direction, nulls } of order) {
    const leftRaw = left[field];
    const rightRaw = right[field];
    const leftEmpty = isEmptyValue(leftRaw);
    const rightEmpty = isEmptyValue(rightRaw);

    if (leftEmpty || rightEmpty) {
      if (leftEmpty && rightEmpty) {
        continue;
      }
      // Matches upstream: empty values sort last unless nulls says otherwise
      const emptyFirst = nulls === 'first' ? -1 : 1;

      return leftEmpty ? emptyFirst : -emptyFirst;
    }

    let result;
    const leftTime = DATE_FIELDS.has(field) ? Date.parse(leftRaw) : Number.NaN;
    const rightTime = DATE_FIELDS.has(field) ? Date.parse(rightRaw) : Number.NaN;

    if (!Number.isNaN(leftTime) && !Number.isNaN(rightTime)) {
      result = leftTime === rightTime ? 0 : leftTime > rightTime ? 1 : -1;
    } else {
      const a = String(leftRaw);
      const b = String(rightRaw);

      result = a === b ? 0 : a > b ? 1 : -1;
    }

    if (result !== 0) {
      return direction === 'desc' ? -result : result;
    }
  }

  return 0;
};

class CsvShardCache {
  constructor({
    github,
    manager,
    logger = console,
    cacheTtl = 60000,
    parallelism = 6,
  } = {}) {
    this.github = github;
    this.manager = manager;
    this.logger = logger;
    this.cacheTtl = cacheTtl;
    this.parallelism = parallelism;
    this.ready = false;
    this.lastRefresh = 0;
    this.manifestSha = {};
    // path to { table, deleted: Set<objectId>, deltas }: its presence marks the
    // shard as having uncommitted changes.
    this.pending = new Map();
    // path to { table, existed, sha, rows }: content as of the last successful
    // commit, used to roll back a failed one.
    this.baselines = new Map();
    // Table to in-flight healing promise, so concurrent refreshes move rows once.
    this.healing = new Map();
    this.tables = {};

    for (const table of TABLES) {
      this.tables[table] = CsvShardCache.emptyTable();
    }
  }

  static emptyTable() {
    return {
      // Authoritative listing: every shard in the manifest, loaded or not
      entries: new Map(),
      // Shards whose content is loaded
      shards: new Map(),
      byId: new Map(),
      byField: new Map(),
      // Family prefix to shard paths, a projection of entries used for write routing
      families: new Map(),
      /**
       * Canonical family prefix to shard paths that live elsewhere.
       *
       * A page rename leaves these behind: the url column was rewritten but the
       * file stayed in the family the old address hashes to. Such rows are
       * misplaced with respect to their physical family, but perfectly valid for
       * their new key. Registering them with the family they belong to restores
       * reads that route by key, and doubles as the trigger for self-healing:
       * non-empty means the repository still holds data waiting to be moved.
       */
      aliases: new Map(),
      // Families that have been loaded as a whole
      loadedFamilies: new Set(),
      // Whether every shard of the table is loaded
      allLoaded: false,
    };
  }

  // Whether a table needs pending deletions to count towards a commit.
  pendingEntry(path, table) {
    let entry = this.pending.get(path);

    if (!entry) {
      entry = { table, deleted: new Set(), deltas: null };
      this.pending.set(path, entry);
      // Snapshot the baseline when the shard first goes dirty: its content is
      // still "as of the last successful commit" at that moment
      this.captureBaseline(path, table);
    }

    return entry;
  }

  /**
   * Record a shard's rollback baseline.
   *
   * Must happen before the change reaches memory, not at flush time: by then the
   * new content is already in memory and the "baseline" would contain it, making
   * rollback a no-op.
   */
  captureBaseline(path, table) {
    if (this.baselines.has(path)) {
      return;
    }
    const state = this.tables[table];
    const shard = state.shards.get(path);
    const meta = state.entries.get(path);

    this.baselines.set(path, {
      table,
      // A non-empty sha means the shard really existed remotely; empty means this
      // request just created it
      existed: Boolean(meta?.sha ?? shard?.sha),
      sha: shard?.sha ?? meta?.sha ?? null,
      rows: shard ? shard.rows.map((row) => ({ ...row })) : [],
    });
  }

  isDirty() {
    return this.pending.size > 0;
  }

  // --------------------------------------------------------------------------
  // Loading: manifest refresh plus on-demand family loading
  // --------------------------------------------------------------------------

  async ensureFresh(maxAgeMs = this.cacheTtl) {
    if (this.ready && Date.now() - this.lastRefresh < maxAgeMs) {
      return;
    }

    await this.refresh();
  }

  /**
   * Fetch manifests and re-download only the shards whose SHA changed.
   *
   * A refresh therefore costs a fixed three Contents API calls (one manifest per
   * table) plus whatever actually changed, where the old approach downloaded
   * every CSV on every query.
   *
   * @param {boolean} options.force Ignore the manifest's own SHA and compare every shard.
   * @param {string[]} options.tables Refresh only these tables (SHA pre-checks).
   * @param {boolean} options.preferRemote Let the remote win on conflict (manual
   *   reconciliation, restore); by default local wins, since local holds this
   *   instance's uncommitted changes.
   */
  async refresh({ force = false, tables = TABLES, preferRemote = false } = {}) {
    const targets = tables.filter((table) => TABLES.includes(table));
    const manifests = await Promise.all(
      targets.map((table) => this.github.getFile(this.manager.manifestPath(table))),
    );
    const synced = [];

    for (const [index, table] of targets.entries()) {
      const file = manifests[index];
      const sha = file ? file.sha : null;

      if (!force && this.ready && this.manifestSha[table] === sha) {
        continue;
      }

      const entries = file ? this.manager.parseManifest(file.content) : new Map();

      await this.syncTable(table, entries, { preferRemote });
      this.manifestSha[table] = sha;
      synced.push(table);
    }

    this.ready = true;
    this.lastRefresh = Date.now();

    // Self-heal: when a page rename left misplaced shards behind, move those rows
    // back while we are here. It belongs in refresh because only the manifest can
    // tell us whether anything is misplaced; once the move is committed the entry
    // metadata is rebuilt from reality and aliases empties out, so the next
    // refresh skips it. Each process pays this full-table load at most once.
    for (const table of synced) {
      if (this.tables[table].aliases.size > 0) {
        await this.healMisplaced(table);
      }
    }
  }

  // Align a table's memory with its manifest: refresh the listing, then re-download the changed shards inside the loaded scope.
  async syncTable(table, entries, { preferRemote = false } = {}) {
    const state = this.tables[table];
    const next = new Map(entries);

    // Shards created locally but not yet committed are absent from the remote
    // manifest and must be added to the authoritative listing, otherwise the next
    // manifest rebuild drops them (a file that exists but cannot be read)
    for (const [path, pending] of this.pending) {
      if (pending.table !== table || next.has(path)) {
        continue;
      }
      const shard = state.shards.get(path);

      if (shard && shard.rows.length > 0) {
        next.set(path, {
          path,
          rowCount: shard.rows.length,
          sha: shard.sha ?? null,
          updatedAt: null,
          minKey: '',
          maxKey: '',
        });
      }
    }

    const targets = [];
    const removals = [];

    for (const [path, entry] of next) {
      const cached = state.shards.get(path);

      // Same SHA means local and remote agree; even uncommitted local changes
      // need no re-download, because a pending shard is rewritten whole
      if (cached && cached.sha === entry.sha) {
        continue;
      }
      // Only re-download shards that were already loaded; the rest wait for
      // ensureFamily to load them on demand
      if (this.isLoadedPath(table, path)) {
        targets.push(path);
      }
    }
    for (const path of state.shards.keys()) {
      if (!next.has(path) && !this.pending.has(path)) {
        removals.push(path);
      }
    }

    state.entries = next;
    this.rebuildFamilies(table);

    for (const path of removals) {
      this.unindexShard(table, path);
      state.shards.delete(path);
    }

    if (targets.length > 0) {
      await this.loadShards(table, targets, { preferRemote: false });
    }

    return state;
  }

  /**
   * Download and merge a batch of shards.
   *
   * @param {boolean} options.preferRemote Let remote content replace local wholesale (manual reconciliation).
   */
  async loadShards(table, paths, { preferRemote = false } = {}) {
    const state = this.tables[table];
    // Callers pick the paths: ensureFamily/ensureAll pass unloaded ones, syncTable
    // passes "loaded but SHA changed" — both must really be downloaded
    const targets = paths;

    for (let start = 0; start < targets.length; start += this.parallelism) {
      const batch = targets.slice(start, start + this.parallelism);
      const files = await Promise.all(batch.map((path) => this.github.getFile(path)));

      for (const [offset, path] of batch.entries()) {
        const file = files[offset];
        const remoteRows = file ? this.manager.parseShard(file.content) : [];

        this.mergeShard(table, path, remoteRows, state.entries.get(path)?.sha ?? null, { preferRemote });
      }
    }
  }

  // Whether a shard is inside the loaded scope: whole table, loaded family, or already in memory.
  isLoadedPath(table, path) {
    const state = this.tables[table];

    if (state.allLoaded || state.shards.has(path)) {
      return true;
    }
    const family = this.manager.familyOf(path);

    return Boolean(family && state.loadedFamilies.has(family));
  }

  /**
   * All paths of a family: its own shards plus those parked elsewhere by a page rename.
   *
   * The two cannot overlap, since a path is registered as an alias only when its
   * physical family differs from the target, while families.get(prefix) only
   * holds paths whose physical family is prefix.
   */
  *iterFamilyPaths(table, prefix) {
    const state = this.tables[table];

    yield* state.families.get(prefix) ?? EMPTY_SET;
    yield* state.aliases.get(prefix) ?? EMPTY_SET;
  }

  // Load a family; idempotent, already-loaded families return immediately.
  async ensureFamily(table, prefix) {
    const state = this.tables[table];

    if (state.allLoaded || state.loadedFamilies.has(prefix)) {
      return;
    }
    const paths = [...this.iterFamilyPaths(table, prefix)].filter((path) => !state.shards.has(path));

    await this.loadShards(table, paths);
    state.loadedFamilies.add(prefix);
  }

  // Load several families at once, as needed by `url IN (...)` queries.
  async ensureFamilies(table, prefixes) {
    const list = [...prefixes];

    for (let start = 0; start < list.length; start += this.parallelism) {
      await Promise.all(list.slice(start, start + this.parallelism).map((prefix) => this.ensureFamily(table, prefix)));
    }
  }

  // Load the whole table, for queries that cannot be scoped to a family.
  async ensureAll(table) {
    const state = this.tables[table];

    if (state.allLoaded) {
      return;
    }
    await this.loadShards(table, [...state.entries.keys()].filter((path) => !state.shards.has(path)));
    state.allLoaded = true;
  }

  /**
   * Whether a where can be scoped down to families.
   *
   * Only equality/IN on the shard key locates a family. A `_complex` on its own
   * is safe only when every branch is on the shard key, because outer conditions
   * apply to each branch.
   *
   * @returns {{complete: boolean, prefixes: Set<string>|null}} complete=false forces a full table load, or results may be incomplete.
   */
  scopeFor(table, where) {
    const keyField = this.manager.shardKeyField(table);
    const prefixesOf = (condition) => {
      if (Array.isArray(condition)) {
        const operator = String(condition[0] ?? '').toUpperCase();

        if (operator === 'IN' && Array.isArray(condition[1])) {
          return new Set(condition[1].map((value) => this.manager.shardPrefix(table, toCell(value))));
        }

        return null;
      }
      if (condition !== null && typeof condition === 'object') {
        return condition instanceof Date
          ? new Set([this.manager.shardPrefix(table, toCell(condition))])
          : null;
      }

      // undefined means "column is empty", which lives in the key='' family too
      return new Set([this.manager.shardPrefix(table, condition === undefined ? '' : toCell(condition))]);
    };

    if (where && typeof where === 'object') {
      if (Object.prototype.hasOwnProperty.call(where, keyField)) {
        const prefixes = prefixesOf(where[keyField]);

        return prefixes ? { complete: true, prefixes } : { complete: false, prefixes: null };
      }

      const complex = where._complex;

      if (complex && typeof complex === 'object') {
        const union = new Set();
        let complete = true;

        for (const [field, condition] of Object.entries(complex)) {
          if (field === '_logic') {
            continue;
          }
          if (field !== keyField) {
            complete = false;
            break;
          }
          const prefixes = prefixesOf(condition);

          if (!prefixes) {
            complete = false;
            break;
          }
          for (const prefix of prefixes) {
            union.add(prefix);
          }
        }

        if (complete && union.size > 0) {
          return { complete: true, prefixes: union };
        }
      }
    }

    return { complete: false, prefixes: null };
  }

  // Prepare the load scope for a query; null means the whole table is loaded.
  async ensureScope(table, where) {
    const scope = this.scopeFor(table, where);

    if (!scope.complete) {
      await this.ensureAll(table);

      return null;
    }
    await this.ensureFamilies(table, scope.prefixes);

    return scope.prefixes;
  }

  /**
   * Rebuild the index from the repository's real file list and mark changed
   * shards as pending, so the next flush repairs the manifest.
   *
   * Needed because the read path trusts the SHAs recorded in the manifest, which
   * is what lets one request tell "what changed". When someone edits CSVs
   * directly in the repository, the manifest falls behind and this explicit
   * full reconciliation is the way back.
   *
   * Being a full reconciliation, it loads the whole table.
   *
   * @returns {{changed: number, tables: string[], repairs: object}}
   */
  async syncFromTree() {
    const files = await this.github.listTree(`${this.manager.storeDir}/`);
    const changedTables = new Set();
    const repairs = {};
    let changed = 0;

    for (const table of TABLES) {
      const entries = new Map();

      for (const [path, meta] of files) {
        if (this.manager.parseShardPath(path)?.table === table) {
          entries.set(path, { path, sha: meta.sha, rowCount: 0, updatedAt: null, minKey: '', maxKey: '' });
        }
      }

      const before = new Map([...this.tables[table].shards].map(([path, shard]) => [path, shard.sha]));
      // Start over from the repository: clear memory, then mark the table as fully
      // loaded so syncTable downloads everything
      this.tables[table] = CsvShardCache.emptyTable();
      this.tables[table].allLoaded = true;
      await this.syncTable(table, entries, { preferRemote: true });

      // rebuild is the reconciliation for "someone edited the repository by hand".
      // Copying the current state verbatim is not enough: shards left misplaced by
      // a page rename would be copied straight back and stay unreadable. Moving
      // them here is what makes rebuild mean "re-sync".
      repairs[this.manager.tableDir(table)] = await this.repairMisplaced(table);

      for (const [path, shard] of this.tables[table].shards) {
        if (before.get(path) !== shard.sha) {
          this.pendingEntry(path, table);
          changed += 1;
          changedTables.add(table);
        }
      }
      this.manifestSha[table] = null;
    }

    this.ready = true;
    this.lastRefresh = Date.now();

    return { changed, tables: [...changedTables], repairs };
  }

  // --------------------------------------------------------------------------
  // Index: incremental maintenance per shard
  // --------------------------------------------------------------------------

  // Rebuild all indexes for a table; only after a whole-table rewrite.
  rebuildIndexes(table) {
    const state = this.tables[table];
    const indexedFields = this.manager.indexedFields(table);

    state.byId = new Map();
    state.byField = new Map();

    for (const field of indexedFields) {
      state.byField.set(field, new Map());
    }

    for (const [shardPath, shard] of state.shards) {
      for (const row of shard.rows) {
        const objectId = row.objectId ?? '';

        if (!objectId) {
          continue;
        }

        state.byId.set(objectId, { shardPath, row });
        this.indexRow(state, table, row);
      }
    }
  }

  // Register every row of a shard in the index.
  indexShard(table, path) {
    const state = this.tables[table];
    const shard = state.shards.get(path);

    if (!shard) {
      return;
    }
    for (const row of shard.rows) {
      const objectId = row.objectId ?? '';

      if (!objectId) {
        continue;
      }
      state.byId.set(objectId, { shardPath: path, row });
      this.indexRow(state, table, row);
    }
  }

  // Drop every row of a shard from the index, before its content is replaced or
  // the shard is deleted.
  unindexShard(table, path) {
    const state = this.tables[table];
    const shard = state.shards.get(path);

    if (!shard) {
      return;
    }
    for (const row of shard.rows) {
      this.unindexRow(state, table, row);
    }
  }

  // Add a row to each field's inverted bucket (byId is maintained by callers, who know the shard).
  indexRow(state, table, row) {
    const objectId = row.objectId ?? '';

    for (const field of this.manager.indexedFields(table)) {
      const value = row[field] ?? '';
      let bucket = state.byField.get(field);

      // Lazy init: a fresh table state may not have the bucket yet
      if (!bucket) {
        bucket = new Map();
        state.byField.set(field, bucket);
      }
      if (!bucket.has(value)) {
        bucket.set(value, new Set());
      }
      bucket.get(value).add(objectId);
    }
  }

  unindexRow(state, table, row) {
    const objectId = row.objectId ?? '';

    for (const field of this.manager.indexedFields(table)) {
      const value = row[field] ?? '';
      const bucket = state.byField.get(field);

      bucket?.get(value)?.delete(objectId);
    }
    state.byId.delete(objectId);
  }

  /**
   * Rebuild the family index from the listing (O(shard count), on refresh only).
   *
   * It produces two maps rather than one on purpose:
   *   - families drives write routing and only trusts physical families, so a
   *     new comment can never be written into a misplaced file;
   *   - aliases backs reads, mapping misplaced files to the family their rows
   *     actually belong to.
   */
  rebuildFamilies(table) {
    const state = this.tables[table];
    const families = new Map();
    const aliases = new Map();
    const register = (map, key, path) => {
      if (!map.has(key)) {
        map.set(key, new Set());
      }
      map.get(key).add(path);
    };

    for (const [path, entry] of state.entries) {
      const family = this.manager.familyOf(path);

      if (!family) {
        continue;
      }
      register(families, family, path);

      // Misplacement detection. Loaded rows take precedence over manifest
      // metadata: a shard that was just moved or just fetched still carries stale
      // min_key/max_key, and trusting those would re-trigger healing before the
      // move is even committed. Metadata is only consulted when the row count
      // agrees with the listing, which keeps this free of extra cost.
      const shard = state.shards.get(path);
      const meta =
        shard && shard.rows.length !== entry.rowCount
          ? this.manager.manifestEntry(table, path, shard.rows, shard.sha)
          : entry;
      const canonical = this.manager.misplacedFamilyOf(table, meta);

      if (canonical) {
        register(aliases, canonical, path);
      }
    }

    state.families = families;
    state.aliases = aliases;
  }

  /**
   * Merge remote shard content into local memory.
   *
   * Default merge rules (local wins, since local is this instance's view):
   *   1. An objectId already present locally keeps the local version, including
   *      this instance's uncommitted edits; counters are the exception and merge
   *      as "remote value + local delta".
   *   2. An objectId deleted locally stays deleted and is not resurrected.
   *   3. Everything else is appended — data another instance wrote that this one
   *      has not seen yet.
   *
   * preferRemote flips to "remote replaces local", for manual reconciliation
   * where the repository is authoritative and local may be the stale copy.
   */
  mergeShard(table, path, remoteRows, sha, { preferRemote = false } = {}) {
    const state = this.tables[table];
    let shard = state.shards.get(path);

    if (!shard) {
      shard = { rows: [], sha: null };
      state.shards.set(path, shard);
      if (!state.entries.has(path)) {
        state.entries.set(path, { path, rowCount: 0, sha: null, updatedAt: null, minKey: '', maxKey: '' });
      }
      const family = this.manager.familyOf(path);

      if (family) {
        if (!state.families.has(family)) {
          state.families.set(family, new Set());
        }
        state.families.get(family).add(path);
      }
    }

    if (preferRemote) {
      this.unindexShard(table, path);
      shard.rows = remoteRows.map((row) => this.manager.normalizeRow(table, row));
      shard.sha = sha;
      this.pending.delete(path);
      this.indexShard(table, path);

      return shard;
    }

    const pending = this.pending.get(path);
    const localById = new Map(shard.rows.map((row) => [row.objectId ?? '', row]));

    for (const remote of remoteRows) {
      const objectId = remote.objectId ?? '';

      if (!objectId) {
        continue;
      }
      const local = localById.get(objectId);

      if (local) {
        // Present on both sides: keep local by default; counters merge deltas
        if (DELTA_MERGE_TABLES.has(table)) {
          this.applyRemoteDelta(local, remote, pending?.deltas?.get(objectId));
        }
        continue;
      }
      if (pending?.deleted.has(objectId)) {
        continue;
      }
      const row = this.manager.normalizeRow(table, remote);

      shard.rows.push(row);
      localById.set(objectId, row);
      state.byId.set(objectId, { shardPath: path, row });
      this.indexRow(state, table, row);
    }

    shard.sha = sha;

    return shard;
  }

  /**
   * Deduplication fingerprint: mail + url + content hash.
   *
   * Deliberately not a global inverted index: a Map<hash, Set> costs over 20MB at
   * 100k comments, roughly a quarter of total memory, while dedup runs on inserts
   * only and can recompute the handful of candidates for one url for free.
   */
  dedupHash(row) {
    if (!row || !row.comment) {
      return '';
    }

    return sha1(`${row.mail ?? ''}\u0000${row.url ?? ''}\u0000${row.comment ?? ''}`);
  }

  // --------------------------------------------------------------------------
  // Queries
  // --------------------------------------------------------------------------

  *iterateRows(table) {
    for (const shard of this.tables[table].shards.values()) {
      yield* shard.rows;
    }
  }

  // Iterate only the loaded shards of the given families, aliases included.
  *iterateFamilyRows(table, prefixes) {
    const state = this.tables[table];

    for (const prefix of prefixes) {
      for (const path of this.iterFamilyPaths(table, prefix)) {
        const shard = state.shards.get(path);

        if (shard) {
          yield* shard.rows;
        }
      }
    }
  }

  /**
   * Read one row by primary key.
   *
   * Users shard by objectId, so the family can be computed directly; for other
   * tables objectId says nothing about placement, so the table must be loaded.
   */
  async getRow(table, objectId) {
    const state = this.tables[table];

    if (this.manager.shardKeyField(table) === 'objectId') {
      await this.ensureFamily(table, this.manager.shardPrefix(table, objectId ?? ''));

      return state.byId.get(objectId) ?? null;
    }
    await this.ensureAll(table);

    return state.byId.get(objectId) ?? null;
  }

  shardPathOf(table, objectId) {
    return this.tables[table].byId.get(objectId)?.shardPath ?? null;
  }

  /**
   * Narrow candidates from "whole table" to "matching buckets" via the index.
   * Null means no usable index (full scan), an empty set means no match at all.
   */
  narrowCandidates(table, where) {
    if (!where || typeof where !== 'object') {
      return null;
    }
    const state = this.tables[table];
    const indexedFields = this.manager.indexedFields(table);
    let result = null;
    const intersect = (ids) => {
      if (result === null) {
        result = ids;

        return;
      }
      const next = new Set();

      for (const id of result) {
        if (ids.has(id)) {
          next.add(id);
        }
      }
      result = next;
    };

    const collect = (field, condition, lookup) => {
      if (condition === undefined || condition === null) {
        return;
      }
      if (!Array.isArray(condition)) {
        // toCell, not String(): a Date condition has to land as an ISO string, or
        // the lookup uses local time and silently returns nothing
        intersect(lookup(toCell(condition)));

        return;
      }
      const operator = String(condition[0] ?? '').toUpperCase();

      if (operator === 'IN' && Array.isArray(condition[1])) {
        const union = new Set();

        for (const value of condition[1]) {
          for (const id of lookup(String(value)) ?? EMPTY_SET) {
            union.add(id);
          }
        }
        intersect(union);
      }
      // Other operators (!= / NOT IN / LIKE / >) cannot be narrowed safely by an
      // equality index, so they are skipped here
    };

    for (const [field, condition] of Object.entries(where)) {
      if (field === '_complex') {
        continue;
      }
      if (field === 'objectId') {
        collect(field, condition, (value) => (state.byId.has(value) ? new Set([value]) : EMPTY_SET));
        continue;
      }
      if (!indexedFields.includes(field)) {
        continue;
      }
      collect(field, condition, (value) => state.byField.get(field)?.get(value) ?? EMPTY_SET);
    }

    return result;
  }

  /**
   * Return the row references matching a where, without projection or paging, for
   * update and delete.
   *
   * The required families are loaded first: a scopable query loads only what it
   * hits, while an unscopable one loads the whole table, so results stay complete.
   */
  async filterRows(table, where) {
    const prefixes = await this.ensureScope(table, where);
    const matcher = compileWhere(where);
    const candidates = this.narrowCandidates(table, where);
    const state = this.tables[table];
    const matched = [];

    if (candidates === null) {
      const rows = prefixes === null ? this.iterateRows(table) : this.iterateFamilyRows(table, prefixes);

      for (const row of rows) {
        if (matcher(row)) {
          matched.push(row);
        }
      }

      return matched;
    }

    for (const objectId of candidates) {
      const entry = state.byId.get(objectId);

      if (entry && matcher(entry.row)) {
        matched.push(entry.row);
      }
    }

    return matched;
  }

  // Apply where, projection, order and limit/offset, then return the result.
  async select(table, where, { desc, field, limit, offset, order } = {}) {
    const matched = await this.filterRows(table, where);
    const normalizedOrder = normalizeOrder(order, desc, (orderField) =>
      orderField === 'id' ? 'objectId' : orderField,
    );

    if (normalizedOrder.length > 0) {
      matched.sort(compareByOrder(normalizedOrder));
    }

    const start = offset ?? 0;
    const sliced = matched.slice(start, limit ? start + limit : undefined);

    return sliced.map((row) => this.projectRow(row, field));
  }

  async count(table, where = {}, { group } = {}) {
    const rows = await this.filterRows(table, where);

    if (!group) {
      return rows.length;
    }

    const counts = new Map();

    for (const row of rows) {
      const key = group.map((field) => row[field] ?? '').join(',');
      let bucket = counts.get(key);

      if (!bucket) {
        bucket = { count: 0 };

        for (const field of group) {
          bucket[field] = row[field] ?? '';
        }
        counts.set(key, bucket);
      }
      bucket.count += 1;
    }

    return [...counts.values()];
  }

  /**
   * Projection. `id` is an alias used by upstream (logic/base.js passes
   * field: ['id', ...]); objectId is always kept because controllers rely on it.
   *
   * The result is always a new object: controllers such as formatCmt delete or
   * overwrite fields, and returning cached rows would pollute the cache.
   */
  projectRow(row, field) {
    if (!field || field.length === 0) {
      return { ...row };
    }

    const projection = {};

    for (const name of field) {
      const key = name === 'id' ? 'objectId' : name;

      if (key in row) {
        projection[key] = row[key];
      }
    }
    projection.objectId = row.objectId ?? '';

    return projection;
  }

  // --------------------------------------------------------------------------
  // Mutations (memory is authoritative; persistence belongs to the write queue)
  // --------------------------------------------------------------------------

  // Row counts per shard inside a family, for fill-first write routing.
  familyRowCounts(table, prefix) {
    const state = this.tables[table];
    const counts = new Map();

    for (const path of state.families.get(prefix) ?? EMPTY_SET) {
      const shard = state.shards.get(path);

      if (shard) {
        counts.set(path, shard.rows.length);
        continue;
      }
      // Family shards should all be loaded after ensureFamily; fall back to the
      // listing's row count
      const meta = state.entries.get(path);

      if (meta) {
        counts.set(path, meta.rowCount);
      }
    }

    return counts;
  }

  // Make sure a shard exists in memory, for a new shard or one just discovered
  // in the manifest.
  ensureShard(table, path) {
    const state = this.tables[table];
    let shard = state.shards.get(path);

    if (!shard) {
      shard = { rows: [], sha: null };
      state.shards.set(path, shard);
      if (!state.entries.has(path)) {
        state.entries.set(path, { path, rowCount: 0, sha: null, updatedAt: null, minKey: '', maxKey: '' });
      }
      const family = this.manager.familyOf(path);

      if (family) {
        if (!state.families.has(family)) {
          state.families.set(family, new Set());
        }
        state.families.get(family).add(path);
      }
    }

    return shard;
  }

  // Insert a row and return the shard it landed in.
  async applyAdd(table, row) {
    const keyField = this.manager.shardKeyField(table);
    const key = row[keyField] ?? '';
    const prefix = this.manager.shardPrefix(table, key);

    // The target family must be loaded first: choosing a shard needs the row
    // counts of every shard in the family
    await this.ensureFamily(table, prefix);

    const path = this.manager.resolveWriteShard(table, key, this.familyRowCounts(table, prefix));
    const shard = this.ensureShard(table, path);

    // Order matters: mark dirty (snapshot the baseline) before touching rows
    this.pendingEntry(path, table);

    shard.rows.push(row);

    const state = this.tables[table];

    state.byId.set(row.objectId, { shardPath: path, row });
    this.indexRow(state, table, row);

    return path;
  }

  /**
   * Update a row in place, returning the updated row or null if not found.
   *
   * In place rather than by replacing the row object: byId stores references, so
   * an in-place edit is immediately visible to every index view holding one.
   */
  applyUpdate(table, objectId, patch) {
    const entry = this.tables[table].byId.get(objectId);

    if (!entry) {
      return null;
    }
    const state = this.tables[table];
    const pending = this.pendingEntry(entry.shardPath, table);
    const trackDelta = DELTA_MERGE_TABLES.has(table);
    const deltaFields = trackDelta ? Object.keys(patch ?? {}) : [];
    // Deltas must be read before the change: what matters is how much this update
    // applied, not the final value
    const before = trackDelta ? deltaFields.map((key) => entry.row[key]) : null;

    this.unindexRow(state, table, entry.row);

    for (const [key, value] of Object.entries(patch)) {
      if (key === 'objectId') {
        continue;
      }
      // toCell, not String(): a Date has to land as ISO, or updatedAt becomes a
      // localized string inconsistent with existing data
      entry.row[key] = toCell(value);
    }
    entry.row.updatedAt = new Date().toISOString();

    if (trackDelta) {
      deltaFields.forEach((key, index) => {
        const from = numericOf(before[index]);
        const to = numericOf(entry.row[key]);

        if (Number.isFinite(from) && Number.isFinite(to) && from !== to) {
          this.recordDelta(pending, objectId, key, to - from);
        }
      });
    }

    state.byId.set(objectId, entry);
    this.indexRow(state, table, entry.row);

    return entry.row;
  }

  // Accumulate a field's delta: repeated increments on one row add up.
  recordDelta(pending, objectId, field, delta) {
    if (!pending.deltas) {
      pending.deltas = new Map();
    }
    let fields = pending.deltas.get(objectId);

    if (!fields) {
      fields = new Map();
      pending.deltas.set(objectId, fields);
    }
    fields.set(field, (fields.get(field) ?? 0) + delta);
  }

  /**
   * Refresh a local row's numeric columns from the remote row: remote + delta.
   *
   * Without a delta (a plain read refresh) this is "remote wins", which is what a
   * counter wants: it only ever moves forward by increments, so there is no
   * "more authoritative local absolute value" to preserve.
   */
  applyRemoteDelta(localRow, remoteRow, deltas) {
    for (const [key, value] of Object.entries(remoteRow)) {
      if (key === 'objectId') {
        continue;
      }
      const remoteNumber = numericOf(value);

      if (!Number.isFinite(remoteNumber)) {
        continue;
      }
      localRow[key] = toCell(remoteNumber + (deltas?.get(key) ?? 0));
    }

    // Non-numeric columns (url and friends) keep local priority; timestamps take
    // the newer of the two, which helps when reconciling
    if (
      remoteRow.updatedAt &&
      (!localRow.updatedAt || compareValues(remoteRow.updatedAt, localRow.updatedAt) > 0)
    ) {
      localRow.updatedAt = toCell(remoteRow.updatedAt);
    }
  }

  // Delete a row and return the shard it came from.
  applyDelete(table, objectId) {
    const entry = this.tables[table].byId.get(objectId);

    if (!entry) {
      return null;
    }
    const state = this.tables[table];
    const shard = state.shards.get(entry.shardPath);

    const pending = this.pendingEntry(entry.shardPath, table);

    this.unindexRow(state, table, entry.row);

    if (shard) {
      const index = shard.rows.indexOf(entry.row);

      if (index !== -1) {
        shard.rows.splice(index, 1);
      }
    }

    // Recording the deleted objectId is what tells "we deleted it" apart from
    // "someone else added it" when merging with the remote shard
    pending.deleted.add(objectId);

    return entry.shardPath;
  }

  // --------------------------------------------------------------------------
  // Self-healing: move misplaced rows back to their own family
  // --------------------------------------------------------------------------

  /**
   * Move rows that sit in the wrong family back to the shard their key maps to.
   *
   * After a page rename (/friends/ -> /links/) the url column of an old shard's
   * rows changes while the file stays in the family the old address hashes to.
   * Since the whole storage rests on "key to family to file", such rows become
   * data nobody can reach: a url query computes the other family, and planMerge
   * only merges within one family, so they never come back. The manifest even
   * reports /links/ in min_key/max_key, but nothing looked at that.
   *
   * This is a move, not a copy: a row has exactly one object reference and
   * therefore exactly one entry in byId / byField, so the move can neither
   * duplicate nor lose data.
   *
   * The whole table must be loaded: a shard with mixed keys cannot be judged from
   * manifest metadata, only row by row.
   *
   * @returns {{relocated: number, sources: string[], targets: string[]}}
   */
  async repairMisplaced(table) {
    await this.ensureAll(table);

    const state = this.tables[table];
    const moves = [];

    for (const [path, shard] of state.shards) {
      for (const row of shard.rows) {
        if (this.manager.isMisplacedRow(table, path, row)) {
          moves.push({ path, row });
        }
      }
    }
    if (moves.length === 0) {
      return { relocated: 0, sources: [], targets: [] };
    }

    const sources = new Set();
    const targets = new Set();

    for (const { path, row } of moves) {
      const keyField = this.manager.shardKeyField(table);
      const key = toCell(row[keyField]);
      const prefix = this.manager.shardPrefix(table, key);
      // Still fill-first, so the move joins the normal split/merge rhythm instead
      // of producing a shard above SHARD_MAX_ROWS
      const target = this.manager.resolveWriteShard(table, key, this.familyRowCounts(table, prefix));
      const sourceShard = state.shards.get(path);
      const targetShard = this.ensureShard(table, target);

      // Order matters: mark the source dirty first, while its baseline still
      // contains this row, then take the row out
      this.pendingEntry(path, table).deleted.add(row.objectId ?? '');
      this.unindexRow(state, table, row);
      const index = sourceShard.rows.indexOf(row);

      if (index !== -1) {
        sourceShard.rows.splice(index, 1);
      }

      this.pendingEntry(target, table);
      targetShard.rows.push(row);
      state.byId.set(row.objectId ?? '', { shardPath: target, row });
      this.indexRow(state, table, row);

      sources.add(path);
      targets.add(target);
    }

    // The listing's row_count / min_key / max_key are stale now. They must be
    // rebuilt from reality, or the next refresh judges the same rows misplaced
    // again and healing turns into an endless loop.
    for (const path of [...sources, ...targets]) {
      this.syncEntryMeta(table, path);
    }
    this.rebuildFamilies(table);

    this.logger.info?.(
      `[csv-store] ${table}: moved ${moves.length} row(s) back to their canonical shard (${[...sources].join(', ')} -> ${[...targets].join(', ')})`,
    );

    return { relocated: moves.length, sources: [...sources], targets: [...targets] };
  }

  /**
   * Healing entry point for read paths, i.e. the fault-tolerant version.
   *
   * Two guarantees:
   *   1. Concurrent calls for a table run once (a batch of refreshes discovers
   *      the same misplacement at the same time, and moving twice would only
   *      produce extra commit conflicts);
   *   2. A failed move must never fail the read — misplaced data can wait, an
   *      unreadable comment list is the real outage. The next refresh retries.
   */
  healMisplaced(table) {
    const inflight = this.healing.get(table);

    if (inflight) {
      return inflight;
    }
    const result = this.repairMisplaced(table)
      .catch((err) => {
        this.logger.warn?.(`[csv-store] ${table} self-heal failed, answering from the unmoved data:`, err);

        return { relocated: 0, sources: [], targets: [], failed: true };
      })
      .finally(() => {
        this.healing.delete(table);
      });

    this.healing.set(table, result);

    return result;
  }

  // Rebuild a shard's manifest metadata from its rows: count and key bounds must follow the rows.
  syncEntryMeta(table, path) {
    const state = this.tables[table];
    const shard = state.shards.get(path);

    if (!shard) {
      return;
    }
    const entry = this.manager.manifestEntry(table, path, shard.rows, shard.sha);
    const meta = state.entries.get(path);

    if (meta) {
      Object.assign(meta, entry);
    } else {
      state.entries.set(path, entry);
    }
  }

  // --------------------------------------------------------------------------
  // Compaction
  // --------------------------------------------------------------------------

  // Group by family: family prefix to (shard path to row count).
  familiesOf(table) {
    const families = new Map();

    for (const [family, paths] of this.tables[table].families) {
      const counts = new Map();

      for (const path of paths) {
        const shard = this.tables[table].shards.get(path);

        if (shard) {
          counts.set(path, shard.rows.length);
        }
      }
      if (counts.size > 0) {
        families.set(family, counts);
      }
    }

    return families;
  }

  /**
   * Compress a family back into its base shard once its row count drops under
   * the cap again.
   *
   * Whole-family only, never across families: a merge is always "write one file,
   * delete several", lands in a single atomic Git commit and leaves other
   * families untouched.
   *
   * The move runs first (repairMisplaced also ensureAll's), and the order is
   * fixed: moved-in rows have to take part in this planMerge, otherwise the
   * compaction silently misses them.
   *
   * @returns {{merged: number, removed: number, relocated: number}}
   */
  async compact(table) {
    await this.ensureAll(table);

    const { relocated } = await this.repairMisplaced(table);
    const state = this.tables[table];
    let merged = 0;
    let removed = 0;

    for (const [family, counts] of this.familiesOf(table)) {
      const plan = this.manager.planMerge(family, counts);

      if (!plan) {
        continue;
      }
      const rows = [];

      for (const path of plan.sources) {
        const shard = state.shards.get(path);

        if (shard) {
          rows.push(...shard.rows.map((row) => ({ ...row })));
        }
      }

      const target = this.ensureShard(table, plan.target);

      // Mark dirty (snapshot baseline, record pending) before replacing content
      this.pendingEntry(plan.target, table);
      this.unindexShard(table, plan.target);
      target.rows = rows;
      this.indexShard(table, plan.target);

      for (const path of plan.sources) {
        if (path === plan.target) {
          continue;
        }
        const shard = state.shards.get(path);

        if (shard) {
          // Empty first: the write queue sees an empty shard and deletes the file
          for (const row of shard.rows) {
            this.pendingEntry(path, table).deleted.add(row.objectId);
          }
          this.unindexShard(table, path);
          shard.rows = [];
          this.pendingEntry(path, table);
          removed += 1;
        }
      }
      merged += 1;
    }

    if (merged > 0) {
      this.rebuildIndexes(table);
    }

    return { merged, removed, relocated };
  }

  // --------------------------------------------------------------------------
  // Commit helpers
  // --------------------------------------------------------------------------

  // Fetch rollback baselines for shards about to be committed (snapshotted when
  // they first went dirty).
  snapshotShards(paths) {
    const baselines = new Map();

    for (const path of paths) {
      const entry = this.pending.get(path);
      const baseline = this.baselines.get(path);

      if (entry && baseline) {
        baselines.set(path, baseline);
      }
    }

    return baselines;
  }

  /**
   * Restore shards from their baselines, when a commit ultimately failed.
   *
   * rows and sha must be restored together: restoring only rows leaves the local
   * SHA on "the version someone else wrote", and the next refresh skips the
   * download because the SHA matches, so those rows never come back.
   */
  restoreShards(baselines) {
    for (const [path, baseline] of baselines) {
      const state = this.tables[baseline.table];

      if (baseline.existed) {
        const shard = this.ensureShard(baseline.table, path);

        this.unindexShard(baseline.table, path);
        shard.rows = baseline.rows.map((row) => ({ ...row }));
        shard.sha = baseline.sha;
        const meta = state.entries.get(path);

        if (meta) {
          meta.sha = baseline.sha;
          meta.rowCount = shard.rows.length;
        } else {
          state.entries.set(path, {
            path,
            rowCount: shard.rows.length,
            sha: baseline.sha,
            updatedAt: null,
            minKey: '',
            maxKey: '',
          });
        }
        this.indexShard(baseline.table, path);
      } else {
        // A shard this request just created should not exist after a rollback
        this.unindexShard(baseline.table, path);
        state.shards.delete(path);
        state.entries.delete(path);
        this.forgetPath(baseline.table, path);
      }
    }
  }

  /**
   * Mark a commit as successful.
   *
   * shardShas is computed locally before committing using git's blob algorithm
   * (GitHub's blob SHA is sha1("blob <len>\0<content>")), so the manifest's SHAs
   * match the remote on the next refresh and the shards we just wrote are not
   * downloaded again — otherwise "refresh" becomes a new source of waste.
   */
  markClean(shardShas) {
    const touched = new Set();

    for (const [path, sha] of shardShas) {
      const entry = this.pending.get(path);

      this.pending.delete(path);
      this.baselines.delete(path);

      if (!entry) {
        continue;
      }
      const state = this.tables[entry.table];
      const shard = state.shards.get(path);
      const meta = state.entries.get(path);

      if (shard) {
        shard.sha = sha;
      }
      if (meta) {
        meta.sha = sha;
        meta.rowCount = shard ? shard.rows.length : meta.rowCount;
        meta.updatedAt = new Date().toISOString();
      }
      touched.add(entry.table);
    }

    return touched;
  }

  // Remove emptied shards after a successful commit (the files are gone remotely).
  markDeleted(paths) {
    for (const path of paths) {
      const entry = this.pending.get(path);

      this.pending.delete(path);
      this.baselines.delete(path);

      if (!entry) {
        continue;
      }
      const state = this.tables[entry.table];

      this.unindexShard(entry.table, path);
      state.shards.delete(path);
      state.entries.delete(path);
      this.forgetPath(entry.table, path);
    }
  }

  // Drop pending markers after a failed commit, returning to a clean "remote is authoritative" state.
  discardPending(paths) {
    for (const path of paths) {
      this.pending.delete(path);
      this.baselines.delete(path);
    }
  }

  // Remove a path from the family index entirely, alias registrations included.
  forgetPath(table, path) {
    const state = this.tables[table];
    const family = this.manager.familyOf(path);

    if (family) {
      state.families.get(family)?.delete(path);
    }
    for (const paths of state.aliases.values()) {
      paths.delete(path);
    }
  }

  // Test and recovery only: clear all in-memory state.
  reset() {
    for (const table of TABLES) {
      this.tables[table] = CsvShardCache.emptyTable();
      this.manifestSha[table] = null;
    }
    this.pending.clear();
    this.baselines.clear();
    this.ready = false;
    this.lastRefresh = 0;
  }
}

module.exports = { CsvShardCache, compileWhere, compareValues, TABLES };
