<template>
  <div v-if="reactionsInfo.length" class="wl-reaction">
    <div class="wl-reaction-title" v-text="locale.reactionTitle" />

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
import {
  type ComputedRef,
  computed,
  inject,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue';

import { LoadingIcon } from './Icons.js';
import { getArticleCounter, updateArticleCounter } from '../api/index.js';
import { useReactionStorage } from '../composables/index.js';
import { type WalineReactionLocale } from '../typings/index.js';
import { type WalineConfig } from '../utils/index.js';

defineExpose();

interface ReactionItem {
  icon: string;
  desc: string;
  active?: boolean;
}

const reactionStorage = useReactionStorage();
const config = inject<ComputedRef<WalineConfig>>('config')!;

const votingIndex = ref(-1);
const voteNumbers = ref<number[]>([]);

const locale = computed(() => config.value.locale);
const isReactionEnabled = computed(() => config.value.reaction.length > 0);

const reactionsInfo = computed<ReactionItem[]>(() => {
  const { reaction, path } = config.value;

  return reaction.map((icon, index) => ({
    icon,
    desc: locale.value[`reaction${index}` as keyof WalineReactionLocale],
    active: reactionStorage.value[path] === index,
  }));
});

let abort: () => void;

const fetchReaction = async (): Promise<void> => {
  if (isReactionEnabled.value) {
    const { serverURL, lang, path, reaction } = config.value;
    const controller = new AbortController();

    abort = controller.abort.bind(controller);

    const resp = await getArticleCounter({
      serverURL,
      lang,
      paths: [path],
      type: reaction.map((_reaction, index) => `reaction${index}`),
      signal: controller.signal,
    });

    // TODO: Remove this compact code
    if (Array.isArray(resp) || typeof resp === 'number') return;

    voteNumbers.value = reaction.map(
      (_reaction, index) => resp[`reaction${index}`],
    );
  }
};

const vote = async (index: number): Promise<void> => {
  // we should ensure that only one vote request is sent at a time
  if (votingIndex.value === -1) {
    const { serverURL, lang, path } = config.value;
    const currentVoteItemIndex = reactionStorage.value[path];

    // mark voting status
    votingIndex.value = index;

    // if user already vote current article, decrease the voted item number
    if (currentVoteItemIndex !== undefined) {
      await updateArticleCounter({
        serverURL,
        lang,
        path,
        type: `reaction${currentVoteItemIndex}`,
        action: 'desc',
      });

      voteNumbers.value[currentVoteItemIndex] = Math.max(
        voteNumbers.value[currentVoteItemIndex] - 1,
        0,
      );
    }

    // increase voting number if current reaction item is not been voted
    if (currentVoteItemIndex !== index) {
      await updateArticleCounter({
        serverURL,
        lang,
        path,
        type: `reaction${index}`,
      });
      voteNumbers.value[index] = (voteNumbers.value[index] || 0) + 1;
    }

    // update vote info in local storage
    if (currentVoteItemIndex === index) delete reactionStorage.value[path];
    else reactionStorage.value[path] = index;

    // voting is completed
    votingIndex.value = -1;
  }
};

onMounted(() => {
  watch(
    () => [config.value.serverURL, config.value.path],
    () => {
      void fetchReaction();
    },
    { immediate: true },
  );
});
onUnmounted(() => abort?.());
</script>
