---
title: API
icon: api
---

## Comentarios

### Lista de comentarios

Obtiene la lista de comentarios de un artículo

```http
GET /api/comment
```

**Parámetros**:

| Parámetro | Tipo   | Descripción                                                                                                                                                                                                 |
| --------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| path      | string | Identificador del artículo del que se obtienen los comentarios                                                                                                                                              |
| page      | number | Página de comentarios                                                                                                                                                                                       |
| pageSize  | number | Tamaño de página de la lista de comentarios                                                                                                                                                                 |
| sortBy    | string | Tipo de ordenación de la lista de comentarios: por defecto orden descendente por fecha de creación; también puedes ordenar de forma ascendente por create_time o descendente por «me gusta» del comentario. |

### Recuento de comentarios

Obtiene el número de comentarios de un artículo

```http
GET /api/comment?type=count
```

**Parámetros**:

| Parámetro | Tipo   | Descripción                                                                                                              |
| --------- | ------ | ------------------------------------------------------------------------------------------------------------------------ |
| url       | string | Identificador del artículo del que se cuentan los comentarios; si está vacío, devuelve el total de comentarios del sitio |

### Comentarios recientes

Obtiene los comentarios recientes

```http
GET /api/comment?type=recent
```

**Parámetros**:

| Parámetro | Tipo   | Descripción                      |
| --------- | ------ | -------------------------------- |
| count     | number | Número de comentarios a devolver |

### Enviar un comentario

```http
POST /api/comment
```

**Parámetros**:

| Parámetro | Tipo   | Descripción                                |
| --------- | ------ | ------------------------------------------ |
| comment   | string | Contenido del comentario                   |
| link      | string | Sitio web del usuario que comenta          |
| mail      | string | Correo electrónico del usuario que comenta |
| nick      | string | Nombre del usuario que comenta             |
| pid       | string | Id del comentario al que se responde       |
| rid       | string | Id del comentario raíz al que pertenece    |
| ua        | string | User agent del usuario que comenta         |
| url       | string | Identificador del artículo del comentario  |
| at        | string | Nombre del comentario al que se responde   |

## Estadísticas de lectura

### Obtener las estadísticas de lectura

Obtiene el número de lecturas de un artículo o de varios artículos.

```http
GET /api/article
```

**Parámetros**:

| Parámetro | Tipo   | Descripción                                                                   |
| --------- | ------ | ----------------------------------------------------------------------------- |
| path      | string | Identificador del artículo; varios identificadores deben separarse con comas. |

### Actualizar las estadísticas de lectura

Actualiza el número de lecturas de un artículo.

```http
POST /api/article
```

**Parámetros**:

| Parámetro | Tipo   | Descripción                |
| --------- | ------ | -------------------------- |
| path      | string | Identificador del artículo |
