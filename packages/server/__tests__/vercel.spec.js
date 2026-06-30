import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { createServer } from 'node:http';

import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const fixturePath = new URL('fixtures/vercel', import.meta.url).pathname;

let oauthServiceStub;
let oauthServiceUrl;
let vercelProcess;
let vercelPort;
let output = '';
const commentStorePath = `/tmp/test-waline-vercel-comments-${process.pid}.json`;
const testPath = `/vercel-unit-test-${process.pid}`;

const listen = async (server) => {
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  return server.address().port;
};

const getFreePort = async () => {
  const server = createServer();
  const port = await listen(server);

  await new Promise((resolve) => {
    server.close(resolve);
  });

  return port;
};

const getVercelUrl = () => `http://127.0.0.1:${vercelPort}`;

const waitForVercel = async () => {
  const deadline = Date.now() + 60_000;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(
        `${getVercelUrl()}/api/comment?path=${encodeURIComponent(testPath)}`,
        {
          signal: AbortSignal.timeout(10_000),
        },
      );

      if (response.ok) return response;
    } catch {
      // Vercel may still be compiling the serverless function.
    }

    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
  }

  throw new Error(`Vercel dev server did not become ready. Output:\n${output}`);
};

beforeAll(async () => {
  // Waline fetches the OAuth service list on every request. Stub it locally so
  // the Vercel runtime test does not depend on the public OAuth service/network.
  oauthServiceStub = createServer((_req, res) => {
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify({ services: [] }));
  });
  const oauthPort = await listen(oauthServiceStub);

  oauthServiceUrl = `http://127.0.0.1:${oauthPort}`;
  vercelPort = await getFreePort();

  vercelProcess = spawn(
    'vercel',
    ['dev', fixturePath, '--local', '--yes', '--listen', `127.0.0.1:${vercelPort}`],
    {
      cwd: process.cwd(),
      env: {
        ...process.env,
        JWT_TOKEN: 'test-jwt-secret',
        OAUTH_URL: oauthServiceUrl,
        AKISMET_KEY: 'false',
        SQLITE_PATH: `/tmp/test-waline-vercel-${process.pid}.sqlite`,
        WALINE_TEST_COMMENT_STORE: commentStorePath,
      },
    },
  );

  vercelProcess.stdout.on('data', (chunk) => {
    output += chunk.toString();
  });
  vercelProcess.stderr.on('data', (chunk) => {
    output += chunk.toString();
  });
}, 70_000);

afterAll(async () => {
  if (vercelProcess && !vercelProcess.killed) {
    vercelProcess.kill('SIGTERM');
    await Promise.race([
      once(vercelProcess, 'exit'),
      new Promise((resolve) => {
        setTimeout(resolve, 5000);
      }),
    ]);
  }

  if (oauthServiceStub) {
    await new Promise((resolve) => {
      oauthServiceStub.close(resolve);
    });
  }
});

describe('vercel runtime', () => {
  it('should serve the client preview page through vercel dev', async () => {
    await waitForVercel();

    const response = await fetch(getVercelUrl());
    const body = await response.text();

    expect(response.ok).toBe(true);
    expect(body).toContain('Waline Vercel Preview');
    expect(body).toContain('/assets/');
  }, 70_000);

  it('should serve the comment API through vercel dev', async () => {
    const response = await waitForVercel();
    const body = await response.json();

    expect(body.errno).toBe(0);
    expect(body.data).toMatchObject({
      page: 1,
      pageSize: 10,
      count: 0,
      data: [],
    });
  }, 70_000);

  it('should publish and fetch a comment through vercel dev', async () => {
    await waitForVercel();

    const comment = {
      nick: 'Vercel Tester',
      mail: 'vercel-tester@example.com',
      link: 'https://example.com',
      comment: 'Hello from Vercel runtime',
      url: testPath,
      ua: 'vitest-vercel-runtime',
    };

    const postResponse = await fetch(`${getVercelUrl()}/api/comment`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(comment),
    });
    const postBody = await postResponse.json();

    expect(postResponse.ok).toBe(true);
    expect(postBody.errno).toBe(0);
    expect(postBody.data).toMatchObject({
      nick: comment.nick,
      link: comment.link,
      objectId: 'vercel-comment-1',
    });

    const getResponse = await fetch(
      `${getVercelUrl()}/api/comment?path=${encodeURIComponent(testPath)}`,
    );
    const getBody = await getResponse.json();

    expect(getResponse.ok).toBe(true);
    expect(getBody.errno).toBe(0);
    expect(getBody.data).toMatchObject({
      page: 1,
      pageSize: 10,
      count: 1,
    });
    expect(getBody.data.data).toHaveLength(1);
    expect(getBody.data.data[0]).toMatchObject({
      nick: comment.nick,
      link: comment.link,
      objectId: 'vercel-comment-1',
    });
    expect(getBody.data.data[0].comment).toContain(comment.comment);
  }, 70_000);
});
