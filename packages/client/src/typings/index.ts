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
  objectId: string;
  createdAt: string;
  insertedAt: string;
  updatedAt: string;
  children: Comment[];
  sticky?: boolean;
  browser?: string;
  os?: string;
}
