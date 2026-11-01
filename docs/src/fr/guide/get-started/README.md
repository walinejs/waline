---
title: Commencer
icon: creative
dir:
  collapsible: false
  order: 1
---

Bienvenue dans Waline. En quelques étapes seulement, vous pouvez activer Waline pour proposer des commentaires et des pages vues sur votre site.

<!-- more -->

## Déploiement du serveur

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwalinejs%2Fwaline%2Ftree%2Fmain%2Fexample)

1. Cliquez sur le bouton ci-dessus pour accéder à Vercel et déployer le serveur.

   ::: note

   Si vous n'êtes pas connecté, Vercel vous invitera à vous inscrire ou à vous connecter. Utilisez votre compte GitHub pour une connexion rapide.

   :::

1. Saisissez le nom de projet Vercel de votre choix, puis cliquez sur `Create` pour continuer :

   ![create](../../../assets/vercel-1.png)

1. Vercel crée et initialise maintenant un nouveau dépôt à partir du modèle Waline. Le nom du dépôt sera celui du projet que vous venez de saisir.

   ![deploy](../../../assets/vercel-2.png)

   Au bout d'une ou deux minutes, des feux d'artifice apparaissent à l'écran pour célébrer le succès du déploiement. Cliquez sur `Go to Dashboard` pour accéder au tableau de bord de l'application.

   ![deploy](../../../assets/vercel-3.png)

## Créer une base de données

1. Cliquez sur `Storage` en haut pour ouvrir la page de configuration du stockage, puis choisissez `Create Database`. Sélectionnez `Neon` comme `Marketplace Database Providers`, puis cliquez sur `Continue` pour continuer.

   ![neon](../../../assets/vercel-5.png)

1. Il vous sera proposé de créer un compte Neon. Cliquez sur `Accept and Create` pour l'accepter et le créer. Vous choisirez ensuite l'offre de base de données, notamment la région et le quota. Vous pouvez tout laisser par défaut et cliquer sur `Continue`.

   ![neon](../../../assets/vercel-6.png)

1. Il vous sera ensuite demandé de définir le nom de la base de données. Vous pouvez également le laisser tel quel et cliquer sur `Continue`.

   ![neon](../../../assets/vercel-7.png)

1. Vous devriez maintenant voir le service de base de données que vous venez de créer sous `Storage`. Cliquez dessus et sélectionnez `Open in Neon` pour accéder à Neon. Dans l'interface Neon, choisissez `SQL Editor` dans la barre latérale gauche, collez les instructions SQL de [waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql) dans l'éditeur, puis cliquez sur `Run` pour créer les tables.

   ![neon](../../../assets/vercel-10.png)

   ![neon](../../../assets/vercel-11.png)

1. Après quelques instants, vous serez notifié que la création a réussi. Revenez sur Vercel, cliquez sur `Deployments` en haut, puis sur le bouton `Redeploy` à droite du dernier déploiement. Cette étape garantit la prise en compte du service de base de données nouvellement configuré.

   ![redeploy success](../../../assets/vercel-12.png)

1. Vous serez redirigé vers la page `Overview` et le déploiement commencera. Au bout d'un moment, le `STATUS` passera à `Ready`. Cliquez sur `Visit` pour ouvrir le site déployé. Cette URL est l'adresse de votre serveur.

   ![visit](../../../assets/vercel-14.png)

## Lier un domaine personnalisé

1. Cliquez sur `Settings` → `Domains` en haut pour ouvrir la page de configuration du domaine.

1. Saisissez le domaine que vous souhaitez lier, puis cliquez sur `Add`.

   ![Add domain](../../../assets/vercel-16.png)

1. Ajoutez un nouvel enregistrement `CNAME` chez votre fournisseur de domaine :

   | Type  | Nom     | Valeur               |
   | ----- | ------- | -------------------- |
   | CNAME | example | cname.vercel-dns.com |

1. Attendez que l'enregistrement DNS prenne effet. Vous pourrez alors accéder à Waline avec votre propre domaine 🎉
   - Système de commentaires : example.yourdomain.com
   - Gestion des commentaires : example.yourdomain.com/ui

   ![success](../../../assets/vercel-17.png)

## Importer dans le HTML

Voici comment ajouter Waline à votre page ou à votre site web :

1. Importez la feuille de style `https://unpkg.com/@waline/client@v3/dist/waline.css` dans le `<head>`

1. Créez une balise `<script>` et initialisez Waline avec `init()` importé de `https://unpkg.com/@waline/client@v3/dist/waline.js`, en passant les options `el` et `serverURL` nécessaires.
   - L'option `el` est l'élément utilisé pour le rendu de Waline. Vous pouvez fournir un sélecteur CSS sous forme de chaîne ou un objet HTMLElement.
   - `serverURL` est le lien vers votre serveur déployé, celui que vous venez de créer sur Vercel.
   - Pour plus d'options, consultez la [page des propriétés du composant](https://waline.js.org/fr/reference/client/props.html)

   Voici un exemple :

   ```html {3-7,12-18}:line-numbers
   <head>
     <!-- ... -->
     <link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css" />
   </head>
   <body>
     <!-- ... -->
     <div id="waline"></div>
     <script type="module">
       import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

       init({
         el: '#waline',
         serverURL: 'https://your-domain.vercel.app',
         lang: 'en',
       });
     </script>
   </body>
   ```

1. Le service de commentaires fonctionne désormais sur votre site :tada: !

## Gestion des commentaires

1. Une fois le déploiement terminé, rendez-vous sur `<serverURL>/ui/register` pour vous inscrire. La première personne à s'inscrire devient administratrice.

1. Après vous être connecté en tant qu'administrateur, vous pourrez accéder au tableau de bord de gestion des commentaires. Vous pouvez y modifier, marquer ou supprimer des commentaires.

1. Les utilisateurs peuvent également créer un compte depuis la zone de commentaires ; ils sont redirigés vers leur page de profil après la connexion.

## Tutoriel vidéo

Un utilisateur enthousiaste de Waline a réalisé le tutoriel vidéo suivant. Si les instructions ci-dessus ne sont pas claires, vous pouvez vous référer à la vidéo :

<VidStack src="https://www.youtube.com/watch?v=SzEHzsme8uY" />
