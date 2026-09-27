import type {
  HookName,
  WalineConfig,
  WalineContext,
  WalineLogger,
  WalineModels,
  WalineServices,
} from '../types.js';

export interface CoreRuntime {
  models: WalineModels;
  config: Readonly<WalineConfig>;
  services: Readonly<WalineServices>;
  logger: WalineLogger;
  now: () => Date;
  random: () => number;
  hook: (name: HookName, payload: unknown, extra: unknown, ctx: WalineContext) => Promise<unknown>;
}
