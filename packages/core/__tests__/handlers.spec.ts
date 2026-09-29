/* oxlint-disable vitest/expect-expect, vitest/max-expects, vitest/prefer-called-with, vitest/prefer-strict-equal, vitest/require-mock-type-parameters, vitest/require-to-throw-message */
import { describe, expect, it, vi } from 'vitest';

import { createWalineCore } from '../src/index.js';
import type {
  CreateWalineCoreOptions,
  GroupedCount,
  WalineComment,
  WalineContext,
  WalineCounter,
  WalineModel,
  WalineUser,
  OAuthProfile,
  WalineHook,
  Where,
} from '../src/index.js';
import { currentUser, isAdmin, requireAdmin, requireUser } from '../src/utils/auth.js';
import { createAvatarFormatter } from '../src/utils/avatar.js';
import { createCommentFormatter } from '../src/utils/comment.js';
import {
  levelFor,
  positiveInt,
  requiredCapability,
  requiredString,
} from '../src/utils/validation.js';

type Row = Record<string, any> & { objectId: string };

const matches = (row: Row, where: Record<string, any>): boolean => {
  const entries = Object.entries(where).filter(([key]) => key !== '_complex');
  const direct = entries.every(([key, expected]) => {
    const actual = row[key];
    if (!Array.isArray(expected)) {
      return expected === undefined ? actual === undefined : actual === expected;
    }
    const [operator, operand] = expected;
    if (operator === 'IN') return operand.includes(actual);
    if (operator === 'NOT IN') return !operand.includes(actual);
    if (operator === '!=') return actual !== operand;
    if (operator === '>') return new Date(actual).getTime() > new Date(operand).getTime();
    if (operator === 'LIKE') return String(actual).includes(String(operand).replaceAll('%', ''));
    return true;
  });
  const complex = where._complex;
  if (!complex) return direct;
  const complexResult = matches(row, complex);
  return complex._logic === 'or'
    ? direct &&
        (complexResult ||
          Object.entries(complex).some(
            ([key, value]) => key !== '_logic' && matches(row, { [key]: value }),
          ))
    : direct && complexResult;
};

class MemoryModel<T extends Row> implements WalineModel<T> {
  rows: T[];
  select = vi.fn(async (where: Where<T>, options: any = {}): Promise<T[]> => {
    const result = this.rows.filter((row) => matches(row, where));
    if (options.desc) {
      result.sort((a, b) => String(b[options.desc]).localeCompare(String(a[options.desc])));
    }
    if (options.order) {
      result.sort((a, b) => {
        for (const order of options.order) {
          const delta =
            a[order.field] > b[order.field] ? 1 : a[order.field] < b[order.field] ? -1 : 0;
          if (delta) return order.direction === 'desc' ? -delta : delta;
        }
        return 0;
      });
    }
    const selected = result.slice(
      options.offset ?? 0,
      options.limit ? (options.offset ?? 0) + options.limit : undefined,
    );

    if (!options.field) return selected;

    return selected.map((row) =>
      Object.fromEntries(options.field.map((field: string) => [field, row[field]])),
    ) as T[];
  });
  count = vi.fn(
    async (where: Where<T> = {}, options: any = {}): Promise<number | GroupedCount[]> => {
      const result = this.rows.filter((row) => matches(row, where));
      if (!options.group) return result.length;
      const groups = new Map<string, GroupedCount>();
      for (const row of result) {
        const key = options.group.map((field: string) => row[field] ?? '').join('|');
        const group = groups.get(key) ?? { count: 0 };
        group.count += 1;
        for (const field of options.group) group[field] = row[field];
        groups.set(key, group);
      }
      return [...groups.values()];
    },
  );
  add = vi.fn(async (data: Partial<T>): Promise<T> => {
    const row = { objectId: `new-${this.rows.length}`, ...data } as T;
    this.rows.push(row);
    return row;
  });
  update = vi.fn(
    async (data: Partial<T> | ((current: T) => Partial<T>), where: Where<T>): Promise<T[]> => {
      const rows = this.rows.filter((row) => matches(row, where));
      for (const row of rows) Object.assign(row, typeof data === 'function' ? data(row) : data);
      return rows;
    },
  );
  delete = vi.fn(async (where: Where<T>): Promise<void> => {
    this.rows = this.rows.filter((row) => !matches(row, where));
  });
  constructor(rows: T[] = []) {
    this.rows = rows;
  }
}

const guest: WalineUser = {
  objectId: 'u1',
  id: 'u1',
  email: 'guest@example.com',
  display_name: 'Guest',
  type: 'guest',
  password: 'hash',
};
const administrator: WalineUser = {
  id: 'admin',
  objectId: 'admin',
  email: 'admin@example.com',
  display_name: 'Admin',
  type: 'administrator',
  password: 'hash',
};

const context = (userInfo?: WalineUser, deprecated = false): WalineContext => ({
  headers: {},
  state: { userInfo, deprecated, oauthServices: [{ name: 'github' }] },
  ip: '127.0.0.1',
  serverUrl: 'https://example.com',
});

const hookMock = (result?: unknown): WalineHook => vi.fn(() => result);

const setup = (partial: Partial<CreateWalineCoreOptions> = {}) => {
  const Comment = new MemoryModel<WalineComment & Row>();
  const Counter = new MemoryModel<WalineCounter & Row>();
  const Users = new MemoryModel<WalineUser & Row>();
  const extra = new MemoryModel<Row>();
  const services = {
    token: {
      sign: vi.fn(async (id: string) => `token:${id}`),
      verify: vi.fn(async (token: string) => {
        if (token === 'bad') throw new Error('bad');
        return token.replace('token:', '');
      }),
    },
    password: {
      hash: vi.fn(async (value: string) => `hash:${value}`),
      verify: vi.fn(
        async (value: string, hash: string) => hash === `hash:${value}` || hash === value,
      ),
    },
    twoFactor: {
      create: vi.fn(async () => ({ secret: 'secret', otpauth_url: 'otp' })),
      verify: vi.fn(async (_secret: string, code: string) => code === '123456'),
    },
    captcha: { verify: vi.fn(async () => true) },
    spam: { check: vi.fn(async () => false) },
    markdown: { render: vi.fn(async (value: string) => `<p>${value}</p>`) },
    avatar: { stringify: vi.fn(async () => 'https://avatar.test/a') },
    region: { lookup: vi.fn(async (_ip: string, depth: number) => `region-${depth}`) },
    userAgent: {
      parse: vi.fn(() => ({
        browser: { name: 'Chrome', version: '100.1.2' },
        os: { name: 'TestOS', version: '1' },
      })),
    },
    notification: {
      send: vi.fn(async () => undefined),
      passwordReset: vi.fn(async () => undefined),
      verification: vi.fn(async () => undefined),
    },
    webhook: { emit: vi.fn(async () => undefined) },
    oauth: {
      authorize: vi.fn<() => Promise<OAuthProfile>>(async () => ({
        id: 'social',
        email: 'oauth@example.com',
        name: 'OAuth',
        avatar: 'avatar',
      })),
    },
    clock: { now: vi.fn(() => new Date('2026-01-01T00:00:00Z')) },
    random: { value: vi.fn(() => 0.5) },
  };
  const options: CreateWalineCoreOptions = {
    models: { Comment, Counter, Users, get: () => extra },
    config: { levels: [0, 2], likeIncMax: 2 },
    services,
    logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
    ...partial,
  };
  const core = createWalineCore(options);
  return { core, Comment, Counter, Users, extra, services, options };
};

describe('core utilities', () => {
  it('covers validation and authorization helpers', () => {
    expect(requiredString('ok', 'name')).toBe('ok');
    expect(() => requiredString('', 'name')).toThrow();
    expect(positiveInt(undefined, 3)).toBe(3);
    expect(positiveInt(2, 1, 3)).toBe(2);
    expect(() => positiveInt(0, 1)).toThrow();
    expect(requiredCapability('value', 'test')).toBe('value');
    expect(() => requiredCapability(undefined, 'test')).toThrow();
    expect(levelFor([0, 2, 10], 5)).toBe(1);
    expect(currentUser(context())).toBeUndefined();
    expect(currentUser({ headers: {}, state: { userInfo: {} as WalineUser } })).toBeUndefined();
    expect(
      currentUser({ headers: {}, state: { userInfo: null as unknown as WalineUser } }),
    ).toBeUndefined();
    expect(
      currentUser({ headers: {}, state: { userInfo: [] as unknown as WalineUser } }),
    ).toBeUndefined();
    expect(isAdmin(context(administrator))).toBe(true);
    expect(requireUser(context(guest))).toBe(guest);
    expect(() => requireUser(context())).toThrow();
    expect(requireAdmin(context(administrator))).toBe(administrator);
    expect(() => requireAdmin(context(guest))).toThrow();
  });

  it('covers formatter fallbacks', async () => {
    const env = setup();
    const runtime: any = {
      models: env.options.models,
      config: { avatarProxy: 'https://proxy.test' },
      services: env.services,
    };
    const avatar = createAvatarFormatter(runtime);
    await expect(avatar({ ...guest, avatar: 'https://proxy.test/a' })).resolves.toBe(
      'https://proxy.test/a',
    );
    await expect(avatar({ ...guest, avatar: undefined })).resolves.toContain('https://proxy.test');
    const noAvatar = createAvatarFormatter({ ...runtime, config: {}, services: {} });
    await expect(noAvatar(guest)).resolves.toBe('');
    const format = createCommentFormatter(runtime);
    await expect(
      format(
        { objectId: 'c', comment: 'x', url: '/', insertedAt: new Date(), ip: '1', ua: '' },
        context(administrator),
      ),
    ).resolves.toMatchObject({ ip: '1', addr: 'region-3', orig: 'x' });
    const plain = createCommentFormatter({
      ...runtime,
      config: { disableUserAgent: true, disableRegion: true },
      services: {},
    });
    await expect(
      plain({ objectId: 'c', comment: 'x', url: '/', insertedAt: new Date() }, context()),
    ).resolves.not.toHaveProperty('browser');
    const sparseAgent = createCommentFormatter({
      ...runtime,
      services: { userAgent: { parse: () => ({ browser: {}, os: {} }) } },
    });
    await expect(
      sparseAgent({ objectId: 'c', comment: 'x', url: '/', insertedAt: new Date() }, context()),
    ).resolves.toHaveProperty('browser', '');
  });

  it('covers default runtime services', async () => {
    const env = setup();
    const core = createWalineCore({ models: env.options.models });
    await core.comment.create({ comment: 'plain', url: '/' }, context(administrator));
    env.Comment.rows[0].objectId = 'plain';
    await core.comment.update({ objectId: 'plain', data: { like: true } }, context(administrator));
  });
});

describe('counter handler', () => {
  it('covers reads, creation, increments and decrements', async () => {
    const { core } = setup();
    await expect(core.counter.get({}, context())).resolves.toBe(0);
    await expect(
      core.counter.get({ path: ['/a'], type: ['time', 'like'] }, context()),
    ).resolves.toStrictEqual([{ time: 0, like: 0 }]);
    await expect(core.counter.update({ path: '/a' }, context())).resolves.toStrictEqual([
      { time: 1 },
    ]);
    await expect(
      core.counter.get({ path: ['/a'], type: ['time'] }, context(undefined, true)),
    ).resolves.toBe(1);
    await expect(
      core.counter.update({ path: '/missing', action: 'desc' }, context()),
    ).resolves.toStrictEqual([0]);
    await expect(
      core.counter.update({ path: '/missing2', action: 'desc' }, context(undefined, true)),
    ).resolves.toBe(0);
    await expect(
      core.counter.update({ path: '/created', action: 'inc' }, context(undefined, true)),
    ).resolves.toBe(1);
    await expect(
      core.counter.update({ path: '/a', action: 'inc' }, context()),
    ).resolves.toStrictEqual([{ time: 2 }]);
    await expect(
      core.counter.update({ path: '/a', action: 'desc' }, context(undefined, true)),
    ).resolves.toBe(1);
    const env = setup();
    env.Counter.rows.push({ objectId: 'zero', url: '/zero', time: 0 });
    await expect(
      env.core.counter.update({ path: '/zero', action: 'desc' }, context()),
    ).resolves.toStrictEqual([{ time: 0 }]);
    env.Counter.update.mockResolvedValueOnce([]);
    await expect(
      env.core.counter.update({ path: '/zero', action: 'inc' }, context()),
    ).resolves.toStrictEqual([{ time: 0 }]);
    env.Counter.rows.push({ objectId: 'unset', url: '/unset' });
    await expect(
      env.core.counter.update({ path: '/unset', action: 'inc' }, context()),
    ).resolves.toStrictEqual([{ time: 1 }]);
    await expect(core.counter.update({ path: '', action: 'inc' }, context())).rejects.toThrow();
    await expect(
      core.counter.update({ path: '/a', action: 'bad' as 'inc' }, context()),
    ).rejects.toThrow();
  });
});

describe('auth handler', () => {
  it('covers sessions, login and two-factor flows', async () => {
    const { core, Users, services } = setup();
    Users.rows.push({ ...guest, avatar: '' }, { ...administrator, '2fa': 'x'.repeat(32) });
    const account = Users.rows[0];
    await expect(core.auth.resolveSession({}, context())).resolves.toBeUndefined();
    await expect(core.auth.resolveSession({ token: 'bad' }, context())).resolves.toBeUndefined();
    await expect(
      core.auth.resolveSession({ token: 'token:none' }, context()),
    ).resolves.toBeUndefined();
    const session = await core.auth.resolveSession({ token: 'token:u1' }, context());
    expect(session).toMatchObject({ id: 'u1', token: 'token:u1' });
    expect(session).not.toHaveProperty('password');
    await expect(
      core.auth.resolveSession({ token: 'token:u1' }, { headers: {}, state: {} }),
    ).resolves.not.toHaveProperty('password');
    await expect(
      core.auth.login({ email: guest.email, password: 'hash' }, context()),
    ).resolves.toMatchObject({ token: 'token:u1' });
    await expect(core.auth.login({ email: 'none', password: 'x' }, context())).rejects.toThrow();
    account.type = 'banned';
    await expect(
      core.auth.login({ email: guest.email, password: 'hash' }, context()),
    ).rejects.toThrow();
    account.type = 'verify:1:2';
    await expect(
      core.auth.login({ email: guest.email, password: 'hash' }, context()),
    ).rejects.toThrow();
    account.type = 'guest';
    account.password = 'hash:pw';
    account['2fa'] = 'secret';
    await expect(
      core.auth.login({ email: guest.email, password: 'pw', code: 'bad' }, context()),
    ).rejects.toThrow();
    await expect(
      core.auth.login({ email: guest.email, password: 'pw', code: '123456' }, context()),
    ).resolves.toMatchObject({ objectId: 'u1' });
    await expect(
      core.auth.getTwoFactorStatus({ email: guest.email }, context()),
    ).resolves.toStrictEqual({ enable: true });
    await expect(core.auth.getTwoFactorStatus({}, context(account))).resolves.toStrictEqual({
      enable: true,
    });
    await expect(core.auth.getTwoFactorStatus({}, context())).rejects.toThrow();
    await expect(
      core.auth.createTwoFactorSecret({}, context({ ...administrator, '2fa': 'x'.repeat(32) })),
    ).resolves.toMatchObject({ secret: 'x'.repeat(32) });
    await expect(core.auth.createTwoFactorSecret({}, context(guest))).resolves.toStrictEqual({
      secret: 'secret',
      otpauth_url: 'otp',
    });
    await expect(
      core.auth.enableTwoFactor({ secret: 's', code: 'bad' }, context(guest)),
    ).rejects.toThrow();
    await core.auth.enableTwoFactor({ secret: 's', code: '123456' }, context(guest));
    expect(account['2fa']).toBe('s');
    await expect(core.auth.requestPasswordReset({ email: 'none' }, context())).rejects.toThrow();
    await core.auth.requestPasswordReset({ email: guest.email }, context());
    await core.auth.requestPasswordReset({ email: guest.email }, { headers: {}, state: {} });
    expect(services.notification.passwordReset).toHaveBeenCalled();
  });
});

describe('verification, oauth and database handlers', () => {
  it('covers verification outcomes', async () => {
    const { core, Users } = setup();
    await expect(
      core.verification.verifyEmail({ email: 'none', token: '1' }, context()),
    ).rejects.toThrow();
    Users.rows.push({ ...guest, type: 'guest' });
    const account = Users.rows[0];
    await expect(
      core.verification.verifyEmail({ email: guest.email, token: '1' }, context()),
    ).rejects.toThrow();
    account.type = 'verify:1234:9999999999999';
    await expect(
      core.verification.verifyEmail({ email: guest.email, token: 'bad' }, context()),
    ).rejects.toThrow();
    await core.verification.verifyEmail({ email: guest.email, token: '1234' }, context());
    expect(account.type).toBe('guest');
  });

  it('covers oauth linking, login and account creation', async () => {
    const env = setup();
    env.services.oauth.authorize.mockResolvedValueOnce({} as any);
    await expect(
      env.core.oauth.authorize({ code: 'c', type: 'github' }, context()),
    ).rejects.toThrow();
    env.Users.rows.push({ ...guest, github: 'social' });
    await expect(
      env.core.oauth.authorize({ code: 'c', type: 'github' }, context()),
    ).resolves.toMatchObject({ token: 'token:u1' });
    env.services.oauth.authorize.mockResolvedValueOnce({
      id: 'new-social',
      email: 'x@example.com',
      avatar: 'new-avatar',
    });
    await expect(
      env.core.oauth.authorize({ code: 'c', type: 'github' }, context(guest)),
    ).resolves.toMatchObject({ user: { github: 'new-social' } });
    env.services.oauth.authorize.mockResolvedValueOnce({
      id: 'third-social',
      email: 'x@example.com',
      avatar: 'unused',
    });
    await env.core.oauth.authorize(
      { code: 'c', type: 'twitter' },
      context({ ...guest, avatar: 'existing' }),
    );
    env.services.oauth.authorize.mockResolvedValueOnce({ id: 'another', email: 'new@example.com' });
    await expect(
      env.core.oauth.authorize({ code: 'c', type: 'gitlab' }, context()),
    ).resolves.toHaveProperty('token');
    const noPasswordEnv = setup();
    const noPassword = createWalineCore({
      ...noPasswordEnv.options,
      services: { ...noPasswordEnv.options.services, password: undefined },
    });
    noPasswordEnv.services.oauth.authorize.mockResolvedValueOnce({
      id: 'np',
      email: 'np@example.com',
    });
    await expect(
      noPassword.oauth.authorize({ code: 'c', type: 'gitlab' }, context()),
    ).resolves.toHaveProperty('token');
    const withUsers = setup();
    withUsers.Users.rows.push({ ...administrator });
    withUsers.services.oauth.authorize.mockResolvedValueOnce({
      id: 'guest-social',
      email: 'guest-social@example.com',
    });
    const created = await withUsers.core.oauth.authorize({ code: 'c', type: 'gitlab' }, context());
    expect(created.user.type).toBe('guest');
  });

  it('covers database operations and capability errors', async () => {
    const { core, extra, options } = setup();
    await expect(core.database.export({}, context())).rejects.toThrow();
    await expect(core.database.export({}, context(administrator))).resolves.toMatchObject({
      type: 'waline',
      version: 1,
    });
    await core.database.import(
      { table: 'Any', data: { objectId: 'drop', value: 1 } },
      context(administrator),
    );
    expect(extra.rows[0]).not.toHaveProperty('objectId', 'drop');
    await core.database.update(
      {
        table: 'Any',
        objectId: extra.rows[0].objectId,
        data: { objectId: 'drop', createdAt: 1, updatedAt: 2, value: 2 },
      },
      context(administrator),
    );
    expect(extra.rows[0].value).toBe(2);
    await core.database.clear({ table: 'Any' }, context(administrator));
    expect(extra.rows).toHaveLength(0);
    const noModel = createWalineCore({ ...options, models: { ...options.models, get: undefined } });
    await expect(
      noModel.database.clear({ table: 'Any' }, context(administrator)),
    ).rejects.toThrow();
  });
});

describe('user handler', () => {
  it('covers public and administrator lists', async () => {
    const { core, Comment, Users } = setup();
    Users.rows.push({ ...guest, avatar: 'https://avatar.test/custom' }, { ...administrator });
    Comment.rows.push(
      {
        objectId: 'c1',
        comment: 'one',
        url: '/',
        mail: guest.email,
        user_id: guest.objectId,
        status: 'approved',
        insertedAt: new Date(),
      },
      {
        objectId: 'c2',
        comment: 'two',
        url: '/',
        mail: guest.email,
        user_id: guest.objectId,
        status: 'approved',
        insertedAt: new Date(),
      },
      {
        objectId: 'c3',
        comment: 'anon',
        url: '/',
        mail: 'anon@example.com',
        nick: 'Anon',
        status: 'approved',
        insertedAt: new Date(),
      },
    );
    await expect(core.user.list({ pageSize: 10 }, context())).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ count: 2, level: 1 }),
        expect.objectContaining({ nick: 'Anon' }),
      ]),
    );
    const noComment = setup();
    noComment.Comment.count.mockResolvedValueOnce([{ count: 1, mail: 'missing@example.com' }]);
    await expect(noComment.core.user.list({}, context())).resolves.toStrictEqual([]);
    const noLevels = setup({ config: {} });
    noLevels.Comment.count.mockResolvedValueOnce([{ count: 1 }]);
    await expect(noLevels.core.user.list({}, context())).resolves.toStrictEqual([{ count: 1 }]);
    await expect(
      core.user.list({ page: 1, pageSize: 10 }, context(administrator)),
    ).resolves.toMatchObject({ page: 1, pageSize: 10, totalPages: 1 });
    await expect(
      core.user.get({ email: guest.email }, context(administrator)),
    ).resolves.toMatchObject({ objectId: 'u1' });
    await expect(core.user.get({ email: guest.email }, context(guest))).rejects.toThrow();
  });

  it('covers registration, profile updates and removal', async () => {
    const env = setup({ config: { normalUserType: 'verify:1234:9999999999999' } });
    env.Users.rows.push({ ...guest, type: 'guest', password: 'hash' });
    const account = env.Users.rows[0];
    await expect(
      env.core.user.register({ email: guest.email, password: 'pw' }, context()),
    ).rejects.toThrow();
    const result = await env.core.user.register(
      { email: 'new@example.com', password: 'pw' },
      context(),
    );
    expect(result).toStrictEqual({ verify: true });
    expect(env.services.notification.verification).toHaveBeenCalled();
    const fresh = setup();
    await expect(
      fresh.core.user.register({ email: 'first@example.com', password: 'pw' }, context()),
    ).resolves.toStrictEqual({ verify: false });
    expect(fresh.Users.rows[0].type).toBe('administrator');
    const updateVerify = setup({ config: { normalUserType: 'guest' } });
    updateVerify.Users.rows.push({ ...guest, type: 'verify:1:2' });
    await updateVerify.core.user.register({ email: guest.email, password: 'pw' }, context());
    const defaultGuest = setup({ config: {} });
    defaultGuest.Users.rows.push({ ...administrator });
    await defaultGuest.core.user.register(
      { email: 'default@example.com', password: 'pw' },
      context(),
    );
    expect(defaultGuest.Users.rows.at(-1)?.type).toBe('guest');

    await expect(
      env.core.user.update(
        { objectId: administrator.objectId, data: { display_name: 'No' } },
        context(guest),
      ),
    ).rejects.toThrow();
    env.Users.rows.push({ ...administrator });
    await expect(
      env.core.user.update({ data: { email: administrator.email } }, context(guest)),
    ).rejects.toThrow();
    await expect(env.core.user.update({ data: {} }, context(guest))).resolves.toBeUndefined();
    const noSocialContext = { ...context(account), state: { userInfo: account } };
    await env.core.user.update(
      { data: { display_name: 'No social', type: 1 as any } },
      noSocialContext,
    );
    await env.core.user.update(
      { data: { display_name: 'Updated', password: 'next', github: 'id', type: 'ignored' } },
      context(guest),
    );
    await env.core.user.update({ data: { email: 'unique@example.com' } }, context(account));
    expect(account.display_name).toBe('Updated');
    await env.core.user.update(
      { objectId: guest.objectId, data: { type: 'banned' } },
      context(administrator),
    );
    expect(account.type).toBe('banned');

    await expect(
      env.core.user.remove({ objectId: administrator.objectId }, context(administrator)),
    ).rejects.toThrow();
    await expect(
      env.core.user.remove({ objectId: 'none' }, context(administrator)),
    ).rejects.toThrow();
    const verifyUser = env.Users.rows.find((item) => item.email === 'new@example.com')!;
    await env.core.user.remove({ objectId: verifyUser.objectId }, context(administrator));
    await env.core.user.remove({ objectId: guest.objectId }, context(administrator));
    expect(account.type).toBe('banned');
  });
});

describe('comment handler', () => {
  const seed = (env: ReturnType<typeof setup>) => {
    env.Users.rows.push({ ...guest }, { ...administrator });
    env.Comment.rows.push(
      {
        objectId: 'root',
        comment: 'root',
        url: '/post',
        mail: guest.email,
        nick: 'Guest',
        user_id: guest.objectId,
        status: 'approved',
        insertedAt: '2026-01-01',
        ua: 'ua',
        ip: '1.1.1.1',
        sticky: '1',
        like: 2,
      },
      {
        objectId: 'child',
        comment: 'child',
        url: '/post',
        mail: 'child@example.com',
        nick: 'Child',
        pid: 'root',
        rid: 'root',
        status: 'approved',
        insertedAt: '2026-01-02',
        ip: '2.2.2.2',
      },
      {
        objectId: 'waiting',
        comment: 'wait',
        url: '/post',
        mail: guest.email,
        user_id: guest.objectId,
        status: 'waiting',
        insertedAt: '2026-01-03',
      },
      { objectId: 'spam', comment: 'spam', url: '/post', status: 'spam', insertedAt: '2026-01-04' },
    );
  };

  it('covers lists, recent comments, counts and formatting', async () => {
    const env = setup({ config: { avatarProxy: 'https://proxy.test', levels: [0, 2] } });
    seed(env);
    await expect(env.core.comment.list({ path: '/post' }, context())).resolves.toMatchObject({
      count: 2,
      data: [
        {
          objectId: 'root',
          level: 0,
          children: [
            expect.objectContaining({
              objectId: 'child',
              level: 0,
              reply_user: expect.any(Object),
            }),
          ],
        },
      ],
    });
    await expect(
      env.core.comment.list({ path: '/post', sortBy: 'insertedAt_asc' }, context(guest, true)),
    ).resolves.toHaveProperty('data');
    await expect(
      env.core.comment.list({ path: '/post' }, context(administrator)),
    ).resolves.toHaveProperty('data');
    await expect(env.core.comment.list({ path: '/empty' }, context())).resolves.toMatchObject({
      data: [],
    });
    const orphan = setup();
    orphan.Comment.rows.push(
      { objectId: 'r', comment: 'r', url: '/o', insertedAt: new Date() },
      { objectId: 'o', comment: 'o', url: '/o', rid: 'r', pid: 'missing', insertedAt: new Date() },
    );
    await expect(orphan.core.comment.list({ path: '/o' }, context())).resolves.toHaveProperty(
      'data',
    );
    const onlyId = setup();
    onlyId.Users.rows.push({ ...guest });
    onlyId.Comment.rows.push({
      objectId: 'id-only',
      comment: 'id',
      url: '/id',
      user_id: guest.objectId,
      status: 'approved',
      insertedAt: new Date(),
    });
    await expect(onlyId.core.comment.list({ path: '/id' }, context())).resolves.toHaveProperty(
      'data.0.level',
      0,
    );
    const onlyMail = setup();
    onlyMail.Comment.rows.push({
      objectId: 'mail-only',
      comment: 'mail',
      url: '/mail',
      mail: guest.email,
      status: 'approved',
      insertedAt: new Date(),
    });
    await expect(onlyMail.core.comment.list({ path: '/mail' }, context())).resolves.toHaveProperty(
      'data.0.level',
      0,
    );
    await expect(
      env.core.comment.list({ path: '/post', sortBy: 'bad' as 'like_desc' }, context()),
    ).rejects.toThrow();
    await expect(env.core.comment.listRecent({ count: 3 }, context())).resolves.toHaveLength(2);
    await expect(env.core.comment.listRecent({ count: 3 }, context(guest))).resolves.toHaveLength(
      3,
    );
    await expect(orphan.core.comment.listRecent({ count: 3 }, context())).resolves.toHaveLength(2);
    await expect(
      env.core.comment.listForAdmin(
        { owner: 'mine', status: 'approved', keyword: 'root' },
        context(administrator),
      ),
    ).resolves.toMatchObject({ spamCount: 1, waitingCount: 1 });
    await expect(
      env.core.comment.listForAdmin({ status: 'spam' }, context(administrator)),
    ).resolves.toHaveProperty('data');
    await expect(env.core.comment.listForAdmin({}, context(administrator))).resolves.toHaveProperty(
      'data',
    );
    await expect(env.core.comment.listForAdmin({}, context(guest))).rejects.toThrow();
    await expect(env.core.comment.count({}, context())).resolves.toBe(2);
    await expect(env.core.comment.count({ url: ['/post'] }, context())).resolves.toStrictEqual([2]);
    await expect(
      env.core.comment.count({ url: ['/post'] }, context(undefined, true)),
    ).resolves.toBe(2);
    await expect(
      env.core.comment.count({ url: ['/post', '/missing'] }, context()),
    ).resolves.toStrictEqual([2, 0]);
    await expect(env.core.comment.count({ url: '/post' }, context(guest))).resolves.toStrictEqual([
      3,
    ]);
  });

  it('covers comment creation filters and effects', async () => {
    const env = setup();
    env.Users.rows.push({ ...guest }, { ...administrator });
    await expect(env.core.comment.create({ comment: '', url: '/' }, context())).rejects.toThrow();
    const forced = setup({ config: { forceLogin: true } });
    await expect(
      forced.core.comment.create({ comment: 'x', url: '/' }, context()),
    ).rejects.toThrow();
    env.services.captcha.verify.mockResolvedValueOnce(false);
    await expect(env.core.comment.create({ comment: 'x', url: '/' }, context())).rejects.toThrow();
    const denied = setup({ config: { disallowIPList: ['127.0.0.1'] } });
    await expect(
      denied.core.comment.create({ comment: 'x', url: '/' }, context()),
    ).rejects.toThrow();

    env.Comment.rows.push({
      objectId: 'duplicate',
      comment: 'same',
      url: '/',
      insertedAt: new Date(),
      ip: 'other',
    });
    await expect(
      env.core.comment.create({ comment: 'same', url: '/' }, context()),
    ).rejects.toThrow();
    env.Comment.rows.length = 0;
    env.Comment.rows.push({
      objectId: 'recent',
      comment: 'other',
      url: '/',
      insertedAt: new Date('2026-01-01T00:00:00Z'),
      ip: '127.0.0.1',
    });
    await expect(
      env.core.comment.create({ comment: 'new', url: '/' }, context()),
    ).rejects.toThrow();
    env.Comment.rows.length = 0;

    env.services.spam.check.mockResolvedValueOnce(true);
    await env.core.comment.create({ comment: 'spam', url: '/' }, context());
    expect(env.Comment.rows[0].status).toBe('spam');
    expect(env.services.notification.send).not.toHaveBeenCalled();
    const words = setup({ config: { forbiddenWords: ['bad'] } });
    await words.core.comment.create({ comment: 'bad content', url: '/' }, context());
    expect(words.Comment.rows[0].status).toBe('spam');

    const approved = setup({ hooks: { preSave: [hookMock()], postSave: hookMock() } });
    const saved = await approved.core.comment.create(
      {
        comment: 'hello',
        url: '/',
        pid: 'parent',
        at: 'A',
        captcha: { turnstile: 'secret' },
        ignored: 'value',
      },
      context(administrator, true),
    );
    expect(approved.Comment.rows[0]).not.toHaveProperty('captcha');
    expect(approved.Comment.rows[0]).not.toHaveProperty('ignored');
    expect(saved.comment).toContain('<p>');
    expect(approved.services.webhook.emit).toHaveBeenCalled();
    expect(approved.services.notification.send).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'administrator' }),
      undefined,
    );
    const noIp = context();
    noIp.ip = undefined;
    await approved.core.comment.create(
      { comment: 'no ip', url: '/', pid: 'missing' },
      { ...noIp, state: { ...noIp.state, deprecated: true } },
    );
    const audited = setup({ config: { audit: true } });
    await audited.core.comment.create({ comment: 'audit', url: '/' }, context());
    expect(audited.Comment.rows[0].status).toBe('waiting');
    const rejected = setup({ hooks: { preSave: hookMock('no') } });
    await expect(
      rejected.core.comment.create({ comment: 'hello', url: '/' }, context(administrator)),
    ).rejects.toThrow();
  });

  it('covers updates, likes and removals', async () => {
    const env = setup({
      hooks: {
        preUpdate: hookMock(),
        postUpdate: hookMock(),
        preDelete: hookMock(),
        postDelete: hookMock(),
      },
    });
    seed(env);
    await expect(
      env.core.comment.update({ objectId: 'none', data: { comment: 'x' } }, context(guest)),
    ).resolves.toBeUndefined();
    await expect(
      env.core.comment.update(
        { objectId: 'root', data: { comment: 'x' } },
        context({ ...guest, objectId: 'other' }),
      ),
    ).rejects.toThrow();
    await expect(
      env.core.comment.update({ objectId: 'root', data: { comment: 'x' } }, context()),
    ).rejects.toThrow();
    await env.core.comment.update({ objectId: 'root', data: { like: true } }, context());
    expect(env.Comment.rows[0].like).toBe(3);
    await env.core.comment.update({ objectId: 'root', data: { like: false } }, context(guest));
    expect(env.Comment.rows[0].like).toBe(2);
    const waiting = env.Comment.rows.find(({ objectId }) => objectId === 'waiting')!;
    waiting.pid = 'root';
    env.Comment.update.mockResolvedValueOnce([{ ...waiting, status: 'approved' }]);
    await env.core.comment.update(
      { objectId: 'waiting', data: { status: 'approved' } },
      context(administrator),
    );
    expect(env.services.notification.send).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ objectId: 'root' }),
      true,
    );
    env.Comment.update.mockResolvedValueOnce([]);
    await expect(
      env.core.comment.update(
        { objectId: 'child', data: { comment: 'x' } },
        context(administrator),
      ),
    ).resolves.toBeUndefined();
    const noParent = setup();
    noParent.Comment.rows.push({
      objectId: 'w',
      comment: 'w',
      url: '/',
      status: 'waiting',
      pid: 'missing',
      insertedAt: new Date(),
    });
    noParent.Comment.update.mockResolvedValueOnce([
      { ...noParent.Comment.rows[0], status: 'approved' },
    ]);
    await noParent.core.comment.update(
      { objectId: 'w', data: { status: 'approved' } },
      context(administrator),
    );
    const rejectUpdate = setup({ hooks: { preUpdate: hookMock('no') } });
    rejectUpdate.Comment.rows.push({
      objectId: 'c',
      comment: 'x',
      url: '/',
      insertedAt: new Date(),
      user_id: guest.objectId,
    });
    await expect(
      rejectUpdate.core.comment.update({ objectId: 'c', data: { comment: 'y' } }, context(guest)),
    ).rejects.toThrow();

    await expect(
      env.core.comment.remove({ objectId: 'root' }, context({ ...guest, objectId: 'other' })),
    ).rejects.toThrow();
    await env.core.comment.remove({ objectId: 'root' }, context(guest));
    expect(env.Comment.rows.some(({ objectId }) => objectId === 'root')).toBe(false);
    const rejectDelete = setup({ hooks: { preDelete: hookMock('no') } });
    rejectDelete.Comment.rows.push({
      objectId: 'c',
      comment: 'x',
      url: '/',
      insertedAt: new Date(),
      user_id: guest.objectId,
    });
    await expect(
      rejectDelete.core.comment.remove({ objectId: 'c' }, context(guest)),
    ).rejects.toThrow();
    env.Comment.rows.push({
      objectId: 'admin-delete',
      comment: 'x',
      url: '/',
      insertedAt: new Date(),
    });
    await env.core.comment.remove({ objectId: 'admin-delete' }, context(administrator));
  });
});
