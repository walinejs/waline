---
title: Crear tus propios presets de emoji
icon: emoji
---

Esta receta te mostrará cómo crear y usar tus propios presets de emoji.

<!-- more -->

## Crear tus propios presets

Antes que nada, necesitas preparar algunas imágenes de emoji. Después, sigue estos pasos para crear tu preset.

### Nombrar los emojis y subirlos

Por simplicidad, Waline usa directamente el nombre de la imagen del emoji como clave del emoji. Esto significa que si importas dos presets distintos y ambos contienen una imagen laugh.png, los dos emoticonos corresponderán al mismo emoji `:laugh:`.

Por eso, la mejor práctica es que cada creador de presets de emoji añada a todos los nombres de sus archivos de emoji un prefijo relacionado con el nombre del preset.

Una vez que les hayas dado nombres adecuados, debes subirlos a tu servidor.

### Escribir la información del preset

Suponemos que has colocado algunas imágenes de emoji en el directorio `

```
https://example.com/my-emoji/
├─ my_laugh.png
├─ my_cute.png
├─ my_rage.png
├─ my_sob.png
└─ info.json
```

Además, deberás crear un archivo `info.json` en esa carpeta para que Waline sepa qué emojis contiene el preset.

Primero, asigna un nombre al preset de emoji, por ejemplo `My Emoji`; como has establecido el prefijo `my_` para las imágenes y los archivos están en formato `png`, debes indicarlo en `info.json`.

Tu `info.json` puede ser:

```json
{
  "name": "My Emoji",
  "prefix": "my_",
  "type": "png"
}
```

Después, enumera todos los nombres de emoji en `items` en el orden que quieras; recuerda omitir el prefijo y el sufijo que definiste en `prefix` y `type`.

```json
{
  "name": "My Emoji",
  "prefix": "my_",
  "type": "png",
  "icon": "cute"
}
```

A continuación, elige un emoji representativo como icono que se mostrará en la pestaña:

```json
{
  "name": "My Emoji",
  "prefix": "my_",
  "type": "png",
  "icon": "cute",
  "items": ["laugh", "sob", "rage", "cute"]
}
```

Con esto ya has terminado de escribir `info.json`; súbelo a la misma carpeta.

Ahora has creado correctamente un preset `my-emoji` con `https://example.com/my-emoji/'`.

## Usar un espejo de GitHub con etiquetas

Normalmente puede resultarte algo engorroso tener tu propio dominio y subir las imágenes a él, además de que los enlaces pueden caducar con el tiempo; por eso, un enfoque más avanzado consiste en usar un repositorio de GitHub y las etiquetas de git para que el repositorio de GitHub sirva de espejo de un preset de emoji.

De forma similar a los pasos anteriores, debes crear un repositorio de GitHub, nombrar los emojis como se indicó arriba, crear `info.json` con los mismos pasos y subir todo al repositorio.

Después, crea una etiqueta para el repositorio; recomendamos usar el formato `vx.x.x`, por ejemplo `v1.0.0`.

Una vez añadidas las etiquetas, puedes usar como preset el enlace de CDN con la versión de [cdn.jsdelivr.net](https://www.jsdelivr.com/), con el formato `https://cdn.jsdelivr.net/gh/user/repo@version/file`.

Supongamos que has creado el repositorio `example/emoji`, has subido directamente las imágenes de emoji y `info.json`, y has creado la etiqueta `v1.0.0`; entonces puedes usar `https://cdn.jsdelivr.net/gh/example/emoji@v1.0.0/` como preset.

::: tip

Es necesario especificar una etiqueta en el enlace para evitar que los enlaces de imagen a los que hacen referencia los comentarios antiguos dejen de funcionar al modificar tu preset.

El preset oficial de emojis se consigue creando el repositorio [walinejs/emojis](https://github.com/walinejs/emojis) y usando el enlace de CDN. Actualmente usamos la versión `v1.1.0`.

:::

::: warning

Como cdn.jsdelivr.net está contaminado en China, puedes reemplazar `cdn.jsdelivr.net` por `gcore.jsdelivr.net`

:::

## Usar objetos de configuración

De forma similar al apartado anterior, supongamos que tienes la siguiente estructura de archivos:

```
https://example.com/my-emoji/
├─ my_laugh.png
├─ my_cute.png
├─ my_rage.png
└─ my_sob.png
```

Además de crear y subir un `info.json` y usar un enlace como preset, también puedes usar directamente los siguientes objetos como preset:

```js
{
  name: "My Emoji",
  folder: "https://example.com/my-emoji",
  prefix: "my_",
  type: "png",
  icon: "cute",
  items: ["laugh", "sob", "rage", "cute"]
}
```

Aquí añadimos además la propiedad `folder` para indicarle a Waline dónde están almacenadas las imágenes.
