---
title: Configuración del servidor
icon: config
---

Las siguientes opciones deben configurarse en el archivo de entrada del servidor `index.js`.

::: warning

Si usas una plantilla, ten en cuenta que debes guardar estas configuraciones por tu cuenta, porque se sobrescribirán cuando actualices a la última versión de la plantilla oficial.

Te recomendamos crear un repositorio a partir de la plantilla oficial y hacer ahí tus cambios.

:::

## Opciones básicas

### plugins

- Tipo: `plugin[]`

Consulta [Sistema de plugins](./plugin.md) para más detalles

### secureDomains

- Tipo: `string | RegExp | string[] | RegExp[]`

Configuración de dominios seguros. Las peticiones procedentes de otros dominios recibirán el código de estado 403. Admite valores de tipo String, Regexp y Array. Si omites esta configuración, se permiten todos los dominios de referencia.

::: details Ejemplo

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  secureDomains: 'waline.js.org',
});
```

:::

::: tip

- Para facilitar el desarrollo local, `localhost` y `127.0.0.1` se añaden de forma predeterminada a la lista de dominios seguros.
- La variable de entorno `SECURE_DOMAINS` no tendrá efecto cuando esta opción esté configurada.

:::

### forbiddenWords

- Tipo: `string[]`

Si un comentario coincide con una palabra prohibida, se marcará como spam.

::: details Ejemplo

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  forbiddenWords: ['Trump'],
});
```

:::

### disallowIPList

- Tipo: `string[]`

Si la IP de un comentario coincide con esta lista, se devuelve el código de estado 403.

::: details Ejemplo

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  disallowIPList: ['8.8.8.8', '4.4.4.4'],
});
```

:::

### mailSubject

- Tipo: `string`

Personaliza el asunto del correo de respuesta a un comentario; equivale a la variable de entorno `MAIL_SUBJECT`.

### mailTemplate

- Tipo: `string`

Personaliza el contenido del correo de respuesta a un comentario; equivale a la variable de entorno `MAIL_TEMPLATE`.

### mailSubjectAdmin

- Tipo: `string`

Personaliza el asunto del correo de notificación de nuevos comentarios; equivale a la variable de entorno `MAIL_SUBJECT_ADMIN`.

### mailTemplateAdmin

- Tipo: `string`

Personaliza el contenido del correo de notificación de nuevos comentarios; equivale a la variable de entorno `MAIL_TEMPLATE_ADMIN`.

### QQTemplate

- Tipo: `string`

Plantilla de notificación de comentarios por QQ; equivale a la variable de entorno `QQ_TEMPLATE`.

### TGTemplate

- Tipo: `string`

Plantilla de notificación de comentarios por Telegram; equivale a la variable de entorno `TG_TEMPLATE`.

### model

- Tipo: `class`

Consulta [Personalizar el servicio de base de datos](../../cookbook/customize/database.md) para más detalles

### encryptPassword

- Tipo: `function`

Consulta [Personalizar el sistema de usuarios](../../cookbook/customize/userdb.md) para más detalles

### locales

- Tipo: `Record<string, Record<string, string>>`

Consulta [Personalizar el idioma](../../cookbook/customize/locale.md)

## Hooks de comentarios

Además de la configuración mediante variables de entorno, Waline también ofrece algunos hooks personalizados para facilitar el tratamiento de requisitos propios. Solo hay que configurarlos en el archivo de entrada del servidor `index.js`.

### preSave(comment)

Waline ofrece algunos hooks personalizados para que los usuarios adapten el comportamiento del servidor de Waline a sus necesidades.

::: details Ejemplo

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async preSave(comment) {
    const isSpam = await Akismet.check(comment);
    if (isSpam) {
      return { errmsg: "It's a spam!" };
    }
  },
});
```

:::

### postSave(comment, pComment)

Acción que se ejecuta después de publicar el comentario.

Al ejecutarse el método, los datos del comentario se pasan como primer parámetro y, si se trata de una respuesta a otro comentario, el comentario padre se pasa como segundo parámetro.

::: details Ejemplo

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async postSave(comment, pComment) {
    await mailto({
      mail: pComment.mail,
      text: `${comment.nick} replied your comment!`,
    });
  },
});
```

:::

### preUpdate(comment)

Acción que se ejecuta antes de actualizar el contenido de un comentario desde el panel de administración. Si el método devuelve contenido, la interfaz responderá directamente sin actualizar los datos del comentario.

::: details Ejemplo

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async preUpdate(comment) {
    return "Then you can't update comment data";
  },
});
```

:::

### postUpdate(comment)

Acción que se ejecuta después de actualizar el contenido de un comentario desde el panel de administración. Al ejecutarse el método, se pasan los datos del comentario.

::: details Ejemplo

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async postUpdate(comment) {
    console.log(`comment ${comment.objectId} has been updated!`);
  },
});
```

:::

### preDelete(commentId)

Acción que se ejecuta antes de eliminar un comentario. Al ejecutarse el método, se pasa el Id del comentario sobre el que se va a operar. Si el método devuelve contenido, la interfaz responderá directamente sin actualizar los datos del comentario.

::: details Ejemplo

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async preDelete(commentId) {
    return "Then you can't delete comment";
  },
});
```

:::

### postDelete(commentId)

Acción que se ejecuta después de eliminar un comentario; el Id del comentario se pasa como único parámetro.

::: details Ejemplo

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async postDelete(commentId) {
    console.log(`comment ${commentId} has been deleted!`);
  },
});
```

:::
