---
title: 伺服器環境變數
icon: config
---

你可以透過下列環境變數對 Waline 伺服器進行設定。

::: warning

環境變數更新後必須**重新部署**才能生效。

Vercel 需要在 <kbd>Settings</kbd> - <kbd>Environment Variables</kbd> 中進行設定。

:::

<!-- more -->

## 主要設定

| 環境變數名稱 | 必填 | 備註                                                        |
| ------------ | ---- | ----------------------------------------------------------- |
| `SITE_NAME`  |      | 部落格名稱                                                  |
| `SITE_URL`   |      | 部落格位址                                                  |
| `LOGIN`      |      | 當設為 LOGIN=force 時會要求登入才能留言                     |
| `SERVER_URL` |      | 設定 Waline Server 的位址，適合在自動產生的位址不正確時填寫 |

## 顯示

| 環境變數名稱            | 預設值                                                                  | 備註                                       |
| ----------------------- | ----------------------------------------------------------------------- | ------------------------------------------ |
| `DISABLE_USERAGENT`     | `false`                                                                 | 是否隱藏留言者的 UA，預設為否              |
| `DISABLE_REGION`        | `false`                                                                 | 是否隱藏留言者的歸屬地                     |
| `DISABLE_AUTHOR_NOTIFY` | `false`                                                                 | 是否禁止新留言通知                         |
| `AVATAR_PROXY`          | `''`                                                                    | 頭像的代理位址，留空則不代理               |
| `GRAVATAR_STR`          | <span v-pre>`https://seccdn.libravatar.org/avatar/{{mail\|md5}}`</span> | Gravatar 頭像的位址，基於 nunjucks 語法    |
| `LEVELS`                |                                                                         | 設定後會根據留言數為每個使用者提供等級標籤 |

::: tip 等級標籤

根據設定的等級條件以及使用者的留言數，會為留言者增加等級標籤。該功能預設關閉，可以透過設定環境變數 `LEVELS` 開啟該功能。設定的形式為一串指定數字的逗號串接，例如 `0,10,20,50,100,200` 表示的就是：

| 等級 | 條件               | 預設等級標籤 |
| ---- | ------------------ | ------------ |
| 0    | 0 <= count < 10    | 潛水         |
| 1    | 10 <= count < 20   | 冒泡         |
| 2    | 20 <= count < 50   | 吐槽         |
| 3    | 50 <= count < 100  | 活躍         |
| 4    | 100 <= count < 200 | 話癆         |
| 5    | 200 <= count       | 傳說         |

除了可以自訂等級判斷規則之外，我們還可以在客戶端自訂等級標籤，詳見 [等級標籤](../../guide/features/i18n.md#自訂語言)。

預設只提供了 6 級文案，但並不表示只能有 6 個等級。具體的等級上限是根據你設定的等級判斷規則而來的。增加新的等級建議自行設定對應的文案，若未提供文案，預設顯示的會是 `Level 10` 這樣的預設文案。

:::

## 安全

| 環境變數名稱          | 預設值         | 備註                                                                                     |
| --------------------- | -------------- | ---------------------------------------------------------------------------------------- |
| `IPQPS`               | `60`           | 基於 IP 的留言發表頻率限制，單位為秒。設為 0 則不限制                                    |
| `SECURE_DOMAINS`      |                | 安全網域設定，支援以逗號分隔設定多個網域                                                 |
| `AKISMET_KEY`         | `70542d86693e` | Akismet 反垃圾留言服務 Key（預設開啟，不用請設為 false）                                 |
| `COMMENT_AUDIT`       | `false`        | 留言發表審核開關。開啟後留言需經管理員審核後才能顯示，因此建議在留言框預設文字上提供提示 |
| `RECAPTCHA_V3_KEY`    |                | reCAPTCHA V3 key，須與客戶端同時設定                                                     |
| `RECAPTCHA_V3_SECRET` |                | reCAPTCHA V3 secret，供伺服器使用，不可洩漏                                              |
| `TURNSTILE_KEY`       |                | Turnstile key，須與客戶端同時設定                                                        |
| `TURNSTILE_SECRET`    |                | Turnstile secret，供伺服器使用，不可洩漏                                                 |

::: tip Recaptcha 和 Turnstile

Turnstile Key 和 Secret 可在 <https://www.cloudflare.com/zh-cn/products/turnstile/> 申請。

Recaptcha Key 和 Secret 可在 <https://www.google.com/recaptcha> 申請。

設定時安全網域需要同時加入網站位址和 Waline 伺服器位址（不包含傳輸協定，即 `http://` 或 `https://`）。

:::

## Markdown

| 環境變數名稱         | 預設值    | 備註                                              |
| -------------------- | --------- | ------------------------------------------------- |
| `MARKDOWN_CONFIG`    | `{}`      | MarkdownIt 設定                                   |
| `MARKDOWN_HIGHLIGHT` | `true`    | 是否啟用高亮                                      |
| `MARKDOWN_EMOJI`     | `true`    | 是否啟用 Emoji 縮寫支援                           |
| `MARKDOWN_SUB`       | `true`    | 是否啟用下標支援                                  |
| `MARKDOWN_SUP`       | `true`    | 是否啟用上標支援                                  |
| `MARKDOWN_TEX`       | `mathjax` | 解析 TeX 的服務，支援 `mathjax`、`katex`、`false` |
| `MARKDOWN_MATHJAX`   | `{}`      | MathJax 選項                                      |
| `MARKDOWN_KATEX`     | `{}`      | KaTeX 選項                                        |

## 郵件

使用者註冊和留言的郵件通知都會用到郵件服務。設定郵件服務相關變數後，使用者註冊會增加電子郵件驗證碼確認相關的操作，用來防止惡意的註冊。

| 環境變數名稱   | 備註                         |
| -------------- | ---------------------------- |
| `SMTP_SERVICE` | SMTP 郵件傳送服務供應商      |
| `SMTP_HOST`    | SMTP 伺服器位址              |
| `SMTP_PORT`    | SMTP 伺服器連接埠。          |
| `SMTP_USER`    | SMTP 使用者名稱              |
| `SMTP_PASS`    | SMTP 密碼                    |
| `SMTP_SECURE`  | 是否使用 SSL 連線 SMTP       |
| `SENDER_NAME`  | 自訂寄送郵件的寄件者         |
| `SENDER_EMAIL` | 自訂寄送郵件的寄件位址       |
| `AUTHOR_EMAIL` | 站長電子郵件，接收新留言通知 |

::: tip

可以在 [這裡](https://github.com/nodemailer/nodemailer/blob/master/src/well-known/services.json) 查看支援的服務供應商。`SMTP_SERVICE` 和（`SMTP_HOST`、`SMTP_PORT`）任選其一即可，如果清單中沒有對應的 `SMTP_SERVICE`，則需要設定 `SMTP_HOST` 和 `SMTP_PORT`，它們一般可以在電子郵件的設定中找到。

SMTP 的使用者名稱通常均支援使用者的完整電子郵件，而密碼大多與電子郵件密碼相同。

請特別注意部分電子郵件（如 163、qq 電子郵件）使用獨立的 SMTP 密碼。

:::

以下是選填的環境變數：

| 環境變數名稱          | 備註                   |
| --------------------- | ---------------------- |
| `MAIL_SUBJECT`        | 自訂留言回覆郵件標題   |
| `MAIL_TEMPLATE`       | 自訂留言回覆郵件內容   |
| `MAIL_SUBJECT_ADMIN`  | 自訂新留言通知郵件標題 |
| `MAIL_TEMPLATE_ADMIN` | 自訂新留言通知郵件內容 |

## 資料庫

### MongoDB

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

### MySQL

| 環境變數名稱     | 必填 | 預設值    | 備註                          |
| ---------------- | ---- | --------- | ----------------------------- |
| `MYSQL_DB`       | ✅   |           | MySQL 資料庫名稱              |
| `MYSQL_USER`     | ✅   |           | MySQL 資料庫的使用者名稱      |
| `MYSQL_PASSWORD` | ✅   |           | MySQL 資料庫的密碼            |
| `MYSQL_HOST`     |      | 127.0.0.1 | MySQL 服務的位址              |
| `MYSQL_PORT`     |      | 3306      | MySQL 服務的連接埠            |
| `MYSQL_PREFIX`   |      | `wl_`     | MySQL 資料表的前綴            |
| `MYSQL_CHARSET`  |      | `utf8mb4` | MySQL 資料表的字元集          |
| `MYSQL_SSL`      |      | `false`   | 是否使用 SSL MYSQL 連線資料庫 |

### TiDB

[在 TiDB 上建立資料庫](../../guide/deploy/tidb.md)

| 環境變數名稱    | 必填 | 預設值    | 備註                    |
| --------------- | ---- | --------- | ----------------------- |
| `TIDB_DB`       | ✅   |           | TiDB 資料庫名稱         |
| `TIDB_USER`     | ✅   |           | TiDB 資料庫的使用者名稱 |
| `TIDB_PASSWORD` | ✅   |           | TiDB 資料庫的密碼       |
| `TIDB_HOST`     |      | 127.0.0.1 | TiDB 服務的位址         |
| `TIDB_PORT`     |      | 4000      | TiDB 服務的連接埠       |
| `TIDB_PREFIX`   |      | `wl_`     | TiDB 資料表的前綴       |
| `TIDB_CHARSET`  |      | `utf8mb4` | TiDB 資料表的字元集     |

### SQLite

| 環境變數名稱    | 必填 | 預設值 | 備註                                          |
| --------------- | ---- | ------ | --------------------------------------------- |
| `SQLITE_PATH`   | ✅   |        | SQLite 資料庫檔案的路徑，該路徑不包含檔名本身 |
| `JWT_TOKEN`     | ✅   |        | 使用者登入金鑰，隨機字串即可                  |
| `SQLITE_DB`     |      | waline | SQLite 資料庫檔名，若檔名變化需要修改該欄位值 |
| `SQLITE_PREFIX` |      | `wl_`  | SQLite 資料表的前綴                           |

### PostgreSQL

| 環境變數名稱        | 必填 | 預設值    | 備註                                |
| ------------------- | ---- | --------- | ----------------------------------- |
| `PG_DB`             | ✅   |           | PostgreSQL 資料庫名稱               |
| `PG_USER`           | ✅   |           | PostgreSQL 資料庫的使用者名稱       |
| `PG_PASSWORD`       | ✅   |           | PostgreSQL 資料庫的密碼             |
| `PG_HOST`           |      | 127.0.0.1 | PostgreSQL 服務的位址               |
| `PG_PORT`           |      | 5432      | PostgreSQL 服務的連接埠             |
| `PG_PREFIX`         |      | `wl_`     | PostgreSQL 資料表的前綴             |
| `PG_SSL`            |      | `false`   | 是否使用 SSL 連線 PostgreSQL 資料庫 |
| `POSTGRES_DATABASE` |      |           | 同 `PG_DB`                          |
| `POSTGRES_USER`     |      |           | 同 `PG_USER`                        |
| `POSTGRES_PASSWORD` |      |           | 同 `PG_PASSWORD`                    |
| `POSTGRES_HOST`     |      | 127.0.0.1 | 同 `PG_HOST`                        |
| `POSTGRES_PORT`     |      | 5432      | 同 `PG_PORT`                        |
| `POSTGRES_PREFIX`   |      | `wl_`     | 同 `PG_PREFIX`                      |
| `POSTGRES_SSL`      |      | `false`   | 同 `PG_SSL`                         |

### CloudBase

| 環境變數名稱 | 必填 | 預設值 | 備註                                                                   |
| ------------ | ---- | ------ | ---------------------------------------------------------------------- |
| `TCB_ENV`    | ✅   |        | 騰訊雲開發環境 ID                                                      |
| `TCB_ID`     | ✅   |        | 騰訊雲 API 金鑰 ID                                                     |
| `TCB_KEY`    | ✅   |        | 騰訊雲 API 金鑰 Key                                                    |
| `JWT_TOKEN`  |      |        | 使用者登入金鑰，如果沒有設定任何環境變數則需要設定此變數，隨機字串即可 |

::: tip

對於騰訊雲 API 金鑰 ID 與 Key，可以在 [此處](https://console.cloud.tencent.com/cam/capi) 申請。

:::

### GitHub

| 環境變數名稱   | 必填 | 預設值 | 備註                                                                         |
| -------------- | ---- | ------ | ---------------------------------------------------------------------------- |
| `GITHUB_TOKEN` | ✅   |        | [Personal access tokens](https://github.com/settings/tokens)                 |
| `GITHUB_REPO`  | ✅   |        | 儲存庫名稱，例如 `walinejs/waline`                                           |
| `GITHUB_PATH`  |      |        | 資料儲存目錄，例如 `data` 表示儲存在 `data` 目錄下，預設存在於儲存庫根目錄下 |

## 進階設定

| 環境變數名稱                    | 預設值                      | 備註                                                                                                                                                                   |
| ------------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OAUTH_URL`                     | `https://oauth.lithub.cc`   | OAuth 第三方登入服務位址，可以 [自建 auth](https://github.com/walinejs/auth)，這是能讓使用者使用 GitHub、Twitter、Facebook、Google、微博等第三方帳號登入最簡單的方式。 |
| `WEBHOOK`                       |                             | 留言成功後會向 WEBHOOK 設定的位址傳送一筆 POST 請求                                                                                                                    |
| `WALINE_ADMIN_MODULE_ASSET_URL` | `//unpkg.com/@waline/admin` | Waline admin 位址                                                                                                                                                      |
| `IP2REGION_DB`                  |                             | 自訂 IPv4 IP 查詢資料庫路徑（已廢棄，建議使用 `IP2REGION_DB_V4`）                                                                                                      |
| `IP2REGION_DB_V4`               |                             | 自訂 IPv4 IP 查詢資料庫路徑。若未設定，將回退到 `IP2REGION_DB`                                                                                                         |
| `IP2REGION_DB_V6`               |                             | 自訂 IPv6 IP 查詢資料庫路徑。設定後可啟用 IPv6 位址的歸屬地查詢                                                                                                        |
