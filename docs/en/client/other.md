# Other Client

Waline is a classic Client/Server architecture, which provides a relatively complete API interface. [@waline/client](https://npmjs.com/@waline/client) is the official client implementation. If you don’t want to use it, you can even implement your own client implementation based on the API provided by the server.

At present, the following projects have added the adaptation of the Waline interface:

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

If your client also supports Waline, please post a comment at the bottom to let me know!
