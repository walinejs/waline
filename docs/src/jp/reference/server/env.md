---
title: サーバー環境変数
icon: config
---

以下の環境変数を使用してWalineサーバーをカスタマイズできます。

::: warning

環境変数を更新した後は、変更を反映させるために必ず**再デプロイ**してください。

Vercelを使用している場合は、`Settings` - `Environment Variables`から設定してください。

:::

<!-- more -->

## 基本

| 環境変数       | 必須 | 説明                                                                                   |
| -------------- | ---- | -------------------------------------------------------------------------------------- |
| `SITE_NAME`    |      | サイト名                                                                               |
| `SITE_URL`     |      | サイトURL                                                                              |
| `LOGIN`        |      | `LOGIN=force`のとき、コメント前にログインが必要になります                             |
| `SERVER_URL`   |      | WalineサーバーのURL。自動生成されたアドレスが正しくない場合に指定します               |

## 表示

| 環境変数                | デフォルト                                                                              | 説明                                                                   |
| ----------------------- | --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `DISABLE_USERAGENT`     |                                                                                         | コメント者のユーザーエージェントを非表示にするかどうか。デフォルトは`false` |
| `DISABLE_REGION`        |                                                                                         | コメント者の地域を非表示にするかどうか。デフォルトは`false`             |
| `DISABLE_AUTHOR_NOTIFY` |                                                                                         | 投稿者への通知を無効にするかどうか                                     |
| `AVATAR_PROXY`          | `https://avatar.75cdn.workers.dev`                                                      | アバタープロキシサービスのURL。`false`に設定すると無効になります        |
| `GRAVATAR_STR`          | <span v-pre>`https://seccdn.libravatar.org/avatar/{{mail\|md5}}`</span>                 | Gravatarのレンダリング文字列。nunjucksテンプレートに基づきます          |
| `LEVELS`                |                                                                                         | コメント数に基づいて各ユーザーにレーティングラベルを付与します         |

::: tip レベルラベル

ユーザーのコメント数に応じて、レーティング条件に基づいてコメント者にレベルラベルが付与されます。この機能はデフォルトで無効になっており、環境変数`LEVELS`を設定することで有効にできます。設定は所定の数値をカンマで連結した形式で行います。例えば`0,10,20,50,100,200`は以下を意味します：

| グレード | 条件               | デフォルトのグレードラベル |
| -------- | ------------------ | -------------------------- |
| 0        | 0 <= count < 10    | Dwarves                    |
| 1        | 10 <= count < 20   | Hobbits                    |
| 2        | 20 <= count < 50   | Ents                       |
| 3        | 50 <= count < 100  | Wizards                    |
| 4        | 100 <= count < 200 | Elves                      |
| 5        | 200 <= count       | Maiar                      |

レベル判定ルールのカスタマイズに加え、レベルラベルもカスタマイズできます。クライアントでは以下のようにテキストを設定します：

```js
Waline.init({
  locale: {
    level0: 'Dwarves',
    level1: 'Hobbits',
    level2: 'Ents',
    level3: 'Wizards',
    level4: 'Elves',
    level5: 'Maiar',
  },
});
```

デフォルトでは6レベル分のラベル文字列のみ提供されていますが、レベルが6つまでしかないわけではありません。実際の最大レベルは設定したレベル判定ルールに基づきます。新しいレベルを追加する場合は、そのレベルに対応するラベルテキストをご自身で設定することをお勧めします。ラベルテキストが指定されていない場合、`Level 10`のようなデフォルトのラベルテキストが表示されます。

:::

## セキュリティ

| 環境変数              | デフォルト     | 説明                                                                                                                              |
| --------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `IPQPS`               | `60`           | IPごとのコメント投稿頻度制限（秒単位）。0に設定すると制限なし                                                                   |
| `SECURE_DOMAINS`      |                | セキュアドメインの設定。カンマ区切りで複数のドメインを指定できます                                                              |
| `AKISMET_KEY`         | `70542d86693e` | Akismetアンチスパムサービスキー。無効にする場合は`false`に設定                                                                   |
| `COMMENT_AUDIT`       | `false`        | コメント審査のスイッチ。有効にすると全てのコメントが管理者の承認を必要とするため、プレースホルダーへのヒント記載を推奨します     |
| `RECAPTCHA_V3_KEY`    |                | reCAPTCHA V3キー。クライアントと合わせて設定してください                                                                         |
| `RECAPTCHA_V3_SECRET` |                | サーバー用reCAPTCHA V3シークレット                                                                                                |
| `TURNSTILE_KEY`       |                | Turnstileキー。クライアントと合わせて設定してください                                                                            |
| `TURNSTILE_SECRET`    |                | サーバー用Turnstileシークレット                                                                                                   |

::: tip RecaptchaとTurnstile

Turnstileのキーとシークレットはこちらからリクエストできます：<https://www.cloudflare.com/products/turnstile/>

Recaptchaのキーとシークレットはこちらからリクエストできます：<https://www.google.com/recaptcha>

セキュリティドメインを設定する際は、サイトのアドレスとWalineサーバーのアドレスを同時に追加する必要があります。

:::

## Markdown

| 環境変数             | デフォルト | 説明                                                                  |
| -------------------- | ---------- | --------------------------------------------------------------------- |
| `MARKDOWN_CONFIG`    | `{}`       | MarkdownItの設定                                                      |
| `MARKDOWN_HIGHLIGHT` | `true`     | シンタックスハイライトを有効にするかどうか                            |
| `MARKDOWN_EMOJI`     | `true`     | 絵文字を有効にするかどうか                                            |
| `MARKDOWN_SUB`       | `true`     | 下付き文字を有効にするかどうか                                        |
| `MARKDOWN_SUP`       | `true`     | 上付き文字を有効にするかどうか                                        |
| `MARKDOWN_TEX`       | `mathjax`  | 数式の解析サービス。`mathjax`、`katex`、`false`をサポートしています   |
| `MARKDOWN_MATHJAX`   | `{}`       | MathJaxのオプション                                                   |
| `MARKDOWN_KATEX`     | `{}`       | KaTeXのオプション                                                     |

## メールサービス

メールサービスは、ユーザー登録およびコメントのメール通知に使用されます。メールサービス関連の変数を設定すると、ユーザー登録時に悪意ある登録を防ぐためのメール確認コードの操作が追加されます。

| 環境変数名       | 備考                         |
| ---------------- | ---------------------------- |
| `SMTP_SERVICE`   | SMTPメールサービスプロバイダー |
| `SMTP_HOST`      | SMTPサーバーアドレス         |
| `SMTP_PORT`      | SMTPサーバーポート           |
| `SMTP_USER`      | SMTPユーザー名               |
| `SMTP_PASS`      | SMTPパスワード               |
| `SMTP_SECURE`    | SSLでSMTP接続するかどうか    |
| `SENDER_NAME`    | 送信者名のカスタマイズ       |
| `SENDER_EMAIL`   | 送信者メールのカスタマイズ |

::: tip

サポートされているサービスプロバイダーは[nodemailer services](https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json)で確認できます。`SMTP_SERVICE`と（`SMTP_HOST`、`SMTP_PORT`）のどちらかを選択して設定できます。リストに対応する`SMTP_SERVICE`が見つからない場合は、メール設定で確認できることが多い`SMTP_HOST`と`SMTP_PORT`を設定する必要があります。

SMTPのユーザー名は通常、ユーザーの完全なメールアドレスをサポートしており、パスワードはメールボックスのパスワードと同じことがほとんどです。

一部のメールボックスでは専用のSMTPパスワードを使用していることに特にご注意ください。

:::

## データベース

### MongoDB

| 環境変数           | 必須 | デフォルト | 説明                                           |
| ------------------ | ---- | ---------- | ---------------------------------------------- |
| `MONGO_DB`         | ✅   |            | MongoDBデータベース名                          |
| `MONGO_USER`       | ✅   |            | MongoDBサーバーのユーザー名                    |
| `MONGO_PASSWORD`   | ✅   |            | MongoDBサーバーのパスワード                    |
| `MONGO_HOST`       |      | 127.0.0.1  | MongoDBサーバーアドレス。配列形式をサポート    |
| `MONGO_PORT`       |      | 27017      | MongoDBサーバーポート。配列形式をサポート      |
| `MONGO_REPLICASET` |      |            | MongoDBレプリカセット                          |
| `MONGO_AUTHSOURCE` |      |            | MongoDB認証ソース                              |
| `MONGO_OPT_SSL`    |      | `false`    | SSL接続を使用するかどうか                      |

### MySQL

| 環境変数         | 必須 | デフォルト | 説明                         |
| ---------------- | ---- | ---------- | ---------------------------- |
| `MYSQL_DB`       | ✅   |            | MySQLデータベース名          |
| `MYSQL_USER`     | ✅   |            | MySQLサーバーのユーザー名    |
| `MYSQL_PASSWORD` | ✅   |            | MySQLサーバーのパスワード    |
| `MYSQL_HOST`     |      | 127.0.0.1  | MySQLサーバーアドレス        |
| `MYSQL_PORT`     |      | 3306       | MySQLサーバーポート          |
| `MYSQL_PREFIX`   |      | `wl_`      | MySQLテーブルのプレフィックス |
| `MYSQL_CHARSET`  |      | `utf8mb4`  | MySQLテーブルの文字セット    |
| `MYSQL_SSL`      |      | `false`    | SSL接続を使用するかどうか    |

### TiDB

[TiDBでデータベースを作成する](../../../jp/guide/deploy/tidb.md)

| 環境変数        | 必須 | デフォルト | 説明                          |
| --------------- | ---- | ---------- | ----------------------------- |
| `TIDB_DB`       | ✅   |            | TiDBデータベース名            |
| `TIDB_USER`     | ✅   |            | TiDBサーバーのユーザー名      |
| `TIDB_PASSWORD` | ✅   |            | TiDBサーバーのパスワード      |
| `TIDB_HOST`     |      | 127.0.0.1  | TiDBサーバーアドレス          |
| `TIDB_PORT`     |      | 4000       | TiDBサーバーポート            |
| `TIDB_PREFIX`   |      | `wl_`      | TiDBテーブルのプレフィックス  |
| `TIDB_CHARSET`  |      | `utf8mb4`  | TiDBテーブルの文字セット      |

### SQLite

| 環境変数        | 必須 | デフォルト | 説明                                                                      |
| --------------- | ---- | ---------- | ------------------------------------------------------------------------- |
| `SQLITE_PATH`   | ✅   |            | SQLiteストレージファイルのパス（ファイル名を除く）                        |
| `JWT_TOKEN`     | ✅   |            | ログイントークン生成用のランダム文字列                                    |
| `SQLITE_DB`     |      | waline     | SQLiteストレージファイル名。ファイル名がwaline以外の場合は変更してください |
| `SQLITE_PREFIX` |      | `wl_`      | SQLiteテーブルのプレフィックス                                            |

### PostgreSQL

| 環境変数             | 必須 | デフォルト | 説明                                    |
| -------------------- | ---- | ---------- | --------------------------------------- |
| `PG_DB`              | ✅   |            | PostgreSQLデータベース名                |
| `PG_USER`            | ✅   |            | PostgreSQLサーバーのユーザー名          |
| `PG_PASSWORD`        | ✅   |            | PostgreSQLサーバーのパスワード          |
| `PG_HOST`            |      | 127.0.0.1  | PostgreSQLサーバーアドレス              |
| `PG_PORT`            |      | 3211       | PostgreSQLサーバーポート                |
| `PG_PREFIX`          |      | `wl_`      | PostgreSQLテーブルのプレフィックス      |
| `PG_SSL`             |      | `false`    | `true`に設定するとSSL接続を使用します   |
| `POSTGRES_DATABASE`  |      |            | `PG_DB`の別名                           |
| `POSTGRES_USER`      |      |            | `PG_USER`の別名                         |
| `POSTGRES_PASSWORD`  |      |            | `PG_PASSWORD`の別名                     |
| `POSTGRES_HOST`      |      | 127.0.0.1  | `PG_HOST`の別名                         |
| `POSTGRES_PORT`      |      | 3211       | `PG_PORT`の別名                         |
| `POSTGRES_PREFIX`    |      | `wl_`      | `PG_PREFIX`の別名                       |
| `POSTGRES_SSL`       |      | `false`    | `PG_SSL`の別名                          |

### GitHub

| 環境変数       | 必須 | デフォルト | 説明                                                                                                           |
| -------------- | ---- | ---------- | -------------------------------------------------------------------------------------------------------------- |
| `GITHUB_TOKEN` | ✅   |            | [個人アクセストークン](https://github.com/settings/tokens)                                                     |
| `GITHUB_REPO`  | ✅   |            | リポジトリ名。例：`walinejs/waline`                                                                            |
| GITHUB_PATH    |      |            | データ保存ディレクトリ。例：`data`は`data`ディレクトリに保存されることを意味します。デフォルトはルートディレクトリ |

## 高度な設定

| 環境変数                        | デフォルト                  | 説明                                                                                                              |
| ------------------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `OAUTH_URL`                     | `https://oauth.lithub.cc`   | OAuthソーシャルログインサービスのURL。[独自の認証サービスを構築する](https://github.com/walinejs/auth)こともできます |
| `WEBHOOK`                       |                             | 新しいコメントがあった際にトリガーされるWebhook URLを設定できます                                                |
| `WALINE_ADMIN_MODULE_ASSET_URL` | `//unpkg.com/@waline/admin` | Waline管理画面のリンク                                                                                            |
| `IP2REGION_DB`                  |                             | カスタムIPv4 IPクエリライブラリのパス（非推奨。代わりに`IP2REGION_DB_V4`を使用してください）                      |
| `IP2REGION_DB_V4`               |                             | カスタムIPv4 IPクエリライブラリのパス。未設定の場合は`IP2REGION_DB`にフォールバックします                         |
| `IP2REGION_DB_V6`               |                             | カスタムIPv6 IPクエリライブラリのパス。IPv6アドレスの位置情報検索を有効にするには設定してください                 |
