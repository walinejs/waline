---
title: Recherche d'emojis
icon: search
order: 3
---

`@waline/client` permet aux utilisateurs d'ajouter des services de recherche d'emoji et de personnaliser cette fonctionnalité.

Par défaut, `@waline/client` fournit un service de recherche de mèmes via [Giphy](https://giphy.com/). Cela vous permet de rechercher des images et de les ajouter au commentaire.

<!-- more -->

## Désactiver

Si vous n'avez pas besoin du service de recherche d'images par défaut, vous pouvez le désactiver en définissant l'option `search` sur `false`.

```js
Waline.init({
  el: '#waline',
  // ...
  search: false,
});
```

## Personnaliser

Vous pouvez personnaliser le service de recherche d'images via l'option `search`.

Pour chaque opération, vous devez renvoyer un tableau contenant les informations des images comme résultat de recherche ; chaque élément doit être un objet possédant les propriétés suivantes :

- `src` : l'adresse du lien de l'image
- `title` : titre et texte alternatif de l'image (facultatif)
- `preview` : miniature de l'image à utiliser dans la liste des résultats (facultatif)

L'option accepte trois fonctions, chacune devant renvoyer une Promise dont le résultat est le tableau de résultats de recherche ci-dessus.

- `search` : opération de recherche, le terme recherché est passé en premier paramètre de la fonction
- `default` : liste des images affichées par défaut (facultatif)
- `more` : fonction déclenchée lorsque la liste des images est défilée jusqu'en bas, le terme recherché et le nombre actuel étant passés en premier et deuxième paramètres (facultatif)

Pour des tutoriels sur la recherche personnalisée, voir [Cookbook → Personnaliser la recherche d'emoji](../../cookbook/customize/search.md).
