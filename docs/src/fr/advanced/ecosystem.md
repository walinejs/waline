---
title: Écosystème
icon: ecosystem
order: 3
---

Waline repose sur une architecture client/serveur classique et fournit une interface API relativement complète. Vous pouvez implémenter votre propre client à partir de l'API fournie par le serveur.

## Clients

- [@waline/client](https://npmjs.com/@waline/client)

  Implémentation officielle du client, développée avec Vue et TypeScript.

- [MiniValine](https://github.com/MiniValine/MiniValine)

  Par [@MHuiG](https://github.com/MHuiG), prend en charge l'API Waline. Utilisation :

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

  Par [@BeiyanYunyi](https://github.com/BeiyanYunyi), développé avec Solid.js. Pour l'utilisation, consultez son README et son [site web](https://BeiyanYunyi.github.io/sodesu/).

## Rusty

[waline-mini](https://github.com/JQiue/waline-mini) est une implémentation serveur en Rust, particulièrement adaptée aux environnements serveur disposant de ressources limitées.

## Cloudflare Workers

[Waline_On_Worker](https://github.com/wuyilingwei/Waline_On_Worker) est une implémentation serveur basée sur Workers réalisée par la communauté, qui comble l'absence de prise en charge de Cloudflare Workers par Waline.

## Plugins

### Hexo

- [@waline/hexo-next](https://npmjs.com/@waline/hexo-next) : système de commentaires Waline pour NexT.

### Docsify

- [docsify-waline](https://github.com/cxcn/docsify-waline) : un plugin de commentaires simple pour docsify.

### VuePress

- [vuepress-plugin-comment2](https://vuepress-theme-hope.github.io/v2/comment/) : système de commentaires pour VuePress 2.
- [@mr-hope/vuepress-plugin-comment](https://vuepress-theme-hope.github.io/v1/comment/) : système de commentaires pour VuePress 1.

### Gatsby

- [gatsby-plugin-waline](https://www.npmjs.com/package/gatsby-plugin-waline) : plugin de système de commentaires pour Gatsby.

Autres :

- [vuepress-plugin-comment-plus](https://github.com/SivanLaai/vuepress-plugin-comment-plus) : plugin de système de commentaires pour VuePress.

## Thèmes

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

## Pour aller plus loin

Nous attendons avec impatience davantage de clients et de plugins de la communauté pour enrichir l'écosystème Waline. :tada:

Si vous implémentez un client Waline, un plugin ou un thème intégrant Waline, envoyez-nous une PR pour nous le faire savoir !
