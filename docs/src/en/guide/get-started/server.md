---
title: Server introduction
icon: server
order: 2
---

## Deployment

In addition to deploying on Vercel for free, you can deploy via docker or directly on a self-hosted environment, as well as to other common cloud platforms. For more information, see:

- [Standalone deployment](../deploy/vps.md)

- [Railway](../deploy/railway.md)

- [Alibaba Cloud Compute Nest](../deploy/aliyun-computenest.md)

## Multiple Database Support

Besides the default LeanCloud, Waline also supports a variety of databases, including MySQL, PostgreSQL, SQLite, and MongoDB.

You only need to configure the environment variables of the corresponding database, and Waline will automatically switch to the corresponding data storage service.

See [multi-database support](../database.md) for more details.

## Configuration

Most configurations on the server side can be done via environment variables, and you can also configure some advanced options in the main entry file.

For configuration details, see [Server Reference → Environment Variables](../../reference/server/env.md) and [Server Reference → Configuration](../../reference/server/ config.md).

## Comment notification

We support multiple ways of notifying you or your commenters when someone comments or replies. See [Comment Notifications](../features/notification.md) for more details.

## User Account Registration and Social Login

Waline supports in-app account creation and social login using GitHub, Twitter, and Facebook.

::: tip

Stay tuned: We plan to add more social application support in future releases.

:::
