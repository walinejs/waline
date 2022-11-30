---
title: Server introduction
icon: server
redirectFrom: /en/guide/server/intro.html
---

## Deployment

Besides deploying on Vercel for free, you can deploy via docker or directly on a self-hosted environment, or to other common cloud platforms. See details

- [Standalone deployment](../deploy/vps.md).

- [Deta](../deploy/deta.md)

- [Railway](../deploy/railway.md)

## Multiple Database Support

Besides LeanClou which is used by default, Waline also supports a variety of databases, including MySQL, PostgreSQL, SQLite and MongoDB.

You only need to configure the environment variables of the corresponding database, and Waline will automatically switch to the corresponding data storage service according to the environment variables you configure.

See [multi-database support](../database.md) for details.

## Configuration

Most configurations on the server side can be configured through environment variables, and you can also configure some advanced options in the main entry file.

For configuration details, see [Server Reference → Environment Variables](../../reference/server/env.md) and [Server Reference → Configuration](../../reference/server/ config.md).

## Comment notification

We support multiple ways to notify users or bloggers when users comment, see [Comment Notifications](../features/notification.md) for details.

## Social Login

We support social account login, currently supports GitHub, Twitter, Facebook.

::: tip

We plan to add more social application support in future versions, so stay tuned.

:::
