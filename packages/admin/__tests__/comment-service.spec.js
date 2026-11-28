import { describe, expect, it, vi } from 'vitest';

import { getCommentList } from '../src/services/comment.js';

const request = vi.hoisted(() => vi.fn());

vi.mock(import('../src/utils/request.js'), () => ({ default: request }));

describe(getCommentList, () => {
  it('encodes filter values in the query string', async () => {
    request.mockClear();
    await getCommentList({
      page: 2,
      filter: { owner: 'mine', status: 'approved', keyword: 'a&b #c +d' },
    });

    const [[{ url }]] = request.mock.calls;
    const params = new URL(`https://example.com/${url}`).searchParams;

    expect(params.get('type')).toBe('list');
    expect(params.get('owner')).toBe('mine');
    expect(params.get('status')).toBe('approved');
    expect(params.get('keyword')).toBe('a&b #c +d');
    expect(params.get('page')).toBe('2');
  });
});
