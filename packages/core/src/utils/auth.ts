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

export const isGlobalAdmin = (ctx: WalineContext): boolean =>
  currentUser(ctx)?.type === 'administrator';

export const isSupervisor = (ctx: WalineContext): boolean =>
  currentUser(ctx)?.type === 'supervisor' && ctx.state.siteAdmin !== false;

export const isAdmin = (ctx: WalineContext): boolean => isGlobalAdmin(ctx) || isSupervisor(ctx);

export const isAnyAdmin = isAdmin;

export const requireUser = (ctx: WalineContext): WalineUser => currentUser(ctx) ?? unauthorized();

export const requireAdmin = (ctx: WalineContext): WalineUser => {
  const user = requireUser(ctx);

  if (!isAdmin(ctx)) forbidden();

  return user;
};

export const requireGlobalAdmin = (ctx: WalineContext): WalineUser => {
  const user = requireUser(ctx);

  if (!isGlobalAdmin(ctx)) forbidden();

  return user;
};
