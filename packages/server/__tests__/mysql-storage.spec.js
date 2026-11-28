import { createRequire } from 'node:module';

import { describe, expect, it } from 'vitest';

const require = createRequire(import.meta.url);
const thinkHelper = require('think-helper');

describe('mysql storage', () => {
  it('does not mutate the caller supplied select fields', async () => {
    const originalThink = globalThis.think;

    try {
      globalThis.think = {
        ...thinkHelper,
        Service: Object,
      };

      const MySQLStorage = require('../src/service/storage/mysql.js');
      const storage = Object.create(MySQLStorage.prototype);
      let selectedFields;

      storage.tableName = 'User';
      storage.model = () => {
        const query = {
          where() {
            return query;
          },
          order() {
            return query;
          },
          limit() {
            return query;
          },
          field(fields) {
            selectedFields = fields;
            return query;
          },
          select: async () => [{ id: 'user-1', nick: 'test' }],
        };

        return query;
      };

      const field = ['nick'];
      const data = await storage.select({}, { field });

      expect(field).toStrictEqual(['nick']);
      expect(selectedFields).toStrictEqual(['nick', 'id']);
      expect(data).toStrictEqual([{ nick: 'test', objectId: 'user-1' }]);
    } finally {
      globalThis.think = originalThink;
    }
  });
});
