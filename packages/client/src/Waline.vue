<template>
  <div data-waline>
    <CommentBox v-if="!reply" @submit="onSubmit" />
    <div class="wl-count">
      <span v-if="count" class="wl-num" v-text="count" />
      {{ locale.comment }}
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

    <div v-if="inError" class="wl-action">
      <button
        type="button"
        class="wl-btn"
        @click="refresh"
        v-text="locale.refresh"
      />
    </div>
    <div v-else-if="loading" class="wl-loading">
      <LoadingIcon :size="30" />
    </div>

    <div v-else-if="!data.length" class="wl-empty" v-text="locale.sofa" />

    <div v-if="page < totalPages && !loading" class="wl-action">
      <button
        type="button"
        class="wl-btn"
        @click="loadMore"
        v-text="locale.more"
      />
    </div>
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
import { computed, defineComponent, inject, onMounted, ref } from 'vue';
import CommentBox from './components/CommentBox.vue';
import CommentCard from './components/CommentCard.vue';
import { LoadingIcon } from './components/Icons';
import { fetchCommentList } from './utils';
import { useUserInfo } from './composables';

import type { PropType } from 'vue';
import type { ConfigRef } from './composables';
import type { Comment } from './typings';
import type { WalineEvent } from './utils';

declare const VERSION: string;

export default defineComponent({
  name: 'Waline-Root',

  components: {
    CommentBox,
    CommentCard,
    LoadingIcon,
  },

  props: {
    signal: {
      type: Object as PropType<AbortSignal>,
      required: true,
    },
  },

  setup(props) {
    const config = inject<ConfigRef>('config') as ConfigRef;
    const event = inject<WalineEvent>('event') as WalineEvent;
    const { userInfo } = useUserInfo();

    const count = ref(0);
    const page = ref(1);
    const totalPages = ref(0);
    const loading = ref(true);
    const inError = ref(false);
    const data = ref<Comment[]>([]);
    const reply = ref<Comment | null>(null);

    // eslint-disable-next-line vue/no-setup-props-destructure
    let signal = props.signal;

    const locale = computed(() => config.value.locale);

    const fetchComment = (pageNumber: number): void => {
      loading.value = true;
      inError.value = false;

      fetchCommentList(
        Object.assign({}, config.value, {
          page: pageNumber,
          signal,
          token: userInfo.value?.token,
        })
      )
        .then((resp) => {
          loading.value = false;
          count.value = resp.count;
          data.value.push(...resp.data);
          page.value = pageNumber;
          totalPages.value = resp.totalPages;
        })
        .catch((err) => {
          if (err.name !== 'AbortError') {
            console.error(err.message);

            inError.value = true;
            loading.value = false;
          }
        });
    };

    const loadMore = (): void => fetchComment(page.value + 1);
    const refresh = (): void => {
      data.value = [];
      fetchComment(1);
    };

    const onReply = (comment: Comment | null): void => {
      reply.value = comment;
    };

    const onSubmit = (comment: Comment): void => {
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

    event.on('render', (abortSignal) => {
      signal = abortSignal as AbortSignal;
      count.value = 0;
      data.value = [];
      fetchComment(1);
    });

    onMounted(() => fetchComment(1));

    return {
      config,
      locale,

      count,
      data,
      loading,
      inError,
      page,
      totalPages,
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
