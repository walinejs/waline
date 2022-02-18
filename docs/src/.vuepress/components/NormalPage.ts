import { usePageFrontmatter } from '@vuepress/client';
import { computed, defineComponent, h, resolveComponent } from 'vue';

import MarkdownContent from '@theme-hope/components/MarkdownContent';
import PageMeta from '@theme-hope/components/PageMeta';
import PageNav from '@theme-hope/components/PageNav';
import PageTitle from '@theme-hope/components/PageTitle';
import { useIconPrefix } from '@theme-hope/composables';
import { useThemeLocaleData } from '@theme-hope/composables';
import WalineTips from './WalineTips';

import type { VNode } from 'vue';
import type { HopeThemeNormalPageFrontmatter } from 'vuepress-theme-hope';

import 'vuepress-theme-hope/lib/client/styles/page.scss';

export default defineComponent({
  name: 'NormalPage',

  setup(_props, { slots }) {
    const frontmatter = usePageFrontmatter<HopeThemeNormalPageFrontmatter>();
    const iconPrefix = useIconPrefix();
    const themeLocale = useThemeLocaleData();

    const breadcrumbEnable = computed(
      () =>
        frontmatter.value.breadcrumb ||
        (frontmatter.value.breadcrumb !== false &&
          themeLocale.value.breadcrumb !== false)
    );

    return (): VNode =>
      h('main', { class: 'page', id: 'main-content' }, [
        slots.top?.(),
        h(resolveComponent('BreadCrumb'), {
          enable: breadcrumbEnable.value,
          icon: themeLocale.value.breadcrumbIcon,
          iconPrefix: iconPrefix.value,
        }),
        h(PageTitle),
        h(resolveComponent('TOC')),
        slots.contentBefore?.(),
        h(MarkdownContent),
        slots.contentAfter?.(),
        h(PageMeta),
        h(PageNav),
        h(WalineTips),
        h(resolveComponent('PageComment')),
        slots.bottom?.(),
      ]);
  },
});
