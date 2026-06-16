import http from 'node:http';
import { createRequire } from 'node:module';

import { afterAll, beforeAll, describe, expect, it } from 'vitest';

// Set required env vars before booting the ThinkJS application
process.env.SQLITE_PATH = `/tmp/test-waline-${process.pid}.sqlite`;
process.env.JWT_TOKEN = 'test-jwt-secret';

// Intercept fetch so the oauth-service middleware does not make real HTTP calls
const _originalFetch = globalThis.fetch;
globalThis.fetch = async (url, options) => {
  if (typeof url === 'string' && url.includes('oauth')) {
    return { json: async () => ({ services: [] }) };
  }
  return _originalFetch(url, options);
};

const require = createRequire(import.meta.url);
const main = require('../index.js');

// Use a custom model stub so no real database connection is needed
const handler = main({
  customModel: (modelName) => {
    if (modelName === 'Comment') {
      return {
        select: async () => [],
        count: async () => 0,
      };
    }

    if (modelName === 'Users') {
      return {
        select: async () => [],
        add: async () => ({}),
        update: async () => {},
        delete: async () => {},
        count: async () => 0,
      };
    }
  },
});

let server;
let port;

beforeAll(async () => {
  server = http.createServer(handler);
  await new Promise((resolve) => server.listen(0, resolve));
  ({ port } = server.address());
});

afterAll(async () => {
  globalThis.fetch = _originalFetch;
  delete process.env.SQLITE_PATH;
  delete process.env.JWT_TOKEN;
  await new Promise((resolve) => server.close(resolve));
});

const apiRequest = (method, path, body) => {
  const url = `http://localhost:${port}${path}`;
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };
  if (method !== 'GET' && body) {
    options.body = JSON.stringify(body);
  }
  return fetch(url, options).then((r) => r.json());
};

describe('GET /api/token', () => {
  it('should return empty user info when not authenticated', async () => {
    const body = await apiRequest('GET', '/api/token');
    expect(body.errno).toBe(0);
    expect(body.data).toStrictEqual({});
  });
});

describe('GET /api/comment', () => {
  it('should return an empty comment list for a running server', async () => {
    const body = await apiRequest('GET', '/api/comment?path=/unit-test');

    expect(body.errno).toBe(0);
    expect(body.data).toMatchObject({
      page: 1,
      pageSize: 10,
      count: 0,
      data: [],
    });
  });
});

describe('POST /api/token', () => {
  it('should return a validation error when email is missing', async () => {
    const body = await apiRequest('POST', '/api/token', { password: 'password123' });
    expect(body.errno).toBe(1001);
  });

  it('should return a validation error when email format is invalid', async () => {
    const body = await apiRequest('POST', '/api/token', {
      email: 'not-an-email',
      password: 'password123',
    });
    expect(body.errno).toBe(1001);
  });

  it('should return a validation error when password is missing', async () => {
    const body = await apiRequest('POST', '/api/token', { email: 'test@example.com' });
    expect(body.errno).toBe(1001);
  });

  it('should return a login failure when user does not exist', async () => {
    const body = await apiRequest('POST', '/api/token', {
      email: 'nonexistent@example.com',
      password: 'password123',
    });
    expect(body.errno).not.toBe(0);
  });
});
