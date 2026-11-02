// oxlint-disable vitest/no-hooks
import http from 'node:http';
import { createRequire } from 'node:module';

import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { fetchCommentCount } from '../../api/src/commentCount.js';

process.env.SQLITE_PATH = `/tmp/test-waline-count-${process.pid}.sqlite`;
process.env.JWT_TOKEN = 'test-jwt-secret';

const require = createRequire(import.meta.url);
const main = require('../index.js');
const commentCount = vi.fn();
const commentSelect = vi.fn();
const oauthUrl = 'https://oauth.example.com';
const originalFetch = globalThis.fetch;

const handler = main({
  oauthUrl,
  customModel: (modelName) => {
    if (modelName === 'Comment') {
      return { count: commentCount, select: commentSelect };
    }

    if (modelName === 'Users') {
      return { select: async () => [] };
    }
  },
});

describe('comment count API', () => {
  let port, server;

  beforeAll(async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation((url, options) => {
      if (url === oauthUrl) {
        return Promise.resolve(Response.json({ services: [] }));
      }

      return originalFetch(url, options);
    });
    server = http.createServer(handler);
    await new Promise((resolve) => {
      server.listen(0, resolve);
    });
    ({ port } = server.address());
  });

  beforeEach(() => {
    commentCount.mockReset();
    commentCount.mockImplementation(async (_where, options) => (options?.group ? [] : 0));
    commentSelect.mockReset();
  });

  afterAll(async () => {
    vi.restoreAllMocks();
    delete process.env.SQLITE_PATH;
    delete process.env.JWT_TOKEN;
    await new Promise((resolve) => {
      server.close(resolve);
    });
  });

  const fetchCount = (urls) =>
    fetch(
      `http://localhost:${port}/api/comment?type=count&${urls
        .map((url) => `url=${encodeURIComponent(url)}`)
        .join('&')}`,
    ).then((response) => response.json());

  it('uses a scalar database count for one URL', async () => {
    commentCount.mockResolvedValueOnce(7);

    const body = await fetchCount(['/single']);

    expect(body.data).toStrictEqual([7]);
    expect(commentCount).toHaveBeenCalledExactlyOnceWith({
      status: ['NOT IN', ['waiting', 'spam']],
      url: ['IN', ['/single']],
    });
    expect(commentSelect).not.toHaveBeenCalled();
  });

  it('uses grouped counts for multiple URLs and fills missing values', async () => {
    commentCount.mockResolvedValueOnce([
      { url: '/first', count: 3 },
      { url: '/third', count: 1 },
    ]);

    const body = await fetchCount(['/first', '/second', '/third']);

    expect(body.data).toStrictEqual([3, 0, 1]);
    expect(commentCount).toHaveBeenCalledExactlyOnceWith(
      {
        status: ['NOT IN', ['waiting', 'spam']],
        url: ['IN', ['/first', '/second', '/third']],
      },
      { group: ['url'] },
    );
    expect(commentSelect).not.toHaveBeenCalled();
  });

  it('returns one zero per comma-separated URL sent by the official client API', async () => {
    const counts = await fetchCommentCount({
      serverURL: `http://localhost:${port}`,
      paths: ['/post-a/', '/post-b/'],
      lang: 'en-US',
    });

    expect(counts).toStrictEqual([0, 0]);
    expect(commentCount).toHaveBeenCalledExactlyOnceWith(
      {
        status: ['NOT IN', ['waiting', 'spam']],
        url: ['IN', ['/post-a/', '/post-b/']],
      },
      { group: ['url'] },
    );
  });

  it('preserves CSV request order, duplicate URLs and missing counts', async () => {
    commentCount.mockResolvedValueOnce([
      { url: '/first', count: 3 },
      { url: '/third', count: 1 },
    ]);

    const body = await fetchCount(['/third,/second,/first,/third']);

    expect(body).toStrictEqual({ errno: 0, errmsg: '', data: [1, 0, 3, 1] });
    expect(commentCount).toHaveBeenCalledExactlyOnceWith(
      {
        status: ['NOT IN', ['waiting', 'spam']],
        url: ['IN', ['/third', '/second', '/first', '/third']],
      },
      { group: ['url'] },
    );
  });
});
