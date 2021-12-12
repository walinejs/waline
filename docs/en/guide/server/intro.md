# Server introduction

## Deployment

Beside free deployment on Vercel, you can deploy through docker or directly deploy on a self-hosted environment. See [Standalone Deployment](./vps-deploy.md) for details.

## Config

Most of the server config can be configured through environment variables, and you can also configure some advanced options in the main entry file.

For detailed information please refer to [Reference → Server Config](../../reference/server.md).

## Comment notification

We support multiple ways to notify users or bloggers when users comment, see [Comment Notification](./notification.md) for details.

## Social Login

We support social account login, currently supports GitHub, Twitter, Facebook.

::: tip

We plan to add more social application support in future versions, so stay tuned.

:::

## Multi-database service support

Besides LeanCloud, Waline also supports a variety of databases, including MySQL, PostgreSQL, SQLite and MongoDB.

You only need to configure environment variables, and Waline will automatically switch to the corresponding data storage service based on the environment variables you configure.

See [Multi-database service support](./databases.md) section for details.
