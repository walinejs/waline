---
title: Multi-database service support
icon: database
---

Besides LeanCloud, Waline also supports a variety of databases, including MySQL, PostgreSQL, SQLite and MongoDB.

You only need to configure environment variables, and Waline will automatically switch to the corresponding data storage service based on the environment variables you configure.

<!-- more -->

## MongoDB

<https://mongodb.com> official provides 512M MongoDB database support for free. The following are the environment variables that need to be configured to use MongoDB database.

| Environment Variable | Required | Default   | Description                                  |
| -------------------- | -------- | --------- | -------------------------------------------- |
| `MONGO_HOST`         |          | 127.0.0.1 | MongoDB server address, support array format |
| `MONGO_PORT`         |          | 27017     | MongoDB server port, support array format    |
| `MONGO_DB`           | ✅       |           | MongoDB database name                        |
| `MONGO_USER`         | ✅       |           | MongoDB server username                      |
| `MONGO_PASSWORD`     | ✅       |           | MongoDB server password                      |
| `MONGO_REPLICASET`   |          |           | MongoDB replica set                          |
| `MONGO_AUTHSOURCE`   |          |           | MongoDB auth source                          |
| `MONGO_OPT_SSL`      |          |           | use SSL connection                           |

Here is an example configuration for mongodb.com. Please note that you need set as JSON style for `MONGO_HOST` and `MONGO_PORT` when you has mulitple hosts.

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

Using MySQL to store data is also a good choise. Besides our own MySQL service, we can also use <https://freedb.tech>, which provides 100M of database support for free.

If you want to use MySQL as storage, you need to import [waline.sql](https://github.com/walinejs/waline/blob/main/assets/waline.sql) first to create table and table structure, then set these environment variables in project.

| Environment Variable | Required | Default   | Description           |
| -------------------- | -------- | --------- | --------------------- |
| `MYSQL_HOST`         |          | 127.0.0.1 | MySQL server address  |
| `MYSQL_PORT`         |          | 3306      | MySQL server port     |
| `MYSQL_DB`           | ✅       |           | MySQL database name   |
| `MYSQL_USER`         | ✅       |           | MySQL server username |
| `MYSQL_PASSWORD`     | ✅       |           | MySQL server password |
| `MYSQL_PREFIX`       |          | `wl_`     | MySQL table prefix    |
| `MYSQL_CHARSET`      |          | `utf8mb4` | MySQL table charset   |

## SQLite

Download [waline.sqlite](https://github.com/walinejs/waline/blob/main/assets/waline.sqlite) to your server if you want to use SQLite. Then set these environment variables in project.

| Environment Variable | Required | Default | Description                                                         |
| -------------------- | -------- | ------- | ------------------------------------------------------------------- |
| `SQLITE_PATH`        | ✅       |         | SQLite storage file path, not include file name                     |
| `SQLITE_DB`          |          | waline  | SQLite storage file name, change it if your filenamed is not waline |
| `SQLITE_PREFIX`      |          | `wl_`   | SQLite table prefix                                                 |
| `JWT_TOKEN`          | ✅       |         | Random String for login token generator                             |

## PostgreSQL

[elephantSQL](https://www.elephantsql.com/) provides 20M PG database support for free. Same as MySQL, you need to import [waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql) to create table and table structure before using PostgreSQL.

| Environment Variable | Required | Default   | Description                |
| -------------------- | -------- | --------- | -------------------------- |
| `PG_HOST`            |          | 127.0.0.1 | PostgreSQL server address  |
| `PG_PORT`            |          | 3211      | PostgreSQL server port     |
| `PG_DB`              | ✅       |           | PostgreSQL database name   |
| `PG_USER`            | ✅       |           | PostgreSQL server username |
| `PG_PASSWORD`        | ✅       |           | PostgreSQL server password |
| `PG_PREFIX`          |          | `wl_`     | PostgreSQL table prefix    |

## GitHub

Waline supports storing comment data in a CSV file on GitHub. To use GitHub as data storage, you need to apply for Personal access tokens. You can click <kbd>Generate new token</kbd> to apply it at <https://github.com/settings/tokens>. Check the **repo** option in permission to obtain read and write permissions for repositories.

| Environment Variable | Required | Default | Description                                                                                                      |
| -------------------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------- |
| GITHUB_TOKEN         | ✅       |         | [Personal access tokens](https://github.com/settings/tokens)                                                     |
| GITHUB_REPO          | ✅       |         | repository name, such as `walinejs/waline`                                                                       |
| GITHUB_PATH          |          |         | The data storage directory, such as `data` means it is stored in the `data` directory, root directory by default |

::: warning

Due to preformance, using GitHub is not recommanded.

:::

## Deta Base

Deta provides [Deta Base](https://docs.deta.sh/docs/base/about) free database support, which can be used even if it is not deployed on Deta. If deployed on Deta, there is no need to configure any environment variables. By default, Waline will use Deta Base as the database to store data. If it is deployed elsewhere, the following environment variables need to be configured.

| Environment Variable | Required | Default | Description             |
| -------------------- | -------- | ------- | ----------------------- |
| `DETA_PROJECT_KEY`   | ✅       |         | Deta project secret key |

## Custom

Besides above database storage, support for other storage services can also be added.

If you want to help Waline supporting more storage services, you can fork the project and inherit the [base class](https://github.com/walinejs/waline/blob/main/packages/server/src/service/storage/base.js) and then implement the `select()`, `add()`, `update()` and `delete()` methods of the corresponding storage service and submit the PR.
