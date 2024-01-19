---
title: 上传图片
icon: pic
---

本教程指引你如何设置自己的图床服务，以便在评论中上传图片。

<!-- more -->

`@waline/client` 提供了 `imageUploader` 选项。你应该自行处理客户端传递进来的图片对象，在自行上传图片后，通过 Promise 返回一个图片地址。

## 案例

一个使用 `lsky - pro` 图床的案例。

```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Waline imageUploader 案例</title>
    <link
      rel="stylesheet"
      href="https://unpkg.com/@waline/client@v3/dist/waline.css"
    />
  </head>
  <body>
    <div id="waline" style="max-width: 800px; margin: 0 auto"></div>
    <script type="module">
      import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

      const waline = init({
        el: '#waline',
        serverURL: 'https://waline.vercel.app',
        path: '/',
        lang: 'en-US',
        imageUploader: (file) => {
          let formData = new FormData();
          let headers = new Headers();

          formData.append('file', file);
          headers.append('Authorization', '!{API TOKEN}');
          headers.append('Accept', 'application/json');

          return fetch('!{API URL}', {
            method: 'POST',
            headers: headers,
            body: formData,
          })
            .then((resp) => resp.json())
            .then((resp) => resp.data.links.url);
        },
      });
    </script>
  </body>
</html>
```
