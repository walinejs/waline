---
title: 生态系统
icon: ecosystem
order: 3
---

Waline 是经典的前后端分离 Client/Server 架构，提供了较为完善的 API 接口。你可以基于服务端提供的 API 自行实现自己的客户端实现。

## 客户端列表

- [@waline/client](https://npmjs.com/@waline/client)

  官方的客户端实现，使用 Vue + TypeScript 构建。

- [MiniValine](https://github.com/MiniValine/MiniValine)

  作者 [@MHuiG](https://github.com/MHuiG)，适配 Waline 接口。使用方式如下:

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

  作者 [@BeiyanYunyi](https://github.com/BeiyanYunyi)。使用 Solid.js 构建，使用方式详见项目页面和[说明文档](https://BeiyanYunyi.github.io/sodesu/)。

## Rust 实现

得益于前后端 API 分离的架构设计，[waline-mini](https://github.com/JQiue/waline-mini) 是 Rust 实现的服务端，非常适合运行在服务器资源受限的环境上。

## Cloudflare Workers 实现

[Waline_On_Worker](https://github.com/wuyilingwei/Waline_On_Worker) 是用户基于 Worker 实现的服务端，弥补了 Waline 无法运行在 Cloudflare Workers 上的不足。

## 插件

你可以使用下列插件来在不同工具上使用 Waline:

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

## 主题

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
- 🌟 [Keep](https://github.com/XPoet/hexo-theme-keep)

### VuePress

- [hope](https://github.com/vuepress-theme-hope/vuepress-theme-hope)
- [stella](https://github.com/SHUAXINDIARY/vuepress-theme-stella)

### Hugo

- [hugo-theme-stack](https://github.com/CaiJimmy/hugo-theme-stack)
- [DoIt](https://github.com/HEIGE-PCloud/DoIt)
- [FixIt](https://github.com/hugo-fixit/FixIt)
- [Kenny](https://github.com/Kindle-deep/hugo-theme-Kenny)

## 更多

我们期待来自社区的更多客户端和插件以扩展 Waline 生态。:tada:

如果你实现了 Waline 的客户端、生态插件与支持 Waline 的主题，欢迎发送 PR！
