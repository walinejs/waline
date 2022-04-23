import { usePageFrontmatter } from '@vuepress/client';
import { computed, defineComponent, h, resolveComponent } from 'vue';

import BreadCrumb from '@theme-hope/components/BreadCrumb';
import MarkdownContent from '@theme-hope/components/MarkdownContent';
import PageNav from '@theme-hope/components/PageNav';
import PageTitle from '@theme-hope/components/PageTitle';
import WalineTips from './WalineTips';

import { useThemeLocaleData } from '@theme-hope/composables';

import PageMeta from '@theme-hope/module/info/components/PageMeta';
import TOC from '@theme-hope/module/info/components/TOC';

import { useDarkMode } from '@theme-hope/module/outlook/composables';

import type { VNode } from 'vue';
import type { HopeThemeNormalPageFrontmatter } from '../../shared';

import 'vuepress-theme-hope/lib/client/styles/page.scss';

export default defineComponent({
  name: 'NormalPage',

  setup(_props, { slots }) {
    const frontmatter = usePageFrontmatter<HopeThemeNormalPageFrontmatter>();
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
