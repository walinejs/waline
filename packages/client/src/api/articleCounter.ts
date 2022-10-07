import { JSON_HEADERS, errorCheck } from './utils';

export interface FetchArticleCounterOptions {
  /**
   * Waline 服务端地址
   *
   * Waline serverURL
   */
  serverURL: string;
  /**
   * 错误信息所使用的语言
   *
   * Language used in error text
   */
  lang: string;
  /**
   * 待获取计数器的 path
   *
   * Path of counters
   */
  paths: string[];
  /**
   * 取消请求的信号
   *
   * AbortSignal to cancel request
   */
  signal: AbortSignal;
  /**
   * 待获取计数器的类型
   *
   * Counter type to be fetched
   */
  type: string[];
}

export const fetchArticleCounter = ({
  serverURL,
  lang,
  paths,
  type,
  signal,
}: FetchArticleCounterOptions): Promise<
  Record<string, number>[] | Record<string, number> | number[] | number
> =>
  fetch(
    `${serverURL}/article?path=${encodeURIComponent(
      paths.join(',')
    )}&type=${encodeURIComponent(type.join(','))}&lang=${lang}`,
    { signal }
  )
    .then(
      (resp) =>
        resp.json() as Promise<Record<string, number>[] | number[] | number>
    )
    .then((data) => errorCheck(data, 'article count'));

export interface UpdateArticleCounterOptions {
  /**
   * Waline 服务端地址
   *
   * Waline serverURL
   */
  serverURL: string;
  /**
   * 错误信息所使用的语言
   *
   * Language used in error text
   */
  lang: string;
  /**
   * 待更新计数器的 path
   *
   * Path of counter to be updated
   */
  path: string;
  /**
   * 待更新计数器的类型
   *
   * Counter type to be updated
   */
  type: string;
  /**
   * 更新操作
   *
   * Update operation
   *
   * @default 'inc'
   */
  action?: 'inc' | 'desc';
}

export const updateArticleCounter = ({
  serverURL,
  lang,
  path,
  type,
  action,
}: UpdateArticleCounterOptions): Promise<number> =>
  fetch(`${serverURL}/article?lang=${lang}`, {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify({ path, type, action }),
  })
    .then((resp) => resp.json() as Promise<number>)
    .then((data) => errorCheck(data, 'article count'));
