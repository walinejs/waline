import { createRequire } from 'node:module';

import { describe, expect, it, vi } from 'vitest';

const require = createRequire(import.meta.url);
const thinkHelper = require('think-helper');

describe('gitHub storage', () => {
  it('treats blank CSV values as empty fields', () => {
    const originalThink = globalThis.think;

    try {
      globalThis.think = {
        ...thinkHelper,
        Service: Object,
      };

      const GithubStorage = require('../src/service/storage/github.js');
      const storage = Object.create(GithubStorage.prototype);
      const comments = [
        { id: 'blank', rid: '' },
        { id: 'null', rid: null },
        { id: 'undefined' },
        { id: 'child', rid: 'blank' },
      ];

      expect(storage.where(comments, { rid: undefined }).map(({ id }) => id)).toStrictEqual([
        'blank',
        'null',
        'undefined',
      ]);
    } finally {
      globalThis.think = originalThink;
    }
  });

  it('persists and updates counters through CSV round trips', async () => {
    const originalThink = globalThis.think;
    const { parseString } = require('fast-csv');

    try {
      globalThis.think = {
        ...thinkHelper,
        Service: Object,
      };

      const GithubStorage = require('../src/service/storage/github.js');
      const storage = Object.create(GithubStorage.prototype);
      const readCsv = async (content) =>
        new Promise((resolve, reject) => {
          const rows = [];

          parseString(content, { headers: true })
            .on('error', reject)
            .on('data', (row) => rows.push(row))
            .on('end', () => resolve(rows));
        });

      let content = '';
      let sha;

      storage.tableName = 'Counter';
      storage.basePath = 'data';
      storage.git = {
        get: vi.fn(async () => ({ data: content, sha })),
        set: vi.fn(async (_filename, nextContent) => {
          content = nextContent;
          sha = 'sha';
        }),
      };

      const added = await storage.add({ time: 1, url: '/post' });

      expect(added.objectId).toBeTruthy();
      await expect(readCsv(content)).resolves.toStrictEqual([
        {
          objectId: added.objectId,
          time: '1',
          url: '/post',
          createdAt: '',
          updatedAt: '',
        },
      ]);
      await expect(storage.select({ objectId: added.objectId })).resolves.toStrictEqual([
        {
          time: 1,
          url: '/post',
          createdAt: '',
          updatedAt: '',
          objectId: added.objectId,
        },
      ]);

      await storage.update((current) => ({ ...current, time: current.time + 1 }), {
        objectId: ['IN', [added.objectId]],
      });

      await expect(readCsv(content)).resolves.toStrictEqual([
        {
          objectId: added.objectId,
          time: '2',
          url: '/post',
          createdAt: '',
          updatedAt: '',
        },
      ]);
    } finally {
      globalThis.think = originalThink;
    }
  });

  it('updates only the selected legacy counter row', async () => {
    const originalThink = globalThis.think;
    const { parseString } = require('fast-csv');

    try {
      globalThis.think = {
        ...thinkHelper,
        Service: Object,
      };

      const GithubStorage = require('../src/service/storage/github.js');
      const storage = Object.create(GithubStorage.prototype);
      const readCsv = async (csvContent) =>
        new Promise((resolve, reject) => {
          const rows = [];

          parseString(csvContent, { headers: true })
            .on('error', reject)
            .on('data', (row) => rows.push(row))
            .on('end', () => resolve(rows));
        });

      let content = 'objectId,time,url,createdAt,updatedAt\n,3,/a,,\n,5,/b,,\n';
      let sha = 'sha';

      storage.tableName = 'Counter';
      storage.basePath = 'data';
      storage.git = {
        get: vi.fn(async () => ({ data: content, sha })),
        set: vi.fn(async (_filename, nextContent) => {
          content = nextContent;
          sha = 'sha';
        }),
      };

      const selected = await storage.select({ url: '/a' });

      expect(selected).toHaveLength(1);
      expect(selected[0].objectId).toBe('legacy-0');

      await storage.update((current) => ({ ...current, time: current.time + 1 }), {
        objectId: ['IN', [selected[0].objectId]],
      });

      await expect(readCsv(content)).resolves.toStrictEqual([
        { objectId: 'legacy-0', time: '4', url: '/a', createdAt: '', updatedAt: '' },
        { objectId: 'legacy-1', time: '5', url: '/b', createdAt: '', updatedAt: '' },
      ]);
    } finally {
      globalThis.think = originalThink;
    }
  });

  it('returns grouped counts with their field values', async () => {
    const originalThink = globalThis.think;

    try {
      globalThis.think = {
        ...thinkHelper,
        Service: Object,
      };

      const GithubStorage = require('../src/service/storage/github.js');
      const storage = Object.create(GithubStorage.prototype);

      storage.tableName = 'Comment';
      storage.collection = async () => [
        { id: 'first-1', url: '/first' },
        { id: 'first-2', url: '/first' },
        { id: 'third-1', url: '/third' },
      ];

      await expect(
        storage.count({ url: ['IN', ['/first', '/third']] }, { group: ['url'] }),
      ).resolves.toStrictEqual([
        { url: '/first', count: 2 },
        { url: '/third', count: 1 },
      ]);
    } finally {
      globalThis.think = originalThink;
    }
  });
});
