---
title: Contador de visitas a la página
icon: counter
order: 7
---

Waline admite el conteo de visitas a la página.

<!-- more -->

## Usar junto con los comentarios

Si usas el servicio de comentarios de Waline, puedes activar las estadísticas de visitas a la página estableciendo la opción `pageview` en `true` durante la inicialización:

```js
Waline.init({
  el: '#waline',
  // ...
  pageview: true, // pageview statistics
});
```

Waline buscará automáticamente en la página los elementos cuyo valor de `class` es `waline-pageview-count` y tomará su `data-path` como condición de consulta. Después los rellena con el valor obtenido:

Si necesitas un selector diferente, puedes establecer la opción `pageview` con ese selector.

```html
<!-- data-path will be the query condition -->
Pageviews: <span class="waline-pageview-count" data-path="<Your/Path/Name>"></span>
```

Cada vez que llames a `WalineInstance.update()`, Waline volverá a buscar en el contenido de la página y actualizará automáticamente las visitas.

::: tip Ejemplos

```html
The current page has been viewed
<span class="waline-pageview-count" data-path="/es/guide/client/count.html" />
times.
```

Esta página ha sido visitada <span class="waline-pageview-count" data-path="/es/guide/client/count.html" /> veces.

:::

## Uso independiente

Si solo necesitas la función de estadísticas de visitas a la página, puedes importar el módulo pageview que ofrece Waline, cuyo tamaño Gzip es inferior a 1 KB.

```html
<ul>
  <li>
    Current page views:
    <span class="waline-pageview-count" />
  </li>
  <li>
    Page Views:
    <span class="waline-pageview-count" data-path="/" />
  </li>
</ul>
<script type="module">
  import { pageviewCount } from 'https://unpkg.com/@waline/client@v3/dist/pageview.js';

  pageviewCount({
    serverURL: '<YOUR_SERVER_URL>',
    path: window.location.pathname,

    // optional, for custom selectors, defaults to `'.waline-pageview-count'`
    // selector: 'waline-pageview-count',

    // optional, whether to increase the number of visits when fetching, the default is `true`
    // update: true,
  });
</script>
```

- Visitas de la página actual: <span class="waline-pageview-count" />

- Visitas de la página de inicio: <span class="waline-pageview-count" data-path="/" />

::: info Cancelar

Como la obtención de las visitas es una operación de red asíncrona, en determinadas circunstancias puede que necesites cancelar una actualización de visitas en curso.

`pageviewCount` devuelve una función que puedes llamar para cancelar la actualización:

```html
<script type="module">
  import { pageviewCount } from 'https://unpkg.com/@waline/client@v3/dist/pageview.js';

  const abort = Waline.pageviewCount({
    serverURL: '<YOUR_SERVER_URL>',
    path: window.location.pathname,
  });

  // After 500ms, if the network request has not been completed, cancel this operation
  setTimeout(() => abort(), 500);
</script>
```

:::
