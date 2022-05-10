export interface WalineCommentData {
  /**
   * User Nickname
   */
  nick: string;

  /**
   * User email
   */
  mail: string;

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
   * Parent comment id
   */

  pid?: string;

  /**
   * Root comment id
   */
  rid?: string;

  /**
   * User id being at
   */
  at?: string;

  /**
   * Comment link
   */
  url: string;
}

export type WalineCommentStatus = 'approved' | 'waiting' | 'spam';

export interface WalineComment extends Exclude<WalineCommentData, 'ua'> {
  /**
   * User avatar
   */
  avatar: string;

  /**
   * User type
   */
  type?: 'administrator' | 'guest' | `verify:${string}`;

  objectId: string;

  /**
   * Time ISOString when the comment is created
   */
  createdAt: string;

  insertedAt: string;
  updatedAt: string;
  children: WalineComment[];
  sticky?: boolean;
  browser?: string;
  os?: string;
  level?: number;
  addr?: string;
  label?: string;
  // TODO: Rename it to `userId` in next major version
  // eslint-disable-next-line @typescript-eslint/naming-convention
  user_id?: string | number;
  status?: WalineCommentStatus;
  like?: number;
}
