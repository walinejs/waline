---
title: Enviar imagem
icon: pic
---

Este livro de receitas mostra como configurar seu próprio serviço de imagens para enviar imagens nos comentários.

<!-- more -->

O `@waline/client` fornece a opção `imageUploader`. Você deve tratar por conta própria o objeto de imagem passado pelo cliente e, depois de enviar a imagem, retornar o endereço da imagem por meio de uma Promise.

## Demonstração

Um exemplo usando o `lsky-pro` como serviço de hospedagem de imagens.

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
