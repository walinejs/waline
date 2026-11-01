---
title: Personalizar estilos
icon: style
order: -2
---

`@waline/client` proporciona algunas variables CSS. Con ellas puedes configurar fácilmente el estilo de Waline:

Además, `@waline/client` también incluye soporte para el modo oscuro.

<!-- more -->

## Soporte de modo oscuro

Puedes usar la opción `dark` para activar el soporte del modo oscuro de Waline.

Normalmente los sitios web activan el modo oscuro de dos maneras:

- Usar el selector `@media` para cambiar automáticamente según el estado del modo de color del dispositivo mediante `prefers-color-scheme`
- Aplicar dinámicamente otro estilo de color oscuro modificando los atributos y las clases del elemento raíz del DOM (`html` o `body`).

Si activas Waline en un sitio del primer tipo, solo tienes que establecer `dark` en `'auto'`.

Para el segundo tipo de sitio, debes establecer dark en el selector CSS que hace efectivo el modo oscuro. Aquí tienes algunos ejemplos:

::: tip Ejemplos

- **vuepress-theme-hop v2**: activa el modo oscuro estableciendo `data-theme="dark"` en la propia etiqueta `<html>`. Por lo tanto, debes establecer `'html[data-theme="dark"]'` como opción `dark`.

- **hexo-theme-fluid**: activa el modo oscuro estableciendo `data-user-color-scheme="dark"` en la propia etiqueta `<html>`. Por lo tanto, debes establecer `'html[data-user-color-scheme="dark"]'` como opción `dark`.

:::

## Iconos de metadatos

Si quieres añadir iconos a los metadatos de los comentarios de los usuarios, puedes importar `waline-meta.css` para usarlo.

Para los usuarios de CDN, puedes importarlo con el siguiente enlace:

```html
<!-- Meta icon (optional) -->
<link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline-meta.css" />
```

Para los usuarios de NPM, puedes importarlo con:

```js
import '@waline/client/meta';
```

## Soporte RTL

`@waline/client` admite el diseño RTL; solo tienes que añadir `dir="rtl"` en la etiqueta `<html>`.

## Personalizar estilos

### Variables CSS

Puedes encontrar los valores predeterminados de las variables CSS que usa Waline en modo normal y en modo oscuro en [Referencia del cliente → Variables CSS](../../reference/client/style.md).

Si difieren del estilo de tu sitio, puedes sobrescribir tú mismo la variable CSS correspondiente.

## Sombra de caja

Si usas un tema que utiliza sombras (`box-shadow`) en lugar de bordes, puedes modificar el efecto de visualización de Waline modificando `--waline-border` y `--waline-box-shadow`, por ejemplo:

```css
:root {
  --waline-border: none;
  --waline-box-shadow: 0 12px 40px rgb(134 151 168 / 25%);
}

@media (prefers-color-scheme: dark) {
  body {
    --waline-box-shadow: 0 12px 40px #0f0e0d;
  }
}
```

### Más

Si las variables CSS anteriores no cubren tus necesidades de personalización de los estilos de Waline, puedes escribir tu propio archivo CSS.
