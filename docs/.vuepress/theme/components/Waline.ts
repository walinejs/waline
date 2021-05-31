import { usePageLang } from '@vuepress/client';
import Waline from '@waline/client';
import {
  defineComponent,
  h,
  nextTick,
  onBeforeUnmount,
  onMounted,
  watch,
} from 'vue';
import { useRoute } from 'vue-router';
import WalineTips from './WalineTips';

import type { WalineInstance } from '@waline/client';
import type { VNode } from 'vue';

import './Waline.scss';

export default defineComponent({
  name: 'Waline',

  setup() {
    const lang = usePageLang();
    const route = useRoute();

    let waline: WalineInstance;

    onMounted(() => {
      waline = Waline({
        el: '#waline-comment',
        serverURL: 'https://waline.vercel.app',
        dark: 'html.dark',
        visitor: true,
        lang: lang.value === 'zh-CN' ? 'zh-CN' : 'en',
        locale: {
          admin: lang.value === 'zh-CN' ? '可爱的管理员' : 'Administrator',
        },
        emoji: [
          'https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/weibo',
          'https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/bilibili',
        ],
      }) as WalineInstance; // We are sure that waline will be initialized successfully
    });

    onBeforeUnmount(() => {
      waline.destroy();
    });

    // Refresh comment when navigating to a new page
    watch(
      () => route.path,
      () =>
        nextTick(() =>
          waline.update({
            lang: lang.value === 'zh-CN' ? 'zh-CN' : 'en',
            locale: {
              admin: lang.value === 'zh-CN' ? '可爱的管理员' : 'Administrator',
            },
          })
        )
    );

    return (): VNode =>
      h('div', { class: 'waline-wrapper' }, [
        h(WalineTips),
        h('div', { id: 'waline-comment' }),
      ]);
  },
});
