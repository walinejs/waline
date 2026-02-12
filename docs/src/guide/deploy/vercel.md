---
title: Vercel 部署
icon: vercel
order: 1
---

欢迎使用 Waline，只需几个步骤，你就可以在你的网站中启用 Waline 提供评论与浏览量服务。

<!-- more -->

## 部署服务端

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwalinejs%2Fwaline%2Ftree%2Fmain%2Fexample)

1. 点击上方按钮，跳转至 Vercel 进行 Server 端部署。

   ::: note

   如果你未登录的话，Vercel 会让你注册或登录，请使用 GitHub 账户进行快捷登录。

   :::

1. 输入一个你喜欢的 Vercel 项目名称并点击 `Create` 继续:

   ![create](../../assets/vercel-1.png)

1. 此时 Vercel 会基于 Waline 模板帮助你新建并初始化仓库，仓库名为你之前输入的项目名。

   ![new](../../assets/vercel-2.png)

   一两分钟后，满屏的烟花会庆祝你部署成功。此时点击 `Go to Dashboard` 可以跳转到应用的控制台。

   ![dashboard](../../assets/vercel-3.png)

## 创建数据库

1. 点击顶部的 `Storage` 进入存储服务配置页，选择 `Create Database` 创建数据库。`Marketplace Database Providers` 数据库服务选择 `Neon`，点击 `Continue` 进行下一步。

   ![storage](../../assets/vercel-4.png)

1. 此时会让你创建一个 Neno 账号，此时选择 `Accept and Create` 接受并创建。后续选择数据库的套餐配置，包括地区和额度。这里可以什么都不操作直接选择 `Continue` 下一步。

   ![neon](../../assets/vercel-5.png)

1. 此时会让你定义数据库名称，这里也可以不用修改直接 `Continue` 进行下一步。

   ![neon](../../assets/vercel-6.png)

1. 这时候 `Storage` 下就有你创建的数据库服务了，点击进去选择 `Open in Neon` 跳转到 Neon。在 Neon 界面左侧选择 `SQL Editor`，将 [waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql) 中的 SQL 语句粘贴进编辑器中，点击 `Run` 执行创建表操作。

   ![neon](../../assets/vercel-7.png)

   ![neon](../../assets/vercel-8.png)

1. 稍等片刻之后会告知你创建成功。此时回到 Vercel，点击顶部的 `Deployments` 点击顶部最新的一次部署右侧的 `Redeploy` 按钮进行重新部署。该步骤是为了让刚才配置的数据库服务生效。

   ![redeploy success](../../assets/vercel-9.png)

1. 此时会跳转到 `Overview` 界面开始部署，等待片刻后 `STATUS` 会变成 `Ready`。此时请点击 `Visit` ，即可跳转到部署好的网站地址，此地址即为你的服务端地址。

   ![visit](../../assets/vercel-10.png)

## 绑定域名

1. 点击顶部的 `Settings` - `Domains` 进入域名配置页

1. 输入需要绑定的域名并点击 `Add`

   ![Add domain](../../assets/vercel-11.png)

1. 在域名服务器商处添加新的 `CNAME` 解析记录

   | Type  | Name    | Value                |
   | ----- | ------- | -------------------- |
   | CNAME | example | cname.vercel-dns.com |

1. 等待生效，你可以通过自己的域名来访问了:tada:
   - 评论系统：example.yourdomain.com
   - 评论管理：example.yourdomain.com/ui

   ![success](../../assets/vercel-12.png)

## HTML 引入

在你的网页中进行如下设置:

1. 导入 Waline 样式 `https://unpkg.com/@waline/client@v3/dist/waline.css`。

1. 创建 `<script>` 标签使用来自 `https://unpkg.com/@waline/client@v3/dist/waline.js` 的 `init()` 函数初始化，并传入必要的 `el` 与 `serverURL` 选项。
   - `el` 选项是 Waline 渲染使用的元素，你可以设置一个字符串形式的 CSS 选择器或者一个 HTMLElement 对象。
   - `serverURL` 是服务端的地址，即上一步获取到的值。

   ```html {3-7,12-18}:line-numbers
   <head>
     <!-- ... -->
     <link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css" />
     <!-- ... -->
   </head>
   <body>
     <!-- ... -->
     <div id="waline"></div>
     <script type="module">
       import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

       init({
         el: '#waline',
         serverURL: 'https://your-domain.vercel.app',
       });
     </script>
   </body>
   ```

1. 评论服务此时就会在你的网站上成功运行 :tada:

## 评论管理 (管理端)

1. 部署完成后，请访问 `<serverURL>/ui/register` 进行注册。首个注册的人会被设定成管理员。
1. 管理员登录后，即可看到评论管理界面。在这里可以修改、标记或删除评论。
1. 用户也可通过评论框注册账号，登陆后会跳转到自己的档案页。
