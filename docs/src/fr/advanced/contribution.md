---
title: Guide de développement
icon: contribute
order: -1
---

Nous vous invitons à ouvrir des Pull Requests pour Waline ! :tada:

Si vous souhaitez contribuer à Waline, voici un guide.

<!-- more -->

## Préparation

1. Utiliser Git pour cloner le projet

   ```bash
   git clone https://github.com/walinejs/waline.git
   ```

1. Installer les dépendances

   ::: warning

   Installez et utilisez pnpm pour installer les dépendances.

   ```bash
   corepack enable
   ```

   :::

   ```bash
   cd waline
   pnpm ci
   ```

## Développement

- Exécutez `pnpm run client:dev` pour démarrer le serveur de développement de `@waline/client`

  ::: tip

  Waline reposant sur une architecture client/serveur, lorsque vous déboguez le client, vous devez définir `SERVERURL`, ou démarrer en même temps le serveur de développement ci-dessous et utiliser la valeur par défaut `localhost:9090`.

  :::

- Exécutez `pnpm run server:dev` pour démarrer le serveur de développement de `@waline/server`

  ::: tip

  Pour exécuter `@waline/server` en local, vous devez configurer quelques variables d'environnement locales dans `.env`.

  Nous vous fournissons un exemple dans `.env.example`.

  :::
