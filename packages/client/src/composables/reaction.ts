import { useStorage } from '@vueuse/core';
import type { Ref } from 'vue';

const REACTION_KEY = 'WALINE_REACTION';

export type WalineReactionStore = Record<
  /* VOTE_IDENTIFIER */ string,
  number | undefined
>;

export type VoteRef = Ref<WalineReactionStore>;

let reactionStorage: VoteRef | null = null;

export const useReactionStorage = (): VoteRef =>
  (reactionStorage ??= useStorage<WalineReactionStore>(REACTION_KEY, {}));
