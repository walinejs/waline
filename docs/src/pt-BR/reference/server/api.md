---
title: API
icon: api
---

## Comentário

### Lista de comentários

Obter a lista de comentários de um artigo

```http
GET /api/comment
```

**Parâmetros**:

| Parâmetro | Tipo   | Descrição                                                                                                                                                                                                                  |
| --------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| path      | string | ID do artigo para o comentário                                                                                                                                                                                             |
| page      | number | Página de comentários                                                                                                                                                                                                      |
| pageSize  | number | Tamanho da página da lista de comentários                                                                                                                                                                                  |
| sortBy    | string | Tipo de ordenação da lista de comentários. Por padrão, ordena de forma decrescente pela data de criação; você também pode ordenar de forma crescente por create_time ou de forma decrescente pelas curtidas do comentário. |

### Contagem de comentários

Obter a contagem de comentários de um artigo

```http
GET /api/comment?type=count
```

**Parâmetros**:

| Parâmetro | Tipo   | Descrição                                                           |
| --------- | ------ | ------------------------------------------------------------------- |
| url       | string | ID do artigo para o comentário; retorna a contagem do site se vazio |

### Comentário recente

Obter comentários recentes

```http
GET /api/comment?type=recent
```

**Parâmetros**:

| Parâmetro | Tipo   | Descrição                 |
| --------- | ------ | ------------------------- |
| count     | number | Quantidade de comentários |

### Enviar comentário

```http
POST /api/comment
```

**Parâmetros**:

| Parâmetro | Tipo   | Descrição                                       |
| --------- | ------ | ----------------------------------------------- |
| comment   | string | conteúdo do comentário                          |
| link      | string | site do usuário que comenta                     |
| mail      | string | e-mail do usuário que comenta                   |
| nick      | string | apelido do usuário que comenta                  |
| pid       | string | ID do comentário ao qual esta é uma resposta    |
| rid       | string | ID do comentário raiz ao qual pertence          |
| ua        | string | user agent do usuário que comenta               |
| url       | string | ID do artigo para o comentário                  |
| at        | string | apelido do comentário que está sendo respondido |

## Estatísticas de leitura

### Obter estatísticas de leitura

Obtém o número de leituras correspondente a um artigo ou a vários artigos.

```http
GET /api/article
```

**Parâmetros**:

| Parâmetro | Tipo   | Descrição                                                                    |
| --------- | ------ | ---------------------------------------------------------------------------- |
| path      | string | ID do artigo para o comentário; vários IDs devem ser separados por vírgulas. |

### Atualizar estatísticas de leitura

Atualiza a contagem de leituras de um artigo.

```http
POST /api/article
```

**Parâmetros**:

| Parâmetro | Tipo   | Descrição                      |
| --------- | ------ | ------------------------------ |
| path      | string | ID do artigo para o comentário |
