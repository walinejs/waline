---
title: Compteur de commentaires
icon: counter
order: 8
---

Waline permet d'afficher séparément le nombre de commentaires, en dehors de la zone de commentaires.

<!-- more -->

## Mise à jour automatique

Vous pouvez activer le comptage des commentaires dans la fonction `init` en définissant l'option `comment` sur `true`.

```html
<script type="module">
  import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

  init({
    el: '#waline',
    // ...
    comment: true, // enable comment counting
  });
</script>
```

Waline tente de renseigner ou de mettre à jour le nombre de commentaires à chaque appel de la fonction `init` ou lors d'une mise à jour du chemin.

Waline recherche dans la page les éléments portant la classe `waline-comment-count`, récupère leur attribut `data-path` comme condition de requête, puis les remplit avec la valeur obtenue :

```html
<!-- data-path will be the query condition -->
<span data-path="<Your/Path/Name>" class="waline-comment-count" /> comments
```

Si vous avez besoin d'un autre sélecteur, vous pouvez définir l'option `comment` sur ce sélecteur.

À chaque appel de `WalineInstance.update()`, Waline parcourt le contenu de la page et met automatiquement à jour le nombre de commentaires.

::: tip Exemples

```html
The current page has <span class="waline-comment-count" /> comments, the home page has
<span data-path="/fr/" class="waline-comment-count" /> comments.
```

Cette page compte <span class="waline-comment-count" /> commentaires, la page
d'accueil en compte <span data-path="/fr/" class="waline-comment-count" />.

:::

## Mise à jour manuelle

En plus de la mise à jour automatique via la fonction `init`, vous pouvez mettre à jour manuellement le nombre de commentaires de la page courante avec l'API `commentCount` :

```html
<script type="module">
  import { commentCount } from 'https://unpkg.com/@waline/client@v3/dist/comment.js';

  commentCount({
    serverURL,
    path,

    // optional, for custom selectors, defaults to `'.waline-pageview-count'`
    // selector: '.waline-pageview-count',
  });
</script>
```

::: info Annulation

La récupération du nombre de commentaires étant une opération réseau asynchrone, il peut être nécessaire d'annuler une mise à jour en cours dans certaines circonstances.

`commentCount` renvoie une fonction que vous pouvez appeler pour annuler la mise à jour :

```js
const abort = Waline.commentCount({
  serverURL: '<YOUR_SERVER_URL>',
  path: window.location.pathname,
});

// After 500ms, if the network request has not been completed, cancel this operation
setTimeout(() => abort(), 500);
```

:::

## Importer uniquement le compteur

Il est parfois utile d'afficher le nombre de commentaires de certaines pages dans la liste des articles ou sur la page d'accueil, sans charger tout Waline. Dans ce cas, utilisez le module `comment`, dont la taille Gzip est inférieure à 1 Ko :

```html
<script type="module">
  import { commentCount } from 'https://unpkg.com/@waline/client@v3/dist/comment.js';

  commentCount({
    serverURL,
    path,

    // optional, for custom selectors, defaults to `'.waline-pageview-count'`
    // selector: '.waline-pageview-count',
  });
</script>
```

<script setup>
import { walineOptions } from '@source/.vuepress/client.ts'
import { commentCount } from '@waline/client/comment'
import { onMounted } from 'vue'
import { useRoute } from 'vuepress/client'

const { serverURL } = walineOptions
const route = useRoute()

onMounted(()=>{
  commentCount({
    serverURL: serverURL,
    path: route.path,
  })
})
</script>
