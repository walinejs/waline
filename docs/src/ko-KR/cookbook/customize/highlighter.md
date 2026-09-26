---
title: 코드 하이라이터 사용자 정의
icon: style
---

이 요리책에서는 사용자 정의 코드 하이라이터를 추가하는 방법을 안내합니다.

<!-- more -->

`@waline/client`는 `highlighter` 함수를 제공합니다. 클라이언트는 코드 블록의 원본 문자와 코드 블록의 언어를 전달합니다. 문자열을 직접 반환해야 합니다.

## prism.js를 사용한 예제

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
