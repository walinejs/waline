---
title: Subir imágenes
icon: pic
---

Esta receta te explica cómo configurar tu propio servicio de imágenes para subir imágenes en los comentarios.

<!-- more -->

`@waline/client` ofrece la opción `imageUploader`. Debes encargarte tú mismo del objeto de imagen que te pasa el cliente y, después de subir la imagen, devolver mediante una Promise la dirección de la imagen.

## Demo

Un ejemplo usando el servicio de alojamiento de imágenes `lsky-pro`.

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
