---
title: Ecosistema
icon: ecosystem
order: 3
---

Waline è una classica architettura Client/Server che fornisce un'interfaccia API piuttosto completa. Puoi realizzare la tua implementazione del client basandoti sulle API offerte dal server.

## Client

- [@waline/client](https://npmjs.com/@waline/client)

  Implementazione ufficiale del client, realizzata con Vue e TypeScript.

- [MiniValine](https://github.com/MiniValine/MiniValine)

  Di [@MHuiG](https://github.com/MHuiG), supporta l'API di Waline. Utilizzo:

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

  Di [@BeiyanYunyi](https://github.com/BeiyanYunyi), realizzato con Solid.js. Per l'utilizzo, consulta il suo README e il [sito](https://BeiyanYunyi.github.io/sodesu/).

## Rusty

[waline-mini](https://github.com/JQiue/waline-mini) è un'implementazione lato server in Rust, particolarmente adatta all'esecuzione in ambienti server con risorse limitate.

## Cloudflare Workers

[Waline_On_Worker](https://github.com/wuyilingwei/Waline_On_Worker) è un'implementazione lato server basata su Workers realizzata dalla community, che colma la lacuna per cui Waline non può essere eseguito su Cloudflare Workers.

## Plugin

### Hexo

- [@waline/hexo-next](https://npmjs.com/@waline/hexo-next): sistema di commenti Waline per NexT.

### Docsify

- [docsify-waline](https://github.com/cxcn/docsify-waline): un semplice plugin di commenti per docsify.

### VuePress

- [vuepress-plugin-comment2](https://vuepress-theme-hope.github.io/v2/comment/): sistema di commenti per VuePress2.
- [@mr-hope/vuepress-plugin-comment](https://vuepress-theme-hope.github.io/v1/comment/): sistema di commenti per VuePress1.

### Gatsby

- [gatsby-plugin-waline](https://www.npmjs.com/package/gatsby-plugin-waline): plugin del sistema di commenti per Gatsby.

Altri:

- [vuepress-plugin-comment-plus](https://github.com/SivanLaai/vuepress-plugin-comment-plus): plugin del sistema di commenti per VuePress.

## Tema

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

## Altro

Aspettiamo con impazienza sempre più client e plugin dalla community per ampliare l'ecosistema di Waline. :tada:

Se hai realizzato un client Waline, un plugin per l'ecosistema o un tema che include Waline, invia una PR e faccelo sapere!
