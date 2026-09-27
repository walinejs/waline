import { forbidden, WalineError } from '../error.js';
import type { GroupedCount, WalineContext, WalineUser } from '../types.js';
import { isAdmin, requireAdmin, requireUser } from '../utils/auth.js';
import { createAvatarFormatter } from '../utils/avatar.js';
import type { CoreRuntime } from '../utils/runtime.js';
import { levelFor, positiveInt, requiredCapability, requiredString } from '../utils/validation.js';

export const createUserHandler = (runtime: CoreRuntime) => {
  const { config, models, services } = runtime;
  const avatar = createAvatarFormatter(runtime);

  return {
    async get(input: { email: string }, ctx: WalineContext) {
      requireAdmin(ctx);

      return (
        await models.Users.select({
          email: requiredString(input.email, 'email'),
        })
      )[0];
    },

    async list(input: { page?: number; pageSize?: number }, ctx: WalineContext) {
      if (!isAdmin(ctx)) {
        const pageSize = positiveInt(input.pageSize, 20, 50);
        const counts = (await models.Comment.count(
          { status: ['NOT IN', ['waiting', 'spam']] },
          { group: ['user_id', 'mail'] },
        )) as GroupedCount[];
        counts.sort((a, b) => b.count - a.count);
        const top = counts.slice(0, pageSize);
        const ids = top
          .map((item) => item.user_id)
          .filter((id): id is string => typeof id === 'string');
        const accounts = ids.length ? await models.Users.select({ objectId: ['IN', ids] }) : [];
        const result: Record<string, unknown>[] = [];

        for (const item of top) {
          const account = accounts.find(({ objectId }) => objectId === item.user_id);
          const entry: Record<string, unknown> = { count: item.count };

          if (config.levels) entry.level = levelFor(config.levels, item.count);
          if (account) {
            Object.assign(entry, {
              nick: account.display_name,
              link: account.url,
              avatar: await avatar(account),
              label: account.label,
            });
          } else if (typeof item.mail === 'string') {
            const [lastComment] = await models.Comment.select({ mail: item.mail }, { limit: 1 });
            if (!lastComment) continue;
            Object.assign(entry, {
              nick: lastComment.nick,
              link: lastComment.link,
              avatar: await avatar(lastComment),
            });
          }
          result.push(entry);
        }

        return result;
      }

      const page = positiveInt(input.page, 1);
      const pageSize = positiveInt(input.pageSize, 10, 100);
      const count = (await models.Users.count()) as number;
      const data = await models.Users.select(
        {},
        {
          desc: 'createdAt',
          limit: pageSize,
          offset: (page - 1) * pageSize,
        },
      );

      return {
        page,
        totalPages: Math.ceil(count / pageSize),
        pageSize,
        data: await Promise.all(
          data.map(async (item) => ({ ...item, avatar: await avatar(item) })),
        ),
      };
    },

    async register(
      input: Partial<WalineUser> & { email: string; password: string },
      ctx: WalineContext,
    ) {
      const email = requiredString(input.email, 'email');
      const passwordService = requiredCapability(services.password, 'password');
      const existing = await models.Users.select({ email });

      if (existing.some(({ type }) => ['administrator', 'guest'].includes(type))) {
        throw new WalineError('USER_EXIST', 400, 'USER_EXIST');
      }

      const count = (await models.Users.count()) as number;
      const data: Partial<WalineUser> = {
        ...input,
        password: await passwordService.hash(input.password),
        type: count === 0 ? 'administrator' : (config.normalUserType ?? 'guest'),
      };
      const saved = existing.length
        ? (await models.Users.update(data, { email }))[0]
        : await models.Users.add(data);

      if (
        saved.type.startsWith('verify:') &&
        services.notification?.verification &&
        ctx.serverUrl
      ) {
        await services.notification.verification(saved, ctx.serverUrl);
      }

      return { verify: saved.type.startsWith('verify:') };
    },

    async update(input: { objectId?: string; data: Partial<WalineUser> }, ctx: WalineContext) {
      const user = requireUser(ctx);
      const objectId = input.objectId ?? user.objectId;

      if (objectId !== user.objectId && !isAdmin(ctx)) forbidden();

      const allowed = [
        'display_name',
        'url',
        'avatar',
        'password',
        'label',
        'email',
        '2fa',
        ...(ctx.state.oauthServices ?? []).map(({ name }) => name),
      ];
      if (isAdmin(ctx) && input.objectId) allowed.push('type');

      const data = Object.fromEntries(
        Object.entries(input.data).filter(
          ([key, value]) => allowed.includes(key) && typeof value === 'string',
        ),
      ) as Partial<WalineUser>;

      if (data.email) {
        const duplicate = await models.Users.select({
          email: data.email,
          objectId: ['!=', user.objectId],
        });
        if (duplicate.length) throw new WalineError('USER_EXIST', 400);
      }

      if (data.password) {
        const passwordService = requiredCapability(services.password, 'password');
        data.password = await passwordService.hash(data.password);
      }

      if (!Object.keys(data).length) return undefined;

      return (await models.Users.update(data, { objectId }))[0];
    },

    async remove(input: { objectId: string }, ctx: WalineContext) {
      const user = requireAdmin(ctx);
      if (user.objectId === input.objectId) forbidden();

      const [target] = await models.Users.select({ objectId: input.objectId });
      if (!target) throw new WalineError('USER_NOT_EXIST', 400);

      if (target.type.startsWith('verify:')) {
        await models.Users.delete({ objectId: input.objectId });
      } else {
        await models.Users.update({ type: 'banned' }, { objectId: input.objectId });
      }
    },
  };
};
