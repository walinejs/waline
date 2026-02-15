---
title: 서버 환경 변수
icon: config
---

다음 환경 변수를 통해 Waline 서버를 사용자 정의할 수 있습니다.

::: warning

환경 변수를 업데이트한 후 변경 사항을 적용하려면 반드시 **재배포**해야 합니다.

Vercel을 사용하는 경우 `Settings` - `Environment Variables`에서 설정해야 합니다.

:::

<!-- more -->

## 기본

| 환경 변수    | 필수 | 설명                                                              |
| ------------ | ---- | ----------------------------------------------------------------- |
| `SITE_NAME`  |      | 사이트 이름                                                       |
| `SITE_URL`   |      | 사이트 URL                                                        |
| `LOGIN`      |      | `LOGIN=force`로 설정하면 댓글 작성 전 로그인이 필요합니다         |
| `SERVER_URL` |      | Waline 서버의 URL, 자동 생성된 주소가 올바르지 않을 때 유용합니다 |

## 표시

| 환경 변수               | 기본값                                                                  | 설명                                                              |
| ----------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `DISABLE_USERAGENT`     |                                                                         | 댓글 작성자의 유저 에이전트를 숨길지 여부. 기본값은 `false`입니다 |
| `DISABLE_REGION`        |                                                                         | 댓글 작성자의 지역을 숨길지 여부. 기본값은 `false`입니다          |
| `DISABLE_AUTHOR_NOTIFY` |                                                                         | 작성자 알림을 비활성화할지 여부                                   |
| `AVATAR_PROXY`          | `https://avatar.75cdn.workers.dev`                                      | 아바타 프록시 서비스 URL. `false`로 설정하면 비활성화됩니다       |
| `GRAVATAR_STR`          | <span v-pre>`https://seccdn.libravatar.org/avatar/{{mail\|md5}}`</span> | Gravatar 렌더링 문자열, nunjucks 템플릿 기반                      |
| `LEVELS`                |                                                                         | 댓글 수에 따라 각 사용자에게 등급 라벨을 부여합니다               |

::: tip 등급 라벨

사용자의 댓글 수에 따라 등급 조건을 기반으로 댓글 작성자에게 등급 라벨이 추가됩니다. 이 기능은 기본적으로 비활성화되어 있으며 환경 변수 `LEVELS`를 설정하여 활성화할 수 있습니다. 구성은 주어진 숫자의 쉼표 연결 형식으로, 예를 들어 `0,10,20,50,100,200`은 다음을 의미합니다:

| 등급 | 조건               | 기본 등급 라벨 |
| ---- | ------------------ | -------------- |
| 0    | 0 <= count < 10    | Dwarves        |
| 1    | 10 <= count < 20   | Hobbits        |
| 2    | 20 <= count < 50   | Ents           |
| 3    | 50 <= count < 100  | Wizards        |
| 4    | 100 <= count < 200 | Elves          |
| 5    | 200 <= count       | Maiar          |

등급 판정 규칙을 사용자 정의하는 것 외에도 등급 라벨도 사용자 정의할 수 있습니다. 클라이언트에서 다음과 같이 텍스트를 설정합니다:

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

기본적으로 6개 등급의 텍스트만 제공되지만, 이것이 등급이 6개뿐이라는 것을 의미하지는 않습니다. 구체적인 등급 상한은 설정한 등급 판정 규칙에 따라 달라집니다. 새 등급을 추가하려면 해당 등급에 대응하는 라벨 텍스트를 직접 설정하는 것이 좋습니다. 라벨 텍스트를 제공하지 않으면 기본적으로 `Level 10` 같은 기본 라벨 텍스트가 표시됩니다.

:::

## Safety

| Environment Variables | Default        | Description                                                                |
| --------------------- | -------------- | -------------------------------------------------------------------------- |
| `IPQPS`               | `60`           | IP-based comment posting frequency limit in seconds. Set to 0 for no limit |
| `SECURE_DOMAINS`      |                | Secure Domains config. Supports multiple domain with Comma separated       |
| `AKISMET_KEY`         | `70542d86693e` | Akismet 스팸 방지 서비스 키, 비활성화하려면 `false`로 설정                 |
| `COMMENT_AUDIT`       | `false`        | 댓글 감시 스위치. 활성화하면 모든 댓글이 관리자의 승인이 필요합니다        |
| `RECAPTCHA_V3_KEY`    |                | reCAPTCHA V3 key,should set along with client                              |
| `RECAPTCHA_V3_SECRET` |                | reCAPTCHA V3 secret for server.                                            |
| `TURNSTILE_KEY`       |                | Turnstile key,should set along with client                                 |
| `TURNSTILE_SECRET`    |                | Turnstile secret for server                                                |

::: tip Recaptcha and Turnstile

Turnstile 키와 시크릿은 <https://www.cloudflare.com/products/turnstile/>에서 요청할 수 있습니다.

Recaptcha 키와 시크릿은 <https://www.google.com/recaptcha>에서 요청할 수 있습니다.

보안 도메인을 설정할 때는 사이트 주소와 Waline 서버 주소를 동시에 추가해야 합니다.

:::

## Markdown

| Environment Variables | Default   | Description                                        |
| --------------------- | --------- | -------------------------------------------------- |
| `MARKDOWN_CONFIG`     | `{}`      | MarkdownIt Config                                  |
| `MARKDOWN_HIGHLIGHT`  | `true`    | Whether enable highlight                           |
| `MARKDOWN_EMOJI`      | `true`    | Whether enable emoji                               |
| `MARKDOWN_SUB`        | `true`    | 아래 첨자 활성화 여부                              |
| `MARKDOWN_SUP`        | `true`    | 위 첨자 활성화 여부                                |
| `MARKDOWN_TEX`        | `mathjax` | 수학 파싱 서비스, `mathjax`, `katex`, `false` 지원 |
| `MARKDOWN_MATHJAX`    | `{}`      | MathJax 옵션                                       |
| `MARKDOWN_KATEX`      | `{}`      | KaTeX 옵션                                         |

## 메일 서비스

메일 서비스는 사용자 등록 및 댓글의 이메일 알림에 사용됩니다. 메일 서비스 관련 변수를 구성한 후, 사용자 등록 시 이메일 검증 코드 확인과 관련된 작업을 추가하여 악의적인 등록을 방지합니다.

| 환경 변수 이름 | 설명                      |
| -------------- | ------------------------- |
| `SMTP_SERVICE` | SMTP 메일 서비스 제공자   |
| `SMTP_HOST`    | SMTP 서버 주소            |
| `SMTP_PORT`    | SMTP 서버 포트            |
| `SMTP_USER`    | SMTP 사용자명             |
| `SMTP_PASS`    | SMTP 비밀번호.            |
| `SMTP_SECURE`  | SSL로 SMTP 연결           |
| `SENDER_NAME`  | 발신자 이름 사용자 정의   |
| `SENDER_EMAIL` | 발신자 이메일 사용자 정의 |

::: tip

지원되는 서비스 제공자는 [nodemailer 서비스](https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json)에서 찾을 수 있습니다. `SMTP_SERVICE`와 (`SMTP_HOST`, `SMTP_PORT`) 중 하나를 선택할 수 있습니다. 목록에서 해당 `SMTP_SERVICE`를 모를 경우 `SMTP_HOST`와 `SMTP_PORT`를 구성해야 하며, 메일박스 설정에서 찾을 수 있습니다.

SMTP 사용자명은 일반적으로 전체 메일박스를 지원하며, 비밀번호는 대부분 메일박스 비밀번호와 동일합니다.

일부 메일박스는 별도의 SMTP 비밀번호를 사용한다는 점에 특히 주의하세요.

:::

## Database

### MongoDB

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

### MySQL

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

### TiDB

[Create a database on TiDB](../../../ko-KR/guide/deploy/tidb.md)

| Environment Variable | Required | Default   | Description          |
| -------------------- | -------- | --------- | -------------------- |
| `TIDB_DB`            | ✅       |           | TiDB database name   |
| `TIDB_USER`          | ✅       |           | TiDB server username |
| `TIDB_PASSWORD`      | ✅       |           | TiDB server password |
| `TIDB_HOST`          |          | 127.0.0.1 | TiDB server address  |
| `TIDB_PORT`          |          | 4000      | TiDB server port     |
| `TIDB_PREFIX`        |          | `wl_`     | TiDB table prefix    |
| `TIDB_CHARSET`       |          | `utf8mb4` | TiDB table charset   |

### SQLite

| Environment Variable | Required | Default | Description                                                        |
| -------------------- | -------- | ------- | ------------------------------------------------------------------ |
| `SQLITE_PATH`        | ✅       |         | SQLite storage file path, not include file name                    |
| `JWT_TOKEN`          | ✅       |         | Random String for login token generator                            |
| `SQLITE_DB`          |          | waline  | SQLite storage file name, change it if your filename is not waline |
| `SQLITE_PREFIX`      |          | `wl_`   | SQLite table prefix                                                |

### PostgreSQL

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

### GitHub

| Environment Variable | Required | Default | Description                                                                                                      |
| -------------------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------- |
| `GITHUB_TOKEN`       | ✅       |         | [Personal access tokens](https://github.com/settings/tokens)                                                     |
| `GITHUB_REPO`        | ✅       |         | repository name, such as `walinejs/waline`                                                                       |
| GITHUB_PATH          |          |         | The data storage directory, such as `data` means it is stored in the `data` directory, root directory by default |

## Advanced

| Environment Variables           | Default                     | Description                                                                                      |
| ------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------ |
| `OAUTH_URL`                     | `https://oauth.lithub.cc`   | OAuth Social Login Service URL. You can [build your own auth](https://github.com/walinejs/auth). |
| `WEBHOOK`                       |                             | You can set a Webhook URL that will be triggered when you have new comment.                      |
| `WALINE_ADMIN_MODULE_ASSET_URL` | `//unpkg.com/@waline/admin` | Waline admin link                                                                                |
| `IP2REGION_DB`                  |                             | customized IPv4 IP query library path (deprecated, use `IP2REGION_DB_V4` instead)                |
| `IP2REGION_DB_V4`               |                             | customized IPv4 IP query library path. Falls back to `IP2REGION_DB` if not set                   |
| `IP2REGION_DB_V6`               |                             | customized IPv6 IP query library path. Set this to enable IPv6 address location lookup           |
