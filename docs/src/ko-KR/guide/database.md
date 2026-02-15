---
title: 다중 데이터베이스 서비스 지원
icon: database
order: 2
---

Waline은 MySQL, PostgreSQL, SQLite, MongoDB를 포함한 다양한 데이터베이스를 지원합니다.

환경 변수를 설정하기만 하면, Waline은 설정된 환경 변수에 따라 자동으로 해당 데이터 저장 서비스로 전환합니다.

<!-- more -->

## MongoDB

<https://mongodb.com>에서 공식적으로 512M의 무료 MongoDB 데이터베이스를 제공합니다. 다음은 MongoDB 데이터베이스를 사용하기 위해 설정해야 하는 환경 변수입니다.

| 환경 변수          | 필수 | 기본값    | 설명                              |
| ------------------ | ---- | --------- | --------------------------------- |
| `MONGO_DB`         | ✅   |           | MongoDB 데이터베이스 이름         |
| `MONGO_USER`       | ✅   |           | MongoDB 서버 사용자 이름          |
| `MONGO_PASSWORD`   | ✅   |           | MongoDB 서버 비밀번호             |
| `MONGO_HOST`       |      | 127.0.0.1 | MongoDB 서버 주소, 배열 형식 지원 |
| `MONGO_PORT`       |      | 27017     | MongoDB 서버 포트, 배열 형식 지원 |
| `MONGO_REPLICASET` |      |           | MongoDB 레플리카 세트             |
| `MONGO_AUTHSOURCE` |      |           | MongoDB 인증 소스                 |
| `MONGO_OPT_SSL`    |      | `false`   | SSL 연결 사용                     |

다음은 mongodb.com의 예시 설정입니다. 여러 호스트가 있을 경우 `MONGO_HOST`와 `MONGO_PORT`를 JSON 형식으로 설정해야 합니다.

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

MySQL을 사용하여 데이터를 저장하는 것도 좋은 선택입니다. 자체 MySQL 서비스 외에 무료로 25M의 데이터베이스를 제공하는 [FreeDB](https://freedb.tech)나, 현재 유료 플랜만 지원하는 [PlanetScale](https://planetscale.com)을 사용할 수도 있습니다.

MySQL을 저장소로 사용하려면, 먼저 [waline.sql](https://github.com/walinejs/waline/blob/main/assets/waline.sql)을 임포트하여 테이블과 테이블 구조를 생성한 후, 프로젝트에서 다음 환경 변수를 설정해야 합니다.

| 환경 변수        | 필수 | 기본값    | 설명                    |
| ---------------- | ---- | --------- | ----------------------- |
| `MYSQL_DB`       | ✅   |           | MySQL 데이터베이스 이름 |
| `MYSQL_USER`     | ✅   |           | MySQL 서버 사용자 이름  |
| `MYSQL_PASSWORD` | ✅   |           | MySQL 서버 비밀번호     |
| `MYSQL_HOST`     |      | 127.0.0.1 | MySQL 서버 주소         |
| `MYSQL_PORT`     |      | 3306      | MySQL 서버 포트         |
| `MYSQL_PREFIX`   |      | `wl_`     | MySQL 테이블 접두사     |
| `MYSQL_CHARSET`  |      | `utf8mb4` | MySQL 테이블 문자 세트  |
| `MYSQL_SSL`      |      | `false`   | SSL 연결 사용 여부      |

## TiDB

[TiDB](https://github.com/pingcap/tidb)는 오픈 소스 NewSQL 데이터베이스입니다. [TiDB Cloud](https://tidbcloud.com/)는 공식 온라인 버전으로, 모든 사용자에게 5GB의 무료 할당량을 제공합니다.

초기화 과정은 [TiDB 데이터베이스 생성](../../ko-KR/guide/deploy/tidb.md)을 참조하세요.

| 환경 변수       | 필수 | 기본값    | 설명                          |
| --------------- | ---- | --------- | ----------------------------- |
| `TIDB_DB`       | ✅   |           | TiDB 데이터베이스 이름        |
| `TIDB_USER`     | ✅   |           | TiDB 데이터베이스 사용자 이름 |
| `TIDB_PASSWORD` | ✅   |           | TiDB 데이터베이스 비밀번호    |
| `TIDB_HOST`     |      | 127.0.0.1 | TiDB 서비스 주소              |
| `TIDB_PORT`     |      | 4000      | TiDB 서비스 포트              |
| `TIDB_PREFIX`   |      | `wl_`     | TiDB 데이터 테이블 접두사     |
| `TIDB_CHARSET`  |      | `utf8mb4` | TiDB 데이터 테이블 문자 세트  |

## SQLite

SQLite를 사용하려면 [waline.sqlite](https://github.com/walinejs/waline/blob/main/assets/waline.sqlite)를 서버에 다운로드하세요. 그런 다음 프로젝트에서 다음 환경 변수를 설정하세요.

| 환경 변수       | 필수 | 기본값 | 설명                                                             |
| --------------- | ---- | ------ | ---------------------------------------------------------------- |
| `SQLITE_PATH`   | ✅   |        | SQLite 저장 파일 경로, 파일 이름은 포함하지 않음                 |
| `JWT_TOKEN`     | ✅   |        | 로그인 토큰 생성을 위한 랜덤 문자열                              |
| `SQLITE_DB`     |      | waline | SQLite 저장 파일 이름, 파일 이름이 waline이 아닌 경우 변경하세요 |
| `SQLITE_PREFIX` |      | `wl_`  | SQLite 테이블 접두사                                             |

## PostgreSQL

[Supabase](https://supabase.com)와 [Neon](https://neon.tech/home)은 무료 512M 데이터베이스를 제공하며, [Tembo](https://tembo.io/)는 무료로 10G PG 데이터베이스를 제공합니다. MySQL과 마찬가지로, PostgreSQL을 사용하기 전에 [waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql)을 임포트하여 테이블과 테이블 구조를 생성해야 합니다.

| 환경 변수           | 필수 | 기본값    | 설명                                |
| ------------------- | ---- | --------- | ----------------------------------- |
| `PG_DB`             | ✅   |           | PostgreSQL 데이터베이스 이름        |
| `PG_USER`           | ✅   |           | PostgreSQL 서버 사용자 이름         |
| `PG_PASSWORD`       | ✅   |           | PostgreSQL 서버 비밀번호            |
| `PG_HOST`           |      | 127.0.0.1 | PostgreSQL 서버 주소                |
| `PG_PORT`           |      | 3211      | PostgreSQL 서버 포트                |
| `PG_PREFIX`         |      | `wl_`     | PostgreSQL 테이블 접두사            |
| `PG_SSL`            |      | `false`   | SSL 연결을 사용하려면 `true`로 설정 |
| `POSTGRES_DATABASE` |      |           | `PG_DB`의 별칭                      |
| `POSTGRES_USER`     |      |           | `PG_USER`의 별칭                    |
| `POSTGRES_PASSWORD` |      |           | `PG_PASSWORD`의 별칭                |
| `POSTGRES_HOST`     |      | 127.0.0.1 | `PG_HOST`의 별칭                    |
| `POSTGRES_PORT`     |      | 3211      | `PG_PORT`의 별칭                    |
| `POSTGRES_PREFIX`   |      | `wl_`     | `PG_PREFIX`의 별칭                  |
| `POSTGRES_SSL`      |      | `false`   | `POSTGRES_SSL`의 별칭               |

## GitHub

Waline은 GitHub의 CSV 파일에 댓글 데이터를 저장하는 것을 지원합니다. GitHub를 데이터 저장소로 사용하려면, Personal access tokens를 신청해야 합니다. <https://github.com/settings/tokens>에서 <kbd>Generate new token</kbd>을 클릭하여 신청할 수 있습니다. 권한에서 **repo** 옵션을 체크하여 저장소의 읽기 및 쓰기 권한을 얻으세요.

| 환경 변수      | 필수 | 기본값 | 설명                                                                                                 |
| -------------- | ---- | ------ | ---------------------------------------------------------------------------------------------------- |
| `GITHUB_TOKEN` | ✅   |        | [Personal access tokens](https://github.com/settings/tokens)                                         |
| `GITHUB_REPO`  | ✅   |        | 저장소 이름, 예: `walinejs/waline`                                                                   |
| GITHUB_PATH    |      |        | 데이터 저장 디렉터리, 예: `data`는 `data` 디렉터리에 저장됨을 의미하며, 기본값은 루트 디렉터리입니다 |

::: warning

성능상의 이유로 GitHub 사용은 권장하지 않습니다.

:::

## 커스텀

위의 데이터베이스 저장소 외에도, 다른 저장소 서비스에 대한 지원을 추가할 수 있습니다.

Waline이 더 많은 저장소 서비스를 지원하도록 돕고 싶다면, 프로젝트를 포크하고 [기본 클래스](https://github.com/walinejs/waline/blob/main/packages/server/src/service/storage/base.js)를 상속한 후, 해당 저장소 서비스의 `select()`, `add()`, `update()`, `delete()` 메서드를 구현하여 PR을 제출해 주세요.
