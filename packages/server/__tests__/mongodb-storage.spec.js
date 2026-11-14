import { createRequire } from 'node:module';

import { describe, expect, it } from 'vitest';

const require = createRequire(import.meta.url);
const thinkHelper = require('think-helper');

// `rows` are raw `$group` results as think-mongo returns them: `_id` is the
// bare field value when grouping by one field, and an object of field values
// when grouping by several fields.
const countGroupedRows = async (group, rows) => {
  const originalThink = globalThis.think;

  try {
    globalThis.think = {
      ...thinkHelper,
      Service: Object,
    };

    const MongoStorage = require('../src/service/storage/mongodb.js');
    const storage = Object.create(MongoStorage.prototype);
    const query = {
      where: () => query,
      group: () => query,
      count: async () => rows,
    };

    storage.tableName = 'Comment';
    storage.mongo = () => query;

    return await storage.count({ status: ['NOT IN', ['waiting', 'spam']] }, { group });
  } finally {
    globalThis.think = originalThink;
  }
};

describe('mongodb storage', () => {
  it('returns grouped counts with the field value when grouping by one field', async () => {
    await expect(
      countGroupedRows(
        ['url'],
        [
          { _id: '/first', total: 2 },
          { _id: '/third', total: 1 },
        ],
      ),
    ).resolves.toStrictEqual([
      { url: '/first', count: 2 },
      { url: '/third', count: 1 },
    ]);
  });

  it('returns grouped counts with every field value when grouping by several fields', async () => {
    await expect(
      countGroupedRows(
        ['user_id', 'mail'],
        [
          { _id: { user_id: 'user-1', mail: 'a@example.com' }, total: 3 },
          { _id: { user_id: null, mail: 'b@example.com' }, total: 1 },
        ],
      ),
    ).resolves.toStrictEqual([
      { user_id: 'user-1', mail: 'a@example.com', count: 3 },
      { user_id: null, mail: 'b@example.com', count: 1 },
    ]);
  });
});
