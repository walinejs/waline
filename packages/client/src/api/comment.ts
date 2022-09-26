import { JSON_HEADERS, errorCheck } from './utils';
import type { WalineComment, WalineCommentData } from '../typings';

export interface FetchCommentOptions {
  serverURL: string;
  path: string;
  page: number;
  pageSize: number;
  sortBy: string;
  signal: AbortSignal;
  token?: string;
  lang: string;
}

export interface CommentData {
  count: number;
  data: WalineComment[];
  totalPages: number;
}

export const fetchComment = ({
  serverURL,
  lang,
  path,
  page,
  pageSize,
  sortBy,
  signal,
  token,
}: FetchCommentOptions): Promise<CommentData> => {
  const headers: Record<string, string> = {};

  if (token) headers.Authorization = `Bearer ${token}`;

  return fetch(
    `${serverURL}/comment?path=${encodeURIComponent(
      path
    )}&pageSize=${pageSize}&page=${page}&lang=${lang}&sortBy=${sortBy}`,
    { signal, headers }
  )
    .then((resp) => resp.json() as Promise<CommentData>)
    .then((data) => errorCheck(data, 'comment data'));
};

export interface PostCommentOptions {
  serverURL: string;
  lang: string;
  token?: string;
  comment: WalineCommentData;
}

export interface PostCommentResponse {
  data?: WalineComment;
  errmsg?: string;
}

export const postComment = ({
  serverURL,
  lang,
  token,
  comment,
}: PostCommentOptions): Promise<PostCommentResponse> => {
  const headers: Record<string, string> = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/json',
  };

  if (token) headers.Authorization = `Bearer ${token}`;

  if (comment.eid) {
    return fetch(`${serverURL}/comment/${comment.eid}?lang=${lang}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(comment),
    }).then((resp) => resp.json() as Promise<PostCommentResponse>);
  }

  return fetch(`${serverURL}/comment?lang=${lang}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(comment),
  }).then((resp) => resp.json() as Promise<PostCommentResponse>);
};

export interface DeleteCommentOptions {
  serverURL: string;
  lang: string;
  token: string;
  objectId: string | number;
}

export const deleteComment = ({
  serverURL,
  lang,
  token,
  objectId,
}: DeleteCommentOptions): Promise<void> =>
  fetch(`${serverURL}/comment/${objectId}?lang=${lang}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((resp) => resp.json() as Promise<void>);

export interface LikeCommentOptions {
  serverURL: string;
  lang: string;
  objectId: number | string;
  like: boolean;
}

export const likeComment = ({
  serverURL,
  lang,
  objectId,
  like,
}: LikeCommentOptions): Promise<void> =>
  fetch(`${serverURL}/comment/${objectId}?lang=${lang}`, {
    method: 'PUT',
    headers: JSON_HEADERS,
    body: JSON.stringify({ like }),
  }).then((resp) => resp.json() as Promise<void>);

export interface UpdateCommentOptions {
  serverURL: string;
  lang: string;
  token: string;
  objectId: number | string;
  status?: 'approved' | 'waiting' | 'spam';
  sticky?: number;
}

export const updateComment = ({
  serverURL,
  lang,
  token,
  objectId,
  ...data
}: UpdateCommentOptions): Promise<void> =>
  fetch(`${serverURL}/comment/${objectId}?lang=${lang}`, {
    method: 'PUT',
    headers: {
      ...JSON_HEADERS,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).then((resp) => resp.json() as Promise<void>);
