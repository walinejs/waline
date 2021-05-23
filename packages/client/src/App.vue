<template>
  <div class="v" data-class="v">
    <CommentBox @submit="onSubmit" />
    <div class="vcount">
      <span v-if="count" class="vnum" v-text="count" />
      {{ locale.comment }}
    </div>
    <div v-if="loading && !data.length" class="vloading">
      <LoadingIcon :size="30" />
    </div>
    <div class="vcards">
      <CommentCard
        v-for="comment in data"
        :key="comment.objectId"
        :root-id="comment.objectId"
        :comment="comment"
        @submit="onSubmit"
      />
    </div>

    <div v-if="loading && data.length" class="vloading">
      <LoadingIcon :size="30" />
    </div>

    <div v-if="!data.length && !loading" class="vempty" v-text="locale.sofa" />

    <div v-if="page < totalPages && !loading" class="vmore">
      <button
        type="button"
        class="vbtn"
        @click="loadMore"
        v-text="locale.more"
      />
    </div>
    <div v-if="config.copyright" class="vpower">
      Powered by
      <a
        href="https://github.com/lizheming/Waline"
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

import type { Emitter } from 'mitt';
import type { Comment, ConfigRef } from './typings';

declare const VERSION: string;

export default defineComponent({
  name: 'App',

  components: {
    CommentBox,
    CommentCard,
    LoadingIcon,
  },

  setup() {
    const config = inject<ConfigRef>('config') as ConfigRef;
    const event = inject<Emitter>('event') as Emitter;

    const count = ref(0);
    const page = ref(1);
    const totalPages = ref(0);
    const loading = ref(true);
    const data = ref<Comment[]>([]);

    const locale = computed(() => config.value.locale);

    const fetchComment = (): void => {
      loading.value = true;

      fetchCommentList({ ...config.value, page: page.value })
        .then((resp) => {
          loading.value = false;
          data.value = resp.data;
          count.value = resp.count;
          totalPages.value = resp.totalPages;
        })
        .catch(() => {
          loading.value = false;
        });
    };

    const loadMore = (): void => {
      const nextPage = page.value + 1;

      loading.value = true;

      fetchCommentList({ ...config.value, page: nextPage })
        .then((resp) => {
          loading.value = false;
          data.value.push(...resp.data);
          page.value = nextPage;
          totalPages.value = resp.totalPages;
        })
        .catch(() => {
          loading.value = false;
        });
    };

    const onSubmit = (comment: Comment): void => {
      if (comment.rid) {
        const cmt = data.value.find(({ objectId }) => objectId === comment.rid);

        if (!cmt) return;

        if (!Array.isArray(cmt.children)) cmt.children = [];

        cmt.children.push(comment);
      } else data.value.unshift(comment);
    };

    event.on('update', () => {
      loading.value = true;
      data.value = [];
      fetchComment();
    });

    onMounted(() => fetchComment());

    return {
      config,
      locale,

      count,
      data,
      loading,
      page,
      totalPages,

      loadMore,
      onSubmit,

      version: VERSION,
    };
  },
});
</script>
