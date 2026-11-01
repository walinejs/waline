---
title: Comenzar
icon: creative
dir:
  collapsible: false
  order: 1
---

Te damos la bienvenida a Waline. En solo unos pasos puedes activar Waline para que ofrezca comentarios y visitas a la página en tu sitio.

<!-- more -->

## Despliegue del servidor

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwalinejs%2Fwaline%2Ftree%2Fmain%2Fexample)

1. Haz clic en el botón de arriba para ir a Vercel y desplegar el servidor.

   ::: note

   Si no has iniciado sesión, Vercel te pedirá que te registres o inicies sesión. Usa tu cuenta de GitHub para iniciar sesión rápidamente.

   :::

1. Introduce el nombre de proyecto de Vercel que quieras y haz clic en `Create` para continuar:

   ![create](../../../assets/vercel-1.png)

1. Vercel creará e inicializará ahora un nuevo repositorio basado en la plantilla de Waline. El nombre del repositorio será el nombre del proyecto que acabas de introducir.

   ![deploy](../../../assets/vercel-2.png)

   Después de uno o dos minutos aparecerán fuegos artificiales en la pantalla para celebrar que el despliegue se ha realizado correctamente. Haz clic en `Go to Dashboard` para ir al panel de la aplicación.

   ![deploy](../../../assets/vercel-3.png)

## Crear una base de datos

1. Haz clic en `Storage` en la parte superior para entrar en la página de configuración del almacenamiento y elige `Create Database`. Selecciona `Neon` como `Marketplace Database Providers` y haz clic en `Continue` para continuar.

   ![neon](../../../assets/vercel-5.png)

1. Se te pedirá que crees una cuenta de Neon. Haz clic en `Accept and Create` para aceptarla y crearla. A continuación elegirás el plan de la base de datos, incluidos la región y la cuota. Puedes dejarlo todo con los valores predeterminados y hacer clic en `Continue`.

   ![neon](../../../assets/vercel-6.png)

1. Luego se te pedirá que definas el nombre de la base de datos. También puedes dejarlo como está y hacer clic en `Continue`.

   ![neon](../../../assets/vercel-7.png)

1. Ahora deberías ver el servicio de base de datos que acabas de crear en `Storage`. Haz clic en él y selecciona `Open in Neon` para ir a Neon. En la interfaz de Neon, elige `SQL Editor` en la barra lateral izquierda, pega las sentencias SQL de [waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql) en el editor y haz clic en `Run` para crear las tablas.

   ![neon](../../../assets/vercel-10.png)

   ![neon](../../../assets/vercel-11.png)

1. Al cabo de un momento se te notificará que la creación se ha realizado correctamente. Vuelve a Vercel, haz clic en `Deployments` en la parte superior y haz clic en el botón `Redeploy` a la derecha del último despliegue. Este paso garantiza que el servicio de base de datos recién configurado surta efecto.

   ![redeploy success](../../../assets/vercel-12.png)

1. Se te redirigirá a la página `Overview` y el despliegue comenzará. Al cabo de un momento, el `STATUS` cambiará a `Ready`. Haz clic en `Visit` para abrir el sitio web desplegado. Esta URL es la dirección de tu servidor.

   ![visit](../../../assets/vercel-14.png)

## Vincular un dominio personalizado

1. Haz clic en `Settings` → `Domains` en la parte superior para entrar en la página de configuración de dominios.

1. Introduce el dominio que quieres vincular y haz clic en `Add`.

   ![Add domain](../../../assets/vercel-16.png)

1. Añade un nuevo registro `CNAME` en tu proveedor de dominios:

   | Tipo  | Nombre  | Valor                |
   | ----- | ------- | -------------------- |
   | CNAME | example | cname.vercel-dns.com |

1. Espera a que el registro DNS surta efecto. Después podrás acceder a Waline con tu propio dominio 🎉
   - Sistema de comentarios: example.yourdomain.com
   - Administración de comentarios: example.yourdomain.com/ui

   ![success](../../../assets/vercel-17.png)

## Importar en HTML

Así es como puedes añadir Waline a tu página web o sitio web:

1. Importa la hoja de estilos `https://unpkg.com/@waline/client@v3/dist/waline.css` en el `<head>`

1. Crea una etiqueta `<script>` e inicializa con `init()` de `https://unpkg.com/@waline/client@v3/dist/waline.js`, pasando las opciones `el` y `serverURL` necesarias.
   - La opción `el` es el elemento que se usa para renderizar Waline. Puedes indicar un selector CSS en forma de cadena o un objeto HTMLElement.
   - `serverURL` es el enlace a tu servidor desplegado, el que acabas de crear en Vercel.
   - Para más opciones, visita la [página de propiedades del componente](https://waline.js.org/es/reference/client/props.html)

   Aquí tienes un ejemplo:

   ```html {3-7,12-18}:line-numbers
   <head>
     <!-- ... -->
     <link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css" />
   </head>
   <body>
     <!-- ... -->
     <div id="waline"></div>
     <script type="module">
       import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

       init({
         el: '#waline',
         serverURL: 'https://your-domain.vercel.app',
         lang: 'en',
       });
     </script>
   </body>
   ```

1. El servicio de comentarios ya funcionará correctamente en tu sitio web :tada:!

## Administración de comentarios (Gestión)

1. Cuando el despliegue haya terminado, visita `<serverURL>/ui/register` para registrarte. La primera persona que se registre será establecida como administrador.

1. Después de iniciar sesión como administrador, podrás acceder al panel de administración de comentarios. Aquí puedes editar, marcar o eliminar comentarios.

1. Los usuarios también pueden crear una cuenta desde el cuadro de comentarios; al iniciar sesión serán redirigidos a su página de perfil.

## Tutorial en vídeo

Un entusiasta de Waline hizo el siguiente tutorial en vídeo. Si las instrucciones anteriores no están claras, puedes consultar el vídeo:

<VidStack src="https://www.youtube.com/watch?v=SzEHzsme8uY" />
