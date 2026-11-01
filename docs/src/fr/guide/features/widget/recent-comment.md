---
title: Widget de commentaires récents
icon: recent
---

Waline permet d'afficher les commentaires récents via un widget, ce qui est pratique pour présenter les derniers commentaires dans la barre latérale du blog.

<!-- more -->

## Options du composant

Le widget des derniers commentaires s'appelle `RecentComments` et comporte trois options :

- `el` (facultatif) : l'élément sur lequel monter le widget
- `serverURL` : lien du serveur
- `count` : nombre de commentaires récents à récupérer

Le format de données renvoyé par le composant doit être `Promise<{ comments: WalineComment[], destroy: () => void }>`.

- propriété `comments` : un tableau des commentaires les plus récents, avec exactement `count` éléments
- méthode `destroy` : une fonction qui détruit le widget

## Utilisation de base

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

Le widget est rendu dans `#waline-recent` avec le style par défaut.

:::

## Utilisation avancée

Si le format de sortie par défaut ne vous convient pas, vous pouvez appeler le composant en omettant l'option `el` afin de récupérer les données et de les afficher vous-même.

Exemple :

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
