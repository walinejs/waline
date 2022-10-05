import { useStorage } from '@vueuse/core';

import type { Ref } from 'vue';

const VOTE_KEY = 'WALINE_VOTE';

export const VOTE_IDENTIFIER = 'id';
export const VOTE_INDEX = 'i';

export interface VoteLogItem {
  [VOTE_IDENTIFIER]: string;
  [VOTE_INDEX]: number;
}

export type VoteRef = Ref<VoteLogItem[]>;

let voteStorage: VoteRef | null = null;

export const useVoteStorage = (): VoteRef =>
  (voteStorage ??= useStorage<VoteLogItem[]>(VOTE_KEY, []));
