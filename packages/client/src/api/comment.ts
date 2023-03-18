import {
  type BaseAPIOptions,
  type ErrorStatusResponse,
  JSON_HEADERS,
  errorCheck,
} from './utils.js';
import {
  type WalineComment,
  type WalineCommentData,
} from '../typings/index.js';

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

export interface GetCommentResponse extends ErrorStatusResponse {
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
  data: WalineComment[];

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
    `${serverURL}/comment?path=${encodeURIComponent(
      path
    )}&pageSize=${pageSize}&page=${page}&lang=${lang}&sortBy=${sortBy}`,
    { signal, headers }
  )
    .then((resp) => <Promise<GetCommentResponse>>resp.json())
    .then((data) => errorCheck(data, 'Get comment data'));
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

  return fetch(`${serverURL}/comment?lang=${lang}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(comment),
  }).then((resp) => <Promise<AddCommentResponse>>resp.json());
};

export interface DeleteCommentOptions extends BaseAPIOptions {
  token: string;
  objectId: string | number;
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
  fetch(`${serverURL}/comment/${objectId}?lang=${lang}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((resp) => <Promise<DeleteCommentResponse>>resp.json())
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
  objectId: number | string;

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
  fetch(`${serverURL}/comment/${objectId}?lang=${lang}`, {
    method: 'PUT',
    headers: {
      ...JSON_HEADERS,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(comment),
  })
    .then((resp) => <Promise<UpdateCommentResponse>>resp.json())
    .then((resp) => errorCheck(resp, 'Update comment'));
