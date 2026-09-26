import { describe, expect, it, vi } from 'vitest';

import {
  getArticleCounters,
  importDatabaseItem,
  login,
  updateArticleCounter,
} from '../src/index.js';

describe('@waline/core actions', () => {
  it('keeps article count response compatibility for multiple paths', async () => {
    const counters = { select: vi.fn().mockResolvedValue([{ url: '/one', time: 3 }]) };

    await expect(
      getArticleCounters({ path: ['/one', '/two'], type: ['time'] }, { counters }),
    ).resolves.toStrictEqual([{ time: 3 }, { time: 0 }]);
  });

  it('updates a counter through its repository port', async () => {
    const counters = {
      select: vi.fn().mockResolvedValue([{ objectId: '1', time: 2 }]),
      update: vi.fn().mockResolvedValue([{ time: 3 }]),
    };

    await expect(
      updateArticleCounter({ path: '/one' }, { counters, clock: { now: () => 0 } }),
    ).resolves.toStrictEqual([{ time: 3 }]);
    expect(counters.update).toHaveBeenCalledTimes(1);
  });

  it('does not allow arbitrary database repositories', async () => {
    await expect(
      importDatabaseItem({ table: 'Unexpected', item: {}, storage: 'sqlite' }, {}),
    ).rejects.toThrow('Unsupported table');
  });

  it('does not authenticate a two-factor user without a valid code', async () => {
    const users = {
      select: vi
        .fn()
        .mockResolvedValue([
          { objectId: 'user', type: 'guest', password: 'hash', '2fa': 'secret' },
        ]),
    };
    const ports = {
      avatar: { stringify: vi.fn() },
      config: {},
      passwordHasher: { verify: vi.fn().mockReturnValue(true) },
      tokens: { sign: vi.fn() },
      twoFactor: { verify: vi.fn().mockReturnValue(false) },
      users,
    };

    await expect(
      login({ email: 'test@example.com', password: 'password' }, ports),
    ).resolves.toBeNull();
  });
});
