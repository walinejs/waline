---
title: Prise en charge de plusieurs bases de données
icon: database
order: 2
---

Waline prend en charge plusieurs bases de données, dont MySQL, PostgreSQL, SQLite et MongoDB.

Il vous suffit de configurer des variables d'environnement : Waline basculera automatiquement vers le service de stockage de données correspondant en fonction des variables d'environnement que vous avez configurées.

<!-- more -->

## MongoDB

<https://mongodb.com> propose gratuitement une base de données MongoDB de 512 Mo. Voici les variables d'environnement à configurer pour utiliser une base de données MongoDB.

| Variable d'environnement | Requis | Valeur par défaut | Description                                               |
| ------------------------ | ------ | ----------------- | --------------------------------------------------------- |
| `MONGO_DB`               | ✅     |                   | Nom de la base de données MongoDB                         |
| `MONGO_USER`             | ✅     |                   | Nom d'utilisateur du serveur MongoDB                      |
| `MONGO_PASSWORD`         | ✅     |                   | Mot de passe du serveur MongoDB                           |
| `MONGO_HOST`             |        | 127.0.0.1         | Adresse du serveur MongoDB, format tableau pris en charge |
| `MONGO_PORT`             |        | 27017             | Port du serveur MongoDB, format tableau pris en charge    |
| `MONGO_REPLICASET`       |        |                   | Replica set MongoDB                                       |
| `MONGO_AUTHSOURCE`       |        |                   | Source d'authentification MongoDB                         |
| `MONGO_OPT_SSL`          |        | `false`           | Utiliser une connexion SSL                                |

Voici un exemple de configuration pour mongodb.com. Notez que vous devez indiquer `MONGO_HOST` et `MONGO_PORT` au format JSON lorsque vous disposez de plusieurs hôtes.

```bash
MONGO_HOST=["cluster0-shard-00-00.p4edw.mongodb.net","cluster0-shard-00-01.p4edw.mongodb.net","cluster0-shard-00-02.p4edw.mongodb.net"]
MONGO_PORT=[27017,27017,27017,27017]
MONGO_DB=waline
MONGO_USER=admin
MONGO_PASSWORD=xxxx
MONGO_REPLICASET=atlas-12cebf-shard-0
MONGO_AUTHSOURCE=admin
MONGO_OPT_SSL=true
```

## MySQL

Utiliser MySQL pour stocker les données est également un bon choix. Outre notre propre service MySQL, nous pouvons aussi recourir à [FreeDB)(https://freedb.tech), qui offre gratuitement une base de données de 25 Mo, ou à [PlanetScale](https://planetscale.com), qui ne propose désormais que des offres payantes.

Si vous souhaitez utiliser MySQL comme stockage, vous devez d'abord importer [waline.sql](https://github.com/walinejs/waline/blob/main/assets/waline.sql) pour créer la table et sa structure, puis définir ces variables d'environnement dans le projet.

| Variable d'environnement | Requis | Valeur par défaut | Description                                  |
| ------------------------ | ------ | ----------------- | -------------------------------------------- |
| `MYSQL_DB`               | ✅     |                   | Nom de la base de données MySQL              |
| `MYSQL_USER`             | ✅     |                   | Nom d'utilisateur du serveur MySQL           |
| `MYSQL_PASSWORD`         | ✅     |                   | Mot de passe du serveur MySQL                |
| `MYSQL_HOST`             |        | 127.0.0.1         | Adresse du serveur MySQL                     |
| `MYSQL_PORT`             |        | 3306              | Port du serveur MySQL                        |
| `MYSQL_PREFIX`           |        | `wl_`             | Préfixe des tables MySQL                     |
| `MYSQL_CHARSET`          |        | `utf8mb4`         | Jeu de caractères des tables MySQL           |
| `MYSQL_SSL`              |        | `false`           | Indique s'il faut utiliser une connexion SSL |

## TiDB

[TiDB](https://github.com/pingcap/tidb) est une base de données NewSQL open source. [TiDB Cloud](https://tidbcloud.com/) en est la version en ligne officielle, qui offre à chacun un quota gratuit de 5 Go.

Veuillez consulter [Créer une base de données TiDB](../../fr/guide/deploy/tidb.md) pour comprendre le processus d'initialisation.

| Variable d'environnement | Requis | Valeur par défaut | Description                                  |
| ------------------------ | ------ | ----------------- | -------------------------------------------- |
| `TIDB_DB`                | ✅     |                   | Nom de la base de données TiDB               |
| `TIDB_USER`              | ✅     |                   | Nom d'utilisateur de la base de données TiDB |
| `TIDB_PASSWORD`          | ✅     |                   | Mot de passe de la base de données TiDB      |
| `TIDB_HOST`              |        | 127.0.0.1         | Adresse du service TiDB                      |
| `TIDB_PORT`              |        | 4000              | Port du service TiDB                         |
| `TIDB_PREFIX`            |        | `wl_`             | Préfixe des tables de données TiDB           |
| `TIDB_CHARSET`           |        | `utf8mb4`         | Jeu de caractères des tables de données TiDB |

## SQLite

Téléchargez [waline.sqlite](https://github.com/walinejs/waline/blob/main/assets/waline.sqlite) sur votre serveur si vous souhaitez utiliser SQLite. Définissez ensuite ces variables d'environnement dans le projet.

| Variable d'environnement | Requis | Valeur par défaut | Description                                                                             |
| ------------------------ | ------ | ----------------- | --------------------------------------------------------------------------------------- |
| `SQLITE_PATH`            | ✅     |                   | Chemin du fichier de stockage SQLite, sans inclure le nom du fichier                    |
| `JWT_TOKEN`              | ✅     |                   | Chaîne aléatoire utilisée pour générer le jeton de connexion                            |
| `SQLITE_DB`              |        | waline            | Nom du fichier de stockage SQLite, modifiez-le si votre fichier ne s'appelle pas waline |
| `SQLITE_PREFIX`          |        | `wl_`             | Préfixe des tables SQLite                                                               |

## PostgreSQL

[Supabase](https://supabase.com) et [Neon](https://neon.tech/home) offrent une base de données gratuite de 512 Mo, tandis que [Tembo](https://tembo.io/) propose gratuitement une base de données PostgreSQL de 10 Go. Comme pour MySQL, vous devez importer [waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql) pour créer la table et sa structure avant d'utiliser PostgreSQL.

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

## GitHub

Waline prend en charge le stockage des données de commentaires dans un fichier CSV sur GitHub. Pour utiliser GitHub comme stockage de données, vous devez créer un jeton d'accès personnel. Vous pouvez cliquer sur <kbd>Generate new token</kbd> pour en créer un sur <https://github.com/settings/tokens>. Cochez l'option **repo** dans les autorisations afin d'obtenir les droits de lecture et d'écriture sur les dépôts.

| Variable d'environnement | Requis | Valeur par défaut | Description                                                                                                                                            |
| ------------------------ | ------ | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `GITHUB_TOKEN`           | ✅     |                   | [Jeton d'accès personnel](https://github.com/settings/tokens)                                                                                          |
| `GITHUB_REPO`            | ✅     |                   | Nom du dépôt, par exemple `walinejs/waline`                                                                                                            |
| GITHUB_PATH              |        |                   | Répertoire de stockage des données ; par exemple `data` signifie que les données sont stockées dans le répertoire `data`, répertoire racine par défaut |

::: warning

Pour des raisons de performances, l'utilisation de GitHub n'est pas recommandée.

:::

## Personnalisé

Outre le stockage en base de données décrit ci-dessus, il est également possible d'ajouter la prise en charge d'autres services de stockage.

Si vous souhaitez aider Waline à prendre en charge davantage de services de stockage, vous pouvez forker le projet, hériter de la [classe de base](https://github.com/walinejs/waline/blob/main/packages/server/src/service/storage/base.js), puis implémenter les méthodes `select()`, `add()`, `update()` et `delete()` du service de stockage correspondant et soumettre la PR.
