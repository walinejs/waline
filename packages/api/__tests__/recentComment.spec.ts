import { describe, expect, it, vi } from 'vitest';

import { getRecentComment } from '../src/recentComment.js';

const comments = [
  {
    objectId: 1,
    time: 1700000000000,
    comment: 'Hello',
    orig: 'Hello',
    like: 0,
    nick: 'Alice',
    link: '',
    avatar: '',
    url: 'https://example.com/post',
  },
];

describe(getRecentComment, () => {
  it('returns the comment list from the response data', async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(
      Response.json({
        errno: 0,
        errmsg: '',
        data: comments,
      }),
    );

    vi.stubGlobal('fetch', fetchMock);

    try {
      await expect(
        getRecentComment({
          serverURL: 'https://waline.example.com',
          lang: 'en',
          count: 10,
        }),
      ).resolves.toStrictEqual(comments);

      expect(fetchMock).toHaveBeenCalledWith(
        'https://waline.example.com/api/comment?type=recent&count=10&lang=en',
        { signal: undefined, headers: {} },
      );
    } finally {
      vi.unstubAllGlobals();
    }
  });
});
