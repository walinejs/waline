---
title: 多数据库服务支持
icon: database
order: 2
---

Waline 支持多种数据库，包括 MySQL, PostgreSQL, SQLite 以及 MongoDB。

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

Waline 支持将评论数据以 CSV 文件的格式存储在 GitHub 仓库中，并提供了两种布局：默认的「单文件」布局，以及可选的「多分片」布局。

使用 GitHub 作为数据存储需要申请 Personal access tokens，可在 <https://github.com/settings/tokens> 这里点击 <kbd>Generate new token</kbd> 进行申请，下方权限选项中勾选上 **repo** 选项（使用 Fine-grained token 时请给数据仓库的 **Contents** 读写权限），用于获得仓库的读写权限。

| 环境变量名称     | 必填 | 默认值   | 备注                                                                         |
| ---------------- | ---- | -------- | ---------------------------------------------------------------------------- |
| `GITHUB_TOKEN`   | ✅   |          | [Personal access tokens](https://github.com/settings/tokens)                 |
| `GITHUB_REPO`    | ✅   |          | 仓库名称，例如 `walinejs/waline`，也可以直接填仓库 URL                       |
| `GITHUB_PATH`    |      |          | 单文件布局的数据存储目录，例如 `data` 表示存储在 `data` 目录下，默认为根目录 |
| `GITHUB_BRANCH`  |      | `main`   | 多分片布局读取与提交的分支                                                   |
| `GITHUB_STORAGE` |      | `legacy` | 存储布局：`legacy` 为单文件布局，`sharded` 为多分片布局                      |

### 单文件布局（默认）

不配置 `GITHUB_STORAGE` 时，每个数据表对应一个 CSV 文件，例如 `data/Comment.csv`、`data/Users.csv` 与 `data/Counter.csv`。这一布局的行为与历史版本完全一致，已有站点升级后数据无需迁移。

单次写入会重写整个文件，因此评论量较大时单次读写的成本随全站数据量增长。

### 多分片布局

配置 `GITHUB_STORAGE=sharded` 后，数据会按文章拆分为多个 CSV 分片，仓库结构如下：

```text
data/                       # 由 CSV_STORE_DIR 指定
├── comments/               # Comment 表
│   ├── ab/abcd.csv         # 分片：同一篇文章的评论都落在同一族
│   ├── ab/abcd-1.csv       # 行数达到 SHARD_MAX_ROWS 后裂变出的分片
│   └── _manifest.csv       # 分片清单（路径、行数、SHA）
├── users/                  # Users 表，按 objectId 前两位分桶
├── counters/               # Counter 表，与 Comment 同样按 url 哈希
└── _snapshots/             # 每日快照清单
    └── 2026-09-25.csv
```

- 分片位置只由行数据的 key 决定（`Comment` / `Counter` 用 `url` 的哈希，`Users` 用 `objectId`），因此查询一篇文章的评论只会读取命中分片，而不是整个数据集。
- 分片与其清单在同一次 Git 提交中写入，二者不会出现不一致的中间状态；提交通过 `force=false` 的 ref 更新实现乐观锁，冲突时自动合并重试。
- 每个请求响应前都会先落盘，因此 “200 OK” 意味着数据已经写入仓库。

| 环境变量名称           | 必填 | 默认值                   | 备注                                             |
| ---------------------- | ---- | ------------------------ | ------------------------------------------------ |
| `CSV_STORE_DIR`        |      | `data`                   | 数据根目录                                       |
| `SHARD_MAX_ROWS`       |      | `2000`                   | 单个分片的行数上限，超过后裂变                   |
| `SHARD_HASH_LEN`       |      | `2`                      | 一级目录的哈希前缀长度                           |
| `FLUSH_INTERVAL`       |      | `30000`                  | 定时落盘间隔（毫秒），常驻部署时才依赖           |
| `MAX_BATCH_SIZE`       |      | `50`                     | 单次 Git 提交最多包含的分片数                    |
| `MAX_RETRIES`          |      | `3`                      | 一次落盘的最大尝试次数（含冲突重试）             |
| `CSV_CACHE_TTL`        |      | `60000`                  | 内存缓存有效期（毫秒），决定跨实例可见的延迟     |
| `DEDUP_WINDOW_SECONDS` |      | `60`                     | 重复提交去重窗口，`0` 表示关闭                   |
| `SNAPSHOT_KEEP_DAYS`   |      | `30`                     | 快照保留天数，`0` 表示关闭快照                   |
| `SNAPSHOT_HOUR`        |      | `3`                      | 每日快照的触发时点（本地时间的整点）             |
| `GITHUB_API_BASE`      |      | `https://api.github.com` | 仅用于测试或自建代理                             |

#### 运维接口

多分片布局内置了一组运维接口，它们和 Waline 的接口同源（默认带 `/api` 前缀），且都需要管理员身份（请求头携带 `Authorization: Bearer <登录 token>`）：

| 方法   | 路径                       | 作用                                                           |
| ------ | -------------------------- | -------------------------------------------------------------- |
| `POST` | `/api/csv-store/snapshot`  | 立即创建快照并清理过期快照                                     |
| `GET`  | `/api/csv-store/snapshot`  | 列出已有快照日期                                               |
| `POST` | `/api/csv-store/restore`   | 用某个快照覆盖恢复，`date=YYYY-MM-DD` 必填                     |
| `POST` | `/api/csv-store/compact`   | 把行数回落的分片族合并回基础分片                               |
| `POST` | `/api/csv-store/repair`    | 把错位分片（例如页面换了地址）的行搬回规范分片                 |
| `POST` | `/api/csv-store/rebuild`   | 以仓库真实文件为准核对分片并修正清单，手工改过仓库后使用       |
| `POST` | `/api/csv-store/flush`     | 手动把内存中待提交的变更落盘                                   |
| `GET`  | `/api/csv-store/stats`     | 查看分片数、待提交数、提交/冲突/重试次数等运行指标             |
| `POST` | `/api/csv-store/reset`     | **不可逆**：丢弃全部历史提交，只保留当前数据，需传 `confirm=1` |

每日快照会在 `SNAPSHOT_HOUR` 之后由第一个到达的请求触发，当天只执行一次；快照本身只记录文件路径与 SHA，不会重复上传数据。需要对时点精确控制时，可以用平台的定时任务调用 `POST /api/csv-store/snapshot`。

::: tip

多分片布局的实现来自 [exyonefs/waline-csv-shard-archive](https://github.com/exyonefs/waline-csv-shard-archive)。该仓库的方案已经合并进 Waline 官方分支，原仓库随之归档并不再更新，后续的改进与问题反馈请直接提交到 [walinejs/waline](https://github.com/walinejs/waline)。

:::

::: warning

出于国内 Github 服务访问稳定性与 CSV 读取与存储性能的原因，我们不建议国内用户使用 Github 作为存储库。

:::

## 更多

除了以上数据库存储之外，waline 也能够很方便的扩展其它存储服务。

如果你想帮助 Waline 支持更多的存储服务的话，可以 Fork 项目，继承该 [基类](https://github.com/walinejs/waline/blob/main/packages/server/src/service/storage/base.js) 后分别实现对应存储服务的 `select()`, `add()`, `update()`, `delete()` 方法后提交 PR 即可。
