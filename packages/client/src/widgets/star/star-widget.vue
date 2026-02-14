<template>
  <div class="wl-star">
    <div
      ref="ratingArea"
      class="wl-star-rate"
      @mousemove="onMouseMove"
      @mouseleave="onMouseLeave"
      @click="onClick"
    >
      <StarDisplay :score="displayScore" />
    </div>

    <div class="wl-star-score">
      <div v-for="score in [5, 4, 3, 2, 1]" :key="score" class="wl-star-row">
        <div class="wl-star-rate">
          <StarDisplay :score="score" />
        </div>
        <div class="wl-star-progress">
          <div
            class="wl-star-progress-bar"
            :style="{ width: percentText(score) }"
            :data-count="countFor(score).toString()"
          />
        </div>
        <span class="wl-star-percent">{{ percentText(score) }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, h } from 'vue';
import { watchImmediate } from '@vueuse/core';
import StarDisplay from './star-display.vue';
import { updateArticleCounter } from '@waline/api';
import { useReactionStorage } from '../../composables';
import { clampScore, fetchReaction, normalizeDistribution } from './utils';

export default defineComponent({
  name: 'WalineStarWidget',
  components: {
    StarDisplay,
  },
  props: {
    path: {
      type: String,
      default: '',
    },
    serverURL: {
      type: String,
      default: '',
    },
    lang: {
      type: String,
      default: '',
    },
  },
  emits: ['rate'],
  setup(props, { emit }) {
    const ratingArea = ref<HTMLElement | null>(null);
    const reactionStorage = useReactionStorage();
    const selectedScore = ref(clampScore((reactionStorage.value[props.path] ?? 0) + 1));
    const hoverScore = ref<number | null>(null);
    const internalDistribution = ref(normalizeDistribution([]));
    const isVoting = ref(false);

    onMounted(() => {
      watchImmediate(
        () => [props.serverURL, props.path],
        async () => {
          try {
            const reaction = await fetchReaction({
              serverURL: props.serverURL,
              path: props.path,
              lang: props.lang,
            });
            internalDistribution.value = normalizeDistribution(reaction.value);
          } catch (err) {
            // eslint-disable-next-line no-console
            console.error('Failed to fetch reaction data:', err);
          }
        },
      );
    });

    const displayScore = computed(() => hoverScore.value ?? selectedScore.value);

    const totalCount = computed(() =>
      internalDistribution.value.reduce((sum, count) => sum + count, 0),
    );

    const scorePercents = computed(() =>
      internalDistribution.value.map((count) => (totalCount.value ? count / totalCount.value : 0)),
    );

    const getScoreFromEvent = (event: MouseEvent): number => {
      if (!ratingArea.value) return 0;
      const { firstElementChild, lastElementChild } = ratingArea.value;
      if (!firstElementChild || !lastElementChild) {
        return 0;
      }
      const { left } = (firstElementChild as Element).getBoundingClientRect();
      const { right } = (lastElementChild as Element).getBoundingClientRect();
      const width = right - left;
      const ratio = (event.clientX - left) / width;
      const rawScore = Math.min(1, Math.max(0, ratio)) * 5;
      return clampScore(rawScore);
    };

    const onMouseMove = (event: MouseEvent): void => {
      hoverScore.value = getScoreFromEvent(event);
    };

    const onMouseLeave = (): void => {
      hoverScore.value = null;
    };

    const onClick = async (event: MouseEvent): Promise<void> => {
      const nextScore = hoverScore.value ?? getScoreFromEvent(event);
      if (nextScore === selectedScore.value || isVoting.value) {
        return;
      }

      isVoting.value = true;
      const prevScore = selectedScore.value;
      const options = {
        serverURL: props.serverURL,
        lang: props.lang,
        path: props.path,
      };

      try {
        if (prevScore) {
          await updateArticleCounter({
            ...options,
            type: `reaction${prevScore - 1}`,
            action: 'desc',
          });
          internalDistribution.value[prevScore - 1] = Math.max(
            0,
            (internalDistribution.value[prevScore - 1] ?? 0) - 1,
          );
        }

        selectedScore.value = nextScore;
        const nextScoreKeyIndex = nextScore - 1;
        reactionStorage.value[props.path] = nextScoreKeyIndex;
        await updateArticleCounter({
          serverURL: props.serverURL,
          lang: props.lang,
          path: props.path,
          type: `reaction${nextScoreKeyIndex}`,
          action: 'inc',
        });
        internalDistribution.value[nextScoreKeyIndex] =
          (internalDistribution.value[nextScoreKeyIndex] ?? 0) + 1;

        emit('rate', nextScore);
      } catch (err) {
        // Revert optimistic UI update on failure
        selectedScore.value = prevScore;
        if (prevScore) {
          reactionStorage.value[props.path] = prevScore - 1;
        } else {
          delete reactionStorage.value[props.path];
        }
        console.error('[Waline] Failed to update reaction counter', err);
      } finally {
        isVoting.value = false;
      }
    };

    function countFor(score: number) {
      return internalDistribution.value[score - 1] ?? 0;
    }

    function percentText(score: number) {
      const percent = scorePercents.value[score - 1] ?? 0;
      return `${(percent * 100).toFixed(1)}%`;
    }

    return {
      ratingArea,
      displayScore,
      onMouseMove,
      onMouseLeave,
      onClick,
      countFor,
      percentText,
    };
  },
});
</script>
