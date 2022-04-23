---
title: Waline Component Props
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

For example: If on your site `/example/path/` and `/example/path` is the same page, you should probably set `window.location.pathname.replace(/\/$/,'')`.

:::

## lang

- Type: `string`
- Default: `'zh-CN'`

Display language.

Optional value:

- `'zh'`
- `'zh-CN'`
- `'zh-TW'`
- `'en'`
- `'en-US'`
- `'jp'`
- `'jp-JP'`

If you need a custom language, please refer to [i18n](../guide/client/i18n.md).

## emoji

- Type: `(string | EmojiInfo)[]`
- Default: `['https://cdn.jsdelivr.net/gh/walinejs/emojis/weibo']`

Emoji settings, for details see [Custom Emoji](../guide/client/emoji.md)

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

For details of custom style and darkmode, please see [Custom Style](../guide/client/style.md).

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
- `'disable'`: Login is disabled, users should fill in infomation to comment
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

- Type: `Function | false`
- Required: No

Custom image upload callback to manage picture by yourself. We will pass a picture file object when execute it.

You can set to `false` to disable image uploading, the default behavior is to base 64 encode image then the embedded it.

## highlighter

- Type: `Highlighter | false`
- Required: No

**Code highlighting**, `hanabi` is used by default, and you can pass in a code highlighter of your own.

```ts
(code: string, lang: string) => string

// or

(
  code: string,
  lang: string,
  callback?: (error: unknown | undefined, code?: string) => void
) => void;
```

You can set it to `false` to disable the code highlighting.

## texRenderer

- Type: `(blockMode: boolean, tex: string) => string | false`
- Required: No

Custom the rendering method of math to facilitate better preview of math. For details, please refer to [KaTeX API](https://katex.org/docs/api.html#server-side-rendering-or-rendering-to-a-string) or [MathJax API](http://docs.mathjax.org/en/latest/web/typeset.html#converting-a-math-string-to-other-formats).

If you set it to `false`, math preview feature will be disabled.

## copyright

- Type: `boolean`
- Default: `true`

Whether show copyright and version in footer.

::: tip

We hope you can keep it on to support Waline.

:::
