---
title: Dokploy 部署
icon: docker
---

[Dokploy](https://dokploy.com/) 是一个开源部署平台，可以使用 Docker Compose 快速部署 Waline。

<!-- more -->

## 如何部署

在 Dokploy 中创建一个 <kbd>Compose</kbd> 服务，将 [Dokploy Compose 模板](https://github.com/walinejs/waline/blob/main/packages/server/docker-compose.dokploy.yml) 的内容复制到 <kbd>Compose</kbd> 配置中。

在 <kbd>Environment</kbd> 中设置以下环境变量：

| 环境变量 | 说明 |
| --- | --- |
| `JWT_TOKEN` | 用于签发登录令牌的随机字符串。请使用强随机值并妥善保管。 |
| `SITE_NAME` | 站点名称。 |
| `SITE_URL` | 站点 URL，例如 `https://example.com`。 |
| `SECURE_DOMAINS` | 允许访问 Waline 服务端的域名，例如 `example.com`。 |
| `AUTHOR_EMAIL` | 管理员邮箱。 |
| `TZ` | 时区，例如 `Asia/Shanghai`。 |

在 <kbd>Domains</kbd> 中为 `waline` 服务添加域名，端口设为 `8360`，然后部署服务。

模板使用名为 `waline-data` 的 Docker 卷保存 SQLite 数据库。不要删除该卷，否则已有的评论数据会丢失。
