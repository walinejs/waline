import { defineComponent, h, resolveComponent } from 'vue';
import { usePageData, usePageFrontmatter } from '@vuepress/client';

import FadeSideY from '@theme-hope/components/transitions/FadeSlideY';
import SkipLink from '@theme-hope/components/SkipLink';
import Home from '../components/Home';
import Page from '../components/Page';

import type { VNode } from 'vue';
import type { HopeThemePageFrontmatter } from 'vuepress-theme-hope';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Layout',

  setup() {
    const page = usePageData();
    const frontmatter = usePageFrontmatter<HopeThemePageFrontmatter>();

    return (): VNode[] => [
      h(SkipLink),
      h(resolveComponent('CommonWrapper'), {}, () =>
        frontmatter.value.home
          ? h(Home)
          : h(FadeSideY, {}, () => h(Page, { key: page.value.path }))
      ),
    ];
  },
});
