# Client Configuration

## el

- Type: `string`
- Required: Yes

The DOM element to be mounted on initialization. It must be a valid **CSS selector string**.

## serverURL

- Type: `string`
- Required: Yes

Waline server address url

## wordLimit

- Type: `number | [number, number]`
- Default: `0`
- Required: `false`

Comment word s limit. When a single number is filled in, it 's the maximum number of comment words. No limit when set to `0`.

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

## avatar

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

See the [Avatar setting](./avatar.md) for more details.

## meta

- Type: `string[]`
- Default: `['nick','mail','link']`
- Required: No

Reviewer attributes. Optional values: `'nick'`, `'mail'`, `'link'`

## pageSize

- Type: `number`
- Default: `10`
- Required: No

number of comments per page.

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

If you need a custom language, please refer to [i18n](./i18n.md).

## visitor

- Type: `boolean`
- Default: `false`
- Required: No

Article reading statistics.

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

For details of custom style and darkmode, please see [Custom Style](./style.md).

## highlight

- Type: `boolean`
- Default: `true`
- Required: No

**Code highlighting**, it’s enabled by default, please close it selectively.

## avatarCDN

- Type: `string`
- Default: `https://sdn.geekzu.org/avatar/`
- Required: No

Gravatar CDN baseURL.

## avatarForce

- Type: `boolean`
- Default: `false`
- Required: No

Whether **force** pulling the latest avatar each time.

## emojiCDN

- Type: `string`
- Default: `https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/`
- Required: No

Set **Emoji Pack CDN**, refer to [Custom Emoji](./emoji.md).

## emojiMaps

- Type: `Object`
- Default: `null`
- Required: No

Set `Emoji Packet Mapping’, refer to [Custom Emoji](./emoji.md).

## requiredMeta

- Type: `string[]`
- Default: `[]`
- Required: No

Set required fields, default anonymous, optional values:

- `[]`
- `['nick']`
- `['nick','mail']`

## uploadImage

- Type: `Function`
- Required: No

Custom image upload callback to manage picture by yourself. We will pass a picture file object when execute it.

## login

- Type: `string`
- Default value: `'enabled'`
- Required: No

Login mode status, optional values:

- `'enable'`: enable login (default)
- `'disable'`: Login is disabled, users should fill in infomation to comment
- `'force'`: Forced login, users must login to comment

### copyright

- Type: `boolean`
- Default: `true`
- Required: No

Whether show copyright and version in footer.

::: tip

We hope you can keep it on to support Waline.

:::

## Deprecated API

### langMode

::: warning Deprecated

Please use `locale` instead.

:::

- Type: `Locale`
- Required: No

Custom I18N.

### placeholder

::: warning Deprecated

Please use `locale.placeholder` instead.

:::

- Type: `string`
- Default: `Just go go...`
- Required: No

Comment box placeholder

### requiredFields

::: warning Deprecated

Please use `requiredMeta` instead.

:::

### anonymous

::: warning Deprecated

Please use `login` instead.

:::

- Type: `boolean`
- Required: No

Whether to allow login comments. Both supported by default, set to `true` means only support anonymous comments, `false` means only support login comments.

### copyRight

::: danger Removed

Please use `copyright` instead.

:::

- Type: `boolean`
- Default: `true`
- Required: No
