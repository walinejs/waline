---
title: 组件属性
icon: config
---

## serverURL

- 类型: `string`
- 必填: 是

Waline 的服务端地址。

## path

- 类型: `string`
- 默认值: `window.location.pathname`

当前 _文章页_ 路径，用于区分不同的 _文章页_，以保证正确读取该 _文章页_ 下的评论列表。

::: warning

请保证每个 _文章页_ 路径的唯一性，否则可能会出现不同 _文章页_ 下加载相同评论列表的情况。

例子: 如果你站点的 `/example/path/` 和 `/example/path` 对应同一个页面，你最好将其设置为 `window.location.pathname.replace(/\/$/,'')`。

:::

## lang

- 类型: `string`
- 默认值: `'zh-CN'`

多语言支持。

可选值:

- `'zh'`
- `'zh-CN'`
- `'zh-TW'`
- `'en'`
- `'en-US'`
- `'jp'`
- `'jp-JP'`
- `'pt-BR'`
- `'ru'`
- `'ru-RU'`

如需 _自定义语言_，请参考 [i18n](../guide/client/i18n.md)。

## emoji

- 类型: `(string | WalineEmojiInfo)[] | false`
- 默认值: `['//unpkg.com/@waline/emojis@1.0.1/weibo']`

表情设置，详见 [自定义表情](../guide/client/emoji.md)

## dark

- 类型: `string | boolean`
- 默认值: `false`

暗黑模式适配。

- 设置布尔值会根据其值来设置暗黑模式。
- 设置 `'auto'` 会根据设备暗黑模式自适应。
- 填入 CSS 选择器会在对应选择器生效时启用夜间模式。

::: tip 针对不同主题的例子

- **Docusaurus**: 它会在 `<html>` 上通过设置 `data-theme="dark"` 开启暗黑模式，那么你需要将 `dark` 选项设置为 `'html[data-theme="dark"]'`。

- **hexo-theme-fluid**: 它会在 `<html>` 上通过设置 `data-user-color-scheme="dark"` 开启暗黑模式。那么你需要将 `dark` 选项设置为 `'html[data-user-color-scheme="dark"]'`。

- **vuepress-theme-hope**: 它会在 `<body>` 上添加`theme-dark` class 来开启暗黑模式。那么你需要将 `dark` 选项设置为 `body.theme-dark`。

:::

自定义样式与暗黑模式详见 [自定义样式](../guide/client/style.md)。

## meta

- 类型: `string[]`
- 默认值: `['nick', 'mail', 'link']`

评论者相关属性。可选值: `'nick'`, `'mail'`, `'link'`

## requiredMeta

- 类型: `string[]`
- 默认值: `[]`

设置**必填项**，默认匿名，可选值:

- `[]`
- `['nick']`
- `['nick', 'mail']`

## login

- 类型: `string`
- 默认值: `'enable'`

登录模式状态，可选值:

- `'enable'`: 启用登录 (默认)
- `'disable'`: 禁用登录，用户只能填写信息评论
- `'force'`: 强制登录，用户必须注册并登录才可发布评论

## wordLimit

- 类型: `number | [number, number]`
- 默认值: `0`

评论字数限制。填入单个数字时为最大字数限制。设置为 `0` 时无限制。

## pageSize

- 类型: `number`
- 默认值: `10`

评论列表分页，每页条数。

## imageUploader

- 类型: `WalineImageUploader | false`
- 必填: 否
- 详情:

  ```ts
  type WalineImageUploader = (image: File) => Promise<string>;
  ```

自定义图片上传方法。默认行为是将图片 Base 64 编码嵌入，你可以设置为 `false` 以禁用图片上传功能。

函数应该接收图片对象，返回一个提供图片地址的 Promise。

::: details 案例

一个使用`lsky - pro`图床的案例。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Waline imageUploader 案例</title>
    <script src="https://unpkg.com/@waline/client@v1/dist/waline.js"></script>
    <link
      rel="stylesheet"
      href="https://unpkg.com/@waline/client@v1/dist/waline.css"
    />
  </head>
  <body>
    <div id="waline" style="max-width: 800px; margin: 0 auto"></div>
    <script>
      const waline = Waline.init({
        el: '#waline',
        serverURL: 'https://waline.vercel.app',
        path: '/',
        lang: 'en-US',
        imageUploader: function (file) {
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

:::

## highlighter

- 类型: `WalineHighlighter | false`
- 必填: 否
- 详情:

  ```ts
  type WalineHighlighter = (code: string, lang: string) => string;
  ```

**代码高亮**，默认使用一个 < 1kb 的简单高亮器。函数传入代码块的原始字符和代码块的语言。你应该触发回调函数或者直接返回一个字符串。

你可以传入一个自己的代码高亮器，也可以设置为 `false` 以禁用代码高亮功能。

::: details 案例

一个使用 PrismJS 高亮代码块的案例。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Waline highlighter 案例</title>
    <script src="https://unpkg.com/@waline/client@v1/dist/waline.js"></script>
    <link
      rel="stylesheet"
      href="https://unpkg.com/@waline/client@v1/dist/waline.css"
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
    <script>
      const waline = Waline.init({
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
            lang
          );
        },
      });
    </script>
  </body>
</html>
```

:::

## texRenderer

- 类型: `WalineTexRenderer | false`
- 必填: 否
- 详情:

  ```ts
  type WalineTexRenderer = (blockMode: boolean, tex: string) => string;
  ```

自定义 $\TeX$ 渲染，默认行为是提示预览模式不支持 $\TeX$。函数提供两个参数，第一个参数表示渲染模式是否为块级，第二个参数是 $\TeX$ 的字符串，并返回一段 HTML 字符串作为渲染结果。

你可以自行引入 $\TeX$ 渲染器并提供预览渲染，建议使用 Katex 或 MathJax，也可以设置为 `false` 以禁止渲染 $\TeX$。更多请参考 [KaTeX API](https://katex.org/docs/api.html#server-side-rendering-or-rendering-to-a-string) 或 [MathJax API](http://docs.mathjax.org/en/latest/web/typeset.html#converting-a-math-string-to-other-formats)。

::::: details 案例

:::: code-group

::: code-group-item KaTex

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Waline highlighter 案例</title>
    <script src="https://unpkg.com/@waline/client@v1/dist/waline.js"></script>
    <link
      rel="stylesheet"
      href="https://unpkg.com/@waline/client@v1/dist/waline.css"
    />
    <script src="https://unpkg.com/katex@v0.15"></script>
    <link
      rel="stylesheet"
      href="https://unpkg.com/katex@v0.15/dist/katex.min.css"
    />
  </head>
  <body>
    <div id="waline" style="max-width: 800px; margin: 0 auto"></div>
    <script>
      const waline = Waline.init({
        el: '#waline',
        serverURL: 'https://waline.vercel.app',
        path: '/',
        lang: 'en-US',
        texRenderer: (blockmode, tex) =>
          window.katex.renderToString(tex, {
            displayMode: blockmode,
            throwOnError: false,
          }),
      });
    </script>
  </body>
</html>
```

:::

::: code-group-item MathJax

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Waline highlighter 案例</title>
    <script src="https://unpkg.com/@waline/client@v1/dist/waline.js"></script>
    <link
      rel="stylesheet"
      href="https://unpkg.com/@waline/client@v1/dist/waline.css"
    />
    <script src="https://unpkg.com/mathjax@v3/es5/tex-svg.js"></script>
  </head>
  <body>
    <div id="waline" style="max-width: 800px; margin: 0 auto"></div>
    <script>
      const waline = Waline.init({
        el: '#waline',
        serverURL: 'https://waline.vercel.app',
        path: '/',
        lang: 'en-US',
        texRenderer: (blockmode, tex) =>
          window.MathJax.startup.adaptor.outerHTML(
            window.MathJax.tex2svg(tex, {
              display: blockmode,
            })
          ),
      });
    </script>
  </body>
</html>
```

:::

::::

:::::

## copyright

- 类型: `boolean`
- 默认值: `true`
- 必填: 否

是否显示页脚版权信息。

::: tip

我们希望你保持打开以支持 Waline。

:::
