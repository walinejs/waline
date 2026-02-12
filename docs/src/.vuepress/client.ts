import { Fancybox } from '@fancyapps/ui/dist/fancybox/fancybox.js';
import type { WalineOptions } from '@vuepress/plugin-comment/client';
import { defineWalineConfig } from '@vuepress/plugin-comment/client';
import { h, onBeforeUnmount, onMounted, resolveComponent } from 'vue';
import { defineClientConfig, useFrontmatter } from 'vuepress/client';
import { Layout } from 'vuepress-theme-hope/client';

import '@fancyapps/ui/dist/fancybox/fancybox.css';
import WalineTips from './components/WalineTips.js';

export const walineOptions: WalineOptions = {
  login: 'force',
  serverURL: 'https://walinejs.comment.lithub.cc',
  recaptchaV3Key: '6Lfz4-shAAAAANgsYRR0datkzv6zLIaKrSqfHsiG',
  comment: true,
  pageview: true,
  reaction: true,
};

defineWalineConfig(walineOptions);

export default defineClientConfig({
  enhance({ app }) {
    // oxlint-disable-next-line typescript/no-non-null-assertion
    const CommentService = app.component('CommentService')!;

    // delete
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
