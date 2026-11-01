---
title: Importer Waline via CDN
icon: import
order: 1
---

Ce guide explique comment importer Waline via un CDN.

<!-- more -->

Pour les utilisateurs de Chine continentale, nous recommandons d'utiliser [unpkg](https://unpkg.com/@waline/client). Pour les utilisateurs étrangers, nous recommandons jsDelivr.

Pour rendre Waline compatible avec le SSR, nous avons séparé les styles de Waline dans la version V2. Cela signifie que vous devez importer le fichier CSS de Waline, puis importer le fichier de script de Waline et appeler Waline.

## Commentaires

Normalement, vous voudrez que Waline affiche une liste de commentaires ; vous pouvez alors importer Waline comme suit :

```html
<!-- style file -->
<link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css" />
<!-- script file -->
<script type="module">
  import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

  init({
    // options
  });
</script>
```

## Pages vues et commentaires

Parfois, vous pouvez souhaiter afficher le nombre de pages vues et de commentaires de l'article sur la page d'accueil ou dans la liste des articles, sans charger le composant de commentaires ; vous pouvez alors importer un fichier de script Gzip < 1 Ko de la manière suivante :

Pages vues :

```html
<script type="module">
  import { pageviewCount } from 'https://unpkg.com/@waline/client@v3/dist/pageview.js';

  pageviewCount({
    // options
  });
</script>
```

Nombre de commentaires :

```html
<script type="module">
  import { commentCount } from 'https://unpkg.com/@waline/client@v3/dist/comment.js';

  commentCount({
    // options
  });
</script>
```

## Pour aller plus loin

::: info Spécifier la version

Vous avez peut-être remarqué que, dans les cas ci-dessus, nous avons explicitement déclaré la version `@v2` après `@aline/client`. Votre site web ne fonctionnera pas correctement.

:::
