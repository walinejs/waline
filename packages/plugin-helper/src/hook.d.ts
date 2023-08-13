import { type WalineCommentData } from '@waline/client';

export interface PreSaveHook {
  name: 'preSave';
  callback: (data: WalineCommentData) => void;
}

export interface PostSaveHook {
  name: 'postSave';
  callback: (
    comment: WalineCommentData,
    parentComment?: WalineCommentData
  ) => void;
}

export interface PreUpdateHook {
  name: 'preUpdate';
  callback: (data: WalineCommentData) => void;
}

export interface PostUpdateHook {
  name: 'postUpdate';
  callback: (data: WalineCommentData) => void;
}

export interface PreDeleteHook {
  name: 'preDelete';
  callback: (id: string | number) => void;
}

export interface PostDeleteHook {
  name: 'postDelete';
  callback: (id: string | number) => void;
}

export type Hooks =
  | PreSaveHook
  | PostSaveHook
  | PreUpdateHook
  | PostUpdateHook
  | PreDeleteHook
  | PostDeleteHook;

type PropertyType<T, K extends keyof T> = T extends any ? T[K] : never;
export type HooksName = PropertyType<Hooks, 'name'>;
export type HooksCallback = PropertyType<Hooks, 'callback'>;
