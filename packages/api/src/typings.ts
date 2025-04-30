export type WalineCommentStatus = 'approved' | 'waiting' | 'spam';

export type WalineUserType = 'administrator' | 'guest';

export interface WalineCommentData {
  /**
   * User Nickname
   */
  nick: string;

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
  // FIXME: Rename it to `path`
  url: string;

  /**
   * Parent comment id
   *
   * @description Only available when replying comment
   */

  pid?: number;

  /**
   * Root comment id
   *
   * @description Only available when replying comment
   */
  rid?: number;

  /**
   * User id being at
   *
   * @description Only available when replying comment
   */
  at?: string;

  /**
   * Recaptcha Token
   */
  // FIXME: Rename it to `verifyToken`
  recaptchaV3?: string;

  /**
   * Turnstile Token
   */
  turnstile?: string;
}

export interface BaseWalineResponseComment {
  /**
   * Comment object ID
   */
  objectId: number;

  /**
   * Timestamp of the comment
   */
  time: number;

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
  // FIXME: Rename it to `userId`
  // eslint-disable-next-line @typescript-eslint/naming-convention
  user_id?: number;

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

export interface WalineChildComment extends BaseWalineResponseComment {
  /**
   * Parent comment id
   */

  pid: number;

  /**
   * Root comment id
   */
  rid: number;

  /**
   * User id being at
   */
  at?: string;

  /**
   * Reply user information
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  reply_user?: {
    nick: string;
    link: string;
    avatar: string;
  };
}

export interface WalineRootComment extends BaseWalineResponseComment {
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

export type WalineComment = WalineRootComment | WalineChildComment;
