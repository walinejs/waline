<script setup lang="ts">
import { useNow } from '@vueuse/core';
import type { WalineComment, WalineCommentStatus } from '@waline/api';
import { computed, inject } from 'vue';

import CommentBox from './CommentBox.vue';
import {
  DeleteIcon,
  EditIcon,
  LikeIcon,
  ReplyIcon,
  VerifiedIcon,
} from './Icons.js';
import { useLikeStorage, useUserInfo } from '../composables/index.js';
import { getTimeAgo, isLinkHttp } from '../utils/index.js';
import { configKey } from '../config/index.js';

const props = defineProps<{
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
  rootId: number;
  /**
   * Current comment to be replied
   */
  reply?: WalineComment | null;
}>();

const emit = defineEmits<{
  (event: 'log'): void;
  (
    event: 'submit' | 'delete' | 'like' | 'sticky',
    comment: WalineComment,
  ): void;
  (event: 'edit' | 'reply', comment: WalineComment | null): void;
  (
    event: 'status',
    statusInfo: { status: WalineCommentStatus; comment: WalineComment },
  ): void;
}>();

const commentStatus: WalineCommentStatus[] = ['approved', 'waiting', 'spam'];

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const config = inject(configKey)!;
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
  getTimeAgo(new Date(props.comment.time), now.value, locale.value),
);

const isAdmin = computed(() => userInfo.value.type === 'administrator');

const isOwner = computed(
  () =>
    props.comment.user_id && userInfo.value.objectId === props.comment.user_id,
);

const isReplyingCurrent = computed(
  () => props.comment.objectId === props.reply?.objectId,
);

const isEditingCurrent = computed(
  () => props.comment.objectId === props.edit?.objectId,
);
</script>

<template>
  <div :id="comment.objectId.toString()" class="wl-card-item">
    <div class="wl-user" aria-hidden="true">
      <img
        v-if="comment.avatar"
        class="wl-user-avatar"
        :src="comment.avatar"
        alt=""
      />

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

        <span
          v-if="comment['sticky']"
          class="wl-badge"
          v-text="locale.sticky"
        />

        <span
          v-if="typeof comment.level === 'number'"
          :class="`wl-badge level${comment.level}`"
          v-text="locale[`level${comment.level}`] || `Level ${comment.level}`"
        />

        <span class="wl-time" v-text="time" />

        <div class="wl-comment-actions">
          <template v-if="isAdmin || isOwner">
            <button
              type="button"
              class="wl-edit"
              @click="emit('edit', comment)"
            >
              <EditIcon />
            </button>

            <button
              type="button"
              class="wl-delete"
              @click="emit('delete', comment)"
            >
              <DeleteIcon />
            </button>
          </template>

          <button
            type="button"
            class="wl-like"
            :title="like ? locale.cancelLike : locale.like"
            @click="emit('like', comment)"
          >
            <LikeIcon :active="like" />
            {{ 'like' in comment ? comment.like : '' }}
          </button>

          <button
            type="button"
            class="wl-reply"
            :class="{ active: isReplyingCurrent }"
            :title="isReplyingCurrent ? locale.cancelReply : locale.reply"
            @click="emit('reply', isReplyingCurrent ? null : comment)"
          >
            <ReplyIcon />
          </button>
        </div>
      </div>

      <div class="wl-meta" aria-hidden="true">
        <template v-for="item in ['addr', 'browser', 'os']">
          <span
            v-if="comment[item]"
            :key="item"
            :class="`wl-${item}`"
            :data-value="comment[item]"
            v-text="comment[item]"
          />
        </template>
      </div>
      <!-- eslint-disable vue/no-v-html -->
      <div v-if="!isEditingCurrent" class="wl-content">
        <p v-if="'reply_user' in comment && comment.reply_user">
          <a :href="'#' + comment.pid">@{{ comment.reply_user.nick }}</a>

          <span>: </span>
        </p>

        <div v-html="comment.comment" />
      </div>
      <!-- eslint-enable vue/no-v-html -->

      <div v-if="isAdmin && !isEditingCurrent" class="wl-admin-actions">
        <span class="wl-comment-status">
          <button
            v-for="status in commentStatus"
            :key="status"
            type="submit"
            :class="`wl-btn wl-${status}`"
            :disabled="comment.status === status"
            @click="emit('status', { status, comment })"
            v-text="locale[status]"
          />
        </span>

        <button
          v-if="isAdmin && !('rid' in comment)"
          type="submit"
          class="wl-btn wl-sticky"
          @click="emit('sticky', comment)"
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
          @log="emit('log')"
          @cancel-reply="emit('reply', null)"
          @cancel-edit="emit('edit', null)"
          @submit="emit('submit', $event)"
        />
      </div>

      <div v-if="'children' in comment" class="wl-quote">
        <CommentCard
          v-for="child in comment.children"
          :key="child.objectId"
          :comment="child"
          :reply="reply"
          :edit="edit"
          :root-id="rootId"
          @log="emit('log')"
          @delete="emit('delete', $event)"
          @edit="emit('edit', $event)"
          @like="emit('like', $event)"
          @reply="emit('reply', $event)"
          @status="emit('status', $event)"
          @sticky="emit('sticky', $event)"
          @submit="emit('submit', $event)"
        />
      </div>
    </div>
  </div>
</template>
