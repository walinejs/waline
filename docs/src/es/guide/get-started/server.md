---
title: Introducción al servidor
icon: server
order: 2
---

## Despliegue

Además de desplegar en Vercel de forma gratuita, puedes desplegar mediante Docker o directamente en un entorno autoalojado, así como en otras plataformas en la nube habituales. Para más información, consulta:

- [Despliegue independiente](../deploy/vps.md)

- [Railway](../deploy/railway.md)

- [Alibaba Cloud Compute Nest](../deploy/aliyun-computenest.md)

## Soporte de múltiples bases de datos

Waline admite varias bases de datos, incluidas MySQL, PostgreSQL, SQLite y MongoDB.

Solo tienes que configurar las variables de entorno de la base de datos correspondiente y Waline cambiará automáticamente al servicio de almacenamiento de datos adecuado.

Consulta [soporte de múltiples bases de datos](../database.md) para más detalles.

## Configuración

La mayor parte de la configuración del servidor se puede hacer mediante variables de entorno, y también puedes configurar algunas opciones avanzadas en el archivo de entrada principal.

Para ver los detalles de la configuración, consulta [Referencia del servidor → Variables de entorno](../../reference/server/env.md) y [Referencia del servidor → Configuración](../../reference/server/ config.md).

## Notificación de comentarios

Admitimos varias formas de notificarte a ti o a tus usuarios que comentan cuando alguien comenta o responde. Consulta [Notificaciones de comentarios](../features/notification.md) para más detalles.

## Registro de cuentas de usuario e inicio de sesión social

Waline admite la creación de cuentas dentro de la aplicación y el inicio de sesión social con GitHub, Twitter y Facebook.

::: tip

Atento a las novedades: tenemos previsto añadir compatibilidad con más aplicaciones sociales en futuras versiones.

:::
