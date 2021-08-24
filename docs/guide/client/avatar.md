# 头像配置

Waline 目前使用 [Libravatar][1] 获取评论列表头像。

Libravatar 是自由、开放原始码的头像服务，支持联邦托管并与 [Gravatar][2] 兼容。

用户需要请自行登录或注册 [Libravatar][1]，然后设置或修改自己的头像。评论的时候，留下在 [Libravatar][1] 注册时所使用的邮箱即可。当未能从 Libravatar 查询到头像时，将会自动转为从 [Gravatar][2] 查询。

<!-- more -->

## 配置方式

你可以通过 `avatar` 选项配置默认头像，如:

```js
Waline({
  // ...
  avatar: '',
});
```

## 可选值

|    参数值     |                                                     表现形式                                                      | 备注                             |
| :-----------: | :---------------------------------------------------------------------------------------------------------------: | -------------------------------- |
|     `''`      |            ![Libavatar 官方图形](//seccdn.libravatar.org/avatar/d41d8cd98f00b204e9800998ecf8427e?s=40)            | Libavatar 官方图形               |
|    `'mp'`     |        ![神秘人(一个灰白头像)](//seccdn.libravatar.org/avatar/d41d8cd98f00b204e9800998ecf8427e?s=40&d=mp)         | 神秘人(一个灰白头像)             |
| `'identicon'` |         ![抽象几何图形](//seccdn.libravatar.org/avatar/d41d8cd98f00b204e9800998ecf8427e?s=40&d=identicon)         | 抽象几何图形                     |
| `'monsterid'` |            ![小怪物](//seccdn.libravatar.org/avatar/d41d8cd98f00b204e9800998ecf8427e?s=40&d=monsterid)            | 小怪物                           |
|  `'wavatar'`  | ![用不同面孔和背景组合生成的头像](//seccdn.libravatar.org/avatar/d41d8cd98f00b204e9800998ecf8427e?s=40&d=wavatar) | 用不同面孔和背景组合生成的头像   |
|   `'retro'`   |         ![八位像素复古头像](//seccdn.libravatar.org/avatar/d41d8cd98f00b204e9800998ecf8427e?s=40&d=retro)         | 八位像素复古头像                 |
| `'robohash'`  |            ![机器人](//seccdn.libravatar.org/avatar/d41d8cd98f00b204e9800998ecf8427e?s=40&d=robohash)             | 一种具有不同颜色、面部等的机器人 |
|   `'hide'`    |                                                        N/A                                                        | 不显示头像                       |

[1]: https://www.libravatar.org/
[2]: http://cn.gravatar.com/

## 注意事项

::: warning

请注意，尽管诸如谷歌、QQ 等邮件提供商对电子邮件不区分大小写，但是您仍需要保证 Gravatar 注册的邮箱和填入的邮箱地址对应。

虽然全球大部分大型邮件提供商均不对电子邮件用户名区分大小写，但是根据 RFC 5231 的规定，电子邮件是区分大小写的。

这意味着邮件提供商可以将 `abc@xxx.com` 和 `ABC@xxx.com` 视为不同的账号，而且也的确有邮件提供商这样处理。

所以为防止使用此类邮件提供商的用户无法收到邮件或显示错误的头像，我们并不会对邮箱进行大小写转换。

:::
