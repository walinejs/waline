---
title: Importar Waline desde un CDN
icon: import
order: 1
---

Este recetario explica cómo importar Waline mediante un CDN.

<!-- more -->

Para los usuarios de China continental, recomendamos usar [unpkg](https://unpkg.com/@waline/client). Para los usuarios del resto del mundo, recomendamos usar jsDelivr.

Para que Waline sea compatible con SSR, en la versión V2 separamos los estilos de Waline. Esto significa que debes importar el archivo de estilos CSS de Waline y, por otro lado, importar el archivo de script de Waline y llamarlo.

## Comentarios

Normalmente querrás que Waline muestre una lista de comentarios; en ese caso puedes importarlo así:

```html
<!-- style file -->
<link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css" />
<!-- script file -->
<script type="module">
  import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

  init({
    // options
  });
</script>
```

## Visitas y comentarios

A veces querrás mostrar el número de visitas y de comentarios del artículo en la página de inicio o en la lista de artículos, sin cargar el componente de comentarios; para eso puedes importar un archivo de script Gzip < 1KB de las siguientes formas:

Visitas:

```html
<script type="module">
  import { pageviewCount } from 'https://unpkg.com/@waline/client@v3/dist/pageview.js';

  pageviewCount({
    // options
  });
</script>
```

Recuento de comentarios:

```html
<script type="module">
  import { commentCount } from 'https://unpkg.com/@waline/client@v3/dist/comment.js';

  commentCount({
    // options
  });
</script>
```

## Más información

::: info Especificar la versión

Habrás notado que en los casos anteriores declaramos explícitamente la versión `@v2` después de `@aline/client`. Si no lo haces, tu sitio web no funcionará correctamente.

:::
