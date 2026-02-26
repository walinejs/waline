---
title: マルチデータベースサービスのサポート
icon: database
order: 2
---

Waline は MySQL、PostgreSQL、SQLite、MongoDB など、さまざまなデータベースをサポートしています。

環境変数を設定するだけで、Waline は設定された環境変数に基づいて対応するデータストレージサービスに自動的に切り替わります。

<!-- more -->

## MongoDB

<https://mongodb.com> は公式で 512M の MongoDB データベースを無料で提供しています。以下は MongoDB データベースを使用するために設定が必要な環境変数です。

| 環境変数           | 必須 | デフォルト | 説明                                               |
| -------------------- | -------- | --------- | -------------------------------------------- |
| `MONGO_DB`           | ✅       |           | MongoDB データベース名                        |
| `MONGO_USER`         | ✅       |           | MongoDB サーバーのユーザー名                      |
| `MONGO_PASSWORD`     | ✅       |           | MongoDB サーバーのパスワード                      |
| `MONGO_HOST`         |          | 127.0.0.1 | MongoDB サーバーのアドレス（配列形式をサポート） |
| `MONGO_PORT`         |          | 27017     | MongoDB サーバーのポート（配列形式をサポート）    |
| `MONGO_REPLICASET`   |          |           | MongoDB レプリカセット                          |
| `MONGO_AUTHSOURCE`   |          |           | MongoDB 認証ソース                          |
| `MONGO_OPT_SSL`      |          | `false`   | SSL 接続を使用する                           |

以下は mongodb.com の設定例です。複数のホストがある場合は、`MONGO_HOST` と `MONGO_PORT` を JSON 形式で設定する必要があることに注意してください。

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

MySQL を使ってデータを保存することも優れた選択肢です。独自の MySQL サービスのほか、25M のデータベースを無料で提供している [FreeDB](https://freedb.tech) や、現在は有料プランのみをサポートしている [PlanetScale](https://planetscale.com) も利用できます。

MySQL をストレージとして使用したい場合は、まず [waline.sql](https://github.com/walinejs/waline/blob/main/assets/waline.sql) をインポートしてテーブルとテーブル構造を作成し、次にプロジェクトでこれらの環境変数を設定する必要があります。

| 環境変数           | 必須 | デフォルト | 説明                |
| -------------------- | -------- | --------- | -------------------------- |
| `MYSQL_DB`           | ✅       |           | MySQL データベース名        |
| `MYSQL_USER`         | ✅       |           | MySQL サーバーのユーザー名      |
| `MYSQL_PASSWORD`     | ✅       |           | MySQL サーバーのパスワード      |
| `MYSQL_HOST`         |          | 127.0.0.1 | MySQL サーバーのアドレス       |
| `MYSQL_PORT`         |          | 3306      | MySQL サーバーのポート          |
| `MYSQL_PREFIX`       |          | `wl_`     | MySQL テーブルプレフィックス         |
| `MYSQL_CHARSET`      |          | `utf8mb4` | MySQL テーブルの文字セット        |
| `MYSQL_SSL`          |          | `false`   | SSL 接続を使用するかどうか |

## TiDB

[TiDB](https://github.com/pingcap/tidb) はオープンソースの NewSQL データベースです。[TiDB Cloud](https://tidbcloud.com/) は公式のオンライン版で、5GB の無料枠を提供しています。

初期化手順については [TiDB データベースの作成](../../jp/guide/deploy/tidb.md) を参照してください。

| 環境変数           | 必須 | デフォルト | 説明                     |
| -------------------- | -------- | --------- | ------------------------------- |
| `TIDB_DB`            | ✅       |           | TiDB データベース名              |
| `TIDB_USER`          | ✅       |           | TiDB データベースのユーザー名         |
| `TIDB_PASSWORD`      | ✅       |           | TiDB データベースのパスワード          |
| `TIDB_HOST`          |          | 127.0.0.1 | TiDB サービスのアドレス         |
| `TIDB_PORT`          |          | 4000      | TiDB サービスのポート            |
| `TIDB_PREFIX`        |          | `wl_`     | TiDB データテーブルのテーブルプレフィックス |
| `TIDB_CHARSET`       |          | `utf8mb4` | TiDB データテーブルの文字セット   |

## SQLite

SQLite を使用したい場合は、[waline.sqlite](https://github.com/walinejs/waline/blob/main/assets/waline.sqlite) をサーバーにダウンロードしてください。その後、プロジェクトでこれらの環境変数を設定します。

| 環境変数           | 必須 | デフォルト | 説明                                                        |
| -------------------- | -------- | ------- | ------------------------------------------------------------------ |
| `SQLITE_PATH`        | ✅       |         | SQLite ストレージファイルのパス（ファイル名は含まない）                    |
| `JWT_TOKEN`          | ✅       |         | ログイントークン生成用のランダム文字列                            |
| `SQLITE_DB`          |          | waline  | SQLite ストレージファイル名（ファイル名が waline でない場合は変更してください） |
| `SQLITE_PREFIX`      |          | `wl_`   | SQLite テーブルプレフィックス                                                |

## PostgreSQL

[Supabase](https://supabase.com) と [Neon](https://neon.tech/home) は 512M の無料データベースを提供しており、[Tembo](https://tembo.io/) は 10G の PG データベースサポートを無料で提供しています。MySQL と同様に、PostgreSQL を使用する前に [waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql) をインポートしてテーブルとテーブル構造を作成する必要があります。

| 環境変数           | 必須 | デフォルト | 説明                         |
| -------------------- | -------- | --------- | ----------------------------------- |
| `PG_DB`              | ✅       |           | PostgreSQL データベース名            |
| `PG_USER`            | ✅       |           | PostgreSQL サーバーのユーザー名          |
| `PG_PASSWORD`        | ✅       |           | PostgreSQL サーバーのパスワード          |
| `PG_HOST`            |          | 127.0.0.1 | PostgreSQL サーバーのアドレス           |
| `PG_PORT`            |          | 3211      | PostgreSQL サーバーのポート              |
| `PG_PREFIX`          |          | `wl_`     | PostgreSQL テーブルプレフィックス             |
| `PG_SSL`             |          | `false`   | SSL 接続を使用するには `true` に設定 |
| `POSTGRES_DATABASE`  |          |           | `PG_DB` のエイリアス                   |
| `POSTGRES_USER`      |          |           | `PG_USER` のエイリアス                 |
| `POSTGRES_PASSWORD`  |          |           | `PG_PASSWORD` のエイリアス             |
| `POSTGRES_HOST`      |          | 127.0.0.1 | `PG_HOST` のエイリアス                 |
| `POSTGRES_PORT`      |          | 3211      | `PG_PORT` のエイリアス                 |
| `POSTGRES_PREFIX`    |          | `wl_`     | `PG_PREFIX` のエイリアス               |
| `POSTGRES_SSL`       |          | `false`   | `POSTGRES_SSL` のエイリアス            |

## GitHub

Waline は GitHub 上の CSV ファイルにコメントデータを保存することをサポートしています。GitHub をデータストレージとして使用するには、Personal access tokens を申請する必要があります。<https://github.com/settings/tokens> で <kbd>Generate new token</kbd> をクリックして申請できます。リポジトリへの読み書き権限を取得するために、パーミッションの **repo** オプションにチェックを入れてください。

| 環境変数           | 必須 | デフォルト | 説明                                                                                                      |
| -------------------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------- |
| `GITHUB_TOKEN`       | ✅       |         | [Personal access tokens](https://github.com/settings/tokens)                                                     |
| `GITHUB_REPO`        | ✅       |         | リポジトリ名（例：`walinejs/waline`）                                                                       |
| GITHUB_PATH          |          |         | データストレージのディレクトリ。例えば `data` と指定すると `data` ディレクトリに保存されます。デフォルトはルートディレクトリ |

::: warning

パフォーマンスの観点から、GitHub の使用は推奨されません。

:::

## カスタム

上記のデータベースストレージ以外にも、他のストレージサービスのサポートを追加することができます。

Waline がさらに多くのストレージサービスをサポートできるようにしたい場合は、プロジェクトをフォークし、[基底クラス](https://github.com/walinejs/waline/blob/main/packages/server/src/service/storage/base.js) を継承した上で、対応するストレージサービスの `select()`、`add()`、`update()`、`delete()` メソッドを実装して PR を送ってください。
