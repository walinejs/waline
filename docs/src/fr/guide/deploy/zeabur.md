---
title: Déploiement sur Zeabur
icon: zeabur
---

[Zeabur](https://zeabur.com) est une plateforme qui aide les développeurs à déployer leurs propres services en un clic. Elle est globalement similaire à Railway, mais propose plus de fonctionnalités, ne nécessite pas de lier une carte bancaire et offre une limite gratuite plus élevée.

<!-- more -->

## Déploiement en un clic

[![Deploy on Zeabur](https://zeabur.com/button.svg)](https://zeabur.com/templates/1IBY26?utm_source=waline)

## Déploiement à partir de zéro

Cliquez sur le bouton [Fork](https://github.com/walinejs/zeabur-starter/fork) pour créer un modèle de démarrage Zeabur.

![zeabur1](../../../assets/zeabur-1.png)

<https://dash.zeabur.com> Connectez-vous à la console Zeabur. S'il n'existe aucun projet, vous devez d'abord donner un nom au nouveau projet.

![zeabur2](../../../assets/zeabur-2.png)

Après être entré, cliquez sur <kbd>Add New Service</kbd> pour créer un service, puis sélectionnez <kbd>Deploy Other Service</kbd> - <kbd>Deploy MongoDB</kbd> pour créer d'abord un service de base de données.

Donnez un nom à notre service de base de données MongoDB, cliquez sur le bouton <kbd>Deploy</kbd>, et notre service de base de données est déployé.

![zeabur2](../../../assets/zeabur-3.png) ![zeabur4](../../../assets/zeabur-4.png)

Ensuite, nous continuons en cliquant sur <kbd>Add New Service</kbd> pour créer le service Waline ; cette fois, nous choisissons <kbd>Deploy Your Source Code</kbd>. Dans la liste de projets GitHub qui suit, trouvez le projet que nous avons forké au début et cliquez sur le bouton <kbd>Import</kbd> correspondant.

Donnez un nom à notre service Waline, cliquez sur le bouton <kbd>Deploy</kbd>, et notre service Waline est déployé.

![zeabur6](../../../assets/zeabur-6.png) ![zeabur7](../../../assets/zeabur-7.png)

Ne vous empressez pas de fermer le panneau du service Waline. Une fois le service déployé, nous devons ajouter un nom de domaine d'accès au service. Cliquez sur le bouton <kbd>Generate Domain</kbd> sous l'onglet <kbd>Domains</kbd>, saisissez le préfixe de nom de domaine souhaité et cliquez sur le bouton <kbd>Save</kbd> pour l'ajouter au nom de domaine d'accès de notre service.

![zeabur8](../../../assets/zeabur-8.png) ![zeabur9](../../../assets/zeabur-9.png)

Tout est prêt, et l'étape suivante consiste à assister au miracle. Ouvrez le nom de domaine d'accès que nous venons de configurer, testez la publication de commentaires, et tout fonctionne~ Ensuite, configurez ce nom de domaine dans le client et vous pourrez commenter joyeusement !

![zeabur2](../../../assets/zeabur-10.png)

## Comment mettre à jour

Rendez-vous sur le dépôt GitHub et modifiez le numéro de version de `@waline/vercel` dans le fichier package.json pour passer à la dernière version.

## Comment modifier les variables d'environnement

Vous pouvez accéder à la page de gestion des variables d'environnement via l'onglet <kbd>Variables</kbd> ; le service sera automatiquement redéployé après modification.

![zeabur11](../../../assets/zeabur-11.png)
