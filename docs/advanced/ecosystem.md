# 生态系统

Waline 是经典的前后端分离 Client/Server 架构，提供了较为完善的 API 接口。你可以基于服务端提供的 API 自行实现自己的客户端实现。

## 客户端列表

- [@waline/client](https://npmjs.com/@waline/client)

  官方的客户端实现，使用 Vue + TypeScript 构建。

- [MiniValine](https://github.com/MiniValine/MiniValine)

  作者 [@MHuiG](https://github.com/MHuiG)，适配 Waline 接口。使用方式如下:

  ```html
  <script src="https://cdn.jsdelivr.net/npm/minivaline/dist/MiniValine.min.js"></script>

  <div id="waline-comments"></div>
  <script>
    new MiniValine({
      el: '#waline-comments',
      backend: 'waline',
      serverURLs: 'YOUR SERVER URL',
    });
  </script>
  ```

- [AprilComment](https://github.com/asforest/AprilComment)

  作者[asforest](https://github.com/asforest/AprilComment)，白绿色调的简洁风格，Markdown 格式渲染评论，并有一些独特的小功能。使用方式如下：

  ```html
  <script src="https://cdn.jsdelivr.net/npm/april-comment@latest/dist/index.js"></script>
  <link
    rel="stylesheet"
    type="text/css"
    href="https://cdn.jsdelivr.net/npm/april-comment@latest/dist/index.css"
  />

  <div id="comment-widget"></div>
  <script>
    $(function () {
      new AprilComment({
        el: 'comment-widget',
        api: 'https://your-waline-backend-url.app',
      });
    });
  </script>
  ```

## 插件

你可以使用下列插件来在不同工具上使用 Waline:

### Hexo

- [@waline/hexo-next](https://npmjs.com/@waline/hexo-next), Hexo NexT 主题插件

### VuePress

- [@mr-hope/vuepress-plugin-comment](https://vuepress-theme-hope.github.io/comment/zh/): VuePress 评论插件

## 主题

- [vuepress-theme-hope](https://vuepress-theme-hope.github.io/zh/): 一个强大的 VuePress 主题

## 更多

我们期待来自社区的更多客户端和插件以扩展 Waline 生态。:tada:

如果你实现了 Waline 的客户端、生态插件与支持 Waline 的主题，欢迎在评论区中留言！
