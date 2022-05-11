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
        @status="onStatusChange"
        @delete="onDelete"
        @sticky="onSticky"
        @like="onLike"
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
import { useUserInfo, useLikeStorage } from '../composables';
import { defaultLocales } from '../config';
import {
  deleteComment,
  fetchCommentList,
  likeComment,
  getConfig,
  getDarkStyle,
  updateComment,
} from '../utils';

import type { PropType } from 'vue';
import type {
  WalineComment,
  WalineCommentStatus,
  WalineEmojiInfo,
  WalineHighlighter,
  WalineTexRenderer,
  WalineImageUploader,
  WalineLocale,
  WalineProps,
  WalineMeta,
} from '../typings';

declare const SHOULD_VALIDATE: boolean;
declare const VERSION: string;

const props = [
  'serverURL',
  'path',
  'meta',
  'requiredMeta',
  'dark',
  'lang',
  'locale',
  'pageSize',
  'wordLimit',
  'emoji',
  'login',
  'highlighter',
  'texRenderer',
  'imageUploader',
  'copyright',
];

const propsWithValidate = {
  serverURL: {
    type: String,
    required: true,
  },

  path: {
    type: String,
    required: true,
  },

  meta: {
    type: Array as PropType<WalineMeta[]>,
    default: (): WalineMeta[] => ['nick', 'mail', 'link'],
    validator: (value: unknown): boolean =>
      Array.isArray(value) &&
      value.every((item) => ['nick', 'mail', 'link'].includes(item)),
  },

  requiredMeta: {
    type: Array,
    default: (): WalineMeta[] => [],
    validator: (value: unknown): boolean =>
      Array.isArray(value) &&
      value.every((item) => ['nick', 'mail', 'link'].includes(item)),
  },

  dark: [String, Boolean],

  lang: {
    type: String,
    default: 'zh-CN',
    validator: (value: unknown): boolean =>
      Object.keys(defaultLocales).includes(value as string),
  },

  locale: Object as PropType<Partial<WalineLocale>>,

  pageSize: { type: Number, default: 10 },

  wordLimit: {
    type: [Number, Array] as PropType<number | [number, number]>,
    validator: (value: unknown): boolean =>
      typeof value === 'number' ||
      (Array.isArray(value) &&
        value.length === 2 &&
        value.every((item) => typeof item === 'number')),
  },

  emoji: {
    type: [Array, Boolean] as PropType<(string | WalineEmojiInfo)[] | false>,
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
  },

  login: String as PropType<'enable' | 'disable' | 'force'>,

  highlighter: Function as PropType<WalineHighlighter>,

  imageUploader: {
    type: [Function, Boolean] as PropType<WalineImageUploader | false>,
    default: undefined,
  },

  texRenderer: {
    type: [Function, Boolean] as PropType<WalineTexRenderer | false>,
    default: undefined,
  },

  copyright: { type: Boolean, default: true },
};

export default defineComponent({
  name: 'WalineRoot',

  components: {
    CommentBox,
    CommentCard,
    LoadingIcon,
  },

  props: SHOULD_VALIDATE ? propsWithValidate : props,

  setup(props) {
    const config = computed(() => getConfig(props as unknown as WalineProps));

    const userInfo = useUserInfo();
    const likeStorage = useLikeStorage();

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

    const onStatusChange = async ({
      comment,
      status,
    }: {
      comment: WalineComment;
      status: WalineCommentStatus;
    }): Promise<void> => {
      if (comment.status === status) return;

      const { serverURL, lang } = config.value;

      await updateComment({
        serverURL,
        lang,
        token: userInfo.value?.token,
        objectId: comment.objectId,
        status,
      });

      comment.status = status;
    };

    const onSticky = async (comment: WalineComment): Promise<void> => {
      if (comment.rid) return;

      const { serverURL, lang } = config.value;

      await updateComment({
        serverURL,
        lang,
        token: userInfo.value?.token,
        objectId: comment.objectId,
        sticky: comment.sticky ? 0 : 1,
      });

      comment.sticky = !comment.sticky;
    };

    const onDelete = async ({ objectId }: WalineComment): Promise<void> => {
      if (!confirm('Are you sure you want to delete this comment?')) return;

      const { serverURL, lang } = config.value;

      await deleteComment({
        serverURL,
        lang,
        token: userInfo.value?.token,
        objectId: objectId,
      });

      // delete comment from data
      data.value.some((item, index) => {
        if (item.objectId === objectId) {
          data.value = data.value.filter((_item, i) => i !== index);

          return true;
        }

        return item.children.some((child, childIndex) => {
          if (child.objectId === objectId) {
            data.value[index].children = item.children.filter(
              (_item, i) => i !== childIndex
            );

            return true;
          }

          return false;
        });
      });
    };

    const onLike = async (comment: WalineComment): Promise<void> => {
      const { serverURL, lang } = config.value;
      const { objectId } = comment;
      const hasLiked = likeStorage.value.includes(objectId);

      await likeComment({
        serverURL,
        lang,
        objectId,
        like: !hasLiked,
      });

      if (hasLiked)
        likeStorage.value = likeStorage.value.filter((id) => id !== objectId);
      else {
        likeStorage.value = [...likeStorage.value, objectId];

        if (likeStorage.value.length > 50)
          likeStorage.value = likeStorage.value.slice(-50);
      }

      comment.like = (comment.like || 0) + (hasLiked ? -1 : 1);
    };

    provide('config', config);

    watch(() => (props as unknown as WalineProps).path, refresh);

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
      onStatusChange,
      onDelete,
      onSticky,
      onLike,

      version: VERSION,
    };
  },
});
</script>
