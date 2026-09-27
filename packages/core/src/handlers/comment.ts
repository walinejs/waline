import { badRequest, forbidden, unauthorized, WalineError } from '../error.js';
import type { GroupedCount, WalineComment, WalineContext, Where } from '../types.js';
import { currentUser, isAdmin, requireAdmin, requireUser } from '../utils/auth.js';
import { createCommentFormatter } from '../utils/comment.js';
import type { CoreRuntime } from '../utils/runtime.js';
import { levelFor, positiveInt, requiredString } from '../utils/validation.js';

export const createCommentHandler = (runtime: CoreRuntime) => {
  const { config, hook, logger, models, now, random, services } = runtime;
  const formatComment = createCommentFormatter(runtime);

  return {
    async list(
      input: {
        path: string;
        page?: number;
        pageSize?: number;
        sortBy?: 'insertedAt_desc' | 'insertedAt_asc' | 'like_desc';
      },
      ctx: WalineContext,
    ) {
      const path = requiredString(input.path, 'path');
      const page = positiveInt(input.page, 1);
      const pageSize = positiveInt(input.pageSize, 10, 100);
      const sortBy = input.sortBy ?? 'insertedAt_desc';

      if (!['insertedAt_desc', 'insertedAt_asc', 'like_desc'].includes(sortBy)) {
        badRequest({ field: 'sortBy' });
      }

      const [sortField, direction] = sortBy.split('_') as ['insertedAt' | 'like', 'asc' | 'desc'];
      const where: Where<WalineComment> = { url: path };
      const current = currentUser(ctx);

      if (!current) where.status = ['NOT IN', ['waiting', 'spam']];
      else if (!isAdmin(ctx)) {
        where._complex = {
          _logic: 'or',
          status: ['NOT IN', ['waiting', 'spam']],
          user_id: current.objectId,
        };
      }

      const rootWhere = { ...where, rid: undefined };
      const [total, roots, rootCount] = await Promise.all([
        models.Comment.count(where) as Promise<number>,
        models.Comment.select(rootWhere, {
          limit: pageSize,
          offset: Math.max((page - 1) * pageSize, 0),
          order: [
            { field: 'sticky', direction: 'desc', nulls: 'last' },
            { field: sortField, direction },
            { field: 'objectId', direction },
          ],
        }),
        models.Comment.count(rootWhere) as Promise<number>,
      ]);
      const rootIds = roots.map(({ objectId }) => objectId);
      const children = rootIds.length
        ? await models.Comment.select({ ...where, rid: ['IN', rootIds] })
        : [];
      const ids = [
        ...new Set(
          [...roots, ...children]
            .map(({ user_id }) => user_id)
            .filter((id): id is string => Boolean(id)),
        ),
      ];
      const users = ids.length ? await models.Users.select({ objectId: ['IN', ids] }) : [];
      const comments = [...roots, ...children];

      if (Array.isArray(config.levels)) {
        const mails = [...new Set(comments.map(({ mail }) => mail).filter(Boolean))] as string[];
        const countWhere: Where<WalineComment> = { status: ['NOT IN', ['waiting', 'spam']] };

        if (ids.length || mails.length) {
          countWhere._complex = { _logic: 'or' };
          if (ids.length) countWhere._complex.user_id = ['IN', ids];
          if (mails.length) countWhere._complex.mail = ['IN', mails];
        }

        const counts = (await models.Comment.count(countWhere, {
          group: ['user_id', 'mail'],
        })) as GroupedCount[];

        for (const comment of comments) {
          const count = counts.find((item) =>
            comment.user_id ? item.user_id === comment.user_id : item.mail === comment.mail,
          )?.count;
          comment.level = levelFor(config.levels, count);
        }
      }

      const data = await Promise.all(
        roots.map(async (root) => {
          const item = await formatComment(root, ctx, users);
          const formattedChildren = await Promise.all(
            children
              .filter(({ rid }) => rid === root.objectId)
              .map((child) => formatComment(child, ctx, users)),
          );
          item.children = formattedChildren;
          const map = new Map<string, Record<string, unknown>>([
            [item.objectId as string, item],
            ...formattedChildren.map((child) => [child.objectId as string, child] as const),
          ]);

          for (const child of formattedChildren) {
            const parent = map.get(child.pid as string);
            if (parent) {
              child.reply_user = {
                nick: parent.nick,
                link: parent.link,
                avatar: parent.avatar,
              };
            }
          }

          return item;
        }),
      );

      return {
        page,
        totalPages: Math.ceil(rootCount / pageSize),
        pageSize,
        count: total,
        data,
      };
    },

    async listRecent(input: { count?: number }, ctx: WalineContext) {
      const count = positiveInt(input.count, 10, 50);
      const current = currentUser(ctx);
      const where: Where<WalineComment> = current
        ? {
            _complex: {
              _logic: 'or',
              status: ['NOT IN', ['waiting', 'spam']],
              user_id: current.objectId,
            },
          }
        : { status: ['NOT IN', ['waiting', 'spam']] };
      const rows = await models.Comment.select(where, {
        desc: 'insertedAt',
        limit: count,
      });
      const ids = [
        ...new Set(rows.map(({ user_id }) => user_id).filter((id): id is string => Boolean(id))),
      ];
      const users = ids.length ? await models.Users.select({ objectId: ['IN', ids] }) : [];

      return Promise.all(rows.map((item) => formatComment(item, ctx, users)));
    },

    async listForAdmin(
      input: {
        page?: number;
        pageSize?: number;
        owner?: string;
        status?: string;
        keyword?: string;
      },
      ctx: WalineContext,
    ) {
      const current = requireAdmin(ctx);
      const page = positiveInt(input.page, 1);
      const pageSize = positiveInt(input.pageSize, 10, 100);
      const where: Where<WalineComment> = {};

      if (input.owner === 'mine') where.mail = current.email;
      if (input.status) {
        where.status = input.status === 'approved' ? ['NOT IN', ['waiting', 'spam']] : input.status;
      }
      if (input.keyword) where.comment = ['LIKE', `%${input.keyword}%`];

      const [count, spamCount, waitingCount, rows] = await Promise.all([
        models.Comment.count(where) as Promise<number>,
        models.Comment.count({ status: 'spam' }) as Promise<number>,
        models.Comment.count({ status: 'waiting' }) as Promise<number>,
        models.Comment.select(where, {
          desc: 'insertedAt',
          limit: pageSize,
          offset: Math.max((page - 1) * pageSize, 0),
        }),
      ]);

      return {
        page,
        totalPages: Math.ceil(count / pageSize),
        pageSize,
        spamCount,
        waitingCount,
        data: await Promise.all(rows.map((item) => formatComment(item, ctx))),
      };
    },

    async count(input: { url?: string | string[] }, ctx: WalineContext) {
      const urls = Array.isArray(input.url) ? input.url : input.url ? [input.url] : [];
      const where: Where<WalineComment> = urls.length ? { url: ['IN', urls] } : {};
      const current = currentUser(ctx);

      if (!current) where.status = ['NOT IN', ['waiting', 'spam']];
      else {
        where._complex = {
          _logic: 'or',
          status: ['NOT IN', ['waiting', 'spam']],
          user_id: current.objectId,
        };
      }

      if (urls.length === 1) {
        const count = (await models.Comment.count(where)) as number;
        return ctx.state.deprecated ? count : [count];
      }
      if (urls.length > 1) {
        const counts = (await models.Comment.count(where, {
          group: ['url'],
        })) as GroupedCount[];
        const map = new Map(counts.map((item) => [item.url, item.count]));

        return urls.map((url) => map.get(url) ?? 0);
      }

      return models.Comment.count(where);
    },

    async create(
      input: Partial<WalineComment> & {
        comment: string;
        url: string;
        at?: string;
        captcha?: unknown;
      },
      ctx: WalineContext,
    ) {
      const rawComment = requiredString(input.comment, 'comment');
      const url = requiredString(input.url, 'url');
      const current = currentUser(ctx);

      if (!current && config.forceLogin) unauthorized();
      if (!current && services.captcha && !(await services.captcha.verify(input.captcha, ctx))) {
        forbidden();
      }

      const data: Partial<WalineComment> = {
        comment: rawComment,
        link: input.link,
        mail: input.mail,
        nick: input.nick,
        pid: input.pid,
        rid: input.rid,
        ua: input.ua,
        url,
        ip: ctx.ip,
        insertedAt: now(),
        user_id: current?.objectId,
      };

      if (data.pid && ctx.state.deprecated) {
        data.comment = `[@${input.at ?? ''}](#${data.pid}): ${data.comment}`;
      }

      if (!isAdmin(ctx)) {
        if (ctx.ip && config.disallowIPList?.includes(ctx.ip)) forbidden();

        const duplicate = await models.Comment.select({
          url,
          mail: data.mail,
          nick: data.nick,
          link: data.link,
          comment: data.comment,
        });

        if (duplicate.length) {
          throw new WalineError('DUPLICATE_CONTENT', 400, 'Duplicate Content');
        }

        if (ctx.ip) {
          const recent = await models.Comment.select({
            ip: ctx.ip,
            insertedAt: ['>', new Date(now().getTime() - (config.ipQps ?? 60) * 1000)],
          });
          if (recent.length) {
            throw new WalineError('COMMENT_TOO_FAST', 400, 'Comment too fast!');
          }
        }

        data.status = config.audit ? 'waiting' : 'approved';
        if (data.status === 'approved' && services.spam && (await services.spam.check(data, ctx))) {
          data.status = 'spam';
        }
        if (
          data.status !== 'spam' &&
          config.forbiddenWords?.length &&
          new RegExp(`(${config.forbiddenWords.join('|')})`, 'iu').test(rawComment)
        ) {
          data.status = 'spam';
        }
      } else {
        data.status = 'approved';
      }

      const rejected = await hook('preSave', data, undefined, ctx);
      if (rejected) {
        throw new WalineError('HOOK_REJECTED', 400, undefined, rejected);
      }

      const saved = await models.Comment.add(data);
      let parent: WalineComment | undefined;
      if (data.pid) [parent] = await models.Comment.select({ objectId: data.pid });
      await services.webhook?.emit('new_comment', {
        comment: { ...saved, rawComment },
        reply: parent,
      });
      if (data.status !== 'spam' && services.notification) {
        await services.notification.send({ ...saved, rawComment }, parent);
      }
      await hook('postSave', saved, parent, ctx);
      logger.debug('Comment added', saved.objectId);

      return formatComment(saved, ctx, current ? [current] : []);
    },

    async update(
      input: {
        objectId: string;
        data: Omit<Partial<WalineComment>, 'like'> & { like?: boolean | number };
      },
      ctx: WalineContext,
    ) {
      const id = requiredString(input.objectId, 'objectId');
      const [old] = await models.Comment.select({ objectId: id });

      if (!old) return undefined;
      const isLikeOnly =
        typeof input.data.like === 'boolean' && Object.keys(input.data).length === 1;
      const current = currentUser(ctx);

      if (!isLikeOnly) {
        const user = current ?? requireUser(ctx);
        if (!isAdmin(ctx) && old.user_id !== user.objectId) forbidden();
      }

      const data: Partial<WalineComment> = isAdmin(ctx)
        ? { ...input.data }
        : { comment: input.data.comment, like: input.data.like as number };

      if (typeof input.data.like === 'boolean') {
        data.like = Math.max(
          (Number(old.like) || 0) +
            (input.data.like ? Math.ceil(random() * (config.likeIncMax ?? 1)) : -1),
          0,
        );
      }

      const rejected = await hook('preUpdate', { ...data, objectId: id }, undefined, ctx);
      if (rejected) {
        throw new WalineError('HOOK_REJECTED', 400, undefined, rejected);
      }

      const [updated] = await models.Comment.update(data, { objectId: id });
      if (!updated) return undefined;

      if (
        old.status === 'waiting' &&
        data.status === 'approved' &&
        old.pid &&
        services.notification
      ) {
        const [parent] = await models.Comment.select({ objectId: old.pid });
        if (parent) await services.notification.send(updated, parent, true);
      }

      await hook('postUpdate', data, undefined, ctx);

      return formatComment(updated, ctx);
    },

    async remove(input: { objectId: string }, ctx: WalineContext) {
      const id = requiredString(input.objectId, 'objectId');
      const current = requireUser(ctx);

      if (!isAdmin(ctx)) {
        const owned = await models.Comment.select({
          objectId: id,
          user_id: current.objectId,
        });
        if (!owned.length) forbidden();
      }

      const rejected = await hook('preDelete', id, undefined, ctx);
      if (rejected) {
        throw new WalineError('HOOK_REJECTED', 400, undefined, rejected);
      }

      await models.Comment.delete({
        _complex: { _logic: 'or', objectId: id, pid: id, rid: id },
      });
      await hook('postDelete', id, undefined, ctx);
    },
  };
};
