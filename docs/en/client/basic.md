# Client Configuration

## el

- Type: `string`
- Required: Yes

The DOM element to be mounted on initialization. It must be a valid **CSS selector string**.

## serverURL

- Type: `string`
- Required: Yes

Waline server address url.

## placeholder

- Type: `string`
- Default: `Just go go...`
- Required: No

Comment box placeholder.

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

number of pages per page.

## lang

- Type: `string`
- Default: `'zh-CN'`
- Required: No

Multilingual support.

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

Whether to enable darkmode support, setting `'auto'` will display darkmode due to device settings. Filling in CSS selector will enable darkmode only when the selector match waline ancestor nodes.

For example, if you are using docusaurus, it will enable darkmode by setting `data-theme="dark"` on the html itself. So you need to set this content as `dark` option.

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

## requiredFields

- Type: `string[]`
- Default: `[]`
- Required: No

Set required fields, default anonymous, optional values:

- `['nick']`
- `['nick','mail']`

## uploadImage

- Type: `Function`
- Required: No

Custom image upload callback to manage picture by yourself. We will input picture file object when execute it.

## anonymous

- Type: `boolean`
- Required: No

Whether to allow login comments. Both supported by default, set to `true` means only support anonymous comments, `false` means only support login comments.
