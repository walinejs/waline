---
title: Búsqueda de emoticonos
icon: search
order: 3
---

`@waline/client` permite a los usuarios añadir servicios de búsqueda de emojis y personalizar esta función.

De forma predeterminada, `@waline/client` ofrece un servicio de búsqueda de memes a través de [Giphy](https://giphy.com/). Esto te permite buscar imágenes y añadirlas al comentario.

<!-- more -->

## Desactivar

Si no necesitas el servicio de búsqueda de imágenes predeterminado, puedes desactivarlo estableciendo la opción `search` en `false`.

```js
Waline.init({
  el: '#waline',
  // ...
  search: false,
});
```

## Personalizar

Puedes personalizar el servicio de búsqueda de imágenes mediante la opción search.

En cada operación debes devolver un array con la información de las imágenes como resultado de la búsqueda, y cada elemento debe ser un objeto con las siguientes propiedades:

- `src`: la dirección del enlace de la imagen
- `title`: el título y el texto alternativo de la imagen (opcional)
- `preview`: la miniatura de la imagen que se usará en la lista de resultados (opcional)

La opción acepta tres funciones, cada una de las cuales debe devolver una Promise, y el resultado es el array de resultados de búsqueda anterior.

- `search`: operación de búsqueda; el término de búsqueda se pasa como primer parámetro de la función
- `default`: lista de imágenes que se muestran de forma predeterminada (opcional)
- `more`: función que se ejecuta cuando la lista de imágenes se desplaza hasta el final, donde el término de búsqueda y el número actual se pasan como los dos primeros parámetros (opcional)

Para tutoriales sobre la búsqueda personalizada, consulta [Recetario → Búsqueda de emojis personalizada](../../cookbook/customize/search.md).
