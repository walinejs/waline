---
title: 多数据库服务支持
icon: database
order: 2
---

除了官方默认的 LeanCloud 之外，Waline 还支持多种数据库，包括 MySQL, PostgreSQL, SQLite 以及 MongoDB。

你只需配置对应的数据库的环境变量，Waline 会自动根据你配置的环境变量切换到对应的数据存储服务。

<!-- more -->

## MongoDB

<https://mongodb.com> 官网免费提供了 512M 的 MongoDB 数据库支持。以下是使用 MongoDB 存储需要配置的环境变量。

| 环境变量名称       | 必填 | 默认值    | 备注                             |
| ------------------ | ---- | --------- | -------------------------------- |
| `MONGO_DB`         | ✅   |           | MongoDB 数据库名称               |
| `MONGO_USER`       | ✅   |           | MongoDB 服务的用户名             |
| `MONGO_PASSWORD`   | ✅   |           | MongoDB 服务的密码               |
| `MONGO_HOST`       |      | 127.0.0.1 | MongoDB 服务的地址，支持数组格式 |
| `MONGO_PORT`       |      | 27017     | MongoDB 服务的端口，支持数组格式 |
| `MONGO_REPLICASET` |      |           | MongoDB 集群                     |
| `MONGO_AUTHSOURCE` |      |           | MongoDB 认证源                   |
| `MONGO_OPT_SSL`    |      | `false`   | 是否使用 SSL 进行连接            |

以下是使用 mongodb.com 官方服务的配置示例，多机需要将 `MONGO_HOST` 和 `MONO_PORT` 配置成 JSON 格式。

```bash
MONGO_HOST=["cluster0-shard-00-00.p4edw.mongodb.net","cluster0-shard-00-01.p4edw.mongodb.net","cluster0-shard-00-02.p4edw.mongodb.net"]
MONGO_PORT=[27017,27017,27017,27017]
MONGO_DB=waline
MONGO_USER=admin
MONGO_PASSWORD=xxxx
MONGO_REPLICASET=atlas-12cebf-shard-0
MONGO_AUTHSOURCE=admin
MONGO_OPT_SSL=true
```

## MySQL

使用 MySQL 存储数据也是一个很好的选择，除了使用自建的 MySQL 服务之外，我们可以使用 [PlanetScale](https://planetscale.com)(目前仅支持付费计划),或者 [FreeDB](https://freedb.tech)，它免费提供了 25M 的数据库支持。

使用时请先导入 [waline.sql](https://github.com/walinejs/waline/blob/main/assets/waline.sql) 以完成表和表结构的创建，之后在项目中配置如下环境变量。

| 环境变量名称     | 必填 | 默认值    | 备注                          |
| ---------------- | ---- | --------- | ----------------------------- |
| `MYSQL_HOST`     |      | 127.0.0.1 | MySQL 服务的地址              |
| `MYSQL_PORT`     |      | 3306      | MySQL 服务的端口              |
| `MYSQL_DB`       | ✅   |           | MySQL 数据库库名              |
| `MYSQL_USER`     | ✅   |           | MySQL 数据库的用户名          |
| `MYSQL_PASSWORD` | ✅   |           | MySQL 数据库的密码            |
| `MYSQL_PREFIX`   |      | `wl_`     | MySQL 数据表的表前缀          |
| `MYSQL_CHARSET`  |      | `utf8mb4` | MySQL 数据表的字符集          |
| `MYSQL_SSL`      |      | `false`   | 是否使用 SSL MYSQL 连接数据库 |

## TiDB

[TiDB](https://github.com/pingcap/tidb) 是一款开源的 NewSQL 数据库。[TiDB Cloud](https://tidbcloud.com/) 则是官方提供的在线版本，它提供了 5GB 的免费额度。

使用时请查阅[创建 TiDB 数据库](../guide/deploy/tidb.md)了解初始化流程。

| 环境变量名称    | 必填 | 默认值    | 备注                |
| --------------- | ---- | --------- | ------------------- |
| `TIDB_DB`       | ✅   |           | TiDB 数据库库名     |
| `TIDB_USER`     | ✅   |           | TiDB 数据库的用户名 |
| `TIDB_PASSWORD` | ✅   |           | TiDB 数据库的密码   |
| `TIDB_HOST`     |      | 127.0.0.1 | TiDB 服务的地址     |
| `TIDB_PORT`     |      | 4000      | TiDB 服务的端口     |
| `TIDB_PREFIX`   |      | `wl_`     | TiDB 数据表的表前缀 |
| `TIDB_CHARSET`  |      | `utf8mb4` | TiDB 数据表的字符集 |

## SQLite

使用 SQLite 时需要下载 [waline.sqlite](https://github.com/walinejs/waline/blob/main/assets/waline.sqlite) 文件至合适的位置。之后在项目中配置如下环境变量。

| 环境变量名称    | 必填 | 默认值 | 备注                                              |
| --------------- | ---- | ------ | ------------------------------------------------- |
| `SQLITE_PATH`   | ✅   |        | SQLite 数据库文件的路径，该路径不包含文件名本身   |
| `JWT_TOKEN`     | ✅   |        | 用户登录密钥，随机字符串即可                      |
| `SQLITE_DB`     |      | waline | SQLite 数据库文件名，若文件名变化需要修改该字段值 |
| `SQLITE_PREFIX` |      | `wl_`  | SQLite 数据表的表前缀                             |

## PostgreSQL

[Supabase](https://supabase.com) 和 [Neon](https://neon.tech/home) 均提供了 512M 的数据库支持，而 [Tembo](https://tembo.io/) 则提供了 10G 的免费空间。如果想要使用 PostgreSQL 的也可以使用它们搭建 Waline。

同 MySQL，使用 PostgreSQL 也需要先导入 [waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql) 创建好表和表结构。之后在项目中配置如下环境变量。

| 环境变量名称        | 必填 | 默认值    | 备注                                |
| ------------------- | ---- | --------- | ----------------------------------- |
| `PG_DB`             | ✅   |           | PostgreSQL 数据库库名               |
| `PG_USER`           | ✅   |           | PostgreSQL 数据库的用户名           |
| `PG_PASSWORD`       | ✅   |           | PostgreSQL 数据库的密码             |
| `PG_HOST`           |      | 127.0.0.1 | PostgreSQL 服务的地址               |
| `PG_PORT`           |      | 3211      | PostgreSQL 服务的端口               |
| `PG_PREFIX`         |      | `wl_`     | PostgreSQL 数据表的表前缀           |
| `PG_SSL`            |      | `false`   | 是否使用 SSL 连接 PostgreSQL 数据库 |
| `POSTGRES_DATABASE` |      |           | 同 `PG_DB`                          |
| `POSTGRES_USER`     |      |           | 同 `PG_USER`                        |
| `POSTGRES_PASSWORD` |      |           | 同 `PG_PASSWORD`                    |
| `POSTGRES_HOST`     |      | 127.0.0.1 | 同 `PG_HOST`                        |
| `POSTGRES_PORT`     |      | 3211      | 同 `PG_PORT`                        |
| `POSTGRES_PREFIX`   |      | `wl_`     | 同 `PG_PREFIX`                      |
| `POSTGRES_SSL`      |      | `false`   | 同 `POSTGRES_SSL`                   |

## CloudBase

腾讯云开发也提供了一定的 [免费数据库](https://console.cloud.tencent.com/tcb/db/) 支持，即使不部署在腾讯云开发上也可以使用。如果部署在腾讯云开发上，不需要配置任何环境变量，Waline 默认会使用云开发的数据库。如果是部署在其它地方，需要配置以下环境变量。

| 环境变量名称 | 必填 | 默认值 | 备注                                                                   |
| ------------ | ---- | ------ | ---------------------------------------------------------------------- |
| `TCB_ENV`    | ✅   |        | 腾讯云开发环境 ID                                                      |
| `TCB_ID`     | ✅   |        | 腾讯云 API 密钥 ID                                                     |
| `TCB_KEY`    | ✅   |        | 腾讯云 API 密钥 Key                                                    |
| `JWT_TOKEN`  |      |        | 用户登录密钥，如果没有配任何环境变量的话需要配置此变量，随机字符串即可 |

::: tip

对于腾讯云 API 密钥 ID 与 Key，可以在 [此处](https://console.cloud.tencent.com/cam/capi) 申请。

:::

## GitHub

Waline 支持将评论数据以 CSV 文件的格式存储在 GitHub 仓库中。使用 GitHub 作为数据存储需要申请 Personal access tokens，可在 <https://github.com/settings/tokens> 这里点击 <kbd>Generate new token</kbd> 进行申请，下方权限选项中勾选上 **repo** 选项，用于获得仓库的读写权限。

| 环境变量名称   | 必填 | 默认值 | 备注                                                                     |
| -------------- | ---- | ------ | ------------------------------------------------------------------------ |
| `GITHUB_TOKEN` | ✅   |        | [Personal access tokens](https://github.com/settings/tokens)             |
| `GITHUB_REPO`  | ✅   |        | 仓库名称，例如 `walinejs/waline`                                         |
| `GITHUB_PATH`  |      |        | 数据存储目录，例如 `data` 表示存储在 `data` 目录下，默认存在仓库根目录下 |

::: warning

出于国内 Github 服务访问稳定性与 CSV 读取与存储性能的原因，我们不建议国内用户使用 Github 作为存储库。

:::

## 更多

除了以上数据库存储之外，waline 也能够很方便的扩展其它存储服务。

如果你想帮助 Waline 支持更多的存储服务的话，可以 Fork 项目，继承该 [基类](https://github.com/walinejs/waline/blob/main/packages/server/src/service/storage/base.js) 后分别实现对应存储服务的 `select()`, `add()`, `update()`, `delete()` 方法后提交 PR 即可。
