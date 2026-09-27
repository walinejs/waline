export type Scalar = string | number | boolean | Date | null | undefined;
export type Operator = 'IN' | 'NOT IN' | '>' | '>=' | '<' | '<=' | '!=' | 'LIKE';
export type Condition<T = Scalar> = T | readonly [Operator, T | readonly T[]];

export type Where<T> = Partial<{ [K in keyof T]: Condition<T[K]> }> & {
  _complex?: Where<T> & { _logic?: 'and' | 'or' };
};

export interface SelectOptions<T> {
  desc?: keyof T & string;
  field?: readonly (keyof T & string)[];
  limit?: number;
  offset?: number;
  order?: readonly {
    field: keyof T & string;
    direction: 'asc' | 'desc';
    nulls?: 'first' | 'last';
  }[];
}

export interface CountOptions<T> {
  group?: readonly (keyof T & string)[];
}

export interface GroupedCount {
  count: number;
  [key: string]: unknown;
}

export interface AddOptions {
  access?: { read?: boolean; write?: boolean };
}

export interface WalineModel<T extends object> {
  select(where: Where<T>, options?: SelectOptions<T>): Promise<T[]>;
  count(where?: Where<T>, options?: CountOptions<T>): Promise<number | GroupedCount[]>;
  add(data: Partial<T>, options?: AddOptions): Promise<T>;
  update(data: Partial<T> | ((current: T) => Partial<T>), where: Where<T>): Promise<T[]>;
  delete(where: Where<T>): Promise<void>;
}

export interface BaseEntity {
  objectId: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface WalineUser extends BaseEntity {
  email: string;
  display_name?: string;
  url?: string;
  avatar?: string;
  password?: string;
  type: string;
  label?: string;
  '2fa'?: string;
  [provider: string]: unknown;
}

export interface WalineComment extends BaseEntity {
  comment: string;
  url: string;
  mail?: string;
  nick?: string;
  link?: string;
  pid?: string;
  rid?: string;
  ua?: string;
  ip?: string;
  user_id?: string;
  status?: string;
  sticky?: boolean | string | number;
  like?: number;
  insertedAt: Date | string;
  [key: string]: unknown;
}

export interface WalineCounter extends BaseEntity {
  url: string;
  time?: number;
  reaction0?: number;
  reaction1?: number;
  reaction2?: number;
  reaction3?: number;
  reaction4?: number;
  reaction5?: number;
  [key: string]: unknown;
}

export interface OAuthServiceInfo {
  name: string;
  origin?: string;
}

export interface WalineContext {
  headers: Record<string, string | undefined>;
  state: {
    userInfo?: WalineUser;
    token?: string;
    deprecated?: boolean;
    oauthServices?: OAuthServiceInfo[];
  };
  ip?: string;
  origin?: string;
  referrer?: string;
  requestUrl?: string;
  serverUrl?: string;
  signal?: AbortSignal;
}

export interface WalineModels {
  Comment: WalineModel<WalineComment>;
  Counter: WalineModel<WalineCounter>;
  Users: WalineModel<WalineUser>;
  get?(name: string): WalineModel<Record<string, unknown>>;
}

export interface WalineConfig {
  audit?: boolean;
  avatarProxy?: string;
  disableRegion?: boolean;
  disableUserAgent?: boolean;
  disallowIPList?: string[];
  forbiddenWords?: string[];
  forceLogin?: boolean;
  ipQps?: number;
  levels?: number[] | false;
  likeIncMax?: number;
  normalUserType?: string;
  storage?: string;
}

export interface WalineServices {
  token?: {
    sign(subject: string): Promise<string> | string;
    verify(token: string): Promise<string> | string;
  };
  password?: {
    hash(value: string): Promise<string>;
    verify(value: string, hash: string): Promise<boolean>;
  };
  twoFactor?: {
    create(email?: string): Promise<{ secret: string; otpauth_url: string }>;
    verify(secret: string, code: string): Promise<boolean>;
  };
  captcha?: { verify(input: unknown, ctx: WalineContext): Promise<boolean> };
  spam?: { check(comment: WalineComment, ctx: WalineContext): Promise<boolean> };
  markdown?: { render(value: string): Promise<string> | string };
  avatar?: { stringify(value: Partial<WalineComment> | WalineUser): Promise<string> | string };
  region?: { lookup(ip: string, depth: number): Promise<string> | string };
  userAgent?: {
    parse(value?: string): {
      browser?: { name?: string; version?: string };
      os?: { name?: string; version?: string };
    };
  };
  notification?: {
    send(comment: WalineComment, parent?: WalineComment, approved?: boolean): Promise<void>;
    passwordReset?(user: WalineUser, url: string): Promise<void>;
    verification?(user: WalineUser, url: string): Promise<void>;
  };
  webhook?: { emit(type: string, data: unknown): Promise<void> };
  oauth?: { authorize(input: OAuthAuthorizeInput, ctx: WalineContext): Promise<OAuthProfile> };
  fetch?: typeof globalThis.fetch;
  clock?: { now(): Date };
  random?: { value(): number };
}

export interface OAuthAuthorizeInput {
  code: string;
  type: string;
  redirect?: string;
  state?: string;
}
export interface OAuthProfile {
  id: string;
  email: string;
  name?: string;
  url?: string;
  avatar?: string;
}

export type HookName =
  | 'preSave'
  | 'postSave'
  | 'preUpdate'
  | 'postUpdate'
  | 'preDelete'
  | 'postDelete';
export type WalineHook = (payload: unknown, extra?: unknown, ctx?: WalineContext) => unknown;
export type WalineHooks = Partial<Record<HookName, WalineHook | WalineHook[]>>;
export interface WalineLogger {
  debug(...args: unknown[]): void;
  info(...args: unknown[]): void;
  warn(...args: unknown[]): void;
  error(...args: unknown[]): void;
}

export interface CreateWalineCoreOptions {
  models: WalineModels;
  config?: WalineConfig;
  services?: WalineServices;
  hooks?: WalineHooks;
  logger?: Partial<WalineLogger>;
}
