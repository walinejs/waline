import { useStorage } from '@vueuse/core';

import type { Ref } from 'vue';

const VOTE_KEY = 'WALINE_VOTE';

export interface VoteLogItem {
  u: string;
  i: number;
}

export type VoteRef = Ref<VoteLogItem[]>;

let voteStorage: VoteRef | null = null;

export const useVoteStorage = (): VoteRef =>
  voteStorage || (voteStorage = useStorage<VoteLogItem[]>(VOTE_KEY, []));
