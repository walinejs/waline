<template>
  <div v-if="reaction.length" class="wl-reaction">
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
  watch,
} from 'vue';
import { getArticleCounter, updateArticleCounter } from '../api';
import { VOTE_IDENTIFIER, VOTE_INDEX, useVoteStorage } from '../composables';
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

      return reaction.map((icon, index) => ({
        icon,
        vote: votes.value[index] || 0,
        desc: locale.value[`reaction${index}` as keyof WalineLocale],
        active: Boolean(
          voteStorage.value.find(
            ({ [VOTE_IDENTIFIER]: voteIdentifier, [VOTE_INDEX]: voteIndex }) =>
              voteIdentifier === path && voteIndex === index
          )
        ),
      }));
    });

    let abort: () => void;

    const fetchCounter = (): void => {
      const { serverURL, lang, path, reaction } = config.value;

      if (reaction.length) {
        const controller = new AbortController();

        getArticleCounter({
          serverURL,
          lang,
          paths: [path],
          type: reaction.map((_, k) => `reaction${k}`),
          signal: controller.signal,
        }).then((resp) => {
          if (Array.isArray(resp) || typeof resp === 'number') return;
          votes.value = reaction.map((_, k) => resp[`reaction${k}`]);
        });

        abort = controller.abort.bind(controller);
      }
    };

    const vote = async (index: number): Promise<void> => {
      const { serverURL, lang, path } = config.value;
      const hasVoted = voteStorage.value.find(
        ({ [VOTE_IDENTIFIER]: voteIdentifier }) => voteIdentifier === path
      );
      const hasVotedTheReaction = hasVoted && hasVoted[VOTE_INDEX] === index;

      if (hasVotedTheReaction) return;

      await updateArticleCounter({
        serverURL,
        lang,
        path,
        type: `reaction${index}`,
      });

      votes.value[index] = (votes.value[index] || 0) + 1;
      if (hasVoted) {
        votes.value[hasVoted[VOTE_INDEX]] = Math.max(
          votes.value[hasVoted[VOTE_INDEX]] - 1,
          0
        );
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
        voteStorage.value = [
          ...voteStorage.value,
          { [VOTE_IDENTIFIER]: path, [VOTE_INDEX]: index },
        ];
      }

      if (voteStorage.value.length > 50)
        voteStorage.value = voteStorage.value.slice(-50);
    };

    onMounted(() => {
      watch(
        () => [config.value.serverURL, config.value.path],
        () => {
          fetchCounter();
        },
        { immediate: true }
      );
    });
    onUnmounted(() => abort?.());

    return {
      reaction,
      locale,
      vote,
    };
  },
});
</script>
