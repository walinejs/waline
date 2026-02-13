import type { ComponentPublicInstance } from 'vue';
import { createApp, defineComponent, h, ref, computed, onMounted } from 'vue';

import { getRoot } from '../utils/index.js';
import { useReactionStorage } from '../composables/reaction.js';
import { watchImmediate } from '@vueuse/core';
import { getArticleCounter, updateArticleCounter } from '@waline/api';

const reactionStorage = useReactionStorage();

interface FetchReactionOption {
  serverURL: string;
  path: string;
  lang: string;
}
const fetchReaction = async ({
  serverURL,
  lang,
  path,
}: FetchReactionOption): Promise<{ value: number[]; abort: () => void }> => {
  const reaction = [1, 2, 3, 4, 5];
  const controller = new AbortController();

  const abort = controller.abort.bind(controller);

  const [reactionData] = (await getArticleCounter({
    serverURL,
    lang,
    paths: [path],
    type: [1, 2, 3, 4, 5].map((_, index) => `reaction${index}`),
    signal: controller.signal,
  })) as Record<string, number>[];

  return {
    value: reaction.map((_, index) => reactionData[`reaction${index}`]),
    abort,
  };
};

const clampScore = (score: number): number => {
  if (Number.isNaN(score)) return 0;
  const normalized = Math.round(score);
  return Math.min(5, Math.max(0, normalized));
};

const normalizeDistribution = (distribution: number[] = []): number[] =>
  Array.from({ length: 5 }, (_, index) => {
    const value = distribution[index] ?? 0;
    return typeof value === 'number' && value > 0 ? value : 0;
  });

const STAR_PATH =
  'M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z';

const StarDisplay = defineComponent({
  name: 'WalineStarDisplay',
  props: {
    score: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const displayScore = computed(() => clampScore(props.score));

    return () =>
      [1, 2, 3, 4, 5].map((val, index) =>
        h('span', { key: index, class: 'wl-star-item' }, [
          h('svg', { class: 'wl-star-icon', viewBox: '0 0 24 24' }, [
            h('path', {
              class: [displayScore.value >= val ? 'wl-star-solid' : 'wl-star-outline'],
              d: STAR_PATH,
            }),
          ]),
        ]),
      );
  },
});

interface StarExpose {
  setScore: (score: number) => void;
  setDistribution: (distribution: number[]) => void;
}

export interface WalineStarOptions {
  el: string | HTMLElement;
  path: string;
  lang: string;
  serverURL: string;
  onRate?: (score: number) => void;
}

export interface WalineStarResult {
  destroy: () => void;
}

const StarWidget = defineComponent({
  name: 'WalineStarWidget',
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
    const selectedScore = ref(clampScore(reactionStorage.value[props.path] ?? 0));
    const hoverScore = ref<number | null>(null);
    const internalDistribution = ref(normalizeDistribution([]));

    onMounted(() => {
      watchImmediate(
        () => [props.serverURL, props.path],
        async () => {
          const reaction = await fetchReaction({
            serverURL: props.serverURL,
            path: props.path,
            lang: props.lang,
          });
          internalDistribution.value = normalizeDistribution(reaction.value);
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
      const { left } = firstElementChild.getBoundingClientRect();
      const { right } = lastElementChild.getBoundingClientRect();
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
      const options = {
        serverURL: props.serverURL,
        lang: props.lang,
        path: props.path,
      };

      if (selectedScore.value) {
        await updateArticleCounter({
          ...options,
          type: `reaction${selectedScore.value}`,
          action: 'desc',
        });
      }

      selectedScore.value = nextScore;
      reactionStorage.value[props.path] = nextScore;
      await updateArticleCounter({
        serverURL: props.serverURL,
        lang: props.lang,
        path: props.path,
        type: `reaction${nextScore}`,
        action: 'inc',
      });

      emit('rate', nextScore);
    };

    return () =>
      h('div', { class: 'wl-star' }, [
        h(
          'div',
          {
            ref: ratingArea,
            class: ['wl-star-rate'],
            onMousemove: onMouseMove,
            onMouseleave: onMouseLeave,
            onClick,
          },
          [h(StarDisplay, { score: displayScore.value })],
        ),
        h(
          'div',
          { class: 'wl-star-score' },
          [5, 4, 3, 2, 1].map((score) => {
            const count = internalDistribution.value[score - 1] ?? 0;
            const percent = scorePercents.value[score - 1] ?? 0;
            const percentText = `${(percent * 100).toFixed(1)}%`;
            return h('div', { key: score, class: 'wl-star-row' }, [
              h('div', { class: ['wl-star-rate'] }, [h(StarDisplay, { score })]),
              h('div', { class: 'wl-star-progress' }, [
                h('div', {
                  class: 'wl-star-progress-bar',
                  style: { width: percentText },
                  'data-count': count.toString(),
                }),
              ]),
              h('span', { class: 'wl-star-percent' }, percentText),
            ]);
          }),
        ),
      ]);
  },
});

export const Star = ({
  el,
  path,
  lang,
  serverURL,
  onRate,
}: WalineStarOptions): WalineStarResult => {
  const root = getRoot(el);

  if (!root)
    return {
      destroy: () => {},
    };

  const app = createApp(StarWidget, {
    path,
    lang,
    serverURL,
    onRate,
  });

  app.mount(root) as ComponentPublicInstance<StarExpose>;

  return {
    destroy: (): void => {
      app.unmount();
      root.innerHTML = '';
    },
  };
};
