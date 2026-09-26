import type { BaseAPIOptions, ErrorStatusResponse } from './utils.js';
import { errorCheck, getFetchPrefix } from './utils.js';

export interface GetCommentCountOptions extends BaseAPIOptions {
  /**
   * 待获取评论数的唯一标识符
   *
   * Identifiers of pages to be fetched
   */
  identifiers: string[];

  /**
   * 取消请求的信号
   *
   * AbortSignal to cancel request
   */
  signal?: AbortSignal;
}

export const fetchCommentCount = ({
  serverURL,
  lang,
  identifiers,
  signal,
}: GetCommentCountOptions): Promise<number[]> =>
  fetch(
    `${getFetchPrefix(serverURL)}comment?type=count&url=${encodeURIComponent(
      identifiers.join(','),
    )}&lang=${lang}`,
    { signal },
  )
    .then((resp) => resp.json() as Promise<{ data: number[] } & ErrorStatusResponse>)
    .then((data) => errorCheck(data, 'Get comment count').data);
