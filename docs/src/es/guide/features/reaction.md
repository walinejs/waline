---
title: Reacciones a los artículos
icon: reaction
order: 4
---

Waline permite a los usuarios expresar reacciones sobre el contenido de los artículos.

<!-- more -->

## Primeros pasos

Para activar rápidamente las reacciones, puedes establecer la opción `reaction` en `true` para mostrar una lista predeterminada de reacciones:

```js
Waline.init({
  el: '#waline',
  // ...
  reaction: true, // start the reaction
});
```

Waline mostrará la lista predeterminada de reacciones encima del cuadro de comentarios.

## Personalizar reacciones

Si necesitas personalizar estos emoticonos de reacción, puedes pasar un array con los enlaces de las imágenes de los emoticonos de reacción, que representan las reacciones entre las que quieres que elija el usuario:

```js
Waline.init({
  el: '#waline',
  // ...
  reaction: [
    'https://unpkg.com/@waline/emojis@1.1.0/weibo/weibo_heart_eyes.png',
    'https://unpkg.com/@waline/emojis@1.1.0/weibo/weibo_dog_joy.png',
    'https://unpkg.com/@waline/emojis@1.1.0/weibo/weibo_dog_consider.png',
    'https://unpkg.com/@waline/emojis@1.1.0/weibo/weibo_sob.png',
  ],
});
```

Además, puedes personalizar el título de las reacciones mediante `reactionTitle` en `locale`, y también puedes personalizar el nombre de cada expresión de reacción mediante `reaction0` a `reaction8`; consulta [Configuración multilingüe](./i18n.md) .

## Precauciones

::: tip Límite de cantidad

Waline admite hasta 9 reacciones, y puedes añadir menos de 9 sin ningún problema.

:::

::: warning Reglas de conteo

El conteo de las reacciones se basa en la posición.

Si necesitas reordenar y ajustar las reacciones, consulta [#1451](https://github.com/walinejs/waline/issues/1451#issuecomment-1264555264) para más detalles.

:::
