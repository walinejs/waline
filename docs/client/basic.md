# 前端配置

## el

- 类型: `string`
- 必填: 是

Waline 的初始化挂载器。必须是一个有效的 **CSS 选择器**。

## serverURL

- 类型: `string`
- 必填: 是

Waline 的服务端地址。

## placeholder

- 类型:`string`
- 默认值: `'撰写评论...'`
- 必填: 否

评论框 **占位提示符**。

## wordLimit

- 类型: `number | [number, number]`
- 默认值: `0`
- 必要性: `false`

评论字数限制。填入单个数字时为最大字数限制。设置为 `0` 时无限制。

## path

- 类型: `string`
- 默认值: `window.location.pathname`
- 必填: 否

当前 _文章页_ 路径，用于区分不同的 _文章页_，以保证正确读取该 _文章页_ 下的评论列表。

可选值:

- `window.location.pathname` (默认值，推荐)
- `window.location.href`
- 自定义

> I. 请保证每个 _文章页_ 路径的唯一性，否则可能会出现不同 _文章页_ 下加载相同评论列表的情况。
>
> II. 如果值为 `window.location.href`，可能会出现随便加 _不同参数_ 进入该页面，而被判断成新页面的情况。

## avatar

- 类型: `string`
- 默认值: `mp`
- 必填: 否

[Gravatar](http://cn.gravatar.com/) 头像展示方式。

可选值:

- `''`
- `'mp'`
- `'identicon'`
- `'monsterid'`
- `'wavatar'`
- `'retro'`
- `'robohash'`
- `'hide'`

更多信息，请查看 [头像配置](./avatar.md)。

## meta

- 类型: `string[]`
- 默认值: `['nick', 'mail', 'link']`
- 必填: 否

评论者相关属性。可选值: `'nick'`, `'mail'`, `'link'`

## pageSize

- 类型: `number`
- 默认值: `10`
- 必填: 否

评论列表分页，每页条数。

## lang

- 类型: `string`
- 默认值: `'zh-CN'`
- 必填: 否

多语言支持。

可选值:

- `'zh'`
- `'zh-CN'`
- `'zh-TW'`
- `'en'`
- `'en-US'`
- `'jp'`
- `'jp-JP'`

如需 _自定义语言_，请参考 [i18n](./i18n.md)。

## visitor

- 类型: `boolean`
- 默认值: `false`
- 必填: 否

文章访问量统计。

## dark

- 类型: `string`
- 必填: 否

暗黑模式适配。

- 设置 `'auto'` 会根据设备暗黑模式自适应。
- 填入 CSS 选择器会在对应选择器生效时启用夜间模式。

::: tip 针对不同主题的例子

- **Docusaurus**: 它会在 `<html>` 上通过设置 `data-theme="dark"` 开启暗黑模式，那么你需要将 `dark` 选项设置为 `'html[data-theme="dark"]'`。

- **hexo-theme-fluid**: 它会在 `<html>` 上通过设置 `data-user-color-scheme="dark"` 开启暗黑模式。那么你需要将 `dark` 选项设置为 `'html[data-user-color-scheme="dark"]'`。

- **vuepress-theme-hope**: 它会在 `<body>` 上添加`theme-dark` class 来开启暗黑模式。那么你需要将 `dark` 选项设置为 `body.theme-dark`。

:::

自定义样式与暗黑模式详见 [自定义样式](./style.md)。

## highlight

- 类型: `boolean`
- 默认值: `true`
- 必填: 否

**代码高亮**，默认开启，若不需要，请手动关闭

## avatarCDN

- 类型: `string`
- 默认值: `https://sdn.geekzu.org/avatar/`
- 必填: 否

设置 Gravatar 头像 CDN 地址。

## avatarForce

- 类型: `boolean`
- 默认值: `false`
- 必填: 否

每次访问是否**强制**拉取最新的*评论列表头像*

> 不推荐设置为 `true`，目前的*评论列表头像*会自动带上 `Waline` 的版本号

## emojiCDN

- 类型: `string`
- 默认值: `https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/`
- 必填: 否

设置**表情包 CDN**，参考[自定义表情](./emoji.md)

## emojiMaps

- 类型: `Object`
- 默认值: `微博表情包`
- 必填: 否

设置**表情包映射**，参考[自定义表情](./emoji.md)

## requiredFields

- 类型: `string[]`
- 默认值: `[]`
- 必填: 否

设置**必填项**，默认匿名，可选值:

- `['nick']`
- `['nick', 'mail']`

## uploadImage

- 类型: `Function`
- 必填: 否

自定义图片上传方法，方便更好的存储图片。方法执行时会将图片对象传入。

## anonymous

- 类型: `boolean`
- 必填: 否

是否允许登录评论。默认情况是两者都支持，设置为 `true` 表示仅支持匿名评论，`false` 表示仅支持登录评论。
