/* oxlint-disable vitest/no-hooks, vitest/no-conditional-in-test -- Adapter fixtures implement conditional projections; teardown restores SDK state after failures. */
import { createRequire } from 'node:module';

import { afterEach, describe, expect, it } from 'vitest';

const require = createRequire(import.meta.url);
const mongoRequire = createRequire(require.resolve('think-mongo'));
const { MongoClient, ObjectID: ObjectId } = mongoRequire('mongodb');
const helper = require('think-helper');
const originalThink = globalThis.think;
const cleanups = [];
const order = [
  { field: 'sticky', direction: 'desc', nulls: 'last' },
  { field: 'popularity', direction: 'desc' },
  { field: 'objectId', direction: 'desc' },
];
const filter = { url: '/post', rid: undefined, status: ['NOT IN', ['waiting', 'spam']] };

const rows = (id = String) => [
  { _id: id(1), url: '/post', like: 10 },
  { _id: id(2), url: '/post', like: 0 },
  { _id: id(3), url: '/post', sticky: true },
  { _id: id(4), url: '/post' },
  { _id: id(20), url: '/post', rid: String(id(2)), like: 4 },
  { _id: id(21), url: '/post', rid: String(id(2)), pid: String(id(20)), like: 6 },
  { _id: id(22), url: '/post', rid: String(id(1)), status: 'waiting', like: 1000 },
  { _id: id(23), url: '/post', rid: String(id(1)), status: 'spam', like: 1000 },
  { _id: id(24), url: '/other', rid: String(id(1)), like: 1000 },
];

describe('document-store popularity', () => {
  afterEach(async () => {
    for (const cleanup of cleanups.splice(0).reverse()) await cleanup();
    globalThis.think = originalThink;
  });

  it('ranks GitHub CSV data numerically without persisting or exposing the score', async () => {
    globalThis.think = { ...helper, Service: Object };
    const Storage = require('../src/service/storage/github.js');
    const storage = new Storage('Comment');
    const comments = rows().map(({ _id, like, ...row }) => ({
      ...row,
      id: _id,
      like: like == null ? '' : String(like),
    }));
    storage.collection = async () => comments;
    const page = await storage.select(filter, { order, offset: 1, limit: 2 });

    expect(page.map((row) => row.objectId)).toStrictEqual(['2', '1']);
    expect(page[0]).not.toHaveProperty('__waline_popularity');
    expect(comments[1]).not.toHaveProperty('__waline_popularity');
  });

  it('loads only ranking metadata and the selected page on legacy LeanCloud', async () => {
    globalThis.think = { ...helper, Service: Object };
    const Storage = require('../src/service/storage/leancloud.js');
    const GithubStorage = require('../src/service/storage/github.js');
    const storage = new Storage('Comment');
    const comments = rows().map(({ _id, ...row }) => ({
      ...row,
      id: _id,
      objectId: _id,
      comment: `body ${_id}`,
    }));
    const calls = [];
    // oxlint-disable-next-line no-underscore-dangle
    storage._select = async (where, options) => {
      calls.push({ where, options });
      const selected = GithubStorage.prototype.where.call(
        storage,
        comments,
        Object.fromEntries(
          Object.entries(where).map(([key, value]) => [key === 'objectId' ? 'id' : key, value]),
        ),
      );
      return selected.map((row) =>
        options.field
          ? Object.fromEntries(['objectId', ...options.field].map((field) => [field, row[field]]))
          : row,
      );
    };
    storage.parseWhere = GithubStorage.prototype.parseWhere;
    const page = await storage.select(filter, { order, offset: 1, limit: 2 });

    expect(page.map((row) => row.objectId)).toStrictEqual(['2', '1']);
    expect(page[0].comment).toBe('body 2');
    expect(
      calls.slice(0, 2).every(({ options }) => options.field && !options.field.includes('comment')),
    ).toBe(true);
    expect(calls[2].where).toStrictEqual({ objectId: ['IN', ['2', '1']] });
  });

  const connect = async () => {
    const client = await MongoClient.connect(process.env.WALINE_TEST_MONGODB_URL, {
      useUnifiedTopology: true,
    });
    cleanups.push(() => client.close());
    const db = client.db(`waline_popularity_${Date.now()}`);
    cleanups.push(() => db.dropDatabase());
    globalThis.think = { ...helper, Service: Object };
    return db;
  };

  it.skipIf(!process.env.WALINE_TEST_MONGODB_URL)(
    'executes the MongoDB join before pagination',
    async () => {
      const db = await connect();
      const id = (n) => new ObjectId(n.toString(16).padStart(24, '0'));
      await db.collection('Comment').insertMany(rows(id));
      const Storage = require('../src/service/storage/mongodb.js');
      const storage = new Storage('Comment');
      storage.mongo = () => {
        const instance = {
          tableName: 'Comment',
          where: () => instance,
          aggregate: (pipeline) => db.collection('Comment').aggregate(pipeline).toArray(),
        };
        return instance;
      };
      const page = await storage.select(filter, { order, limit: 2 });

      expect(page.map((row) => row.objectId)).toStrictEqual([String(id(3)), String(id(2))]);
      await db.collection('Comment').updateOne({ _id: id(21) }, { $set: { status: 'waiting' } });
      const next = await storage.select(filter, { order, offset: 1, limit: 1, field: ['like'] });
      expect(next).toStrictEqual([{ objectId: String(id(1)), like: 10 }]);
    },
  );

  it.skipIf(!process.env.WALINE_TEST_MONGODB_URL)(
    'executes the CloudBase SDK pipeline against MongoDB',
    async () => {
      const db = await connect();
      await db.collection('Comment').insertMany(rows());
      const sdk = require('@cloudbase/node-sdk');
      const sdkDb = sdk.init({ env: 'waline-popularity-test' }).database();
      const collection = sdkDb.collection('Comment');
      const prototype = Object.getPrototypeOf(collection.aggregate());
      const originalEnd = prototype.end;
      cleanups.push(() => {
        prototype.end = originalEnd;
      });
      prototype.end = async function end() {
        // The SDK serializes numeric operators to extended JSON for transport.
        const pipeline = JSON.parse(JSON.stringify(this.done()), (_key, value) =>
          value && typeof value === 'object' && '$numberInt' in value
            ? Number(value.$numberInt)
            : value,
        );
        return { data: await db.collection('Comment').aggregate(pipeline).toArray() };
      };
      const Storage = require('../src/service/storage/cloudbase.js');
      const storage = new Storage('Comment');
      storage.collection = async () => collection;
      const page = await storage.select(filter, { order, limit: 2 });

      expect(page.map((row) => row.objectId)).toStrictEqual(['3', '2']);
      expect(page[1]).not.toHaveProperty('__waline_replies');
      await db.collection('Comment').deleteOne({ _id: '21' });
      const next = await storage.select(filter, { order, offset: 1, limit: 1, field: ['like'] });
      expect(next).toStrictEqual([{ objectId: '1', like: 10 }]);
    },
  );
});
