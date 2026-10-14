/* oxlint-disable typescript/method-signature-style */
import type {
  CreateWalineCoreOptions,
  WalineConfig,
  WalineContext,
  WalineHooks,
  WalineLogger,
  WalineModels,
  WalineServices,
} from '@waline/core';
import type { Context } from 'hono';

export interface D1Result<T = unknown> {
  results?: T[];
  success: boolean;
  meta?: { changes?: number; last_row_id?: number };
}

export interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  all<T = Record<string, unknown>>(): Promise<D1Result<T>>;
  first<T = Record<string, unknown>>(column?: string): Promise<T | null>;
  run<T = Record<string, unknown>>(): Promise<D1Result<T>>;
}

export interface D1Database {
  prepare(query: string): D1PreparedStatement;
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>;
  exec(query: string): Promise<unknown>;
}

export interface WalineWorkerBindings {
  DB?: D1Database;
  JWT_TOKEN?: string;
  SECURE_DOMAINS?: string;
  SITE_NAME?: string;
  SITE_URL?: string;
  OAUTH_URL?: string;
  WALINE_ADMIN_MODULE_ASSET_URL?: string;
  TURNSTILE_SECRET?: string;
  TURNSTILE_KEY?: string;
  RECAPTCHA_V3_SECRET?: string;
  RECAPTCHA_V3_KEY?: string;
  LOGIN?: string;
  COMMENT_AUDIT?: string;
  DISABLE_REGION?: string;
  DISABLE_USERAGENT?: string;
  AVATAR_PROXY?: string;
  LEVELS?: string;
  IPQPS?: string;
  [key: string]: unknown;
}

export interface WorkerResolverContext<Bindings extends object = WalineWorkerBindings> {
  bindings: Bindings;
  context: Context<{ Bindings: Bindings }>;
  request: Request;
}

export type Resolvable<T, Bindings extends object = WalineWorkerBindings> =
  | T
  | ((context: WorkerResolverContext<Bindings>) => T | Promise<T>);

export interface WalineWorkerOptions<Bindings extends object = WalineWorkerBindings> {
  models?: Resolvable<WalineModels, Bindings>;
  config?: Resolvable<WalineConfig, Bindings>;
  services?: Resolvable<WalineServices, Bindings>;
  hooks?: Resolvable<WalineHooks, Bindings>;
  logger?: Resolvable<Partial<WalineLogger>, Bindings>;
  core?: Resolvable<CreateWalineCoreOptions, Bindings>;
  tablePrefix?: string;
  adminAssetUrl?: string;
  oauthServices?: { name: string; origin?: string }[];
  onError?: (error: unknown, context: WalineContext) => void | Promise<void>;
}
