/* oxlint-disable import/no-nodejs-modules, max-lines, max-statements, no-await-in-loop */

import { randomUUID } from 'node:crypto';

import packageJSON from '../package.json' with { type: 'json' };
import { HttpClient, record, successData } from './http.js';
import { summarize } from './report.js';
import type { Credentials, RunOptions, TestGroup, TestReport, TestResult } from './types.js';
import { normalizeServerURL } from './url.js';

interface RuntimeContext {
  client: HttpClient;
  serverURL: string;
  prefix: string;
  path: string;
  email: string;
  password: string;
  adminToken?: string;
  guestToken?: string;
  rootCommentId?: string;
  replyCommentId?: string;
  guestId?: string;
  importedCommentId?: string;
  serverVersion?: string;
  cleanup: { label: string; run: () => Promise<void> }[];
  credentials: Credentials;
}

interface TestDefinition {
  id: string;
  group: TestGroup;
  name: string;
  full?: boolean;
  skip?: string;
  run?: (context: RuntimeContext) => Promise<void>;
}

class SkipTestError extends Error {
  override name = 'SkipTestError';
}

const objectId = (value: unknown, label: string): string => {
  const data = record(value, label);
  const id = data.objectId;

  if (typeof id !== 'string' && typeof id !== 'number') {
    throw new TypeError(`${label} is missing objectId`);
  }

  return String(id);
};

const expectArray = (value: unknown, label: string): unknown[] => {
  if (!Array.isArray(value)) throw new TypeError(`${label} must be an array`);
  return value;
};

const expectNumber = (value: unknown, label: string): number => {
  if (typeof value !== 'number') throw new TypeError(`${label} must be a number`);
  return value;
};

const tests: TestDefinition[] = [
  {
    id: 'server.reachable',
    group: 'server',
    name: 'Server is reachable and identifies as Waline',
    async run(context) {
      const { response } = await context.client.request('/', { api: false, json: false });
      context.serverVersion = response.headers.get('x-waline-version') ?? undefined;
      if (!context.serverVersion)
        {throw new TypeError('response is missing the x-waline-version header');}
    },
  },
  {
    id: 'auth.anonymous',
    group: 'auth',
    name: 'Anonymous session response',
    async run({ client }) {
      const { data } = await client.request('token');
      const session = successData(data, 'GET /api/token');
      if (session !== null && session !== undefined && typeof session !== 'object') {
        throw new TypeError('anonymous session data has an invalid shape');
      }
    },
  },
  {
    id: 'comments.list',
    group: 'comments',
    name: 'Public comment list, paging and sorting',
    async run({ client, path }) {
      const { data } = await client.request(
        `comment?path=${encodeURIComponent(path)}&page=1&pageSize=10&sortBy=insertedAt_desc`,
      );
      const list = record(successData(data, 'GET /api/comment'), 'comment list data');
      expectArray(list.data, 'comment list data.data');
      expectNumber(list.count, 'comment list data.count');
    },
  },
  {
    id: 'comments.count',
    group: 'comments',
    name: 'Comment count',
    async run({ client, path }) {
      const { data } = await client.request(`comment?type=count&url=${encodeURIComponent(path)}`);
      const counts = expectArray(
        successData(data, 'GET /api/comment?type=count'),
        'comment counts',
      );
      expectNumber(counts[0], 'first comment count');
    },
  },
  {
    id: 'comments.recent',
    group: 'comments',
    name: 'Recent comments',
    async run({ client }) {
      const { data } = await client.request('comment?type=recent&count=1');
      expectArray(successData(data, 'GET /api/comment?type=recent'), 'recent comments');
    },
  },
  {
    id: 'comments.rss',
    group: 'comments',
    name: 'Comment RSS feed',
    async run({ client, path }) {
      const { response, data } = await client.request(
        `comment/rss?path=${encodeURIComponent(path)}`,
        {
          json: false,
        },
      );
      if (!response.headers.get('content-type')?.includes('application/rss+xml')) {
        throw new TypeError('RSS response has an invalid content type');
      }
      if (typeof data !== 'string' || !data.includes('<rss'))
        {throw new TypeError('RSS response is invalid');}
    },
  },
  {
    id: 'users.public-list',
    group: 'users',
    name: 'Public user list',
    async run({ client }) {
      const { data } = await client.request('user?pageSize=10');
      expectArray(successData(data, 'GET /api/user'), 'public user list');
    },
  },
  {
    id: 'counters.read',
    group: 'counters',
    name: 'Article counter read',
    async run({ client, path }) {
      const { data } = await client.request(
        `article?path=${encodeURIComponent(path)}&type=${encodeURIComponent('time,reaction0')}`,
      );
      expectArray(successData(data, 'GET /api/article'), 'article counters');
    },
  },
  {
    id: 'auth.login',
    group: 'auth',
    name: 'Administrator login',
    full: true,
    async run(context) {
      const { data } = await context.client.request('token', {
        method: 'POST',
        body: context.credentials,
      });
      const session = record(successData(data, 'POST /api/token'), 'login data');
      if (typeof session.token !== 'string' || session.type !== 'administrator') {
        throw new TypeError('credentials did not return an administrator session');
      }
      context.adminToken = session.token;
    },
  },
  {
    id: 'auth.current-user',
    group: 'auth',
    name: 'Authenticated current user',
    full: true,
    async run({ client, adminToken }) {
      const { data } = await client.request('token', { token: adminToken });
      const session = record(successData(data, 'authenticated GET /api/token'), 'current user');
      if (session.type !== 'administrator')
        {throw new TypeError('current user is not an administrator');}
    },
  },
  {
    id: 'auth.boundary',
    group: 'auth',
    name: 'Administrative permission boundary',
    full: true,
    async run({ client }) {
      const { data } = await client.request('db');
      const body = record(data, 'anonymous GET /api/db');
      if (body.errno !== 401 && body.errno !== 403) {
        throw new TypeError('anonymous database export was not rejected');
      }
    },
  },
  {
    id: 'comments.create',
    group: 'comments',
    name: 'Create root comment with Markdown',
    full: true,
    async run(context) {
      const { data } = await context.client.request('comment', {
        method: 'POST',
        token: context.adminToken,
        body: {
          nick: '@waline/test',
          mail: context.email,
          link: 'https://waline.js.org',
          comment: `**${context.prefix}** root`,
          ua: '@waline/test',
          url: context.path,
        },
      });
      const comment = successData(data, 'POST /api/comment');
      context.rootCommentId = objectId(comment, 'created comment');
      context.cleanup.push({
        label: `comment ${context.rootCommentId}`,
        run: async () => {
          await context.client.request(`comment/${context.rootCommentId}`, {
            method: 'DELETE',
            token: context.adminToken,
          });
        },
      });
      if (!String(record(comment, 'created comment').comment).includes('<strong>')) {
        throw new TypeError('created comment did not render Markdown');
      }
    },
  },
  {
    id: 'comments.reply',
    group: 'comments',
    name: 'Create reply comment',
    full: true,
    async run(context) {
      if (!context.rootCommentId) throw new TypeError('root comment is unavailable');
      const { data } = await context.client.request('comment', {
        method: 'POST',
        token: context.adminToken,
        body: {
          nick: '@waline/test',
          mail: context.email,
          comment: `${context.prefix} reply`,
          ua: '@waline/test',
          url: context.path,
          pid: context.rootCommentId,
          rid: context.rootCommentId,
        },
      });
      context.replyCommentId = objectId(
        successData(data, 'reply POST /api/comment'),
        'created reply',
      );
      context.cleanup.push({
        label: `comment ${context.replyCommentId}`,
        run: async () => {
          await context.client.request(`comment/${context.replyCommentId}`, {
            method: 'DELETE',
            token: context.adminToken,
          });
        },
      });
    },
  },
  {
    id: 'comments.update',
    group: 'comments',
    name: 'Edit, moderate, pin and like comments',
    full: true,
    async run({ client, adminToken, rootCommentId, prefix }) {
      if (!rootCommentId) throw new TypeError('root comment is unavailable');
      for (const body of [
        { comment: `${prefix} edited` },
        { like: true },
        { like: false },
        { status: 'waiting' },
        { status: 'approved', sticky: 1 },
      ]) {
        const { data } = await client.request(`comment/${rootCommentId}`, {
          method: 'PUT',
          token: adminToken,
          body,
        });
        successData(data, `PUT /api/comment/${rootCommentId}`);
      }
    },
  },
  {
    id: 'comments.read-written',
    group: 'comments',
    name: 'Read written comments through list, count, recent and RSS',
    full: true,
    async run({ client, path, rootCommentId }) {
      const listResponse = await client.request(
        `comment?path=${encodeURIComponent(path)}&pageSize=10`,
      );
      const list = record(
        successData(listResponse.data, 'test comment list'),
        'test comment list data',
      );
      const rows = expectArray(list.data, 'test comment list data');
      if (!JSON.stringify(rows).includes(String(rootCommentId)))
        {throw new TypeError('created comment is absent');}
      await client.request(`comment?type=count&url=${encodeURIComponent(path)}`);
      await client.request('comment?type=recent&count=10');
      await client.request(`comment/rss?path=${encodeURIComponent(path)}`, { json: false });
    },
  },
  {
    id: 'counters.write',
    group: 'counters',
    name: 'Increment, decrement and react to an article',
    full: true,
    async run({ client, path }) {
      for (const body of [
        { path, type: 'time', action: 'inc' },
        { path, type: 'time', action: 'desc' },
        { path, type: 'reaction0', action: 'inc' },
        { path, type: 'reaction0', action: 'desc' },
      ]) {
        const { data } = await client.request('article', { method: 'POST', body });
        expectArray(successData(data, 'POST /api/article'), 'updated article counters');
      }
    },
  },
  {
    id: 'users.lifecycle',
    group: 'users',
    name: 'Register, log in, update and remove a test user',
    full: true,
    async run(context) {
      const registration = await context.client.request('user', {
        method: 'POST',
        body: {
          email: context.email,
          password: context.password,
          display_name: context.prefix,
        },
      });
      const registrationData = record(
        successData(registration.data, 'POST /api/user'),
        'registration data',
      );
      if (registrationData.verify === true) {
        const lookup = await context.client.request(
          `user?email=${encodeURIComponent(context.email)}`,
          {
            token: context.adminToken,
          },
        );
        context.guestId = objectId(successData(lookup.data, 'GET /api/user?email'), 'test user');
        context.cleanup.push({
          label: `unverified user ${context.guestId}`,
          run: async () => {
            await context.client.request(`user/${context.guestId}`, {
              method: 'DELETE',
              token: context.adminToken,
            });
          },
        });
        throw new SkipTestError('user registration requires email verification');
      }

      const login = await context.client.request('token', {
        method: 'POST',
        body: { email: context.email, password: context.password },
      });
      const guest = record(successData(login.data, 'test user login'), 'test user login data');
      context.guestToken = String(guest.token);
      context.guestId = objectId(guest, 'test user');
      context.cleanup.push({
        label: `user ${context.guestId}`,
        run: async () => {
          await context.client.request(
            `db?table=Users&objectId=${encodeURIComponent(context.guestId ?? '')}`,
            {
              method: 'PUT',
              token: context.adminToken,
              body: { type: 'verify:waline-test-cleanup' },
            },
          );
          await context.client.request(`user/${context.guestId}`, {
            method: 'DELETE',
            token: context.adminToken,
          });
        },
      });
      const update = await context.client.request('user', {
        method: 'PUT',
        token: context.guestToken,
        body: { display_name: `${context.prefix}-updated` },
      });
      successData(update.data, 'PUT /api/user');
    },
  },
  {
    id: 'auth.two-factor',
    group: 'auth',
    name: 'Create a 2FA secret for the test user',
    full: true,
    async run({ client, guestToken }) {
      if (!guestToken) throw new SkipTestError('requires a verified temporary user');
      const { data } = await client.request('token/2fa', { token: guestToken });
      const secret = record(successData(data, 'GET /api/token/2fa'), '2FA secret');
      if (typeof secret.secret !== 'string' || typeof secret.otpauth_url !== 'string') {
        throw new TypeError('2FA secret response has an invalid shape');
      }
    },
  },
  {
    id: 'database.export',
    group: 'database',
    name: 'Export database',
    full: true,
    async run({ client, adminToken }) {
      const { data } = await client.request('db', { token: adminToken });
      const exported = record(successData(data, 'GET /api/db'), 'database export');
      expectArray(exported.tables, 'database export tables');
      record(exported.data, 'database export data');
    },
  },
  {
    id: 'database.import-update',
    group: 'database',
    name: 'Import and update an isolated comment row',
    full: true,
    async run(context) {
      const imported = await context.client.request('db?table=Comment', {
        method: 'POST',
        token: context.adminToken,
        body: {
          nick: '@waline/test',
          mail: context.email,
          comment: `${context.prefix} imported`,
          url: context.path,
          status: 'approved',
          ua: '@waline/test',
          insertedAt: new Date().toISOString(),
        },
      });
      context.importedCommentId = objectId(
        successData(imported.data, 'POST /api/db'),
        'imported row',
      );
      context.cleanup.push({
        label: `imported comment ${context.importedCommentId}`,
        run: async () => {
          await context.client.request(`comment/${context.importedCommentId}`, {
            method: 'DELETE',
            token: context.adminToken,
          });
        },
      });
      const updated = await context.client.request(
        `db?table=Comment&objectId=${encodeURIComponent(context.importedCommentId)}`,
        {
          method: 'PUT',
          token: context.adminToken,
          body: { comment: `${context.prefix} imported and updated` },
        },
      );
      successData(updated.data, 'PUT /api/db');
    },
  },
  {
    id: 'database.clear',
    group: 'database',
    name: 'Clear a database table',
    skip: 'destructive operation disabled',
  },
  {
    id: 'external.oauth',
    group: 'external',
    name: 'OAuth provider callback',
    skip: 'requires an interactive third-party provider flow',
  },
  {
    id: 'external.email',
    group: 'external',
    name: 'Email verification and password reset delivery',
    skip: 'requires access to the configured mailbox',
  },
  {
    id: 'external.captcha',
    group: 'external',
    name: 'Captcha verification',
    skip: 'requires a browser challenge and provider credentials',
  },
  {
    id: 'external.spam',
    group: 'external',
    name: 'External spam classification',
    skip: 'provider behavior cannot be verified through the Waline API',
  },
  {
    id: 'external.notification',
    group: 'external',
    name: 'Outbound notifications',
    skip: 'requires access to the configured notification destination',
  },
];

const errorReason = (error: unknown): string =>
  error instanceof Error ? error.message : String(error);

export const runCompatibilityTests = async (options: RunOptions): Promise<TestReport> => {
  const started = Date.now();
  const serverURL = normalizeServerURL(options.serverURL);
  const runId = randomUUID();
  const prefix = `waline-test-${runId}`;
  if (options.full && !options.credentials) {
    throw new TypeError('Full mode requires administrator credentials');
  }

  const context: RuntimeContext = {
    client: new HttpClient(serverURL, options.timeout ?? 10_000, options.fetch),
    serverURL,
    prefix,
    path: `/__waline_test__/${runId}`,
    email: `${prefix}@example.com`,
    password: randomUUID(),
    credentials: options.credentials ?? { email: '', password: '' },
    cleanup: [],
  };
  const results: TestResult[] = [];

  for (const test of tests) {
    const testStarted = Date.now();
    let status: TestResult['status'] = 'passed';
    let reason: string | undefined;

    if (test.skip) {
      status = 'skipped';
      reason = test.skip;
    } else if (test.full && !options.full) {
      status = 'skipped';
      reason = 'requires --full';
    } else {
      try {
        await test.run?.(context);
      } catch (err) {
        status = err instanceof SkipTestError ? 'skipped' : 'failed';
        reason = errorReason(err);
      }
    }

    results.push({
      id: test.id,
      group: test.group,
      name: test.name,
      status,
      duration: Date.now() - testStarted,
      ...(reason ? { reason } : {}),
    });
  }

  const cleanupStarted = Date.now();
  const cleanupFailures: string[] = [];
  for (const item of context.cleanup.reverse()) {
    try {
      await item.run();
    } catch (err) {
      cleanupFailures.push(`${item.label}: ${errorReason(err)}`);
    }
  }
  if (options.full) {
    results.push({
      id: 'server.cleanup',
      group: 'server',
      name: 'Clean up generated test data',
      status: cleanupFailures.length ? 'failed' : 'passed',
      duration: Date.now() - cleanupStarted,
      ...(cleanupFailures.length ? { reason: cleanupFailures.join('; ') } : {}),
    });
  }

  return {
    schemaVersion: 1,
    packageVersion: packageJSON.version,
    serverURL,
    ...(context.serverVersion ? { serverVersion: context.serverVersion } : {}),
    mode: options.full ? 'full' : 'basic',
    startedAt: new Date(started).toISOString(),
    duration: Date.now() - started,
    summary: summarize(results),
    results,
  };
};
