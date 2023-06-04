import { type UserInfo as ClientUserInfo } from '@waline/client/api';
import { type Middleware as KoaMiddleware } from 'koa';
import { type Context as ThinkJSContext } from 'thinkjs';

interface UserInfo extends ClientUserInfo {
  password: string;
}

export interface WalineContextState {
  deprecated?: boolean;
  userInfo?: UserInfo;
  token?: string;
}

export interface WalineContext extends ThinkJSContext {
  serverURL: string;
  webhook: (type: string, data: Record<string, unknown>) => void;
}

export type Middleware = KoaMiddleware<WalineContextState, WalineContext>;
