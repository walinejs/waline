---
title: エコシステム
icon: ecosystem
order: 3
---

Walineは古典的なクライアント/サーバーアーキテクチャで、比較的完全なAPIインターフェースを提供しています。サーバーが提供するAPIに基づいて、独自のクライアントを実装できます。

## クライアント

- [@waline/client](https://npmjs.com/@waline/client)

  VueとTypeScriptで構築された公式のクライアント実装です。

- [MiniValine](https://github.com/MiniValine/MiniValine)

  [@MHuiG](https://github.com/MHuiG)による、Waline APIをサポートする実装です。使用方法：

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

  [@BeiyanYunyi](https://github.com/BeiyanYunyi)による、Solid.jsで構築されたクライアントです。使用方法はREADMEと[ウェブサイト](https://BeiyanYunyi.github.io/sodesu/)を参照してください。

## Rusty

[waline-mini](https://github.com/JQiue/waline-mini)はRustによるサーバー側実装で、リソースが限られたサーバー環境での実行に非常に適しています。

## Cloudflare Workers

[Waline_On_Worker](https://github.com/wuyilingwei/Waline_On_Worker)は、コミュニティによるWorkersベースのサーバー側実装で、WalineがCloudflare Workers上で実行できないという弱点を補っています。

## プラグイン

### Hexo

- [@waline/hexo-next](https://npmjs.com/@waline/hexo-next): NexT用のWalineコメントシステム。

### Docsify

- [docsify-waline](https://github.com/cxcn/docsify-waline): docsify用のシンプルなコメントプラグイン。

### VuePress

- [vuepress-plugin-comment2](https://vuepress-theme-hope.github.io/v2/comment/): VuePress2用のコメントシステム。
- [@mr-hope/vuepress-plugin-comment](https://vuepress-theme-hope.github.io/v1/comment/): VuePress1用のコメントシステム。

### Gatsby

- [gatsby-plugin-waline](https://www.npmjs.com/package/gatsby-plugin-waline): Gatsby用のコメントシステムプラグイン。

その他：

- [vuepress-plugin-comment-plus](https://github.com/SivanLaai/vuepress-plugin-comment-plus): VuePress用のコメントシステムプラグイン。

## テーマ

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

## その他

Walineのエコシステムを広げるため、コミュニティからのより多くのクライアントやプラグインを期待しています。 :tada:

Walineのクライアント、Walineを含むエコシステムのプラグインやテーマを実装した場合は、PRを送ってお知らせください！
