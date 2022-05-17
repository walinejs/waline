import { useStorage } from '@vueuse/core';

import type { Ref } from 'vue';

const LIKE_KEY = 'WALINE_LIKE';

export type LikeID = number | string;

export type LikeRef = Ref<LikeID[]>;

let likeStorage: LikeRef | null = null;

export const useLikeStorage = (): LikeRef =>
  likeStorage || (likeStorage = useStorage<LikeID[]>(LIKE_KEY, []));
