---
title: Ökosystem
icon: ecosystem
order: 3
---

Waline ist eine klassische Client/Server-Architektur, die eine relativ vollständige API-Schnittstelle bietet. Sie können Ihre eigene Client-Implementierung basierend auf der vom Server bereitgestellten API implementieren.

## Clients

- [@waline/client](https://npmjs.com/@waline/client)

  Offizielle Client-Implementierung, erstellt mit Vue und TypeScript.

- [MiniValine](https://github.com/MiniValine/MiniValine)

  Von [@MHuiG](https://github.com/MHuiG), unterstützt Waline API. Verwendung:

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

  Von [@BeiyanYunyi](https://github.com/BeiyanYunyi), erstellt mit Solid.js. Für die Verwendung siehe dessen README und [Website](https://BeiyanYunyi.github.io/sodesu/).

## Rusty

[waline-mini](https://github.com/JQiue/waline-mini) ist eine serverseitige Implementierung in Rust, die sich hervorragend für den Betrieb in ressourcenbeschränkten Serverumgebungen eignet.

## Cloudflare Workers

[Waline_On_Worker](https://github.com/wuyilingwei/Waline_On_Worker) ist eine von der Community entwickelte serverseitige Implementierung basierend auf Workers und behebt die Unzulänglichkeit, dass Waline nicht auf Cloudflare Workers laufen kann.

## Plugins

### Hexo

- [@waline/hexo-next](https://npmjs.com/@waline/hexo-next): Waline-Kommentarsystem für NexT.

### Docsify

- [docsify-waline](https://github.com/cxcn/docsify-waline): Ein einfaches Kommentar-Plugin für Docsify.

### VuePress

- [vuepress-plugin-comment2](https://vuepress-theme-hope.github.io/v2/comment/): Kommentarsystem für VuePress2.
- [@mr-hope/vuepress-plugin-comment](https://vuepress-theme-hope.github.io/v1/comment/): Kommentarsystem für VuePress1.

### Gatsby

- [gatsby-plugin-waline](https://www.npmjs.com/package/gatsby-plugin-waline): Kommentarsystem-Plugin für Gatsby.

Andere:

- [vuepress-plugin-comment-plus](https://github.com/SivanLaai/vuepress-plugin-comment-plus): Kommentarsystem-Plugin für VuePress.

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

## Mehr

Wir freuen uns auf weitere Clients und Plugins aus der Community, um das Waline-Ökosystem zu erweitern. :tada:

Wenn Sie einen Waline-Client, ein ökologisches Plugin oder ein Theme implementieren, das Waline enthält, senden Sie bitte einen PR und lassen Sie es uns wissen!
