import type { VNode } from 'vue';
import { computed, defineComponent, h } from 'vue';
import { usePageFrontmatter, useRouteLocale } from 'vuepress/client';
import type {
  ThemeNormalPageFrontmatter,
  ThemeProjectHomePageFrontmatter,
} from 'vuepress-theme-hope';

import './WalineTips.scss';

const i18n: Record<string, string> = {
  '/': '友情提示：评论区仅作评论展示，如有问题咨询请去 <a href="https://github.com/walinejs/waline/discussions" target="_blank">Github Discussion</a> 中提问。',
  '/en/':
    'TIPS: The comment area is only for demo. If you have any questions, please go to <a href="https://github.com/walinejs/waline/discussions" target="_blank">Github Discussion</a> to ask.',
  '/de/':
    'TIPS: Der Kommentarbereich dient nur zur Demonstration. Wenn Sie Fragen haben, gehen Sie bitte zu <a href="https://github.com/walinejs/waline/discussions" target="_blank">Github Discussion</a> um zu fragen.',
  '/fr/':
    'TIPS: La zone de commentaire est uniquement à des fins de démonstration. Si vous avez des questions, veuillez vous rendre sur <a href="https://github.com/walinejs/waline/discussions" target="_blank">Github Discussion</a> pour poser vos questions.',
  '/it/':
    'TIPS: L\'area dei commenti è solo a scopo dimostrativo. Se hai domande, vai su <a href="https://github.com/walinejs/waline/discussions" target="_blank">Github Discussion</a> per chiedere.',
  '/jp/':
    'TIPS: コメントエリアはデモ用です。質問がある場合は、<a href="https://github.com/walinejs/waline/discussions" target="_blank">Github Discussion</a> で質問してください。',
  '/ko-KR/':
    'TIPS: 댓글 영역은 데모용입니다. 질문이 있는 경우 <a href="https://github.com/walinejs/waline/discussions" target="_blank">Github Discussion</a> 에서 질문하세요.',
  '/pt-BR/':
    'TIPS: A área de comentários é apenas para demonstração. Se você tiver alguma dúvida, vá para <a href="https://github.com/walinejs/waline/discussions" target="_blank">Github Discussion</a> para perguntar.',
  '/zh-TW/':
    'TIPS: 評論區僅作評論展示，如有問題諮詢請去 <a href="https://github.com/walinejs/waline/discussions" target="_blank">Github Discussion</a> 中提問。',
  '/vi-VN/':
    'TIPS: Khu vực bình luận chỉ dành cho mục đích demo. Nếu bạn có bất kỳ câu hỏi nào, vui lòng đến <a href="https://github.com/walinejs/waline/discussions" target="_blank">Github Discussion</a> để hỏi.',
  '/ru/':
    'TIPS: Область комментариев предназначена только для демонстрации. Если у вас есть вопросы, пожалуйста, перейдите на <a href="https://github.com/walinejs/waline/discussions" target="_blank">Github Discussion</a> чтобы задать их.',
  '/es/':
    'TIPS: El área de comentarios es solo para demostración. Si tienes alguna pregunta, por favor ve a <a href="https://github.com/walinejs/waline/discussions" target="_blank">Github Discussion</a> para preguntar.',
};

export default defineComponent({
  name: 'WalineTips',

  setup() {
    const frontmatter = usePageFrontmatter<
      ThemeProjectHomePageFrontmatter | ThemeNormalPageFrontmatter
    >();
    const routeLocale = useRouteLocale();

    const isHome = computed(() => frontmatter.value.home ?? false);
    const text = computed(() => i18n[routeLocale.value]);

    return (): VNode =>
      h(
        'div',
        { class: ['waline-tips-wrapper', { home: isHome.value }] },
        h('div', {
          class: 'waline-tips',
          innerHTML: text.value,
        }),
      );
  },
});
