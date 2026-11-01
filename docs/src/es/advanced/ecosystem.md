---
title: Ecosistema
icon: ecosystem
order: 3
---

Waline es una arquitectura Cliente/Servidor clásica que proporciona una interfaz API bastante completa. Puedes implementar tu propio cliente basándote en la API que ofrece el servidor.

## Clientes

- [@waline/client](https://npmjs.com/@waline/client)

  Implementación oficial del cliente, construida con Vue y TypeScript.

- [MiniValine](https://github.com/MiniValine/MiniValine)

  Por [@MHuiG](https://github.com/MHuiG), compatible con la API de Waline. Uso:

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

  Por [@BeiyanYunyi](https://github.com/BeiyanYunyi), construido con Solid.js. Para su uso, consulta su README y su [sitio web](https://BeiyanYunyi.github.io/sodesu/).

## Rusty

[waline-mini](https://github.com/JQiue/waline-mini) es una implementación del lado del servidor en Rust, muy adecuada para ejecutarse en entornos de servidor con recursos limitados.

## Cloudflare Workers

[Waline_On_Worker](https://github.com/wuyilingwei/Waline_On_Worker) es una implementación del lado del servidor basada en Workers hecha por la comunidad, que cubre la carencia de que Waline no puede ejecutarse en Cloudflare Workers.

## Plugins

### Hexo

- [@waline/hexo-next](https://npmjs.com/@waline/hexo-next): sistema de comentarios de Waline para NexT.

### Docsify

- [docsify-waline](https://github.com/cxcn/docsify-waline): un plugin de comentarios sencillo para docsify.

### VuePress

- [vuepress-plugin-comment2](https://vuepress-theme-hope.github.io/v2/comment/): sistema de comentarios para VuePress2.
- [@mr-hope/vuepress-plugin-comment](https://vuepress-theme-hope.github.io/v1/comment/): sistema de comentarios para VuePress1.

### Gatsby

- [gatsby-plugin-waline](https://www.npmjs.com/package/gatsby-plugin-waline): plugin de sistema de comentarios para Gatsby.

Otros:

- [vuepress-plugin-comment-plus](https://github.com/SivanLaai/vuepress-plugin-comment-plus): plugin de sistema de comentarios para VuePress.

## Temas

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

## Más

Esperamos con ganas más clientes y plugins de la comunidad para ampliar el ecosistema de Waline. :tada:

Si implementas cualquier cliente de Waline, plugin del ecosistema o tema que incluya Waline, ¡envía un PR y avísanos!
