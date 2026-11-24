import { useStorage } from '@vueuse/core';
import type { Ref } from 'vue';

export const REACTION_STORAGE_KEY = 'WALINE_REACTION';

export type WalineReactionStore = Record</* VOTE_IDENTIFIER */ string, number | undefined>;

export type VoteRef = Ref<WalineReactionStore>;

const reactionStorage = useStorage<WalineReactionStore>(REACTION_STORAGE_KEY, {});

export const useReactionStorage = (): VoteRef => reactionStorage;
