---
title: 複数データベースサービスのサポート
icon: database
order: 2
---

WalineはMySQL、PostgreSQL、SQLite、MongoDBなど、さまざまなデータベースをサポートしています。

環境変数を設定するだけで、Walineは設定した環境変数に応じて対応するデータストレージサービスへ自動的に切り替わります。

<!-- more -->

## MongoDB

MongoDBの公式サイト<https://mongodb.com>では、512MのMongoDBデータベースを無料で提供しています。MongoDBデータベースを使用するために設定が必要な環境変数は以下のとおりです。

| 環境変数           | 必須 | デフォルト | 説明                                          |
| ------------------ | ---- | ---------- | --------------------------------------------- |
| `MONGO_DB`         | ✅   |            | MongoDBのデータベース名                       |
| `MONGO_USER`       | ✅   |            | MongoDBサーバーのユーザー名                   |
| `MONGO_PASSWORD`   | ✅   |            | MongoDBサーバーのパスワード                   |
| `MONGO_HOST`       |      | 127.0.0.1  | MongoDBサーバーのアドレス。配列形式をサポート |
| `MONGO_PORT`       |      | 27017      | MongoDBサーバーのポート。配列形式をサポート   |
| `MONGO_REPLICASET` |      |            | MongoDBのレプリカセット                       |
| `MONGO_AUTHSOURCE` |      |            | MongoDBの認証ソース                           |
| `MONGO_OPT_SSL`    |      | `false`    | SSL接続を使用する                             |

mongodb.com向けの設定例は以下のとおりです。複数のホストがある場合は、`MONGO_HOST`と`MONGO_PORT`をJSON形式で設定する必要がある点に注意してください。

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

MySQLでデータを保存するのも良い選択です。自前のMySQLサービスのほか、25Mのデータベースを無料で提供している[FreeDB](https://freedb.tech)、現在は有料プランのみを提供している[PlanetScale](https://planetscale.com)も利用できます。

MySQLをストレージとして使用する場合は、まず[waline.sql](https://github.com/walinejs/waline/blob/main/assets/waline.sql)をインポートしてテーブルとテーブル構造を作成し、その後プロジェクトで以下の環境変数を設定してください。

| 環境変数         | 必須 | デフォルト | 説明                          |
| ---------------- | ---- | ---------- | ----------------------------- |
| `MYSQL_DB`       | ✅   |            | MySQLのデータベース名         |
| `MYSQL_USER`     | ✅   |            | MySQLサーバーのユーザー名     |
| `MYSQL_PASSWORD` | ✅   |            | MySQLサーバーのパスワード     |
| `MYSQL_HOST`     |      | 127.0.0.1  | MySQLサーバーのアドレス       |
| `MYSQL_PORT`     |      | 3306       | MySQLサーバーのポート         |
| `MYSQL_PREFIX`   |      | `wl_`      | MySQLのテーブルプレフィックス |
| `MYSQL_CHARSET`  |      | `utf8mb4`  | MySQLのテーブル文字コード     |
| `MYSQL_SSL`      |      | `false`    | SSL接続を使用するか           |

## TiDB

[TiDB](https://github.com/pingcap/tidb)はオープンソースのNewSQLデータベースです。[TiDB Cloud](https://tidbcloud.com/)は公式のオンラインバージョンで、誰でも利用できる5GBの無料枠を提供しています。

初期化の手順については[TiDBデータベースの作成](../../jp/guide/deploy/tidb.md)を参照してください。

| 環境変数        | 必須 | デフォルト | 説明                               |
| --------------- | ---- | ---------- | ---------------------------------- |
| `TIDB_DB`       | ✅   |            | TiDBのデータベース名               |
| `TIDB_USER`     | ✅   |            | TiDBのデータベースユーザー名       |
| `TIDB_PASSWORD` | ✅   |            | TiDBのデータベースパスワード       |
| `TIDB_HOST`     |      | 127.0.0.1  | TiDBサービスのアドレス             |
| `TIDB_PORT`     |      | 4000       | TiDBサービスのポート               |
| `TIDB_PREFIX`   |      | `wl_`      | TiDBデータテーブルのプレフィックス |
| `TIDB_CHARSET`  |      | `utf8mb4`  | TiDBデータテーブルの文字セット     |

## SQLite

SQLiteを使用する場合は、[waline.sqlite](https://github.com/walinejs/waline/blob/main/assets/waline.sqlite)をサーバーにダウンロードしてください。その後、プロジェクトで以下の環境変数を設定します。

| 環境変数        | 必須 | デフォルト | 説明                                                                 |
| --------------- | ---- | ---------- | -------------------------------------------------------------------- |
| `SQLITE_PATH`   | ✅   |            | SQLiteのストレージファイルのパス。ファイル名は含めない               |
| `JWT_TOKEN`     | ✅   |            | ログイントークン生成用のランダム文字列                               |
| `SQLITE_DB`     |      | waline     | SQLiteのストレージファイル名。ファイル名がwalineでない場合は変更する |
| `SQLITE_PREFIX` |      | `wl_`      | SQLiteのテーブルプレフィックス                                       |

## PostgreSQL

[Supabase](https://supabase.com)と[Neon](https://neon.tech/home)は512Mのデータベースを無料で提供しており、[Tembo](https://tembo.io/)は10GのPGデータベースのサポートを無料で提供しています。MySQLと同様に、PostgreSQLを使用する前に[waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql)をインポートしてテーブルとテーブル構造を作成する必要があります。

| 環境変数            | 必須 | デフォルト | 説明                                |
| ------------------- | ---- | ---------- | ----------------------------------- |
| `PG_DB`             | ✅   |            | PostgreSQLのデータベース名          |
| `PG_USER`           | ✅   |            | PostgreSQLサーバーのユーザー名      |
| `PG_PASSWORD`       | ✅   |            | PostgreSQLサーバーのパスワード      |
| `PG_HOST`           |      | 127.0.0.1  | PostgreSQLサーバーのアドレス        |
| `PG_PORT`           |      | 5432       | PostgreSQLサーバーのポート          |
| `PG_PREFIX`         |      | `wl_`      | PostgreSQLのテーブルプレフィックス  |
| `PG_SSL`            |      | `false`    | SSL接続を使用する場合は`true`に設定 |
| `POSTGRES_DATABASE` |      |            | `PG_DB`のエイリアス                 |
| `POSTGRES_USER`     |      |            | `PG_USER`のエイリアス               |
| `POSTGRES_PASSWORD` |      |            | `PG_PASSWORD`のエイリアス           |
| `POSTGRES_HOST`     |      | 127.0.0.1  | `PG_HOST`のエイリアス               |
| `POSTGRES_PORT`     |      | 5432       | `PG_PORT`のエイリアス               |
| `POSTGRES_PREFIX`   |      | `wl_`      | `PG_PREFIX`のエイリアス             |
| `POSTGRES_SSL`      |      | `false`    | `PG_SSL`のエイリアス                |

## GitHub

WalineはコメントデータをGitHub上のCSVファイルに保存できます。GitHubをデータストレージとして使用するには、パーソナルアクセストークンを申請する必要があります。<https://github.com/settings/tokens>で<kbd>Generate new token</kbd>をクリックして申請できます。権限で**repo**オプションにチェックを入れ、リポジトリの読み取りと書き込みの権限を取得してください。

| 環境変数       | 必須 | デフォルト | 説明                                                                                                           |
| -------------- | ---- | ---------- | -------------------------------------------------------------------------------------------------------------- |
| `GITHUB_TOKEN` | ✅   |            | [パーソナルアクセストークン](https://github.com/settings/tokens)                                               |
| `GITHUB_REPO`  | ✅   |            | リポジトリ名。例：`walinejs/waline`                                                                            |
| GITHUB_PATH    |      |            | データ保存ディレクトリ。`data`を指定すると`data`ディレクトリに保存され、デフォルトではルートディレクトリになる |

::: warning

パフォーマンス上の理由から、GitHubの使用は推奨しません。

:::

## カスタム

上記のデータベースストレージ以外にも、他のストレージサービスへの対応を追加できます。

Walineでより多くのストレージサービスをサポートしたい場合は、プロジェクトをフォークして[基底クラス](https://github.com/walinejs/waline/blob/main/packages/server/src/service/storage/base.js)を継承し、対応するストレージサービスの`select()`、`add()`、`update()`、`delete()`メソッドを実装してPRを送ってください。
