---
title: Créez vos propres préréglages d'emoji
icon: emoji
---

Ce guide pratique vous montre comment créer et utiliser vos propres préréglages d'emoji.

<!-- more -->

## Créer vos propres préréglages

Tout d'abord, vous devez préparer quelques images d'emoji. Ensuite, suivez les étapes ci-dessous pour créer votre préréglage.

### Nommer l'emoji et le téléverser

Par souci de simplicité, Waline utilise directement le nom de l'image d'emoji comme clé de l'emoji. Cela signifie que si vous importez deux préréglages différents qui contiennent tous les deux une image laugh.png, les deux émoticônes correspondront au même emoji `:laugh:`.

Par conséquent, la bonne pratique est que chaque créateur de préréglage d'emoji ajoute un préfixe lié au nom du préréglage à tous les noms des fichiers d'emoji.

Après les avoir nommés correctement, vous devez les téléverser sur votre serveur.

### Écrire les informations du préréglage

Nous supposons que vous avez placé quelques images d'emoji dans le `

```
https://example.com/my-emoji/
├─ my_laugh.png
├─ my_cute.png
├─ my_rage.png
├─ my_sob.png
└─ info.json
```

À ce stade, vous devez également créer un fichier `info.json` pour ce dossier afin que Waline sache quels emoji contient le préréglage.

Commencez par définir un nom pour le préréglage d'emoji, par exemple `My Emoji`, puisque vous avez défini le préfixe `my_` pour les images et que les fichiers sont au format `png`. Vous devez les ajouter dans `info.json`.

Votre fichier `info.json` peut être :

```json
{
  "name": "My Emoji",
  "prefix": "my_",
  "type": "png"
}
```

Ensuite, listez tous les noms d'emoji dans `items` dans l'ordre souhaité, en pensant à retirer le préfixe et le suffixe que vous avez définis dans `prefix` et `type`.

```json
{
  "name": "My Emoji",
  "prefix": "my_",
  "type": "png",
  "icon": "cute"
}
```

Sélectionnez ensuite un emoji représentatif comme icône affichée dans l'onglet :

```json
{
  "name": "My Emoji",
  "prefix": "my_",
  "type": "png",
  "icon": "cute",
  "items": ["laugh", "sob", "rage", "cute"]
}
```

Vous avez maintenant terminé la rédaction de `info.json` ; veuillez le téléverser dans le même dossier.

Vous avez créé avec succès un préréglage `my-emoji` avec `https://example.com/my-emoji/'`.

## Utiliser un miroir GitHub avec des balises

Généralement, avoir son propre nom de domaine et y téléverser des images peut sembler un peu fastidieux, et le lien peut expirer avec le temps. Une approche avancée consiste donc à utiliser un dépôt GitHub et la fonction de balise de git pour mettre en miroir un dépôt GitHub fournissant un préréglage d'emoji.

Comme pour les étapes ci-dessus, vous devez créer un nouveau dépôt GitHub, nommer les emoji de la même manière, créer `info.json` en suivant les mêmes étapes et les téléverser dans le dépôt.

Créez ensuite une balise pour le dépôt ; nous vous recommandons de la nommer au format `vx.x.x`, par exemple `v1.0.0`.

Après avoir ajouté les balises, vous pouvez utiliser comme préréglage le lien CDN versionné de [cdn.jsdelivr.net](https://www.jsdelivr.com/), au format `https://cdn.jsdelivr.net/gh/user/repo@version/file`.

Supposons que vous ayez créé le dépôt `example/emoji`, téléversé directement les images d'emoji et `info.json`, et créé la balise `v1.0.0` ; vous pouvez alors utiliser `https://cdn.jsdelivr.net/gh/example/emoji@v1.0.0/` comme préréglage.

::: tip

Il est nécessaire de préciser une balise dans le lien pour éviter que les liens d'image référencés par les anciens commentaires ne soient invalidés par une modification de votre préréglage.

Le préréglage d'emoji officiel est réalisé en créant le dépôt [walinejs/emojis](https://github.com/walinejs/emojis) et en utilisant un lien CDN. Nous utilisons actuellement la version `v1.1.0`.

:::

::: warning

Comme cdn.jsdelivr.net est pollué en Chine, vous pouvez remplacer `cdn.jsdelivr.net` par `gcore.jsdelivr.net`

:::

## Utiliser des objets de configuration

Comme dans la partie précédente, nous supposons que vous avez la structure de fichiers suivante :

```
https://example.com/my-emoji/
├─ my_laugh.png
├─ my_cute.png
├─ my_rage.png
└─ my_sob.png
```

En plus de créer un fichier `info.json` à téléverser et d'utiliser un lien comme préréglage, vous pouvez aussi utiliser directement l'objet suivant comme préréglage :

```js
{
  name: "My Emoji",
  folder: "https://example.com/my-emoji",
  prefix: "my_",
  type: "png",
  icon: "cute",
  items: ["laugh", "sob", "rage", "cute"]
}
```

Ici, nous ajoutons la propriété `folder` pour indiquer à Waline où sont stockées les images.
