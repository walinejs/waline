import { useStorage } from '@vueuse/core';
import type { Ref } from 'vue';

const LIKE_KEY = 'WALINE_LIKE';

export type LikeID = number | string;

export type LikeRef = Ref<LikeID[]>;

const likeStorage = useStorage<LikeID[]>(LIKE_KEY, []);

export const useLikeStorage = (): LikeRef => likeStorage;
