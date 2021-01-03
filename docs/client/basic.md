# 前端配置

## el
- 类型:`String`
- 默认值:`null`
- 必要性:`true`

Waline 的初始化挂载器。必须是一个有效的`CSS 选择器`。

## serverURL

- 类型: `String`
- 默认值: `null`
- 必要性: `true`

Waline 的服务端地址。

## placeholder
- 类型:`String`
- 默认值:`撰写评论...`
- 必要性:`false`

评论框`占位提示符`。

## path
- 类型:`String`
- 默认值:`window.location.pathname`
- 必要性:`false`

当前`文章页`路径，用于区分不同的`文章页`，以保证正确读取该`文章页`下的评论列表。  
可选值：
- `window.location.pathname` (默认值，推荐)
- `window.location.href`
- `自定义` 

> - I. 请保证每个`文章页`路径的唯一性，否则可能会出现不同`文章页`下加载相同评论列表的情况。  
> - II. 如果值为`window.location.href`，可能会出现随便加`不同参数`进入该页面，而被判断成新页面的情况。

## avatar
- 类型:`String`
- 默认值:`mp`
- 必要性:`false`

`Gravatar` 头像展示方式。

可选值：
- `''`(空字符串)
- `mp`
- `identicon`
- `monsterid`
- `wavatar`
- `retro`
- `robohash`
- `hide` 

更多信息，请查看[头像配置](/client/avatar.html)。

## meta
- 类型:`Array`
- 默认值:`['nick','mail','link']`
- 必要性:`false`

评论者相关属性。

## pageSize
- 类型:`Number`
- 默认值:`10`
- 必要性:`false`

评论列表分页，每页条数。

## lang
- 类型:`String`
- 默认值:`zh-CN`
- 必要性:`false`

多语言支持。

可选值：
- `zh-CN`
- `zh-TW`
- `en`
- `jp`

如需`自定义语言`，请参考[i18n](/i18n.html)。

## visitor

- 类型: `Boolean`
- 默认值: `false`
- 必要性: `false`

文章访问量统计。

## highlight
- 类型：`Boolean`
- 默认值: `true`
- 必要性: `false`

`代码高亮`，默认开启，若不需要，请手动关闭

## avatarCDN
- 类型: `String`
- 默认值: `https://gravatar.loli.net/avatar/`
- 必要性: `false`

设置 Gravatar 头像 CDN 地址。
## avatarForce
- 类型: `Boolean`
- 默认值: `false`
- 必要性: `false`
  
每次访问`强制`拉取最新的`评论列表头像`

> 不推荐设置为`true`，目前的`评论列表头像`会自动带上`Waline`的版本号

## emojiCDN
- 类型: `String`
- 默认值: ` `
- 必要性: `false`

设置`表情包CDN`，参考[自定义表情](/client/emoji.html)

## emojiMaps
- 类型: `Object`
- 默认值: `null`
- 必要性: `false`

设置`表情包映射`，参考[自定义表情](/client/emoji.html)

## requiredFields
- 类型: `Array`
- 默认值: `[]`
- 必要性: `false`

设置`必填项`，默认`匿名`，可选值：

- `['nick']`
- `['nick','mail']`

## uploadImage
- 类型: `Function`
- 默认值: ` `
- 必要性: `false`

自定义图片上传方法，方便更好的存储图片。方法执行时会将图片对象传入。
