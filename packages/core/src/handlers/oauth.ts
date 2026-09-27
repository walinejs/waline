import { WalineError } from '../error.js';
import type { OAuthAuthorizeInput, WalineContext, WalineUser, Where } from '../types.js';
import { currentUser } from '../utils/auth.js';
import type { CoreRuntime } from '../utils/runtime.js';
import { requiredCapability } from '../utils/validation.js';

export const createOAuthHandler = ({ models, random, services }: CoreRuntime) => ({
  async authorize(input: OAuthAuthorizeInput, ctx: WalineContext) {
    const oauthService = requiredCapability(services.oauth, 'oauth');
    const tokenService = requiredCapability(services.token, 'token');
    const profile = await oauthService.authorize(input, ctx);

    if (!profile?.id) {
      throw new WalineError('OAUTH_FAILED', 400, undefined, profile);
    }

    const [linked] = await models.Users.select({
      [input.type]: profile.id,
    } as Where<WalineUser>);

    if (linked) {
      return { token: await tokenService.sign(linked.objectId), user: linked };
    }

    const user = currentUser(ctx);
    if (user) {
      const update = {
        [input.type]: profile.id,
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
      [input.type]: profile.id,
      password: passwordService ? await passwordService.hash(String(random())) : undefined,
      type: count === 0 ? 'administrator' : 'guest',
    });

    return {
      token: await tokenService.sign(created.objectId),
      user: created,
    };
  },
});
