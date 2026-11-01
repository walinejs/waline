---
title: Despliegue en Netlify
icon: netlify
---

[Netlify](https://netlify.com) es un conocido proveedor de servicios de despliegue de sitios web estáticos, y [Edge Functions](https://www.netlify.com/blog/edge-functions-explained/) es un servicio lanzado por Netlify que permite ejecutar código JavaScript en los nodos perimetrales de los sitios web.

<!-- more -->

## Cómo desplegar

Haz clic en el botón [Fork](https://github.com/walinejs/netlify-starter/fork) para crear un proyecto inicial de Netlify.

![netlify](../../../assets/netlify-1.png)

Inicia sesión en <https://app.netlify.com> en la consola de Netlify y selecciona <kbd>Add new site</kbd> - <kbd>Import an exist project</kbd> para añadir el sitio. Selecciona GitHub para poder leer la lista de tus proyectos de GitHub. Busca en la lista el nombre del repositorio generado por el fork que acabas de hacer y haz clic en el proyecto para empezar a crear tu sitio de Netlify a partir de ese repositorio.

![netlify](../../../assets/netlify-2.png) ![netlify](../../../assets/netlify-3.png)

Antes de crear el sitio de Netlify hay que rellenar cierta información de configuración. Aparte de las variables de entorno, el resto puedes dejarlo con los valores predeterminados. Consulta [Soporte para múltiples bases de datos](../database.md) para añadir las variables de entorno del servicio de almacenamiento correspondiente y, después, haz clic en <kbd>Deploy site</kbd> en la parte inferior para empezar a desplegar el sitio.

![netlify](../../../assets/netlify-4.png)

Al cabo de un momento tu sitio de Netlify estará desplegado. Puedes hacer clic en <kbd>Functions</kbd> en la barra de navegación superior para ir a la lista de funciones en la nube, donde `comment` es el servicio Waline que acabas de desplegar. Haz clic en él para entrar en la página de detalles de la función.

![netlify](../../../assets/netlify-5.png)

En la página de detalles, la dirección que aparece en `Endpoint` es la dirección de despliegue de tu servicio Waline. Haz clic en el botón de copiar de la derecha, ábrela en una pestaña nueva y prueba a publicar un comentario: verás que todo funciona. A continuación, configura este dominio en el cliente y podrás comentar tranquilamente.

![netlify](../../../assets/netlify-6.png) ![netlify](../../../assets/netlify-8.png)

## Cómo actualizar

Ve al repositorio de GitHub y cambia el número de versión de `@waline/vercel` en el archivo package.json a la última versión.

## Cómo modificar las variables de entorno

Haz clic en la barra de navegación `Site settings` de la parte superior, elige `Environments variables` en la barra lateral y entra en la página de gestión de variables de entorno. Haz clic en el botón `Add a variable` para añadir una variable de entorno.

Después de editar las variables de entorno, entra en la página `Deploys`, selecciona `Trigger deploy` - `Deploy site` para volver a desplegar el sitio y hacer que las variables de entorno surtan efecto.

![netlify](../../../assets/netlify-9.png) ![netlify](../../../assets/netlify-10.png)
