import { getArticleCounter, updateArticleCounter } from './articleCounter.js';
import { type BaseAPIOptions } from './utils.js';

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
}: GetPageviewOptions): Promise<number[]> =>
  getArticleCounter({
    serverURL,
    lang,
    paths,
    type: ['time'],
    signal,
  }).then((counts) => counts) as Promise<number[]>;

export interface UpdatePageviewOptions extends BaseAPIOptions {
  /**
   * 待更新页面的 path
   *
   * Path of pages
   */
  path: string;
}

export const updatePageview = (
  options: UpdatePageviewOptions
): Promise<number> =>
  updateArticleCounter({
    ...options,
    type: 'time',
    action: 'inc',
  });
