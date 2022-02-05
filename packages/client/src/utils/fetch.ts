import type { Comment, CommentData } from '../typings';

export interface FetchErrorData {
  errno: number;
  errmsg: string;
}

const errorCheck = <T = unknown>(data: T | FetchErrorData, name = ''): T => {
  if (typeof data === 'object' && (data as FetchErrorData).errno)
    throw new TypeError(
      `Fetch ${name} failed with ${(data as FetchErrorData).errno}: ${
        (data as FetchErrorData).errmsg
      }`
    );

  return data as T;
};

export interface FetchCountOptions {
  serverURL: string;
  paths: string[];
  signal: AbortSignal;
  token?: string;
}

export const fetchCommentCount = ({
  serverURL,
  paths,
  signal,
  token,
}: FetchCountOptions): Promise<number[]> => {
  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;

  return (
    fetch(
      `${serverURL}/comment?type=count&url=${encodeURIComponent(
        paths.join(',')
      )}`,
      { signal, headers }
    )
      .then((resp) => resp.json() as Promise<number | number[]>)
      .then((data) => errorCheck(data, 'comment count'))
      // TODO: Improve this API
      .then((counts) => (Array.isArray(counts) ? counts : [counts]))
  );
};
export interface FetchRecentOptions {
  serverURL: string;
  count: number;
  signal: AbortSignal;
  token?: string;
}

export const fetchRecentComment = ({
  serverURL,
  count,
  signal,
  token,
}: FetchRecentOptions): Promise<Comment[]> => {
  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;

  return fetch(`${serverURL}/comment?type=recent&count=${count}`, {
    signal,
    headers,
  })
    .then((resp) => resp.json() as Promise<Comment[]>)
    .then((data) => errorCheck(data, 'recent comment'));
};

export interface FetchListOptions {
  serverURL: string;
  path: string;
  page: number;
  pageSize: number;
  signal: AbortSignal;
  token?: string;
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
  token,
}: FetchListOptions): Promise<FetchListResult> => {
  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;

  return fetch(
    `${serverURL}/comment?path=${encodeURIComponent(
      path
    )}&pageSize=${pageSize}&page=${page}`,
    { signal, headers }
  )
    .then((resp) => resp.json() as Promise<FetchListResult>)
    .then((data) => errorCheck(data, 'comment list'));
};

export interface PostCommentOptions {
  serverURL: string;
  lang: string;
  token?: string;
  comment: CommentData;
}

export interface PostCommentResponse {
  data?: CommentData;
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
    .then((data) => errorCheck(data, 'visit count'))
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
    .then((data) => errorCheck(data, 'visit count'));
