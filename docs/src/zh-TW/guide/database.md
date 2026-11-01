---
title: 多資料庫服務支援
icon: database
order: 2
---

Waline 支援多種資料庫，包括 MySQL、PostgreSQL、SQLite 以及 MongoDB。

你只需設定對應資料庫的環境變數，Waline 就會自動依據你設定的環境變數切換到對應的資料儲存服務。

<!-- more -->

## MongoDB

<https://mongodb.com> 官方網站免費提供 512M 的 MongoDB 資料庫支援。以下是使用 MongoDB 儲存需要設定的環境變數。

| 環境變數名稱       | 必填 | 預設值    | 備註                               |
| ------------------ | ---- | --------- | ---------------------------------- |
| `MONGO_DB`         | ✅   |           | MongoDB 資料庫名稱                 |
| `MONGO_USER`       | ✅   |           | MongoDB 服務的使用者名稱           |
| `MONGO_PASSWORD`   | ✅   |           | MongoDB 服務的密碼                 |
| `MONGO_HOST`       |      | 127.0.0.1 | MongoDB 服務的位址，支援陣列格式   |
| `MONGO_PORT`       |      | 27017     | MongoDB 服務的連接埠，支援陣列格式 |
| `MONGO_REPLICASET` |      |           | MongoDB 叢集                       |
| `MONGO_AUTHSOURCE` |      |           | MongoDB 認證來源                   |
| `MONGO_OPT_SSL`    |      | `false`   | 是否使用 SSL 進行連線              |

以下是使用 mongodb.com 官方服務的設定範例，多機時需要將 `MONGO_HOST` 和 `MONO_PORT` 設定成 JSON 格式。

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

使用 MySQL 儲存資料也是很好的選擇。除了使用自建的 MySQL 服務之外，我們可以使用 [PlanetScale](https://planetscale.com)(目前僅支援付費方案)，或者 [FreeDB](https://freedb.tech)，它免費提供了 25M 的資料庫支援。

使用時請先匯入 [waline.sql](https://github.com/walinejs/waline/blob/main/assets/waline.sql) 以完成資料表與其結構的建立，之後在專案中設定下列環境變數。

| 環境變數名稱     | 必填 | 預設值    | 備註                          |
| ---------------- | ---- | --------- | ----------------------------- |
| `MYSQL_HOST`     |      | 127.0.0.1 | MySQL 服務的位址              |
| `MYSQL_PORT`     |      | 3306      | MySQL 服務的連接埠            |
| `MYSQL_DB`       | ✅   |           | MySQL 資料庫名稱              |
| `MYSQL_USER`     | ✅   |           | MySQL 資料庫的使用者名稱      |
| `MYSQL_PASSWORD` | ✅   |           | MySQL 資料庫的密碼            |
| `MYSQL_PREFIX`   |      | `wl_`     | MySQL 資料表的表前綴          |
| `MYSQL_CHARSET`  |      | `utf8mb4` | MySQL 資料表的字元集          |
| `MYSQL_SSL`      |      | `false`   | 是否使用 SSL MYSQL 連線資料庫 |

## TiDB

[TiDB](https://github.com/pingcap/tidb) 是一款開源的 NewSQL 資料庫。[TiDB Cloud](https://tidbcloud.com/) 則是官方提供的線上版本，它提供了 5GB 的免費額度。

使用時請參閱[建立 TiDB 資料庫](../guide/deploy/tidb.md)了解初始化流程。

| 環境變數名稱    | 必填 | 預設值    | 備註                    |
| --------------- | ---- | --------- | ----------------------- |
| `TIDB_DB`       | ✅   |           | TiDB 資料庫名稱         |
| `TIDB_USER`     | ✅   |           | TiDB 資料庫的使用者名稱 |
| `TIDB_PASSWORD` | ✅   |           | TiDB 資料庫的密碼       |
| `TIDB_HOST`     |      | 127.0.0.1 | TiDB 服務的位址         |
| `TIDB_PORT`     |      | 4000      | TiDB 服務的連接埠       |
| `TIDB_PREFIX`   |      | `wl_`     | TiDB 資料表的表前綴     |
| `TIDB_CHARSET`  |      | `utf8mb4` | TiDB 資料表的字元集     |

## SQLite

使用 SQLite 時需要下載 [waline.sqlite](https://github.com/walinejs/waline/blob/main/assets/waline.sqlite) 檔案至合適的位置。之後在專案中設定下列環境變數。

| 環境變數名稱    | 必填 | 預設值 | 備註                                                  |
| --------------- | ---- | ------ | ----------------------------------------------------- |
| `SQLITE_PATH`   | ✅   |        | SQLite 資料庫檔案的路徑，該路徑不包含檔案名稱本身     |
| `JWT_TOKEN`     | ✅   |        | 使用者登入金鑰，隨機字串即可                          |
| `SQLITE_DB`     |      | waline | SQLite 資料庫檔案名稱，若檔案名稱變更需要修改此欄位值 |
| `SQLITE_PREFIX` |      | `wl_`  | SQLite 資料表的表前綴                                 |

## PostgreSQL

[Supabase](https://supabase.com) 和 [Neon](https://neon.tech/home) 均提供了 512M 的資料庫支援，而 [Tembo](https://tembo.io/) 則提供了 10G 的免費空間。如果想要使用 PostgreSQL 的也可以使用它們搭建 Waline。

同 MySQL，使用 PostgreSQL 也需要先匯入 [waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql) 建立好資料表與其結構。之後在專案中設定下列環境變數。

| 環境變數名稱        | 必填 | 預設值    | 備註                                |
| ------------------- | ---- | --------- | ----------------------------------- |
| `PG_DB`             | ✅   |           | PostgreSQL 資料庫名稱               |
| `PG_USER`           | ✅   |           | PostgreSQL 資料庫的使用者名稱       |
| `PG_PASSWORD`       | ✅   |           | PostgreSQL 資料庫的密碼             |
| `PG_HOST`           |      | 127.0.0.1 | PostgreSQL 服務的位址               |
| `PG_PORT`           |      | 5432      | PostgreSQL 服務的連接埠             |
| `PG_PREFIX`         |      | `wl_`     | PostgreSQL 資料表的表前綴           |
| `PG_SSL`            |      | `false`   | 是否使用 SSL 連線 PostgreSQL 資料庫 |
| `POSTGRES_DATABASE` |      |           | 同 `PG_DB`                          |
| `POSTGRES_USER`     |      |           | 同 `PG_USER`                        |
| `POSTGRES_PASSWORD` |      |           | 同 `PG_PASSWORD`                    |
| `POSTGRES_HOST`     |      | 127.0.0.1 | 同 `PG_HOST`                        |
| `POSTGRES_PORT`     |      | 5432      | 同 `PG_PORT`                        |
| `POSTGRES_PREFIX`   |      | `wl_`     | 同 `PG_PREFIX`                      |
| `POSTGRES_SSL`      |      | `false`   | 同 `PG_SSL`                         |

## CloudBase

騰訊雲開發也提供了一定的[免費資料庫](https://console.cloud.tencent.com/tcb/db/)支援，即使不部署在騰訊雲開發上也可以使用。如果部署在騰訊雲開發上，不需要設定任何環境變數，Waline 預設會使用雲開發的資料庫。如果是部署在其它地方，需要設定下列環境變數。

| 環境變數名稱 | 必填 | 預設值 | 備註                                                                     |
| ------------ | ---- | ------ | ------------------------------------------------------------------------ |
| `TCB_ENV`    | ✅   |        | 騰訊雲開發環境 ID                                                        |
| `TCB_ID`     | ✅   |        | 騰訊雲 API 金鑰 ID                                                       |
| `TCB_KEY`    | ✅   |        | 騰訊雲 API 金鑰 Key                                                      |
| `JWT_TOKEN`  |      |        | 使用者登入金鑰，如果沒有設定任何環境變數的話需要設定此變數，隨機字串即可 |

::: tip

對於騰訊雲 API 金鑰 ID 與 Key，可以在[此處](https://console.cloud.tencent.com/cam/capi)申請。

:::

## GitHub

Waline 支援將留言資料以 CSV 檔案的格式儲存在 GitHub 儲存庫中。使用 GitHub 作為資料儲存需要申請 Personal access tokens，可在 <https://github.com/settings/tokens> 這裡點選 <kbd>Generate new token</kbd> 進行申請，下方權限選項中勾選上 **repo** 選項，用於取得儲存庫的讀寫權限。

| 環境變數名稱   | 必填 | 預設值 | 備註                                                                         |
| -------------- | ---- | ------ | ---------------------------------------------------------------------------- |
| `GITHUB_TOKEN` | ✅   |        | [Personal access tokens](https://github.com/settings/tokens)                 |
| `GITHUB_REPO`  | ✅   |        | 儲存庫名稱，例如 `walinejs/waline`                                           |
| `GITHUB_PATH`  |      |        | 資料儲存目錄，例如 `data` 表示儲存在 `data` 目錄下，預設儲存在儲存庫根目錄下 |

::: warning

出於中國大陸存取 GitHub 服務的穩定性與 CSV 讀取、儲存效能的原因，我們不建議中國大陸的使用者使用 GitHub 作為儲存服務。

:::

## 更多

除了以上資料庫儲存之外，Waline 也能夠很方便的擴充其它儲存服務。

如果你想幫助 Waline 支援更多的儲存服務的話，可以 Fork 專案，繼承該[基底類別](https://github.com/walinejs/waline/blob/main/packages/server/src/service/storage/base.js) 後分別實作對應儲存服務的 `select()`, `add()`, `update()`, `delete()` 方法後提交 PR 即可。
