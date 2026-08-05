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
});
