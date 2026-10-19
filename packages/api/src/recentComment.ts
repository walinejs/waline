import type { BaseWalineResponseComment } from './typings.js';
import type { BaseAPIOptions } from './utils.js';
import { getFetchPrefix, getSiteQuery } from './utils.js';

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
  siteId,
}: GetRecentCommentOptions): Promise<RecentCommentData[]> => {
  const headers: Record<string, string> = {};

  if (token) headers.Authorization = `Bearer ${token}`;

  return fetch(
    `${getFetchPrefix(serverURL)}comment?type=recent&count=${count}&lang=${lang}${getSiteQuery(siteId)}`,
    {
      signal,
      headers,
    },
  ).then((resp) => resp.json() as Promise<RecentCommentData[]>);
};
