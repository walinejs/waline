import { createAuthHandler } from './handlers/auth.js';
import { createCommentHandler } from './handlers/comment.js';
import { createCounterHandler } from './handlers/counter.js';
import { createDatabaseHandler } from './handlers/database.js';
import { createOAuthHandler } from './handlers/oauth.js';
import { createUserHandler } from './handlers/user.js';
import { createVerificationHandler } from './handlers/verification.js';
import type { CreateWalineCoreOptions, HookName, WalineHook, WalineLogger } from './types.js';
import type { CoreRuntime } from './utils/runtime.js';

const noop = (): void => undefined;

export const createWalineCore = (options: CreateWalineCoreOptions) => {
  const services = Object.freeze({ ...options.services });
  const logger: WalineLogger = {
    debug: options.logger?.debug ?? noop,
    info: options.logger?.info ?? noop,
    warn: options.logger?.warn ?? noop,
    error: options.logger?.error ?? noop,
  };
  const hook = async (
    name: HookName,
    payload: unknown,
    extra: unknown,
    ctx: Parameters<WalineHook>[2],
  ): Promise<unknown> => {
    /* v8 ignore next -- Core handlers always provide a context; this protects custom handler integrations. */
    if (!ctx) return undefined;

    const configured = options.hooks?.[name];
    const hooks: WalineHook[] = configured
      ? Array.isArray(configured)
        ? configured
        : [configured]
      : [];

    for (const callback of hooks) {
      const result = await callback(payload, extra, ctx);
      if (result) return result;
    }

    return undefined;
  };
  const runtime: CoreRuntime = {
    models: options.models,
    config: Object.freeze({ ...options.config }),
    services,
    logger,
    now: () => services.clock?.now() ?? new Date(),
    random: () => services.random?.value() ?? Math.random(),
    hook,
  };

  return Object.freeze({
    comment: Object.freeze(createCommentHandler(runtime)),
    counter: Object.freeze(createCounterHandler(runtime)),
    user: Object.freeze(createUserHandler(runtime)),
    auth: Object.freeze(createAuthHandler(runtime)),
    oauth: Object.freeze(createOAuthHandler(runtime)),
    verification: Object.freeze(createVerificationHandler(runtime)),
    database: Object.freeze(createDatabaseHandler(runtime)),
  });
};

export type WalineCore = ReturnType<typeof createWalineCore>;
