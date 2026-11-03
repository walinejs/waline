import { readFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';

import type { WalineModel, WalineModels, Where } from '@waline/core';
/* oxlint-disable eslint/curly, eslint/class-methods-use-this, typescript/explicit-function-return-type, typescript/strict-boolean-expressions, typescript/no-unsafe-call, typescript/require-await, typescript/no-unnecessary-type-parameters, typescript/no-unsafe-argument, typescript/no-unnecessary-type-assertion, vitest/prefer-describe-function-title, vitest/prefer-expect-resolves, vitest/prefer-strict-equal, vitest/prefer-to-be, vitest/no-conditional-in-test */
import { describe, expect, it } from 'vitest';

import { createD1Models, createWalineWorker } from '../src/index.js';
import type { D1Database, D1PreparedStatement, D1Result } from '../src/index.js';

type Row = Record<string, any> & { objectId: string };

const matches = (row: Row, where: Where<any>): boolean =>
  Object.entries(where).every(([key, expected]) => {
    if (key === '_complex') return true;
    if (Array.isArray(expected)) {
      const [operator, operand] = expected;
      if (operator === 'IN') return operand.includes(row[key]);
      if (operator === 'NOT IN') return !operand.includes(row[key]);
      if (operator === '!=') return row[key] !== operand;
      return true;
    }
    return expected === undefined ? row[key] === undefined : row[key] === expected;
  });

const model = <T extends Row>(rows: T[] = []): WalineModel<T> => ({
  async select(where, options = {}) {
    const result = rows.filter((row) => matches(row, where));
    return result.slice(
      options.offset ?? 0,
      options.limit ? (options.offset ?? 0) + options.limit : undefined,
    );
  },
  async count(where = {}, options = {}) {
    const selected = rows.filter((row) => matches(row, where));
    if (!options.group) return selected.length;
    return [];
  },
  async add(data) {
    const row = { objectId: String(rows.length + 1), ...data } as T;
    rows.push(row);
    return row;
  },
  async update(data, where) {
    const selected = rows.filter((row) => matches(row, where));
    for (const row of selected) Object.assign(row, typeof data === 'function' ? data(row) : data);
    return selected;
  },
  async delete(where) {
    for (let index = rows.length - 1; index >= 0; index -= 1)
      if (matches(rows[index], where)) rows.splice(index, 1);
  },
});

const models = (): WalineModels => {
  const Comment = model<any>();
  const Counter = model<any>();
  const Users = model<any>();
  return {
    Comment,
    Counter,
    Users,
    get: (name) => ({ Comment, Counter, Users })[name as 'Comment'],
  };
};

describe('createWalineWorker', () => {
  it('serves dashboard and version headers', async () => {
    const app = createWalineWorker({ models: models() });
    const response = await app.request('/ui/login', {}, { SITE_NAME: 'Test' });
    expect(response.status).toBe(200);
    expect(response.headers.get('x-waline-version')).toBe('0.1.0');
    expect(await response.text()).toContain('Waline Management System');
  });

  it('creates and lists comments through the core', async () => {
    const app = createWalineWorker({ models: models() });
    const created = await app.request('/api/comment', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ comment: '<b>Hello</b>', nick: 'Guest', url: '/' }),
    });
    expect(created.status).toBe(200);
    expect(await created.json()).toMatchObject({
      errno: 0,
      data: { comment: '<p>&lt;b&gt;Hello&lt;/b&gt;</p>', url: '/' },
    });

    const listed = await app.request('/api/comment?path=/');
    expect(await listed.json()).toMatchObject({
      errno: 0,
      data: { count: 1, data: [{ nick: 'Guest' }] },
    });
  });

  it('keeps deprecated raw response shapes', async () => {
    const app = createWalineWorker({ models: models() });
    const response = await app.request('/article?path=/&type=time');
    expect(response.headers.get('deprecation')).toBe('true');
    expect(await response.json()).toEqual(0);
  });

  it('enforces secure domains', async () => {
    const app = createWalineWorker({ models: models() });
    const response = await app.request(
      '/api/token',
      { headers: { origin: 'https://evil.example' } },
      { SECURE_DOMAINS: 'safe.example' },
    );
    expect(response.status).toBe(403);
  });

  it('accepts bcrypt hashes created by @waline/vercel', async () => {
    const Comment = model<any>();
    const Counter = model<any>();
    const Users = model<any>([
      {
        objectId: '1',
        email: 'admin@example.com',
        password: '$2b$10$nKdNetRIFSoDfLxyftK90ukhxTRg.5jcb8KFzpM3OSbTbbp.E6CIy',
        type: 'administrator',
      },
    ]);
    const app = createWalineWorker({
      models: { Comment, Counter, Users, get: () => Comment },
    });
    const response = await app.request(
      '/api/token',
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: 'admin@example.com', password: 'secret' }),
      },
      { JWT_TOKEN: 'unit-test-secret' },
    );
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ errno: 0, data: { email: 'admin@example.com' } });
  });
});

describe('createD1Models', () => {
  it('maps objectId, conditions, ordering and pagination to parameterized SQL', async () => {
    const calls: { sql: string; values: unknown[] }[] = [];
    class Statement implements D1PreparedStatement {
      values: unknown[] = [];
      constructor(private readonly sql: string) {}
      bind(...values: unknown[]) {
        this.values = values;
        calls.push({ sql: this.sql, values });
        return this;
      }
      async all<T>(): Promise<D1Result<T>> {
        return { success: true, results: [{ id: 3, url: '/a', time: 2 }] as T[] };
      }
      async first<T>(): Promise<T | null> {
        return { id: 4, url: '/b' } as T;
      }
      async run<T>(): Promise<D1Result<T>> {
        return { success: true };
      }
    }
    const database: D1Database = {
      prepare: (sql) => new Statement(sql),
      batch: async () => [],
      exec: async () => undefined,
    };
    const storage = createD1Models(database);
    await expect(
      storage.Counter.select(
        { url: ['IN', ['/a']] },
        { limit: 10, offset: 2, order: [{ field: 'objectId', direction: 'desc' }] },
      ),
    ).resolves.toEqual([{ objectId: '3', url: '/a', time: 2 }]);
    expect(calls[0].sql).toContain('FROM "wl_Counter"');
    expect(calls[0].sql).toContain('"id" DESC');
    expect(calls[0].values).toEqual(['/a', 10, 2]);
  });

  it('runs the bundled migration and model operations against SQLite', async () => {
    const sqlite = new DatabaseSync(':memory:');
    sqlite.exec(readFileSync(new URL('../migrations/0001_initial.sql', import.meta.url), 'utf8'));
    const database: D1Database = {
      prepare(sql) {
        const statement = sqlite.prepare(sql);
        let values: unknown[] = [];
        return {
          bind(...input) {
            values = input;
            return this;
          },
          async all<T>() {
            return { success: true, results: statement.all(...(values as any[])) as T[] };
          },
          async first<T>() {
            return (statement.get(...(values as any[])) as T | undefined) ?? null;
          },
          async run<T>() {
            const result = statement.run(...(values as any[]));
            return {
              success: true,
              meta: {
                changes: Number(result.changes),
                last_row_id: Number(result.lastInsertRowid),
              },
            } as D1Result<T>;
          },
        };
      },
      async batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]> {
        return Promise.all(statements.map((statement) => statement.run<T>()));
      },
      async exec(sql) {
        sqlite.exec(sql);
      },
    };
    const storage = createD1Models(database);
    const created = await storage.Counter.add({ url: '/sqlite', time: 1 });
    expect(created.objectId).toBe('1');
    await storage.Counter.update((current) => ({ time: Number(current.time) + 1 }), {
      objectId: created.objectId,
    });
    await expect(storage.Counter.select({ url: '/sqlite' })).resolves.toMatchObject([
      { objectId: '1', time: 2, url: '/sqlite' },
    ]);
  });
});
