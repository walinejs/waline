<script setup lang="ts">
import { watchImmediate } from '@vueuse/core';
import { updateArticleCounter } from '@waline/api';
import { ref, computed, onMounted } from 'vue';

import { useReactionStorage } from '../../composables';
import { clampScore, fetchReaction, normalizeDistribution } from './utils';
import WalineStarDisplay from './WalineStarDisplay.vue';

// oxlint-disable-next-line vue/define-props-destructuring
const props = defineProps<{
  serverURL: string;
  lang?: string;
  path: string;
}>();

const emit = defineEmits<{
  (event: 'rate', score: number): void;
}>();

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
        const reaction = await fetchReaction(props);
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

  if (!firstElementChild || !lastElementChild) return 0;

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

  if (nextScore === selectedScore.value || isVoting.value) return;

  isVoting.value = true;
  const prevScore = selectedScore.value;

  try {
    if (prevScore) {
      await updateArticleCounter({
        ...props,
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
      ...props,
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
      // oxlint-disable-next-line typescript/no-dynamic-delete
      delete reactionStorage.value[props.path];
    }

    // oxlint-disable-next-line no-console
    console.error('[Waline] Failed to update reaction counter', err);
  } finally {
    isVoting.value = false;
  }
};

const countFor = (score: number): number => internalDistribution.value[score - 1] ?? 0;

const percentText = (score: number): string => {
  const percent = scorePercents.value[score - 1] ?? 0;
  return `${(percent * 100).toFixed(1)}%`;
};
</script>

<template>
  <div class="wl-star">
    <div
      ref="ratingArea"
      class="wl-star-rate"
      @mousemove="onMouseMove"
      @mouseleave="onMouseLeave"
      @click="onClick"
    >
      <WalineStarDisplay :score="displayScore" />
    </div>

    <div class="wl-star-score">
      <div v-for="score in [5, 4, 3, 2, 1]" :key="score" class="wl-star-row">
        <div class="wl-star-rate">
          <WalineStarDisplay :score="score" />
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
