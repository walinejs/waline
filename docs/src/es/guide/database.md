---
title: Soporte para múltiples servicios de base de datos
icon: database
order: 2
---

Waline admite distintas bases de datos, incluidas MySQL, PostgreSQL, SQLite y MongoDB.

Solo necesitas configurar las variables de entorno y Waline cambiará automáticamente al servicio de almacenamiento de datos correspondiente según las variables de entorno que configures.

<!-- more -->

## MongoDB

<https://mongodb.com> ofrece de forma gratuita 512M de base de datos MongoDB. Estas son las variables de entorno que debes configurar para usar una base de datos MongoDB.

| Variable de entorno | Obligatorio | Predeterminado | Descripción                                                |
| ------------------- | ----------- | -------------- | ---------------------------------------------------------- |
| `MONGO_DB`          | ✅          |                | Nombre de la base de datos MongoDB                         |
| `MONGO_USER`        | ✅          |                | Nombre de usuario del servidor MongoDB                     |
| `MONGO_PASSWORD`    | ✅          |                | Contraseña del servidor MongoDB                            |
| `MONGO_HOST`        |             | 127.0.0.1      | Dirección del servidor MongoDB, admite el formato de array |
| `MONGO_PORT`        |             | 27017          | Puerto del servidor MongoDB, admite el formato de array    |
| `MONGO_REPLICASET`  |             |                | Conjunto de réplicas de MongoDB                            |
| `MONGO_AUTHSOURCE`  |             |                | Origen de autenticación de MongoDB                         |
| `MONGO_OPT_SSL`     |             | `false`        | Usar una conexión SSL                                      |

Aquí tienes un ejemplo de configuración para mongodb.com. Ten en cuenta que debes usar el formato JSON en `MONGO_HOST` y `MONGO_PORT` cuando tengas varios hosts.

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

Usar MySQL para almacenar los datos también es una buena opción. Además de nuestro propio servicio MySQL, también puedes usar [FreeDB](https://freedb.tech), que ofrece 25M de base de datos de forma gratuita, o [PlanetScale](https://planetscale.com), que por ahora solo admite el plan de pago.

Si quieres usar MySQL como almacenamiento, primero debes importar [waline.sql](https://github.com/walinejs/waline/blob/main/assets/waline.sql) para crear las tablas y su estructura, y luego configurar estas variables de entorno en el proyecto.

| Variable de entorno | Obligatorio | Predeterminado | Descripción                             |
| ------------------- | ----------- | -------------- | --------------------------------------- |
| `MYSQL_DB`          | ✅          |                | Nombre de la base de datos MySQL        |
| `MYSQL_USER`        | ✅          |                | Nombre de usuario del servidor MySQL    |
| `MYSQL_PASSWORD`    | ✅          |                | Contraseña del servidor MySQL           |
| `MYSQL_HOST`        |             | 127.0.0.1      | Dirección del servidor MySQL            |
| `MYSQL_PORT`        |             | 3306           | Puerto del servidor MySQL               |
| `MYSQL_PREFIX`      |             | `wl_`          | Prefijo de las tablas de MySQL          |
| `MYSQL_CHARSET`     |             | `utf8mb4`      | Juego de caracteres de las tablas MySQL |
| `MYSQL_SSL`         |             | `false`        | Si se usa una conexión SSL              |

## TiDB

[TiDB](https://github.com/pingcap/tidb) es una base de datos NewSQL de código abierto. [TiDB Cloud](https://tidbcloud.com/) es la versión oficial en línea, que ofrece 5GB de cuota gratuita para que todo el mundo pueda usarla.

Consulta [Crear una base de datos en TiDB](../../es/guide/deploy/tidb.md) para conocer el proceso de inicialización.

| Variable de entorno | Obligatorio | Predeterminado | Descripción                                |
| ------------------- | ----------- | -------------- | ------------------------------------------ |
| `TIDB_DB`           | ✅          |                | Nombre de la base de datos TiDB            |
| `TIDB_USER`         | ✅          |                | Nombre de usuario de la base de datos TiDB |
| `TIDB_PASSWORD`     | ✅          |                | Contraseña de la base de datos TiDB        |
| `TIDB_HOST`         |             | 127.0.0.1      | Dirección del servicio TiDB                |
| `TIDB_PORT`         |             | 4000           | Puerto del servicio TiDB                   |
| `TIDB_PREFIX`       |             | `wl_`          | Prefijo de las tablas de datos de TiDB     |
| `TIDB_CHARSET`      |             | `utf8mb4`      | Juego de caracteres de las tablas de TiDB  |

## SQLite

Descarga [waline.sqlite](https://github.com/walinejs/waline/blob/main/assets/waline.sqlite) en tu servidor si quieres usar SQLite. Después, configura estas variables de entorno en el proyecto.

| Variable de entorno | Obligatorio | Predeterminado | Descripción                                                                               |
| ------------------- | ----------- | -------------- | ----------------------------------------------------------------------------------------- |
| `SQLITE_PATH`       | ✅          |                | Ruta del archivo de almacenamiento de SQLite, sin incluir el nombre del archivo           |
| `JWT_TOKEN`         | ✅          |                | Cadena aleatoria para generar el token de inicio de sesión                                |
| `SQLITE_DB`         |             | waline         | Nombre del archivo de almacenamiento de SQLite; cámbialo si tu archivo no se llama waline |
| `SQLITE_PREFIX`     |             | `wl_`          | Prefijo de las tablas de SQLite                                                           |

## PostgreSQL

[Supabase](https://supabase.com) y [Neon](https://neon.tech/home) ofrecen una base de datos de 512M gratis, mientras que [Tembo](https://tembo.io/) proporciona 10G de base de datos PG de forma gratuita. Al igual que con MySQL, debes importar [waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql) para crear las tablas y su estructura antes de usar PostgreSQL.

| Variable de entorno | Obligatorio | Predeterminado | Descripción                                |
| ------------------- | ----------- | -------------- | ------------------------------------------ |
| `PG_DB`             | ✅          |                | Nombre de la base de datos PostgreSQL      |
| `PG_USER`           | ✅          |                | Nombre de usuario del servidor PostgreSQL  |
| `PG_PASSWORD`       | ✅          |                | Contraseña del servidor PostgreSQL         |
| `PG_HOST`           |             | 127.0.0.1      | Dirección del servidor PostgreSQL          |
| `PG_PORT`           |             | 5432           | Puerto del servidor PostgreSQL             |
| `PG_PREFIX`         |             | `wl_`          | Prefijo de las tablas de PostgreSQL        |
| `PG_SSL`            |             | `false`        | Ponlo en `true` para usar una conexión SSL |
| `POSTGRES_DATABASE` |             |                | Alias de `PG_DB`                           |
| `POSTGRES_USER`     |             |                | Alias de `PG_USER`                         |
| `POSTGRES_PASSWORD` |             |                | Alias de `PG_PASSWORD`                     |
| `POSTGRES_HOST`     |             | 127.0.0.1      | Alias de `PG_HOST`                         |
| `POSTGRES_PORT`     |             | 5432           | Alias de `PG_PORT`                         |
| `POSTGRES_PREFIX`   |             | `wl_`          | Alias de `PG_PREFIX`                       |
| `POSTGRES_SSL`      |             | `false`        | Alias de `PG_SSL`                          |

## GitHub

Waline permite almacenar los datos de los comentarios en un archivo CSV en GitHub. Para usar GitHub como almacenamiento de datos, debes solicitar tokens de acceso personal. Puedes hacer clic en <kbd>Generate new token</kbd> para solicitarlo en <https://github.com/settings/tokens>. Marca la opción **repo** en los permisos para obtener permisos de lectura y escritura en los repositorios.

| Variable de entorno | Obligatorio | Predeterminado | Descripción                                                                                                                                                 |
| ------------------- | ----------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GITHUB_TOKEN`      | ✅          |                | [Tokens de acceso personal](https://github.com/settings/tokens)                                                                                             |
| `GITHUB_REPO`       | ✅          |                | Nombre del repositorio, por ejemplo `walinejs/waline`                                                                                                       |
| GITHUB_PATH         |             |                | Directorio de almacenamiento de datos; por ejemplo, `data` significa que se guardan en el directorio `data`; de forma predeterminada, en el directorio raíz |

::: warning

Por motivos de rendimiento, no se recomienda usar GitHub.

:::

## Personalizado

Además del almacenamiento en las bases de datos anteriores, también se puede añadir soporte para otros servicios de almacenamiento.

Si quieres ayudar a que Waline admita más servicios de almacenamiento, puedes hacer un fork del proyecto, heredar la [clase base](https://github.com/walinejs/waline/blob/main/packages/server/src/service/storage/base.js) e implementar los métodos `select()`, `add()`, `update()` y `delete()` del servicio de almacenamiento correspondiente, y luego enviar el PR.
