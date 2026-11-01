---
title: Tải lên hình ảnh
icon: pic
---

Hướng dẫn này chỉ cho bạn cách thiết lập dịch vụ hình ảnh của riêng mình để tải hình ảnh lên trong bình luận.

<!-- more -->

`@waline/client` cung cấp tùy chọn `imageUploader`. Bạn cần tự xử lý đối tượng hình ảnh do ứng dụng khách truyền vào, và sau khi tự tải hình ảnh lên, hãy trả về địa chỉ hình ảnh thông qua Promise.

## Bản demo

Ví dụ sử dụng dịch vụ lưu trữ ảnh `lsky-pro`.

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
