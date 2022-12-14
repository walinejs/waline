import { usePageFrontmatter } from '@vuepress/client';
import { computed, defineComponent, h, resolveComponent } from 'vue';

import BreadCrumb from '@theme-hope/components/BreadCrumb';
import MarkdownContent from '@theme-hope/components/MarkdownContent';
import PageNav from '@theme-hope/components/PageNav';
import PageTitle from '@theme-hope/components/PageTitle';
import WalineTips from './WalineTips';

import { useThemeLocaleData } from '@theme-hope/composables/index';

import PageMeta from '@theme-hope/modules/info/components/PageMeta';
import TOC from '@theme-hope/modules/info/components/TOC';

import { useDarkMode } from '@theme-hope/modules/outlook/composables/index';

import type { VNode } from 'vue';
import type { ThemeNormalPageFrontmatter } from 'vuepress-theme-hope';

import 'vuepress-theme-hope/styles/page.scss';

export default defineComponent({
  name: 'NormalPage',

  setup(_props, { slots }) {
    const frontmatter = usePageFrontmatter<ThemeNormalPageFrontmatter>();
    const { isDarkMode } = useDarkMode();
    const themeLocale = useThemeLocaleData();

    const tocEnable = computed(
      () =>
        frontmatter.value.toc ||
        (frontmatter.value.toc !== false && themeLocale.value.toc !== false)
    );

    return (): VNode =>
      h('main', { class: 'page', id: 'main-content' }, [
        slots.top?.(),
        h(BreadCrumb),
        h(PageTitle),
        tocEnable.value
          ? h(TOC, {
              headerDepth:
                frontmatter.value.headerDepth ?? themeLocale.value.headerDepth,
            })
          : null,
        slots.contentBefore?.(),
        h(MarkdownContent),
        slots.contentAfter?.(),
        h(PageMeta),
        h(PageNav),
        h(WalineTips),
        h(resolveComponent('CommentService'), {
          darkmode: isDarkMode.value,
        }),
        slots.bottom?.(),
      ]);
  },
});
