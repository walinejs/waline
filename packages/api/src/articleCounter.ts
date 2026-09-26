import type { BaseAPIOptions, ErrorStatusResponse } from './utils.js';
import { JSON_HEADERS, errorCheck, getFetchPrefix } from './utils.js';

export interface GetArticleCounterOptions extends BaseAPIOptions {
  /**
   * 待获取计数器的唯一标识符
   *
   * Identifiers of counters
   */
  identifiers: string[];

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

export interface CounterFields {
  time?: number;
  reaction0?: number;
  reaction1?: number;
  reaction2?: number;
  reaction3?: number;
  reaction4?: number;
  reaction5?: number;
  reaction6?: number;
  reaction7?: number;
  reaction8?: number;
}

export type GetArticleCounterResponseItem = Record<string, number> & CounterFields;

export type GetArticleCounterResponse = GetArticleCounterResponseItem[];

export const getArticleCounter = ({
  serverURL,
  lang,
  identifiers,
  type,
  signal,
}: GetArticleCounterOptions): Promise<GetArticleCounterResponse> =>
  fetch(
    `${getFetchPrefix(serverURL)}article?identifier=${encodeURIComponent(
      identifiers.join(','),
    )}&type=${encodeURIComponent(type.join(','))}&lang=${lang}`,
    { signal },
  )
    .then(
      (resp) => resp.json() as Promise<{ data: GetArticleCounterResponse } & ErrorStatusResponse>,
    )
    .then((data) => errorCheck(data, 'Get counter').data);

export interface UpdateArticleCounterOptions extends BaseAPIOptions {
  /**
   * 待更新计数器的唯一标识符
   *
   * Identifier of counter to be updated
   */
  identifier: string;

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
  identifier,
  type,
  action,
}: UpdateArticleCounterOptions): Promise<GetArticleCounterResponse> =>
  fetch(`${getFetchPrefix(serverURL)}article?lang=${lang}`, {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify({ identifier, type, action }),
  })
    .then(
      (resp) => resp.json() as Promise<{ data: GetArticleCounterResponse } & ErrorStatusResponse>,
    )
    .then((data) => errorCheck(data, 'Update counter').data);
