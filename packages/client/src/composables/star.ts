import { useStorage } from '@vueuse/core';
import type { Ref } from 'vue';

import type { WalineReactionStore } from './reaction.js';

// Star ratings and article reactions use different value semantics, so they must not
// share the same storage key when both widgets are enabled on the same page.
export const STAR_STORAGE_KEY = 'WALINE_STAR';

const starStorage = useStorage<WalineReactionStore>(STAR_STORAGE_KEY, {});

export const useStarStorage = (): Ref<WalineReactionStore> => starStorage;
