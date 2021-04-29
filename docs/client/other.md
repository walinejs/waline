# 其它客户端

Waline 是经典的前后端分离 Client/Server 架构，提供了较为完善的 API 接口。[@waline/client](https://npmjs.com/@waline/client) 是官方的客户端实现，如果你不想使用它，你甚至可以基于服务端提供的 API 自行实现自己的客户端实现。

目前有以下项目已经增加了 Waline 接口的适配：

- [MiniValine](https://github.com/MiniValine/MiniValine) by [@MHuiG](https://github.com/MHuiG)

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

如果你的客户端也实现了 Waline 的支持的话，欢迎在评论区中留言告诉我呀！
