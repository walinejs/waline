---
title: Formats de commentaire pris en charge
icon: format
order: 1
---

Vous pouvez ajouter différents contenus à un commentaire, notamment la syntaxe Markdown étendue et des balises HTML.

<!-- more -->

## Formats pris en charge

Nous prenons en charge l'intégralité de CommonMark (la syntaxe Markdown standard), ainsi que les extensions suivantes :

- Tableau au format GFM
- Texte barré au format GFM
- Indice et exposant
- Emoji
- Coloration syntaxique des blocs de code
- Formule $\TeX$

::: info GFM

GitHub Flavored Markdown

:::

Par ailleurs, vous pouvez intégrer librement tout contenu HTML sans déclencher le [mécanisme de protection](./safety.md#securite-des-commentaires).

## Prise en charge limitée dans l'aperçu

Afin de limiter la taille du client, nous n'intégrons qu'un petit analyseur Markdown dans le client officiel `@waline/client`, ce qui empêche de nombreux éléments de syntaxe de s'afficher correctement dans le panneau d'aperçu (ils sont en revanche **correctement rendus dans la zone de commentaires**).

Cela implique les limitations suivantes :

- La syntaxe emoji standard (par exemple :tada:`:tada:`) ne s'affiche pas correctement

- Les indices et exposants (par exemple : `H~2~O`, `x^2^`) ne peuvent pas être rendus correctement

- La syntaxe $\TeX$, c'est-à-dire les formules mathématiques (par exemple : `$a = 1$`), ne peut pas être rendue par défaut.

  Avec le client officiel, vous pouvez personnaliser le rendu $\TeX$ dans l'aperçu avec l'option `texRenderer`. Voir [Cookbook → Utiliser un moteur de rendu $\TeX$ personnalisé](../../cookbook/customize/tex-renderer.md).

- Avec le highlighter par défaut, les blocs de code sont colorés avec des couleurs aléatoires selon des délimiteurs spécifiques.

  Avec le client officiel, vous pouvez personnaliser la coloration syntaxique de l'aperçu avec l'option `highlighter`. Voir [Cookbook → Personnaliser la coloration du code](../../cookbook/customize/highlighter.md).

## Pour aller plus loin

::: tip Principe

1. Compte tenu de la taille du paquet, le client utilise `marked` pour le rendu et un highlighter de moins de 1 Ko pour la coloration par défaut, et n'inclut pas de moteur de rendu $\TeX$, d'où les limitations ci-dessus.

1. Lorsqu'un utilisateur soumet un commentaire, le client intègre l'image emoji personnalisée puis envoie le commentaire d'origine au serveur.

1. Le serveur reçoit le texte d'origine, utilise `markdown-it` avec les plugins adéquats pour rendre correctement le Markdown, `prismjs` pour colorer les blocs de code selon le langage, effectue le rendu $\TeX$ selon les réglages de l'utilisateur, puis applique le filtrage XSS.

1. Une fois le traitement terminé, le serveur stocke le contenu rendu correct et le renvoie au client lorsque nécessaire, afin de garantir un affichage normal de la zone de commentaires.

:::
