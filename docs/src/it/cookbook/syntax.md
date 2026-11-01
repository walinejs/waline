---
title: Formato dei commenti supportato
icon: format
order: 2
---

La sintassi Markdown supportata nei commenti è la seguente.

<!-- more -->

## Supporto Markdown

::: preview Intestazioni

<!-- markdownlint-disable MD025 -->

# Titolo1

<!-- markdownlint-enable MD025 -->

## Titolo2

### Titolo3

#### Titolo4

##### Titolo5

###### Titolo7

:::

::: preview Testo

Questa frase contiene testo **in grassetto**, _in corsivo_ e ~~barrato~~.

:::

::: preview Paragrafo

Questo è un paragrafo.

Questo è un altro paragrafo.

:::

::: details Interruzione di riga

Vorrei interrompere la riga  
in questo punto

```md
I would like to line break at  
this point
```

:::

::: preview Citazioni

> Le citazioni possono anche essere annidate...
>
> > ...usando più segni maggiore affiancati...
> >
> > > ...oppure con spazi tra le frecce.

:::

::: preview Elenco non ordinato

- Crea un elenco iniziando una riga con `-`
- Crea sotto-elenchi indentando di 2 spazi:
  - Il cambio del carattere di elenco avvia un nuovo elenco:
    - Ac tristique libero volutpat at
    - Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit  
      interruzione di riga

      Nuovo paragrafo

- È facile!

:::

::: preview Elenco ordinato

1. Lorem ipsum dolor sit amet
1. Consectetur adipiscing elit  
   interruzione di riga  
   interruzione di riga di nuovo
1. Integer molestie lorem at massa

:::

::: preview HR

---

:::

::: preview Link

[Pagina iniziale](/)

:::

::: preview Immagine

![Logo](/logo.png)

:::

::: preview Tabella

|              centro               |                          destra | sinistra                          |
| :-------------------------------: | ------------------------------: | :-------------------------------- |
| Per allineare al centro usa `:-:` | Per allineare a destra usa `-:` | Per allineare a sinistra usa `:-` |
|                 b                 |                       aaaaaaaaa | aaaa                              |
|                 c                 |                            aaaa | a                                 |

:::

::: preview Codice

Codice inline: `code`

Blocco di codice:

```js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```

:::

## Apice e pedice

Usa `^` e `~` per indicare apice e pedice.

<!-- prettier-ignore-start -->

::: preview Demo

- 19^th^
- H~2~O

:::

<!-- prettier-ignore-end -->

## Emoji

Oltre alle emoji di Weibo configurate dall'utente o integrate, supportiamo anche le emoticon abbreviate complete.

<!-- prettier-ignore-start -->

::: preview Demo

Classiche:

:wink: :cry: :laughing: :yum:

Scorciatoie:

8-) :) :* :( :-) :-( ;)

:::

<!-- prettier-ignore-end -->

## Evidenziazione dei blocchi di codice

Supportiamo l'evidenziazione in quasi tutti i linguaggi.

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

## Formula matematica

Puoi usare `$ ... $` per creare formule inline, oppure `$$ ... $$` per creare formule a livello di blocco.

::: preview Demo

L'identità di Eulero $e^{i\pi}+1=0$ è una bellissima formula in $\mathbb{R}^2$.

$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right\}
$$

:::

## Incorporare HTML

Puoi aggiungere liberamente qualsiasi contenuto HTML, a meno che non attivi [il meccanismo di protezione](../guide/features/safety.md#sicurezza-dei-commenti).
