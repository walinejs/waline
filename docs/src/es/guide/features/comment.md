---
title: Contador de comentarios
icon: counter
order: 8
---

Waline te permite mostrar el número de comentarios por separado, fuera del área de comentarios.

<!-- more -->

## Actualización automática

Puedes activar el conteo de comentarios en la función `init` estableciendo la opción `comment` en `true`.

```html
<script type="module">
  import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

  init({
    el: '#waline',
    // ...
    comment: true, // enable comment counting
  });
</script>
```

Waline intentará rellenar o actualizar el número de comentarios cada vez que llames a la función `init` o actualices la ruta.

Waline busca en la página los elementos que tienen la clase `waline-comment-count` y toma su atributo `data-path` como condición de consulta. Después los rellena con el valor obtenido:

```html
<!-- data-path will be the query condition -->
<span data-path="<Your/Path/Name>" class="waline-comment-count" /> comments
```

Si necesitas un selector diferente, puedes establecer la opción `comment` con ese selector.

Cada vez que llames a `WalineInstance.update()`, Waline buscará en el contenido de la página y actualizará automáticamente el contador de comentarios.

::: tip Ejemplos

```html
The current page has <span class="waline-comment-count" /> comments, the home page has
<span data-path="/es/" class="waline-comment-count" /> comments.
```

Esta página tiene <span class="waline-comment-count" /> comentarios y la página de inicio tiene <span data-path="/es/" class="waline-comment-count" /> comentarios.

:::

## Actualización manual

Además de actualizar automáticamente mediante la función `init`, puedes actualizar manualmente el número de comentarios de la página actual con la API `commentCount`:

```html
<script type="module">
  import { commentCount } from 'https://unpkg.com/@waline/client@v3/dist/comment.js';

  commentCount({
    serverURL,
    path,

    // optional, for custom selectors, defaults to `'.waline-pageview-count'`
    // selector: '.waline-pageview-count',
  });
</script>
```

::: info Cancelar

Como la obtención del número de comentarios es una operación de red asíncrona, en algunas circunstancias puede que necesites cancelar una actualización de comentarios en curso.

`commentCount` devuelve una función que puedes llamar para cancelar la actualización:

```js
const abort = Waline.commentCount({
  serverURL: '<YOUR_SERVER_URL>',
  path: window.location.pathname,
});

// After 500ms, if the network request has not been completed, cancel this operation
setTimeout(() => abort(), 500);
```

:::

## Importar solo el contador

A veces puedes querer mostrar el número de comentarios de algunas páginas en la lista de artículos o en la página de inicio, pero sin cargar Waline completo. En ese caso puedes usar el módulo `comment`, con un tamaño Gzip inferior a 1 KB:

```html
<script type="module">
  import { commentCount } from 'https://unpkg.com/@waline/client@v3/dist/comment.js';

  commentCount({
    serverURL,
    path,

    // optional, for custom selectors, defaults to `'.waline-pageview-count'`
    // selector: '.waline-pageview-count',
  });
</script>
```

<script setup>
import { walineOptions } from '@source/.vuepress/client.ts'
import { commentCount } from '@waline/client/comment'
import { onMounted } from 'vue'
import { useRoute } from 'vuepress/client'

const { serverURL } = walineOptions
const route = useRoute()

onMounted(()=>{
  commentCount({
    serverURL: serverURL,
    path: route.path,
  })
})
</script>
