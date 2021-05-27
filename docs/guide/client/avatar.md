# 头像配置

Waline 目前使用 [Gravatar][1] 获取评论列表头像。

> 感谢 [极客族](https://cdn.geekzu.org/cached.html)、[v2ex](https://v2ex.com) 提供的镜像服务。

用户需要请自行登录或注册 [Gravatar][1]，然后设置或修改自己的头像。评论的时候，留下在 [Gravatar][1] 注册时所使用的邮箱即可。

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

|    参数值     |                                                  表现形式                                                  | 备注                             |
| :-----------: | :--------------------------------------------------------------------------------------------------------: | -------------------------------- |
|     `''`      |             ![Gravatar官方图形](//sdn.geekzu.org/avatar/d41d8cd98f00b204e9800998ecf8427e?s=40)             | Gravatar 官方图形                |
|    `'mp'`     |        ![神秘人(一个灰白头像)](//sdn.geekzu.org/avatar/d41d8cd98f00b204e9800998ecf8427e?s=40&d=mp)         | 神秘人(一个灰白头像)             |
| `'identicon'` |         ![抽象几何图形](//sdn.geekzu.org/avatar/d41d8cd98f00b204e9800998ecf8427e?s=40&d=identicon)         | 抽象几何图形                     |
| `'monsterid'` |            ![小怪物](//sdn.geekzu.org/avatar/d41d8cd98f00b204e9800998ecf8427e?s=40&d=monsterid)            | 小怪物                           |
|  `'wavatar'`  | ![用不同面孔和背景组合生成的头像](//sdn.geekzu.org/avatar/d41d8cd98f00b204e9800998ecf8427e?s=40&d=wavatar) | 用不同面孔和背景组合生成的头像   |
|   `'retro'`   |         ![八位像素复古头像](//sdn.geekzu.org/avatar/d41d8cd98f00b204e9800998ecf8427e?s=40&d=retro)         | 八位像素复古头像                 |
| `'robohash'`  |            ![机器人](//sdn.geekzu.org/avatar/d41d8cd98f00b204e9800998ecf8427e?s=40&d=robohash)             | 一种具有不同颜色、面部等的机器人 |
|   `'hide'`    |                                                    N/A                                                     | 不显示头像                       |

[1]: http://cn.gravatar.com/
