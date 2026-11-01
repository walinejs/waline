---
title: Instance Waline réactive
icon: spa
order: -1
---

Le client officiel `@waline/client` est basé sur Vue 3, fournit des composants et des instances réactifs, et apporte la prise en charge des SPA (**S**ingle **P**age **A**pplication).

<!-- more -->

## Composant Vue

Si vous construisez un projet Vue, vous pouvez obtenir et utiliser le composant Waline en important l'export nommé `Waline` depuis `@waline/client/component`.

Toutes les propriétés du composant sont réactives, ce qui signifie que lorsque vous modifiez les propriétés, la zone de commentaires est automatiquement mise à jour.

## Autres projets

Dans les autres SPA, vous devez stocker l'instance `WalineInstance` renvoyée par la fonction Waline au moment de l'initialisation de Waline.

Vous trouverez sur `WalineInstance` une propriété `el` et deux méthodes : `update()` et `destroy()`.

### update

Vous pouvez appeler `update()` à tout moment pour mettre à jour Waline (par exemple lorsqu'un utilisateur visite une nouvelle route). La méthode `update` reçoit un paramètre facultatif `options` ; à l'exception de `el`, toutes les options d'initialisation de Waline peuvent être mises à jour en passant de nouvelles valeurs.

Par exemple :

```js
// in `/` route
const waline = Waline.init({
  serverURL: 'https://example.com',
});

/* User: after some time, route has changed to `/a.html` */

waline.update(); // Now waline will start clear the comment and show a loading state.
// After some time, the counter and comments will be all updated

waline.update({
  lang: 'en',
  login: 'disable',
}); // waline will now display in English, and disable user login
```

#### Principe de fonctionnement

Lors de l'appel de `update`, l'option actuelle et l'option historique sont fusionnées par **copie superficielle**, et l'instance Waline est actualisée avec la nouvelle option (qui est également enregistrée).

Le comportement par défaut de cette méthode est de toujours **régénérer les valeurs par défaut** pour les options qui n'ont pas encore été définies, et d'**utiliser les valeurs historiques** pour les options qui ont déjà été définies.

Deux options méritent une attention particulière : `path` et `locale`.

::: warning Précautions concernant path

Dans la V2, le paramètre `path` est **toujours réinitialisé** lors de l'appel à `update()`.

Cela signifie que, dans toute mise à jour, tant que vous ne spécifiez pas `path`, `path` sera réinitialisé à `window.location.pathname`.

:::

::: warning Précautions concernant locale

En raison de la copie superficielle, les anciennes options `locale` sont entièrement écrasées par les nouvelles options `locale` transmises à `update`.

Notre parti pris est le suivant : les utilisateurs souhaitent généralement changer la langue d'affichage lors de la mise à jour de la locale ; nous avons donc défini ce comportement comme attendu pour le plugin. Cela signifie également que vous pouvez utiliser `update({ locale: {} })` pour effacer la configuration de locale personnalisée conservée dans l'historique.

Si vous avez réellement besoin de mettre à jour un ou plusieurs champs précis de `locale`, vous devez transmettre l'intégralité du `locale` mis à jour.

:::

Par ailleurs, l'option `update()` a été optimisée pour les requêtes réseau asynchrones, notamment :

- La zone de commentaires n'est actualisée et la requête n'est rejouée que si le chemin a réellement changé.
- Le nouvel appel à `update()` annule automatiquement la requête devenue inutile du précédent `update()`.

### el

La propriété `el` est l'HTMLElement sur lequel l'instance actuelle de Waline est montée.

Si vous initialisez Waline avec `el: null` (pour n'utiliser que les commentaires et les statistiques de pages vues), cette propriété vaudra `null`.

### destroy

La méthode `destroy()` détruit l'instance Waline. Elle vide également tout le contenu de l'élément sur lequel Waline est monté.

### Échec de l'initialisation

Si vous oubliez de définir `serverURL` ou si Waline ne trouve pas l'emplacement de montage via l'option `el` sur la page, Waline renverra une `WalineErrorInstance`.

Il n'existe qu'un seul attribut `errMsg` sur `WalineErrorInstance`, qui indique la raison de l'échec de l'initialisation.

### Précautions

::: warning N'oubliez pas de détruire l'instance

Afin que Waline libère correctement ses ressources, veuillez appeler manuellement `WalineInstance.destroy()` avant de supprimer l'élément sur lequel Waline est monté.

Sinon, certains écouteurs d'événements risquent de ne pas être correctement supprimés.

:::
