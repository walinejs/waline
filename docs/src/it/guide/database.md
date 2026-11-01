---
title: Supporto a più servizi di database
icon: database
order: 2
---

Waline supporta diversi database, tra cui MySQL, PostgreSQL, SQLite e MongoDB.

Devi solo configurare le variabili d'ambiente e Waline passerà automaticamente al servizio di archiviazione dati corrispondente in base alle variabili d'ambiente che hai configurato.

<!-- more -->

## MongoDB

<https://mongodb.com> offre ufficialmente 512M di database MongoDB gratuitamente. Di seguito trovi le variabili d'ambiente da configurare per usare il database MongoDB.

| Variabile d'ambiente | Obbligatoria | Predefinito | Descrizione                                             |
| -------------------- | ------------ | ----------- | ------------------------------------------------------- |
| `MONGO_DB`           | ✅           |             | Nome del database MongoDB                               |
| `MONGO_USER`         | ✅           |             | Nome utente del server MongoDB                          |
| `MONGO_PASSWORD`     | ✅           |             | Password del server MongoDB                             |
| `MONGO_HOST`         |              | 127.0.0.1   | Indirizzo del server MongoDB, supporta il formato array |
| `MONGO_PORT`         |              | 27017       | Porta del server MongoDB, supporta il formato array     |
| `MONGO_REPLICASET`   |              |             | Replica set di MongoDB                                  |
| `MONGO_AUTHSOURCE`   |              |             | Auth source di MongoDB                                  |
| `MONGO_OPT_SSL`      |              | `false`     | usa una connessione SSL                                 |

Ecco un esempio di configurazione per mongodb.com. Nota che devi impostare `MONGO_HOST` e `MONGO_PORT` in formato JSON quando hai più host.

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

Usare MySQL per archiviare i dati è un'altra buona scelta. Oltre al nostro servizio MySQL, puoi anche usare [FreeDB](https://freedb.tech), che offre gratuitamente 25M di database, oppure [PlanetScale](https://planetscale.com), che però ora supporta solo piani a pagamento.

Se vuoi usare MySQL come archiviazione, devi prima importare [waline.sql](https://github.com/walinejs/waline/blob/main/assets/waline.sql) per creare la tabella e la sua struttura, poi impostare queste variabili d'ambiente nel progetto.

| Variabile d'ambiente | Obbligatoria | Predefinito | Descrizione                          |
| -------------------- | ------------ | ----------- | ------------------------------------ |
| `MYSQL_DB`           | ✅           |             | Nome del database MySQL              |
| `MYSQL_USER`         | ✅           |             | Nome utente del server MySQL         |
| `MYSQL_PASSWORD`     | ✅           |             | Password del server MySQL            |
| `MYSQL_HOST`         |              | 127.0.0.1   | Indirizzo del server MySQL           |
| `MYSQL_PORT`         |              | 3306        | Porta del server MySQL               |
| `MYSQL_PREFIX`       |              | `wl_`       | Prefisso delle tabelle MySQL         |
| `MYSQL_CHARSET`      |              | `utf8mb4`   | Set di caratteri delle tabelle MySQL |
| `MYSQL_SSL`          |              | `false`     | se usare una connessione SSL         |

## TiDB

[TiDB](https://github.com/pingcap/tidb) è un database NewSQL open source. [TiDB Cloud](https://tidbcloud.com/) è la versione online ufficiale, che offre 5GB di quota gratuita a tutti. Di seguito viene descritto come creare un database Waline su TiDB Cloud.

Consulta [Creare un database TiDB](../../it/guide/deploy/tidb.md) per capire il processo di inizializzazione.

| Variabile d'ambiente | Obbligatoria | Predefinito | Descrizione                         |
| -------------------- | ------------ | ----------- | ----------------------------------- |
| `TIDB_DB`            | ✅           |             | Nome del database TiDB              |
| `TIDB_USER`          | ✅           |             | Nome utente del database TiDB       |
| `TIDB_PASSWORD`      | ✅           |             | Password del database TiDB          |
| `TIDB_HOST`          |              | 127.0.0.1   | Indirizzo del servizio TiDB         |
| `TIDB_PORT`          |              | 4000        | Porta del servizio TiDB             |
| `TIDB_PREFIX`        |              | `wl_`       | Prefisso delle tabelle TiDB         |
| `TIDB_CHARSET`       |              | `utf8mb4`   | Set di caratteri delle tabelle TiDB |

## SQLite

Scarica [waline.sqlite](https://github.com/walinejs/waline/blob/main/assets/waline.sqlite) sul tuo server se vuoi usare SQLite. Poi imposta queste variabili d'ambiente nel progetto.

| Variabile d'ambiente | Obbligatoria | Predefinito | Descrizione                                                                           |
| -------------------- | ------------ | ----------- | ------------------------------------------------------------------------------------- |
| `SQLITE_PATH`        | ✅           |             | Percorso del file di archiviazione SQLite, senza il nome del file                     |
| `JWT_TOKEN`          | ✅           |             | Stringa casuale per generare il token di accesso                                      |
| `SQLITE_DB`          |              | waline      | Nome del file di archiviazione SQLite, modificalo se il tuo file non si chiama waline |
| `SQLITE_PREFIX`      |              | `wl_`       | Prefisso delle tabelle SQLite                                                         |

## PostgreSQL

[Supabase](https://supabase.com) e [Neon](https://neon.tech/home) offrono un database gratuito da 512M, mentre [Tembo](https://tembo.io/) offre gratuitamente 10G di database PostgreSQL. Come per MySQL, devi importare [waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql) per creare la tabella e la sua struttura prima di usare PostgreSQL.

| Variabile d'ambiente | Obbligatoria | Predefinito | Descrizione                                    |
| -------------------- | ------------ | ----------- | ---------------------------------------------- |
| `PG_DB`              | ✅           |             | Nome del database PostgreSQL                   |
| `PG_USER`            | ✅           |             | Nome utente del server PostgreSQL              |
| `PG_PASSWORD`        | ✅           |             | Password del server PostgreSQL                 |
| `PG_HOST`            |              | 127.0.0.1   | Indirizzo del server PostgreSQL                |
| `PG_PORT`            |              | 5432        | Porta del server PostgreSQL                    |
| `PG_PREFIX`          |              | `wl_`       | Prefisso delle tabelle PostgreSQL              |
| `PG_SSL`             |              | `false`     | imposta a `true` per usare una connessione SSL |
| `POSTGRES_DATABASE`  |              |             | alias per `PG_DB`                              |
| `POSTGRES_USER`      |              |             | alias per `PG_USER`                            |
| `POSTGRES_PASSWORD`  |              |             | alias per `PG_PASSWORD`                        |
| `POSTGRES_HOST`      |              | 127.0.0.1   | alias per `PG_HOST`                            |
| `POSTGRES_PORT`      |              | 5432        | alias per `PG_PORT`                            |
| `POSTGRES_PREFIX`    |              | `wl_`       | alias per `PG_PREFIX`                          |
| `POSTGRES_SSL`       |              | `false`     | alias per `PG_SSL`                             |

## GitHub

Waline supporta l'archiviazione dei dati dei commenti in un file CSV su GitHub. Per usare GitHub come archiviazione dati, devi richiedere un Personal access token. Puoi fare clic su <kbd>Generate new token</kbd> per richiederlo su <https://github.com/settings/tokens>. Seleziona l'opzione **repo** nei permessi per ottenere i permessi di lettura e scrittura sui repository.

| Variabile d'ambiente | Obbligatoria | Predefinito | Descrizione                                                                                                                                                          |
| -------------------- | ------------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GITHUB_TOKEN`       | ✅           |             | [Personal access tokens](https://github.com/settings/tokens)                                                                                                         |
| `GITHUB_REPO`        | ✅           |             | nome del repository, ad esempio `walinejs/waline`                                                                                                                    |
| GITHUB_PATH          |              |             | La directory di archiviazione dei dati, ad esempio `data` significa che i dati sono salvati nella directory `data`, per impostazione predefinita la directory radice |

::: warning

Per motivi di prestazioni, l'uso di GitHub non è consigliato.

:::

## Personalizzato

Oltre all'archiviazione su database descritta sopra, è possibile aggiungere il supporto per altri servizi di archiviazione.

Se vuoi aiutare Waline a supportare più servizi di archiviazione, puoi fare un fork del progetto, ereditare la [classe base](https://github.com/walinejs/waline/blob/main/packages/server/src/service/storage/base.js), implementare i metodi `select()`, `add()`, `update()` e `delete()` del servizio di archiviazione corrispondente e quindi inviare la PR.
