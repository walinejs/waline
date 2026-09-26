---
title: 생태계
icon: ecosystem
order: 3
---

Waline은 클래식한 클라이언트/서버 아키텍처로, 비교적 완전한 API 인터페이스를 제공합니다. 서버에서 제공하는 API를 기반으로 자체 클라이언트를 구현할 수 있습니다.

## 클라이언트

- [@waline/client](https://npmjs.com/@waline/client)

  공식 클라이언트 구현체로, Vue와 TypeScript로 구축되었습니다.

- [MiniValine](https://github.com/MiniValine/MiniValine)

  [@MHuiG](https://github.com/MHuiG) 제작, Waline API를 지원합니다. 사용법:

  ```html
  <script src="https://unpkg.com/minivaline/dist/MiniValine.min.js"></script>

  <div id="waline-comments"></div>
  <script>
    new MiniValine({
      el: '#waline-comments',
      backend: 'waline',
      serverURLs: 'YOUR SERVER URL',
    });
  </script>
  ```

- [sodesu](https://github.com/BeiyanYunyi/sodesu)

  [@BeiyanYunyi](https://github.com/BeiyanYunyi) 제작, Solid.js로 구축되었습니다. 사용법은 README와 [웹사이트](https://BeiyanYunyi.github.io/sodesu/)를 참고하세요。

## Rust 구현

[waline-mini](https://github.com/JQiue/waline-mini)는 Rust로 구현된 서버 측 구현체로, 리소스가 제한된 서버 환경에서 실행하기에 매우 적합합니다.

## Cloudflare Workers

[Waline_On_Worker](https://github.com/wuyilingwei/Waline_On_Worker)는 커뮤니티에서 개발한 Worker 기반의 서버 측 구현으로, Waline이 Cloudflare Workers에서 실행될 수 없는 단점을 보완합니다.

## 플러그인

### Hexo

- [@waline/hexo-next](https://npmjs.com/@waline/hexo-next): NexT용 Waline 댓글 시스템.

### Docsify

- [docsify-waline](https://github.com/cxcn/docsify-waline): Docsify용 간단한 댓글 플러그인.

### VuePress

- [vuepress-plugin-comment2](https://vuepress-theme-hope.github.io/v2/comment/): VuePress2용 댓글 시스템.
- [@mr-hope/vuepress-plugin-comment](https://vuepress-theme-hope.github.io/v1/comment/): VuePress1용 댓글 시스템.

### Gatsby

- [gatsby-plugin-waline](https://www.npmjs.com/package/gatsby-plugin-waline): Gatsby용 댓글 시스템 플러그인.

기타:

- [vuepress-plugin-comment-plus](https://github.com/SivanLaai/vuepress-plugin-comment-plus): VuePress용 댓글 시스템 플러그인.

## 테마

### Hexo

- 🦋 [Butterfly](https://github.com/jerryc127/hexo-theme-butterfly)
- 🍬 [Kratos-Rebirth](https://github.com/Candinya/Kratos-Rebirth)
- 🍭 [MengD](https://github.com/lete114/hexo-theme-MengD)
- ⛲ [Fluid](https://github.com/fluid-dev/hexo-theme-fluid)
- 🚚 [Kaze](https://github.com/theme-kaze/hexo-theme-kaze)
- ✌🏻 [Volantis](https://github.com/volantis-x/hexo-theme-volantis)
- 🗒 [Blank](https://github.com/dewjohn/hexo-theme-blank)
- 🐴 [Stun](https://github.com/liuyib/hexo-theme-stun)
- 🤖 [Yun](https://github.com/YunYouJun/hexo-theme-yun)
- 🦄 [Unicorn](https://github.com/Uzizkp/hexo-theme-unicorn)
- 💀 [freemind.bithack](https://github.com/Ares-X/hexo-theme-freemind.bithack)
- 🤡 [Redefine](https://github.com/EvanNotFound/hexo-theme-redefine)

### VuePress

- [hope](https://github.com/vuepress-theme-hope/vuepress-theme-hope)
- [stella](https://github.com/SHUAXINDIARY/vuepress-theme-stella)

### Hugo

- [hugo-theme-stack](https://github.com/CaiJimmy/hugo-theme-stack)
- [DoIt](https://github.com/HEIGE-PCloud/DoIt)
- [Kenny](https://github.com/Kindle-deep/hugo-theme-Kenny)

## 더 보기

커뮤니티에서 Waline 생태계를 확장하기 위한 더 많은 클라이언트와 플러그인을 기대합니다. :tada:

Waline 클라이언트, 생태계 플러그인 또는 Waline을 포함한 테마를 구현하셨다면, PR을 보내 알려주세요!
