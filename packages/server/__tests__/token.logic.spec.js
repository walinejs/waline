import { createRequire } from 'node:module';

import { describe, expect, it, vi } from 'vitest';

const require = createRequire(import.meta.url);

global.think = {
  Logic: class Logic {},
};
const TokenLogic = require('../src/logic/token.js');

describe('token logic', () => {
  it('should define thinkjs rules for email and password', async () => {
    const logicContext = {
      useCaptchaCheck: vi.fn().mockResolvedValue(undefined),
    };

    await TokenLogic.prototype.postAction.call(logicContext);

    expect(logicContext.rules).toStrictEqual({
      email: {
        required: true,
        string: true,
        email: true,
      },
      password: {
        required: true,
        string: true,
      },
    });
  });

  it('should still run captcha check', async () => {
    const useCaptchaCheck = vi.fn().mockResolvedValue(undefined);
    const logicContext = {
      useCaptchaCheck,
    };

    await TokenLogic.prototype.postAction.call(logicContext);

    expect(useCaptchaCheck).toHaveBeenCalledTimes(1);
  });
});
