import { forbidden, unauthorized } from '../error.js';
import type { WalineContext, WalineUser } from '../types.js';

const empty = (value: unknown): boolean =>
  value === undefined ||
  value === null ||
  value === '' ||
  (Array.isArray(value) && value.length === 0) ||
  (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0);

export const currentUser = (ctx: WalineContext): WalineUser | undefined =>
  empty(ctx.state.userInfo) ? undefined : ctx.state.userInfo;

export const isAdmin = (ctx: WalineContext): boolean =>
  currentUser(ctx)?.type === 'administrator' && ctx.state.siteAdmin !== false;

export const isSuperAdmin = (ctx: WalineContext): boolean =>
  currentUser(ctx)?.type === 'super_admin';

export const isAnyAdmin = (ctx: WalineContext): boolean => isAdmin(ctx) || isSuperAdmin(ctx);

export const requireUser = (ctx: WalineContext): WalineUser => currentUser(ctx) ?? unauthorized();

export const requireAdmin = (ctx: WalineContext): WalineUser => {
  const user = requireUser(ctx);

  if (!['administrator', 'super_admin'].includes(user.type)) forbidden();

  return user;
};

export const requireSuperAdmin = (ctx: WalineContext): WalineUser => {
  const user = requireUser(ctx);

  if (user.type !== 'super_admin') forbidden();

  return user;
};
