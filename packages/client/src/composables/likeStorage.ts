import { useStorage } from '@vueuse/core';

import type { Ref } from 'vue';

const LIKE_KEY = 'WALIKE_LIKE';

export type LikeID = number | string;

export type LikeRef = Ref<LikeID[]>;

export const useLikeStorage = (): LikeRef => useStorage<LikeID[]>(LIKE_KEY, []);
