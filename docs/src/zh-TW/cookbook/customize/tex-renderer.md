---
title: 加入 TeX 渲染器
icon: tex
---

本教學將指引你設定自己的 TeX 渲染器。

<!-- more -->

`@waline/client` 提供了 `texRenderer` 函式。客戶端會傳入是否為顯示模式以及原始 $\TeX$ 字串作為參數。你應該回傳一個字串。

## 一個使用 KaTeX 的案例

關於 KaTeX 選項，請參閱 [KaTeX API](https://katex.org/docs/api.html#server-side-rendering-or-rendering-to-a-string)。

```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Waline highlighter 案例</title>
    <link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css" />
    <link rel="stylesheet" href="https://unpkg.com/katex@v0.16/dist/katex.min.css" />
  </head>
  <body>
    <div id="waline" style="max-width: 800px; margin: 0 auto"></div>
    <script type="module">
      import { init } from '"https://unpkg.com/@waline/client@v3/dist/waline.js"';
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

## 一個使用 MathJax 的案例

關於 MathJax 選項，請參閱 [MathJax API](http://docs.mathjax.org/en/latest/web/typeset.html#converting-a-math-string-to-other-formats)。

```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Waline highlighter 案例</title>
    <link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css" />
    <script src="https://unpkg.com/mathjax@v3/es5/tex-svg.js"></script>
  </head>
  <body>
    <div id="waline" style="max-width: 800px; margin: 0 auto"></div>
    <script type="module">
      import { init } from '"https://unpkg.com/@waline/client@v3/dist/waline.js"';

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
