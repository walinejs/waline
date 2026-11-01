---
title: Personalizar el idioma
icon: i18n
---

Esta receta te explica cómo personalizar los textos multilingües de Waline.

<!-- more -->

## Personalizar el idioma y los textos del cliente

`@waline/client` ofrece la opción `locale`, mediante la cual puedes personalizar varios idiomas y los textos que se muestran.

De forma predeterminada usa los textos multilingües integrados y recurre a `en-US` (inglés de EE. UU.) si el idioma no es compatible.

Puedes pasar una configuración multilingüe completa a la opción `locale` para añadir compatibilidad con un idioma, o definir solo algunas de sus claves para sobrescribir los textos de la interfaz existentes.

### Opciones de locale

- Relacionadas con los niveles:
  - `level${number}`: etiqueta del nivel número

  ::: tip

  Por ejemplo, puedes personalizar las etiquetas de 6 niveles así:

  ```ts
  Waline.init({
    locale: {
      level0: '炼体',
      level1: '炼气',
      level2: '筑基',
      level3: '金丹',
      level4: '元婴',
      level5: '化神',
    },
  });
  ```

  :::

- Relacionadas con las reacciones:
  - `reactionTitle`: título de las reacciones
  - `reaction0`: texto de la reacción 1
  - `reaction1`: texto de la reacción 2
  - `reaction2`: texto de la reacción 3
  - `reaction3`: texto de la reacción 4
  - `reaction4`: texto de la reacción 5
  - `reaction5`: texto de la reacción 6
  - `reaction6`: texto de la reacción 7
  - `reaction7`: texto de la reacción 8
  - `reaction8`: texto de la reacción 9

- Relacionadas con la interfaz:
  - `nick`: nombre de usuario
  - `mail`: correo electrónico
  - `link`: enlace
  - `placeholder`: texto predeterminado de la caja de comentarios
  - `sofa`: texto que se muestra cuando el área de comentarios está vacía
  - `submit`: texto del botón de enviar
  - `comment`: texto del botón de comentar
  - `refresh`: texto del botón de recargar
  - `more`: texto del botón de cargar más
  - `uploading`: texto que se muestra mientras se sube la imagen
  - `login`: texto del botón de iniciar sesión
  - `admin`: etiqueta del administrador
  - `sticky`: texto de fijado
  - `word`: palabra
  - `anonymous`: nombre predeterminado del usuario anónimo
  - `optional`: texto que indica que una opción es opcional
  - `gifSearchPlaceholder`: texto de marcador de posición de la búsqueda de emojis
  - `oldest`: comentario más antiguo
  - `latest`: comentario más reciente
  - `hottest`: comentario más popular

  ::: info

  Los textos anteriores se muestran en la página.

  :::

- Relacionadas con los mensajes de aviso:
  - `nickError`: mensaje de error cuando el nombre de usuario no cumple las condiciones
  - `mailError`: mensaje de error cuando la dirección de correo electrónico no cumple las condiciones
  - `wordHint`: aviso de error sobre el número de palabras del comentario, donde `$0` `$1` `$2` se reemplazan automáticamente por el límite inferior de palabras permitido, el límite superior de palabras permitido y el número de palabras actual.

- Relacionadas con la fecha de los comentarios:
  - `seconds`: segundos atrás
  - `minutes`: minutos atrás
  - `hours`: horas atrás
  - `days`: días atrás
  - `now`: justo ahora

- Relacionadas con la gestión:
  - `approved`: botón que marca el comentario como aprobado
  - `waiting`: botón que marca el comentario como pendiente de revisión
  - `spam`: botón que marca los comentarios como spam
  - `unsticky`: botón que quita el fijado del comentario

- Relacionadas con la accesibilidad:
  - `like`: texto de la etiqueta del botón «me gusta»
  - `cancelLike`: texto de la etiqueta del botón para anular el «me gusta»
  - `reply`: texto de la etiqueta del botón de responder
  - `cancelReply`: texto de la etiqueta del botón para anular la respuesta
  - `preview`: texto de la etiqueta del botón de vista previa
  - `emoji`: texto de la etiqueta del botón de emoji
  - `gif`: texto de la etiqueta del botón de GIF
  - `uploadImage`: texto de la etiqueta del botón de subir imagen
  - `profile`: título del enlace a la página de perfil
  - `logout`: texto de la etiqueta del botón de cerrar sesión

  ::: info

  Estos textos solo tienen fines de accesibilidad y no se muestran en la página.

  :::

### Ejemplo

```js
// en default
const locale = {
  nick: 'NickName',
  nickError: 'NickName cannot be less than 3 bytes.',
  mail: 'E-Mail',
  mailError: 'Please confirm your email address.',
  link: 'Website',
  optional: 'Optional',
  placeholder: 'Comment here...',
  sofa: 'No comment yet.',
  submit: 'Submit',
  like: 'Like',
  cancelLike: 'Cancel like',
  reply: 'Reply',
  cancelReply: 'Cancel reply',
  comment: 'Comments',
  refresh: 'Refresh',
  more: 'Load More...',
  preview: 'Preview',
  emoji: 'Emoji',
  uploadImage: 'Upload Image',
  seconds: 'seconds ago',
  minutes: 'minutes ago',
  hours: 'hours ago',
  days: 'days ago',
  now: 'just now',
  uploading: 'Uploading',
  login: 'Login',
  logout: 'logout',
  admin: 'Admin',
  sticky: 'Sticky',
  word: 'Words',
  wordHint: 'Please input comments between $0 and $1 words!\n Current word number: $2',
  anonymous: 'Anonymous',
  level0: 'Dwarves',
  level1: 'Hobbits',
  level2: 'Ents',
  level3: 'Wizards',
  level4: 'Elves',
  level5: 'Maiar',
  gif: 'GIF',
  gifSearchPlaceholder: 'Search GIF',
  profile: 'Profile',
  approved: 'Approved',
  waiting: 'Waiting',
  spam: 'Spam',
  unsticky: 'Unsticky',
  oldest: 'Oldest',
  latest: 'Latest',
  hottest: 'Hottest',
  reactionTitle: 'What do you think?',
};

Waline.init({
  el: '#waline',
  path: location.pathname,
  serverURL: 'YOUR_SERVER_URL',
  // ...
  locale,
});
```

## Personalizar los textos de respuesta del servidor

`@waline/vercel` ofrece la opción `locales`, que te permite personalizar los textos de respuesta.

De forma predeterminada usa los textos multilingües integrados y recurre a los textos en `en-US` si el idioma no es compatible.

Puedes pasar una configuración multilingüe completa a la opción `locales` para añadir compatibilidad con un idioma, o definir solo algunos de ellos para sobrescribir los textos existentes.

::: tip

Todos los textos personalizados se renderizan al final con el motor de plantillas nunjucks, que permite escribir expresiones lógicas relativamente complejas. Por ejemplo:

```
Registration confirm mail send failed, please {%- if isAdmin -%}check your mail configuration{%- else -%}check your email address and contact administrator{%- endif -%}.
```

:::

### Opciones de locale

- Relacionadas con los mensajes de aviso:
  - `import data format not support!`
  - `USER_EXIST`
  - `USER_NOT_EXIST`
  - `USER_REGISTERED`
  - `TOKEN_EXPIRED`
  - `TWO_FACTOR_AUTH_ERROR_DETAIL`
  - `Duplicate Content`
  - `Comment too fast`

- Relacionadas con las notificaciones por correo de registro e inicio de sesión:
  - `[{{name | safe}}] Registration Confirm Mail`
  - `Please click <a href=\"{{url}}\">{{url}}<a/> to confirm registration, the link is valid for 1 hour. If you are not registering, please ignore this email.`
  - `[{{name | safe}}] Reset Password`
  - `Please click <a href=\"{{url}}\">{{url}}</a> to login and change your password as soon as possible!`
  - `Registration confirm mail send failed, please {%- if isAdmin -%}check your mail configuration{%- else -%}check your email address and contact administrator{%- endif -%}.`

- Relacionadas con las notificaciones por correo de comentarios:
  - `MAIL_SUBJECT`：`Your comment on {{site.name | safe}} received a reply`
  - `MAIL_TEMPLATE`：`<div style='border-top:2px solid #12ADDB;box-shadow:0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;margin:50px auto;font-size:12px;'> <h2 style='border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;'> Your comment on <a style='text-decoration:none;color: #12ADDB;' href='{{site.url}}' target='_blank'>{{site.name}}</a> received a reply </h2>{{parent.nick}}, you wrote: <div style='padding:0 12px 0 12px;margin-top:18px'> <div style='background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;'>{{parent.comment | safe}}</div><p><strong>{{self.nick}}</strong> replied:</p><div style='background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;'>{{self.comment | safe}}</div><p><a style='text-decoration:none; color:#12addb' href='{{site.postUrl}}' target='_blank'>View full reply</a> or visit <a style='text-decoration:none; color:#12addb' href='{{site.url}}' target='_blank'>{{site.name}}</a>.</p><br/> </div></div>`
  - `MAIL_SUBJECT_ADMIN`：`New comment on {{site.name | safe}}`
  - `MAIL_TEMPLATE_ADMIN`：`<div style='border-top:2px solid #12ADDB;box-shadow:0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;margin:50px auto;font-size:12px;'> <h2 style='border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;'> New comment on <a style='text-decoration:none;color: #12ADDB;' href='{{site.url}}' target='_blank'>{{site.name}}</a> </h2> <p><strong>{{self.nick}}</strong> wrote:</p><div style='background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;'>{{self.comment | safe}}</div><p><a style='text-decoration:none; color:#12addb' href='{{site.postUrl}}' target='_blank'>View page</a></p><br/></div>`

### Ejemplo

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  locales: {
    'en-US': {
      USER_EXIST: 'Warning! User exist!',
    },
  },
});
```
