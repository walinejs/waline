<template>
  <div class="vitem" :id="comment.objectId">
    <img v-if="avatar" class="vuser" aria-hidden="true" :src="avatar" />
    <div class="vcard">
      <div class="vhead">
        <a
          v-if="link"
          class="vnick"
          :href="link"
          target="_blank"
          rel="nofollow noreferrer"
          >{{ comment.nick }}<VerifiedIcon v-if="comment.type"
        /></a>
        <span v-else class="vnick"
          >{{ comment.nick }}<VerifiedIcon v-if="comment.type" />
        </span>
        <span
          v-if="comment.type === 'administrator'"
          class="vbadge"
          v-text="locale.admin"
        />

        <span v-if="comment.sticky" class="vbadge" v-text="locale.sticky" />

        <span class="vtime" v-text="timeAgo(comment.insertedAt, locale)" />

        <button
          class="vreply"
          :class="{ active: isReplyingCurrent }"
          :title="isReplyingCurrent ? locale.cancelReply : locale.reply"
          @click="$emit('reply', isReplyingCurrent ? null : comment)"
        >
          <ReplyIcon />
        </button>
      </div>
      <div class="vmeta" aria-hidden="true">
        <span v-if="comment.browser" v-text="comment.browser" />
        <span v-if="comment.os" v-text="comment.os" />
      </div>
      <div class="vcontent" v-html="comment.comment" />

      <div v-if="isReplyingCurrent" class="vreply-wrapper">
        <CommentBox
          :replyId="comment.objectId"
          :replyUser="comment.nick"
          :rootId="rootId"
          @submit="$emit('submit', $event)"
          @cancel-reply="$emit('reply', null)"
        />
      </div>
      <div v-if="comment.children" class="vquote">
        <CommentCard
          v-for="child in comment.children"
          :key="child.objectId"
          :comment="child"
          :reply="reply"
          :rootId="rootId"
          @reply="$emit('reply', $event)"
          @submit="$emit('submit', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue';
import CommentBox from './CommentBox.vue';
import { ReplyIcon, VerifiedIcon } from './Icons';
import { isLinkHttp, timeAgo } from '../utils';

import type { PropType } from 'vue';
import type { ConfigRef } from '../composables';
import type { Comment } from '../typings';

export default defineComponent({
  props: {
    comment: {
      type: Object as PropType<Comment>,
      required: true,
    },
    rootId: {
      type: String,
      required: true,
    },
    reply: {
      type: Object as PropType<Comment | null>,
    },
  },

  components: {
    CommentBox,
    ReplyIcon,
    VerifiedIcon,
  },

  emits: ['submit', 'reply'],

  setup(props) {
    const config = inject<ConfigRef>('config') as ConfigRef;
    const locale = computed(() => config.value.locale);

    const link = computed(() => {
      let { link } = props.comment;

      return link ? (isLinkHttp(link) ? link : `https://${link}`) : '';
    });

    const avatar = computed(() => {
      const userData = props.comment;
      const avatarConfig = config.value.avatar;

      if (!userData || avatarConfig.hide) {
        return false;
      }

      return (
        props.comment.avatar ||
        `${avatarConfig.cdn}${props.comment.mail}${avatarConfig.param}`
      );
    });

    const isReplyingCurrent = computed(
      () => props.comment.objectId === props.reply?.objectId
    );

    return {
      config,
      locale,

      avatar,
      isReplyingCurrent,
      link,
      timeAgo,
    };
  },
});
</script>
