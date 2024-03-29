---
title: API
icon: config
---

Waline 官方提供 `@waline/api` 包，以供官方客户端、第三方客户端开发者和用户调用 Waline 后端接口。

## API

```ts
interface BaseAPIOptions {
  /**
   * Waline 服务端地址
   *
   * Waline serverURL
   */
  serverURL: string;
  /**
   * 错误信息所使用的语言
   *
   * Language used in error text
   */
  lang: string;
}
interface ErrorStatusResponse {
  /**
   * 错误代码
   *
   * Error number
   */
  errno: number;
  /**
   * 错误消息
   *
   * Error msg
   */
  errmsg: string;
}

interface GetArticleCounterOptions extends BaseAPIOptions {
  /**
   * 待获取计数器的 path
   *
   * Path of counters
   */
  paths: string[];
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
type GetArticleCounterResponse =
  | Record<string, number>[]
  | Record<string, number>
  | number[]
  | number;
declare const getArticleCounter: ({
  serverURL,
  lang,
  paths,
  type,
  signal,
}: GetArticleCounterOptions) => Promise<GetArticleCounterResponse>;
interface UpdateArticleCounterOptions extends BaseAPIOptions {
  /**
   * 待更新计数器的 path
   *
   * Path of counter to be updated
   */
  path: string;
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
declare const updateArticleCounter: ({
  serverURL,
  lang,
  path,
  type,
  action,
}: UpdateArticleCounterOptions) => Promise<number[]>;

type WalineCommentStatus = 'approved' | 'waiting' | 'spam';
type WalineUserType = 'administrator' | 'guest';
interface WalineCommentData {
  /**
   * User Nickname
   */
  nick?: string;
  /**
   * User email
   */
  mail?: string;
  /**
   * User link
   */
  link?: string;
  /**
   * Content of comment
   */
  comment: string;
  /**
   * User Agent
   */
  ua: string;
  /**
   * Comment page path
   */
  url: string;
  /**
   * Parent comment id
   *
   * @description Only available when replying comment
   */
  pid?: string;
  /**
   * Root comment id
   *
   * @description Only available when replying comment
   */
  rid?: string;
  /**
   * User id being at
   *
   * @description Only available when replying comment
   */
  at?: string;
  /**
   * Recaptcha Token
   */
  recaptchaV3?: string;
  /**
   * Turnstile Token
   */
  turnstile?: string;
}
interface BaseWalineResponseComment {
  /**
   * Comment object ID
   */
  objectId: string;
  /**
   * Time ISOString when the comment is created
   */
  createdAt: string;
  /**
   * Time ISOString when the comment is inserted
   */
  insertedAt: string;
  /**
   * Time ISOString when the comment is updated
   */
  updatedAt: string;
  /**
   * Content of comment
   */
  comment: string;
  /**
   * Original comment content
   *
   * 原始评论内容
   */
  orig: string;
  /**
   * Comment like number
   *
   * 评论喜欢数
   */
  like: number;
  /**
   * User Nickname
   */
  nick: string;
  /**
   * User link
   */
  link: string;
  /**
   * User avatar
   */
  avatar: string;
  /**
   * User type
   *
   * @description Only available with logged in user
   *
   * 用户类型
   *
   * @description 仅在登录用户时可用
   */
  type?: WalineUserType;
  /**
   * User ID
   *
   * @description Only available with logged in user
   *
   * 用户 ID
   *
   * @description 仅在登录用户时可用
   */
  user_id?: string;
  /**
   * User location
   *
   * @description Not available with `DISABLE_REGION=true`
   *
   * 用户位置
   *
   * @description `DISABLE_REGION=true` 时不可用
   */
  addr?: string;
  /**
   * User browser
   *
   * @description Not available with `DISABLE_USERAGENT=true`
   *
   * 用户浏览器
   *
   * @description `DISABLE_USERAGENT=true` 时不可用
   */
  browser?: string;
  /**
   * User location
   *
   * @description Not available with `DISABLE_USERAGENT=true`
   *
   * 用户位置
   *
   * @description `DISABLE_USERAGENT=true` 时不可用
   */
  os?: string;
  /**
   * User level
   *
   * @description Only available when `LEVELS` is set
   *
   * 用户等级
   *
   * @description 仅在 `LEVELS` 设置时可用
   */
  level?: number;
  /**
   * User label
   *
   * 用户标签
   */
  label?: string;
  /**
   * Comment status
   *
   * @description For administrators, `approved` `spam` `waiting` can be get, for others, the only value is `approved`
   *
   * 评论状态
   *
   * @description 管理员可获得 `approved`、`spam` 和 `waiting`，其他用户只能获得 `approved`
   */
  status?: WalineCommentStatus;
}
interface WalineChildComment extends BaseWalineResponseComment {
  /**
   * Parent comment id
   */
  pid: string;
  /**
   * Root comment id
   */
  rid: string;
  /**
   * User id being at
   */
  at?: string;
}
interface WalineRootComment extends BaseWalineResponseComment {
  /**
   * Whether the comment is sticky
   *
   * 是否置顶
   */
  sticky: boolean;
  /**
   * Child comments
   *
   * 子评论
   */
  children: WalineChildComment[];
}
type WalineComment = WalineRootComment | WalineChildComment;

interface GetCommentOptions extends BaseAPIOptions {
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
interface GetCommentResponse {
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
declare const getComment: ({
  serverURL,
  lang,
  path,
  page,
  pageSize,
  sortBy,
  signal,
  token,
}: GetCommentOptions) => Promise<GetCommentResponse>;
interface AddCommentOptions extends BaseAPIOptions {
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
interface AddCommentResponse extends ErrorStatusResponse {
  /**
   * 渲染好的评论数据
   *
   * Comment data rendered
   */
  data?: WalineComment;
}
declare const addComment: ({
  serverURL,
  lang,
  token,
  comment,
}: AddCommentOptions) => Promise<AddCommentResponse>;
interface DeleteCommentOptions extends BaseAPIOptions {
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
  objectId: string | number;
}
interface DeleteCommentResponse extends ErrorStatusResponse {
  data: '';
}
declare const deleteComment: ({
  serverURL,
  lang,
  token,
  objectId,
}: DeleteCommentOptions) => Promise<DeleteCommentResponse>;
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
interface UpdateCommentOptions extends BaseAPIOptions {
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
interface UpdateCommentResponse extends ErrorStatusResponse {
  /**
   * 更新后的评论数据
   *
   * Comment data rendered
   */
  data: WalineComment;
}
declare const updateComment: ({
  serverURL,
  lang,
  token,
  objectId,
  comment,
}: UpdateCommentOptions) => Promise<UpdateCommentResponse>;

interface GetCommentCountOptions extends BaseAPIOptions {
  /**
   * 待获取评论数的 path
   *
   * Path of pages to be fetched
   */
  paths: string[];
  /**
   * 取消请求的信号
   *
   * AbortSignal to cancel request
   */
  signal?: AbortSignal;
}
declare const fetchCommentCount: ({
  serverURL,
  lang,
  paths,
  signal,
}: GetCommentCountOptions) => Promise<number[]>;

interface UserInfo {
  /**
   * 显示姓名
   *
   * User name displayed
   */
  display_name: string;
  /**
   * 用户电子邮件地址
   *
   * User email
   */
  email: string;
  /**
   * 用户网站地址
   *
   * User website
   */
  url: string;
  /**
   * 用户令牌
   *
   * User token
   */
  token: string;
  /**
   * 用户头像
   *
   * User avatar
   */
  avatar: string;
  /**
   * 用户邮箱 MD5
   *
   * MD5 of User email
   */
  mailMd5: string;
  /**
   * 用户对象 ID
   *
   * User object ID
   */
  objectId: string | number;
  /**
   * 用户身份
   *
   * User role
   */
  type: 'administrator' | 'guest';
}
declare const login: ({ lang, serverURL }: BaseAPIOptions) => Promise<
  UserInfo & {
    remember: boolean;
  }
>;

interface GetPageviewOptions extends BaseAPIOptions {
  /**
   * 待获取页面的 path
   *
   * Path of pages
   */
  paths: string[];
  /**
   * 取消请求的信号
   *
   * AbortSignal to cancel request
   */
  signal?: AbortSignal;
}
declare const getPageview: ({
  serverURL,
  lang,
  paths,
  signal,
}: GetPageviewOptions) => Promise<number[]>;
interface UpdatePageviewOptions extends BaseAPIOptions {
  /**
   * 待更新页面的 path
   *
   * Path of pages
   */
  path: string;
}
declare const updatePageview: (
  options: UpdatePageviewOptions,
) => Promise<number[]>;

interface GetRecentCommentOptions extends BaseAPIOptions {
  /**
   * 获取评论的数量
   *
   * Comment number to be fetched
   */
  count: number;
  /**
   * 取消请求的信号
   *
   * AbortSignal to cancel request
   */
  signal?: AbortSignal;
  /**
   * 用户令牌
   *
   * User token
   */
  token?: string;
}
interface RecentCommentData extends BaseWalineResponseComment {
  /**
   * Page url where comment locales
   *
   * 评论所在页面地址
   */
  url: string;
}
declare const getRecentComment: ({
  serverURL,
  lang,
  count,
  signal,
  token,
}: GetRecentCommentOptions) => Promise<RecentCommentData[]>;

interface GetUserListOptions extends BaseAPIOptions {
  /**
   * 每页个数
   *
   * Number per page
   */
  pageSize: number;
  /**
   * 取消请求的信号
   *
   * AbortSignal to cancel request
   */
  signal?: AbortSignal;
}
interface WalineUser
  extends Pick<WalineComment, 'nick' | 'link' | 'avatar' | 'label' | 'level'> {
  count: number;
}
interface GetUserListResponse extends ErrorStatusResponse {
  data: WalineUser[];
}
declare const getUserList: ({
  serverURL,
  signal,
  pageSize,
  lang,
}: GetUserListOptions) => Promise<WalineUser[]>;

export {
  type AddCommentOptions,
  type AddCommentResponse,
  type BaseWalineResponseComment,
  type DeleteCommentOptions,
  type DeleteCommentResponse,
  type GetArticleCounterOptions,
  type GetArticleCounterResponse,
  type GetCommentCountOptions,
  type GetCommentOptions,
  type GetCommentResponse,
  type GetRecentCommentOptions,
  type GetUserListOptions,
  type GetUserListResponse,
  type RecentCommentData,
  type UpdateArticleCounterOptions,
  type UpdateCommentOptions,
  type UpdateCommentResponse,
  type UpdatePageviewOptions,
  type UserInfo,
  type WalineChildComment,
  type WalineComment,
  type WalineCommentData,
  type WalineCommentStatus,
  type WalineRootComment,
  type WalineUser,
  type WalineUserType,
  addComment,
  deleteComment,
  fetchCommentCount,
  getArticleCounter,
  getComment,
  getPageview,
  getRecentComment,
  getUserList,
  login,
  updateArticleCounter,
  updateComment,
  updatePageview,
};
```
