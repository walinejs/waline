export interface WalineCommentData {
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

export interface WalineComment extends Exclude<WalineCommentData, 'ua'> {
  avatar: string;
  type?: string;
  objectId: string;
  createdAt: string;
  insertedAt: string;
  updatedAt: string;
  children: WalineComment[];
  sticky?: boolean;
  browser?: string;
  os?: string;
}
