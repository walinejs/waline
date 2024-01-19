---
title: Customize Code Highlighter
icon: style
---

This cookbook guides you how to add your own code highlighter.

<!-- more -->

`@waline/client` provides the `highlighter` function. The client passes in the original character of the code block and the language of the code block. You should return a string directly.

## An Example Using prism.js

```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Waline highlighter case</title>
    <link
      rel="stylesheet"
      href="https://unpkg.com/@waline/client@v3/dist/waline.css"
    />
    <script src="https://unpkg.com/prismjs@v1" data-manual></script>
    <script src="https://unpkg.com/prismjs@v1/plugins/autoloader/prism-autoloader.min.js"></script>
    <link
      rel="stylesheet"
      href="https://unpkg.com/prismjs@v1/themes/prism-tomorrow.min.css"
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
