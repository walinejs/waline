<!-- forked from https://github.com/DerYeger/vue-masonry-wall/blob/master/src/masonry-wall.vue -->

<!--
  MIT License

  Copyright (c) 2021 Fuxing Loh, Jan Müller

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE. 
-->

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, useTemplateRef, watch } from 'vue';

import { LoadingIcon } from './Icons.js';
import type { WalineSearchResult } from '../typings/index.js';

type Column = number[];

const {
  items = [],
  columnWidth = 300,
  gap = 0,
} = defineProps<{
  /**
   * Image Items
   */
  items?: WalineSearchResult;
  /**
   * width in pixels of each column
   */
  columnWidth?: number;
  /**
   * gap in pixels between columns
   */
  gap?: number;
}>();

defineEmits<(event: 'insert', content: string) => void>();

let resizeObserver: ResizeObserver | null = null;
const wall = useTemplateRef<HTMLDivElement>('wall');
const state = ref<Record<string, boolean>>({});
const columns = ref<Column[]>([]);

const getColumnCount = (): number => {
  const count = Math.floor(
    // oxlint-disable-next-line typescript/no-non-null-assertion
    (wall.value!.getBoundingClientRect().width + gap) / (columnWidth + gap),
  );

  return count > 0 ? count : 1;
};

const createColumns = (count: number): Column[] => Array.from({ length: count }, () => []);

const fillColumns = async (itemIndex: number): Promise<void> => {
  if (itemIndex >= items.length) return;

  await nextTick();

  // @ts-expect-error: Type is Element not HTMLElement
  const columnDivs = [...(wall.value?.children ?? [])];

  const target = columnDivs.reduce((prev, curr) =>
    curr.getBoundingClientRect().height < prev.getBoundingClientRect().height ? curr : prev,
  );

  columns.value[Number(target.dataset.index)].push(itemIndex);

  await fillColumns(itemIndex + 1);
};

const redraw = async (force = false): Promise<void> => {
  if (columns.value.length === getColumnCount() && !force) return;

  columns.value = createColumns(getColumnCount());

  const { scrollY } = window;

  await fillColumns(0);

  window.scrollTo({ top: scrollY });
};

const imageLoad = (event: Event): void => {
  state.value[(event.target as HTMLImageElement).src] = true;
};

onMounted(() => {
  void redraw(true);

  resizeObserver = new ResizeObserver(() => {
    void redraw();
  });
  // oxlint-disable-next-line typescript/no-non-null-assertion
  resizeObserver.observe(wall.value!);

  watch(
    () => [items],
    () => {
      state.value = {};
      void redraw(true);
    },
  );
  watch(
    () => [columnWidth, gap],
    () => {
      void redraw();
    },
  );
});

onBeforeUnmount(() => {
  // oxlint-disable-next-line typescript/no-non-null-assertion
  resizeObserver!.unobserve(wall.value!);
});
</script>

<template>
  <div ref="wall" class="wl-gallery" :style="{ gap: `${gap}px` }">
    <div
      v-for="(column, columnIndex) in columns"
      :key="columnIndex"
      class="wl-gallery-column"
      :data-index="columnIndex"
      :style="{ gap: `${gap}px` }"
    >
      <template v-for="itemIndex in column" :key="itemIndex">
        <!-- eslint-disable vue/no-static-inline-styles -->
        <LoadingIcon v-if="!state[items[itemIndex].src]" :size="36" style="margin: 20px auto" />
        <!-- eslint-enable vue/no-static-inline-styles -->

        <img
          class="wl-gallery-item"
          :src="items[itemIndex].src"
          :title="items[itemIndex].title"
          loading="lazy"
          @load="imageLoad"
          @click="$emit('insert', `![](${items[itemIndex].src})`)"
        />
      </template>
    </div>
  </div>
</template>
