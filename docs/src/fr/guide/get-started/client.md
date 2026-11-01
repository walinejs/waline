---
title: Introduction au client
icon: client
order: 1
---

Waline fournit officiellement le paquet [`@waline/client`](https://www.npmjs.com/package/@waline/client), écrit en Vue + TypeScript et dont la taille n'est que de 100 Ko gzip.

## Importer

Vous pouvez importer le client Waline via CDN ou npm ; nous proposons plusieurs versions des fichiers pour répondre à différents cas d'usage.

Si vous rencontrez des problèmes lors de cette étape, consultez :

- [Cookbook → Importer via un CDN](../../cookbook/import/cdn.md)
- [Cookbook → Importer dans un projet](../../cookbook/import/project.md)

## Utiliser Waline

La manière la plus simple d'utiliser Waline est de [suivre la méthode détaillée dans le démarrage rapide](./README.md#importer-dans-le-html) : importez la fonction `init` de Waline et initialisez l'instance Waline via `init(yourOptions)`.

Parmi les options de `init`, `el` et `serverURL` sont obligatoires. La première est l'élément ou le sélecteur d'élément sur lequel Waline est monté, la seconde est l'adresse du serveur. Pour tous les paramètres d'initialisation de `@waline/client`, voir [Référence client → API](../../reference/client/api.md).

## Nombre de commentaires

`@waline/client` fournit également un sous-paquet pour les statistiques de commentaires. Il vous permet d'afficher le nombre de commentaires dans la liste des articles ou sur d'autres pages qui ne contiennent pas de commentaires. Pour plus de détails, voir [Fonctionnalités → Nombre de commentaires](../features/comment.md)

## Nombre de pages vues

Waline prend en charge les statistiques de pages vues. Si vous n'avez pas besoin du service de commentaires mais souhaitez utiliser la fonction de pages vues, Waline fournit un plugin de statistiques de pages vues dont la taille Gzip est inférieure à 1 Ko.

Pour plus d'informations sur le comptage des pages vues de `@waline/client`, voir [Fonctionnalités → Nombre de pages vues](../features/pageview.md)

## Prise en charge des formats de commentaire

`@waline/client` prend en charge de nombreuses syntaxes de commentaire et une mise en forme riche. Outre la syntaxe Markdown standard et les extensions GFM, les personnes qui commentent peuvent aussi intégrer des balises HTML, utiliser des équations mathématiques, et bien plus encore. Pour les autres syntaxes, voir [Fonctionnalités → Syntaxes prises en charge](../features/syntax.md).

`@waline/client` prend également en charge l'aperçu en temps réel de la saisie dans la zone de commentaires. Cela dit, certaines fonctions sont désactivées par défaut pour des raisons de taille. Si vous souhaitez les rétablir, consultez :

- [Cookbook → Personnaliser la coloration du code dans l'aperçu](../../cookbook/customize/highlighter.md)
- [Cookbook → Personnaliser le moteur de rendu $\TeX$ dans l'aperçu](../../cookbook/customize/tex-renderer.md)

## Réactions aux articles

Vous trouvez les commentaires trop contraignants ? Waline permet à vos visiteurs d'exprimer rapidement leurs réactions aux articles, comme j'aime, je n'aime pas, le doute, l'ennui, la surprise, etc. Pour activer manuellement cette fonctionnalité, voir [Fonctionnalités → Réactions aux articles](../features/reaction.md) .

## Fonctionnalités des commentaires

Waline prend en charge un certain nombre de fonctionnalités de base, notamment la connexion, les avatars, le [multilingue](../features/i18n.md) et l'aperçu en temps réel.

Waline vous permet de définir des étiquettes de niveau d'interaction et des étiquettes personnalisées pour vos utilisateurs. Pour plus de détails, voir [Étiquettes utilisateur](../features/label.md).

## Onglets d'emoji

`@waline/client` prend en charge plusieurs onglets d'emoji et permet d'ajouter facilement des onglets via des presets. Outre les presets officiels, vous pouvez créer facilement les vôtres.

Pour plus d'informations sur les onglets d'emoji de `@waline/client`, voir :

- [Fonctionnalités → Onglet d'emoji](../features/emoji.md)
- [Cookbook → Personnaliser les emoji](../../cookbook/customize/emoji.md)

## Insertion d'images

`@waline/client` intègre la prise en charge du téléversement d'images. Par défaut, les images sont converties en base64. Vous pouvez toutefois utiliser votre propre service d'hébergement d'images.

Pour plus d'informations sur les réglages de téléversement d'images de `@waline/client`, voir [Cookbook → Personnaliser le téléversement d'images](../../cookbook/customize/upload-image.md).

## Recherche d'emoji

`@waline/client` propose une fonction de recherche de mèmes et d'emoji via [giphy](https://giphy.com), et vous permet de personnaliser le service de recherche. Voir :

- [Fonctionnalités → Recherche d'emoji](../features/search.md)
- [Cookbook → Personnaliser la recherche d'emoji](../../cookbook/customize/search.md)

## Prise en charge du multilingue

`@waline/client` prend en charge nativement plusieurs langues, et vous pouvez ajouter des langues ou modifier les textes de l'interface à partir de cette base. Voir :

- [Fonctionnalités → Définir la langue](../features/i18n.md).
- [Cookbook → Personnaliser la langue](../../cookbook/customize/locale.md).

## Accessibilité

Waline respecte pleinement toutes les normes d'accessibilité :

- Toutes les icônes et tous les contrôles disposent des libellés d'accessibilité correspondants.
- Vous pouvez interagir avec tous les contrôles de Waline au clavier ou avec un dispositif de pointage porté sur la tête.

C'est notre façon de soutenir les personnes malvoyantes et à mobilité réduite partout dans le monde ! :heart:

## Styles personnalisables

Waline intègre la prise en charge du mode sombre. Pour faciliter l'ajustement du style de Waline, nous fournissons de nombreuses variables CSS configurables.

Voir [Styles personnalisés](../features/style.md) pour plus de détails.

## Développement avancé

### Prise en charge des applications monopages

Waline prend en charge les SPA (**S**ingle **P**age **A**pplications).

Si vous souhaitez utiliser Waline dans un site ou une application basés sur l'API history, vous pouvez appeler la méthode `update()` de l'instance initialisée pour actualiser la configuration de la zone de commentaires, ou la méthode `destroy()` de l'instance pour détruire Waline. Pour en savoir plus sur la réactivité de `@waline/client`, voir [Cookbook → Réactivité](../../cookbook/reactivity.md).

### Écosystème

Vous pouvez facilement utiliser Waline via des plugins sur des outils comme Hexo, VuePress, ou même des clients tiers.

Pour les clients tiers, thèmes et plugins compatibles avec Waline, voir [En savoir plus → Écosystème](../../advanced/ecosystem.md).
