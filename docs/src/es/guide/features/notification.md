---
title: Notificación de comentarios
icon: notice
order: 10
---

Cuando un usuario publica un comentario en el sitio web o responde a un comentario, Waline admite notificaciones por correo electrónico o por WeChat al bloguero y al autor al que se responde.

- Admitimos varios tipos de notificaciones para el bloguero
- Enviaremos un correo electrónico a un visitante en cuanto su comentario reciba una respuesta.

<!-- more -->

## Notificación por correo electrónico

La notificación por correo electrónico requiere configurar las siguientes variables de entorno:

- `SMTP_SERVICE`: proveedor del servicio de envío de correo SMTP

  ::: tip

  Puedes encontrar todos los proveedores compatibles en [nodemailer services](https://github.com/nodemailer/nodemailer/blob/master/src/well-known/services.json). Si tu proveedor no aparece en la lista, debes configurar `SMTP_HOST` y `SMTP_PORT`.

  - `SMTP_HOST`: dirección del servidor SMTP; normalmente se encuentra en la página de configuración del buzón.
  - `SMTP_PORT`: puerto del servidor SMTP; normalmente se encuentra en la página de configuración del buzón.

  :::

- `SMTP_USER`: cuenta del servicio de envío de correo SMTP, es tu dirección de correo electrónico.
- `SMTP_PASS`: contraseña del servicio de envío de correo SMTP, es la contraseña de tu correo electrónico.
- `SMTP_SECURE`: conexión SMTP con SSL, `true` o `false`.
- `SITE_NAME`: nombre de tu sitio, se mostrará en el mensaje de notificación.
- `SITE_URL`: URL de tu sitio, se mostrará en el mensaje de notificación.

Las siguientes variables de entorno son opcionales:

- `SENDER_NAME`: nombre personalizado del remitente en la notificación
- `SENDER_EMAIL`: nombre personalizado del remitente en la notificación; es obligatorio para algunos servicios SMTP.
- `MAIL_SUBJECT`: título personalizado del correo de respuesta a un comentario
- `MAIL_TEMPLATE`: contenido personalizado del correo de respuesta
- `MAIL_SUBJECT_ADMIN`: título personalizado del correo de notificación de nuevo comentario
- `MAIL_TEMPLATE_ADMIN`: contenido personalizado del correo de notificación de nuevo comentario
- `AUTHOR_EMAIL`: correo electrónico del bloguero, se usa para determinar si el comentario publicado lo ha escrito el bloguero. Si lo ha publicado el bloguero, no se enviará ninguna notificación recordatoria.

## Notificación por WeChat

Usamos [Mr. Server](http://sc.ftqq.com/3.version) para las notificaciones por WeChat. Debes establecer `SC_KEY` en el entorno, que se solicita en Mr. Server.

- `SC_KEY`: token solicitado en Mr. Server; es obligatorio para este servicio.
- `AUTHOR_EMAIL`: el correo electrónico del bloguero se usa para distinguir si el comentario publicado lo ha publicado el propio bloguero. Si lo ha publicado el bloguero, no se enviará ninguna notificación recordatoria.
- `SITE_NAME`: nombre de tu sitio, se mostrará en el mensaje de notificación.
- `SITE_URL`: URL de tu sitio, se mostrará en el mensaje de notificación.

## Notificación por QQ

Usamos [Mr. Qmsg](https://qmsg.zendee.cn) para enviar notificaciones por QQ. Debes establecer `QMSG_KEY` en el entorno, que se solicita en Mr. Qmsg.

- `QMSG_KEY`: KEY solicitada en Mr. Qmsg; es obligatoria para este servicio.
- `QMSG_HOST`: HOST solicitado en Mr. QmsgPrivate, opcional. Es obligatorio para este host. El valor predeterminado es `https://qmsg.zendee.cn`
- `QQ_ID`: el ID de QQ del receptor o receptores, excepto los grupos de QQ. Si hay más de un ID de QQ, separa los valores con comas, p. ej., `1244453393,2952937634` (todos deben estar incluidos en la lista de IDs de QQ de tu Mr. Qmsg).
- `AUTHOR_EMAIL`: el correo electrónico del bloguero se usa para distinguir si el comentario publicado lo ha publicado el propio bloguero. Si lo ha publicado el bloguero, no se enviará ninguna notificación recordatoria.
- `SITE_NAME`: nombre de tu sitio, se mostrará en el mensaje de notificación.
- `SITE_URL`: URL de tu sitio, se mostrará en el mensaje de notificación.
- `QQ_TEMPLATE`: plantilla de notificación usada por QQ. Las variables y los formatos específicos se encuentran en la plantilla de notificación que aparece más abajo. Si no se configura, se usa la plantilla predeterminada.

## Notificación por Telegram

Usamos un bot de Telegram para enviar notificaciones por Telegram. Debes establecer las siguientes variables de entorno.

- `TG_BOT_TOKEN`: token del bot de Telegram para acceder a la API HTTP. Crea un bot con [@BotFather](https://t.me/BotFather) para obtener este token. Es obligatorio para este servicio.
- `TG_CHAT_ID`: el `chat_id` del receptor. Puede ser un usuario, un canal o un grupo. [@userinfobot](https://t.me/userinfobot) mostrará este `chat_id` cuando le reenvíes un mensaje. Es obligatorio para este servicio.
- `AUTHOR_EMAIL`: el correo electrónico del bloguero se usa para distinguir si el comentario publicado lo ha publicado el propio bloguero. Si lo ha publicado el bloguero, no se enviará ninguna notificación recordatoria.
- `SITE_NAME`: nombre de tu sitio, se mostrará en el mensaje de notificación.
- `SITE_URL`: URL de tu sitio, se mostrará en el mensaje de notificación.
- `TG_TEMPLATE`: plantilla de notificación usada por Telegram. Las variables y los formatos específicos se encuentran en la plantilla de notificación que aparece más abajo. Si no se configura, se usa la plantilla predeterminada.

## Notificación por PushPlus

[pushplus](http://www.pushplus.plus/) es una plataforma de envío de mensajes que admite muchos canales como WeChat, WeChat Work, DingTalk, SMS o correo electrónico. Debes establecer las siguientes variables de entorno. Puedes consultar la [documentación de pushplus](http://www.pushplus.plus/doc/guide/api.html#%E4%B8%80%E3%80%81%E5%8F%91%E9%80%81%E6%B6%88%E6%81%AF%E6%8E%A5%E5%8F%A3) para ver más detalles sobre el formato de los parámetros.

- `PUSH_PLUS_KEY`: token del usuario. Es obligatorio para este servicio.
- `PUSH_PLUS_TOPIC`: ID del grupo. Si está vacío, se envía a ti mismo. Y no tiene efecto si `PUSH_PLUS_CHANNEL` es `webhook`.
- `PUSH_PLUS_TEMPLATE`: plantilla de envío
- `PUSH_PLUS_CHANNEL`: canal de envío
- `PUSH_PLUS_WEBHOOK`: el webhook es obligatorio si `PUSH_PLUS_CHANNEL` es `webhook` o `cp`.
- `PUSH_PLUS_CALLBACKURL`: URL de callback después de enviar la respuesta.
- `AUTHOR_EMAIL`: el correo electrónico del bloguero se usa para distinguir si el comentario publicado lo ha publicado el propio bloguero. Si lo ha publicado el bloguero, no se enviará ninguna notificación recordatoria.
- `SITE_NAME`: nombre de tu sitio, se mostrará en el mensaje de notificación.
- `SITE_URL`: URL de tu sitio, se mostrará en el mensaje de notificación.

## Notificación por Discord

Usamos Discord Webhook para enviar notificaciones por Discord. Debes establecer las siguientes variables de entorno.

- `DISCORD_WEBHOOK`: URL del Webhook de Discord, ¿[cómo crear una URL de Webhook de Discord](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)?
- `DISCORD_TEMPLATE`: plantilla de envío
- `AUTHOR_EMAIL`: el correo electrónico del bloguero se usa para distinguir si el comentario publicado lo ha publicado el propio bloguero. Si lo ha publicado el bloguero, no se enviará ninguna notificación recordatoria.
- `SITE_NAME`: nombre de tu sitio, se mostrará en el mensaje de notificación.
- `SITE_URL`: URL de tu sitio, se mostrará en el mensaje de notificación.

## Notificación por Lark

Usamos Lark Webhook para enviar las notificaciones de sus grupos. Se requieren las siguientes variables de entorno.

- `LARK_WEBHOOK`: bot de grupo de Lark [Webhook Usages](https://open.larksuite.com/document/ukTMukTMukTM/ucTM5YjL3ETO24yNxkjN?lang=en-US)
- `LARK_SECRET`: tal como aclara la documentación de Lark, este secreto se usa para firmar tu petición y evitar abusos (opcional).
- `LARK_TEMPLATE`: plantilla del mensaje
- `SITE_NAME`: nombre de tu sitio, que se mostrará en los mensajes de notificación.
- `SITE_URL`: URL de tu sitio, que se mostrará en los mensajes de notificación.

## Plantilla de notificación

Waline permite configurar plantillas de notificación personalizadas para cada plataforma por separado, lo que ofrece más posibilidades de personalización y compatibilidad con i18n.

### Variables admitidas

La plantilla recibe parámetros a través de los objetos `self`, `parent` y `site`, que contienen respectivamente las siguientes variables:

- `self`: el propio comentario

  | variable        | descripción                                |
  | --------------- | ------------------------------------------ |
  | nick            | Apodo del usuario que comenta              |
  | mail            | Correo electrónico del usuario que comenta |
  | link            | Sitio web del usuario que comenta          |
  | url             | Dirección del artículo                     |
  | comment         | Contenido del comentario                   |
  | browser         | Nombre del navegador                       |
  | os              | Nombre del sistema operativo               |
  | avatar          | Avatar                                     |
  | _commentLink_\* | Enlaces del comentario                     |

  \*: commentLink solo se proporciona en las notificaciones de Telegram y se encapsula automáticamente en formato Markdown.

- `parent`: comentario al que se responde (comentario padre).

  | variable | descripción                                |
  | -------- | ------------------------------------------ |
  | nick     | Apodo del usuario que comenta              |
  | mail     | Correo electrónico del usuario que comenta |
  | link     | Sitio web del usuario que comenta          |
  | browser  | Nombre del navegador                       |
  | os       | Nombre del sistema operativo               |
  | avatar   | Avatar                                     |
  | comment  | Contenido del comentario                   |

- `site`: configuración del sitio web

  | variable | descripción                       |
  | -------- | --------------------------------- |
  | name     | Nombre del sitio                  |
  | url      | URL del sitio                     |
  | postUrl  | Dirección completa del comentario |

### Plantilla predeterminada

Aquí tienes la plantilla predeterminada como referencia:

- MAIL_SUBJECT:

  ```plain
  {{parent.nick | safe}}，『{{site.name | safe}}』上的评论收到了回复
  ```

- MAIL_TEMPLATE:

```html
<div
  style="border-top:2px solid #12ADDB;box-shadow:0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;margin:50px auto;font-size:12px;"
>
  <h2
    style="border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;"
  >
    您在<a style="text-decoration:none;color: #12ADDB;" href="{{site.url}}" target="_blank"
      >{{site.name}}</a
    >上的评论有了新的回复
  </h2>
  {{parent.nick}} 同学，您曾发表评论：
  <div style="padding:0 12px 0 12px;margin-top:18px">
    <div style="background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;">
      {{parent.comment | safe}}
    </div>
    <p><strong>{{self.nick}}</strong>回复说：</p>
    <div style="background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;">
      {{self.comment | safe}}
    </div>
    <p>
      您可以点击<a
        style="text-decoration:none; color:#12addb"
        href="{{site.postUrl}}"
        target="_blank"
        >查看回复的完整內容</a
      >，欢迎再次光临<a
        style="text-decoration:none; color:#12addb"
        href="{{site.url}}"
        target="_blank"
        >{{site.name}}</a
      >。
    </p>
    <br />
  </div>
</div>
```

- MAIL_SUBJECT_ADMIN:

  ```plain
  {{site.name | safe}} 上有新评论了
  ```

- MAIL_TEMPLATE_ADMIN:

```html
<div
  style="border-top:2px solid #12ADDB;box-shadow:0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;margin:50px auto;font-size:12px;"
>
  <h2
    style="border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;"
  >
    您在<a style="text-decoration:none;color: #12ADDB;" href="{{site.url}}" target="_blank"
      >{{site.name}}</a
    >上的文章有了新的评论
  </h2>
  <p><strong>{{self.nick}}</strong>回复说：</p>
  <div style="background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;">
    {{self.comment | safe}}
  </div>
  <p>
    您可以点击<a style="text-decoration:none; color:#12addb" href="{{site.postUrl}}" target="_blank"
      >查看回复的完整內容</a
    >
  </p>
  <br />
</div>
```

- QQ_TEMPLATE:

  ```plain
  💬 {{site.name|safe}} 有新评论啦
  {{self.nick}} 评论道:
  {{self.comment}}
  邮箱: {{self.mail}}
  状态: {{self.status}}
  仅供评论预览，查看完整內容:
  {{site.postUrl}}
  ```

- TG_TEMPLATE:

  ````md
  💬 _[{{site.name}}]({{site.url}}) 有新评论啦_

  _{{self.nick}}_ 回复说:

  ```
  {{self.comment-}}
  ```

  {{-self.commentLink}}
  _邮箱: _\`{{self.mail}}\`
  _审核: _{{self.status}}

  仅供评论预览，点击[查看完整內容]({{site.postUrl}})
  ````

### Información adicional

1. El tamaño de las variables de entorno de Vercel está limitado a `4KB`, así que si tu plantilla es larga, deberías configurarla en el archivo de entrada principal; consulta [issue#106](https://github.com/walinejs/waline/issues/106).
1. La información concreta de las variables puede cambiar durante el desarrollo. Las descripciones de variables que aparecen aquí son solo orientativas. Consulta los ejemplos de código concretos para el contenido específico.
