<template>
  <div v-if="reaction && reaction.length" class="wl-reaction">
    <h4 v-text="locale.reactionTitle" />
    <ul>
      <li
        v-for="(item, index) in reaction"
        :key="index"
        :class="{ active: item.active }"
        @click="vote(index)"
      >
        <div class="wl-reaction-img">
          <img :src="item.icon" :alt="item.desc" />
          <div class="wl-reaction-votes">{{ item.vote }}</div>
        </div>
        <div class="wl-reaction-text">{{ item.desc }}</div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  ComputedRef,
  computed,
  onMounted,
  onUnmounted,
  ref,
} from 'vue';
import { fetchArticleCounter, updateArticleCounter } from '../api';
import { useVoteStorage } from '../composables';
import type { WalineConfig } from '../utils';
import type { WalineLocale } from '../typings';

interface ReactionItem {
  icon: string;
  vote: number;
  desc: string;
  active?: boolean;
}

export default defineComponent({
  setup() {
    const votes = ref<ReactionItem['vote'][]>([]);
    const voteStorage = useVoteStorage();
    const config = inject<ComputedRef<WalineConfig>>('config')!;
    const locale = computed(() => config.value.locale);
    const reaction = computed((): ReactionItem[] => {
      const { reaction, path } = config.value;

      return (Array.isArray(reaction) ? reaction : []).map((icon, index) => ({
        icon,
        vote: votes.value[index] || 0,
        desc: locale.value[`reaction${index}` as keyof WalineLocale],
        active: Boolean(
          voteStorage.value.find(({ u, i }) => u === path && i === index)
        ),
      }));
    });

    const controller = new AbortController();

    const fetchCounter = async (): Promise<void> => {
      const { serverURL, lang, path, reaction } = config.value;

      if (!Array.isArray(reaction)) {
        return;
      }

      const resp = await fetchArticleCounter({
        serverURL,
        lang,
        paths: [path],
        type: reaction.map((_, k) => `reaction${k}`),
        signal: controller.signal,
      });

      if (Array.isArray(resp) || typeof resp === 'number') return;

      votes.value = reaction.map((_, k) => resp[`reaction${k}`]);
    };

    const vote = async (index: number): Promise<void> => {
      const { serverURL, lang, path } = config.value;
      const hasVoted = voteStorage.value.find(({ u }) => u === path);
      const hasVotedTheReaction = hasVoted && hasVoted.i === index;

      if (hasVotedTheReaction) return;

      await updateArticleCounter({
        serverURL,
        lang,
        path,
        type: `reaction${index}`,
      });

      votes.value[index] = (votes.value[index] || 0) + 1;
      if (hasVoted) {
        votes.value[hasVoted.i] = Math.max(votes.value[hasVoted.i] - 1, 0);
        updateArticleCounter({
          serverURL,
          lang,
          path,
          type: `reaction${hasVoted.i}`,
          action: 'desc',
        });

        hasVoted.i = index;
        voteStorage.value = Array.from(voteStorage.value);
      } else {
        voteStorage.value = [...voteStorage.value, { u: path, i: index }];
      }

      if (voteStorage.value.length > 50)
        voteStorage.value = voteStorage.value.slice(-50);
    };

    onMounted(() => fetchCounter());
    onUnmounted(() => controller.abort());

    return {
      reaction,
      locale,
      vote,
    };
  },
});
</script>
