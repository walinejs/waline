<template>
  <span v-for="val in [1, 2, 3, 4, 5]" :key="val" class="wl-star-item">
    <svg class="wl-star-icon" viewBox="0 0 24 24">
      <path
        :class="displayClass(val)"
        d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"
      />
    </svg>
  </span>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { clampScore } from './utils';

export default defineComponent({
  name: 'WalineStarDisplay',
  props: {
    score: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    // clampScore should be available in the consuming module scope
    const displayScore = computed(() => clampScore(props.score));

    const displayClass = (val: number) =>
      displayScore.value >= val ? 'wl-star-solid' : 'wl-star-outline';

    return {
      displayScore,
      displayClass,
    };
  },
});
</script>
