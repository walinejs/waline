import { defineClientConfig } from '@vuepress/client';
import { onMounted, onBeforeUnmount } from 'vue';
import { Fancybox } from '@fancyapps/ui/dist/fancybox/fancybox.esm.js';

export default defineClientConfig({
  setup() {
    onMounted(() => Fancybox.bind('#comment .wl-content img'));
    onBeforeUnmount(() => Fancybox.destroy());
  },
});
