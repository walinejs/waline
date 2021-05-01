# 快速上手

如果你想在某个网页或者文章页中使用 Waline，请参照以下步骤配置

<!-- more -->

## 获取 APP ID 和 APP Key

请先[登录](https://console.leancloud.app/login.html#/signin)或[注册](https://console.leancloud.app/login.html#/signup) `LeanCloud 国际版`, 进入[控制台](https://console.leancloud.app/applist.html#/apps)后点击左下角[创建应用](https://console.leancloud.app/applist.html#/newapp)：

![](https://i.loli.net/2019/06/21/5d0c995c86fac81746.jpg)

应用创建好以后，进入刚刚创建的应用，选择左下角的`设置`>`应用Key`，然后就能看到你的`APP ID`,`APP Key`和`Master Key`了：

![](https://i.loli.net/2019/06/21/5d0c997a60baa24436.jpg)

> **注：**  
> 这里推荐使用 Leancloud 国际版。如果你确实想用 Leancloud 国内版的话（国际版是 [leancloud.app](https://leancloud.app)，非国际版是 [leancloud.cn](https://leancloud.cn)），除了 `APP_ID`, `APP_Key` 和 `Master Key` 之外，还需要对应用进行域名绑定。  
> 进入应用后选择 <kbd>设置</kbd> > <kbd>域名绑定</kbd> > API 访问域名 <kbd>绑定新域名</kbd> > 输入需要绑定的已备案域名点击 <kbd>确定</kbd>。之后按照页面上的提示去 DNS 上做正确的 CNAME 解析即可。
>
> ![](https://i.loli.net/2020/11/09/xfsX4JKt9zhuaiB.png)

## Vercel 部署

[![Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/lizheming/waline/tree/master/example)

点击上方按钮，跳转至 Vercel 进行快速部署。未登录的话需要登录，这里选 GitHub 登录即可。登录后会让你输入 Vercel 项目名称。

![](https://p2.ssl.qhimg.com/t018cd2a91a8896a555.png)

输入名称后点击 <kbd>Continue</kbd> 进入下一步，输入 GitHub 仓库名称。Vercel 会基于 waline 模板帮助你新建并初始化该仓库。

![](https://p4.ssl.qhimg.com/t01bb30e74f85ddf5b3.png)

仓库初始化完毕后开始准备部署到 Vercel。这里需要在 Environment Variables 初配置 `LEAN_ID`, `LEAN_KEY` 和 `LEAN_MASTER_KEY` 三个环境变量。它们的值分别对应上一步在 LeanCloud 中获得的 `APP ID`, `APP KEY`, `Master Key`。如果你是 LeanCloud 国内版用户的话，还需要输入 `LEAN_SERVER` 环境变量，对应的是你在上一步上绑定的已备案域名。

![](https://p5.ssl.qhimg.com/t019aec05e3e5fea5cc.png)

点击 <kbd>Deploy</kbd> 就会开始进行部署了。稍等片刻，就会看到满屏的烟花庆祝你部署成功了。点击 <kbd>Visit</kbd> 会跳转到部署好的网站地址上，该地址即为之后需要填入的 `serverURL` 地址。

![](https://p0.ssl.qhimg.com/t0142b58c2e8f886b28.png)

## HTML 片段

修改初始化对象中的 `serverURL` 的值为上面刚刚获取到的二级域名即可(其他可以默认)。

```html
<head>
  ..
  <script src="//cdn.jsdelivr.net/npm/@waline/client/dist/Waline.min.js"></script>
  ...
</head>
<body>
  ...
  <div id="waline"></div>
  <script>
    new Waline({
      el: '#waline',
      path: location.pathname,
      serverURL: 'https://your-domain.vercel.app',
    });
  </script>
</body>
```

## 配置

修改初始化对象中的 `serverURL` 的值为上面刚刚获取到的二级域名即可(其他可以默认)。

```js
new Waline({
  el: '#waline',
  path: location.pathname,
});
```

## NPM

Waline 已发布到[npm](https://www.npmjs.com/package/@waline/client)，可以直接用命令安装：

```bash
# Install waline
npm install @waline/client --save-dev
```

```js
// Use import
import Waline from '@waline/client';
// or Use require
const Waline = require('@waline/client');

new Waline({
  el: '#waline',
  // other config
});
```

## 评论数据管理

Waline 还带有简单的后台，可以实现对评论的管理。部署完成后访问 `<serverURL>/ui/register` 进行注册，第一个注册的你会被设定成管理员。登录成功后就可以看到评论管理的界面了，大家可以收藏该地址方便后续使用。
