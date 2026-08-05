import { createRequire } from 'node:module';

import { describe, expect, it } from 'vitest';

const require = createRequire(import.meta.url);
const {
  compareByOrder,
  normalizeOrder,
  toOrderString,
  toSqlOrder,
} = require('../src/service/storage/order.js');

describe('storage order', () => {
  const order = [
    { field: 'sticky', direction: 'desc', nulls: 'last' },
    { field: 'insertedAt', direction: 'desc' },
    { field: 'objectId', direction: 'desc' },
  ];

  it('normalizes fields and keeps explicit null placement', () => {
    expect(normalizeOrder(order, undefined, (field) => field.toLowerCase())).toStrictEqual([
      { field: 'sticky', direction: 'desc', nulls: 'last' },
      { field: 'insertedat', direction: 'desc', nulls: undefined },
      { field: 'objectid', direction: 'desc', nulls: undefined },
    ]);
  });

  it('builds SQL and document-store order formats', () => {
    const normalized = normalizeOrder(order);

    expect(toSqlOrder(normalized)).toStrictEqual({
      sticky: 'DESC',
      insertedAt: 'DESC',
      objectId: 'DESC',
    });
    expect(toSqlOrder(normalized, { nulls: true }).sticky).toBe('DESC NULLS LAST');
    expect(toOrderString(normalized)).toBe('sticky DESC, insertedAt DESC, objectId DESC');
  });

  it('sorts null sticky values last and uses stable tie breakers', () => {
    const comments = [
      { id: 1, insertedAt: 2, sticky: null },
      { id: 2, insertedAt: 2, sticky: 1 },
      { id: 3, insertedAt: 2, sticky: null },
    ];
    const normalized = normalizeOrder([
      { field: 'sticky', direction: 'desc', nulls: 'last' },
      { field: 'insertedAt', direction: 'desc' },
      { field: 'id', direction: 'desc' },
    ]);

    expect(comments.sort(compareByOrder(normalized)).map(({ id }) => id)).toStrictEqual([2, 3, 1]);
  });

  it('supports storage-specific value coercion', () => {
    const comments = [
      { id: 1, insertedAt: 'Tue Dec 31 2024 12:00:00 GMT+0000' },
      { id: 2, insertedAt: 'Mon Jan 06 2025 12:00:00 GMT+0000' },
    ];
    const normalized = normalizeOrder([{ field: 'insertedAt', direction: 'desc' }]);

    expect(
      comments
        .sort(compareByOrder(normalized, (_field, value) => new Date(value).getTime()))
        .map(({ id }) => id),
    ).toStrictEqual([2, 1]);
  });

  it('maps the storage-neutral objectId field to a physical ID field', () => {
    const normalized = normalizeOrder(
      [{ field: 'objectId', direction: 'desc' }],
      undefined,
      () => '_id',
    );

    expect(normalized.at(-1)?.field).toBe('_id');
  });

  it('keeps the legacy desc option working', () => {
    expect(normalizeOrder(undefined, 'insertedAt')).toStrictEqual([
      { field: 'insertedAt', direction: 'desc', nulls: undefined },
    ]);
  });
});
