# 头像配置

Waline 同 Valine 一样，目前使用的是[Gravatar][1] 作为评论列表头像。

请自行登录或注册 [Gravatar][1]，然后修改自己的头像。

评论的时候，留下在 [Gravatar][1] 注册时所使用的邮箱即可。

感谢`gravatar.loli.net`提供的镜像服务。  

> 如果你修改了头像后发现没有更新，请不要慌张，因为`gravatar.loli.net` 有七天的缓存期，安静的等待吧~


目前`非自定义头像`有以下7种`默认值`可选:  

参数值|表现形式|备注
:-:|:-:|-
空字符串`''`|![Gravatar官方图形](//gravatar.loli.net/avatar/d41d8cd98f00b204e9800998ecf8427e?s=40)|Gravatar官方图形
`mp`|![神秘人(一个灰白头像)](//gravatar.loli.net/avatar/d41d8cd98f00b204e9800998ecf8427e?s=40&d=mp)|神秘人(一个灰白头像)
`identicon`|![抽象几何图形](//gravatar.loli.net/avatar/d41d8cd98f00b204e9800998ecf8427e?s=40&d=identicon)|抽象几何图形
`monsterid`|![小怪物](//gravatar.loli.net/avatar/d41d8cd98f00b204e9800998ecf8427e?s=40&d=monsterid)|小怪物
`wavatar`|![用不同面孔和背景组合生成的头像](//gravatar.loli.net/avatar/d41d8cd98f00b204e9800998ecf8427e?s=40&d=wavatar)|用不同面孔和背景组合生成的头像
`retro`|![八位像素复古头像](//gravatar.loli.net/avatar/d41d8cd98f00b204e9800998ecf8427e?s=40&d=retro)|八位像素复古头像
`robohash`|![机器人](//gravatar.loli.net/avatar/d41d8cd98f00b204e9800998ecf8427e?s=40&d=robohash)|一种具有不同颜色、面部等的机器人
`hide`|&nbsp;|不显示头像

```js
new Waline({
  ...
  avatar:'' // (''/mp/identicon/monsterid/wavatar/robohash/retro/hide)
});
```

[1]:http://cn.gravatar.com/