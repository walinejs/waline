---
title: Déploiement sur Vercel
icon: vercel
order: 1
---

Nous avons publié le paquet `@waline/vercel` en tant que paquet serveur ; le déploiement sur Vercel est également notre méthode la plus recommandée.

<!-- more -->

## Comment déployer

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwalinejs%2Fwaline%2Ftree%2Fmain%2Fexample)

1. Cliquez sur le bouton bleu ci-dessus ; vous serez redirigé vers Vercel pour déployer avec le modèle Waline.

   ::: note

   Si vous n'êtes pas connecté, nous vous recommandons de vous connecter avec GitHub.

   :::

1. Saisissez le nom de votre projet Vercel, puis cliquez sur `Create`.

   ![Create Project](../../../assets/vercel-1.png)

1. Le dépôt que vous venez de nommer sera créé et initialisé automatiquement par Vercel à partir du modèle d'exemple Waline.

   ![new project](../../../assets/vercel-2.png)

   Au bout d'une minute ou deux, Vercel devrait avoir terminé le déploiement. Cliquez sur le bouton `Go to Dashboard` pour accéder au tableau de bord de votre application.

   ![dashboard](../../../assets/vercel-3.png)

## Créer la base de données

1. Cliquez sur `Storage` en haut pour accéder à la page des services de stockage, puis choisissez `Create Database`. Sous `Marketplace Database Providers`, sélectionnez `Neon`, puis cliquez sur `Continue`.

   ![storage](../../../assets/vercel-5.png)

1. Il vous sera demandé de créer un compte Neon. Choisissez `Accept and Create`. Sélectionnez ensuite la configuration de l'offre de base de données, notamment la région et le quota. Vous pouvez conserver les valeurs par défaut et cliquer sur `Continue`.

   ![neon](../../../assets/vercel-6.png)

1. Définissez le nom de la base de données. Vous pouvez conserver la valeur par défaut et cliquer sur `Continue`.

   ![neon](../../../assets/vercel-7.png)

1. La base de données apparaît maintenant sous `Storage`. Cliquez dessus et choisissez `Open in Neon` pour accéder à Neon. Dans Neon, sélectionnez `SQL Editor` à gauche, collez le SQL de [waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql) dans l'éditeur, puis cliquez sur `Run` pour créer les tables.

   ![neon](../../../assets/vercel-10.png)

   ![neon](../../../assets/vercel-11.png)

1. Au bout de quelques instants, un message de réussite devrait s'afficher. Revenez sur Vercel, cliquez sur `Deployments`, puis sur `Redeploy` sur le dernier déploiement pour que la nouvelle configuration de base de données prenne effet.

   ![redeploy success](../../../assets/vercel-12.png)

1. Vercel vous redirigera vers `Overview` et lancera le déploiement. Lorsque `STATUS` passe à `Ready`, cliquez sur `Visit` pour ouvrir le site déployé. Cette URL est l'adresse de votre serveur.

   ![visit](../../../assets/vercel-14.png)

## Attribuer un domaine

1. Cliquez sur <kbd>Settings</kbd> - <kbd>Domains</kbd> pour accéder à la page de configuration des domaines.

1. Saisissez le domaine que vous souhaitez attribuer et cliquez sur le bouton <kbd>Add</kbd>.

   ![Add domain](../../../assets/vercel-16.png)

1. Ajoutez un nouvel enregistrement `CNAME` chez votre fournisseur de noms de domaine.

   | Type  | Nom     | Valeur               |
   | ----- | ------- | -------------------- |
   | CNAME | example | cname.vercel-dns.com |

1. Une fois le domaine effectif, vous pouvez utiliser votre propre domaine pour accéder à Waline. :tada:
   - Système de commentaires : example.your-domain.com
   - Panneau d'administration : example.your-domain.com/ui

   ![success](../../../assets/vercel-17.png)

## Importation HTML

Configurez les éléments suivants dans votre page web :

1. Importez les styles Waline depuis `https://unpkg.com/@waline/client@v3/dist/waline.css`.
2. Créez une balise `<script>` qui utilise `init()` depuis `https://unpkg.com/@waline/client@v3/dist/waline.js`, et passez les options requises `el` et `serverURL`.
   - `el` est l'élément utilisé pour afficher Waline. Il peut s'agir d'une chaîne de sélecteur CSS ou d'un HTMLElement.
   - `serverURL` est l'adresse de votre serveur obtenue à l'étape précédente.

```html {3-7,12-18}:line-numbers
<head>
  <!-- ... -->
  <link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css" />
  <!-- ... -->
</head>
<body>
  <!-- ... -->
  <div id="waline"></div>
  <script type="module">
    import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

    init({
      el: '#waline',
      serverURL: 'https://your-domain.vercel.app',
    });
  </script>
</body>
```

## Administration des commentaires

1. Après le déploiement, visitez `<serverURL>/ui/register` pour vous inscrire. Le premier utilisateur inscrit devient l'administrateur.
2. Après la connexion, l'administrateur peut gérer les commentaires : les modifier, les marquer ou les supprimer.
3. Les utilisateurs peuvent également s'inscrire via la zone de commentaires. Après la connexion, ils seront redirigés vers leur page de profil.
