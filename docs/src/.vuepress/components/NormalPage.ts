import { usePageFrontmatter } from '@vuepress/client';
import {
  type ComponentOptions,
  type VNode,
  computed,
  defineComponent,
  h,
  resolveComponent,
} from 'vue';
import { RenderDefault, hasGlobalComponent } from 'vuepress-shared/client';

import BreadCrumb from '@theme-hope/components/BreadCrumb';
import MarkdownContent from '@theme-hope/components/MarkdownContent';
import PageNav from '@theme-hope/components/PageNav';
import PageTitle from '@theme-hope/components/PageTitle';
import { useThemeLocaleData } from '@theme-hope/composables/index';
import PageMeta from '@theme-hope/modules/info/components/PageMeta';
import TOC from '@theme-hope/modules/info/components/TOC';
import { useDarkmode } from '@theme-hope/modules/outlook/composables/index';
import WalineTips from './WalineTips.js';

import type { ThemeNormalPageFrontmatter } from 'vuepress-theme-hope';

import 'vuepress-theme-hope/styles/page.scss';

export default defineComponent({
  name: 'NormalPage',

  setup(_props, { slots }) {
    const frontmatter = usePageFrontmatter<ThemeNormalPageFrontmatter>();
    const { isDarkmode } = useDarkmode();
    const themeLocale = useThemeLocaleData();

    const tocEnable = computed(
      () =>
        frontmatter.value.toc ||
        (frontmatter.value.toc !== false && themeLocale.value.toc !== false)
    );

    return (): VNode =>
      h(
        'main',
        { class: 'page', id: 'main-content' },
        h(
          hasGlobalComponent('LocalEncrypt')
            ? <ComponentOptions>resolveComponent('LocalEncrypt')
            : RenderDefault,
          () => [
            slots['top']?.(),
            h(BreadCrumb),
            h(PageTitle),
            tocEnable.value
              ? h(
                  TOC,
                  {
                    headerDepth:
                      frontmatter.value.headerDepth ??
                      themeLocale.value.headerDepth ??
                      2,
                  },
                  {
                    before: () => slots['tocBefore']?.(),
                    after: () => slots['tocAfter']?.(),
                  }
                )
              : null,
            slots['contentBefore']?.(),
            h(MarkdownContent),
            slots['contentAfter']?.(),
            h(PageMeta),
            h(PageNav),
            h(WalineTips),
            hasGlobalComponent('CommentService')
              ? h(resolveComponent('CommentService'), {
                  darkmode: isDarkmode.value,
                })
              : null,
            slots['bottom']?.(),
          ]
        )
      );
  },
});
