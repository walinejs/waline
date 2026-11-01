---
title: Preguntas frecuentes
icon: faq
order: 4
---

Waline tiene una posición muy clara desde su nacimiento:

::: info Un sistema de comentarios simple con backend.

:::

Todas las versiones publicadas después son modificaciones hechas en torno a esta posición.

## ¿Cuál es la relación con Valine?

::: info Waline = Valine con backend

:::

Tomando como referencia la versión de código abierto de Valine, la lista de comentarios del frontend se reescribió con React. El estilo y la estructura, así como algunas herramientas y métodos internos, provienen de Valine.

## ¿Todavía necesito desplegar Valine-Admin en LeanCloud?

No. Waline es un despliegue tres en uno de almacenamiento de datos, servidor y cliente. La interfaz del servidor ya equivale al motor en la nube de LeanCloud de Valine. El servidor ya incluye la gestión de comentarios y las notificaciones por correo que ofrecía el anterior motor en la nube. No necesita el motor en la nube de LeanCloud adicional, por lo que no estará restringido por la estrategia de suspensión del motor en la nube de LeanCloud.

## ¿Cómo puedo actualizar?

Waline se compone principalmente de dos partes: el frontend y el servidor.

### Frontend

El frontend inserta la lista de comentarios y la caja de comentarios incluyendo scripts JS en la página web. En la mayoría de los casos, el enlace usará la dirección de la última versión del CDN en línea y la última versión se aplicará automáticamente, sin que los usuarios tengan que actualizar manualmente.

::: note Es necesario actualizar manualmente en las siguientes situaciones

1. El número de versión se especifica de forma forzada en la dirección del CDN. En este caso, debes modificar manualmente el número de versión al más reciente.
1. Usas NPM para requerir el módulo y empaquetarlo en el código. En este caso, debes modificar el número de versión en la dependencia para asegurarte de obtener la última versión durante la instalación.

:::

### Servidor

El servidor se refiere al servicio de backend correspondiente al `serverURL` configurado en el script del frontend, y su actualización será algo diferente según el entorno de despliegue. Las actualizaciones del servidor serán más frecuentes.

#### Vercel

Ve al repositorio de GitHub correspondiente y modifica el número de versión de `@waline/vercel` en el archivo package.json al más reciente.

![vercel](./assets/vercel-update.png)

#### CloudBase

Entra en la página de edición de código y haz clic en <kbd>Save and reinstall dependencies</kbd>. Si sigue sin funcionar, entra en <kbd>My Application</kbd> y selecciona <kbd>Deploy</kbd> para volver a desplegar.

::: caution

Un nuevo despliegue borrará los archivos anteriores. Si hay alguna configuración en los archivos anteriores, primero hay que hacer una copia de seguridad.

:::

![cloudBase](./assets/cloudbase-update.jpg)

#### Docker

Ejecuta `docker pull lizheming/waline` directamente para descargar la última imagen.

## ¿Por qué publicar comentarios es lento?

Por algunas razones técnicas, la detección de spam y las notificaciones de comentarios son operaciones en serie al publicar un comentario. La detección de spam usa el servicio que ofrece Akismet en el extranjero, cuyo acceso puede ser lento. Los usuarios pueden desactivar la detección de spam mediante la variable de entorno `AKISMET_KEY=false`. Además del servicio de detección de spam, la notificación por correo dentro de las notificaciones de comentarios también puede provocar un tiempo de espera agotado. Puedes desactivar la notificación de comentarios para comprobar si es esta función la que lo causa.
