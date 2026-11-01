---
title: サーバー環境変数
icon: config
---

Waline サーバーは、次の環境変数でカスタマイズできます。

::: warning

環境変数を更新した後は、変更を有効にするために必ず **再デプロイ** してください。

Vercel を使用している場合は、`Settings` - `Environment Variables` から設定してください。

:::

<!-- more -->

## 基本

| 環境変数     | 必須 | 説明                                                                      |
| ------------ | ---- | ------------------------------------------------------------------------- |
| `SITE_NAME`  |      | サイト名                                                                  |
| `SITE_URL`   |      | サイトの URL                                                              |
| `LOGIN`      |      | `LOGIN=force` の場合、ユーザーはコメントする前にログインが必要です        |
| `SERVER_URL` |      | Waline サーバーの URL。自動生成されたアドレスが正しくない場合に使用します |

## 表示

| 環境変数                | デフォルト                                                              | 説明                                                                                     |
| ----------------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `DISABLE_USERAGENT`     |                                                                         | コメントしたユーザーのユーザーエージェントを非表示にするかどうか。デフォルト値は `false` |
| `DISABLE_REGION`        |                                                                         | コメントしたユーザーの地域を非表示にするかどうか。デフォルト値は `false`                 |
| `DISABLE_AUTHOR_NOTIFY` |                                                                         | 著者への通知を無効にするかどうか                                                         |
| `AVATAR_PROXY`          | `''`                                                                    | アバターのプロキシサービス URL。空のままにすると無効になります                           |
| `GRAVATAR_STR`          | <span v-pre>`https://seccdn.libravatar.org/avatar/{{mail\|md5}}`</span> | Gravatar のレンダリング文字列。nunjucks テンプレートに基づきます                         |
| `LEVELS`                |                                                                         | コメント数に基づいて各ユーザーに評価ラベルを付与します                                   |

::: tip レベルラベル

ユーザーのコメント数に応じて、評価条件に基づいてコメントしたユーザーにレベルラベルが付与されます。この機能はデフォルトでは無効で、環境変数 `LEVELS` を設定すると有効になります。設定は指定した数値をカンマで連結した形式で、たとえば `0,10,20,50,100,200` は次のようになります：

| グレード | 条件               | デフォルトのグレードラベル |
| -------- | ------------------ | -------------------------- |
| 0        | 0 <= count < 10    | Dwarves                    |
| 1        | 10 <= count < 20   | Hobbits                    |
| 2        | 20 <= count < 50   | Ents                       |
| 3        | 50 <= count < 100  | Wizards                    |
| 4        | 100 <= count < 200 | Elves                      |
| 5        | 200 <= count       | Maiar                      |

レベル判定ルールをカスタマイズできるほか、レベルラベルもカスタマイズできます。クライアントで次のようにテキストを設定します：

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

デフォルトでは 6 レベル分の文言のみが提供されていますが、レベルが 6 段階までしか設定できないわけではありません。実際のレベルの上限は、設定したレベル判定ルールによって決まります。新しいレベルを追加する場合は、そのレベルに対応するラベルテキストを自分で設定することをおすすめします。ラベルテキストを指定しない場合は、`Level 10` のようなデフォルトのラベルテキストが表示されます。

:::

## セキュリティ

| 環境変数              | デフォルト     | 説明                                                                                                                                       |
| --------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `IPQPS`               | `60`           | IP ベースのコメント投稿頻度の制限（秒単位）。0 に設定すると制限なし                                                                        |
| `SECURE_DOMAINS`      |                | セキュアドメインの設定。複数のドメインをカンマ区切りで指定できます                                                                         |
| `AKISMET_KEY`         | `70542d86693e` | Akismet アンチスパムサービスのキー。無効にする場合は `false` を設定します                                                                  |
| `COMMENT_AUDIT`       | `false`        | コメント承認の切り替え。有効にするとすべてのコメントが管理者の承認を必要とするため、プレースホルダーにその旨を表示することをおすすめします |
| `RECAPTCHA_V3_KEY`    |                | reCAPTCHA V3 のキー。クライアントと合わせて設定する必要があります                                                                          |
| `RECAPTCHA_V3_SECRET` |                | サーバー用の reCAPTCHA V3 シークレット                                                                                                     |
| `TURNSTILE_KEY`       |                | Turnstile のキー。クライアントと合わせて設定する必要があります                                                                             |
| `TURNSTILE_SECRET`    |                | サーバー用の Turnstile シークレット                                                                                                        |

::: tip Recaptcha と Turnstile

Turnstile のキーとシークレットは <https://www.cloudflare.com/products/turnstile/> で取得できます。

Recaptcha のキーとシークレットは <https://www.google.com/recaptcha> で取得できます。

セキュアドメインを設定する際は、サイトのアドレスと Waline サーバーのアドレスを同時に追加する必要があります。

:::

## Markdown

| 環境変数             | デフォルト | 説明                                                                 |
| -------------------- | ---------- | -------------------------------------------------------------------- |
| `MARKDOWN_CONFIG`    | `{}`       | MarkdownIt の設定                                                    |
| `MARKDOWN_HIGHLIGHT` | `true`     | ハイライトを有効にするかどうか                                       |
| `MARKDOWN_EMOJI`     | `true`     | 絵文字を有効にするかどうか                                           |
| `MARKDOWN_SUB`       | `true`     | 下付き文字を有効にするかどうか                                       |
| `MARKDOWN_SUP`       | `true`     | 上付き文字を有効にするかどうか                                       |
| `MARKDOWN_TEX`       | `mathjax`  | 数式を解析するサービス。`mathjax`、`katex`、`false` をサポートします |
| `MARKDOWN_MATHJAX`   | `{}`       | MathJax のオプション                                                 |
| `MARKDOWN_KATEX`     | `{}`       | KaTeX のオプション                                                   |

## メールサービス

メールサービスは、ユーザー登録とコメントのメール通知に使用されます。メールサービスに関連する変数を設定すると、ユーザー登録時にメール認証コードの確認に関する操作が追加され、悪意のある登録を防止できます。

| 環境変数名     | 備考                                     |
| -------------- | ---------------------------------------- |
| `SMTP_SERVICE` | SMTP メールサービスプロバイダー          |
| `SMTP_HOST`    | SMTP サーバーのアドレス                  |
| `SMTP_PORT`    | SMTP サーバーのポート                    |
| `SMTP_USER`    | SMTP のユーザー名                        |
| `SMTP_PASS`    | SMTP のパスワード                        |
| `SMTP_SECURE`  | SMTP を SSL で接続する                   |
| `SENDER_NAME`  | 送信者名をカスタマイズする               |
| `SENDER_EMAIL` | 送信者のメールアドレスをカスタマイズする |

::: tip

対応しているサービスプロバイダーは [nodemailer services](https://github.com/nodemailer/nodemailer/blob/master/src/well-known/services.json) で確認できます。`SMTP_SERVICE` と（`SMTP_HOST`、`SMTP_PORT`）のいずれかを設定できます。リストに該当する `SMTP_SERVICE` がない場合は、`SMTP_HOST` と `SMTP_PORT` を設定する必要があります。これらは多くの場合、メールボックスの設定で確認できます。

SMTP のユーザー名は通常、ユーザーの完全なメールアドレスをサポートしており、パスワードはメールボックスのパスワードと同じであることがほとんどです。

一部のメールボックスでは SMTP 専用のパスワードが使われている場合があるため、特に注意してください。

:::

## データベース

### MongoDB

| 環境変数           | 必須 | デフォルト | 説明                                     |
| ------------------ | ---- | ---------- | ---------------------------------------- |
| `MONGO_DB`         | ✅   |            | MongoDB のデータベース名                 |
| `MONGO_USER`       | ✅   |            | MongoDB サーバーのユーザー名             |
| `MONGO_PASSWORD`   | ✅   |            | MongoDB サーバーのパスワード             |
| `MONGO_HOST`       |      | 127.0.0.1  | MongoDB サーバーのアドレス。配列形式も可 |
| `MONGO_PORT`       |      | 27017      | MongoDB サーバーのポート。配列形式も可   |
| `MONGO_REPLICASET` |      |            | MongoDB のレプリカセット                 |
| `MONGO_AUTHSOURCE` |      |            | MongoDB の認証ソース                     |
| `MONGO_OPT_SSL`    |      | `false`    | SSL 接続を使用する                       |

### MySQL

| 環境変数         | 必須 | デフォルト | 説明                           |
| ---------------- | ---- | ---------- | ------------------------------ |
| `MYSQL_DB`       | ✅   |            | MySQL のデータベース名         |
| `MYSQL_USER`     | ✅   |            | MySQL サーバーのユーザー名     |
| `MYSQL_PASSWORD` | ✅   |            | MySQL サーバーのパスワード     |
| `MYSQL_HOST`     |      | 127.0.0.1  | MySQL サーバーのアドレス       |
| `MYSQL_PORT`     |      | 3306       | MySQL サーバーのポート         |
| `MYSQL_PREFIX`   |      | `wl_`      | MySQL のテーブルプレフィックス |
| `MYSQL_CHARSET`  |      | `utf8mb4`  | MySQL のテーブル文字セット     |
| `MYSQL_SSL`      |      | `false`    | SSL 接続を使用するかどうか     |

### TiDB

[TiDB でデータベースを作成する](../../../jp/guide/deploy/tidb.md)

| 環境変数        | 必須 | デフォルト | 説明                          |
| --------------- | ---- | ---------- | ----------------------------- |
| `TIDB_DB`       | ✅   |            | TiDB のデータベース名         |
| `TIDB_USER`     | ✅   |            | TiDB サーバーのユーザー名     |
| `TIDB_PASSWORD` | ✅   |            | TiDB サーバーのパスワード     |
| `TIDB_HOST`     |      | 127.0.0.1  | TiDB サーバーのアドレス       |
| `TIDB_PORT`     |      | 4000       | TiDB サーバーのポート         |
| `TIDB_PREFIX`   |      | `wl_`      | TiDB のテーブルプレフィックス |
| `TIDB_CHARSET`  |      | `utf8mb4`  | TiDB のテーブル文字セット     |

### SQLite

| 環境変数        | 必須 | デフォルト | 説明                                                                            |
| --------------- | ---- | ---------- | ------------------------------------------------------------------------------- |
| `SQLITE_PATH`   | ✅   |            | SQLite のストレージファイルのパス。ファイル名は含めません                       |
| `JWT_TOKEN`     | ✅   |            | ログイントークン生成用のランダム文字列                                          |
| `SQLITE_DB`     |      | waline     | SQLite のストレージファイル名。ファイル名が waline でない場合は変更してください |
| `SQLITE_PREFIX` |      | `wl_`      | SQLite のテーブルプレフィックス                                                 |

### PostgreSQL

| 環境変数            | 必須 | デフォルト | 説明                                     |
| ------------------- | ---- | ---------- | ---------------------------------------- |
| `PG_DB`             | ✅   |            | PostgreSQL のデータベース名              |
| `PG_USER`           | ✅   |            | PostgreSQL サーバーのユーザー名          |
| `PG_PASSWORD`       | ✅   |            | PostgreSQL サーバーのパスワード          |
| `PG_HOST`           |      | 127.0.0.1  | PostgreSQL サーバーのアドレス            |
| `PG_PORT`           |      | 5432       | PostgreSQL サーバーのポート              |
| `PG_PREFIX`         |      | `wl_`      | PostgreSQL のテーブルプレフィックス      |
| `PG_SSL`            |      | `false`    | `true` に設定すると SSL 接続を使用します |
| `POSTGRES_DATABASE` |      |            | `PG_DB` のエイリアス                     |
| `POSTGRES_USER`     |      |            | `PG_USER` のエイリアス                   |
| `POSTGRES_PASSWORD` |      |            | `PG_PASSWORD` のエイリアス               |
| `POSTGRES_HOST`     |      | 127.0.0.1  | `PG_HOST` のエイリアス                   |
| `POSTGRES_PORT`     |      | 5432       | `PG_PORT` のエイリアス                   |
| `POSTGRES_PREFIX`   |      | `wl_`      | `PG_PREFIX` のエイリアス                 |
| `POSTGRES_SSL`      |      | `false`    | `PG_SSL` のエイリアス                    |

### GitHub

| 環境変数       | 必須 | デフォルト | 説明                                                                                                            |
| -------------- | ---- | ---------- | --------------------------------------------------------------------------------------------------------------- |
| `GITHUB_TOKEN` | ✅   |            | [Personal access tokens](https://github.com/settings/tokens)                                                    |
| `GITHUB_REPO`  | ✅   |            | リポジトリ名（例：`walinejs/waline`）                                                                           |
| GITHUB_PATH    |      |            | データの保存ディレクトリ。`data` を指定すると `data` ディレクトリに保存され、デフォルトはルートディレクトリです |

## 詳細設定

| 環境変数                        | デフォルト                  | 説明                                                                                                                     |
| ------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `OAUTH_URL`                     | `https://oauth.lithub.cc`   | OAuth ソーシャルログインサービスの URL。[独自の認証サービスを構築する](https://github.com/walinejs/auth)こともできます。 |
| `WEBHOOK`                       |                             | 新しいコメントがあるときに実行される Webhook URL を設定できます。                                                        |
| `WALINE_ADMIN_MODULE_ASSET_URL` | `//unpkg.com/@waline/admin` | Waline 管理画面へのリンク                                                                                                |
| `IP2REGION_DB`                  |                             | カスタム IPv4 IP クエリライブラリのパス（非推奨。代わりに `IP2REGION_DB_V4` を使用してください）                         |
| `IP2REGION_DB_V4`               |                             | カスタム IPv4 IP クエリライブラリのパス。設定されていない場合は `IP2REGION_DB` にフォールバックします                    |
| `IP2REGION_DB_V6`               |                             | カスタム IPv6 IP クエリライブラリのパス。設定すると IPv6 アドレスの位置情報検索が有効になります                          |
