import { type BaseAPIOptions, JSON_HEADERS } from './utils.js';

export interface GetArticleCounterOptions extends BaseAPIOptions {
  /**
   * 待获取计数器的 path
   *
   * Path of counters
   */
  paths: string[];

  /**
   * 待获取计数器的类型
   *
   * Counter type to be fetched
   */
  type: string[];

  /**
   * 取消请求的信号
   *
   * AbortSignal to cancel request
   */
  signal?: AbortSignal;
}

export type GetArticleCounterResponse =
  | Record<string, number>[]
  | Record<string, number>
  | number[]
  | number;

export const getArticleCounter = ({
  serverURL,
  lang,
  paths,
  type,
  signal,
}: GetArticleCounterOptions): Promise<GetArticleCounterResponse> =>
  fetch(
    `${serverURL}/article?path=${encodeURIComponent(
      paths.join(','),
    )}&type=${encodeURIComponent(type.join(','))}&lang=${lang}`,
    { signal },
  ).then((resp) => <Promise<GetArticleCounterResponse>>resp.json());

export interface UpdateArticleCounterOptions extends BaseAPIOptions {
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
  }).then((resp) => <Promise<number>>resp.json());
