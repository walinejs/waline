---
title: Suporte a formatos de comentários
icon: format
order: 2
---

A sintaxe Markdown suportada nos comentários é a seguinte.

<!-- more -->

## Suporte a Markdown

::: preview Títulos

<!-- markdownlint-disable MD025 -->

# Título 1

<!-- markdownlint-enable MD025 -->

## Título 2

### Título 3

#### Título 4

##### Título 5

###### Título 7

:::

::: preview Texto

Esta frase tem texto em **negrito**, _itálico_ e ~~tachado~~.

:::

::: preview Parágrafo

Este é um parágrafo.

Este é outro parágrafo.

:::

::: details Quebra de linha

Eu gostaria de quebrar a linha  
neste ponto

```md
I would like to line break at  
this point
```

:::

::: preview Citações

> Citações também podem ser aninhadas...
>
> > ...usando sinais de maior logo um ao lado do outro...
> >
> > > ...ou com espaços entre as setas.

:::

::: preview Lista não ordenada

- Crie uma lista começando a linha com `-`
- Crie sublistas indentando 2 espaços:
  - A mudança do caractere marcador força o início de uma nova lista:
    - Ac tristique libero volutpat at
    - Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit  
      quebra de linha

      Novo parágrafo

- É fácil!

:::

::: preview Lista ordenada

1. Lorem ipsum dolor sit amet
1. Consectetur adipiscing elit  
   quebra de linha  
   quebra de linha novamente
1. Integer molestie lorem at massa

:::

::: preview Linha horizontal

---

:::

::: preview Link

[Página inicial](/)

:::

::: preview Imagem

![Logo](/logo.png)

:::

::: preview Tabela

|           centralizado           |                       à direita | à esquerda                       |
| :------------------------------: | ------------------------------: | :------------------------------- |
| Para alinhar ao centro use `:-:` | Para alinhar à direita use `-:` | Para alinhar à esquerda use `:-` |
|                b                 |                       aaaaaaaaa | aaaa                             |
|                c                 |                            aaaa | a                                |

:::

::: preview Código

Código inline: `code`

Bloco de código:

```js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```

:::

## Sobrescrito e subscrito

Use `^` e `~` para marcar sobrescrito e subscrito.

<!-- prettier-ignore-start -->

::: preview Demo

- 19^th^
- H~2~O

:::

<!-- prettier-ignore-end -->

## Emojis

Além dos emojis do Weibo configurados pelo usuário ou integrados, também oferecemos suporte a emoticons Emoji abreviados completos.

<!-- prettier-ignore-start -->

::: preview Demo

Clássicos:

:wink: :cry: :laughing: :yum:

Atalhos:

8-) :) :* :( :-) :-( ;)

:::

<!-- prettier-ignore-end -->

## Realce de blocos de código

Damos suporte a realce de sintaxe em quase todas as linguagens.

::: details Demo

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

## Fórmula matemática

Você pode usar `$ ... $` para criar fórmulas inline ou `$$ ... $$` para criar fórmulas em nível de bloco.

::: preview Demo

A identidade de Euler $e^{i\pi}+1=0$ é uma bela fórmula em $\mathbb{R}^2$.

$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right\}
$$

:::

## Incorporar HTML

Sinta-se à vontade para adicionar qualquer conteúdo HTML, a menos que acione [o mecanismo de proteção](../guide/features/safety.md#seguranca-dos-comentarios).
