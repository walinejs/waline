---
title: API
icon: api
---

## Commentaires

### Liste des commentaires

Récupère la liste des commentaires d'un article

```http
GET /api/comment
```

**Paramètres** :

| Paramètre | Type   | Description                                                                                                                                                                                                                  |
| --------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| path      | string | Identifiant de l'article concerné par les commentaires                                                                                                                                                                       |
| page      | number | Page de commentaires                                                                                                                                                                                                         |
| pageSize  | number | Taille de page de la liste des commentaires                                                                                                                                                                                  |
| sortBy    | string | Type de tri de la liste des commentaires : par défaut tri décroissant par date de création, vous pouvez aussi trier de façon croissante par create_time, ou de façon décroissante par nombre de « j'aime » des commentaires. |

### Nombre de commentaires

Récupère le nombre de commentaires d'un article

```http
GET /api/comment?type=count
```

**Paramètres** :

| Paramètre | Type   | Description                                                                                                            |
| --------- | ------ | ---------------------------------------------------------------------------------------------------------------------- |
| url       | string | Identifiant de l'article concerné par les commentaires ; renvoie le nombre total de commentaires du site s'il est vide |

### Commentaires récents

Récupère les commentaires récents

```http
GET /api/comment?type=recent
```

**Paramètres** :

| Paramètre | Type   | Description                     |
| --------- | ------ | ------------------------------- |
| count     | number | Nombre de commentaires renvoyés |

### Publier un commentaire

```http
POST /api/comment
```

**Paramètres** :

| Paramètre | Type   | Description                                            |
| --------- | ------ | ------------------------------------------------------ |
| comment   | string | Contenu du commentaire                                 |
| link      | string | Site du commentateur                                   |
| mail      | string | E-mail du commentateur                                 |
| nick      | string | Pseudonyme du commentateur                             |
| pid       | string | Identifiant du commentaire auquel on répond            |
| rid       | string | Identifiant du commentaire racine d'origine            |
| ua        | string | User agent du commentateur                             |
| url       | string | Identifiant de l'article concerné par les commentaires |
| at        | string | Pseudonyme du commentaire auquel on répond             |

## Statistiques de lecture

### Obtenir les statistiques de lecture

Récupère le nombre de lectures correspondant à un article ou à plusieurs articles.

```http
GET /api/article
```

**Paramètres** :

| Paramètre | Type   | Description                                                                                                            |
| --------- | ------ | ---------------------------------------------------------------------------------------------------------------------- |
| path      | string | Identifiant de l'article concerné par les commentaires ; plusieurs identifiants doivent être séparés par des virgules. |

### Mettre à jour les statistiques de lecture

Met à jour le nombre de lectures d'un article.

```http
POST /api/article
```

**Paramètres** :

| Paramètre | Type   | Description                                            |
| --------- | ------ | ------------------------------------------------------ |
| path      | string | Identifiant de l'article concerné par les commentaires |
