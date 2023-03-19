import { type BaseAPIOptions } from './utils.js';
import { type WalineComment } from '../typings/index.js';

export interface GetRecentCommentOptions extends BaseAPIOptions {
  /**
   * 获取评论的数量
   *
   * Comment number to be fetched
   */
  count: number;

  /**
   * 取消请求的信号
   *
   * AbortSignal to cancel request
   */
  signal?: AbortSignal;

  /**
   * 用户令牌
   *
   * User token
   */
  token?: string;
}

export const getRecentComment = ({
  serverURL,
  lang,
  count,
  signal,
  token,
}: GetRecentCommentOptions): Promise<WalineComment[]> => {
  const headers: Record<string, string> = {};

  if (token) headers.Authorization = `Bearer ${token}`;

  return fetch(`${serverURL}/comment?type=recent&count=${count}&lang=${lang}`, {
    signal,
    headers,
  }).then((resp) => <Promise<WalineComment[]>>resp.json());
};
