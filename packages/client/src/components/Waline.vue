<template>
  <div data-waline>
    <CommentBox v-if="!reply" @submit="onSubmit" />
    <div class="wl-count">
      <span v-if="count" class="wl-num" v-text="count" />
      {{ i18n.comment }}
    </div>

    <div class="wl-cards">
      <CommentCard
        v-for="comment in data"
        :key="comment.objectId"
        :root-id="comment.objectId"
        :comment="comment"
        :reply="reply"
        @reply="onReply"
        @submit="onSubmit"
      />
    </div>

    <div v-if="status === 'error'" class="wl-operation">
      <button
        type="button"
        class="wl-btn"
        @click="refresh"
        v-text="i18n.refresh"
      />
    </div>

    <template v-else>
      <div v-if="status === 'loading'" class="wl-loading">
        <LoadingIcon :size="30" />
      </div>

      <div v-else-if="!data.length" class="wl-empty" v-text="i18n.sofa" />

      <!-- Load more button -->
      <div v-else-if="page < totalPages" class="wl-operation">
        <button
          type="button"
          class="wl-btn"
          @click="loadMore"
          v-text="i18n.more"
        />
      </div>
    </template>

    <!-- Copyright Information -->
    <div v-if="config.copyright" class="wl-power">
      Powered by
      <a
        href="https://github.com/walinejs/waline"
        target="_blank"
        rel="noreferrer"
      >
        Waline
      </a>
      v{{ version }}
    </div>
  </div>
</template>

<script lang="ts">
import { useStyleTag } from '@vueuse/core';
import { computed, defineComponent, onMounted, provide, ref, watch } from 'vue';
import CommentBox from './CommentBox.vue';
import CommentCard from './CommentCard.vue';
import { LoadingIcon } from './Icons';
import { useUserInfo } from '../composables';
import { defaultLocales } from '../config';
import { fetchCommentList, getConfig, getDarkStyle } from '../utils';

import type { PropType } from 'vue';
import type {
  WalineComment,
  WalineEmojiInfo,
  WalineHighlighter,
  WalineTexRenderer,
  WalineImageUploader,
  WalineLocale,
  WalineProps,
} from '../typings';

declare const SHOULD_VALIDATE: boolean;
declare const VERSION: string;

export default defineComponent({
  name: 'WalineRoot',

  components: {
    CommentBox,
    CommentCard,
    LoadingIcon,
  },

  props: {
    serverURL: {
      type: String,
      required: true,
    },

    path: {
      type: String,
      required: true,
    },

    meta: {
      type: Array,
      ...(SHOULD_VALIDATE
        ? {
            validator: (value: unknown): boolean =>
              Array.isArray(value) &&
              value.every((item) => ['nick', 'mail', 'link'].includes(item)),
          }
        : {}),
    },

    requiredMeta: {
      type: Array,
      ...(SHOULD_VALIDATE
        ? {
            validator: (value: unknown): boolean =>
              Array.isArray(value) &&
              value.every((item) => ['nick', 'mail', 'link'].includes(item)),
          }
        : {}),
    },

    dark: {
      type: [String, Boolean],
    },

    lang: {
      type: String,
      ...(SHOULD_VALIDATE
        ? {
            validator: (value: unknown): boolean =>
              Object.keys(defaultLocales).includes(value as string),
          }
        : {}),
    },

    locale: {
      type: Object as PropType<Partial<WalineLocale>>,
    },

    pageSize: {
      type: Number,
    },

    wordLimit: {
      type: [Number, Array] as PropType<number | [number, number]>,
      // default: 0,
      ...(SHOULD_VALIDATE
        ? {
            validator: (value: unknown): boolean =>
              typeof value === 'number' ||
              (Array.isArray(value) &&
                value.length === 2 &&
                value.every((item) => typeof item === 'number')),
          }
        : {}),
    },

    emoji: {
      type: [Array, Boolean] as PropType<(string | WalineEmojiInfo)[] | false>,
      ...(SHOULD_VALIDATE
        ? {
            validator: (value: unknown): boolean =>
              value === false ||
              (Array.isArray(value) &&
                value.every(
                  (item) =>
                    typeof item === 'string' ||
                    (typeof item === 'object' &&
                      typeof item.name === 'string' &&
                      typeof item.folder === 'string' &&
                      typeof item.icon === 'string' &&
                      Array.isArray(item.items) &&
                      (item.items as unknown[]).every(
                        (icon) => typeof icon === 'string'
                      ))
                )),
          }
        : {}),
    },

    login: {
      type: String as PropType<'enable' | 'disable' | 'force'>,
    },

    highlighter: {
      type: Function as PropType<WalineHighlighter>,
    },

    imageUploader: {
      type: [Function, Boolean] as PropType<WalineImageUploader | false>,
    },

    texRenderer: {
      type: [Function, Boolean] as PropType<WalineTexRenderer | false>,
    },
  },

  setup(props) {
    const config = computed(() => getConfig(props as WalineProps));

    const userInfo = useUserInfo();

    const status = ref<'loading' | 'success' | 'error'>('loading');

    const count = ref(0);
    const page = ref(1);
    const totalPages = ref(0);

    const data = ref<WalineComment[]>([]);
    const reply = ref<WalineComment | null>(null);

    const darkmodeStyle = computed(() => getDarkStyle(config.value.dark));

    useStyleTag(darkmodeStyle);

    // eslint-disable-next-line vue/no-setup-props-destructure
    let abort: () => void;

    const fetchComment = (pageNumber: number): void => {
      const { serverURL, path, pageSize } = config.value;
      const controller = new AbortController();

      status.value = 'loading';

      abort?.();

      fetchCommentList({
        serverURL,
        lang: config.value.lang,
        path,
        pageSize,
        page: pageNumber,
        signal: controller.signal,
        token: userInfo.value?.token,
      })
        .then((resp) => {
          status.value = 'success';
          count.value = resp.count;
          data.value.push(...resp.data);
          page.value = pageNumber;
          totalPages.value = resp.totalPages;
        })
        .catch((err) => {
          if (err.name !== 'AbortError') {
            console.error(err.message);
            status.value = 'error';
          }
        });

      abort = controller.abort.bind(controller);
    };

    const loadMore = (): void => fetchComment(page.value + 1);

    const refresh = (): void => {
      count.value = 0;
      data.value = [];
      fetchComment(1);
    };

    const onReply = (comment: WalineComment | null): void => {
      reply.value = comment;
    };

    const onSubmit = (comment: WalineComment): void => {
      if (comment.rid) {
        const repliedComment = data.value.find(
          ({ objectId }) => objectId === comment.rid
        );

        if (!repliedComment) return;

        if (!Array.isArray(repliedComment.children))
          repliedComment.children = [];

        repliedComment.children.push(comment);
      } else data.value.unshift(comment);
    };

    provide('config', config);

    watch(() => props.path, refresh);

    onMounted(() => refresh());

    return {
      config,
      darkmodeStyle,
      i18n: computed(() => config.value.locale),

      status,
      count,
      page,
      totalPages,
      data,
      reply,

      loadMore,
      refresh,
      onReply,
      onSubmit,

      version: VERSION,
    };
  },
});
</script>
