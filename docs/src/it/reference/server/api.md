---
title: API
icon: api
---

## Commenti

### Lista dei commenti

Ottieni la lista dei commenti di un articolo

```http
GET /api/comment
```

**Parametri**:

| Parametro | Tipo   | Descrizione                                                                                                                                                                                                                   |
| --------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| path      | string | ID dell'articolo del commento                                                                                                                                                                                                 |
| page      | number | Pagina dei commenti                                                                                                                                                                                                           |
| pageSize  | number | Dimensione della pagina della lista dei commenti                                                                                                                                                                              |
| sortBy    | string | Tipo di ordinamento della lista dei commenti: per impostazione predefinita ordina per data di creazione in modo decrescente; puoi anche ordinare per create_time in modo crescente oppure per «mi piace» in modo decrescente. |

### Conteggio dei commenti

Ottieni il numero di commenti di un articolo

```http
GET /api/comment?type=count
```

**Parametri**:

| Parametro | Tipo   | Descrizione                                                                                |
| --------- | ------ | ------------------------------------------------------------------------------------------ |
| url       | string | ID dell'articolo del commento; se vuoto restituisce il numero di commenti dell'intero sito |

### Commenti recenti

Ottieni i commenti recenti

```http
GET /api/comment?type=recent
```

**Parametri**:

| Parametro | Tipo   | Descrizione                      |
| --------- | ------ | -------------------------------- |
| count     | number | numero di commenti da restituire |

### Invia un commento

```http
POST /api/comment
```

**Parametri**:

| Parametro | Tipo   | Descrizione                             |
| --------- | ------ | --------------------------------------- |
| comment   | string | contenuto del commento                  |
| link      | string | sito dell'utente che commenta           |
| mail      | string | e-mail dell'utente che commenta         |
| nick      | string | nickname dell'utente che commenta       |
| pid       | string | ID del commento a cui si risponde       |
| rid       | string | ID del commento radice a cui appartiene |
| ua        | string | user agent dell'utente che commenta     |
| url       | string | ID dell'articolo del commento           |
| at        | string | nickname del commento a cui si risponde |

## Statistiche di lettura

### Ottieni le statistiche di lettura

Ottieni il numero di visualizzazioni di uno o più articoli.

```http
GET /api/article
```

**Parametri**:

| Parametro | Tipo   | Descrizione                                                      |
| --------- | ------ | ---------------------------------------------------------------- |
| path      | string | ID dell'articolo del commento; più ID vanno separati da virgole. |

### Aggiorna le statistiche di lettura

Aggiorna il conteggio delle visualizzazioni di un articolo.

```http
POST /api/article
```

**Parametri**:

| Parametro | Tipo   | Descrizione                   |
| --------- | ------ | ----------------------------- |
| path      | string | ID dell'articolo del commento |
