---
title: Kustomisasi Code Highlighter
icon: style
---

Cookbook ini memandu Anda cara menambahkan code highlighter Anda sendiri.

<!-- more -->

`@waline/client` menyediakan fungsi `highlighter`. Klien meneruskan karakter asli dari blok kode dan bahasa dari blok kode. Anda harus langsung mengembalikan sebuah string.

## Contoh Menggunakan prism.js

```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Waline highlighter case</title>
    <link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css" />
    <script src="https://unpkg.com/prismjs@v1" data-manual></script>
    <script src="https://unpkg.com/prismjs@v1/plugins/autoloader/prism-autoloader.min.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/prismjs@v1/themes/prism-tomorrow.min.css" />
  </head>
  <body>
    <div id="waline" style="max-width: 800px; margin: 0 auto"></div>
    <script type="module">
      import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

      const waline = init({
        el: '#waline',
        serverURL: 'https://waline.vercel.app',
        path: '/',
        highlighter: (code, lang) => {
          if (!window.Prism.languages[lang]) {
            window.Prism.plugins.autoloader.loadLanguages(lang);
          }

          return window.Prism.highlight(
            code,
            window.Prism.languages[lang] || window.Prism.languages.text,
            lang,
          );
        },
      });
    </script>
  </body>
</html>
```
