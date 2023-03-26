<template>
  <div :id="comment.objectId" class="wl-card-item">
    <div class="wl-user" aria-hidden="true">
      <img v-if="comment.avatar" :src="comment.avatar" />

      <VerifiedIcon v-if="comment.type" />
    </div>

    <div class="wl-card">
      <div class="wl-head">
        <a
          v-if="link"
          class="wl-nick"
          :href="link"
          target="_blank"
          rel="nofollow noopener noreferrer"
          >{{ comment.nick }}</a
        >

        <span v-else class="wl-nick">{{ comment.nick }}</span>

        <span
          v-if="comment.type === 'administrator'"
          class="wl-badge"
          v-text="locale.admin"
        />

        <span v-if="comment.label" class="wl-badge" v-text="comment.label" />

        <span v-if="comment.sticky" class="wl-badge" v-text="locale.sticky" />

        <span
          v-if="comment.level !== undefined && comment.level >= 0"
          :class="`wl-badge level${comment.level}`"
          v-text="locale[`level${comment.level}`] || `Level ${comment.level}`"
        />

        <span class="wl-time" v-text="time" />

        <div class="wl-comment-actions">
          <button
            v-if="isAdmin || isOwner"
            type="button"
            class="wl-edit"
            @click="() => $emit('edit', comment)"
          >
            <EditIcon />
          </button>

          <button
            v-if="isAdmin || isOwner"
            type="button"
            class="wl-delete"
            @click="$emit('delete', comment)"
          >
            <DeleteIcon />
          </button>

          <button
            type="button"
            class="wl-like"
            :title="like ? locale.cancelLike : locale.like"
            @click="$emit('like', comment)"
          >
            <LikeIcon :active="like" />

            <span v-if="'like' in comment" v-text="comment.like" />
          </button>

          <button
            type="button"
            class="wl-reply"
            :class="{ active: isReplyingCurrent }"
            :title="isReplyingCurrent ? locale.cancelReply : locale.reply"
            @click="$emit('reply', isReplyingCurrent ? null : comment)"
          >
            <ReplyIcon />
          </button>
        </div>
      </div>

      <div class="wl-meta" aria-hidden="true">
        <span
          v-if="comment.addr"
          class="wl-addr"
          :data-value="comment.addr"
          v-text="comment.addr"
        />

        <span
          v-if="comment.browser"
          class="wl-browser"
          :data-value="comment.browser"
          v-text="comment.browser"
        />

        <span
          v-if="comment.os"
          class="wl-os"
          :data-value="comment.os"
          v-text="comment.os"
        />
      </div>
      <!-- eslint-disable vue/no-v-html -->
      <div
        v-if="!isEditingCurrent"
        class="wl-content"
        v-html="comment.comment"
      />
      <!-- eslint-enable vue/no-v-html -->

      <div v-if="isAdmin && !isEditingCurrent" class="wl-admin-actions">
        <span class="wl-comment-status">
          <button
            v-for="status in commentStatus"
            :key="status"
            type="submit"
            :class="`wl-btn wl-${status}`"
            :disabled="comment.status === status"
            @click="$emit('status', { status, comment })"
            v-text="locale[status]"
          />
        </span>

        <button
          v-if="isAdmin && !comment.rid"
          type="submit"
          class="wl-btn wl-sticky"
          @click="$emit('sticky', comment)"
        >
          {{ comment.sticky ? locale.unsticky : locale.sticky }}
        </button>
      </div>

      <div
        v-if="isReplyingCurrent || isEditingCurrent"
        :class="{
          'wl-reply-wrapper': isReplyingCurrent,
          'wl-edit-wrapper': isEditingCurrent,
        }"
      >
        <CommentBox
          :edit="edit"
          :reply-id="reply?.objectId"
          :reply-user="comment.nick"
          :root-id="rootId"
          @log="$emit('log')"
          @cancel-reply="$emit('reply', null)"
          @cancel-edit="$emit('edit', null)"
          @submit="$emit('submit', $event)"
        />
      </div>

      <div v-if="comment.children" class="wl-quote">
        <!-- FIXME: This is a upstream bug -->
        <!-- eslint-disable-next-line vue/no-undef-components -->
        <CommentCard
          v-for="child in comment.children"
          :key="child.objectId"
          :comment="child"
          :reply="reply"
          :edit="edit"
          :root-id="rootId"
          @log="$emit('log')"
          @delete="$emit('delete', $event)"
          @edit="$emit('edit', $event)"
          @like="$emit('like', $event)"
          @reply="$emit('reply', $event)"
          @status="$emit('status', $event)"
          @sticky="$emit('sticky', $event)"
          @submit="$emit('submit', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNow } from '@vueuse/core';
import { type ComputedRef, computed, inject } from 'vue';

import CommentBox from './CommentBox.vue';
import {
  DeleteIcon,
  EditIcon,
  LikeIcon,
  ReplyIcon,
  VerifiedIcon,
} from './Icons.js';
import { useLikeStorage, useUserInfo } from '../composables/index.js';
import {
  type WalineComment,
  type WalineCommentStatus,
} from '../typings/index.js';
import { type WalineConfig, getTimeAgo, isLinkHttp } from '../utils/index.js';

const props = withDefaults(
  defineProps<{
    /**
     * Comment data
     */
    comment: WalineComment;
    /**
     * Current comment to be edited
     */
    edit?: WalineComment | null;
    /**
     * Root comment id
     */
    rootId: string;
    /**
     * Current comment to be replied
     */
    reply?: WalineComment | null;
  }>(),
  {
    edit: null,
    reply: null,
  }
);

defineEmits<{
  (event: 'log'): void;
  (event: 'submit', comment: WalineComment): void;
  (event: 'delete', comment: WalineComment): void;
  (event: 'edit', comment: WalineComment | null): void;
  (event: 'like', comment: WalineComment): void;
  (
    event: 'status',
    statusInfo: { status: WalineCommentStatus; comment: WalineComment }
  ): void;
  (event: 'sticky', comment: WalineComment): void;
  (event: 'reply', comment: WalineComment | null): void;
}>();

const commentStatus: WalineCommentStatus[] = ['approved', 'waiting', 'spam'];

const config = inject<ComputedRef<WalineConfig>>('config')!;
const likes = useLikeStorage();
const now = useNow();
const userInfo = useUserInfo();

const locale = computed(() => config.value.locale);

const link = computed(() => {
  const { link } = props.comment;

  return link ? (isLinkHttp(link) ? link : `https://${link}`) : '';
});

const like = computed(() => likes.value.includes(props.comment.objectId));

const time = computed(() =>
  getTimeAgo(props.comment.insertedAt, now.value, locale.value)
);

const isAdmin = computed(() => userInfo.value.type === 'administrator');

const isOwner = computed(
  () =>
    props.comment.user_id && userInfo.value.objectId === props.comment.user_id
);

const isReplyingCurrent = computed(
  () => props.comment.objectId === props.reply?.objectId
);

const isEditingCurrent = computed(
  () => props.comment.objectId === props.edit?.objectId
);
</script>
