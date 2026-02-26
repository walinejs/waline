---
title: 画像のアップロード
icon: pic
---

このクックブックでは、コメント内で画像をアップロードするために独自の画像サービスを設定する方法を説明します。

<!-- more -->

`@waline/client` は `imageUploader` オプションを提供しています。クライアントから渡された画像オブジェクトを自分で処理し、画像をアップロードした後、Promise を通じて画像のアドレスを返す必要があります。

## デモ

`lsky-pro` 画像ホスティングサービスを使用した例です。

```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Waline imageUploader demo</title>
    <link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css" />
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
