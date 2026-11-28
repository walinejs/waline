// Test-only ThinkJS service stub and lifecycle restoration.
// oxlint-disable typescript/no-extraneous-class, vitest/no-hooks, eslint/no-underscore-dangle, unicorn/prefer-string-raw
import { createRequire } from 'node:module';

import { afterAll, describe, expect, it } from 'vitest';

const require = createRequire(import.meta.url);
const previousThink = globalThis.think;

globalThis.think = {
  ...previousThink,
  Service: class {},
  isEmpty: (value) => !value || Object.keys(value).length === 0,
  isString: (value) => typeof value === 'string',
};

const MongoStorage = require('../src/service/storage/mongodb.js');
const storage = new MongoStorage('Comment');

describe('mongodb literal query values', () => {
  afterAll(() => {
    globalThis.think = previousThink;
  });

  it('uses exact membership for page identifiers, including regex syntax', () => {
    const urls = ['(', '.*', '/a.b', '/a|b', '/path\\name'];

    expect(storage.parseWhere({ url: ['IN', urls] })).toStrictEqual({
      url: { $in: urls },
    });
    expect(storage.parseWhere({ url: ['IN', []] })).toStrictEqual({
      url: { $in: [] },
    });
  });

  it('preserves ObjectId conversion', () => {
    const id = '507f1f77bcf86cd799439011';
    const filter = storage.parseWhere({ objectId: ['IN', [id]] });

    expect(filter._id.$in[0].toHexString()).toBe(id);
  });

  it.each([
    ['%a.b%', 'before a.b after', 'before axb after'],
    ['a.b%', 'a.b after', 'before a.b'],
    ['%a.b', 'before a.b', 'a.b after'],
  ])('preserves LIKE anchoring for %s', (pattern, matching, other) => {
    const { $regex } = storage.parseWhere({ comment: ['LIKE', pattern] }).comment;

    expect($regex.test(matching)).toBe(true);
    expect($regex.test(other)).toBe(false);
    expect($regex.test('axb')).toBe(false);
  });

  it.each(['(', '.*', '[a]', 'a|b', '\\', '^$+?{}'])('searches for literal %s', (text) => {
    const { $regex } = storage.parseWhere({ comment: ['LIKE', `%${text}%`] }).comment;

    expect($regex.test(`before ${text} after`)).toBe(true);
    expect($regex.test('unrelated comment')).toBe(false);
  });
});
