import type { Config } from '../utils';
import { Ref } from 'vue';

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
  browser: string;
  createAt: string;
  insertAt: string;
  updateAt: string;
  objectId: string;
  children?: Comment[];
}
export type ConfigRef = Ref<Config>;
