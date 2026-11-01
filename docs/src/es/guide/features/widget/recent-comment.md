---
title: Widget de comentarios recientes
icon: recent
---

Waline admite mostrar los comentarios recientes mediante un widget, lo que resulta cómodo para mostrar los últimos comentarios en la barra lateral del blog.

<!-- more -->

## Opciones del componente

El widget de comentarios recientes se llama `RecentComments` y tiene tres opciones:

- `el` (opcional): el elemento donde se va a montar
- `serverURL`: enlace del servidor
- `count` el número de comentarios recientes que se deben obtener

El formato de datos que devuelve el componente debe ser `Promise<{ comment: WalineComment[], destroy: () => void }>`.

- propiedad `comment`: un array con los comentarios más recientes, con exactamente `count` elementos
- método `destroy`: una función que destruye el widget

## Uso básico

```html
<div id="waline-recent"></div>
<script type="module">
  import { RecentComments } from 'https://cdn.jsdelivr.net/npm/@waline/client@v3/dist/waline.js';

  RecentComments({
    el: '#waline-recent',
    serverURL: 'http://waline.vercel.app',
    count: 10,
  });
</script>
```

::: tip

Esto se renderizará en `#waline-recent` con el estilo predeterminado.

:::

## Uso avanzado

Si no te convence el formato de salida predeterminado, puedes llamar al componente omitiendo la opción `el` para obtener los datos y renderizarlos tú mismo.

Ejemplo:

```html
<div id="waline-recent"></div>
<script type="module">
  import { RecentComments } from 'https://cdn.jsdelivr.net/npm/@waline/client@v3/dist/waline.js';

  RecentComments({
    serverURL: 'http://waline.vercel.app',
    count: 10,
  }).then(({ comments }) => {
    document.getElementById('waline-recent').innerHTML = comments.map(
      (comment) => `${comment.nick}: ${comment.comment}`,
    );
  });
</script>
```
