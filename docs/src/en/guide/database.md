---
title: Multi-database service support
icon: database
order: 2
---

Besides LeanCloud, Waline also supports a variety of databases, including MySQL, PostgreSQL, SQLite and MongoDB.

You only need to configure environment variables, and Waline will automatically switch to the corresponding data storage service based on the environment variables you configure.

<!-- more -->

## MongoDB

<https://mongodb.com> official provides 512M MongoDB database support for free. The following are the environment variables that need to be configured to use MongoDB database.

| Environment Variable | Required | Default   | Description                                  |
| -------------------- | -------- | --------- | -------------------------------------------- |
| `MONGO_DB`           | ✅       |           | MongoDB database name                        |
| `MONGO_USER`         | ✅       |           | MongoDB server username                      |
| `MONGO_PASSWORD`     | ✅       |           | MongoDB server password                      |
| `MONGO_HOST`         |          | 127.0.0.1 | MongoDB server address, support array format |
| `MONGO_PORT`         |          | 27017     | MongoDB server port, support array format    |
| `MONGO_REPLICASET`   |          |           | MongoDB replica set                          |
| `MONGO_AUTHSOURCE`   |          |           | MongoDB auth source                          |
| `MONGO_OPT_SSL`      |          | `false`   | use SSL connection                           |

Here is an example configuration for mongodb.com. Please note that you need set as JSON style for `MONGO_HOST` and `MONGO_PORT` when you has multiple hosts.

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

Using MySQL to store data is also a good choice. Besides our own MySQL service, we can also use [FreeDB)(https://freedb.tech), which provides 25M of database support for free, or [PlanetScale](https://planetscale.com) which only support paid plan now.

If you want to use MySQL as storage, you need to import [waline.sql](https://github.com/walinejs/waline/blob/main/assets/waline.sql) first to create table and table structure, then set these environment variables in project.

| Environment Variable | Required | Default   | Description                |
| -------------------- | -------- | --------- | -------------------------- |
| `MYSQL_DB`           | ✅       |           | MySQL database name        |
| `MYSQL_USER`         | ✅       |           | MySQL server username      |
| `MYSQL_PASSWORD`     | ✅       |           | MySQL server password      |
| `MYSQL_HOST`         |          | 127.0.0.1 | MySQL server address       |
| `MYSQL_PORT`         |          | 3306      | MySQL server port          |
| `MYSQL_PREFIX`       |          | `wl_`     | MySQL table prefix         |
| `MYSQL_CHARSET`      |          | `utf8mb4` | MySQL table charset        |
| `MYSQL_SSL`          |          | `false`   | whether use SSL connection |

## TiDB

[TiDB](https://github.com/pingcap/tidb) is an open source NewSQL database. [TiDB Cloud](https://tidbcloud.com/) is the official online version, which provides 5GB of free quota for everyone to use.

Please refer to [Create TiDB database](../../en/guide/deploy/tidb.md) to understand the initialization process.

| Environment Variable | Required | Default   | Description                     |
| -------------------- | -------- | --------- | ------------------------------- |
| `TIDB_DB`            | ✅       |           | TiDB database name              |
| `TIDB_USER`          | ✅       |           | TiDB database user name         |
| `TIDB_PASSWORD`      | ✅       |           | TiDB database password          |
| `TIDB_HOST`          |          | 127.0.0.1 | Address of TiDB service         |
| `TIDB_PORT`          |          | 4000      | Port of TiDB service            |
| `TIDB_PREFIX`        |          | `wl_`     | Table prefix of TiDB data table |
| `TIDB_CHARSET`       |          | `utf8mb4` | TiDB data table character set   |

## SQLite

Download [waline.sqlite](https://github.com/walinejs/waline/blob/main/assets/waline.sqlite) to your server if you want to use SQLite. Then set these environment variables in project.

| Environment Variable | Required | Default | Description                                                        |
| -------------------- | -------- | ------- | ------------------------------------------------------------------ |
| `SQLITE_PATH`        | ✅       |         | SQLite storage file path, not include file name                    |
| `JWT_TOKEN`          | ✅       |         | Random String for login token generator                            |
| `SQLITE_DB`          |          | waline  | SQLite storage file name, change it if your filename is not waline |
| `SQLITE_PREFIX`      |          | `wl_`   | SQLite table prefix                                                |

## PostgreSQL

[Supabase](https://supabase.com) and [Neon](https://neon.tech/home) offer a free 512M database, while [Tembo](https://tembo.io/) provides 10G PG database support for free. Same as MySQL, you need to import [waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql) to create table and table structure before using PostgreSQL.

| Environment Variable | Required | Default   | Description                         |
| -------------------- | -------- | --------- | ----------------------------------- |
| `PG_DB`              | ✅       |           | PostgreSQL database name            |
| `PG_USER`            | ✅       |           | PostgreSQL server username          |
| `PG_PASSWORD`        | ✅       |           | PostgreSQL server password          |
| `PG_HOST`            |          | 127.0.0.1 | PostgreSQL server address           |
| `PG_PORT`            |          | 3211      | PostgreSQL server port              |
| `PG_PREFIX`          |          | `wl_`     | PostgreSQL table prefix             |
| `PG_SSL`             |          | `false`   | set to `true` to use SSL connection |
| `POSTGRES_DATABASE`  |          |           | alias for `PG_DB`                   |
| `POSTGRES_USER`      |          |           | alias for `PG_USER`                 |
| `POSTGRES_PASSWORD`  |          |           | alias for `PG_PASSWORD`             |
| `POSTGRES_HOST`      |          | 127.0.0.1 | alias for `PG_HOST`                 |
| `POSTGRES_PORT`      |          | 3211      | alias for `PG_PORT`                 |
| `POSTGRES_PREFIX`    |          | `wl_`     | alias for `PG_PREFIX`               |
| `POSTGRES_SSL`       |          | `false`   | alias for `POSTGRES_SSL`            |

## GitHub

Waline supports storing comment data in a CSV file on GitHub. To use GitHub as data storage, you need to apply for Personal access tokens. You can click <kbd>Generate new token</kbd> to apply it at <https://github.com/settings/tokens>. Check the **repo** option in permission to obtain read and write permissions for repositories.

| Environment Variable | Required | Default | Description                                                                                                      |
| -------------------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------- |
| `GITHUB_TOKEN`       | ✅       |         | [Personal access tokens](https://github.com/settings/tokens)                                                     |
| `GITHUB_REPO`        | ✅       |         | repository name, such as `walinejs/waline`                                                                       |
| GITHUB_PATH          |          |         | The data storage directory, such as `data` means it is stored in the `data` directory, root directory by default |

::: warning

Due to performance, using GitHub is not recommended.

:::

## Custom

Besides above database storage, support for other storage services can also be added.

If you want to help Waline supporting more storage services, you can fork the project and inherit the [base class](https://github.com/walinejs/waline/blob/main/packages/server/src/service/storage/base.js) and then implement the `select()`, `add()`, `update()` and `delete()` methods of the corresponding storage service and submit the PR.
