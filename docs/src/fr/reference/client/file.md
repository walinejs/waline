---
title: Fichiers du client
icon: file
---

`@waline/client` fournit plusieurs versions des fichiers

<!-- more -->

## Liste des fichiers CDN

- `dist/waline.js` : version complète, au format ESM

  Ce fichier est la version recommandée pour importer `@waline/client`, 100 Ko gzip

- `dist/waline.umd.js` : version complète, au format UMD

- `dist/slim.js` : version complète sans les dépendances intégrées, au format ES Module

  Ce fichier est le fichier par défaut pour importer `@waline/client` avec Node.js, 27 Ko gzip

- `dist/waline.css` : styles CSS de Waline

- `dist/waline-meta.css` : CSS des icônes méta de Waline

- `dist/component.js` : composant Vue de Waline, au format ES Module, sans intégration des dépendances

  Ce fichier sert à utiliser les commentaires Waline en mode composant dans un projet Vue, 25 Ko gzip

- `dist/comment.js` : module de comptage des commentaires de Waline, au format ESM, < 1 Ko gzip

  Ce fichier sert à l'import via CDN, lorsqu'on a seulement besoin du nombre de commentaires de la page

- `dist/pageview.js` : module de pages vues de Waline, au format ESM, < 1 Ko gzip

  Ce fichier sert à l'import via CDN, lorsqu'on a seulement besoin des pages vues

## Exports des modules

`@waline/client` est un module ESM standard, qui nécessite Node.js version >= 22 :

- `@waline/client` : point d'entrée principal de Waline, sans les dépendances intégrées

- `@waline/client/waline.css` : fichier de style de Waline

- `@waline/client/waline-meta.css` : fichier de style des icônes méta de Waline

- `@waline/client/comment` : module de comptage des commentaires de Waline

- `@waline/client/pageview` : module de comptage des pages vues de Waline

- `@waline/client/full` : point d'entrée principal de Waline avec toutes les dépendances intégrées
