import { Fancybox } from '@fancyapps/ui/dist/fancybox/fancybox.esm.js';
import { onMounted, onBeforeUnmount } from 'vue';
import { defineClientConfig } from 'vuepress/client';

export default defineClientConfig({
  setup() {
    onMounted(() => Fancybox.bind('#comment .wl-content img'));
    onBeforeUnmount(() => Fancybox.destroy());
  },
});
