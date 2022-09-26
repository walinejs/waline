import { JSON_HEADERS, errorCheck } from './utils';

export interface FetchArticleCounterOptions {
  serverURL: string;
  lang: string;
  paths: string[];
  signal: AbortSignal;
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
  serverURL: string;
  lang: string;
  path: string;
  type: string;
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
