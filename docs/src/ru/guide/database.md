---
title: Поддержка нескольких баз данных
icon: database
order: 2
---

Waline поддерживает множество баз данных, включая MySQL, PostgreSQL, SQLite и MongoDB.

Достаточно настроить переменные окружения — Waline автоматически переключится на соответствующее хранилище данных в зависимости от заданных переменных.

<!-- more -->

## MongoDB

<https://mongodb.com> официально предоставляет 512 МБ базы данных MongoDB бесплатно. Ниже перечислены переменные окружения, которые нужно настроить для использования MongoDB.

| Переменная окружения | Обязательно | По умолчанию | Описание                                           |
| -------------------- | ----------- | ------------ | -------------------------------------------------- |
| `MONGO_DB`           | ✅          |              | Имя базы данных MongoDB                            |
| `MONGO_USER`         | ✅          |              | Имя пользователя сервера MongoDB                   |
| `MONGO_PASSWORD`     | ✅          |              | Пароль сервера MongoDB                             |
| `MONGO_HOST`         |             | 127.0.0.1    | Адрес сервера MongoDB, поддерживает формат массива |
| `MONGO_PORT`         |             | 27017        | Порт сервера MongoDB, поддерживает формат массива  |
| `MONGO_REPLICASET`   |             |              | Набор реплик MongoDB                               |
| `MONGO_AUTHSOURCE`   |             |              | Источник аутентификации MongoDB                    |
| `MONGO_OPT_SSL`      |             | `false`      | Использовать SSL-соединение                        |

Ниже приведён пример конфигурации для mongodb.com. Обратите внимание: если хостов несколько, `MONGO_HOST` и `MONGO_PORT` нужно задавать в формате JSON.

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

MySQL — тоже хороший выбор для хранения данных. Помимо собственного сервиса MySQL, можно воспользоваться [FreeDB](https://freedb.tech), который бесплатно предоставляет 25 МБ, или [PlanetScale](https://planetscale.com), который сейчас поддерживает только платные планы.

Если вы хотите использовать MySQL в качестве хранилища, сначала нужно импортировать [waline.sql](https://github.com/walinejs/waline/blob/main/assets/waline.sql), чтобы создать таблицу и её структуру, а затем задать в проекте следующие переменные окружения.

| Переменная окружения | Обязательно | По умолчанию | Описание                       |
| -------------------- | ----------- | ------------ | ------------------------------ |
| `MYSQL_DB`           | ✅          |              | Имя базы данных MySQL          |
| `MYSQL_USER`         | ✅          |              | Имя пользователя сервера MySQL |
| `MYSQL_PASSWORD`     | ✅          |              | Пароль сервера MySQL           |
| `MYSQL_HOST`         |             | 127.0.0.1    | Адрес сервера MySQL            |
| `MYSQL_PORT`         |             | 3306         | Порт сервера MySQL             |
| `MYSQL_PREFIX`       |             | `wl_`        | Префикс таблиц MySQL           |
| `MYSQL_CHARSET`      |             | `utf8mb4`    | Кодировка таблиц MySQL         |
| `MYSQL_SSL`          |             | `false`      | Использовать SSL-соединение    |

## TiDB

[TiDB](https://github.com/pingcap/tidb) — база данных NewSQL с открытым исходным кодом. [TiDB Cloud](https://tidbcloud.com/) — её официальная онлайн-версия, предоставляющая всем 5 ГБ бесплатной квоты.

Процесс инициализации описан в разделе [Создание базы данных на TiDB](deploy/tidb.md).

| Переменная окружения | Обязательно | По умолчанию | Описание              |
| -------------------- | ----------- | ------------ | --------------------- |
| `TIDB_DB`            | ✅          |              | Имя базы данных TiDB  |
| `TIDB_USER`          | ✅          |              | Имя пользователя TiDB |
| `TIDB_PASSWORD`      | ✅          |              | Пароль TiDB           |
| `TIDB_HOST`          |             | 127.0.0.1    | Адрес сервиса TiDB    |
| `TIDB_PORT`          |             | 4000         | Порт сервиса TiDB     |
| `TIDB_PREFIX`        |             | `wl_`        | Префикс таблиц TiDB   |
| `TIDB_CHARSET`       |             | `utf8mb4`    | Кодировка таблиц TiDB |

## SQLite

Если вы хотите использовать SQLite, скачайте [waline.sqlite](https://github.com/walinejs/waline/blob/main/assets/waline.sqlite) на свой сервер. Затем задайте в проекте следующие переменные окружения.

| Переменная окружения | Обязательно | По умолчанию | Описание                                                                     |
| -------------------- | ----------- | ------------ | ---------------------------------------------------------------------------- |
| `SQLITE_PATH`        | ✅          |              | Путь к файлу хранилища SQLite, без имени файла                               |
| `JWT_TOKEN`          | ✅          |              | Случайная строка для генерации токена входа                                  |
| `SQLITE_DB`          |             | waline       | Имя файла хранилища SQLite; измените его, если ваш файл называется не waline |
| `SQLITE_PREFIX`      |             | `wl_`        | Префикс таблиц SQLite                                                        |

## PostgreSQL

[Supabase](https://supabase.com) и [Neon](https://neon.tech/home) предлагают бесплатную базу данных на 512 МБ, а [Tembo](https://tembo.io/) бесплатно предоставляет 10 ГБ для базы данных PostgreSQL. Как и в случае с MySQL, перед использованием PostgreSQL нужно импортировать [waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql), чтобы создать таблицу и её структуру.

| Переменная окружения | Обязательно | По умолчанию | Описание                                  |
| -------------------- | ----------- | ------------ | ----------------------------------------- |
| `PG_DB`              | ✅          |              | Имя базы данных PostgreSQL                |
| `PG_USER`            | ✅          |              | Имя пользователя сервера PostgreSQL       |
| `PG_PASSWORD`        | ✅          |              | Пароль сервера PostgreSQL                 |
| `PG_HOST`            |             | 127.0.0.1    | Адрес сервера PostgreSQL                  |
| `PG_PORT`            |             | 5432         | Порт сервера PostgreSQL                   |
| `PG_PREFIX`          |             | `wl_`        | Префикс таблиц PostgreSQL                 |
| `PG_SSL`             |             | `false`      | Установите `true`, чтобы использовать SSL |
| `POSTGRES_DATABASE`  |             |              | Псевдоним для `PG_DB`                     |
| `POSTGRES_USER`      |             |              | Псевдоним для `PG_USER`                   |
| `POSTGRES_PASSWORD`  |             |              | Псевдоним для `PG_PASSWORD`               |
| `POSTGRES_HOST`      |             | 127.0.0.1    | Псевдоним для `PG_HOST`                   |
| `POSTGRES_PORT`      |             | 5432         | Псевдоним для `PG_PORT`                   |
| `POSTGRES_PREFIX`    |             | `wl_`        | Псевдоним для `PG_PREFIX`                 |
| `POSTGRES_SSL`       |             | `false`      | Псевдоним для `PG_SSL`                    |

## GitHub

Waline поддерживает хранение данных комментариев в CSV-файле на GitHub. Чтобы использовать GitHub в качестве хранилища, нужно получить personal access token. Перейдите на <https://github.com/settings/tokens> и нажмите <kbd>Generate new token</kbd>. В разрешениях отметьте пункт **repo**, чтобы получить права на чтение и запись в репозиториях.

| Переменная окружения | Обязательно | По умолчанию | Описание                                                                                                       |
| -------------------- | ----------- | ------------ | -------------------------------------------------------------------------------------------------------------- |
| `GITHUB_TOKEN`       | ✅          |              | [Personal access tokens](https://github.com/settings/tokens)                                                   |
| `GITHUB_REPO`        | ✅          |              | Имя репозитория, например `walinejs/waline`                                                                    |
| GITHUB_PATH          |             |              | Каталог хранения данных: например, `data` означает хранение в каталоге `data`; по умолчанию — корневой каталог |

::: warning

Из-за производительности использовать GitHub не рекомендуется.

:::

## Собственное хранилище

Помимо перечисленных хранилищ, можно добавить поддержку и других сервисов.

Если вы хотите помочь Waline поддерживать больше хранилищ, сделайте форк проекта, унаследуйте [базовый класс](https://github.com/walinejs/waline/blob/main/packages/server/src/service/storage/base.js), реализуйте методы `select()`, `add()`, `update()` и `delete()` соответствующего хранилища и отправьте PR.
