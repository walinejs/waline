---
title: Personnaliser le style
icon: style
order: -2
---

`@waline/client` fournit un certain nombre de variables CSS. Vous pouvez facilement configurer le style de Waline grâce à ces variables :

Par ailleurs, `@waline/client` prend également en charge le mode sombre nativement.

<!-- more -->

## Prise en charge du mode sombre

Vous pouvez utiliser l'option `dark` pour activer la prise en charge du mode sombre de Waline.

En général, les sites activent le mode sombre de deux manières :

- Utiliser le sélecteur `@media` et `prefers-color-scheme` pour basculer automatiquement selon le mode de couleur de l'appareil
- Appliquer dynamiquement un autre style de couleurs sombres en modifiant les attributs et les classes de l'élément racine du DOM (`html` ou `body`).

Si votre site relève de la première méthode, il vous suffit de définir `dark` sur `'auto'`.

Pour les sites de la seconde catégorie, vous devez définir `dark` sur le sélecteur CSS qui active le mode sombre. Voici quelques exemples :

::: tip Exemples

- **vuepress-theme-hop v2** : il active le mode sombre en définissant `data-theme="dark"` sur la balise `<html>`. Vous devez donc définir `'html[data-theme="dark"]'` comme option `dark`.

- **hexo-theme-fluid** : il active le mode sombre en définissant `data-user-color-scheme="dark"` sur la balise `<html>`. Vous devez donc définir `'html[data-user-color-scheme="dark"]'` comme option `dark`.

:::

## Icônes des métadonnées

Si vous souhaitez ajouter des icônes aux métadonnées des commentaires des utilisateurs, vous pouvez importer `waline-meta.css`.

Pour les utilisateurs de CDN, vous pouvez l'importer via le lien suivant :

```html
<!-- Meta icon (optional) -->
<link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline-meta.css" />
```

Pour les utilisateurs de NPM, vous pouvez l'importer via :

```js
import '@waline/client/meta';
```

## Prise en charge de RTL

`@waline/client` prend en charge la mise en page RTL : il vous suffit d'ajouter `dir="rtl"` dans la balise `<html>`.

## Personnaliser les styles

### Variables CSS

Vous trouverez les valeurs par défaut des variables CSS utilisées par Waline en mode normal et en mode sombre dans [Référence client → Variables CSS](../../reference/client/style.md).

Si elles diffèrent du style de votre site, vous pouvez redéfinir vous-même les variables CSS correspondantes.

## Ombre portée

Si vous utilisez un thème qui s'appuie sur des ombres (`box-shadow`) plutôt que sur des bordures, vous pouvez modifier le rendu de Waline en modifiant `--waline-border` et `--waline-box-shadow`, par exemple :

```css
:root {
  --waline-border: none;
  --waline-box-shadow: 0 12px 40px rgb(134 151 168 / 25%);
}

@media (prefers-color-scheme: dark) {
  body {
    --waline-box-shadow: 0 12px 40px #0f0e0d;
  }
}
```

### Pour aller plus loin

Si les variables CSS ci-dessus ne suffisent pas à répondre à vos besoins de personnalisation du style de Waline, vous pouvez écrire votre propre fichier CSS.
