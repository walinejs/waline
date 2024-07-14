import { Fancybox } from '@fancyapps/ui/dist/fancybox/fancybox.esm.js';
import type { WalineOptions } from '@vuepress/plugin-comment/client';
import { defineWalineConfig } from '@vuepress/plugin-comment/client';
import { onBeforeUnmount, onMounted } from 'vue';
import { defineClientConfig } from 'vuepress/client';

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
  setup() {
    onMounted(() => Fancybox.bind('#vp-comment .wl-content img'));
    onBeforeUnmount(() => Fancybox.destroy());
  },
});
