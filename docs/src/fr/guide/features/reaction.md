---
title: Réactions aux articles
icon: reaction
order: 4
---

Waline permet aux utilisateurs d'exprimer leurs réactions au contenu d'un article.

<!-- more -->

## Prise en main

Pour activer rapidement les réactions, vous pouvez définir l'option `reaction` sur `true` afin d'afficher une liste de réactions par défaut :

```js
Waline.init({
  el: '#waline',
  // ...
  reaction: true, // start the reaction
});
```

Waline affiche la liste de réactions par défaut au-dessus de la zone de commentaire.

## Personnaliser les réactions

Si vous souhaitez personnaliser ces emoji de réaction, vous pouvez passer un tableau contenant les liens des images des emoji de réaction, représentant les réactions que vous souhaitez proposer à l'utilisateur :

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

Par ailleurs, vous pouvez personnaliser le titre des réactions via `reactionTitle` dans `locale`, et le nom de chaque réaction via `reaction0` à `reaction8`. Voir [Paramètres multilingues](./i18n.md) .

## Précautions

::: tip Limitation du nombre

Waline prend en charge jusqu'à 9 réactions ; vous pouvez en ajouter moins de 9 sans aucun problème.

:::

::: warning Règles de comptage

Le comptage des réactions est basé sur la position.

Si vous devez réordonner et ajuster les réactions, consultez [#1451](https://github.com/walinejs/waline/issues/1451#issuecomment-1264555264) pour plus de détails.

:::
