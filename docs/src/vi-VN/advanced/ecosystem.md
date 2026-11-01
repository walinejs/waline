---
title: Hệ sinh thái
icon: ecosystem
order: 3
---

Waline là một kiến trúc Client/Server kinh điển, cung cấp bộ giao diện API khá đầy đủ. Bạn có thể tự hiện thực ứng dụng khách của mình dựa trên API do máy chủ cung cấp.

## Ứng dụng khách

- [@waline/client](https://npmjs.com/@waline/client)

  Ứng dụng khách chính thức, được xây dựng bằng Vue và TypeScript.

- [MiniValine](https://github.com/MiniValine/MiniValine)

  Bởi [@MHuiG](https://github.com/MHuiG), hỗ trợ API của Waline. Cách dùng:

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

  Bởi [@BeiyanYunyi](https://github.com/BeiyanYunyi), được xây dựng bằng Solid.js. Cách dùng xem README và [trang web](https://BeiyanYunyi.github.io/sodesu/) của dự án.

## Rusty

[waline-mini](https://github.com/JQiue/waline-mini) là một hiện thực phía máy chủ viết bằng Rust, rất phù hợp để chạy trong môi trường máy chủ hạn chế tài nguyên.

## Cloudflare Workers

[Waline_On_Worker](https://github.com/wuyilingwei/Waline_On_Worker) là hiện thực phía máy chủ dựa trên Workers do cộng đồng phát triển, khắc phục nhược điểm Waline không thể chạy trên Cloudflare Workers.

## Plugin

### Hexo

- [@waline/hexo-next](https://npmjs.com/@waline/hexo-next): Hệ thống bình luận Waline cho NexT.

### Docsify

- [docsify-waline](https://github.com/cxcn/docsify-waline): Plugin bình luận đơn giản cho docsify.

### VuePress

- [vuepress-plugin-comment2](https://vuepress-theme-hope.github.io/v2/comment/): Hệ thống bình luận cho VuePress2.
- [@mr-hope/vuepress-plugin-comment](https://vuepress-theme-hope.github.io/v1/comment/): Hệ thống bình luận cho VuePress1.

### Gatsby

- [gatsby-plugin-waline](https://www.npmjs.com/package/gatsby-plugin-waline): Plugin hệ thống bình luận cho Gatsby.

Khác:

- [vuepress-plugin-comment-plus](https://github.com/SivanLaai/vuepress-plugin-comment-plus): Plugin hệ thống bình luận cho VuePress.

## Chủ đề

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

## Thông tin thêm

Chúng tôi mong chờ thêm nhiều ứng dụng khách và plugin từ cộng đồng để mở rộng hệ sinh thái Waline. :tada:

Nếu bạn hiện thực bất kỳ ứng dụng khách, plugin hệ sinh thái hay chủ đề nào có tích hợp Waline, hãy gửi PR để cho chúng tôi biết!
