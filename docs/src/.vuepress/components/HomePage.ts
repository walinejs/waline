import { defineComponent, h, resolveComponent } from 'vue';
import HopeHomePage from 'vuepress-theme-hope/lib/client/components/HomePage';
import WalineTips from './WalineTips';

import type { VNode } from 'vue';

export default defineComponent({
  name: 'HopePage',

  setup() {
    return (): VNode =>
      h(
        HopeHomePage,
        {},
        { bottom: () => [h(WalineTips), h(resolveComponent('PageComment'))] }
      );
  },
});
