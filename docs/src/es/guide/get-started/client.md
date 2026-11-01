---
title: Introducción al cliente
icon: client
order: 1
---

Waline ofrece oficialmente [`@waline/client`](https://www.npmjs.com/package/@waline/client), escrito en Vue + TypeScript y con solo 100 kb gzip.

## Importación

Puedes usar CDN o npm para importar el cliente de Waline; ofrecemos varias versiones de archivos para cubrir distintas situaciones.

Si tienes problemas durante el proceso, consulta:

- [Recetario → Importación por CDN](../../cookbook/import/cdn.md)
- [Recetario → Importación en un proyecto](../../cookbook/import/project.md)

## Usar Waline

La forma más sencilla de usar Waline es [seguir el método detallado en el inicio rápido](./README.md#importar-en-html): importa la función `init` de Waline e inicializa la instancia con `init(yourOptions)`.

Entre las opciones de `init`, `el` y `serverURL` son obligatorias. La primera es el elemento o el selector de elemento sobre el que se monta Waline, y la segunda es la dirección del servidor. Para ver todos los parámetros de inicialización de `@waline/client`, consulta [Referencia del cliente → API](../../reference/client/api.md).

## Contador de comentarios

`@waline/client` también ofrece un subpaquete para las estadísticas de comentarios. Puedes usarlo para mostrar el número de comentarios en la lista de artículos del blog u otras páginas que no contengan comentarios. Para más detalles, consulta [Funciones → Contador de comentarios](../features/comment.md).

## Contador de visitas a la página

Waline admite estadísticas de visitas a la página. Si no necesitas el servicio de comentarios pero quieres usar la función de visitas, Waline ofrece un plugin de estadísticas de visitas cuyo tamaño Gzip es inferior a 1 KB.

Para más información sobre el contador de visitas de `@waline/client`, consulta [Funciones → Contador de visitas a la página](../features/pageview.md)

## Soporte de formatos de comentario

`@waline/client` admite mucha sintaxis de comentarios y un formato enriquecido. Además de la sintaxis estándar de Markdown y las extensiones de GFM, los usuarios que comentan también pueden insertar etiquetas HTML, usar ecuaciones matemáticas y mucho más. Para el resto de sintaxis, consulta [Funciones → Sintaxis admitida](../features/syntax.md) para más detalles.

`@waline/client` también admite la vista previa en tiempo real de lo que se escribe en el cuadro de comentarios. Dicho esto, algunas funciones se omiten de forma predeterminada por el tamaño. Si quieres recuperarlas, consulta:

- [Recetario → Personalizar el resaltador de código de la vista previa](../../cookbook/customize/highlighter.md)
- [Recetario → Personalizar el renderizador de $\TeX$ de la vista previa](../../cookbook/customize/tex-renderer.md)

## Reacciones a los artículos

¿Te parecen demasiado engorrosos los comentarios? Waline permite a tus visitantes expresar rápidamente sus reacciones a los artículos, como me gusta, no me gusta, duda, aburrimiento, sorpresa, etc. Para activar esta función manualmente, consulta [Funciones → Reacciones a los artículos](../features/reaction.md) .

## Funciones de los comentarios

Waline admite varias funciones básicas, como iniciar sesión, avatares, [varios idiomas](../features/i18n.md) y vista previa en tiempo real.

Waline te permite establecer etiquetas de nivel de interacción y etiquetas personalizadas para tus usuarios. Para más detalles, consulta [Etiquetas de usuario](../features/label.md).

## Pestaña de emojis

`@waline/client` admite varias pestañas de emojis y permite a los usuarios añadirlas fácilmente mediante predefinidos. Además de los oficiales, puedes crear tus propios predefinidos fácilmente.

Para más información sobre las pestañas de emojis de `@waline/client`, consulta:

- [Funciones → Pestaña de emojis](../features/emoji.md)
- [Recetario → Personalizar emojis](../../cookbook/customize/emoji.md)

## Insertar imágenes

`@waline/client` incluye soporte para subir imágenes. De forma predeterminada, las imágenes se convierten a base64. Dicho esto, también puedes usar tu propio servicio de alojamiento de imágenes.

Para más información sobre la configuración de subida de imágenes de `@waline/client`, consulta [Recetario → Personalizar la subida de imágenes](../../cookbook/customize/upload-image.md).

## Búsqueda de emojis

`@waline/client` ofrece una función de búsqueda de memes y emojis a través de [giphy](https://giphy.com), y te permite personalizar el servicio de búsqueda. Consulta:

- [Funciones → Búsqueda de emojis](../features/search.md)
- [Recetario → Personalizar la búsqueda de emoticonos](../../cookbook/customize/search.md)

## Soporte multilingüe

`@waline/client` incluye soporte para varios idiomas, y a partir de él puedes añadir idiomas o modificar los textos de la interfaz. Consulta:

- [Funciones → Establecer el idioma](../features/i18n.md).
- [Recetario → Personalizar el idioma](../../cookbook/customize/locale.md).

## Soporte de accesibilidad

Waline es totalmente compatible con todos los estándares de accesibilidad:

- Todos los iconos y controles tienen sus etiquetas de accesibilidad correspondientes.
- Puedes interactuar con todos los controles de Waline con un teclado o con un dispositivo de puntero montado en la cabeza.

¡Esta es nuestra forma de apoyar a las personas con discapacidad visual y motriz de todo el mundo! :heart:

## Estilos personalizables

Waline incluye soporte de modo oscuro. Para que a los usuarios les resulte más fácil ajustar los estilos de Waline, ofrecemos muchas variables CSS configurables.

Consulta [Estilos personalizados](../features/style.md) para más detalles.

## Desarrollo avanzado

### Compatibilidad con aplicaciones de una sola página

Waline admite las SPA (**S**ingle **P**age **A**pplications).

Si quieres usar Waline en un sitio web o una aplicación basados en la API de historial, puedes usar el método `update()` de la instancia inicializada para refrescar la configuración del área de comentarios, o el método `destroy()` de la instancia para destruir Waline. Para saber más sobre la reactividad de `@waline/client`, consulta [Recetario → Reactividad](../../cookbook/reactivity.md).

### Ecosistema

Puedes usar Waline fácilmente a través de plugins en herramientas como Hexo, VuePress e incluso clientes de terceros.

Para ver los clientes de terceros, temas y plugins que admiten Waline, consulta [Saber más → Ecosistema](../../advanced/ecosystem.md).
