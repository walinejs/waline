# Multi-database service support

In addition to LeanCloud, Waline also supports a variety of databases, including MySQL, PostgreSQL, SQLite and MongoDB. All of these supports only need to configure environment variables, and Waline will automatically switch to the corresponding data storage service according to the environment variables you configure.
## MongoDB
<https://mongodb.com> the official website provides 512M MongoDB database support for free, and we can also use MongoDB as Waline's data storage service. The following are the environment variables that need to be configured to use MongoDB to store.

| Environment Variable | Required | Default   | Description                                  |
| -------------------- | -------- | --------- | -------------------------------------------- |
| `MONGO_HOST`         |          | 127.0.0.1 | MongoDB server address, support array format |
| `MONGO_PORT`         |          | 27017     | MongoDB server port, support array format    |
| `MONGO_USER`         | √        |           | MongoDB server username                      |
| `MONGO_PASSWORD`     | √        |           | MongoDB server password                      |
| `MONGO_REPLICASET`   |          |           | MongoDB replica set                          |
| `MONGO_AUTHSOURCE`   |          |           | MongoDB auth source                          |
| `MONGO_OPT_SSL`      |          |           | use SSL connection                           |

## MySQL

If you want to use MySQL as storage, you need import [waline.sql](https://github.com/lizheming/waline/blob/master/assets/waline.sql) at first to create talbe and column. Then set environment variables in project.

| Environment Variable | Required | Default   | Description           |
| -------------------- | -------- | --------- | --------------------- |
| `MYSQL_HSOT`         |          | 127.0.0.1 | MySQL server address  |
| `MYSQL_PORT`         |          | 3306      | MySQL server port     |
| `MYSQL_DB`           | √        |           | MySQL database name   |
| `MYSQL_USER`         | √        |           | MySQL server username |
| `MYSQL_PASSWORD`     | √        |           | MySQL server password |
| `MYSQL_PREFIX`       |          | `wl_`     | MySQL table prefix    |

## SQLite

Before use SQLite as storage, you should download [waline.sqlite](https://github.com/lizheming/waline/blob/master/assets/waline.sqlite) to your server. Then set environment variables in project.

| Environment Variable | Required | Default | Description                                                         |
| -------------------- | -------- | ------- | ------------------------------------------------------------------- |
| `SQLITE_PATH`        | √        |         | SQLite storage file path, not include file name                     |
| `SQLITE_DB`          |          | waline  | SQLite storage file name, change it if your filenamed is not waline |
| `SQLITE_PREFIX`      |          | `wl_`   | SQLite table prefix                                                 |

## PostgreSQL
[elephantSQL](https://www.elephantsql.com/） provides 20M PG database support for free. It's same with MySQL, you need import [waline.sql](https://github.com/lizheming/waline/blob/master/assets/waline.sql) before use PostgreSQL as storage service.

| Environment Variable | Required | Default   | Description                |
| -------------------- | -------- | --------- | -------------------------- |
| `PG_HSOT`            |          | 127.0.0.1 | PostgreSQL server address  |
| `PG_PORT`            |          | 3211      | PostgreSQL server port     |
| `PG_DB`              | √        |           | PostgreSQL database name   |
| `PG_USER`            | √        |           | PostgreSQL server username |
| `PG_PASSWORD`        | √        |           | PostgreSQL server password |
| `PG_PREFIX`          |          | `wl_`     | PostgreSQL table prefix    |


## Custom

In addition to the above database storage, support for other storage services can also be added. If you want to help Waline support more storage services, you can fork the project and inherit the [base class](https://github.com/lizheming/waline/blob/master/packages/server/src/service/storage/ base.js) and then implement the `select()`, `add()`, `update()`, and `delete()` methods of the corresponding storage service and submit the PR.