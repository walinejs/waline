import { defineComponent, h, resolveComponent } from 'vue';
import HopeProjectHome from 'vuepress-theme-hope/lib/client/components/home/ProjectHome';
import WalineTips from './WalineTips';

import type { VNode } from 'vue';

export default defineComponent({
  name: 'ProjectHome',

  setup() {
    return (): VNode =>
      h(
        HopeProjectHome,
        {},
        { bottom: () => [h(WalineTips), h(resolveComponent('PageComment'))] }
      );
  },
});
