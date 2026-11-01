---
title: Compteur de pages vues
icon: counter
order: 7
---

Waline prend en charge le comptage des pages vues.

<!-- more -->

## Utilisation avec les commentaires

Si vous utilisez le service de commentaires de Waline, vous pouvez activer les statistiques de pages vues en définissant l'option `pageview` sur `true` lors de l'initialisation :

```js
Waline.init({
  el: '#waline',
  // ...
  pageview: true, // pageview statistics
});
```

Waline recherche automatiquement dans la page les éléments dont la valeur de `class` est `waline-pageview-count`, récupère leur `data-path` comme condition de requête, puis les remplit avec la valeur obtenue :

Si vous avez besoin d'un autre sélecteur, vous pouvez définir l'option `pageview` sur ce sélecteur.

```html
<!-- data-path will be the query condition -->
Pageviews: <span class="waline-pageview-count" data-path="<Your/Path/Name>" />
```

À chaque appel de `WalineInstance.update()`, Waline parcourt à nouveau le contenu de la page et met automatiquement à jour les pages vues.

::: tip Exemples

```html
The current page has been viewed
<span class="waline-pageview-count" data-path="/fr/guide/client/count.html" />
times.
```

Cette page a été consultée
<span class="waline-pageview-count" data-path="/fr/guide/client/count.html" /> fois.

:::

## Utilisation autonome

Si vous avez uniquement besoin des statistiques de pages vues, vous pouvez importer le module dédié fourni par Waline ; sa taille Gzip est inférieure à 1 Ko.

```html
<ul>
  <li>
    Current page views:
    <span class="waline-pageview-count" />
  </li>
  <li>
    Page Views:
    <span class="waline-pageview-count" data-path="/" />
  </li>
</ul>
<script type="module">
  import { pageviewCount } from 'https://unpkg.com/@waline/client@v3/dist/pageview.js';

  pageviewCount({
    serverURL: '<YOUR_SERVER_URL>',
    path: window.location.pathname,

    // optional, for custom selectors, defaults to `'.waline-pageview-count'`
    // selector: 'waline-pageview-count',

    // optional, whether to increase the number of visits when fetching, the default is `true`
    // update: true,
  });
</script>
```

- Pages vues de la page courante : <span class="waline-pageview-count" />

- Pages vues de la page d'accueil : <span class="waline-pageview-count" data-path="/" />

::: info Annulation

La récupération des pages vues étant une opération réseau asynchrone, il peut être nécessaire d'annuler une mise à jour en cours dans certaines circonstances.

`pageviewCount` renvoie une fonction que vous pouvez appeler pour annuler la mise à jour :

```html
<script type="module">
  import { pageviewCount } from 'https://unpkg.com/@waline/client@v3/dist/pageview.js';

  const abort = Waline.pageviewCount({
    serverURL: '<YOUR_SERVER_URL>',
    path: window.location.pathname,
  });

  // After 500ms, if the network request has not been completed, cancel this operation
  setTimeout(() => abort(), 500);
</script>
```

:::
