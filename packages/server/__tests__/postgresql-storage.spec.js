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
        storage.add({ siteId: 'site-1', isDefault: true, name: 'Waline' }),
      ).resolves.toMatchObject({ siteId: 'site-1', isDefault: true });
      expect(add).toHaveBeenCalledWith(
        expect.objectContaining({ siteid: 'site-1', isdefault: true }),
      );
      expect(add.mock.calls[0][0]).not.toHaveProperty('siteId');
      expect(add.mock.calls[0][0]).not.toHaveProperty('isDefault');

      await storage.update({ isDefault: false }, { siteId: 'site-1' });
      expect(update).toHaveBeenCalledWith({ isdefault: false }, { siteId: 'site-1' });
      expect(storage.parseWhere({ siteId: 'site-1', isDefault: true })).toStrictEqual({
        siteid: 'site-1',
        isdefault: true,
      });
    } finally {
      vi.restoreAllMocks();
      globalThis.think = originalThink;
    }
  });
});
