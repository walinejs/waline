---
title: Hệ sinh thái
icon: ecosystem
order: 3
---

Waline is a classic Client/Server architecture, which provides a relatively complete API interface. you can implement your own client implementation based on the API provided by the server.

## Clients

- [@waline/client](https://npmjs.com/@waline/client)

  Official client implementation, build with Vue and TypeScript.

- [MiniValine](https://github.com/MiniValine/MiniValine)

  By [@MHuiG](https://github.com/MHuiG) , supports Waline API. Usage:

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

  By [@BeiyanYunyi](https://github.com/BeiyanYunyi), build with Solid.js. For usage, see its README and [website](https://BeiyanYunyi.github.io/sodesu/)。

## Rusty

[waline-mini](https://github.com/JQiue/waline-mini) is a server-side implementation in Rust, highly suitable for running in resource-constrained server environments.

## Cloudflare Workers

[Waline_On_Worker](https://github.com/wuyilingwei/Waline_On_Worker) là một triển khai phía máy chủ dựa trên Workers từ cộng đồng,弥補了 Waline không thể chạy trên Cloudflare Workers 的不足。

## Plugins

### Hexo

- [@waline/hexo-next](https://npmjs.com/@waline/hexo-next): Waline comment system for NexT.

### Docsify

- [docsify-waline](https://github.com/cxcn/docsify-waline): A simple comment plugin for docsify.

### VuePress

- [vuepress-plugin-comment2](https://vuepress-theme-hope.github.io/v2/comment/): Comment system for VuePress2.
- [@mr-hope/vuepress-plugin-comment](https://vuepress-theme-hope.github.io/v1/comment/): Comment system for VuePress1.

### Gatsby

- [gatsby-plugin-waline](https://www.npmjs.com/package/gatsby-plugin-waline): Comment system plugin for Gatsby.

Others:

- [vuepress-plugin-comment-plus](https://github.com/SivanLaai/vuepress-plugin-comment-plus): Comment system plugin for VuePress.

## Theme

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

## More

We are looking forward to more clients and plugins from the community to expand the Waline ecosystem. :tada:

If you implement any Waline client, ecological plugin or theme including Waline, please send a PR and let us know!
