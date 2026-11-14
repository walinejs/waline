import { badRequest, unauthorized, WalineError } from '../error.js';
import type { WalineContext } from '../types.js';
import { currentUser, requireUser } from '../utils/auth.js';
import { createAvatarFormatter } from '../utils/avatar.js';
import type { CoreRuntime } from '../utils/runtime.js';
import {
  requiredCapability,
  requiredString,
  optionalString,
  emailString,
} from '../utils/validation.js';

export const createAuthHandler = (runtime: CoreRuntime) => {
  const { config, models, services } = runtime;
  const avatar = createAvatarFormatter(runtime);

  return {
    async resolveSession(input: { token?: string }, ctx: WalineContext) {
      if (!input.token) return;
      requiredString(input.token, 'token');

      const tokenService = requiredCapability(services.token, 'token');
      let id: string;

      try {
        id = requiredString(await tokenService.verify(input.token), 'tokenSubject');
      } catch {
        return;
      }

      const [account] = await models.Users.select(
        {
          objectId: id,
          type: ['!=', 'banned'],
        },
        {
          field: [
            'id',
            'email',
            'url',
            'display_name',
            'type',
            'avatar',
            '2fa',
            'label',
            ...(ctx.state.oauthServices?.map(({ name }) => name) ?? []),
          ],
        },
      );

      if (!account) return;

      return { ...account, avatar: await avatar(account), token: input.token };
    },

    async login(input: { email: string; password: string; code?: string }, _ctx: WalineContext) {
      const email = emailString(input.email);
      requiredString(input.password, 'password');
      optionalString(input.code, 'code');
      const passwordService = requiredCapability(services.password, 'password');
      const tokenService = requiredCapability(services.token, 'token');
      const [account] = await models.Users.select({ email });

      if (
        !account ||
        account.type.startsWith('verify:') ||
        account.type === 'banned' ||
        !account.password ||
        !(await passwordService.verify(input.password, account.password))
      ) {
        throw new WalineError('LOGIN_FAILED', 400);
      }

      if (account['2fa']) {
        const twoFactor = requiredCapability(services.twoFactor, 'twoFactor');
        if (!input.code || !(await twoFactor.verify(account['2fa'], input.code))) {
          throw new WalineError('TWO_FACTOR_AUTH_ERROR', 400);
        }
      }

      return {
        ...account,
        password: undefined,
        avatar: await avatar(account),
        token: await tokenService.sign(account.objectId),
      };
    },

    async getTwoFactorStatus(input: { email?: string }, ctx: WalineContext) {
      if (!currentUser(ctx) && !input.email) unauthorized();

      const email = requiredString(input.email ?? currentUser(ctx)?.email, 'email');
      const [account] = await models.Users.select({ email });

      return { enable: Boolean(account?.['2fa']) };
    },

    async createTwoFactorSecret(_input: object, ctx: WalineContext) {
      const user = requireUser(ctx);
      const twoFactor = requiredCapability(services.twoFactor, 'twoFactor');

      if (user['2fa'] && user['2fa'].length === 32) {
        return {
          otpauth_url: `otpauth://totp/waline_${user.objectId}?secret=${user['2fa']}`,
          secret: user['2fa'],
        };
      }

      return twoFactor.create(user.objectId);
    },

    async enableTwoFactor(input: { secret: string; code: string }, ctx: WalineContext) {
      const user = requireUser(ctx);
      requiredString(input.secret, 'secret');
      requiredString(input.code, 'code');
      if (!/^\d{6}$/u.test(input.code)) badRequest({ field: 'code', rule: 'sixDigits' });
      const twoFactor = requiredCapability(services.twoFactor, 'twoFactor');

      if (!(await twoFactor.verify(input.secret, input.code))) {
        throw new WalineError('TWO_FACTOR_AUTH_ERROR', 400, 'TWO_FACTOR_AUTH_ERROR_DETAIL');
      }

      await models.Users.update({ '2fa': input.secret }, { objectId: user.objectId });
    },

    async requestPasswordReset(input: { email: string }, _ctx: WalineContext) {
      let baseUrl: URL;
      try {
        baseUrl = new URL(config.serverUrl ?? '');
        if (
          !['http:', 'https:'].includes(baseUrl.protocol) ||
          baseUrl.username ||
          baseUrl.password
        ) {
          throw new Error('Invalid canonical URL');
        }
      } catch {
        throw new WalineError('SERVER_URL_REQUIRED', 400);
      }
      baseUrl.search = '';
      baseUrl.hash = '';
      const [account] = await models.Users.select({
        email: requiredString(input.email, 'email'),
      });

      if (!account) throw new WalineError('USER_NOT_EXIST', 400);

      const notification = requiredCapability(services.notification, 'notification');
      const reset = requiredCapability(
        notification.passwordReset?.bind(notification),
        'notification.passwordReset',
      );
      const tokenService = requiredCapability(services.token, 'token');
      const profileUrl = `${baseUrl.href.replace(/\/$/u, '')}/ui/profile?token=${encodeURIComponent(await tokenService.sign(account.objectId))}`;

      await reset(account, profileUrl);
    },
  };
};
