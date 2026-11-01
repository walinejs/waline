---
title: Prise en charge du format des commentaires
icon: format
order: 2
---

Voici la syntaxe Markdown prise en charge dans les commentaires.

<!-- more -->

## Prise en charge de Markdown

::: preview Titres

<!-- markdownlint-disable MD025 -->

# Titre 1

<!-- markdownlint-enable MD025 -->

## Titre 2

### Titre 3

#### Titre 4

##### Titre 5

###### Titre 7

:::

::: preview Texte

Cette phrase contient du texte en **gras**, en _italique_ et en ~~barré~~.

:::

::: preview Paragraphe

Ceci est un paragraphe.

Ceci est un autre paragraphe.

:::

::: details Saut de ligne

Je souhaite effectuer un saut de ligne à  
cet endroit

```md
I would like to line break at  
this point
```

:::

::: preview Citations

> Les citations peuvent aussi être imbriquées...
>
> > ...en plaçant des signes supérieurs juste à côté les uns des autres...
> >
> > > ...ou avec des espaces entre les flèches.

:::

::: preview Liste non ordonnée

- Créez une liste en commençant une ligne par `-`
- Créez des sous-listes en indentant de 2 espaces :
  - Un changement de caractère de puce force le démarrage d'une nouvelle liste :
    - Ac tristique libero volutpat at
    - Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit  
      saut de ligne

      Nouveau paragraphe

- C'est facile !

:::

::: preview Liste ordonnée

1. Lorem ipsum dolor sit amet
1. Consectetur adipiscing elit  
   saut de ligne  
   encore un saut de ligne
1. Integer molestie lorem at massa

:::

::: preview Ligne horizontale

---

:::

::: preview Lien

[Page d'accueil](/)

:::

::: preview Image

![Logo](/logo.png)

:::

::: preview Tableau

|            centre            |                               droite | gauche                               |
| :--------------------------: | -----------------------------------: | :----------------------------------- |
| Pour centrer, utilisez `:-:` | Pour aligner à droite, utilisez `-:` | Pour aligner à gauche, utilisez `:-` |
|              b               |                            aaaaaaaaa | aaaa                                 |
|              c               |                                 aaaa | a                                    |

:::

::: preview Code

Code en ligne : `code`

Bloc de code :

```js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```

:::

## Exposant et indice

Utilisez `^` et `~` pour marquer l'exposant et l'indice.

<!-- prettier-ignore-start -->

::: preview Démo

- 19^e^
- H~2~O

:::

<!-- prettier-ignore-end -->

## Emojis

Outre les emojis Weibo intégrés ou configurés par l'utilisateur, nous prenons également en charge l'ensemble des émoticônes abrégées Emoji.

<!-- prettier-ignore-start -->

::: preview Démo

Classiques :

:wink: :cry: :laughing: :yum:

Raccourcis :

8-) :) :* :( :-) :-( ;)

:::

<!-- prettier-ignore-end -->

## Coloration syntaxique des blocs de code

Nous prenons en charge la coloration syntaxique dans presque tous les langages.

::: details Démo

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

## Formule mathématique

Vous pouvez utiliser `$ ... $` pour créer des formules en ligne, ou `$$ ... $$` pour créer des formules en bloc.

::: preview Démo

L'identité d'Euler $e^{i\pi}+1=0$ est une belle formule dans $\mathbb{R}^2$.

$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right\}
$$

:::

## Intégration de HTML

N'hésitez pas à ajouter tout contenu HTML, sauf si cela déclenche [le mécanisme de protection](../guide/features/safety.md#securite-des-commentaires).
