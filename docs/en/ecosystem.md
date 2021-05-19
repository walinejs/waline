# Ecosystem

Waline is a classic Client/Server architecture, which provides a relatively complete API interface. you can implement your own client implementation based on the API provided by the server.

## Clients

- [@waline/client](https://npmjs.com/@waline/client)

  Official client implementation, build with Vue and TypeScript.

- [MiniValine](https://github.com/MiniValine/MiniValine)

  By [@MHuiG](https://github.com/MHuiG), supports Waline API. Usage:

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

## Plugins

You can use the following plugins to use Waline on different tools:

### Hexo

- [@waline/hexo-next](https://npmjs.com/@waline/hexo-next), Hexo NexT theme plugin

### VuePress

- [@mr-hope/vuepress-plugin-comment](https://vuepress-theme-hope.github.io/comment/zh/): VuePress comment plugin

## Theme

- [vuepress-theme-hope](https://vuepress-theme-hope.github.io/zh/): A powerful VuePress theme with tons of features

## More

We are looking forward to more clients and plugins from the community to expand the Waline ecosystem. :tada:

If you implement any Waline client, ecological plugin or theme including Waline, please comment and let us know!
