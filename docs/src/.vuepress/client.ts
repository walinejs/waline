import { Fancybox } from '@fancyapps/ui/dist/fancybox/fancybox.js';
import { h, onBeforeUnmount, onMounted, resolveComponent } from 'vue';
import { Layout } from 'vuepress-theme-hope/client';
import { defineClientConfig, useFrontmatter } from 'vuepress/client';

import '@fancyapps/ui/dist/fancybox/fancybox.css';
import WalineTips from './components/WalineTips.js';

export { walineOptions } from './waline.js';

export default defineClientConfig({
  enhance({ app }) {
    // oxlint-disable-next-line typescript/no-non-null-assertion
    const CommentService = app.component('CommentService')!;

    // delete
    // oxlint-disable-next-line no-underscore-dangle
    delete app._context.components.CommentService;

    app.component('CommentService', () => [h(WalineTips), h(CommentService)]);
  },
  setup() {
    onMounted(() => {
      Fancybox.bind('#vp-comment .wl-content img');
    });
    onBeforeUnmount(() => {
      Fancybox.destroy();
    });
  },

  layouts: {
    Layout: () => {
      const frontmatter = useFrontmatter<{ home: boolean }>();

      return h(
        Layout,
        {},
        {
          contentAfter: () =>
            frontmatter.value.home ? h(resolveComponent('CommentService')) : null,
        },
      );
    },
  },
});
