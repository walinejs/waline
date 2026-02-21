<script setup lang="ts">
// oxlint-disable import/max-dependencies

import { useStyleTag, watchImmediate } from '@vueuse/core';
import type { WalineComment, WalineCommentStatus, WalineRootComment } from '@waline/api';
import { deleteComment, getComment, updateComment } from '@waline/api';
import { computed, onMounted, onUnmounted, provide, ref } from 'vue';

import ArticleReaction from './ArticleReaction.vue';
import CommentBox from './CommentBox.vue';
import CommentCard from './CommentCard.vue';
import { LoadingIcon, RssIcon } from './Icons.js';
import { useLikeStorage, useUserInfo } from '../composables/index.js';
import type { WalineCommentSorting, WalineProps } from '../typings/index.js';
import { getConfig, getDarkStyle } from '../utils/index.js';
import { version } from '../version.js';
import { configKey, sortingMethods, sortKeyMap } from '../config/index.js';

// oxlint-disable-next-line vue/define-props-destructuring
const props = defineProps<WalineProps>();

const userInfo = useUserInfo();
const likeStorage = useLikeStorage();

const status = ref<'loading' | 'success' | 'error'>('loading');

const count = ref(0);
const page = ref(1);
const totalPages = ref(0);

const config = computed(() => getConfig(props as WalineProps));

const commentSortingRef = ref(config.value.commentSorting);

const data = ref<WalineRootComment[]>([]);
const reply = ref<WalineComment | null>(null);
const edit = ref<WalineComment | null>(null);

const darkmodeStyle = computed(() => getDarkStyle(config.value.dark));

const i18n = computed(() => config.value.locale);

useStyleTag(darkmodeStyle, { id: 'waline-darkmode' });

let abort: (() => void) | null = null;

const getCommentData = (pageNumber: number): void => {
  const { serverURL, path, pageSize } = config.value;
  const controller = new AbortController();

  status.value = 'loading';

  abort?.();

  getComment({
    serverURL,
    lang: config.value.lang,
    path,
    pageSize,
    sortBy: sortKeyMap[commentSortingRef.value],
    page: pageNumber,
    signal: controller.signal,
    token: userInfo.value.token,
  })
    .then((resp) => {
      status.value = 'success';
      count.value = resp.count;
      data.value.push(...resp.data);
      page.value = pageNumber;
      totalPages.value = resp.totalPages;
    })
    // oxlint-disable-next-line promise/prefer-await-to-callbacks
    .catch((err: unknown) => {
      if ((err as Error).name !== 'AbortError') {
        // oxlint-disable-next-line no-console
        console.error((err as Error).message);
        status.value = 'error';
      }
    });

  abort = controller.abort.bind(controller);
};

const loadMore = (): void => {
  getCommentData(page.value + 1);
};

const refreshComments = (): void => {
  count.value = 0;
  data.value = [];
  getCommentData(1);
};

const onSortByChange = (item: WalineCommentSorting): void => {
  if (commentSortingRef.value !== item) {
    commentSortingRef.value = item;
    refreshComments();
  }
};

const onReply = (comment: WalineComment | null): void => {
  reply.value = comment;
};

const onEdit = (comment: WalineComment | null): void => {
  edit.value = comment;
};

const onSubmit = (comment: WalineComment): void => {
  if (edit.value) {
    edit.value.comment = comment.comment;
    edit.value.orig = comment.orig;
  } else if ('rid' in comment) {
    const repliedComment = data.value.find(({ objectId }) => objectId === comment.rid);

    if (!repliedComment) return;

    if (!Array.isArray(repliedComment.children)) repliedComment.children = [];

    repliedComment.children.push(comment);
  } else {
    data.value.unshift(comment);
    count.value += 1;
  }
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
    token: userInfo.value.token,
    objectId: comment.objectId,
    comment: { status },
  });

  comment.status = status;
};

const onSticky = async (comment: WalineComment): Promise<void> => {
  if ('rid' in comment) return;

  const { serverURL, lang } = config.value;

  await updateComment({
    serverURL,
    lang,
    token: userInfo.value.token,
    objectId: comment.objectId,
    comment: { sticky: comment.sticky ? 0 : 1 },
  });

  comment.sticky = !comment.sticky;
};

const onDelete = async ({ objectId }: WalineComment): Promise<void> => {
  if (!confirm('Are you sure you want to delete this comment?')) return;

  const { serverURL, lang } = config.value;

  await deleteComment({
    serverURL,
    lang,
    token: userInfo.value.token,
    objectId,
  });

  // delete comment from data
  data.value.some((item, index) => {
    if (item.objectId === objectId) {
      data.value = data.value.filter((_item, i) => i !== index);

      return true;
    }

    return item.children.some((child, childIndex) => {
      if (child.objectId === objectId) {
        data.value[index].children = item.children.filter((_item, i) => i !== childIndex);

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

  await updateComment({
    serverURL,
    lang,
    objectId,
    token: userInfo.value.token,
    comment: { like: !hasLiked },
  });

  if (hasLiked) likeStorage.value = likeStorage.value.filter((id) => id !== objectId);
  else {
    likeStorage.value = [...likeStorage.value, objectId];

    if (likeStorage.value.length > 50) likeStorage.value = likeStorage.value.slice(-50);
  }

  comment.like = Math.max(0, (comment.like || 0) + (hasLiked ? -1 : 1));
};

provide(configKey, config);

onMounted(async () => {
  watchImmediate(
    () => [props.serverURL, props.path],
    () => {
      refreshComments();
    },
  );

  const qs = new URLSearchParams(location.search);
  const token = qs.get('token');

  if (!token) {
    return;
  }

  const resp = await fetch(`${config?.value.serverURL}/token`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
      return {};
    });

  if (!resp.errno && resp?.data?.objectId) {
    userInfo.value = { ...resp.data, token };
  }

  const url = new URL(window.location.href);
  url.searchParams.delete('token');

  history.replaceState(
    null,
    '',
    url.pathname + (url.searchParams.toString() ? `?${url.searchParams.toString()}` : '') + url.hash,
  );
});
onUnmounted(() => {
  abort?.();
});
</script>

<template>
  <div data-waline>
    <ArticleReaction />

    <CommentBox v-if="!reply && !edit" @log="refreshComments" @submit="onSubmit" />

    <div class="wl-meta-head">
      <div class="wl-count">
        <span v-if="count" class="wl-num" v-text="count" />
        {{ i18n.comment }}
      </div>

      <ul class="wl-sort">
        <li
          v-for="item in sortingMethods"
          :key="item"
          :class="[item === commentSortingRef ? 'active' : '']"
          @click="onSortByChange(item)"
        >
          {{ i18n[item] }}
        </li>
      </ul>
    </div>

    <div class="wl-cards">
      <CommentCard
        v-for="comment in data"
        :key="comment.objectId"
        :root-id="comment.objectId"
        :comment="comment"
        :reply="reply"
        :edit="edit"
        @log="refreshComments"
        @reply="onReply"
        @edit="onEdit"
        @submit="onSubmit"
        @status="onStatusChange"
        @delete="onDelete"
        @sticky="onSticky"
        @like="onLike"
      />
    </div>

    <div v-if="status === 'error'" class="wl-operation">
      <button type="button" class="wl-btn" @click="refreshComments" v-text="i18n.refresh" />
    </div>

    <div v-else-if="status === 'loading'" class="wl-loading">
      <LoadingIcon :size="30" />
    </div>

    <div v-else-if="!data.length" class="wl-empty" v-text="i18n.sofa" />

    <!-- Load more button -->
    <div v-else-if="page < totalPages" class="wl-operation">
      <button type="button" class="wl-btn" @click="loadMore" v-text="i18n.more" />
    </div>

    <div class="wl-meta-foot" v-if="data.length || status !== 'loading'">
      <div v-if="!config.noRss" class="wl-rss">
        <a
          :href="`${config.serverURL}/api/comment/rss?path=${encodeURIComponent(config.path)}`"
          target="_blank"
          rel="noopener noreferrer"
          :alt="i18n.subPostComment"
        >
          <RssIcon />
          <span v-text="i18n.subPostComment" />
        </a>

        <a
          :href="`${config.serverURL}/api/comment/rss`"
          target="_blank"
          rel="noopener noreferrer"
          :alt="i18n.subSiteComment"
        >
          <RssIcon />
          <span v-text="i18n.subSiteComment" />
        </a>
      </div>

      <!-- Copyright Information -->
      <div v-if="!config.noCopyright" class="wl-power">
        Powered by
        <a href="https://github.com/walinejs/waline" target="_blank" rel="noopener noreferrer">
          Waline
        </a>
        v{{ version }}
      </div>
    </div>
  </div>
</template>
