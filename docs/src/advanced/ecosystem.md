---
title: 生态系统
icon: ecosystem
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

## 插件

你可以使用下列插件来在不同工具上使用 Waline:

### Hexo

- [@waline/hexo-next](https://npmjs.com/@waline/hexo-next): Waline comment system for NexT.

### Docsify

- [docsify-waline](https://github.com/cxcn/docsify-waline): A simple comment plugin for docsify.

### VuePress

- [vuepress-plugin-comment2](https://vuepress-theme-hope.github.io/v2/comment/): Comment system for VuePress2.
- [@mr-hope/vuepress-plugin-comment](https://vuepress-theme-hope.github.io/v1/comment/): Comment system for VuePress1.

Others:

- [vuepress-plugin-waline](https://github.com/xinlei3166/vuepress-plugin-waline): Waline comment system for VuePress2.
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

### VuePress

- [hope](https://github.com/vuepress-theme-hope/vuepress-theme-hope)
- [stella](https://github.com/SHUAXINDIARY/vuepress-theme-stella)

### Hugo

- [hugo-theme-stack](https://github.com/CaiJimmy/hugo-theme-stack)
- [DoIt](https://github.com/HEIGE-PCloud/DoIt)

## 更多

我们期待来自社区的更多客户端和插件以扩展 Waline 生态。:tada:

如果你实现了 Waline 的客户端、生态插件与支持 Waline 的主题，欢迎在评论区中留言！
