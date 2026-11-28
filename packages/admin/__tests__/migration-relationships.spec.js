import { describe, expect, it, vi } from 'vitest';

import { restoreCommentRelationships } from '../src/pages/migration/relationships.js';

const request = vi.hoisted(() => vi.fn());
vi.mock(import('../src/utils/request.js'), () => ({ default: request }));

describe(restoreCommentRelationships, () => {
  it('restores comment relationships for both unchanged and remapped IDs', async () => {
    request.mockClear();
    const onProgress = vi.fn();

    await restoreCommentRelationships(
      [
        { objectId: 10, pid: 0, rid: 0, user_id: 7 },
        { objectId: 11, pid: 10, rid: 10, user_id: 8 },
        { objectId: 12, pid: 11, rid: 10, user_id: 7 },
      ],
      { Comment: { 10: 10, 11: 51, 12: 52 }, Users: { 7: 7, 8: 88 } },
      onProgress,
    );

    expect(request.mock.calls).toStrictEqual([
      [{ url: 'db?table=Comment&objectId=10', method: 'PUT', body: { user_id: 7 } }],
      [
        {
          url: 'db?table=Comment&objectId=51',
          method: 'PUT',
          body: { pid: 10, rid: 10, user_id: 88 },
        },
      ],
      [
        {
          url: 'db?table=Comment&objectId=52',
          method: 'PUT',
          body: { pid: 51, rid: 10, user_id: 7 },
        },
      ],
    ]);
    expect(onProgress.mock.calls).toStrictEqual([
      [1, 3],
      [2, 3],
      [3, 3],
    ]);
  });

  it('omits absent and unmapped IDs, including when an import has no user table', async () => {
    request.mockClear();
    const onProgress = vi.fn();

    await restoreCommentRelationships(
      [
        { objectId: 'root', pid: 0, rid: null },
        { objectId: 'reply', pid: 'missing', rid: 'root', user_id: 'unmapped' },
        { objectId: 'not-imported', pid: 'root' },
      ],
      { Comment: { root: 'root', reply: 'new-reply' } },
      onProgress,
    );

    expect(request.mock.calls).toStrictEqual([
      [{ url: 'db?table=Comment&objectId=new-reply', method: 'PUT', body: { rid: 'root' } }],
    ]);
    expect(onProgress.mock.calls).toStrictEqual([[1, 1]]);
  });
});
