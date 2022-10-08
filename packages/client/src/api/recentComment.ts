import { errorCheck } from './utils';
import type { BaseAPIOptions } from './utils';
import type { WalineComment } from '../typings';

export interface GetRecentCommentOptions extends BaseAPIOptions {
  /**
   * 获取评论的数量
   *
   * Comment numebr to be fetched
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
  })
    .then((resp) => resp.json() as Promise<WalineComment[]>)
    .then((data) => errorCheck(data, 'recent comment'));
};
