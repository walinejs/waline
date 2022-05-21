<!-- forked from https://github.com/DerYeger/vue-masonry-wall/blob/master/src/masonry-wall.vue -->

<!-- MIT License

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
SOFTWARE. -->

<template>
  <div ref="wall" class="wl-gallery" :style="{ gap: `${gap}px` }">
    <div
      v-for="(column, columnIndex) in columns"
      :key="columnIndex"
      class="wl-gallery-column"
      :data-index="columnIndex"
      :style="{ gap: `${gap}px` }"
    >
      <img
        v-for="itemIndex in column"
        :key="itemIndex"
        class="wl-gallery-item"
        :src="items[itemIndex].media[0].tinygif.url"
        :title="items[itemIndex].title"
        loading="lazy"
        @click="
          $emit('insert', `![](${items[itemIndex].media[0].tinygif.url})`)
        "
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue';

import type { PropType } from 'vue';

type Column = number[];

export default defineComponent({
  props: {
    columnWidth: { type: Number, default: 300 },
    items: { type: Array as PropType<unknown[]>, default: () => [] },
    gap: { type: Number, default: 0 },
    rtl: { type: Boolean, default: false },
  },

  emit: ['insert'],

  setup(props) {
    let resizeObserver: ResizeObserver | null = null;
    const wall = ref<HTMLDivElement | null>(null);

    const columns = ref<Column[]>([]);

    const getColumnCount = (): number => {
      const count = Math.floor(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        (wall.value!.getBoundingClientRect().width + props.gap) /
          (props.columnWidth + props.gap)
      );

      return count > 0 ? count : 1;
    };

    const createColumns = (count: number): Column[] =>
      new Array(count).fill(null).map(() => []);

    const fillColumns = async (itemIndex: number): Promise<void> => {
      if (itemIndex >= props.items.length) return;

      await nextTick();

      const columnDivs = Array.from(
        wall.value?.children || []
      ) as HTMLDivElement[];

      if (props.rtl) columnDivs.reverse();

      const target = columnDivs.reduce((prev, curr) =>
        curr.getBoundingClientRect().height <
        prev.getBoundingClientRect().height
          ? curr
          : prev
      );

      columns.value[Number(target.dataset.index)].push(itemIndex);

      await fillColumns(itemIndex + 1);
    };

    const redraw = async (force = false): Promise<void> => {
      if (columns.value.length === getColumnCount() && !force) return;

      columns.value = createColumns(getColumnCount());

      const scrollY = window.scrollY;

      await fillColumns(0);

      window.scrollTo({ top: scrollY });
    };

    watch(
      () => [props.items, props.rtl],
      () => redraw(true)
    );
    watch(
      () => [props.columnWidth, props.gap],
      () => redraw()
    );

    onMounted(() => {
      redraw(true);
      resizeObserver = new ResizeObserver(() => redraw());
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      resizeObserver.observe(wall.value!);
    });

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    onBeforeUnmount(() => resizeObserver!.unobserve(wall.value!));

    return {
      columns,
      wall,
    };
  },
});
</script>
