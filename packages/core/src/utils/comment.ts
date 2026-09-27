import type { WalineComment, WalineContext, WalineUser } from '../types.js';
import { currentUser, isAdmin } from './auth.js';
import { createAvatarFormatter } from './avatar.js';
import type { CoreRuntime } from './runtime.js';

export const createCommentFormatter = (runtime: CoreRuntime) => {
  const { config, services } = runtime;
  const avatar = createAvatarFormatter(runtime);

  return async (
    source: WalineComment,
    ctx: WalineContext,
    users: WalineUser[] = [],
  ): Promise<Partial<WalineComment> & Record<string, unknown>> => {
    const { ua: uaText, ip, ...rest } = source;
    const result: Partial<WalineComment> & Record<string, unknown> = {
      ...rest,
      ua: uaText,
      ip,
    };
    const author = users.find((item) => item.objectId === source.user_id);

    if (author) {
      result.nick = author.display_name;
      result.mail = author.email;
      result.link = author.url;
      result.type = author.type;
      result.label = author.label;
    }

    const parsed = services.userAgent?.parse(uaText);

    if (!config.disableUserAgent && parsed) {
      result.browser = `${parsed.browser?.name ?? ''}${(parsed.browser?.version ?? '')
        .split('.')
        .slice(0, 2)
        .join('.')}`;
      result.os = [parsed.os?.name, parsed.os?.version].filter(Boolean).join(' ');
    }

    result.avatar = await avatar(author ?? source);
    if (currentUser(ctx)) result.orig = result.comment;
    if (!isAdmin(ctx)) delete result.mail;

    if ((isAdmin(ctx) || !config.disableRegion) && ip && services.region) {
      result.addr = await services.region.lookup(ip, isAdmin(ctx) ? 3 : 1);
    }

    if (services.markdown) {
      result.comment = await services.markdown.render(result.comment as string);
    }

    result.like = Number(result.like) || 0;
    if (typeof result.sticky === 'string') result.sticky = Boolean(Number(result.sticky));
    result.time = new Date(result.insertedAt as Date | string).getTime();
    if (!ctx.state.deprecated) delete result.insertedAt;
    delete result.createdAt;
    delete result.updatedAt;
    if (!isAdmin(ctx)) delete result.ip;

    return result;
  };
};
