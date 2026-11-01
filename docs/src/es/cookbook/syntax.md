---
title: Compatibilidad de formatos de comentario
icon: format
order: 2
---

La sintaxis de Markdown compatible con los comentarios es la siguiente.

<!-- more -->

## Compatibilidad con Markdown

::: preview Encabezados

<!-- markdownlint-disable MD025 -->

# Encabezado 1

<!-- markdownlint-enable MD025 -->

## Encabezado 2

### Encabezado 3

#### Encabezado 4

##### Encabezado 5

###### Encabezado 7

:::

::: preview Texto

Esta frase tiene texto en **negrita**, _cursiva_ y ~~tachado~~.

:::

::: preview Párrafo

Este es un párrafo.

Este es otro párrafo.

:::

::: details Salto de línea

Me gustaría hacer un salto de línea  
en este punto

```md
I would like to line break at  
this point
```

:::

::: preview Citas

> Las citas también se pueden anidar...
>
> > ...usando signos de mayor que seguidos unos de otros...
> >
> > > ...o con espacios entre las flechas.

:::

::: preview Lista desordenada

- Crea una lista empezando una línea con `-`
- Crea sublistas indentando 2 espacios:
  - Cambiar el carácter del marcador obliga a empezar una lista nueva:
    - Ac tristique libero volutpat at
    - Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit  
      salto de línea

      Párrafo nuevo

- ¡Es fácil!

:::

::: preview Lista ordenada

1. Lorem ipsum dolor sit amet
1. Consectetur adipiscing elit  
   salto de línea  
   salto de línea otra vez
1. Integer molestie lorem at massa

:::

::: preview Línea horizontal

---

:::

::: preview Enlace

[Página de inicio](/)

:::

::: preview Imagen

![Logo](/logo.png)

:::

::: preview Tabla

|         centro         |                            derecha | izquierda                            |
| :--------------------: | ---------------------------------: | :----------------------------------- |
| Para centrar usa `:-:` | Para alinear a la derecha usa `-:` | Para alinear a la izquierda usa `:-` |
|           b            |                          aaaaaaaaa | aaaa                                 |
|           c            |                               aaaa | a                                    |

:::

::: preview Código

Código en línea: `code`

Código en bloque:

```js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```

:::

## Superíndice y subíndice

Usa `^` y `~` para marcar el superíndice y el subíndice.

<!-- prettier-ignore-start -->

::: preview Demostración

- 19^th^
- H~2~O

:::

<!-- prettier-ignore-end -->

## Emojis

Además de los emojis de Weibo integrados o configurados por el usuario, también admitimos todos los emoticonos abreviados de Emoji.

<!-- prettier-ignore-start -->

::: preview Demostración

Clásicos:

:wink: :cry: :laughing: :yum:

Atajos:

8-) :) :* :( :-) :-( ;)

:::

<!-- prettier-ignore-end -->

## Resaltado de bloques de código

Admitimos el resaltado en casi todos los lenguajes.

::: details Demostración

```html
<!doctype html>
<html lang="en">
  <head>
    <script>
      // Just a lil’ script to show off that inline JS gets highlighted
      window.console && console.log('foo');
    </script>
    <meta charset="utf-8" />
    <link rel="icon" href="assets/favicon.png" />
    <title>Prism</title>
    <link rel="stylesheet" href="assets/style.css" />
    <link rel="stylesheet" href="themes/prism.css" data-noprefix />
    <script src="assets/vendor/prefixfree.min.js"></script>

    <script>
      var _gaq = [['_setAccount', 'UA-33746269-1'], ['_trackPageview']];
    </script>
    <script src="https://www.google-analytics.com/ga.js" async></script>
  </head>
  <body></body>
</html>
```

```js
/** @deprecated Use `Prism.plugins.fileHighlight.highlight` instead. */
Prism.fileHighlight = function () {
  if (!logged) {
    console.warn(
      'Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.',
    );
    logged = true;
  }
  Prism.plugins.fileHighlight.highlight.apply(this, arguments);
};
```

```css
@import url(https://fonts.googleapis.com/css?family=Questrial);
@import url(https://fonts.googleapis.com/css?family=Arvo);

@font-face {
  src: url(https://lea.verou.me/logo.otf);
  font-family: 'LeaVerou';
}

/*
 Shared styles
 */

section h1,
#features li strong,
header h2,
footer p {
  font:
    100% Rockwell,
    Arvo,
    serif;
}
```

:::

## Fórmulas matemáticas

Puedes usar `$ ... $` para crear fórmulas en línea, o `$$ ... $$` para crear fórmulas en bloque.

::: preview Demostración

La identidad de Euler $e^{i\pi}+1=0$ es una fórmula preciosa en $\mathbb{R}^2$.

$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right\}
$$

:::

## Incrustar HTML

Puedes añadir cualquier contenido HTML siempre que no actives [el mecanismo de protección](../guide/features/safety.md#seguridad-de-los-comentarios).
