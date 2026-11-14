/* oxlint-disable vitest/require-mock-type-parameters */
import { describe, expect, it, vi } from 'vitest';

import { createWalineCore } from '../src/index.js';
import type { WalineContext, WalineCore } from '../src/index.js';
import { positiveInt, stringList } from '../src/utils/validation.js';

const admin: WalineContext = {
  headers: {},
  state: { userInfo: { objectId: 'admin', email: 'admin@example.com', type: 'administrator' } },
};
const anonymous: WalineContext = { headers: {}, state: {} };
const setup = () => {
  const model = {
    select: vi.fn(async () => []),
    count: vi.fn(async () => 0),
    add: vi.fn(async (data) => ({ objectId: 'new', ...data })),
    update: vi.fn(async () => []),
    delete: vi.fn(async () => undefined),
  };
  const services = {
    password: { hash: vi.fn(async () => 'hash'), verify: vi.fn(async () => false) },
    token: { verify: vi.fn(async () => ['IN', []] as any), sign: vi.fn(async () => 'token') },
    oauth: { authorize: vi.fn(async () => ({ id: 'one', email: 'user@example.com' })) },
    twoFactor: { create: vi.fn(), verify: vi.fn(async () => true) },
  };
  const core = createWalineCore({
    models: { Comment: model, Counter: model, Users: model, get: () => model },
    services,
  });
  return { core, model, services };
};

const cases: { name: string; call: (core: WalineCore) => Promise<unknown> }[] = [
  {
    name: 'counter path elements',
    call: (core) => core.counter.get({ path: [['exp', '1']] as any }, anonymous),
  },
  {
    name: 'counter type arrays',
    call: (core) => core.counter.update({ path: '/', type: ['time'] as any }, anonymous),
  },
  {
    name: 'counter reserved column',
    call: (core) => core.counter.update({ path: '/', type: 'URL' }, anonymous),
  },
  {
    name: 'counter prototype key',
    call: (core) => core.counter.get({ path: '/', type: '__proto__' }, anonymous),
  },
  {
    name: 'comment count elements',
    call: (core) => core.comment.count({ url: [{ $ne: null }] as any }, anonymous),
  },
  {
    name: 'admin status filter',
    call: (core) => core.comment.listForAdmin({ status: ['exp', '1'] as any }, admin),
  },
  {
    name: 'comment update body',
    call: (core) => core.comment.update({ objectId: 'one', data: [] as any }, admin),
  },
  {
    name: 'login email format',
    call: (core) => core.auth.login({ email: 'not-an-email', password: 'pw' }, anonymous),
  },
  {
    name: 'short two-factor code',
    call: (core) => core.auth.enableTwoFactor({ secret: 'secret', code: '123' }, admin),
  },
  {
    name: 'registration password',
    call: (core) =>
      core.user.register({ email: 'user@example.com', password: [] as any }, anonymous),
  },
  {
    name: 'registration email',
    call: (core) => core.user.register({ email: 'not-an-email', password: 'pw' }, anonymous),
  },
  {
    name: 'profile email',
    call: (core) => core.user.update({ data: { email: 'not-an-email' } }, admin),
  },
  {
    name: 'profile id',
    call: (core) => core.user.update({ objectId: ['IN', []] as any, data: {} }, admin),
  },
  { name: 'profile body', call: (core) => core.user.update({ data: null as any }, admin) },
  {
    name: 'user deletion id',
    call: (core) => core.user.remove({ objectId: ['IN', []] as any }, admin),
  },
  { name: 'database table', call: (core) => core.database.clear({ table: [] as any }, admin) },
  {
    name: 'database update id',
    call: (core) =>
      core.database.update({ table: 'Users', objectId: ['IN', []] as any, data: {} }, admin),
  },
  {
    name: 'database import body',
    call: (core) => core.database.import({ table: 'Users', data: [] as any }, admin),
  },
  {
    name: 'two-factor secret',
    call: (core) => core.auth.enableTwoFactor({ secret: [] as any, code: '123456' }, admin),
  },
  {
    name: 'two-factor code',
    call: (core) => core.auth.enableTwoFactor({ secret: 'secret', code: [] as any }, admin),
  },
  {
    name: 'oauth code',
    call: (core) => core.oauth.authorize({ type: 'github', code: [] as any }, anonymous),
  },
  {
    name: 'oauth state',
    call: (core) =>
      core.oauth.authorize({ type: 'github', code: 'code', state: [] as any }, anonymous),
  },
  {
    name: 'verification token',
    call: (core) =>
      core.verification.verifyEmail({ email: 'user@example.com', token: [] as any }, anonymous),
  },
];

describe('core validation without ThinkJS logic', () => {
  it.each(cases)('rejects invalid $name before storage', async ({ call }) => {
    const { core, model, services } = setup();
    await expect(call(core)).rejects.toMatchObject({ code: 'VALIDATION_ERROR', status: 400 });
    expect(model.select).not.toHaveBeenCalled();
    expect(model.add).not.toHaveBeenCalled();
    expect(model.update).not.toHaveBeenCalled();
    expect(model.delete).not.toHaveBeenCalled();
    expect(services.password.hash).not.toHaveBeenCalled();
    expect(services.oauth.authorize).not.toHaveBeenCalled();
    expect(services.twoFactor.verify).not.toHaveBeenCalled();
  });

  it('rejects non-scalar verified token subjects without querying users', async () => {
    const { core, model } = setup();
    await expect(core.auth.resolveSession({ token: 'signed' }, anonymous)).resolves.toBeUndefined();
    expect(model.select).not.toHaveBeenCalled();
  });

  it('preserves comma-separated paths, custom counters and defaults', async () => {
    const { core, model } = setup();
    await expect(core.counter.get({ path: '/a,/b' }, anonymous)).resolves.toStrictEqual([
      { time: 0 },
      { time: 0 },
    ]);
    await expect(
      core.counter.update({ path: '/a', type: 'custom_count' }, anonymous),
    ).resolves.toStrictEqual([{ custom_count: 1 }]);
    expect(model.add).toHaveBeenCalledWith(
      { url: '/a', custom_count: 1 },
      { access: { read: true, write: true } },
    );
    expect(stringList(['/a', '/b'], 'url')).toStrictEqual(['/a', '/b']);
  });

  it.each([true, false, [1], { valueOf: () => 1 }, null, '1e2', 1.5, 0])(
    'rejects non-integer pagination input %#',
    (value) => {
      expect(() => positiveInt(value, 10)).toThrow('VALIDATION_ERROR');
    },
  );

  it('preserves numeric query strings and bounds', () => {
    expect(positiveInt('2', 10, 50)).toBe(2);
    expect(positiveInt(undefined, 10, 50)).toBe(10);
    expect(() => positiveInt('51', 10, 50)).toThrow('VALIDATION_ERROR');
  });
});

describe('core permissions without ThinkJS logic', () => {
  it.each(['export', 'clear'] as const)('rejects anonymous database %s', async (action) => {
    const { core, model } = setup();
    await expect(core.database[action]({ table: 'Users' }, anonymous)).rejects.toMatchObject({
      status: 401,
    });
    expect(model.select).not.toHaveBeenCalled();
    expect(model.delete).not.toHaveBeenCalled();
  });

  it('rejects user management by a guest', async () => {
    const { core, model } = setup();
    const guest: WalineContext = {
      headers: {},
      state: { userInfo: { objectId: 'guest', email: 'guest@example.com', type: 'guest' } },
    };
    await expect(
      core.user.update({ objectId: 'other', data: { display_name: 'Changed' } }, guest),
    ).rejects.toMatchObject({ status: 403 });
    await expect(core.user.remove({ objectId: 'other' }, guest)).rejects.toMatchObject({
      status: 403,
    });
    await expect(core.comment.listForAdmin({}, guest)).rejects.toMatchObject({ status: 403 });
    expect(model.select).not.toHaveBeenCalled();
    expect(model.update).not.toHaveBeenCalled();
  });
});

describe('numeric storage user IDs', () => {
  it('preserves the authenticated numeric ID for profile, password and unlink updates', async () => {
    const { core, model, services } = setup();
    const ctx: WalineContext = {
      headers: {},
      state: {
        userInfo: { objectId: 42 as any, email: 'user@example.com', type: 'guest' },
        oauthServices: [{ name: 'github' }],
      },
    };
    await core.user.update(
      {
        data: {
          display_name: 'Updated',
          avatar: 'https://example.com/avatar',
          password: 'new-password',
          github: '',
        },
      },
      ctx,
    );
    expect(model.update).toHaveBeenCalledWith(
      {
        display_name: 'Updated',
        avatar: 'https://example.com/avatar',
        password: 'hash',
        github: '',
      },
      { objectId: 42 },
    );
    expect(services.password.hash).toHaveBeenCalledWith('new-password');
  });
});
