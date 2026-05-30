---
title: Ekosistem
icon: ecosystem
order: 3
---

Waline adalah arsitektur Client/Server klasik yang menyediakan antarmuka API yang cukup lengkap. Anda dapat mengimplementasikan klien Anda sendiri berdasarkan API yang disediakan oleh server.

## Klien

- [@waline/client](https://npmjs.com/@waline/client)

  Implementasi klien resmi, dibangun dengan Vue dan TypeScript.

- [MiniValine](https://github.com/MiniValine/MiniValine)

  Oleh [@MHuiG](https://github.com/MHuiG), mendukung Waline API. Penggunaan:

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

  Oleh [@BeiyanYunyi](https://github.com/BeiyanYunyi), dibangun dengan Solid.js. Untuk penggunaan, lihat README dan [websitenya](https://BeiyanYunyi.github.io/sodesu/)。

## Rusty

[waline-mini](https://github.com/JQiue/waline-mini) adalah implementasi sisi server dalam Rust, sangat cocok untuk berjalan di lingkungan server dengan sumber daya terbatas.

## Cloudflare Workers

[Waline_On_Worker](https://github.com/wuyilingwei/Waline_On_Worker) adalah implementasi sisi server berbasis Workers oleh komunitas, menutupi kekurangan bahwa Waline tidak dapat berjalan di Cloudflare Workers.

## Plugin

### Hexo

- [@waline/hexo-next](https://npmjs.com/@waline/hexo-next): Sistem komentar Waline untuk NexT.

### Docsify

- [docsify-waline](https://github.com/cxcn/docsify-waline): Plugin komentar sederhana untuk docsify.

### VuePress

- [vuepress-plugin-comment2](https://vuepress-theme-hope.github.io/v2/comment/): Sistem komentar untuk VuePress2.
- [@mr-hope/vuepress-plugin-comment](https://vuepress-theme-hope.github.io/v1/comment/): Sistem komentar untuk VuePress1.

### Gatsby

- [gatsby-plugin-waline](https://www.npmjs.com/package/gatsby-plugin-waline): Plugin sistem komentar untuk Gatsby.

Lainnya:

- [vuepress-plugin-comment-plus](https://github.com/SivanLaai/vuepress-plugin-comment-plus): Plugin sistem komentar untuk VuePress.

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

## Lebih Lanjut

Kami mengharapkan lebih banyak klien dan plugin dari komunitas untuk memperluas ekosistem Waline. :tada:

Jika Anda mengimplementasikan klien Waline, plugin ekologis, atau tema yang menyertakan Waline, silakan kirim PR dan beri tahu kami!
