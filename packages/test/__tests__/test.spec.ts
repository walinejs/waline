/* oxlint-disable no-promise-executor-return, typescript/strict-void-return, vitest/no-conditional-in-test, vitest/no-hooks, vitest/prefer-strict-equal, vitest/require-top-level-describe */

import { createServer } from 'node:http';
import type { RequestListener } from 'node:http';
import type { AddressInfo } from 'node:net';

import { afterEach, describe, expect, it } from 'vitest';

import { parseArguments } from '../src/cli.js';
import { HttpClient } from '../src/http.js';
import { redact, renderJSON, renderTerminal, summarize } from '../src/report.js';
import { runCompatibilityTests } from '../src/runner.js';
import type { TestReport, TestResult } from '../src/types.js';
import { apiURL, normalizeServerURL } from '../src/url.js';

const servers: ReturnType<typeof createServer>[] = [];

afterEach(async () => {
  await Promise.all(
    servers.splice(0).map(
      (server) =>
        new Promise<void>((resolve, reject) => {
          server.close((error) => (error ? reject(error) : resolve()));
        }),
    ),
  );
});

const startServer = async (handler: RequestListener): Promise<string> => {
  const server = createServer(handler);
  servers.push(server);
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address() as AddressInfo;
  return `http://127.0.0.1:${port}`;
};

describe('uRL handling', () => {
  it('normalizes HTTP URLs', () => {
    expect(normalizeServerURL('https://example.com/waline/?x=1#hash')).toBe(
      'https://example.com/waline',
    );
    expect(apiURL('https://example.com', '/comment')).toBe('https://example.com/api/comment');
  });

  it('rejects invalid or unsafe protocols', () => {
    expect(() => normalizeServerURL('not-a-url')).toThrow('Invalid server URL');
    expect(() => normalizeServerURL('file:///tmp/waline')).toThrow('HTTP or HTTPS');
  });
});

describe('reporting', () => {
  const results: TestResult[] = [
    { id: 'a', group: 'server', name: 'A', status: 'passed', duration: 1 },
    { id: 'b', group: 'server', name: 'B', status: 'failed', duration: 2, reason: 'bad' },
    { id: 'c', group: 'external', name: 'C', status: 'skipped', duration: 0 },
  ];

  it('calculates pass rate and coverage independently', () => {
    const summary = summarize(results);
    expect(summary).toMatchObject({
      passed: 1,
      failed: 1,
      skipped: 1,
      passRate: 50,
      fullyCompatible: false,
    });
    expect(summary.coverage).toBeCloseTo(200 / 3);
  });

  it('renders terminal and redacted JSON reports', () => {
    const report: TestReport & { token?: string } = {
      schemaVersion: 1,
      packageVersion: '0.1.0',
      serverURL: 'https://example.com',
      mode: 'basic',
      startedAt: new Date(0).toISOString(),
      duration: 3,
      summary: summarize(results),
      results,
      token: 'secret',
    };
    expect(renderTerminal(report, false)).toContain('Pass rate: 50.0%');
    expect(renderJSON(report)).not.toContain('secret');
    expect(redact({ password: 'secret', nested: { authorization: 'bearer' } })).toEqual({
      password: '[REDACTED]',
      nested: { authorization: '[REDACTED]' },
    });
  });
});

describe('cLI arguments', () => {
  it('parses full JSON mode', () => {
    expect(
      parseArguments([
        'https://example.com',
        '--full',
        '--reporter=json',
        '--output=report.json',
        '--timeout=5000',
        '--no-color',
      ]),
    ).toMatchObject({
      serverURL: 'https://example.com',
      full: true,
      reporter: 'json',
      output: 'report.json',
      timeout: 5000,
      color: false,
    });
  });

  it('rejects invalid options', () => {
    expect(() => parseArguments(['https://example.com', '--reporter=xml'])).toThrow(
      'Unknown reporter',
    );
    expect(() => parseArguments(['https://example.com', '--timeout=0'])).toThrow(
      'positive integer',
    );
  });
});

describe('hTTP and compatibility runner', () => {
  it('runs the read-only suite and reports full-only capabilities as skipped', async () => {
    const serverURL = await startServer((request, response) => {
      response.setHeader('content-type', 'application/json');
      if (request.url === '/') {
        response.setHeader('x-waline-version', '1.43.4');
        response.end('<html>Waline</html>');
        return;
      }
      if (request.url?.startsWith('/api/comment/rss')) {
        response.setHeader('content-type', 'application/rss+xml');
        response.end('<?xml version="1.0"?><rss></rss>');
        return;
      }
      if (request.url?.startsWith('/api/comment?path=')) {
        response.end(JSON.stringify({ errno: 0, data: { data: [], count: 0 } }));
        return;
      }
      if (request.url?.startsWith('/api/comment?type=count')) {
        response.end(JSON.stringify({ errno: 0, data: [0] }));
        return;
      }
      if (request.url?.startsWith('/api/comment?type=recent')) {
        response.end(JSON.stringify({ errno: 0, data: [] }));
        return;
      }
      if (request.url?.startsWith('/api/user')) {
        response.end(JSON.stringify({ errno: 0, data: [] }));
        return;
      }
      if (request.url?.startsWith('/api/article')) {
        response.end(JSON.stringify({ errno: 0, data: [{ time: 0, reaction0: 0 }] }));
        return;
      }
      if (request.url === '/api/token') {
        response.end(JSON.stringify({ errno: 0, data: null }));
        return;
      }
      response.statusCode = 404;
      response.end(JSON.stringify({ errno: 404 }));
    });

    const report = await runCompatibilityTests({ serverURL });
    expect(report.serverVersion).toBe('1.43.4');
    expect(report.summary.failed).toBe(0);
    expect(report.summary.skipped).toBeGreaterThan(0);
    expect(report.summary.passRate).toBe(100);
    expect(report.summary.coverage).toBeLessThan(100);
  });

  it('diagnoses non-JSON responses and timeouts', async () => {
    const nonJSON = await startServer((_request, response) => response.end('not json'));
    await expect(new HttpClient(nonJSON, 100).request('token')).rejects.toThrow('non-JSON');

    const slow = await startServer(() => {});
    await expect(new HttpClient(slow, 10).request('token')).rejects.toThrow('timed out');
  });
});
