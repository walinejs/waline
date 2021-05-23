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
import type { RouteLocation } from 'vue-router';

import './Waline.scss';

export default defineComponent({
  name: 'Waline',

  setup() {
    const lang = usePageLang();
    const route = useRoute();

    let timeout: number | null = null;
    let waline: WalineInstance;

    const initWaline = (): WalineInstance =>
      Waline({
        el: '#waline-comment',
        serverURL: 'https://waline.vercel.app',
        visitor: true,
        lang: lang.value === 'zh-CN' ? 'zh-CN' : 'en',
        locale: {
          admin: lang.value === 'zh-CN' ? '可爱的管理员' : 'Administrator',
        },
      }) as WalineInstance;

    onMounted(() => {
      timeout = setTimeout(() => {
        waline = initWaline();
      }, 1000);
    });

    onBeforeUnmount(() => {
      if (timeout) clearTimeout(timeout);
      waline.destroy();
    });

    watch(
      () => route,
      (newValue: RouteLocation, oldValue: RouteLocation) => {
        // Refresh comment when navigating to a new page
        if (newValue.path !== oldValue.path) {
          void nextTick(() => {
            if (timeout) clearTimeout(timeout);

            timeout = setTimeout(() => {
              waline.update({
                lang: lang.value === 'zh-CN' ? 'zh-CN' : 'en',
                locale: {
                  admin:
                    lang.value === 'zh-CN' ? '可爱的管理员' : 'Administrator',
                },
              });
            }, 1000);
          });
        }
      }
    );

    return (): VNode =>
      h('div', { class: 'waline-wrapper' }, [
        h(WalineTips),
        h('div', { id: 'waline-comment' }),
      ]);
  },
});
