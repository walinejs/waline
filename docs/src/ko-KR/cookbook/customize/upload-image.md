---
title: 이미지 업로드
icon: pic
---

이 요리책에서는 댓글에서 이미지를 업로드하기 위해 자체 이미지 서비스를 설정하는 방법을 안내합니다.

<!-- more -->

`@waline/client`는 `imageUploader` 옵션을 제공합니다. 클라이언트가 전달한 이미지 객체를 직접 처리하고, 이미지를 업로드한 후 Promise를 통해 이미지 주소를 반환해야 합니다.

## 데모

`lsky-pro` 이미지 호스팅을 사용하는 예제입니다.

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
