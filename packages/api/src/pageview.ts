import type { GetArticleCounterResponse } from './articleCounter.js';
import { getArticleCounter, updateArticleCounter } from './articleCounter.js';
import type { BaseAPIOptions } from './utils.js';

interface GetPageviewOptions extends BaseAPIOptions {
  /**
   * 待获取页面的唯一标识符
   *
   * Identifiers of pages
   */
  identifiers: string[];

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
  identifiers,
  signal,
}: GetPageviewOptions): Promise<GetArticleCounterResponse> =>
  getArticleCounter({
    serverURL,
    lang,
    identifiers,
    type: ['time'],
    signal,
  });

export interface UpdatePageviewOptions extends BaseAPIOptions {
  /**
   * 待更新页面的唯一标识符
   *
   * Identifier of page
   */
  identifier: string;
}

export const updatePageview = (
  options: UpdatePageviewOptions,
): Promise<GetArticleCounterResponse> =>
  updateArticleCounter({
    ...options,
    type: 'time',
    action: 'inc',
  });
