<template>
  <div>Hello</div>

  <Teleport to="article">
    <div
      v-show="overlayPos.visible"
      class="wl-cthl-overlay-wrapper"
      :style="{ left: overlayPos.x + 'px', top: overlayPos.y + 'px' }"
    >
      <div class="wl-cthl-menu-item" @click="handleHighlightComment">
        <CommentOutlinedIcon />
      </div>
    </div>
  </Teleport>

  <Teleport to="body">
    <div v-if="!showModal" class="wl-cthl-modal">
      <div class="wl-cthl-modal_header">
        <div class="wl-cthl-modal_title">Comment</div>
        <div class="wl-cthl-modal_close" @click="handleHighlightComment">×</div>
      </div>
      <div class="wl-cthl-modal_body">
        <div class="wl-cards">
          <CommentCard
            v-for="comment in data"
            :key="comment.objectId"
            :root-id="comment.objectId"
            :comment="comment"
            :reply="reply"
            :edit="edit"
            @log="refresh"
            @reply="onReply"
            @edit="onEdit"
            @submit="onSubmit"
            @status="onStatusChange"
            @delete="onDelete"
            @sticky="onSticky"
            @like="onLike"
          />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Highlighter from 'web-highlighter';

import CommentCard from './CommentCard.vue';
import { CommentOutlinedIcon } from './icons';
import { WalineComment } from '../typings';

interface OverlayPos {
  x: number;
  y: number;
  visible: boolean;
}

const overlayPos = ref<OverlayPos>({ x: 0, y: 0, visible: false });
const showModal = ref<boolean>(false);
const data = ref<WalineComment[]>();

const highlighter = new Highlighter({
  $root: document.querySelector('article') || document.documentElement,
  style: {
    className: 'wl-comment-highlight',
  },
});

// highlighter.on(Highlighter.event.CREATE, function (data, inst, e) {
//   console.log(data, inst, e);
// });

// highlighter.run();


function handleHighlightComment() {
  showModal.value = !showModal.value;
}

document.addEventListener('selectionchange', function (e) {
  const range = window.getSelection()?.getRangeAt(0);

  if (!range) {
    setTimeout(() => {
      overlayPos.value = { x: 0, y: 0, visible: false };
    }, 100);

    return;
  }

  const rects = Array.from(range?.getClientRects() || []);
  const text = range.toString();

  if (!rects?.length || !text) {
    setTimeout(() => {
      overlayPos.value = { x: 0, y: 0, visible: false };
    }, 100);

    return;
  }

  const rect = rects[0];

  overlayPos.value = {
    x: rect.x + rect.width / 2,
    y: (document.scrollingElement?.scrollTop || 0) + rect.y - 52,
    visible: true,
  };
});
</script>
