---
title: Importar Waline desde un CDN
icon: import
order: 1
---

Este recetario explica cómo importar Waline mediante un CDN.

<!-- more -->

Para los usuarios de China continental, recomendamos usar [unpkg](https://unpkg.com/@waline/client). Para los usuarios del resto del mundo, recomendamos usar jsDelivr.

Desde la V3, Waline proporciona sus estilos en un archivo CSS independiente para que el cliente sea compatible con SSR. Esto significa que debes importar el archivo de estilos CSS de Waline y, después, importar el archivo de script de Waline y llamarlo.

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

Habrás notado que en los ejemplos anteriores declaramos explícitamente la versión `@v3` después de `@waline/client`. Esto es recomendable porque evita que tu sitio web se rompa cuando se publique una nueva versión principal del cliente de Waline.

:::
