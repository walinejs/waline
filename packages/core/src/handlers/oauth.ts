import { WalineError } from '../error.js';
import type { OAuthAuthorizeInput, WalineContext } from '../types.js';
import { currentUser } from '../utils/auth.js';
import type { CoreRuntime } from '../utils/runtime.js';
import { requiredCapability } from '../utils/validation.js';

export const createOAuthHandler = ({ models, random, services }: CoreRuntime) => ({
  async authorize(input: OAuthAuthorizeInput, ctx: WalineContext) {
    if (
      typeof input.type !== 'string' ||
      !/^[a-z][a-z0-9-]*$/u.test(input.type) ||
      !ctx.state.oauthServices?.some(({ name }) => name === input.type)
    ) {
      throw new WalineError('OAUTH_FAILED', 400);
    }
    const oauthService = requiredCapability(services.oauth, 'oauth');
    const tokenService = requiredCapability(services.token, 'token');
    const profile = await oauthService.authorize(input, ctx);

    if (
      !profile ||
      !(
        (typeof profile.id === 'string' && profile.id.length > 0) ||
        (typeof profile.id === 'number' && Number.isSafeInteger(profile.id))
      ) ||
      ['email', 'name', 'url', 'avatar'].some(
        (key) =>
          profile[key as keyof typeof profile] !== undefined &&
          typeof profile[key as keyof typeof profile] !== 'string',
      )
    ) {
      throw new WalineError('OAUTH_FAILED', 400, undefined, profile);
    }

    const [linked] = await models.Users.select({
      [input.type]: `${profile.id}`,
    });

    if (linked) {
      return { token: await tokenService.sign(linked.objectId), user: linked };
    }

    const user = currentUser(ctx);
    if (user) {
      const update = {
        [input.type]: `${profile.id}`,
        ...(!user.avatar && profile.avatar ? { avatar: profile.avatar } : {}),
      };
      const [updated] = await models.Users.update(update, {
        objectId: user.objectId,
      });

      return { user: updated };
    }

    const count = (await models.Users.count()) as number;
    const passwordService = services.password;
    const created = await models.Users.add({
      email: profile.email,
      display_name: profile.name,
      url: profile.url,
      avatar: profile.avatar,
      [input.type]: `${profile.id}`,
      password: passwordService ? await passwordService.hash(String(random())) : undefined,
      type: count === 0 ? 'administrator' : 'guest',
    });

    return {
      token: await tokenService.sign(created.objectId),
      user: created,
    };
  },
});
