---
title: TeX 렌더러 사용자 정의
---

이 요리책에서는 사용자 정의 $\TeX$ 렌더러를 추가하는 방법을 안내합니다.

<!-- more -->

`@waline/client`는 `texRenderer` 함수를 제공합니다. 클라이언트는 표시 모드 여부와 원본 $\TeX$ 문자열을 매개변수로 전달합니다. 문자열을 반환해야 합니다.

## KaTeX를 사용한 예제

KaTeX 옵션은 [KaTeX API](https://katex.org/docs/api.html#server-side-rendering-or-rendering-to-a-string)를 참조하세요.

```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Waline highlighter case</title>
    <link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css" />
    <link rel="stylesheet" href="https://unpkg.com/katex@v0.16/dist/katex.min.css" />
  </head>
  <body>
    <div id="waline" style="max-width: 800px; margin: 0 auto"></div>
    <script type="module">
      import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';
      import katex from 'https://unpkg.com/katex@0.16/dist/katex.mjs';

      init({
        el: '#waline',
        serverURL: 'https://waline.vercel.app',
        path: '/',
        lang: 'en-US',
        texRenderer: (blockMode, tex) =>
          katex.renderToString(tex, {
            displayMode: blockMode,
            throwOnError: false,
          }),
      });
    </script>
  </body>
</html>
```

## MathJax를 사용한 예제

MathJax 옵션은 [MathJax API](http://docs.mathjax.org/ko-KR/latest/web/typeset.html#converting-a-math-string-to-other-formats)를 참조하세요.

```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Waline highlighter case</title>
    <link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css" />
    <script src="https://unpkg.com/mathjax@v3/es5/tex-svg.js"></script>
  </head>
  <body>
    <div id="waline" style="max-width: 800px; margin: 0 auto"></div>
    <script type="module">
      import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

      init({
        el: '#waline',
        serverURL: 'https://waline.vercel.app',
        path: '/',
        lang: 'en-US',
        texRenderer: (blockMode, tex) =>
          window.MathJax.startup.adaptor.outerHTML(
            window.MathJax.tex2svg(tex, {
              display: blockMode,
            }),
          ),
      });
    </script>
  </body>
</html>
```
