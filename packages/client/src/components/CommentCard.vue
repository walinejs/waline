<template>
  <div class="wl-item" :id="comment.objectId">
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
          rel="nofollow noreferrer"
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
            class="wl-delete"
            v-if="isAdmin || isOwner"
            @click="$emit('delete', comment)"
          >
            <DeleteIcon />
          </button>

          <button
            class="wl-like"
            @click="$emit('like', comment)"
            :title="like ? locale.cancelLike : locale.like"
          >
            <LikeIcon :active="like" />
            <span v-if="'like' in comment" v-text="comment.like" />
          </button>

          <button
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
        <span v-if="comment.addr" v-text="comment.addr" />
        <span v-if="comment.browser" v-text="comment.browser" />
        <span v-if="comment.os" v-text="comment.os" />
      </div>
      <div class="wl-content" v-html="comment.comment" />

      <div v-if="isAdmin" class="wl-admin-actions">
        <span class="wl-comment-status">
          <button
            v-for="status in commentStatus"
            :key="status"
            :class="`wl-btn wl-${status}`"
            :disabled="comment.status === status"
            @click="$emit('status', { status, comment })"
            v-text="status"
          />
        </span>

        <button
          class="wl-btn wl-sticky"
          v-if="isAdmin && !comment.rid"
          @click="$emit('sticky', comment)"
        >
          {{ comment.sticky ? 'unsticky' : 'sticky' }}
        </button>
      </div>

      <div v-if="isReplyingCurrent" class="wl-reply-wrapper">
        <CommentBox
          :replyId="comment.objectId"
          :replyUser="comment.nick"
          :rootId="rootId"
          @submit="$emit('submit', $event)"
          @cancel-reply="$emit('reply', null)"
        />
      </div>
      <div v-if="comment.children" class="wl-quote">
        <CommentCard
          v-for="child in comment.children"
          :key="child.objectId"
          :comment="child"
          :reply="reply"
          :rootId="rootId"
          @reply="$emit('reply', $event)"
          @submit="$emit('submit', $event)"
          @like="$emit('like', $event)"
          @delete="$emit('delete', $event)"
          @status="$emit('status', $event)"
          @sticky="$emit('sticky', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue';
import CommentBox from './CommentBox.vue';
import { DeleteIcon, LikeIcon, ReplyIcon, VerifiedIcon } from './Icons';
import { isLinkHttp } from '../utils';
import { useTimeAgo, useLikeStorage, useUserInfo } from '../composables';

import type { ComputedRef, PropType } from 'vue';
import type { WalineConfig } from '../utils';
import type { WalineComment, WalineCommentStatus } from '../typings';

const commentStatus: WalineCommentStatus[] = ['approved', 'waiting', 'spam'];

export default defineComponent({
  props: {
    comment: {
      type: Object as PropType<WalineComment>,
      required: true,
    },
    rootId: {
      type: String,
      required: true,
    },
    reply: {
      type: Object as PropType<WalineComment | null>,
    },
  },

  components: {
    CommentBox,
    DeleteIcon,
    LikeIcon,
    ReplyIcon,
    VerifiedIcon,
  },

  emits: ['submit', 'reply', 'like', 'delete', 'status', 'sticky'],

  setup(props) {
    const config = inject<ComputedRef<WalineConfig>>(
      'config'
    ) as ComputedRef<WalineConfig>;
    const likes = useLikeStorage();
    const userInfo = useUserInfo();

    const locale = computed(() => config.value.locale);

    const link = computed(() => {
      let { link } = props.comment;

      return link ? (isLinkHttp(link) ? link : `https://${link}`) : '';
    });

    const like = computed(() => likes.value.includes(props.comment.objectId));

    const time = useTimeAgo(props.comment.insertedAt, locale.value);

    const isAdmin = computed(() => userInfo.value.type === 'administrator');

    const isOwner = computed(
      () =>
        props.comment.user_id &&
        userInfo.value.objectId === props.comment.user_id
    );

    const isReplyingCurrent = computed(
      () => props.comment.objectId === props.reply?.objectId
    );

    return {
      config,
      locale,

      isReplyingCurrent,
      link,
      like,
      time,

      isAdmin,
      isOwner,

      commentStatus,
    };
  },
});
</script>
