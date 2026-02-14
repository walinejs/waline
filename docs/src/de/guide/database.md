---
title: Unterstützung für mehrere Datenbankdienste
icon: database
order: 2
---

Waline unterstützt eine Vielzahl von Datenbanken, einschließlich MySQL, PostgreSQL, SQLite und MongoDB.

Sie müssen nur Umgebungsvariablen konfigurieren, und Waline wechselt automatisch zum entsprechenden Datenspeicherdienst basierend auf den von Ihnen konfigurierten Umgebungsvariablen.

<!-- more -->

## MongoDB

<https://mongodb.com> bietet offiziell kostenlose Unterstützung für eine 512M MongoDB-Datenbank. Im Folgenden sind die Umgebungsvariablen aufgeführt, die für die Verwendung der MongoDB-Datenbank konfiguriert werden müssen.

| Umgebungsvariable  | Erforderlich | Standard  | Beschreibung                                          |
| ------------------ | ------------ | --------- | ----------------------------------------------------- |
| `MONGO_DB`         | ✅           |           | Name der MongoDB-Datenbank                            |
| `MONGO_USER`       | ✅           |           | Benutzername des MongoDB-Servers                      |
| `MONGO_PASSWORD`   | ✅           |           | Passwort des MongoDB-Servers                          |
| `MONGO_HOST`       |              | 127.0.0.1 | Adresse des MongoDB-Servers, unterstützt Array-Format |
| `MONGO_PORT`       |              | 27017     | Port des MongoDB-Servers, unterstützt Array-Format    |
| `MONGO_REPLICASET` |              |           | MongoDB Replica Set                                   |
| `MONGO_AUTHSOURCE` |              |           | MongoDB Auth-Quelle                                   |
| `MONGO_OPT_SSL`    |              | `false`   | SSL-Verbindung verwenden                              |

Hier ist eine Beispielkonfiguration für mongodb.com. Bitte beachten Sie, dass Sie `MONGO_HOST` und `MONGO_PORT` im JSON-Stil festlegen müssen, wenn Sie mehrere Hosts haben.

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

Die Verwendung von MySQL zum Speichern von Daten ist ebenfalls eine gute Wahl. Neben unserem eigenen MySQL-Dienst können wir auch [FreeDB](https://freedb.tech) verwenden, das 25M Datenbankunterstützung kostenlos bietet, oder [PlanetScale](https://planetscale.com), das jetzt nur noch kostenpflichtige Tarife unterstützt.

Wenn Sie MySQL als Speicher verwenden möchten, müssen Sie zuerst [waline.sql](https://github.com/walinejs/waline/blob/main/assets/waline.sql) importieren, um Tabelle und Tabellenstruktur zu erstellen, und dann diese Umgebungsvariablen im Projekt festlegen.

| Umgebungsvariable | Erforderlich | Standard  | Beschreibung                            |
| ----------------- | ------------ | --------- | --------------------------------------- |
| `MYSQL_DB`        | ✅           |           | Name der MySQL-Datenbank                |
| `MYSQL_USER`      | ✅           |           | Benutzername des MySQL-Servers          |
| `MYSQL_PASSWORD`  | ✅           |           | Passwort des MySQL-Servers              |
| `MYSQL_HOST`      |              | 127.0.0.1 | Adresse des MySQL-Servers               |
| `MYSQL_PORT`      |              | 3306      | Port des MySQL-Servers                  |
| `MYSQL_PREFIX`    |              | `wl_`     | MySQL-Tabellenpräfix                    |
| `MYSQL_CHARSET`   |              | `utf8mb4` | MySQL-Tabellenzeichensatz               |
| `MYSQL_SSL`       |              | `false`   | ob SSL-Verbindung verwendet werden soll |

## TiDB

[TiDB](https://github.com/pingcap/tidb) ist eine Open-Source-NewSQL-Datenbank. [TiDB Cloud](https://tidbcloud.com/) ist die offizielle Online-Version, die jedem 5GB kostenloses Kontingent zur Verfügung stellt.

Bitte beachten Sie [TiDB-Datenbank erstellen](../../de/guide/deploy/tidb.md), um den Initialisierungsprozess zu verstehen.

| Umgebungsvariable | Erforderlich | Standard  | Beschreibung                         |
| ----------------- | ------------ | --------- | ------------------------------------ |
| `TIDB_DB`         | ✅           |           | Name der TiDB-Datenbank              |
| `TIDB_USER`       | ✅           |           | Benutzername der TiDB-Datenbank      |
| `TIDB_PASSWORD`   | ✅           |           | Passwort der TiDB-Datenbank          |
| `TIDB_HOST`       |              | 127.0.0.1 | Adresse des TiDB-Dienstes            |
| `TIDB_PORT`       |              | 4000      | Port des TiDB-Dienstes               |
| `TIDB_PREFIX`     |              | `wl_`     | Tabellenpräfix der TiDB-Datentabelle |
| `TIDB_CHARSET`    |              | `utf8mb4` | Zeichensatz der TiDB-Datentabelle    |

## SQLite

Laden Sie [waline.sqlite](https://github.com/walinejs/waline/blob/main/assets/waline.sqlite) auf Ihren Server herunter, wenn Sie SQLite verwenden möchten. Legen Sie dann diese Umgebungsvariablen im Projekt fest.

| Umgebungsvariable | Erforderlich | Standard | Beschreibung                                                                  |
| ----------------- | ------------ | -------- | ----------------------------------------------------------------------------- |
| `SQLITE_PATH`     | ✅           |          | SQLite-Speicherdateipfad, ohne Dateinamen                                     |
| `JWT_TOKEN`       | ✅           |          | Zufällige Zeichenfolge für Login-Token-Generator                              |
| `SQLITE_DB`       |              | waline   | SQLite-Speicherdateiname, ändern Sie ihn, wenn Ihr Dateiname nicht waline ist |
| `SQLITE_PREFIX`   |              | `wl_`    | SQLite-Tabellenpräfix                                                         |

## PostgreSQL

[Supabase](https://supabase.com) und [Neon](https://neon.tech/home) bieten eine kostenlose 512M-Datenbank, während [Tembo](https://tembo.io/) kostenlose Unterstützung für eine 10G-PG-Datenbank bietet. Wie bei MySQL müssen Sie [waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql) importieren, um Tabelle und Tabellenstruktur zu erstellen, bevor Sie PostgreSQL verwenden.

| Umgebungsvariable   | Erforderlich | Standard  | Beschreibung                                      |
| ------------------- | ------------ | --------- | ------------------------------------------------- |
| `PG_DB`             | ✅           |           | Name der PostgreSQL-Datenbank                     |
| `PG_USER`           | ✅           |           | Benutzername des PostgreSQL-Servers               |
| `PG_PASSWORD`       | ✅           |           | Passwort des PostgreSQL-Servers                   |
| `PG_HOST`           |              | 127.0.0.1 | Adresse des PostgreSQL-Servers                    |
| `PG_PORT`           |              | 3211      | Port des PostgreSQL-Servers                       |
| `PG_PREFIX`         |              | `wl_`     | PostgreSQL-Tabellenpräfix                         |
| `PG_SSL`            |              | `false`   | auf `true` setzen, um SSL-Verbindung zu verwenden |
| `POSTGRES_DATABASE` |              |           | Alias für `PG_DB`                                 |
| `POSTGRES_USER`     |              |           | Alias für `PG_USER`                               |
| `POSTGRES_PASSWORD` |              |           | Alias für `PG_PASSWORD`                           |
