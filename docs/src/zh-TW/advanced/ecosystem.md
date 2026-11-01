---
title: 生態系統
icon: ecosystem
order: 3
---

Waline 是經典的前後端分離 Client/Server 架構，提供了較為完善的 API 介面。你可以基於伺服器提供的 API 自行實作自己的客戶端。

## 客戶端清單

- [@waline/client](https://npmjs.com/@waline/client)

  官方的客戶端實作，使用 Vue + TypeScript 建構。

- [MiniValine](https://github.com/MiniValine/MiniValine)

  作者 [@MHuiG](https://github.com/MHuiG)，適配 Waline 介面。使用方式如下:

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

  作者 [@BeiyanYunyi](https://github.com/BeiyanYunyi)。使用 Solid.js 建構，使用方式詳見專案頁面與[說明文件](https://BeiyanYunyi.github.io/sodesu/)。

## Rust 實作

得益於前後端 API 分離的架構設計，[waline-mini](https://github.com/JQiue/waline-mini) 是 Rust 實作的伺服器，非常適合執行在伺服器資源受限的環境上。

## Cloudflare Workers 實作

[Waline_On_Worker](https://github.com/wuyilingwei/Waline_On_Worker) 是使用者基於 Worker 實作的伺服器，彌補了 Waline 無法執行在 Cloudflare Workers 上的不足。

## 外掛

你可以使用下列外掛來在不同工具上使用 Waline:

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

## 主題

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

我們期待來自社群的更多客戶端與外掛以擴展 Waline 生態。:tada:

如果你實作了 Waline 的客戶端、生態外掛與支援 Waline 的主題，歡迎發送 PR！
