import { errorCheck } from './utils';
import type { WalineComment } from '../typings';

export interface FetchRecentCommentOptions {
  serverURL: string;
  lang: string;
  count: number;
  signal: AbortSignal;
  token?: string;
}

export const fetchRecentComment = ({
  serverURL,
  lang,
  count,
  signal,
  token,
}: FetchRecentCommentOptions): Promise<WalineComment[]> => {
  const headers: Record<string, string> = {};

  if (token) headers.Authorization = `Bearer ${token}`;

  return fetch(`${serverURL}/comment?type=recent&count=${count}&lang=${lang}`, {
    signal,
    headers,
  })
    .then((resp) => resp.json() as Promise<WalineComment[]>)
    .then((data) => errorCheck(data, 'recent comment'));
};
