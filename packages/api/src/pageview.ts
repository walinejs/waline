import type { GetArticleCounterResponse } from './articleCounter.js';
import { getArticleCounter, updateArticleCounter } from './articleCounter.js';
import type { BaseAPIOptions } from './utils.js';

interface GetPageviewOptions extends BaseAPIOptions {
  /**
   * 待获取页面的 path
   *
   * Path of pages
   */
  paths: string[];

  /**
   * 取消请求的信号
   *
   * AbortSignal to cancel request
   */
  signal?: AbortSignal;
}

export const getPageview = ({
  serverURL,
  lang,
  paths,
  signal,
}: GetPageviewOptions): Promise<GetArticleCounterResponse> =>
  getArticleCounter({
    serverURL,
    lang,
    paths,
    type: ['time'],
    signal,
  });

export interface UpdatePageviewOptions extends BaseAPIOptions {
  /**
   * 待更新页面的 path
   *
   * Path of pages
   */
  path: string;
}

export const updatePageview = (
  options: UpdatePageviewOptions,
): Promise<GetArticleCounterResponse> =>
  updateArticleCounter({
    ...options,
    type: 'time',
    action: 'inc',
  });
