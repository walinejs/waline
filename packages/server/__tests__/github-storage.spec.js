import { createRequire } from 'node:module';

import { afterAll, describe, expect, it, vi } from 'vitest';

const require = createRequire(import.meta.url);
const thinkHelper = require('think-helper');

vi.stubGlobal('think', {
  ...thinkHelper,
  Service: class {},
});

const GithubStorage = require('../src/service/storage/github.js');

afterAll(() => {
  vi.unstubAllGlobals();
});

describe('gitHub storage', () => {
  it('treats blank CSV values as empty fields', () => {
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
  });
});
