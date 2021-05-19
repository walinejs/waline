<template>
  <div class="vitem" :id="comment.objectId">
    <img
      class="vuser"
      :src="
        comment.avatar ||
        `${config.avatarCDN}${comment.mail}${config.avatarParam}`
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
          :data-type="comment.type"
          v-text="locale.admin"
        />

        <span class="vtime" v-text="timeAgo(comment.insertedAt, locale)" />

        <span
          class="vreply"
          :title="locale.reply"
          role="button"
          @click="reply = comment"
        >
          <ReplyIcon />
        </span>
      </div>
      <div class="vmeta">
        <span v-text="comment.browser" />
        <span v-text="comment.os" />
      </div>
      <div
        class="vcontent"
        :data-expand="locale.expand"
        v-html="comment.comment"
      />

      <div v-if="reply" class="vreply-wrapper">
        <CommentBox
          :replyId="reply.objectId"
          :replyUser="reply.nick"
          :rootId="rootId"
          @submit="onSubmit"
          @cancel-reply="reply = null"
        />
      </div>
      <div v-if="comment.children" class="vquote">
        <CommentCard
          v-for="child in comment.children"
          :key="child.objectId"
          :comment="child"
          :rootId="rootId"
          @submit="onSubmit"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref } from 'vue';
import CommentBox from './CommentBox.vue';
import { ReplyIcon } from './Icons';
import { timeAgo } from '../utils';

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

  setup(props, { emit }) {
    const config = inject<ConfigRef>('config') as ConfigRef;

    const link = computed(() => {
      let { link } = props.comment;

      return link && !/^https?:\/\//i.test(link) ? `https://${link}` : link;
    });

    const reply = ref(null);

    const onSubmit = (): void => emit('submit');

    return {
      config,
      locale: config.value.locale,

      onSubmit,
      link,
      reply,
      timeAgo,
    };
  },
});
</script>
