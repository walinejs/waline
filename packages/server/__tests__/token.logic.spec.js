import { createRequire } from 'node:module';

import { beforeEach, describe, expect, it, vi } from 'vitest';

const require = createRequire(import.meta.url);

describe('token logic', () => {
  beforeEach(() => {
    global.think = {
      Logic: class {},
      isString: (value) => typeof value === 'string',
    };
  });

  it('should reject non-string email', async () => {
    const TokenLogic = require('../src/logic/token.js');
    const throwMock = vi.fn();
    const logicContext = {
      useCaptchaCheck: vi.fn().mockResolvedValue(undefined),
      post: () => ({ email: { $ne: null }, password: 'secret' }),
      ctx: {
        throw: throwMock,
      },
    };

    await TokenLogic.prototype.postAction.call(logicContext);

    expect(throwMock).toHaveBeenCalledWith(400, 'Invalid input type');
  });

  it('should reject non-string password', async () => {
    const TokenLogic = require('../src/logic/token.js');
    const throwMock = vi.fn();
    const logicContext = {
      useCaptchaCheck: vi.fn().mockResolvedValue(undefined),
      post: () => ({ email: 'admin@example.com', password: ['!=', ''] }),
      ctx: {
        throw: throwMock,
      },
    };

    await TokenLogic.prototype.postAction.call(logicContext);

    expect(throwMock).toHaveBeenCalledWith(400, 'Invalid input type');
  });

  it('should accept string email and password', async () => {
    const TokenLogic = require('../src/logic/token.js');
    const throwMock = vi.fn();
    const logicContext = {
      useCaptchaCheck: vi.fn().mockResolvedValue(undefined),
      post: () => ({ email: 'admin@example.com', password: 'secret' }),
      ctx: {
        throw: throwMock,
      },
    };

    await TokenLogic.prototype.postAction.call(logicContext);

    expect(throwMock).not.toHaveBeenCalled();
  });
});
