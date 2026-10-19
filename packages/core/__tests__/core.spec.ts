/* oxlint-disable vitest/prefer-strict-equal */
import { describe, expect, it } from 'vitest';

import { createWalineCore } from '../src/index.js';
import type { WalineContext, WalineModel, WalineError } from '../src/index.js';

const ctx = (deprecated = false): WalineContext => ({
  headers: {},
  state: { deprecated },
  ip: '127.0.0.1',
});

const memoryModel = <T extends { objectId: string }>(initial: T[] = []): WalineModel<T> => {
  const rows = [...initial];

  return {
    async select(where) {
      return rows.filter((row) =>
        Object.entries(where).every(([key, expected]) => {
          if (key === '_complex') return true;
          if (Array.isArray(expected) && expected[0] === 'IN') {
            return expected[1].includes(row[key as keyof T]);
          }
          return row[key as keyof T] === expected;
        }),
      );
    },
    async count() {
      return rows.length;
    },
    async add(data) {
      const row = { objectId: String(rows.length + 1), ...data } as T;
      rows.push(row);
      return row;
    },
    async update(data, where) {
      const selected = await this.select(where);
      for (const row of selected) Object.assign(row, typeof data === 'function' ? data(row) : data);
      return selected;
    },
    async delete() {
      rows.splice(0);
    },
  };
};

const setup = () => {
  const Comment = memoryModel<any>();
  const Counter = memoryModel<any>();
  const Site = memoryModel<any>();
  const SiteAdmin = memoryModel<any>();
  const Users = memoryModel<any>();

  return {
    Comment,
    Counter,
    Site,
    SiteAdmin,
    Users,
    core: createWalineCore({ models: { Comment, Counter, Site, SiteAdmin, Users } }),
  };
};

describe('waline core', () => {
  it('keeps counter compatibility shapes', async () => {
    const { core } = setup();

    await expect(core.counter.get({ path: ['/'], type: ['time'] }, ctx())).resolves.toEqual([
      { time: 0 },
    ]);
    await expect(core.counter.update({ path: '/', type: 'time' }, ctx(true))).resolves.toBe(1);
    await expect(core.counter.get({ path: ['/'], type: ['time'] }, ctx(true))).resolves.toBe(1);
  });

  it('isolates counters with the same path by site', async () => {
    const { core, Counter } = setup();
    await Counter.add({ objectId: 'a', url: '/', site_id: 'site-a', time: 2 });
    await Counter.add({ objectId: 'b', url: '/', site_id: 'site-b', time: 9 });
    const request = ctx();
    request.state.site = {
      objectId: 'site-a',
      name: 'A',
      url: 'https://a.example',
      status: 'active',
    };

    await expect(core.counter.get({ path: ['/'], type: ['time'] }, request)).resolves.toEqual([
      { time: 2 },
    ]);
  });

  it('validates required comment fields without framework state', async () => {
    const { core } = setup();

    await expect(core.comment.create({ comment: '', url: '/' }, ctx())).rejects.toMatchObject({
      code: 'VALIDATION_ERROR',
      status: 400,
    } satisfies Partial<WalineError>);
  });

  it('enforces comment ownership in the core', async () => {
    const { core, Comment } = setup();
    await Comment.add({
      objectId: 'c1',
      comment: 'test',
      url: '/',
      insertedAt: new Date(),
      user_id: 'owner',
    });
    const request = ctx();
    request.state.userInfo = { objectId: 'other', email: 'u@example.com', type: 'guest' };

    await expect(core.comment.remove({ objectId: 'c1' }, request)).rejects.toMatchObject({
      code: 'FORBIDDEN',
      status: 403,
    });
  });

  it('returns capability errors only when an optional service is used', async () => {
    const { core, Users } = setup();
    await Users.add({ objectId: 'u1', email: 'u@example.com', password: 'hash', type: 'guest' });

    await expect(
      core.auth.login({ email: 'u@example.com', password: 'x' }, ctx()),
    ).rejects.toMatchObject({
      code: 'CAPABILITY_UNAVAILABLE',
      details: { capability: 'password' },
    });
  });
});
