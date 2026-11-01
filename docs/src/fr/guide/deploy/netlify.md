---
title: Déploiement sur Netlify
icon: netlify
---

[Netlify](https://netlify.com) est un fournisseur bien connu de services de déploiement de sites statiques, et [Edge Functions](https://www.netlify.com/blog/edge-functions-explained/) est un service lancé par Netlify qui permet d'exécuter du code JavaScript sur les nœuds de périphérie des sites web.

<!-- more -->

## Comment déployer

Cliquez sur le bouton [Fork](https://github.com/walinejs/netlify-starter/fork) pour créer un modèle de démarrage Netlify.

![netlify](../../../assets/netlify-1.png)

<https://app.netlify.com> Connectez-vous à la console Netlify, puis sélectionnez <kbd>Add new site</kbd> - <kbd>Import an exist project</kbd> pour ajouter le site. Sélectionnez l'autorisation GitHub pour lire la liste de vos projets GitHub. Recherchez dans la liste le nom du dépôt créé par le Fork que vous venez d'effectuer, puis cliquez sur le projet pour commencer à créer notre site Netlify à partir de ce dépôt.

![netlify](../../../assets/netlify-2.png) ![netlify](../../../assets/netlify-3.png)

Avant de créer un site Netlify, nous devons renseigner quelques informations de configuration. Hormis les variables d'environnement, nous pouvons conserver les valeurs par défaut pour les autres informations. Reportez-vous à la section [Prise en charge de plusieurs bases de données](../database.md) pour ajouter les variables d'environnement du service de stockage correspondant, puis cliquez sur <kbd>Deploy site</kbd> en bas pour lancer le déploiement du site.

![netlify](../../../assets/netlify-4.png)

Au bout de quelques instants, notre site Netlify est déployé avec succès. Nous pouvons cliquer sur la barre de navigation <kbd>Functions</kbd> en haut pour afficher la liste des fonctions cloud, où `comment` correspond à notre service Waline déployé. Cliquez dessus pour accéder à la page de détails de la fonction cloud.

![netlify](../../../assets/netlify-5.png)

Sur la page de détails, l'adresse indiquée dans `Endpoint` est l'adresse de déploiement de notre service Waline. Cliquez sur le bouton de copie à droite, ouvrez-la dans un nouvel onglet, testez la publication de commentaires, et tout fonctionne~ Ensuite, configurez ce nom de domaine dans le client et vous pourrez commenter joyeusement !

![netlify](../../../assets/netlify-6.png) ![netlify](../../../assets/netlify-8.png)

## Comment mettre à jour

Rendez-vous sur le dépôt GitHub et modifiez le numéro de version de `@waline/vercel` dans le fichier package.json pour passer à la dernière version.

## Comment modifier les variables d'environnement

Cliquez sur la barre de navigation `Site settings` en haut, sélectionnez la barre latérale `Environments variables` et accédez à la page de gestion des variables d'environnement. Cliquez sur le bouton `Add a variable` pour ajouter une variable d'environnement.

Après avoir modifié les variables d'environnement, nous devons accéder à la page `Deploys`, sélectionner `Trigger deploy` - `Deploy site` pour redéployer le site afin que les variables d'environnement prennent effet.

![netlify](../../../assets/netlify-9.png) ![netlify](../../../assets/netlify-10.png)
