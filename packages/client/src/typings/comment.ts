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
  user_id?: string | number;
  status?: 'approved' | 'waiting' | 'spam';
  like?: number;
}
