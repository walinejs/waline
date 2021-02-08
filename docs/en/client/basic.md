# Client Configuration

## el

- Type: `String`
- Default`null`
- Required: `true`
- 
The DOM element to be mounted on initialization. It can be a CSS selector string or an actual HTMLElement.
## serverURL

- Type: `String`
- Default: `null`
- Required: `true`

Waline server address url.

## placeholder
- Type: `String`
- Default: `Just go go...`
- Required: `false`

Comment box placeholders.

## path
- Type: `String`
- Default: `window.location.pathname`
- Required: `false`

Article path id.

Optional value:

- window.location.pathname (recommend)
- window.location.href
- customize (Please ensure uniqueness)
- 
>-I. Please ensure the uniqueness of each `article page` path, otherwise the same comment list may be loaded under different `article pages`.
>-II. If the value is `window.location.href`, it may appear that adding `different parameters` to enter the page, and it will be judged as a new page.
## avatar
- Type: `String`
- Default: `mp`
- Required: `false`

`Gravatar` type.

Optional value:

- ''(Empty string)
- mp
- identicon
- monsterid
- wavatar
- retro
- robohash
- hide

See the [Avatar setting](/avatar.html) for more details.
## meta
- Type: `Array`
- Default: `['nick','mail','link']`
- Required: `false`

Reviewer attributes.

## pageSize
- Type: `Number`
- Default: `10`
- Required: `false`

Number of pages per page.

## lang
- Type: `String`
- Default: `zh-CN`
- Required: `false`

Multilingual support.

Optional value：

- `zh-CN`
- `zh-TW`
- `en`
- `jp`

If you need a custom language, please refer to [i18n](/i18n.html).

## visitor

- Type: `Boolean`
- Default: `false`
- Required: `false`

Article reading statistics.
## highlight
- Type: `Boolean`
- Default: `true`
- Required: `false`

`Code highlighting`, it’s enabled by default, please close it selectively.

## avatarCDN
- Type: `String`
- Default: `https://gravatar.loli.net/avatar/`
- Required: `false`

Gravatar CDN baseURL.
## avatarForce
- Type: `Boolean`
- Default: `false`
- Required: `false`
  
Each time you access `forced` pulls the latest avatar.
## emojiCDN
- Type: `String`
- Default: ` `
- Required: `false`

Set `Emoji Pack CDN`, refer to [Custom Emoji](/client/emoji.html).

## emojiMaps
- Type: `Object`
- Default: `null`
- Required: `false`

Set `Emoji Packet Mapping’, refer to [Custom Emoji](/client/emoji.html).

## requiredFields
- Type: `Array`
- Default: `[]`
- Required: `false`

Set required fields, default anonymous, optional values:

- `['nick']`
- `['nick','mail']`

## uploadImage
- Type: `Function`
- Default: `null`
- Required: `false`

Custom image upload callback to manage picture by yourself. We will input picture file object when execute it.

## anonymous

- 类型：`Boolean`
- 默认值：` `
- 必要性：`false`

Whether to allow login comments. Both supported by default, set to `true` means only support anonymous comments, `false` means only support login comments.