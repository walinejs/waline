---
title: Variables de entorno del servidor
icon: config
---

Puedes personalizar el servidor de Waline mediante las siguientes variables de entorno.

::: warning

DEBES **volver a desplegar** después de actualizar las variables de entorno para que los cambios surtan efecto.

Si usas Vercel, debes configurarlas en `Settings` - `Environment Variables`.

:::

<!-- more -->

## Básico

| Variables de entorno | Obligatorio | Descripción                                                                                 |
| -------------------- | ----------- | ------------------------------------------------------------------------------------------- |
| `SITE_NAME`          |             | nombre del sitio                                                                            |
| `SITE_URL`           |             | URL del sitio                                                                               |
| `LOGIN`              |             | el usuario debe iniciar sesión antes de comentar cuando `LOGIN=force`                       |
| `SERVER_URL`         |             | URL del servidor de Waline; útil cuando la dirección generada automáticamente es incorrecta |

## Visualización

| Variables de entorno    | Valor predeterminado                                                    | Descripción                                                                            |
| ----------------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `DISABLE_USERAGENT`     |                                                                         | si se oculta el user agent del usuario que comenta. El valor predeterminado es `false` |
| `DISABLE_REGION`        |                                                                         | si se oculta la región del usuario que comenta. El valor predeterminado es `false`     |
| `DISABLE_AUTHOR_NOTIFY` |                                                                         | si se desactiva la notificación al autor                                               |
| `AVATAR_PROXY`          | `''`                                                                    | URL del servicio de proxy de avatares. Déjala vacía para desactivarlo                  |
| `GRAVATAR_STR`          | <span v-pre>`https://seccdn.libravatar.org/avatar/{{mail\|md5}}`</span> | Cadena de renderizado de Gravatar, basada en una plantilla de nunjucks                 |
| `LEVELS`                |                                                                         | Asigna a cada usuario una etiqueta de nivel según su número de comentarios             |

::: tip Etiqueta de nivel

Según el número de comentarios del usuario, se añadirá una etiqueta de nivel a quien comenta, de acuerdo con las condiciones de cada nivel. Esta función está desactivada de forma predeterminada y puede activarse configurando la variable de entorno `LEVELS`. La configuración es una lista de números separados por comas; por ejemplo, `0,10,20,50,100,200` significa:

| Niveles | Condiciones        | Etiquetas de nivel predeterminadas |
| ------- | ------------------ | ---------------------------------- |
| 0       | 0 <= count < 10    | Dwarves                            |
| 1       | 10 <= count < 20   | Hobbits                            |
| 2       | 20 <= count < 50   | Ents                               |
| 3       | 50 <= count < 100  | Wizards                            |
| 4       | 100 <= count < 200 | Elves                              |
| 5       | 200 <= count       | Maiar                              |

Además de personalizar las reglas para determinar el nivel, también puedes personalizar las etiquetas de nivel. Configura los textos en el cliente de la siguiente forma:

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

De forma predeterminada, solo se incluyen textos para 6 niveles, pero eso no significa que solo pueda haber 6 niveles: el límite real depende de las reglas de nivel que configures. Para añadir un nivel nuevo, te recomendamos configurar tú mismo el texto de la etiqueta correspondiente. Si no se proporciona un texto, se mostrará de forma predeterminada una etiqueta como `Level 10`.

:::

## Seguridad

| Variables de entorno  | Valor predeterminado | Descripción                                                                                                                                                                 |
| --------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `IPQPS`               | `60`                 | Límite de frecuencia de publicación de comentarios por IP, en segundos. Establécelo en 0 para no limitar                                                                    |
| `SECURE_DOMAINS`      |                      | Configuración de dominios seguros. Admite varios dominios separados por comas                                                                                               |
| `AKISMET_KEY`         | `70542d86693e`       | Clave del servicio antispam Akismet; establece `false` si quieres desactivarlo                                                                                              |
| `COMMENT_AUDIT`       | `false`              | Interruptor de auditoría de comentarios. Cuando está activado, cada comentario debe ser aprobado por el administrador, por lo que se recomienda indicarlo en el placeholder |
| `RECAPTCHA_V3_KEY`    |                      | Clave de reCAPTCHA V3; debe configurarse junto con el cliente                                                                                                               |
| `RECAPTCHA_V3_SECRET` |                      | Secreto de reCAPTCHA V3 para el servidor                                                                                                                                    |
| `TURNSTILE_KEY`       |                      | Clave de Turnstile; debe configurarse junto con el cliente                                                                                                                  |
| `TURNSTILE_SECRET`    |                      | Secreto de Turnstile para el servidor                                                                                                                                       |

::: tip reCAPTCHA y Turnstile

Puedes solicitar la clave y el secreto de Turnstile en <https://www.cloudflare.com/products/turnstile/>.

Puedes solicitar la clave y el secreto de reCAPTCHA en <https://www.google.com/recaptcha>.

Al configurar los dominios seguros, debes añadir al mismo tiempo la dirección del sitio y la dirección del servidor de Waline.

:::

## Markdown

| Variables de entorno | Valor predeterminado | Descripción                                                                |
| -------------------- | -------------------- | -------------------------------------------------------------------------- |
| `MARKDOWN_CONFIG`    | `{}`                 | Configuración de MarkdownIt                                                |
| `MARKDOWN_HIGHLIGHT` | `true`               | Si se activa el resaltado                                                  |
| `MARKDOWN_EMOJI`     | `true`               | Si se activan los emojis                                                   |
| `MARKDOWN_SUB`       | `true`               | Si se activa el subíndice                                                  |
| `MARKDOWN_SUP`       | `true`               | Si se activa el superíndice                                                |
| `MARKDOWN_TEX`       | `mathjax`            | Servicio para interpretar matemáticas; admite `mathjax`, `katex` y `false` |
| `MARKDOWN_MATHJAX`   | `{}`                 | Opciones de MathJax                                                        |
| `MARKDOWN_KATEX`     | `{}`                 | Opciones de KaTeX                                                          |

## Servicio de correo

El servicio de correo se utiliza para las notificaciones por correo del registro de usuarios y de los comentarios. Después de configurar las variables relacionadas con el servicio de correo, el registro de usuarios añadirá la confirmación mediante código de verificación por correo para evitar registros maliciosos.

| Nombre de la variable de entorno | Observaciones                         |
| -------------------------------- | ------------------------------------- |
| `SMTP_SERVICE`                   | Proveedor del servicio de correo SMTP |
| `SMTP_HOST`                      | Dirección del servidor SMTP           |
| `SMTP_PORT`                      | Puerto del servidor SMTP              |
| `SMTP_USER`                      | Nombre de usuario SMTP                |
| `SMTP_PASS`                      | Contraseña SMTP                       |
| `SMTP_SECURE`                    | Conexión SMTP mediante SSL            |
| `SENDER_NAME`                    | Personalizar el nombre del remitente  |
| `SENDER_EMAIL`                   | Personalizar el correo del remitente  |

::: tip

Puedes consultar los proveedores de servicio compatibles en [servicios de nodemailer](https://github.com/nodemailer/nodemailer/blob/master/src/well-known/services.json). Puedes elegir entre `SMTP_SERVICE` y (`SMTP_HOST`, `SMTP_PORT`). Si no conoces el `SMTP_SERVICE` correspondiente en la lista, necesitas configurar `SMTP_HOST` y `SMTP_PORT`, que normalmente encontrarás en la configuración del buzón.

El nombre de usuario de SMTP suele admitir el buzón completo del usuario, y la contraseña suele ser la misma que la del buzón.

Ten en cuenta especialmente que algunos buzones utilizan una contraseña SMTP independiente.

:::

## Base de datos

### MongoDB

| Variable de entorno | Obligatorio | Valor predeterminado | Descripción                                             |
| ------------------- | ----------- | -------------------- | ------------------------------------------------------- |
| `MONGO_DB`          | ✅          |                      | Nombre de la base de datos de MongoDB                   |
| `MONGO_USER`        | ✅          |                      | Nombre de usuario del servidor MongoDB                  |
| `MONGO_PASSWORD`    | ✅          |                      | Contraseña del servidor MongoDB                         |
| `MONGO_HOST`        |             | 127.0.0.1            | Dirección del servidor MongoDB; admite formato de array |
| `MONGO_PORT`        |             | 27017                | Puerto del servidor MongoDB; admite formato de array    |
| `MONGO_REPLICASET`  |             |                      | Conjunto de réplicas de MongoDB                         |
| `MONGO_AUTHSOURCE`  |             |                      | Origen de autenticación de MongoDB                      |
| `MONGO_OPT_SSL`     |             | `false`              | usar conexión SSL                                       |

### MySQL

| Variable de entorno | Obligatorio | Valor predeterminado | Descripción                                |
| ------------------- | ----------- | -------------------- | ------------------------------------------ |
| `MYSQL_DB`          | ✅          |                      | Nombre de la base de datos de MySQL        |
| `MYSQL_USER`        | ✅          |                      | Nombre de usuario del servidor MySQL       |
| `MYSQL_PASSWORD`    | ✅          |                      | Contraseña del servidor MySQL              |
| `MYSQL_HOST`        |             | 127.0.0.1            | Dirección del servidor MySQL               |
| `MYSQL_PORT`        |             | 3306                 | Puerto del servidor MySQL                  |
| `MYSQL_PREFIX`      |             | `wl_`                | Prefijo de las tablas de MySQL             |
| `MYSQL_CHARSET`     |             | `utf8mb4`            | Juego de caracteres de las tablas de MySQL |
| `MYSQL_SSL`         |             | `false`              | si se usa conexión SSL                     |

### TiDB

[Crear una base de datos en TiDB](../../guide/deploy/tidb.md)

| Variable de entorno | Obligatorio | Valor predeterminado | Descripción                               |
| ------------------- | ----------- | -------------------- | ----------------------------------------- |
| `TIDB_DB`           | ✅          |                      | Nombre de la base de datos de TiDB        |
| `TIDB_USER`         | ✅          |                      | Nombre de usuario del servidor TiDB       |
| `TIDB_PASSWORD`     | ✅          |                      | Contraseña del servidor TiDB              |
| `TIDB_HOST`         |             | 127.0.0.1            | Dirección del servidor TiDB               |
| `TIDB_PORT`         |             | 4000                 | Puerto del servidor TiDB                  |
| `TIDB_PREFIX`       |             | `wl_`                | Prefijo de las tablas de TiDB             |
| `TIDB_CHARSET`      |             | `utf8mb4`            | Juego de caracteres de las tablas de TiDB |

### SQLite

| Variable de entorno | Obligatorio | Valor predeterminado | Descripción                                                                               |
| ------------------- | ----------- | -------------------- | ----------------------------------------------------------------------------------------- |
| `SQLITE_PATH`       | ✅          |                      | Ruta del archivo de almacenamiento de SQLite, sin incluir el nombre del archivo           |
| `JWT_TOKEN`         | ✅          |                      | Cadena aleatoria para generar el token de inicio de sesión                                |
| `SQLITE_DB`         |             | waline               | Nombre del archivo de almacenamiento de SQLite; cámbialo si tu archivo no se llama waline |
| `SQLITE_PREFIX`     |             | `wl_`                | Prefijo de las tablas de SQLite                                                           |

### PostgreSQL

| Variable de entorno | Obligatorio | Valor predeterminado | Descripción                               |
| ------------------- | ----------- | -------------------- | ----------------------------------------- |
| `PG_DB`             | ✅          |                      | Nombre de la base de datos de PostgreSQL  |
| `PG_USER`           | ✅          |                      | Nombre de usuario del servidor PostgreSQL |
| `PG_PASSWORD`       | ✅          |                      | Contraseña del servidor PostgreSQL        |
| `PG_HOST`           |             | 127.0.0.1            | Dirección del servidor PostgreSQL         |
| `PG_PORT`           |             | 5432                 | Puerto del servidor PostgreSQL            |
| `PG_PREFIX`         |             | `wl_`                | Prefijo de las tablas de PostgreSQL       |
| `PG_SSL`            |             | `false`              | establece `true` para usar conexión SSL   |
| `POSTGRES_DATABASE` |             |                      | alias de `PG_DB`                          |
| `POSTGRES_USER`     |             |                      | alias de `PG_USER`                        |
| `POSTGRES_PASSWORD` |             |                      | alias de `PG_PASSWORD`                    |
| `POSTGRES_HOST`     |             | 127.0.0.1            | alias de `PG_HOST`                        |
| `POSTGRES_PORT`     |             | 5432                 | alias de `PG_PORT`                        |
| `POSTGRES_PREFIX`   |             | `wl_`                | alias de `PG_PREFIX`                      |
| `POSTGRES_SSL`      |             | `false`              | alias de `PG_SSL`                         |

### GitHub

| Variable de entorno | Obligatorio | Valor predeterminado | Descripción                                                                                                                                              |
| ------------------- | ----------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GITHUB_TOKEN`      | ✅          |                      | [Tokens de acceso personal](https://github.com/settings/tokens)                                                                                          |
| `GITHUB_REPO`       | ✅          |                      | nombre del repositorio, por ejemplo `walinejs/waline`                                                                                                    |
| GITHUB_PATH         |             |                      | Directorio de almacenamiento de datos; por ejemplo, `data` significa que se guardan en el directorio `data`; de forma predeterminada, el directorio raíz |

## Avanzado

| Variables de entorno            | Valor predeterminado        | Descripción                                                                                                                              |
| ------------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `OAUTH_URL`                     | `https://oauth.lithub.cc`   | URL del servicio de inicio de sesión social OAuth. Puedes [crear tu propio servicio de autenticación](https://github.com/walinejs/auth). |
| `WEBHOOK`                       |                             | Puedes definir una URL de Webhook que se activará cuando haya un comentario nuevo.                                                       |
| `WALINE_ADMIN_MODULE_ASSET_URL` | `//unpkg.com/@waline/admin` | Enlace del panel de administración de Waline                                                                                             |
| `IP2REGION_DB`                  |                             | ruta de la biblioteca personalizada de consulta de IP IPv4 (obsoleta, usa `IP2REGION_DB_V4` en su lugar)                                 |
| `IP2REGION_DB_V4`               |                             | ruta de la biblioteca personalizada de consulta de IP IPv4. Si no se define, se usa `IP2REGION_DB`                                       |
| `IP2REGION_DB_V6`               |                             | ruta de la biblioteca personalizada de consulta de IP IPv6. Actívala para habilitar la búsqueda de ubicación por dirección IPv6          |
