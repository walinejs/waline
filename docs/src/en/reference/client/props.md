---
title: Component Props
icon: config
---

## serverURL

- Type: `string`
- Required: Yes

Waline server address url

## path

- Type: `string`
- Default: `window.location.pathname`

Article path id. Used to distinguish different _article pages_ to ensure loading the correct comment list under the _article page_.

::: warning

Please ensure the uniqueness of each _article page_ path, otherwise the same comment list may be loaded .

- e.g. 1: If on your site `/example/path/` and `/example/path` is the same page, you should probably set `window.location.pathname.replace(/\/$/,'')`.
- e.g. 2: If you store en docs at root, while serve other language docs at `/zh/`, `/ja/`, etc, you should probably set `window.location.pathname.replace(/^\/(fr|jp|zh)\//, '/')`.

:::

## lang

- Type: `string`
- Default: `navigator.language`
- Details:
  - [Guide → I18n](../../guide/features/i18n.md#set-language)

Display language.

Optional value:

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

- Type: `WalineLocale`
- Default: Built-in value based on `lang`
- Details:
  - [Cookbook → Customize Locale](../../cookbook/customize/locale.md)

Waline Locales.

## emoji

- Type: `(string | WalineEmojiInfo)[] | boolean`

  ```ts
  type WalineEmojiPresets = `http://${string}` | `https://${string}`;

  interface WalineEmojiInfo {
    /**
     * Emoji name show on tab
     */
    name: string;
    /**
     * Current folder link
     */
    folder?: string;
    /**
     * Common prefix of Emoji icons
     */
    prefix?: string;
    /**
     * Type of Emoji icons, will be regarded as file extension
     */
    type?: string;
    /**
     * Emoji icon show on tab
     */
    icon: string;
    /**
     * Emoji image list
     */
    items: string[];
  }
  ```

- Default: `['//unpkg.com/@waline/emojis@1.1.0/weibo']`
- Details:
  - [Guide → Emoji](../../guide/features/emoji.md)

Emoji settings.

## dark

- Type: `string | boolean`
- Default: `false`

Darkmode support

- Setting a boolean will set the dark mode according to its value.
- Set it to `'auto'` will display darkmode due to device settings.
- Filling in a CSS selector will enable darkmode only when the selector match waline ancestor nodes.

::: tip Examples

- **Docusaurus**: It will enable darkmode by setting `data-theme="dark"` on the `<html>` tag itself. So you need to set `'html[data-theme="dark"]'` as `dark` option.

- **hexo-theme-fluid**: It will enable darkmode by setting `data-user-color-scheme="dark"` on the `<html>` tag itself. So you need to set `'html[data-user-color-scheme="dark"]'` as `dark` option.

- **vuepress-theme-hope**: It will enable darkmode by setting `theme-dark` class on the `<body>` tag itself. So you need to set `'body.theme-dark'` as `dark` option.

:::

For details of custom style and darkmode, please see [Custom Style](../../guide/features/style.md).

## commentSorting

- Type: `WalineCommentSorting`
- Default: `'latest'`

Comment list sorting methods. Optional values: `'latest'`, `'oldest'`, `'hottest'`

## meta

- Type: `string[]`
- Default: `['nick','mail','link']`

Reviewer attributes. Optional values: `'nick'`, `'mail'`, `'link'`

## requiredMeta

- Type: `string[]`
- Default: `[]`

Set required fields, default anonymous, optional values:

- `[]`
- `['nick']`
- `['nick','mail']`

## login

- Type: `string`
- Default value: `'enable'`

Login mode status, optional values:

- `'enable'`: enable login (default)
- `'disable'`: Login is disabled, users should fill in information to comment
- `'force'`: Forced login, users must login to comment

## wordLimit

- Type: `number | [number, number]`
- Default: `0`

Comment word s limit. When a single number is filled in, it 's the maximum number of comment words. No limit when set to `0`.

## pageSize

- Type: `number`
- Default: `10`

number of comments per page.

## imageUploader

- Type: `WalineImageUploader | boolean`

  ```ts
  type WalineImageUploader = (image: File) => Promise<string>;
  ```

- Required: No

- Details:
  - [Cookbook → Upload Image](../../cookbook/customize/upload-image.md)

Custom image upload method. The default behavior is to embed images Base 64 encoded, you can set this to `false` to disable image uploading.

The function should receive an image object and return a Promise that provides the image address.

## highlighter

- Type: `WalineHighlighter | boolean`

  ```ts
  type WalineHighlighter = (code: string, lang: string) => string;
  ```

- Required: No

- Details:
  - [Cookbook → Customize Highlighter](../../cookbook/customize/highlighter.md)

**Code highlighting**, use `hanabi` by default. The function passes in original content of code block and language of the code block. You should return a string directly.

You can pass in a code highlighter of your own, or set to `false` to disable code highlighting.

## texRenderer

- Type: `WalineTeXRenderer | boolean`

  ```ts
  type WalineTeXRenderer = (blockMode: boolean, tex: string) => string;
  ```

- Required: No

- Details:

  - [Cookbook → Customize $\TeX$ Renderer](../../cookbook/customize/tex-renderer.md)
  - [MathJax](https://www.mathjax.org/)
  - [KaTeX](https://katex.org/)

Customize $\TeX$ rendering, the default behavior is to prompt that the preview mode does not support $\TeX$. The function provides two parameters, the first parameter indicates whether it should be rendered in block level, and the second parameter is the string of the $\TeX$ content, and return a HTML string as render result.

You can import $\TeX$ renderer to provide preview feature. We recommend you to use KaTeX or MathJax, or you can set to `false` to disable parsing $\TeX$.

## search

- Type: `WalineSearchOptions | boolean`

  ```ts
  interface WalineSearchImageData extends Record<string, unknown> {
    /**
     * Image link
     */
    src: string;

    /**
     * Image title
     *
     * @description Used for alt attribute of image
     */
    title?: string;

    /**
     * Image preview link
     *
     * @description For better loading performance, we will use this thumbnail first in the list
     *
     * @default src
     */
    preview?: string;
  }

  type WalineSearchResult = WalineSearchImageData[];

  interface WalineSearchOptions {
    /**
     * Search action
     */
    search: (word: string) => Promise<WalineSearchResult>;

    /**
     * Default result when opening list
     *
     * @default () => search('')
     */
    default?: () => Promise<WalineSearchResult>;

    /**
     * Fetch more action
     *
     * @description It will be triggered when the list scrolls to the bottom. If your search service supports paging, you should set this to achieve infinite scrolling
     *
     * @default (word) => search(word)
     */
    more?: (word: string, currentCount: number) => Promise<WalineSearchResult>;
  }
  ```

- Required: No
- Details:
  Customize search features, you can disable search function by setting it to `false`.

## noCopyright

- Type: `boolean`
- Default: `false`

Whether hide copyright and version in footer.

::: tip

We hope you can keep it on to support Waline.

:::

## recaptchaV3Key

- Type: `string`
- Required: No

reCAPTCHA V3 is a captcha service provided by Google. You can add reCAPTCHA V3 site key with `recaptchaV3Key` to enable it. Notice you should also set environment variable `RECAPTCHA_V3_SECRET` for server.

## turnstileKey

- Type: `string`
- Required: No

Turnstile is a captcha service provided by Cloudflare. You can add turnstile site key with `turnstileKey` to enable it. Notice you should also set environment variable `TURNSTILE_SECRET` for server.

## reaction

- Type: `boolean | string[]`
- Default: `false`

Add emoji interaction function to the article, set it to `true` to provide the default emoji, you can also customize the emoji image by setting the emoji url array, and supports a maximum of 8 emojis.
