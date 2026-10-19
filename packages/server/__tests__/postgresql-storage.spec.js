import { createRequire } from 'node:module';

import { describe, expect, it, vi } from 'vitest';

const require = createRequire(import.meta.url);
const thinkHelper = require('think-helper');

describe('postgreSQL storage', () => {
  it('maps site fields for writes, updates, and filters', async () => {
    const originalThink = globalThis.think;

    try {
      globalThis.think = { ...thinkHelper, Service: Object };
      const MySQLStorage = require('../src/service/storage/mysql.js');
      const PostgreSQLStorage = require('../src/service/storage/postgresql.js');
      const storage = Object.create(PostgreSQLStorage.prototype);
      const add = vi.spyOn(MySQLStorage.prototype, 'add').mockImplementation(async (data) => data);
      const update = vi
        .spyOn(MySQLStorage.prototype, 'update')
        .mockImplementation(async (data) => [data]);

      await expect(
        storage.add({ objectId: '1', default: true, name: 'Waline' }),
      ).resolves.toMatchObject({ objectId: '1', default: true });
      expect(add).toHaveBeenCalledWith(expect.objectContaining({ objectId: '1', default: true }));

      await storage.update({ default: false }, { objectId: '1' });
      expect(update).toHaveBeenCalledWith({ default: false }, { objectId: '1' });
      expect(storage.parseWhere({ objectId: '1', default: true })).toStrictEqual({
        id: '1',
        default: true,
      });
    } finally {
      vi.restoreAllMocks();
      globalThis.think = originalThink;
    }
  });
});
