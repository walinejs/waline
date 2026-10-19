import { badRequest, forbidden, WalineError } from '../error.js';
import type { WalineContext, WalineSite } from '../types.js';
import { currentUser, isSuperAdmin, requireAdmin, requireSuperAdmin } from '../utils/auth.js';
import type { CoreRuntime } from '../utils/runtime.js';
import { requiredString } from '../utils/validation.js';

export const createSiteHandler = ({ models, random }: CoreRuntime) => {
  const newSiteId = (): string =>
    Array.from({ length: 3 }, () => Math.floor(random() * 4_294_967_296).toString(36))
      .join('')
      .slice(0, 20);
  const canManage = async (siteId: string, ctx: WalineContext): Promise<boolean> => {
    const user = currentUser(ctx);
    if (!user) return false;
    if (isSuperAdmin(ctx)) return true;
    return Boolean(
      (await models.SiteAdmin.select({ site_id: siteId, user_id: user.objectId })).length,
    );
  };

  return {
    async list(_input: object, ctx: WalineContext) {
      const user = requireAdmin(ctx);
      if (isSuperAdmin(ctx)) {
        const [sites, grants] = await Promise.all([
          models.Site.select({}),
          models.SiteAdmin.select({}),
        ]);
        return sites.map((site) => ({
          ...site,
          adminIds: grants
            .filter(({ site_id }) => site_id === site.siteId)
            .map(({ user_id }) => user_id),
        }));
      }

      const grants = await models.SiteAdmin.select({ user_id: user.objectId });
      const ids = grants.map(({ site_id }) => site_id);
      return ids.length ? models.Site.select({ siteId: ['IN', ids] }) : [];
    },

    async create(input: Partial<WalineSite>, ctx: WalineContext) {
      requireSuperAdmin(ctx);
      return models.Site.add({
        siteId: newSiteId(),
        name: requiredString(input.name, 'name'),
        url: requiredString(input.url, 'url'),
        status: 'active',
        isDefault: false,
        config:
          typeof input.config === 'string' ? input.config : JSON.stringify(input.config ?? {}),
      });
    },

    async update(input: { siteId: string; data: Partial<WalineSite> }, ctx: WalineContext) {
      const siteId = requiredString(input.siteId, 'siteId');
      if (!(await canManage(siteId, ctx))) forbidden();
      const data = Object.fromEntries(
        Object.entries(input.data).filter(([key]) =>
          ['name', 'url', 'status', 'config'].includes(key),
        ),
      );
      if (typeof data.config === 'string') {
        try {
          data.config = JSON.stringify(JSON.parse(data.config));
        } catch {
          badRequest({ field: 'config' });
        }
      } else if (data.config) {
        data.config = JSON.stringify(data.config);
      }
      if (!isSuperAdmin(ctx)) delete data.status;
      return (await models.Site.update(data, { siteId }))[0];
    },

    async setDefault(input: { siteId: string }, ctx: WalineContext) {
      requireSuperAdmin(ctx);
      const siteId = requiredString(input.siteId, 'siteId');
      const [site] = await models.Site.select({ siteId });
      if (!site || site.status !== 'active') badRequest({ field: 'siteId' });
      await models.Site.update({ isDefault: false }, {});
      return (await models.Site.update({ isDefault: true }, { siteId }))[0];
    },

    async remove(input: { siteId: string }, ctx: WalineContext) {
      requireSuperAdmin(ctx);
      const siteId = requiredString(input.siteId, 'siteId');
      const [site] = await models.Site.select({ siteId });
      if (!site) return;
      if (site.isDefault) {
        throw new WalineError('DEFAULT_SITE', 400, 'Default site cannot be deleted');
      }
      const [comments, counters] = await Promise.all([
        models.Comment.count({ site_id: siteId }) as Promise<number>,
        models.Counter.count({ site_id: siteId }) as Promise<number>,
      ]);
      if (comments || counters) {
        throw new WalineError('SITE_NOT_EMPTY', 400, 'Site with data can only be disabled');
      }
      await models.SiteAdmin.delete({ site_id: siteId });
      await models.Site.delete({ siteId });
    },

    async grant(input: { siteId: string; userId: string }, ctx: WalineContext) {
      requireSuperAdmin(ctx);
      const siteId = requiredString(input.siteId, 'siteId');
      const userId = requiredString(input.userId, 'userId');
      const existing = await models.SiteAdmin.select({ site_id: siteId, user_id: userId });
      const [[site], [user]] = await Promise.all([
        models.Site.select({ siteId }),
        models.Users.select({ objectId: userId }),
      ]);
      if (!site || !user || user.type === 'super_admin') badRequest({ field: 'userId' });
      if (!existing.length) await models.SiteAdmin.add({ site_id: siteId, user_id: userId });
      await models.Users.update({ type: 'administrator' }, { objectId: userId });
    },

    async revoke(input: { siteId: string; userId: string }, ctx: WalineContext) {
      requireSuperAdmin(ctx);
      const siteId = requiredString(input.siteId, 'siteId');
      const userId = requiredString(input.userId, 'userId');
      await models.SiteAdmin.delete({ site_id: siteId, user_id: userId });
      const remaining = await models.SiteAdmin.count({ user_id: userId });
      if (!remaining) {
        await models.Users.update({ type: 'guest' }, { objectId: userId, type: 'administrator' });
      }
    },
  };
};
