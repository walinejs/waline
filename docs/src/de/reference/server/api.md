---
title: API
icon: api
---

## Kommentar

### Kommentarliste

Kommentarliste für Artikel abrufen

```http
GET /api/comment
```

**Parameter**:

| Parameter | Typ    | Beschreibung                                                                                                                                                                                       |
| --------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| path      | string | Artikel-ID für Kommentar                                                                                                                                                                           |
| page      | number | Kommentarseite                                                                                                                                                                                     |
| pageSize  | number | Seitengröße der Kommentarliste                                                                                                                                                                     |
| sortBy    | string | Welcher Sortiertyp für die Kommentarliste, standardmäßig absteigende Sortierung nach Erstellungszeit, Sie können auch aufsteigend nach create_time oder absteigend nach Kommentar-Likes sortieren. |

### Kommentaranzahl

Kommentaranzahl für Artikel abrufen

```http
GET /api/comment?type=count
```

**Parameter**:

| Parameter | Typ    | Beschreibung                                                            |
| --------- | ------ | ----------------------------------------------------------------------- |
| url       | string | Artikel-ID für Kommentar, gibt Seiten-Kommentaranzahl zurück, wenn leer |

### Neueste Kommentare

Neueste Kommentare abrufen

```http
GET /api/comment?type=recent
```

**Parameter**:

| Parameter | Typ    | Beschreibung                          |
| --------- | ------ | ------------------------------------- |
| count     | number | Anzahl der zurückgegebenen Kommentare |

### Kommentar absenden

```http
POST /api/comment
```

**Parameter**:

| Parameter | Typ    | Beschreibung                                  |
| --------- | ------ | --------------------------------------------- |
| comment   | string | Kommentarinhalt                               |
| link      | string | Website des Kommentators                      |
| mail      | string | E-Mail des Kommentators                       |
| nick      | string | Nickname des Kommentators                     |
| pid       | string | Kommentar-ID, auf die geantwortet wurde       |
| rid       | string | Wurzel-Kommentar-ID, zu der sie gehört        |
| ua        | string | User-Agent des Kommentators                   |
| url       | string | Artikel-ID für Kommentar                      |
| at        | string | Kommentar-Nickname, auf den geantwortet wurde |

## Lesestatistik

### Lesestatistik abrufen

Anzahl der Lesevorgänge für einen oder mehrere Artikel abrufen.

```http
GET /api/article
```

**Parameter**:

| Parameter | Typ    | Beschreibung                                                               |
| --------- | ------ | -------------------------------------------------------------------------- |
| path      | string | Artikel-ID für Kommentar, mehrere IDs sollten mit Kommas verbunden werden. |

### Lesestatistik aktualisieren

Lesezählung eines Artikels aktualisieren.

```http
POST /api/article
```

**Parameter**:

| Parameter | Typ    | Beschreibung             |
| --------- | ------ | ------------------------ |
| path      | string | Artikel-ID für Kommentar |
