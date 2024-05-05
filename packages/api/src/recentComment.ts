import type { BaseWalineResponseComment } from './typings.js';
import type { BaseAPIOptions } from './utils.js';
import { getFetchPrefix } from './utils.js';

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

export interface RecentCommentData extends BaseWalineResponseComment {
  /**
   * Page url where comment locales
   *
   * 评论所在页面地址
   */
  url: string;
}

export const getRecentComment = ({
  serverURL,
  lang,
  count,
  signal,
  token,
}: GetRecentCommentOptions): Promise<RecentCommentData[]> => {
  const headers: Record<string, string> = {};

  if (token) headers.Authorization = `Bearer ${token}`;

  return fetch(
    `${getFetchPrefix(
      serverURL,
    )}comment?type=recent&count=${count}&lang=${lang}`,
    {
      signal,
      headers,
    },
  ).then((resp) => resp.json() as Promise<RecentCommentData[]>);
};
