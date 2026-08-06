// oxlint-disable vitest/no-hooks
import http from 'node:http';
import { createRequire } from 'node:module';

import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

process.env.SQLITE_PATH = `/tmp/test-waline-count-${process.pid}.sqlite`;
process.env.JWT_TOKEN = 'test-jwt-secret';

const require = createRequire(import.meta.url);
const main = require('../index.js');
const commentCount = vi.fn();
const commentSelect = vi.fn();

const handler = main({
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
  let server;
  let port;

  beforeAll(async () => {
    server = http.createServer(handler);
    await new Promise((resolve) => {
      server.listen(0, resolve);
    });
    ({ port } = server.address());
  });

  beforeEach(() => {
    commentCount.mockReset();
    commentSelect.mockReset();
  });

  afterAll(async () => {
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
});
