---
title: Экосистема
icon: ecosystem
order: 3
---

Waline построен на классической архитектуре «клиент — сервер» и предоставляет достаточно полный API. Опираясь на API сервера, можно реализовать собственный клиент.

## Клиенты

- [@waline/client](https://npmjs.com/@waline/client)

  Официальная реализация клиента, написанная на Vue и TypeScript.

- [MiniValine](https://github.com/MiniValine/MiniValine)

  От [@MHuiG](https://github.com/MHuiG), поддерживает API Waline. Использование:

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

  От [@BeiyanYunyi](https://github.com/BeiyanYunyi), написан на Solid.js. Об использовании смотрите README и [сайт](https://BeiyanYunyi.github.io/sodesu/).

## Rust

[waline-mini](https://github.com/JQiue/waline-mini) — серверная реализация на Rust, отлично подходящая для запуска в средах с ограниченными ресурсами.

## Cloudflare Workers

[Waline_On_Worker](https://github.com/wuyilingwei/Waline_On_Worker) — серверная реализация на основе Workers от сообщества, компенсирующая недостаток: Waline не может работать на Cloudflare Workers.

## Плагины

### Hexo

- [@waline/hexo-next](https://npmjs.com/@waline/hexo-next): система комментариев Waline для NexT.

### Docsify

- [docsify-waline](https://github.com/cxcn/docsify-waline): простой плагин комментариев для docsify.

### VuePress

- [vuepress-plugin-comment2](https://vuepress-theme-hope.github.io/v2/comment/): система комментариев для VuePress 2.
- [@mr-hope/vuepress-plugin-comment](https://vuepress-theme-hope.github.io/v1/comment/): система комментариев для VuePress 1.

### Gatsby

- [gatsby-plugin-waline](https://www.npmjs.com/package/gatsby-plugin-waline): плагин системы комментариев для Gatsby.

Другие:

- [vuepress-plugin-comment-plus](https://github.com/SivanLaai/vuepress-plugin-comment-plus): плагин системы комментариев для VuePress.

## Темы

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

## Дополнительно

Мы ждём новых клиентов и плагинов от сообщества, которые расширят экосистему Waline. :tada:

Если вы реализовали клиент Waline, плагин для экосистемы или тему с поддержкой Waline, отправьте PR и расскажите нам!
