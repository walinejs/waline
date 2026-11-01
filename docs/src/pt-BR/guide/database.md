---
title: Suporte a múltiplos bancos de dados
icon: database
order: 2
---

O Waline é compatível com diversos bancos de dados, incluindo MySQL, PostgreSQL, SQLite e MongoDB.

Basta configurar as variáveis de ambiente: o Waline alterna automaticamente para o serviço de armazenamento de dados correspondente de acordo com as variáveis que você definir.

<!-- more -->

## MongoDB

O site oficial <https://mongodb.com> oferece, gratuitamente, um banco de dados MongoDB de 512M. A seguir estão as variáveis de ambiente que você precisa configurar para usar o banco de dados MongoDB.

| Variável de ambiente | Obrigatório | Padrão    | Descrição                                               |
| -------------------- | ----------- | --------- | ------------------------------------------------------- |
| `MONGO_DB`           | ✅          |           | Nome do banco de dados MongoDB                          |
| `MONGO_USER`         | ✅          |           | Nome de usuário do servidor MongoDB                     |
| `MONGO_PASSWORD`     | ✅          |           | Senha do servidor MongoDB                               |
| `MONGO_HOST`         |             | 127.0.0.1 | Endereço do servidor MongoDB, aceita o formato de array |
| `MONGO_PORT`         |             | 27017     | Porta do servidor MongoDB, aceita o formato de array    |
| `MONGO_REPLICASET`   |             |           | Conjunto de réplicas (replica set) do MongoDB           |
| `MONGO_AUTHSOURCE`   |             |           | Origem de autenticação do MongoDB (auth source)         |
| `MONGO_OPT_SSL`      |             | `false`   | usar conexão SSL                                        |

Veja abaixo um exemplo de configuração para o mongodb.com. Observe que, quando você tiver vários hosts, é preciso definir `MONGO_HOST` e `MONGO_PORT` no formato JSON.

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

Usar o MySQL para armazenar os dados também é uma boa escolha. Além do nosso próprio serviço MySQL, podemos usar o [FreeDB](https://freedb.tech), que oferece 25M de banco de dados gratuitamente, ou o [PlanetScale](https://planetscale.com), que no momento só oferece plano pago.

Se você quiser usar o MySQL como armazenamento, primeiro importe o [waline.sql](https://github.com/walinejs/waline/blob/main/assets/waline.sql) para criar a tabela e sua estrutura e, em seguida, defina estas variáveis de ambiente no projeto.

| Variável de ambiente | Obrigatório | Padrão    | Descrição                                   |
| -------------------- | ----------- | --------- | ------------------------------------------- |
| `MYSQL_DB`           | ✅          |           | Nome do banco de dados MySQL                |
| `MYSQL_USER`         | ✅          |           | Nome de usuário do servidor MySQL           |
| `MYSQL_PASSWORD`     | ✅          |           | Senha do servidor MySQL                     |
| `MYSQL_HOST`         |             | 127.0.0.1 | Endereço do servidor MySQL                  |
| `MYSQL_PORT`         |             | 3306      | Porta do servidor MySQL                     |
| `MYSQL_PREFIX`       |             | `wl_`     | Prefixo das tabelas do MySQL                |
| `MYSQL_CHARSET`      |             | `utf8mb4` | Conjunto de caracteres das tabelas do MySQL |
| `MYSQL_SSL`          |             | `false`   | se usa conexão SSL                          |

## TiDB

O [TiDB](https://github.com/pingcap/tidb) é um banco de dados NewSQL de código aberto. O [TiDB Cloud](https://tidbcloud.com/) é a versão online oficial e oferece uma cota gratuita de 5GB para todos usarem.

Consulte [Criar um banco de dados no TiDB](../../pt-BR/guide/deploy/tidb.md) para entender o processo de inicialização.

| Variável de ambiente | Obrigatório | Padrão    | Descrição                                           |
| -------------------- | ----------- | --------- | --------------------------------------------------- |
| `TIDB_DB`            | ✅          |           | Nome do banco de dados TiDB                         |
| `TIDB_USER`          | ✅          |           | Nome de usuário do banco de dados TiDB              |
| `TIDB_PASSWORD`      | ✅          |           | Senha do banco de dados TiDB                        |
| `TIDB_HOST`          |             | 127.0.0.1 | Endereço do serviço TiDB                            |
| `TIDB_PORT`          |             | 4000      | Porta do serviço TiDB                               |
| `TIDB_PREFIX`        |             | `wl_`     | Prefixo das tabelas de dados do TiDB                |
| `TIDB_CHARSET`       |             | `utf8mb4` | Conjunto de caracteres das tabelas de dados do TiDB |

## SQLite

Baixe o [waline.sqlite](https://github.com/walinejs/waline/blob/main/assets/waline.sqlite) para o seu servidor se quiser usar o SQLite. Depois, defina estas variáveis de ambiente no projeto.

| Variável de ambiente | Obrigatório | Padrão | Descrição                                                                                |
| -------------------- | ----------- | ------ | ---------------------------------------------------------------------------------------- |
| `SQLITE_PATH`        | ✅          |        | Caminho do arquivo de armazenamento do SQLite, sem incluir o nome do arquivo             |
| `JWT_TOKEN`          | ✅          |        | String aleatória para o gerador de token de login                                        |
| `SQLITE_DB`          |             | waline | Nome do arquivo de armazenamento do SQLite; altere se o seu arquivo não se chamar waline |
| `SQLITE_PREFIX`      |             | `wl_`  | Prefixo das tabelas do SQLite                                                            |

## PostgreSQL

O [Supabase](https://supabase.com) e o [Neon](https://neon.tech/home) oferecem um banco de dados de 512M gratuito, enquanto o [Tembo](https://tembo.io/) oferece suporte gratuito a um banco de dados PostgreSQL de 10G. Assim como no MySQL, você precisa importar o [waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql) para criar a tabela e sua estrutura antes de usar o PostgreSQL.

| Variável de ambiente | Obrigatório | Padrão    | Descrição                                |
| -------------------- | ----------- | --------- | ---------------------------------------- |
| `PG_DB`              | ✅          |           | Nome do banco de dados PostgreSQL        |
| `PG_USER`            | ✅          |           | Nome de usuário do servidor PostgreSQL   |
| `PG_PASSWORD`        | ✅          |           | Senha do servidor PostgreSQL             |
| `PG_HOST`            |             | 127.0.0.1 | Endereço do servidor PostgreSQL          |
| `PG_PORT`            |             | 5432      | Porta do servidor PostgreSQL             |
| `PG_PREFIX`          |             | `wl_`     | Prefixo das tabelas do PostgreSQL        |
| `PG_SSL`             |             | `false`   | defina como `true` para usar conexão SSL |
| `POSTGRES_DATABASE`  |             |           | alias de `PG_DB`                         |
| `POSTGRES_USER`      |             |           | alias de `PG_USER`                       |
| `POSTGRES_PASSWORD`  |             |           | alias de `PG_PASSWORD`                   |
| `POSTGRES_HOST`      |             | 127.0.0.1 | alias de `PG_HOST`                       |
| `POSTGRES_PORT`      |             | 5432      | alias de `PG_PORT`                       |
| `POSTGRES_PREFIX`    |             | `wl_`     | alias de `PG_PREFIX`                     |
| `POSTGRES_SSL`       |             | `false`   | alias de `PG_SSL`                        |

## GitHub

O Waline permite armazenar os dados dos comentários em um arquivo CSV no GitHub. Para usar o GitHub como armazenamento de dados, você precisa solicitar Personal access tokens. Clique em <kbd>Generate new token</kbd> para solicitar em <https://github.com/settings/tokens>. Marque a opção **repo** nas permissões para obter permissão de leitura e escrita nos repositórios.

| Variável de ambiente | Obrigatório | Padrão | Descrição                                                                                                                                |
| -------------------- | ----------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `GITHUB_TOKEN`       | ✅          |        | [Personal access tokens](https://github.com/settings/tokens)                                                                             |
| `GITHUB_REPO`        | ✅          |        | nome do repositório, como `walinejs/waline`                                                                                              |
| GITHUB_PATH          |             |        | Diretório de armazenamento dos dados; por exemplo, `data` significa que os dados ficam no diretório `data`, no diretório raiz por padrão |

::: warning

Por questões de desempenho, o uso do GitHub não é recomendado.

:::

## Personalizado

Além dos armazenamentos de banco de dados acima, também é possível adicionar suporte a outros serviços de armazenamento.

Se você quiser ajudar o Waline a oferecer suporte a mais serviços de armazenamento, pode fazer um fork do projeto, herdar a [classe base](https://github.com/walinejs/waline/blob/main/packages/server/src/service/storage/base.js) e então implementar os métodos `select()`, `add()`, `update()` e `delete()` do serviço de armazenamento correspondente e enviar o PR.
