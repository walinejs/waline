import { usePageFrontmatter, useRouteLocale } from '@vuepress/client';
import { computed, defineComponent, h } from 'vue';

import type { VNode } from 'vue';
import type {
  DefaultThemeHomePageFrontmatter,
  DefaultThemePageFrontmatter,
} from '@vuepress/theme-default/lib/shared';

const i18n: Record<string, string> = {
  '/': '友情提示：评论区仅作评论展示，如有问题咨询请去 <a href="https://github.com/walinejs/waline/discussions" target="_blank">Github Discussion</a> 中提问。',
  '/en/':
    'TIPS: The comment area is only for demo. If you have any questions, please go to <a href="https://github.com/walinejs/waline/discussions" target="_blank">Github Discussion</a> to ask.',
};

import './WalineTips.scss';

export default defineComponent({
  name: 'WalineTips',

  setup() {
    const frontmatter =
      usePageFrontmatter<
        DefaultThemeHomePageFrontmatter | DefaultThemePageFrontmatter
      >();
    const routeLocale = useRouteLocale();

    const isHome = computed(() => frontmatter.value.home || false);
    const text = computed(() => i18n[routeLocale.value]);

    return (): VNode =>
      h('div', {
        class: {
          'waline-tips': true,
          'page-nav': !isHome.value,
        },
        innerHTML: text.value,
      });
  },
});
