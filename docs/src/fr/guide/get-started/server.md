---
title: Introduction au serveur
icon: server
order: 2
---

## Déploiement

En plus du déploiement gratuit sur Vercel, vous pouvez déployer via Docker, directement dans un environnement auto-hébergé, ou sur d'autres plateformes cloud courantes. Pour plus d'informations, voir :

- [Déploiement autonome](../deploy/vps.md)

- [Railway](../deploy/railway.md)

- [Alibaba Cloud Compute Nest](../deploy/aliyun-computenest.md)

## Prise en charge de plusieurs bases de données

Waline prend en charge plusieurs bases de données, notamment MySQL, PostgreSQL, SQLite et MongoDB.

Il vous suffit de configurer les variables d'environnement de la base de données correspondante : Waline bascule automatiquement vers le service de stockage de données adéquat.

Voir [prise en charge de plusieurs bases de données](../database.md) pour plus de détails.

## Configuration

La plupart des configurations côté serveur se font via des variables d'environnement, et vous pouvez également définir certaines options avancées dans le fichier d'entrée principal.

Pour le détail de la configuration, voir [Référence serveur → Variables d'environnement](../../reference/server/env.md) et [Référence serveur → Configuration](../../reference/server/config.md).

## Notification de commentaires

Nous prenons en charge plusieurs moyens de vous notifier, vous ou les personnes qui commentent, lorsqu'un commentaire est publié ou qu'une réponse est apportée. Voir [Notifications de commentaires](../features/notification.md) pour plus de détails.

## Inscription des utilisateurs et connexion sociale

Waline prend en charge la création de compte dans l'application ainsi que la connexion sociale via GitHub, Twitter et Facebook.

::: tip

Restez à l'écoute : nous prévoyons d'ajouter la prise en charge de nouvelles applications sociales dans les prochaines versions.

:::
