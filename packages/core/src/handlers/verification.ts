import { WalineError } from '../error.js';
import type { WalineContext } from '../types.js';
import type { CoreRuntime } from '../utils/runtime.js';
import { requiredString } from '../utils/validation.js';

export const createVerificationHandler = ({ models, now }: CoreRuntime) => ({
  async verifyEmail(input: { email: string; token: string }, _ctx: WalineContext) {
    const [account] = await models.Users.select({
      email: requiredString(input.email, 'email'),
    });

    if (!account) {
      throw new WalineError('USER_NOT_EXIST', 400, 'USER_NOT_EXIST');
    }

    const match = account.type.match(/^verify:(?<code>\d{4}):(?<timestamp>\d+)$/iu);
    if (!match) {
      throw new WalineError('USER_REGISTERED', 400, 'USER_REGISTERED');
    }

    if (input.token === match.groups?.code && now().getTime() < Number(match.groups.timestamp)) {
      await models.Users.update({ type: 'guest' }, { email: account.email });
      return;
    }

    throw new WalineError('TOKEN_EXPIRED', 400, 'TOKEN_EXPIRED');
  },
});
