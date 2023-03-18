import {
  type BaseAPIOptions,
  errorCheck,
  ErrorStatusResponse,
} from './utils.js';
import { type WalineComment } from '../typings/index.js';

export interface GetUserListOptions extends BaseAPIOptions {
  /**
   * 每页个数
   *
   * Number per page
   */
  pageSize: number;

  /**
   * 取消请求的信号
   *
   * AbortSignal to cancel request
   */
  signal?: AbortSignal;
}

export interface WalineUser
  extends Pick<WalineComment, 'nick' | 'link' | 'avatar' | 'label' | 'level'> {
  count: number;
}

export interface GetUserListResponse extends ErrorStatusResponse {
  data: WalineUser[];
}

export const getUserList = ({
  serverURL,
  signal,
  pageSize,
  lang,
}: GetUserListOptions): Promise<WalineUser[]> =>
  fetch(`${serverURL}/user?pageSize=${pageSize}&lang=${lang}`, {
    signal,
  })
    .then((resp) => <Promise<GetUserListResponse>>resp.json())
    .then((resp) => errorCheck(resp, 'user list'))
    .then((resp) => resp.data);
