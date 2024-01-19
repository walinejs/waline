---
title: 添加代码高亮器
icon: style
---

本教程将指导你设置自己的代码高亮器。

<!-- more -->

`@waline/client` 提供了 `highlighter` 函数。 客户端会传入代码块的原始字符和代码块的语言。你应该触直接返回一个字符串。

## 一个使用 prism.js 的案例

```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Waline highlighter 案例</title>
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
