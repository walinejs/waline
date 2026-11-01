---
title: Personalizza il renderer TeX
---

Questa guida ti mostra come aggiungere un tuo renderer $\TeX$.

<!-- more -->

`@waline/client` fornisce la funzione `texRenderer`. Il client passa come parametri l'indicazione della modalità display e la stringa $\TeX$ originale; la funzione deve restituire una stringa.

## Un esempio con KaTeX

Per le opzioni di KaTeX consulta la [API di KaTeX](https://katex.org/docs/api.html#server-side-rendering-or-rendering-to-a-string).

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

## Un caso con MathJax

Per le opzioni di MathJax consulta la [API di MathJax](http://docs.mathjax.org/en/latest/web/typeset.html#converting-a-math-string-to-other-formats).

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
