<template>
  <div v-if="reactionsInfo.length" class="wl-reaction">
    <h4 v-text="locale.reactionTitle" />

    <ul class="wl-reaction-list">
      <li
        v-for="({ active, icon, desc }, index) in reactionsInfo"
        :key="index"
        class="wl-reaction-item"
        :class="{ active }"
        @click="vote(index)"
      >
        <div class="wl-reaction-img">
          <img :src="icon" :alt="desc" />

          <LoadingIcon
            v-if="votingIndex === index"
            class="wl-reaction-loading"
          />

          <div
            v-else
            class="wl-reaction-votes"
            v-text="voteNumbers[index] || 0"
          />
        </div>

        <div class="wl-reaction-text" v-text="desc" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, ref, watch } from 'vue';

import { LoadingIcon } from './Icons.js';
import { getArticleCounter, updateArticleCounter } from '../api/index.js';
import {
  VOTE_IDENTIFIER,
  VOTE_INDEX,
  useVoteStorage,
} from '../composables/index.js';

import type { ComputedRef } from 'vue';
import type { WalineConfig } from '../utils/index.js';

defineExpose();

interface ReactionItem {
  icon: string;
  desc: string;
  active?: boolean;
}

const voteStorage = useVoteStorage();
const config = inject<ComputedRef<WalineConfig>>('config')!;

const votingIndex = ref(-1);
const voteNumbers = ref<number[]>([]);

const locale = computed(() => config.value.locale);
const isReactionEnabled = computed(() => config.value.reaction.length > 0);

const reactionsInfo = computed<ReactionItem[]>(() => {
  const { reaction, path } = config.value;

  return reaction.map((icon, index) => ({
    icon,
    desc: locale.value[`reaction${index}`],
    active: voteStorage.value.some(
      ({ [VOTE_IDENTIFIER]: voteIdentifier, [VOTE_INDEX]: voteIndex }) =>
        voteIdentifier === path && voteIndex === index
    ),
  }));
});

let abort: () => void;

const fetchReaction = (): void => {
  if (isReactionEnabled.value) {
    const { serverURL, lang, path, reaction } = config.value;
    const controller = new AbortController();

    abort = controller.abort.bind(controller);

    getArticleCounter({
      serverURL,
      lang,
      paths: [path],
      type: reaction.map((_reaction, index) => `reaction${index}`),
      signal: controller.signal,
    }).then((resp) => {
      if (Array.isArray(resp) || typeof resp === 'number') return;

      voteNumbers.value = reaction.map(
        (_reaction, index) => resp[`reaction${index}`]
      );
    });
  }
};

const vote = async (index: number): Promise<void> => {
  const { serverURL, lang, path } = config.value;
  const currentArticle = voteStorage.value.find(
    ({ [VOTE_IDENTIFIER]: voteIdentifier }) => voteIdentifier === path
  );
  const hasVotedCurrentReaction = currentArticle?.[VOTE_INDEX] === index;

  votingIndex.value = index;

  if (!hasVotedCurrentReaction) {
    await updateArticleCounter({
      serverURL,
      lang,
      path,
      type: `reaction${index}`,
    });
    voteNumbers.value[index] = (voteNumbers.value[index] || 0) + 1;
  }

  if (currentArticle) {
    const cancelIndex = currentArticle[VOTE_INDEX];

    updateArticleCounter({
      serverURL,
      lang,
      path,
      type: `reaction${cancelIndex}`,
      action: 'desc',
    });

    voteNumbers.value[cancelIndex] = Math.max(
      voteNumbers.value[cancelIndex] - 1,
      0
    );
    currentArticle[VOTE_INDEX] = index;

    voteStorage.value = Array.from(voteStorage.value);
  } else
    voteStorage.value = [
      ...voteStorage.value,
      { [VOTE_IDENTIFIER]: path, [VOTE_INDEX]: index },
    ];

  if (voteStorage.value.length > 50)
    voteStorage.value = voteStorage.value.slice(-50);

  votingIndex.value = -1;
};

onMounted(() => {
  watch(
    () => [config.value.serverURL, config.value.path],
    () => {
      fetchReaction();
    },
    { immediate: true }
  );
});
onUnmounted(() => abort?.());
</script>
