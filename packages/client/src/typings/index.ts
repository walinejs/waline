export interface CommentData {
  nick: string;
  mail: string;
  link?: string;
  comment: string;
  ua: string;

  pid?: string;
  rid?: string;
  at?: string;
  url: string;
}

export interface Comment extends Exclude<CommentData, 'ua'> {
  avatar?: string;
  browser: string;
  createAt: string;
  insertAt: string;
  updateAt: string;
  objectId: string;
  children?: Comment[];
  sticky?: boolean;
}
