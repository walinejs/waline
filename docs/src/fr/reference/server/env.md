---
title: Variables d'environnement du serveur
icon: config
---

Vous pouvez personnaliser le serveur Waline à l'aide des variables d'environnement suivantes.

::: warning

Vous DEVEZ **redéployer** après la mise à jour des variables d'environnement pour que les modifications soient appliquées.

Lorsque vous utilisez Vercel, vous devez effectuer ces réglages via `Settings` - `Environment Variables`.

:::

<!-- more -->

## Général

| Variables d'environnement | Requis | Description                                                                           |
| ------------------------- | ------ | ------------------------------------------------------------------------------------- |
| `SITE_NAME`               |        | nom du site                                                                           |
| `SITE_URL`                |        | URL du site                                                                           |
| `LOGIN`                   |        | L'utilisateur doit se connecter avant de commenter lorsque `LOGIN=force`              |
| `SERVER_URL`              |        | URL du serveur Waline, utile lorsque l'adresse générée automatiquement est incorrecte |

## Affichage

| Variables d'environnement | Valeur par défaut                                                       | Description                                                                               |
| ------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `DISABLE_USERAGENT`       |                                                                         | Indique s'il faut masquer le user agent du commentateur. La valeur par défaut est `false` |
| `DISABLE_REGION`          |                                                                         | Indique s'il faut masquer la région du commentateur. La valeur par défaut est `false`     |
| `DISABLE_AUTHOR_NOTIFY`   |                                                                         | Indique s'il faut désactiver la notification à l'auteur                                   |
| `AVATAR_PROXY`            | `''`                                                                    | URL du service de proxy d'avatar. Laisser vide pour le désactiver                         |
| `GRAVATAR_STR`            | <span v-pre>`https://seccdn.libravatar.org/avatar/{{mail\|md5}}`</span> | Chaîne de rendu Gravatar, basée sur un modèle nunjucks                                    |
| `LEVELS`                  |                                                                         | Attribue une étiquette de niveau à chaque utilisateur selon le nombre de commentaires     |

::: tip Étiquette de niveau

Selon le nombre de commentaires de l'utilisateur, une étiquette de niveau est ajoutée au commentateur en fonction des conditions de notation. Cette fonctionnalité est désactivée par défaut et peut être activée en définissant la variable d'environnement `LEVELS`. La configuration se présente sous la forme d'une suite de nombres séparés par des virgules ; par exemple, `0,10,20,50,100,200` signifie :

| Niveaux | Conditions         | Étiquettes de niveau par défaut |
| ------- | ------------------ | ------------------------------- |
| 0       | 0 <= count < 10    | Dwarves                         |
| 1       | 10 <= count < 20   | Hobbits                         |
| 2       | 20 <= count < 50   | Ents                            |
| 3       | 50 <= count < 100  | Wizards                         |
| 4       | 100 <= count < 200 | Elves                           |
| 5       | 200 <= count       | Maiar                           |

Outre la personnalisation des règles de niveau, nous pouvons également personnaliser les libellés de niveau. Configurez le texte dans le client de la manière suivante :

```js
Waline.init({
  locale: {
    level0: 'Dwarves',
    level1: 'Hobbits',
    level2: 'Ents',
    level3: 'Wizards',
    level4: 'Elves',
    level5: 'Maiar',
  },
});
```

Par défaut, seuls 6 niveaux de libellés sont fournis, mais cela ne signifie pas qu'il ne peut y avoir que 6 niveaux. Le nombre maximal de niveaux dépend des règles de niveau que vous avez définies. Pour ajouter un nouveau niveau, il est recommandé de configurer vous-même le texte de l'étiquette correspondant à ce niveau. Si aucun texte n'est fourni, le texte par défaut tel que `Level 10` est affiché.

:::

## Sécurité

| Variables d'environnement | Valeur par défaut | Description                                                                                                                                                                          |
| ------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `IPQPS`                   | `60`              | Limite de fréquence de publication des commentaires par IP, en secondes. Définir sur 0 pour ne pas limiter                                                                           |
| `SECURE_DOMAINS`          |                   | Configuration des domaines sécurisés. Prend en charge plusieurs domaines séparés par des virgules                                                                                    |
| `AKISMET_KEY`             | `70542d86693e`    | Clé du service antispam Akismet ; définissez `false` si vous souhaitez le désactiver.                                                                                                |
| `COMMENT_AUDIT`           | `false`           | Activateur de l'audit des commentaires. Lorsqu'il est activé, chaque commentaire doit être approuvé par un administrateur ; il est donc recommandé de l'indiquer dans le placeholder |
| `RECAPTCHA_V3_KEY`        |                   | Clé reCAPTCHA V3, à définir également côté client                                                                                                                                    |
| `RECAPTCHA_V3_SECRET`     |                   | Secret reCAPTCHA V3 pour le serveur.                                                                                                                                                 |
| `TURNSTILE_KEY`           |                   | Clé Turnstile, à définir également côté client                                                                                                                                       |
| `TURNSTILE_SECRET`        |                   | Secret Turnstile pour le serveur                                                                                                                                                     |

::: tip reCAPTCHA et Turnstile

La clé et le secret Turnstile peuvent être demandés sur <https://www.cloudflare.com/products/turnstile/>.

La clé et le secret reCAPTCHA peuvent être demandés sur <https://www.google.com/recaptcha>.

Lors de la configuration des domaines de sécurité, vous devez ajouter à la fois l'adresse du site et l'adresse du serveur Waline.

:::

## Markdown

| Variables d'environnement | Valeur par défaut | Description                                                                       |
| ------------------------- | ----------------- | --------------------------------------------------------------------------------- |
| `MARKDOWN_CONFIG`         | `{}`              | Configuration de MarkdownIt                                                       |
| `MARKDOWN_HIGHLIGHT`      | `true`            | Active ou non la coloration syntaxique                                            |
| `MARKDOWN_EMOJI`          | `true`            | Active ou non les emojis                                                          |
| `MARKDOWN_SUB`            | `true`            | Active ou non l'indice                                                            |
| `MARKDOWN_SUP`            | `true`            | Active ou non l'exposant                                                          |
| `MARKDOWN_TEX`            | `mathjax`         | Service de rendu mathématique ; `mathjax`, `katex` et `false` sont pris en charge |
| `MARKDOWN_MATHJAX`        | `{}`              | Options de MathJax                                                                |
| `MARKDOWN_KATEX`          | `{}`              | Options de KaTeX                                                                  |

## Service de messagerie

Le service de messagerie sert aux notifications par e-mail lors de l'inscription des utilisateurs et des commentaires. Après avoir configuré les variables liées au service de messagerie, l'inscription des utilisateurs ajoute des opérations de confirmation par code de vérification envoyé par e-mail, afin de prévenir les inscriptions malveillantes.

| Nom de la variable d'environnement | Remarques                                 |
| ---------------------------------- | ----------------------------------------- |
| `SMTP_SERVICE`                     | Fournisseur de service de messagerie SMTP |
| `SMTP_HOST`                        | Adresse du serveur SMTP                   |
| `SMTP_PORT`                        | Port du serveur SMTP                      |
| `SMTP_USER`                        | Nom d'utilisateur SMTP                    |
| `SMTP_PASS`                        | Mot de passe SMTP.                        |
| `SMTP_SECURE`                      | Connexion SMTP via SSL                    |
| `SENDER_NAME`                      | Personnaliser le nom de l'expéditeur      |
| `SENDER_EMAIL`                     | Personnaliser l'e-mail de l'expéditeur    |

::: tip

Les fournisseurs de services pris en charge sont répertoriés dans [nodemailer services](https://github.com/nodemailer/nodemailer/blob/master/src/well-known/services.json). Vous pouvez choisir entre `SMTP_SERVICE` et (`SMTP_HOST`, `SMTP_PORT`). Si vous ne trouvez pas le `SMTP_SERVICE` correspondant dans la liste, vous devez configurer `SMTP_HOST` et `SMTP_PORT`, que vous trouverez probablement dans les paramètres de votre boîte aux lettres.

Le nom d'utilisateur SMTP correspond généralement à l'adresse e-mail complète de l'utilisateur, et le mot de passe est le plus souvent celui de la boîte aux lettres.

Faites particulièrement attention au fait que certaines boîtes aux lettres utilisent un mot de passe SMTP distinct.

:::

## Base de données

### MongoDB

| Variable d'environnement | Requis | Valeur par défaut | Description                                                   |
| ------------------------ | ------ | ----------------- | ------------------------------------------------------------- |
| `MONGO_DB`               | ✅     |                   | Nom de la base de données MongoDB                             |
| `MONGO_USER`             | ✅     |                   | Nom d'utilisateur du serveur MongoDB                          |
| `MONGO_PASSWORD`         | ✅     |                   | Mot de passe du serveur MongoDB                               |
| `MONGO_HOST`             |        | 127.0.0.1         | Adresse du serveur MongoDB, prend en charge le format tableau |
| `MONGO_PORT`             |        | 27017             | Port du serveur MongoDB, prend en charge le format tableau    |
| `MONGO_REPLICASET`       |        |                   | Ensemble de réplicas MongoDB                                  |
| `MONGO_AUTHSOURCE`       |        |                   | Source d'authentification MongoDB                             |
| `MONGO_OPT_SSL`          |        | `false`           | Utiliser une connexion SSL                                    |

### MySQL

| Variable d'environnement | Requis | Valeur par défaut | Description                        |
| ------------------------ | ------ | ----------------- | ---------------------------------- |
| `MYSQL_DB`               | ✅     |                   | Nom de la base de données MySQL    |
| `MYSQL_USER`             | ✅     |                   | Nom d'utilisateur du serveur MySQL |
| `MYSQL_PASSWORD`         | ✅     |                   | Mot de passe du serveur MySQL      |
| `MYSQL_HOST`             |        | 127.0.0.1         | Adresse du serveur MySQL           |
| `MYSQL_PORT`             |        | 3306              | Port du serveur MySQL              |
| `MYSQL_PREFIX`           |        | `wl_`             | Préfixe des tables MySQL           |
| `MYSQL_CHARSET`          |        | `utf8mb4`         | Jeu de caractères des tables MySQL |
| `MYSQL_SSL`              |        | `false`           | Utiliser ou non une connexion SSL  |

### TiDB

[Créer une base de données sur TiDB](../../../fr/guide/deploy/tidb.md)

| Variable d'environnement | Requis | Valeur par défaut | Description                       |
| ------------------------ | ------ | ----------------- | --------------------------------- |
| `TIDB_DB`                | ✅     |                   | Nom de la base de données TiDB    |
| `TIDB_USER`              | ✅     |                   | Nom d'utilisateur du serveur TiDB |
| `TIDB_PASSWORD`          | ✅     |                   | Mot de passe du serveur TiDB      |
| `TIDB_HOST`              |        | 127.0.0.1         | Adresse du serveur TiDB           |
| `TIDB_PORT`              |        | 4000              | Port du serveur TiDB              |
| `TIDB_PREFIX`            |        | `wl_`             | Préfixe des tables TiDB           |
| `TIDB_CHARSET`           |        | `utf8mb4`         | Jeu de caractères des tables TiDB |

### SQLite

| Variable d'environnement | Requis | Valeur par défaut | Description                                                                            |
| ------------------------ | ------ | ----------------- | -------------------------------------------------------------------------------------- |
| `SQLITE_PATH`            | ✅     |                   | Chemin du fichier de stockage SQLite, sans le nom du fichier                           |
| `JWT_TOKEN`              | ✅     |                   | Chaîne aléatoire pour le générateur de jetons de connexion                             |
| `SQLITE_DB`              |        | waline            | Nom du fichier de stockage SQLite, à modifier si votre nom de fichier n'est pas waline |
| `SQLITE_PREFIX`          |        | `wl_`             | Préfixe des tables SQLite                                                              |

### PostgreSQL

| Variable d'environnement | Requis | Valeur par défaut | Description                                        |
| ------------------------ | ------ | ----------------- | -------------------------------------------------- |
| `PG_DB`                  | ✅     |                   | Nom de la base de données PostgreSQL               |
| `PG_USER`                | ✅     |                   | Nom d'utilisateur du serveur PostgreSQL            |
| `PG_PASSWORD`            | ✅     |                   | Mot de passe du serveur PostgreSQL                 |
| `PG_HOST`                |        | 127.0.0.1         | Adresse du serveur PostgreSQL                      |
| `PG_PORT`                |        | 5432              | Port du serveur PostgreSQL                         |
| `PG_PREFIX`              |        | `wl_`             | Préfixe des tables PostgreSQL                      |
| `PG_SSL`                 |        | `false`           | Définir sur `true` pour utiliser une connexion SSL |
| `POSTGRES_DATABASE`      |        |                   | Alias de `PG_DB`                                   |
| `POSTGRES_USER`          |        |                   | Alias de `PG_USER`                                 |
| `POSTGRES_PASSWORD`      |        |                   | Alias de `PG_PASSWORD`                             |
| `POSTGRES_HOST`          |        | 127.0.0.1         | Alias de `PG_HOST`                                 |
| `POSTGRES_PORT`          |        | 5432              | Alias de `PG_PORT`                                 |
| `POSTGRES_PREFIX`        |        | `wl_`             | Alias de `PG_PREFIX`                               |
| `POSTGRES_SSL`           |        | `false`           | Alias de `PG_SSL`                                  |

### GitHub

| Variable d'environnement | Requis | Valeur par défaut | Description                                                                                                                                     |
| ------------------------ | ------ | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `GITHUB_TOKEN`           | ✅     |                   | [Jetons d'accès personnels](https://github.com/settings/tokens)                                                                                 |
| `GITHUB_REPO`            | ✅     |                   | Nom du dépôt, par exemple `walinejs/waline`                                                                                                     |
| GITHUB_PATH              |        |                   | Répertoire de stockage des données ; par exemple `data` signifie qu'elles sont stockées dans le répertoire `data`, répertoire racine par défaut |

## Avancé

| Variables d'environnement       | Valeur par défaut           | Description                                                                                                                               |
| ------------------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `OAUTH_URL`                     | `https://oauth.lithub.cc`   | URL du service de connexion sociale OAuth. Vous pouvez [créer votre propre service d'authentification](https://github.com/walinejs/auth). |
| `WEBHOOK`                       |                             | Vous pouvez définir une URL de Webhook qui sera déclenchée lorsque vous avez un nouveau commentaire.                                      |
| `WALINE_ADMIN_MODULE_ASSET_URL` | `//unpkg.com/@waline/admin` | Lien du panneau d'administration Waline                                                                                                   |
| `IP2REGION_DB`                  |                             | Chemin personnalisé de la bibliothèque de requête IP v4 (obsolète, utilisez plutôt `IP2REGION_DB_V4`)                                     |
| `IP2REGION_DB_V4`               |                             | Chemin personnalisé de la bibliothèque de requête IP v4. Retombe sur `IP2REGION_DB` s'il n'est pas défini                                 |
| `IP2REGION_DB_V6`               |                             | Chemin personnalisé de la bibliothèque de requête IP v6. Définissez cette variable pour activer la localisation des adresses IPv6         |
