<template>
  <div class="vitem" :id="comment.objectId">
    <img
      v-if="config.avatar"
      class="vuser"
      aria-hidden="true"
      :src="
        comment.avatar ||
        `${config.avatar.cdn}${comment.mail}${config.avatar.param}`
      "
    />
    <div class="vcard">
      <div class="vhead">
        <a
          v-if="link"
          class="vnick"
          :href="link"
          target="_blank"
          rel="nofollow noreferrer"
          v-text="comment.nick"
        />
        <span v-else class="vnick" v-text="comment.nick" />

        <span
          v-if="comment.type === 'administrator'"
          class="vbadge"
          v-text="locale.admin"
        />

        <span class="vtime" v-text="timeAgo(comment.insertedAt, locale)" />

        <span
          class="vreply"
          :title="locale.reply"
          :aria-label="locale.reply"
          role="button"
          tabindex="0"
          @click="reply = comment"
        >
          <ReplyIcon />
        </span>
      </div>
      <div class="vmeta" aria-hidden="true">
        <span v-text="comment.browser" />
        <span v-text="comment.os" />
      </div>
      <div class="vcontent" v-html="comment.comment" />

      <div v-if="reply" class="vreply-wrapper">
        <CommentBox
          :replyId="reply.objectId"
          :replyUser="reply.nick"
          :rootId="rootId"
          @submit="$emit('submit')"
          @cancel-reply="reply = null"
        />
      </div>
      <div v-if="comment.children" class="vquote">
        <CommentCard
          v-for="child in comment.children"
          :key="child.objectId"
          :comment="child"
          :rootId="rootId"
          @submit="$emit('submit')"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref } from 'vue';
import CommentBox from './CommentBox.vue';
import { ReplyIcon } from './Icons';
import { isLinkHttp, timeAgo } from '../utils';

import type { PropType } from 'vue';
import type { Comment, ConfigRef } from '../typings';

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
  },

  components: {
    CommentBox,
    ReplyIcon,
  },

  emits: ['submit'],

  setup(props) {
    const config = inject<ConfigRef>('config') as ConfigRef;

    const reply = ref(null);

    const locale = computed(() => config.value.locale);

    const link = computed(() => {
      let { link } = props.comment;

      return link && isLinkHttp(link) ? link : `https://${link}`;
    });

    return {
      config,
      locale,

      link,
      reply,
      timeAgo,
    };
  },
});
</script>
