---
title: Déploiement sur Railway
icon: railway
---

[Railway](https://railway.app/) est une plateforme Serverless gratuite ; nous pouvons déployer Waline facilement sur la plateforme Railway.

<!-- more -->

## Comment déployer

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/UZB84v?referralCode=lizheming)

Cliquez sur ce bouton pour être redirigé vers la plateforme railway.app et déployer rapidement. Après vous être connecté, vous pouvez saisir le nom de votre nouveau dépôt GitHub ou conserver la valeur par défaut, puis cliquez sur le bouton <kbd>Deploy</kbd> en bas pour déployer. Notez que la partie relative aux variables d'environnement ne doit pas être modifiée.

![railway1](../../../assets/railway-1.jpg)

Au bout d'un moment, vous serez redirigé vers le tableau de bord. Cliquez sur <kbd>PostgreSQL</kbd> - <kbd>Query</kbd> et collez le contenu du fichier [waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql) dans la zone de texte, puis cliquez sur le bouton <kbd>Run Query</kbd> en bas pour initialiser la base de données.

![railway2](../../../assets/railway-2.jpg)

Enfin, vous pouvez cliquer sur <kbd>Deployments</kbd> - <kbd>Domains</kbd> pour obtenir l'URL du serveur. Copiez l'URL du site et saisissez-la dans la configuration `serverURL` du client. Vous pouvez ensuite profiter de Waline !

![railway3](../../../assets/railway-3.jpg)

## Comment mettre à jour

Rendez-vous sur le dépôt GitHub correspondant et modifiez le numéro de version de `@waline/vercel` dans le fichier package.json pour passer à la dernière version.

## Comment modifier les variables d'environnement

Cliquez sur l'onglet <kbd>Variables</kbd> pour accéder à la page de gestion des variables d'environnement. Le déploiement sera automatiquement relancé après la modification d'une variable.

![railway4](../../../assets/railway-4.jpg)
