# 快速上手

如果你想在某个网页或者文章页中使用 Waline，请参照以下步骤配置:

<!-- more -->

## 获取 APP ID 和 APP Key

请先 [登录](https://console.leancloud.app/login.html#/signin) 或 [注册](https://console.leancloud.app/login.html#/signup) `LeanCloud 国际版`, 进入 [控制台](https://console.leancloud.app/applist.html#/apps) 后点击左下角 [创建应用](https://console.leancloud.app/applist.html#/newapp):

![创建应用](https://i.loli.net/2019/06/21/5d0c995c86fac81746.jpg)

创建好应用后，进入刚刚创建的应用，选择左下角的 `设置` > `应用Key`，然后就能看到你的 `APP ID`,`APP Key` 和 `Master Key` 了:

![ID 和 Key](https://i.loli.net/2019/06/21/5d0c995c86fac81746.jpg)

::: tip

我们推荐大家使用 Leancloud 国际版 ([leancloud.app](https://leancloud.app))。如果你确实想用 Leancloud 国内版([leancloud.cn](https://leancloud.cn))，除了 `APP_ID`, `APP_Key` 和 `Master Key` 之外，你还需要**为应用绑定域名**。

**绑定域名**: 进入应用后选择 `设置` > `域名绑定` > `API 访问域名` > `绑定新域名` > 输入需要绑定的已备案域名点击 `确定`。之后按照页面上的提示去 DNS 上做正确的 CNAME 解析即可。

![域名设置](https://i.loli.net/2020/11/09/xfsX4JKt9zhuaiB.png)

:::

## Vercel 部署

[![Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/lizheming/waline/tree/master/example)

点击上方按钮，跳转至 Vercel 进行快速部署。未登录的话建议选择 GitHub 登录。之后请按要求输入 Vercel 项目名称。

![创建项目](https://p2.ssl.qhimg.com/t018cd2a91a8896a555.png)

输入名称后点击 `Continue` 进入下一步，输入 GitHub 仓库名称。Vercel 会基于 waline 模板帮助你新建并初始化该仓库。

![创建仓库](https://p4.ssl.qhimg.com/t01bb30e74f85ddf5b3.png)

仓库初始化完毕后，需要在 Environment Variables 中配置 `LEAN_ID`, `LEAN_KEY` 和 `LEAN_MASTER_KEY` 三个环境变量。它们的值分别对应上一步在 LeanCloud 中获得的 `APP ID`, `APP KEY`, `Master Key`。如果你是 LeanCloud 国内版用户的话，还需要输入 `LEAN_SERVER` 环境变量，对应的是你在上一步上绑定的已备案域名。

![设置域名](https://p5.ssl.qhimg.com/t019aec05e3e5fea5cc.png)

设置好环境变量后，点击 `Deploy` 部署。稍等片刻，你会看到满屏的烟花庆祝部署成功。点击 `Visit` ，即可跳转到部署好的网站地址，该地址即为之后需要填入的 `serverURL` 地址。

![部署成功](https://p0.ssl.qhimg.com/t0142b58c2e8f886b28.png)

## HTML 片段

设置初始化配置中的 `serverURL` 选项为上面刚刚获取到的二级域名即可(其他可以默认)。

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
      serverURL: 'https://your-domain.vercel.app',
    });
  </script>
</body>
```

## NPM

Waline 已发布到 [npm](https://www.npmjs.com/package/@waline/client)，可以直接安装:

<CodeGroup>
<CodeGroupItem title="yarn">

```bash
yarn add -D @waline/client
```

</CodeGroupItem>

<CodeGroupItem title="npm">

```bash
npm i -D @waline/client
```

</CodeGroupItem>
</CodeGroup>

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

Waline 还带有简单的后台，可以实现对评论的管理。部署完成后，建议立即访问 `<serverURL>/ui/register` 进行注册，第一个注册的人会被设定成管理员。登陆后，即可看到评论管理界面，建议收藏该地址以便后续使用。
