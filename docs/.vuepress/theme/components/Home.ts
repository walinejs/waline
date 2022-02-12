import { defineComponent, h, resolveComponent } from 'vue';
import ProjectHome from '@theme-hope/components/home/ProjectHome';
import WalineTips from './WalineTips';

import type { VNode } from 'vue';

export default defineComponent({
  name: 'WalineHome',

  setup() {
    return (): VNode =>
      h(
        ProjectHome,
        {},
        { bottom: () => [h(WalineTips), h(resolveComponent('PageComment'))] }
      );
  },
});
