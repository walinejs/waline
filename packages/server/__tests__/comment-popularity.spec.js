/* oxlint-disable vitest/no-hooks -- Close real SQLite databases after failed assertions. */
import { createRequire } from 'node:module';
import { DatabaseSync } from 'node:sqlite';

import { afterEach, describe, expect, it } from 'vitest';

import { createWalineCore } from '../../core/src/index.js';

const require = createRequire(import.meta.url);
const helper = require('think-helper');
const Model = require('think-model/lib/model.js');
const Parser = require('think-model-sqlite/lib/parser.js');
const originalThink = globalThis.think;
const databases = [];

const order = [
  { field: 'sticky', direction: 'desc', nulls: 'last' },
  { field: 'popularity', direction: 'desc' },
  { field: 'objectId', direction: 'desc' },
];
const where = { url: '/post', rid: undefined, status: ['NOT IN', ['waiting', 'spam']] };

const setup = () => {
  globalThis.think = { ...helper, Service: Object };
  const Storage = require('../src/service/storage/sqlite.js');
  const storage = new Storage('Comment');
  const db = new DatabaseSync(':memory:');
  databases.push(db);
  db.exec(`CREATE TABLE waline_Comment (
    id INTEGER PRIMARY KEY, url TEXT, rid INTEGER, pid INTEGER,
    status TEXT, sticky INTEGER, like INTEGER, insertedAt TEXT
  )`);
  const insert = db.prepare('INSERT INTO waline_Comment VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
  for (const row of [
    [1, '/post', null, null, 'approved', null, 10, '2026-01-01'],
    [2, '/post', null, null, 'approved', null, 0, '2026-01-02'],
    [3, '/post', null, null, 'approved', null, 10, '2026-01-03'],
    [4, '/post', null, null, 'approved', 1, 0, '2026-01-04'],
    [5, '/post', null, null, '', null, null, '2026-01-05'],
    [20, '/post', 2, 2, 'approved', null, 4, '2026-01-06'],
    [21, '/post', 2, 20, 'approved', null, 6, '2026-01-07'],
    [22, '/post', 1, 1, 'waiting', null, 1000, '2026-01-08'],
    [23, '/post', 1, 1, 'spam', null, 1000, '2026-01-09'],
    [24, '/another', 1, 1, 'approved', null, 1000, '2026-01-10'],
  ]) {
    insert.run(...row);
  }
  storage.model = (name) => {
    const model = new Model(name, { prefix: 'waline_', handle: Object });
    model.db = () => ({
      select: async (options) => db.prepare(new Parser().buildSelectSql(options)).all(),
    });
    return model;
  };
  return { storage, db };
};

describe('comment popularity in SQLite', () => {
  afterEach(() => {
    globalThis.think = originalThink;
    for (const db of databases.splice(0)) db.close();
  });

  it('uses thread popularity for like_desc while keeping the response and time sorting intact', async () => {
    const { storage } = setup();
    storage.count = async (filter) => (await storage.select(filter)).length;
    const core = createWalineCore({ models: { Comment: storage, Users: {}, Counter: {} } });
    const ctx = { state: {}, headers: {} };
    const first = await core.comment.list({ path: '/post', sortBy: 'like_desc', pageSize: 2 }, ctx);
    const second = await core.comment.list(
      { path: '/post', sortBy: 'like_desc', pageSize: 2, page: 2 },
      ctx,
    );

    expect(first.data.map((row) => row.objectId)).toStrictEqual([4, 2]);
    expect(second.data.map((row) => row.objectId)).toStrictEqual([3, 1]);
    expect(first).toMatchObject({ totalPages: 3, count: 7 });
    expect(first.data[1]).toMatchObject({
      like: 0,
      children: [{ objectId: 20 }, { objectId: 21 }],
    });
    const byTime = await core.comment.list({ path: '/post', sortBy: 'insertedAt_desc' }, ctx);
    expect(byTime.data.map((row) => row.objectId)).toStrictEqual([4, 5, 3, 2, 1]);
  });

  it('ranks whole public threads before pagination, preserving pinned comments and ties', async () => {
    const { storage } = setup();
    const first = await storage.select(where, { order, limit: 2 });
    const second = await storage.select(where, { order, limit: 2, offset: 2 });

    expect(first.map((row) => row.objectId)).toStrictEqual([4, 2]);
    expect(second.map((row) => row.objectId)).toStrictEqual([3, 1]);
    expect(first[1]).not.toHaveProperty('popularity');
  });

  it('keeps hidden replies out of popularity even for their author and administrators', async () => {
    const { storage, db } = setup();
    db.exec(
      "ALTER TABLE waline_Comment ADD user_id TEXT; UPDATE waline_Comment SET user_id = 'u1' WHERE id = 22",
    );
    storage.count = async (filter) => (await storage.select(filter)).length;
    const core = createWalineCore({
      models: { Comment: storage, Users: { select: async () => [] }, Counter: {} },
    });
    const list = (type) =>
      core.comment.list(
        { path: '/post', sortBy: 'like_desc' },
        { state: { userInfo: { objectId: 'u1', type } }, headers: {} },
      );
    const author = await list('guest');
    const admin = await list('administrator');

    expect(author.data.map((row) => row.objectId)).toStrictEqual([4, 2, 3, 1, 5]);
    expect(admin.data.map((row) => row.objectId)).toStrictEqual([4, 2, 3, 1, 5]);
    expect(author.data[3].children.map((row) => row.objectId)).toStrictEqual([22]);
    expect(admin.data[3].children.map((row) => row.objectId)).toStrictEqual([22, 23]);
  });

  it('reflects likes, moderation, deletion and imported replies without a backfill', async () => {
    const { storage, db } = setup();
    const ids = async () => (await storage.select(where, { order })).map((row) => row.objectId);
    await expect(ids()).resolves.toStrictEqual([4, 2, 3, 1, 5]);
    db.exec("UPDATE waline_Comment SET status = 'waiting' WHERE id = 21");
    await expect(ids()).resolves.toStrictEqual([4, 3, 1, 2, 5]);
    db.exec('UPDATE waline_Comment SET like = 20 WHERE id = 1');
    await expect(ids()).resolves.toStrictEqual([4, 1, 3, 2, 5]);
    db.exec('DELETE FROM waline_Comment WHERE id = 20');
    await expect(ids()).resolves.toStrictEqual([4, 1, 3, 5, 2]);
    db.exec(
      "INSERT INTO waline_Comment VALUES (25, '/post', 2, 2, 'approved', NULL, 30, '2026-01-11')",
    );
    await expect(ids()).resolves.toStrictEqual([4, 2, 1, 3, 5]);
  });
});

describe('comment popularity in PostgreSQL', () => {
  it.skipIf(!process.env.WALINE_TEST_POSTGRES_URL)(
    'executes the PostgreSQL order with lower-case storage fields',
    async () => {
      const pgRequire = createRequire(require.resolve('think-model-postgresql'));
      const { Client } = pgRequire('pg');
      const PgParser = require('think-model-postgresql/lib/parser.js');
      const client = new Client({ connectionString: process.env.WALINE_TEST_POSTGRES_URL });
      await client.connect();
      try {
        await client.query('BEGIN');
        await client.query(
          `CREATE TEMP TABLE wl_comment (id INTEGER PRIMARY KEY, url TEXT, rid INTEGER, status TEXT, sticky NUMERIC, "like" INTEGER)`,
        );
        await client.query(`INSERT INTO wl_comment VALUES
        (1, '/post', NULL, 'approved', NULL, 10),
        (2, '/post', NULL, 'approved', NULL, 0),
        (3, '/post', NULL, 'approved', 1, NULL),
        (20, '/post', 2, 'approved', NULL, 12),
        (21, '/post', 1, 'spam', NULL, 1000)`);
        globalThis.think = { ...helper, Service: Object };
        const Storage = require('../src/service/storage/postgresql.js');
        const storage = new Storage('Comment');
        storage.model = (name) => {
          const model = new Model(name.toLowerCase(), { prefix: 'wl_', handle: Object });
          model.db = () => ({
            select: async (options) =>
              (await client.query(new PgParser().buildSelectSql(options))).rows,
          });
          return model;
        };
        const first = await storage.select(where, { order, limit: 1 });
        const second = await storage.select(where, { order, offset: 1, limit: 1 });
        expect(first.map((row) => row.objectId)).toStrictEqual([3]);
        expect(second.map((row) => row.objectId)).toStrictEqual([2]);
      } finally {
        await client.query('ROLLBACK');
        await client.end();
        globalThis.think = originalThink;
      }
    },
  );
});
