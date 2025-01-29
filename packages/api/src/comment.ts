import type {
  WalineComment,
  WalineCommentData,
  WalineRootComment,
} from './typings.js';
import type { BaseAPIOptions, ErrorStatusResponse } from './utils.js';
import { JSON_HEADERS, errorCheck, getFetchPrefix } from './utils.js';

export interface GetCommentOptions extends BaseAPIOptions {
  /**
   * 待获取评论列表的 path
   *
   * Path of comment list
   */
  path: string;

  /**
   * 评论分页数
   *
   * Comment pagination number
   */
  page: number;

  /**
   * 每页评论个数
   *
   * Comment number per page
   */
  pageSize: number;

  /**
   * 排序方式
   *
   * Sort method
   */
  sortBy: string;

  /**
   * 用户令牌
   *
   * User token
   */
  token?: string;

  /**
   * 取消请求的信号
   *
   * AbortSignal to cancel request
   */
  signal?: AbortSignal;
}

export interface GetCommentResponse {
  /**
   * 评论数量
   *
   * Comment number
   */
  count: number;

  /**
   * 评论分页数
   *
   * Comment pagination number
   */
  page: number;

  /**
   * 每页评论个数
   *
   * Comment number per page
   */
  pageSize: number;

  /**
   * 评论数据
   *
   * Comment Data
   */
  data: WalineRootComment[];

  /**
   * 页面总数
   *
   * Page number
   */
  totalPages: number;
}

export const getComment = ({
  serverURL,
  lang,
  path,
  page,
  pageSize,
  sortBy,
  signal,
  token,
}: GetCommentOptions): Promise<GetCommentResponse> => {
  const headers: Record<string, string> = {};

  if (token) headers.Authorization = `Bearer ${token}`;

  return fetch(
    `${getFetchPrefix(serverURL)}comment?path=${encodeURIComponent(
      path,
    )}&pageSize=${pageSize}&page=${page}&lang=${lang}&sortBy=${sortBy}`,
    { signal, headers },
  )
    .then(
      (resp) =>
        resp.json() as Promise<
          { data: GetCommentResponse } & ErrorStatusResponse
        >,
    )
    .then((data) => errorCheck(data, 'Get comment data').data);
};

export interface AddCommentOptions extends BaseAPIOptions {
  /**
   * 用户令牌
   *
   * User token
   */
  token?: string;

  /**
   * 用户待提交的评论数据
   *
   * Comment data being submitted by user
   */
  comment: WalineCommentData;
}

export interface AddCommentResponse extends ErrorStatusResponse {
  /**
   * 渲染好的评论数据
   *
   * Comment data rendered
   */
  data?: WalineComment;
}

export const addComment = ({
  serverURL,
  lang,
  token,
  comment,
}: AddCommentOptions): Promise<AddCommentResponse> => {
  const headers: Record<string, string> = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/json',
  };

  if (token) headers.Authorization = `Bearer ${token}`;

  return fetch(`${getFetchPrefix(serverURL)}comment?lang=${lang}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(comment),
  }).then((resp) => resp.json() as Promise<AddCommentResponse>);
};

export interface DeleteCommentOptions extends BaseAPIOptions {
  /**
   * Auth token
   *
   * 认证令牌
   */
  token: string;

  /**
   * Comment objectId to be deleted
   *
   * 待删除的评论对象 ID
   */
  objectId: number;
}

export interface DeleteCommentResponse extends ErrorStatusResponse {
  data: '';
}

export const deleteComment = ({
  serverURL,
  lang,
  token,
  objectId,
}: DeleteCommentOptions): Promise<DeleteCommentResponse> =>
  fetch(`${getFetchPrefix(serverURL)}comment/${objectId}?lang=${lang}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((resp) => resp.json() as Promise<DeleteCommentResponse>)
    .then((resp) => errorCheck(resp, 'Delete comment'));

interface UpdateWalineCommentData extends Partial<WalineCommentData> {
  /**
   * 点赞还是取消点赞
   *
   * Like or dislike
   */
  like?: boolean;

  /**
   * 评论的状态
   *
   * Comment status
   */
  status?: 'approved' | 'waiting' | 'spam';

  /**
   * 评论指定状态
   *
   * Comment sticky status
   *
   * @description 0 means not sticky and 1 means sticky
   */
  sticky?: 0 | 1;
}
export interface UpdateCommentOptions extends BaseAPIOptions {
  /**
   * 用户令牌
   *
   * User token
   */
  token: string;

  /**
   * 评论的 ID
   *
   * Comment ID
   */
  objectId: number;

  /**
   * 评论数据
   *
   * Comment data
   */
  comment?: UpdateWalineCommentData;
}

export interface UpdateCommentResponse extends ErrorStatusResponse {
  /**
   * 更新后的评论数据
   *
   * Comment data rendered
   */
  data: WalineComment;
}

export const updateComment = ({
  serverURL,
  lang,
  token,
  objectId,
  comment,
}: UpdateCommentOptions): Promise<UpdateCommentResponse> =>
  fetch(`${getFetchPrefix(serverURL)}comment/${objectId}?lang=${lang}`, {
    method: 'PUT',
    headers: {
      ...JSON_HEADERS,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(comment),
  })
    .then((resp) => resp.json() as Promise<UpdateCommentResponse>)
    .then((resp) => errorCheck(resp, 'Update comment'));
