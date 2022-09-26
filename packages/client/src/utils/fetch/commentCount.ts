import { errorCheck } from './utils';

export interface FetchCommentCountOptions {
  serverURL: string;
  lang: string;
  paths: string[];
  signal: AbortSignal;
  token?: string;
}

export const fetchCommentCount = ({
  serverURL,
  lang,
  paths,
  signal,
  token,
}: FetchCommentCountOptions): Promise<number[]> => {
  const headers: Record<string, string> = {};

  if (token) headers.Authorization = `Bearer ${token}`;

  return (
    fetch(
      `${serverURL}/comment?type=count&url=${encodeURIComponent(
        paths.join(',')
      )}&lang=${lang}`,
      { signal, headers }
    )
      .then((resp) => resp.json() as Promise<number | number[]>)
      .then((data) => errorCheck(data, 'comment count'))
      // TODO: Improve this API
      .then((counts) => (Array.isArray(counts) ? counts : [counts]))
  );
};
