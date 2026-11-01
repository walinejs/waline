---
title: TeX レンダラーをカスタマイズする
---

このクックブックでは、独自の $\TeX$ レンダラーを追加する方法を説明します。

<!-- more -->

`@waline/client` は `texRenderer` 関数を提供しています。クライアントは表示モードかどうかと元の $\TeX$ 文字列を引数として渡します。戻り値として文字列を返してください。

## KaTeX を使った例

KaTeX のオプションについては、[KaTeX API](https://katex.org/docs/api.html#server-side-rendering-or-rendering-to-a-string) を参照してください。

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

## MathJax を使った例

MathJax のオプションについては、[MathJax API](http://docs.mathjax.org/en/latest/web/typeset.html#converting-a-math-string-to-other-formats) を参照してください。

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
