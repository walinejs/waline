---
title: Deta 部署
icon: deta
---

[Deta](https://deta.space/) 是一个可免费使用的 Serverless 部署平台。我们可以快速的将 Waline 部署到 Deta 平台上。

<!-- more -->

## 如何部署

[![Deploy with Deta](https://deta.space/buttons/dark.svg)](https://deta.space/discovery/@lizheming/waline)

点击上方按钮，跳转至 Deta 应用市场 Waline 页，点击 <kbd>Install on Space</kbd> 登录后即可自动安装应用。

![Deta 主页](../../assets/deta.png)

稍等片刻即可在 <https://deta.space> 首页上看到应用，点击后会打开部署后的网站地址。将其填入前端脚本的 `serverURL` 配置中，即可完成全部配置。

在该网址后增加 `/ui` 可以进入后台管理界面。

![Deta 工作板](../../assets/deta-1.png)

## 如何更新

当有更新时，在你的应用程序列表页会看到黄色气泡提示，点击更多可以看到 <kbd>Update App</kbd> 选项。

![更新 App](../../assets/deta-2.png)

点击后选择 <kbd>Install App Update</kbd> 稍等片刻后即可更新成功。

![应用更新](../../assets/deta-3.png)

## 如何修改环境变量

在应用程序列表 Waline App 下点击 <kbd>...</kbd> - <kbd>Settings</kbd> - <kbd>Configuration</kbd> 可以对所有的环境变量进行配置。配置完成后点击底部的 <kbd>Save Changes</kbd> 保存即可。
![更新环境变量](../../assets/deta-4.png)
