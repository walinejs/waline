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

- 例子 1: 如果你站点的 `/example/path/` 和 `/example/path` 对应同一个页面，你可以将其设置为 `window.location.pathname.replace(/\/$/,'')`。
- 例子 2: 如果你想在站点的根目录下存放中文文档，但在 `/en/` `/ja/` 等文件夹存放其他语言文档，你可以将其设置为 `window.location.pathname.replace(/^\/(en|fr|jp)\//, '/')`。

:::

## lang

- 类型: `string`
- 默认值: `navigator.language`
- 详情:
  - [功能 → 多语言](../../guide/features/i18n.md#设置语言)

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
- `fr-FR`
- `fr`
- `'es'`
- `'es-MX'`

## locale

- 类型: `WalineLocale`
- 默认值: 通过 `lang` 选项自动设置
- 详情:
  - [Cookbook → 自定义语言](../../cookbook/customize/locale.md)

Waline 多语言配置。

## emoji

- 类型: `(WalineEmojiInfo | WalineEmojiPresets)[] | boolean`

  ```ts
  type WalineEmojiPresets = `http://${string}` | `https://${string}`;

  interface WalineEmojiInfo {
    /**
     * 选项卡上的 Emoji 名称
     */
    name: string;
    /**
     * 所在文件夹链接
     */
    folder?: string;
    /**
     * Emoji 通用路径前缀
     */
    prefix?: string;
    /**
     * Emoji 图片的类型，会作为文件扩展名使用
     */
    type?: string;
    /**
     * 选项卡显示的 Emoji 图标
     */
    icon: string;
    /**
     * Emoji 图片列表
     */
    items: string[];
  }
  ```

- 默认值: `['//unpkg.com/@waline/emojis@1.1.0/weibo']`

表情设置，详见 [自定义表情](../../guide/features/emoji.md)

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

自定义样式与暗黑模式详见 [自定义样式](../../guide/features/style.md)。

## commentSorting

- 类型: `WalineCommentSorting`
- 默认值: `'latest'`

评论列表排序方式。可选值: `'latest'`, `'oldest'`, `'hottest'`

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

- 类型: `WalineImageUploader | boolean`
- 必填: 否
- 详情:

  ```ts
  type WalineImageUploader = (image: File) => Promise<string>;
  ```

- 参考:
  - [Cookbook → 自定义图片上传](../../cookbook/customize/upload-image.md)

自定义图片上传方法。默认行为是将图片 Base 64 编码嵌入，你可以设置为 `false` 以禁用图片上传功能。

函数应该接收图片对象，返回一个提供图片地址的 Promise。

## highlighter

- 类型: `WalineHighlighter | boolean`

  ```ts
  type WalineHighlighter = (code: string, lang: string) => string;
  ```

- 必填: 否

- 详情:
  - [Cookbook → 自定义代码高亮](../../cookbook/customize/highlighter.md)

**代码高亮**，默认使用一个 < 1kb 的简单高亮器。函数传入代码块的原始字符和代码块的语言。你应该直接返回一个字符串。

你可以传入一个自己的代码高亮器，也可以设置为 `false` 以禁用代码高亮功能。

## texRenderer

- 类型: `WalineTeXRenderer | boolean`

  ```ts
  type WalineTeXRenderer = (blockMode: boolean, tex: string) => string;
  ```

- 必填: 否

- 详情:

  - [Cookbook → 自定义 $\TeX$ 渲染器](../../cookbook/customize/tex-renderer.md)
  - [MathJax](https://www.mathjax.org/)
  - [KaTeX](https://katex.org/)

自定义 $\TeX$ 渲染，默认行为是提示预览模式不支持 $\TeX$。函数提供两个参数，第一个参数表示渲染模式是否为块级，第二个参数是 $\TeX$ 的字符串，并返回一段 HTML 字符串作为渲染结果。

你可以自行引入 $\TeX$ 渲染器并提供预览渲染，建议使用 KaTeX 或 MathJax，也可以设置为 `false` 以禁止渲染 $\TeX$。

## search

- 类型: `WalineSearchOptions | boolean`

  ```ts
  interface WalineSearchImageData extends Record<string, unknown> {
    /**
     * 图片链接
     */
    src: string;

    /**
     * 图片标题
     *
     * @description 用于图片的 alt 属性
     */
    title?: string;

    /**
     * 图片缩略图
     *
     * @description 为了更好的加载性能，我们会优先在列表中使用此缩略图
     *
     * @default src
     */
    preview?: string;
  }

  type WalineSearchResult = WalineSearchImageData[];

  interface WalineSearchOptions {
    /**
     * 搜索操作
     */
    search: (word: string) => Promise<WalineSearchResult>;

    /**
     * 打开列表时展示的默认结果
     *
     * @default () => search('')
     */
    default?: () => Promise<WalineSearchResult>;

    /**
     * 获取更多的操作
     *
     * @description 会在列表滚动到底部时触发，如果你的搜索服务支持分页功能，你应该设置此项实现无限滚动
     *
     * @default (word) => search(word)
     */
    more?: (word: string, currentCount: number) => Promise<WalineSearchResult>;
  }
  ```

- 必填: 否
- 详情:

自定义搜索功能，设置 `false` 可禁用搜索。

## noCopyright

- 类型: `boolean`
- 默认值: `false`

是否隐藏页脚版权信息。

::: tip

我们希望你保持打开以支持 Waline。

:::

## recaptchaV3Key

- 类型: `string`
- 必填: 否

reCAPTCHA V3 是 Google 提供的验证码服务，配置 reCAPTCHA V3 网站密钥即可开启该功能。服务端需要同步配置 `RECAPTCHA_V3_SECRET` 环境变量。

## turnstileKey

- 类型: `string`
- 必填: 否

Turnstile 是 Cloudflare 提供的验证码服务，配置 turnstileKey 网站密钥即可开启该功能。服务端需要同步配置 `TURNSTILE_SECRET` 环境变量。

## reaction

- 类型: `boolean | string[]`
- 默认值: `false`

为文章增加表情互动功能，设置为 `true` 提供默认表情，也可以通过设置表情地址数组来自定义表情图片，最大支持 8 个表情。
