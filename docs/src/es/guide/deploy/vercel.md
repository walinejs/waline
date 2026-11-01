---
title: Despliegue en Vercel
icon: vercel
order: 1
---

Hemos publicado el paquete `@waline/vercel` como paquete de servidor, y el despliegue en Vercel es también el método que más recomendamos.

<!-- more -->

## Cómo desplegar

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwalinejs%2Fwaline%2Ftree%2Fmain%2Fexample)

1. Haz clic en el botón azul de arriba y te redirigirá a Vercel para desplegar con la plantilla de Waline.

   ::: note

   Si aún no has iniciado sesión, te recomendamos hacerlo con GitHub.

   :::

1. Escribe el nombre de tu proyecto de Vercel y haz clic en `Create`.

   ![Create Project](../../../assets/vercel-1.png)

1. Vercel creará e inicializará automáticamente un repositorio con el nombre que acabas de escribir, basado en la plantilla de ejemplo de Waline.

   ![new project](../../../assets/vercel-2.png)

   Al cabo de uno o dos minutos, Vercel debería terminar el despliegue. Haz clic en el botón `Go to Dashboard` para ir al panel de tu aplicación.

   ![dashboard](../../../assets/vercel-3.png)

## Crear la base de datos

1. Haz clic en `Storage` en la parte superior para entrar en la página del servicio de almacenamiento y elige `Create Database`. En `Marketplace Database Providers`, selecciona `Neon` y haz clic en `Continue`.

   ![storage](../../../assets/vercel-5.png)

1. Se te pedirá que crees una cuenta de Neon. Elige `Accept and Create`. A continuación, selecciona la configuración del plan de base de datos, incluidos la región y la cuota. Puedes dejar los valores predeterminados y hacer clic en `Continue`.

   ![neon](../../../assets/vercel-6.png)

1. Define el nombre de la base de datos. Puedes mantener el predeterminado y hacer clic en `Continue`.

   ![neon](../../../assets/vercel-7.png)

1. Ahora la base de datos aparece en `Storage`. Haz clic en ella y elige `Open in Neon` para ir a Neon. En Neon, selecciona `SQL Editor` a la izquierda, pega en el editor el SQL de [waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql) y haz clic en `Run` para crear las tablas.

   ![neon](../../../assets/vercel-10.png)

   ![neon](../../../assets/vercel-11.png)

1. En unos instantes deberías ver un mensaje de éxito. Vuelve a Vercel, haz clic en `Deployments` y luego en `Redeploy` en el último despliegue para que la nueva configuración de la base de datos surta efecto.

   ![redeploy success](../../../assets/vercel-12.png)

1. Vercel te redirigirá a `Overview` y comenzará el despliegue. Cuando `STATUS` pase a `Ready`, haz clic en `Visit` para abrir el sitio desplegado. Esa URL es la dirección de tu servidor.

   ![visit](../../../assets/vercel-14.png)

## Asignar un dominio

1. Haz clic en <kbd>Settings</kbd> - <kbd>Domains</kbd> para ir a la página de configuración de dominios.

1. Escribe el dominio que quieres asignar y haz clic en el botón <kbd>Add</kbd>.

   ![Add domain](../../../assets/vercel-16.png)

1. Añade un nuevo registro `CNAME` en el servidor de tu servicio de dominios.

   | Tipo  | Nombre  | Valor                |
   | ----- | ------- | -------------------- |
   | CNAME | example | cname.vercel-dns.com |

1. Cuando surta efecto, podrás visitar Waline con tu propio dominio. :tada:
   - Sistema de comentarios: example.your-domain.com
   - Panel de administración: example.your-domain.com/ui

   ![success](../../../assets/vercel-17.png)

## Importar en HTML

Configura lo siguiente en tu página web:

1. Importa los estilos de Waline desde `https://unpkg.com/@waline/client@v3/dist/waline.css`.
2. Crea una etiqueta `<script>` que use `init()` de `https://unpkg.com/@waline/client@v3/dist/waline.js` y pásale las opciones obligatorias `el` y `serverURL`.
   - `el` es el elemento en el que se renderiza Waline. Puede ser una cadena de selector CSS o un HTMLElement.
   - `serverURL` es la dirección de tu servidor obtenida en el paso anterior.

```html {3-7,12-18}:line-numbers
<head>
  <!-- ... -->
  <link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css" />
  <!-- ... -->
</head>
<body>
  <!-- ... -->
  <div id="waline"></div>
  <script type="module">
    import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

    init({
      el: '#waline',
      serverURL: 'https://your-domain.vercel.app',
    });
  </script>
</body>
```

## Administración de comentarios

1. Después del despliegue, visita `<serverURL>/ui/register` para registrarte. El primer usuario registrado se convierte en administrador.
2. Una vez iniciada la sesión, el administrador puede gestionar los comentarios: editarlos, marcarlos o eliminarlos.
3. Los usuarios también pueden registrarse desde el cuadro de comentarios. Después de iniciar sesión, se les redirige a su página de perfil.
