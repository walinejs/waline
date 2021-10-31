# Client Configuration

## el

- Type: `string | HTMLElement`
- Default: `'#waline'`

The DOM element to be mounted on initialization. It must be a valid **CSS selector string** or HTMLElement Object.

::: tip

If you only want to use the pageview statistics feature, DO NOT set it.

:::

## serverURL

- Type: `string`
- Required: Yes

Waline server address url

## path

- Type: `string`
- Default: `window.location.pathname`
- Required: No

Article path id. Used to distinguish different _article pages_ to ensure loading the correct comment list under the _article page_.

Optional value:

- `window.location.pathname` (default, recommended)
- `window.location.href`
- customize

> I. Please ensure the uniqueness of each _article page_ path, otherwise the same comment list may be loaded under different _article pages_.
>
> II. If the value is `window.location.href`, it may appear that adding _different parameters_ to enter the page, and it will be judged as a new page.

## lang

- Type: `string`
- Default: `'zh-CN'`
- Required: No

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

## visitor

- Type: `boolean`
- Default: `false`
- Required: No

Article reading statistics.

## emoji

- Type: `(string | EmojiInfo)[]`
- Default: `['https://cdn.jsdelivr.net/gh/walinejs/emojis/weibo']`

Emoji settings, for details see [Custom Emoji](../guide/client/emoji.md)

## dark

- Type: `string`
- Required: No

Darkmode support

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
- Required: No

Reviewer attributes. Optional values: `'nick'`, `'mail'`, `'link'`

## requiredMeta

- Type: `string[]`
- Default: `[]`
- Required: No

Set required fields, default anonymous, optional values:

- `[]`
- `['nick']`
- `['nick','mail']`

## login

- Type: `string`
- Default value: `'enable'`
- Required: No

Login mode status, optional values:

- `'enable'`: enable login (default)
- `'disable'`: Login is disabled, users should fill in infomation to comment
- `'force'`: Forced login, users must login to comment

## wordLimit

- Type: `number | [number, number]`
- Default: `0`
- Required: `false`

Comment word s limit. When a single number is filled in, it 's the maximum number of comment words. No limit when set to `0`.

## pageSize

- Type: `number`
- Default: `10`
- Required: No

number of comments per page.

## uploadImage

- Type: `Function | false`
- Required: No

Custom image upload callback to manage picture by yourself. We will pass a picture file object when execute it.

If you set it to `false`, image upload feature will be disabled.

## previewMath

- Type: `(blockMode: boolean, tex: string) => string | false`
- Required: No

Custom the rendering method of math to facilitate better preview of math. For details, please refer to [KaTeX API](https://katex.org/docs/api.html#server-side-rendering-or-rendering-to-a-string) or [MathJax API](http://docs.mathjax.org/en/latest/web/typeset.html#converting-a-math-string-to-other-formats).

If you set it to 'false', preview math feature will be disabled.

## highlight

- Type: `boolean`
- Default: `true`
- Required: No

**Code highlighting**, it’s enabled by default, please close it selectively.

## mathTagSupport

- Type: `boolean`
- Default: `false`
- Required: No

Whether inject extra styles to display `<math>` block

### copyright

- Type: `boolean`
- Default: `true`
- Required: No

Whether show copyright and version in footer.

::: tip

We hope you can keep it on to support Waline.

:::

## Deprecated API

The following APIs are still valid, but they will be removed in V2.

### langMode

::: warning Obsolete

Please use `locale` instead.

:::

- Type: `Locale`
- Required: No

Custom I18N.

### placeholder

::: warning Obsolete

Please use `locale.placeholder` instead.

:::

- Type: `string`
- Default: `Just go go...`
- Required: No

Comment box placeholder

### emojiCDN

::: warning Obsolete

Please use `emoji` instead.

:::

- Type: `string`
- Default: `https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/`
- Required: No

Set **Emoji Pack CDN**, refer to [Custom Emoji](../guide/client/emoji.md)

### emojiMaps

::: warning Obsolete

Please use `emoji` instead.

:::

- Type: `Object`
- Default: `null`
- Required: No

Set `Emoji Packet Mapping’, refer to [Custom Emoji](../guide/client/emoji.md)

### requiredFields

::: warning Obsolete

Please use `requiredMeta` instead.

:::

### anonymous

::: warning Obsolete

Please use `login` instead.

:::

- Type: `boolean`
- Required: No

Whether to allow login comments. Both supported by default, set to `true` means only support anonymous comments, `false` means only support login comments.

### avatarCDN

::: waring Obsolete

We recommand you to use lastest server and config it with `AVATAR_PROXY`.

:::

- Type: `string`
- Default: `https://seccdn.libravatar.org/avatar/`
- Required: No

Avatar provider baseURL. Supports Gravatar-compatible APIs.

### avatar

::: waring Obsolete

We recommand you to use lastest server and config it with `AVATAR_PROXY`.

:::

- Type: `string`
- Default: `'mp'`
- Required: No

[Gravatar](http://gravatar.com/) type.

Optional value:

- `''` (Empty string)
- `'mp'`
- `'identicon'`
- `'monsterid'`
- `'wavatar'`
- `'retro'`
- `'robohash'`
- `'hide'`

See the [Avatar setting](../guide/client/avatar.md) for more details.

### avatarForce

::: waring Obsolete

We recommand you to use lastest server and config it with `AVATAR_PROXY`.

:::

- Type: `boolean`
- Default: `false`
- Required: No

Whether **force** pulling the latest avatar each time.

### copyRight

::: danger Deprecated

Please use `copyright` instead.

:::
