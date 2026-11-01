---
title: Créer une base de données sur TiDB
icon: tidb
---

[TiDB](https://github.com/pingcap/tidb) est une base de données NewSQL open source. [TiDB Cloud](https://tidbcloud.com/) en est la version en ligne officielle, qui offre à chacun 5 Go de stockage gratuit. Voici comment créer une base de données Waline sur TiDB Cloud.

## Créer la base de données

1. Après vous être connecté à [TiDB Cloud](https://tidbcloud.com), une instance TiDB est créée automatiquement ; cliquez directement sur <kbd>cluster0</kbd> pour accéder à l'instance.

   ![Enter instance](../../../assets/tidb-1.png)

2. Sélectionnez <kbd>SQL Editor</kbd> dans la liste de gauche et remplacez le contenu de [waline.tidb](https://github.com/walinejs/waline/blob/main/assets/waline.tidb) en séparant les instructions par `;`. Exécutez ensuite les instructions une à une dans l'interface : cliquez sur le bouton bleu <kbd>Run</kbd> en haut à droite pour chaque instruction, ou utilisez le raccourci <kbd>Ctrl\/Command</kbd> + <kbd>Enter</kbd>
   ![Step1](../../../assets/tidb-2.png)
   ![Step2](../../../assets/tidb-3.png)
   ![Step3](../../../assets/tidb-4.png)
   ![Step4](../../../assets/tidb-5.png)
   ![Step5](../../../assets/tidb-6.png)

La base de données Waline est désormais créée !

## Obtenir la configuration de connexion

Cliquez sur le bouton <kbd>Overview</kbd> à gauche pour revenir à la page d'accueil, puis sélectionnez <kbd>Connect</kbd> en haut à droite pour obtenir les informations de connexion.

Définissez « Connect with » sur `General`. Cliquez également sur <kbd>Reset password</kbd> sur la ligne suivante pour générer un nouveau mot de passe.

De cette façon, vous pouvez obtenir la configuration relative à la connexion.

![Connection](../../../assets/tidb-7.png)

## Déploiement sur Vercel

Créez un compte Vercel, ajoutez un projet et déployez le service Waline. Ouvrez ensuite les <kbd>Settings</kbd> du projet et accédez à `Environment Variables`. Cliquez sur <kbd>Add Environment Variable</kbd> et ajoutez les variables suivantes : `TIDB_HOST`, `TIDB_PORT`, `TIDB_DB`, `TIDB_USER` et `TIDB_PASSWORD`. Après avoir ajouté ces variables, redéployez le projet.

![Configure TiDB connection](../../../assets/tidb-8.png)
