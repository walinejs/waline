---
title: Ecossistema
icon: ecosystem
order: 3
---

O Waline é uma arquitetura Cliente/Servidor clássica, que fornece uma interface de API relativamente completa. Você pode implementar o seu próprio cliente com base na API fornecida pelo servidor.

## Clientes

- [@waline/client](https://npmjs.com/@waline/client)

  Implementação oficial do cliente, construída com Vue e TypeScript.

- [MiniValine](https://github.com/MiniValine/MiniValine)

  Por [@MHuiG](https://github.com/MHuiG), oferece suporte à API do Waline. Uso:

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

  Por [@BeiyanYunyi](https://github.com/BeiyanYunyi), construído com Solid.js. Para o uso, consulte o README e o [site](https://BeiyanYunyi.github.io/sodesu/).

## Rusty

[waline-mini](https://github.com/JQiue/waline-mini) é uma implementação do lado do servidor em Rust, altamente adequada para rodar em ambientes de servidor com recursos limitados.

## Cloudflare Workers

[Waline_On_Worker](https://github.com/wuyilingwei/Waline_On_Worker) é uma implementação do lado do servidor baseada em Workers feita pela comunidade, que supre a limitação de o Waline não conseguir rodar no Cloudflare Workers.

## Plugins

### Hexo

- [@waline/hexo-next](https://npmjs.com/@waline/hexo-next): sistema de comentários Waline para o NexT.

### Docsify

- [docsify-waline](https://github.com/cxcn/docsify-waline): um plugin de comentários simples para o docsify.

### VuePress

- [vuepress-plugin-comment2](https://vuepress-theme-hope.github.io/v2/comment/): sistema de comentários para o VuePress2.
- [@mr-hope/vuepress-plugin-comment](https://vuepress-theme-hope.github.io/v1/comment/): sistema de comentários para o VuePress1.

### Gatsby

- [gatsby-plugin-waline](https://www.npmjs.com/package/gatsby-plugin-waline): plugin de sistema de comentários para o Gatsby.

Outros:

- [vuepress-plugin-comment-plus](https://github.com/SivanLaai/vuepress-plugin-comment-plus): plugin de sistema de comentários para o VuePress.

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

## Mais

Esperamos mais clientes e plugins da comunidade para expandir o ecossistema do Waline. :tada:

Se você implementar qualquer cliente Waline, plugin ecológico ou tema que inclua o Waline, envie um PR e nos avise!
