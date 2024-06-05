---
title: Railway 部署
icon: railway
---

[Railway](https://railway.app/) 是一个可免费使用的 Serverless 部署平台。我们可以快速的将 Waline 部署到 Railway 平台上。

<!-- more -->

## 如何部署

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/UZB84v?referralCode=lizheming)

点击上方按钮，跳转至 Railway 平台快速部署。登录之后会让你选择新建仓库的名称，环境变量部分不需要改动，直接点击下方的 <kbd>Deploy</kbd> 按钮进行部署即可。

![railway1](../../assets/railway-1.jpg)

进入管理界面后，选择 <kbd>PostgreSQL</kbd> - <kbd>Query</kbd>，将 [waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql) 中的内容粘贴至输入框中，点击底部的 <kbd>Run Query</kbd> 按钮完成数据库的初始化。

![railway2](../../assets/railway-2.jpg)

最后在 <kbd>Deployments</kbd> - <kbd>Domains</kbd> 中就可以获取到访问的地址了。

![railway3](../../assets/railway-3.jpg)

## 如何更新

进入到 GitHub 仓库中，修改 package.json 文件中的 `@waline/vercel` 版本号为最新版本即可。

## 如何修改环境变量

可以通过 <kbd>Variables</kbd> Tab 进入环境变量管理页，修改完成之后会自动重新部署。

![railway4](../../assets/railway-4.jpg)
