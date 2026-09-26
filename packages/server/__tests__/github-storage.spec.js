import { createRequire } from 'node:module';

import { describe, expect, it } from 'vitest';

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
