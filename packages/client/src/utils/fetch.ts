import type { Comment, CommentData } from '../typings';

export interface FetchErrorData {
  errno: number;
  errmsg: string;
}

const errorCheck = <T = unknown>(
  data: T | FetchErrorData,
  fallback: T,
  name = ''
): T => {
  if (typeof data === 'object' && (data as FetchErrorData).errno) {
    console.error(
      `Fetch ${name} failed with ${(data as FetchErrorData).errno}: ${
        (data as FetchErrorData).errmsg
      }`
    );

    return fallback;
  }

  return data as T;
};

export interface FetchCountOptions {
  serverURL: string;
  paths: string[];
  signal: AbortSignal;
}

export const fetchCommentCount = ({
  serverURL,
  paths,
  signal,
}: FetchCountOptions): Promise<number[]> =>
  fetch(
    `${serverURL}/comment?type=count&url=${encodeURIComponent(
      paths.join(',')
    )}`,
    { signal }
  )
    .then((resp) => resp.json() as Promise<number | number[]>)
    .then((data) =>
      errorCheck(data, new Array(paths.length).fill(0), 'comment count')
    )
    // TODO: Improve this API
    .then((counts) => (Array.isArray(counts) ? counts : [counts]));

export interface FetchRecentOptions {
  serverURL: string;
  count: number;
  signal: AbortSignal;
}

export const fetchRecentComment = ({
  serverURL,
  count,
  signal,
}: FetchRecentOptions): Promise<Comment[]> =>
  fetch(`${serverURL}/comment?type=recent&count=${count}`, { signal })
    .then((resp) => resp.json() as Promise<Comment[]>)
    .then((data) => errorCheck(data, [], 'recent comment'));

export interface FetchListOptions {
  serverURL: string;
  path: string;
  page: number;
  pageSize: number;
  signal: AbortSignal;
}

export interface FetchListResult {
  count: number;
  data: Comment[];
  totalPages: number;
}

export const fetchCommentList = ({
  serverURL,
  path,
  page,
  pageSize,
  signal,
}: FetchListOptions): Promise<FetchListResult> =>
  fetch(
    `${serverURL}/comment?path=${encodeURIComponent(
      path
    )}&pageSize=${pageSize}&page=${page}`,
    { signal }
  )
    .then((resp) => resp.json() as Promise<FetchListResult>)
    .then((data) =>
      errorCheck(data, { count: 0, data: [], totalPages: 0 }, 'comment list')
    );

export interface PostCommentOptions {
  serverURL: string;
  lang: string;
  token?: string;
  comment: CommentData;
}

export interface PostCommentResponse {
  data: CommentData;
  errmsg?: string;
}

export const postComment = ({
  serverURL,
  lang,
  token,
  comment,
}: PostCommentOptions): Promise<PostCommentResponse> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) headers.Authorization = `Bearer ${token}`;

  return fetch(`${serverURL}/comment?lang=${lang}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(comment),
  }).then((resp) => resp.json() as Promise<PostCommentResponse>);
};

export interface FetchVisitCountOptions {
  serverURL: string;
  paths: string[];
  signal: AbortSignal;
}

export const fetchVisitCount = ({
  serverURL,
  paths,
  signal,
}: FetchVisitCountOptions): Promise<number[]> =>
  fetch(`${serverURL}/article?path=${encodeURIComponent(paths.join(','))}`, {
    signal,
  })
    .then((resp) => resp.json() as Promise<number[] | number>)
    .then((data) =>
      errorCheck(data, new Array(paths.length).fill(0), 'visit count')
    )
    // TODO: Improve this API
    .then((counts) => (Array.isArray(counts) ? counts : [counts]));

export interface PostVisitCountOptions {
  serverURL: string;
  path: string;
}

export const postVisitCount = ({
  serverURL,
  path,
}: PostVisitCountOptions): Promise<number> =>
  fetch(`${serverURL}/article`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ path }),
  })
    .then((resp) => resp.json() as Promise<number>)
    .then((data) => errorCheck(data, 0, 'visit count'));
