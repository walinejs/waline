import { fetchArticleCounter, updateArticleCounter } from './articleCounter';

interface FetchPageviewOptions {
  serverURL: string;
  lang: string;
  paths: string[];
  signal: AbortSignal;
}

export const fetchPageviews = ({
  serverURL,
  lang,
  paths,
  signal,
}: FetchPageviewOptions): Promise<number[]> =>
  fetchArticleCounter({
    serverURL,
    lang,
    paths,
    type: ['time'],
    signal,
  })
    // TODO: Improve this API
    .then((counts) => (Array.isArray(counts) ? counts : [counts])) as Promise<
    number[]
  >;

export interface UpdatePageviewOptions {
  serverURL: string;
  lang: string;
  path: string;
  action?: 'inc' | 'desc';
}

export const updatePageviews = (
  options: UpdatePageviewOptions
): Promise<number> =>
  updateArticleCounter({
    ...options,
    type: 'time',
  });
