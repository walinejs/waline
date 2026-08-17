// oxlint-disable vitest/no-hooks
import http from 'node:http';
import { createRequire } from 'node:module';

import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

process.env.SQLITE_PATH = `/tmp/test-waline-notify-spam-${process.pid}.sqlite`;
process.env.JWT_TOKEN = 'test-jwt-secret';
process.env.AKISMET_KEY = 'false';
process.env.AUTHOR_EMAIL = 'owner@example.com';

const require = createRequire(import.meta.url);
const main = require('../index.js');

const commentAdd = vi.fn();
const commentSelect = vi.fn();

const handler = main({
  forbiddenWords: ['spam-ad-keyword'],
  customModel: (modelName) => {
    if (modelName === 'Comment') {
      return { add: commentAdd, select: commentSelect };
    }

    if (modelName === 'Users') {
      return { select: async () => [] };
    }
  },
});

const NotifyService = require('../src/service/notify.js');
const notifyRun = vi.spyOn(NotifyService.prototype, 'run').mockResolvedValue();

describe('comment notification for spam', () => {
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
    commentAdd.mockReset();
    commentSelect.mockReset();
    notifyRun.mockClear();
    commentSelect.mockResolvedValue([]);
    commentAdd.mockImplementation(async (data) => ({
      objectId: 'comment-1',
      ...data,
    }));
  });

  afterAll(async () => {
    delete process.env.SQLITE_PATH;
    delete process.env.JWT_TOKEN;
    delete process.env.AKISMET_KEY;
    delete process.env.AUTHOR_EMAIL;
    notifyRun.mockRestore();
    await new Promise((resolve) => {
      server.close(resolve);
    });
  });

  const postComment = (body) =>
    fetch(`http://localhost:${port}/api/comment`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());

  it('notifies the author for a normal comment', async () => {
    const body = await postComment({
      nick: 'reader',
      mail: 'reader@example.com',
      comment: 'Nice post',
      url: '/posts/hello/',
    });

    expect(body.errno).toBe(0);
    expect(commentAdd).toHaveBeenCalledOnce();
    expect(commentAdd.mock.calls[0][0].status).toBe('approved');
    expect(notifyRun).toHaveBeenCalledOnce();
  });

  it('does not notify the author when a comment is stored as spam', async () => {
    const body = await postComment({
      nick: 'spammer',
      mail: 'spam@example.com',
      comment: 'Buy spam-ad-keyword now',
      url: '/posts/hello/',
    });

    expect(body.errno).toBe(0);
    expect(commentAdd).toHaveBeenCalledOnce();
    expect(commentAdd.mock.calls[0][0].status).toBe('spam');
    expect(notifyRun).not.toHaveBeenCalled();
  });
});
