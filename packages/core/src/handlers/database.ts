import type { WalineContext } from '../types.js';
import { requireAdmin, requireGlobalAdmin } from '../utils/auth.js';
import type { CoreRuntime } from '../utils/runtime.js';
import { requiredCapability } from '../utils/validation.js';

export const createDatabaseHandler = ({ models, now }: CoreRuntime) => ({
  async export(_input: object, ctx: WalineContext) {
    if (models.Site) requireGlobalAdmin(ctx);
    else requireAdmin(ctx);
    const [Comment, Counter, Users] = await Promise.all([
      models.Comment.select({}),
      models.Counter.select({}),
      models.Users.select({}),
    ]);
    if (!models.Site || !models.SiteAdmin) {
      return {
        type: 'waline',
        version: 1,
        time: now().getTime(),
        tables: ['Comment', 'Counter', 'Users'],
        data: { Comment, Counter, Users },
      };
    }
    const [Site, SiteAdmin] = await Promise.all([
      models.Site.select({}),
      models.SiteAdmin.select({}),
    ]);

    return {
      type: 'waline',
      version: 2,
      time: now().getTime(),
      tables: ['Comment', 'Counter', 'Users', 'Site', 'SiteAdmin'],
      data: { Comment, Counter, Users, Site, SiteAdmin },
    };
  },

  async import(
    input: { table: string; data: Record<string, unknown>; siteId?: string },
    ctx: WalineContext,
  ) {
    if (models.Site) requireGlobalAdmin(ctx);
    else requireAdmin(ctx);
    const model = requiredCapability(models.get?.(input.table), `model:${input.table}`);
    const { objectId: _objectId, ...source } = input.data;
    const data =
      ['Comment', 'Counter'].includes(input.table) && !source.site_id && input.siteId
        ? { ...source, site_id: input.siteId }
        : source;

    return model.add(data);
  },

  async update(
    input: {
      table: string;
      objectId: string;
      data: Record<string, unknown>;
    },
    ctx: WalineContext,
  ) {
    if (models.Site) requireGlobalAdmin(ctx);
    else requireAdmin(ctx);
    const model = requiredCapability(models.get?.(input.table), `model:${input.table}`);
    const {
      objectId: _objectId,
      createdAt: _createdAt,
      updatedAt: _updatedAt,
      ...data
    } = input.data;

    return model.update(data, { objectId: input.objectId });
  },

  async clear(input: { table: string }, ctx: WalineContext) {
    if (models.Site) requireGlobalAdmin(ctx);
    else requireAdmin(ctx);
    const model = requiredCapability(models.get?.(input.table), `model:${input.table}`);

    return model.delete({});
  },
});
