---
title: Server-Umgebungsvariablen
icon: config
---

Sie können den Waline-Server durch die folgenden Umgebungsvariablen anpassen.

::: warning

Sie MÜSSEN nach der Aktualisierung von Umgebungsvariablen **neu bereitstellen**, damit die Änderungen wirksam werden.

Bei der Verwendung von Vercel sollten Sie die Einstellungen über `Settings` - `Environment Variables` vornehmen.

:::

<!-- more -->

## Grundlegend

| Umgebungsvariablen | Erforderlich | Beschreibung                                                                             |
| ------------------ | ------------ | ---------------------------------------------------------------------------------------- |
| `SITE_NAME`        |              | Website-Name                                                                             |
| `SITE_URL`         |              | Website-URL                                                                              |
| `LOGIN`            |              | Benutzer müssen sich vor dem Kommentieren anmelden, wenn `LOGIN=force`                   |
| `SERVER_URL`       |              | Die URL des Waline-Servers, nützlich, wenn die automatisch generierte Adresse falsch ist |

## Anzeige

| Umgebungsvariablen      | Standard                                                                | Beschreibung                                                                       |
| ----------------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `DISABLE_USERAGENT`     |                                                                         | Ob der User-Agent des Kommentators verborgen werden soll. Standardwert ist `false` |
| `DISABLE_REGION`        |                                                                         | Ob die Region des Kommentators verborgen werden soll. Standardwert ist `false`     |
| `DISABLE_AUTHOR_NOTIFY` |                                                                         | Ob Autor-Benachrichtigungen deaktiviert werden sollen                              |
| `AVATAR_PROXY`          | `https://avatar.75cdn.workers.dev`                                      | Avatar-Proxy-Service-URL. Sie können `false` setzen, um es zu deaktivieren         |
| `GRAVATAR_STR`          | <span v-pre>`https://seccdn.libravatar.org/avatar/{{mail\|md5}}`</span> | Gravatar-Rendering-String, basierend auf nunjucks-Template                         |
| `LEVELS`                |                                                                         | Jedem Benutzer ein Bewertungslabel basierend auf der Anzahl der Kommentare geben   |

::: tip Level-Label

Basierend auf der Anzahl der Benutzerkommentare wird dem Kommentator ein Level-Label gemäß den Bewertungsbedingungen hinzugefügt. Diese Funktion ist standardmäßig deaktiviert und kann durch Setzen der Umgebungsvariable `LEVELS` aktiviert werden. Die Konfiguration erfolgt in Form einer durch Kommas getrennten Zahlenfolge, zum Beispiel bedeutet `0,10,20,50,100,200`:

| Stufen | Bedingungen        | Standard-Stufen-Labels |
| ------ | ------------------ | ---------------------- |
| 0      | 0 <= count < 10    | Zwerge                 |
| 1      | 10 <= count < 20   | Hobbits                |
| 2      | 20 <= count < 50   | Ents                   |
| 3      | 50 <= count < 100  | Zauberer               |
| 4      | 100 <= count < 200 | Elfen                  |
| 5      | 200 <= count       | Maiar                  |

Neben der Anpassung der Level-Beurteilungsregeln können wir auch das Level-Label anpassen. Konfigurieren Sie den Text im Client wie folgt:

```js
Waline.init({
  locale: {
    level0: 'Zwerge',
    level1: 'Hobbits',
    level2: 'Ents',
    level3: 'Zauberer',
    level4: 'Elfen',
    level5: 'Maiar',
  },
});
```

Standardmäßig werden nur 6 Level-Texte bereitgestellt, aber das bedeutet nicht, dass es nur 6 Level geben kann. Die spezifische Level-Obergrenze basiert auf den von Ihnen festgelegten Level-Beurteilungsregeln. Um eine neue Stufe hinzuzufügen, wird empfohlen, den Labeltext für die entsprechende Stufe selbst zu konfigurieren. Wenn kein Labeltext angegeben wird, wird standardmäßig der Text wie `Level 10` angezeigt.

:::

## Sicherheit

| Umgebungsvariablen    | Standard       | Beschreibung                                                                                                                               |
| --------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `IPQPS`               | `60`           | IP-basierte Frequenzbegrenzung für Kommentare in Sekunden. Auf 0 setzen für keine Begrenzung                                               |
| `SECURE_DOMAINS`      |                | Konfiguration sicherer Domains. Unterstützt mehrere Domains, getrennt durch Komma                                                          |
| `AKISMET_KEY`         | `70542d86693e` | Akismet Anti-Spam-Service-Schlüssel, auf `false` setzen, wenn Sie ihn schließen möchten                                                    |
| `COMMENT_AUDIT`       | `false`        | Kommentar-Audit-Schalter. Wenn aktiviert, muss jeder Kommentar vom Admin genehmigt werden, daher wird ein Hinweis im Platzhalter empfohlen |
| `RECAPTCHA_V3_KEY`    |                | reCAPTCHA V3-Schlüssel, sollte zusammen mit dem Client gesetzt werden                                                                      |
| `RECAPTCHA_V3_SECRET` |                | reCAPTCHA V3-Secret für den Server                                                                                                         |
| `TURNSTILE_KEY`       |                | Turnstile-Schlüssel, sollte zusammen mit dem Client gesetzt werden                                                                         |
| `TURNSTILE_SECRET`    |                | Turnstile-Secret für den Server                                                                                                            |

::: tip Recaptcha und Turnstile

Turnstile-Schlüssel und -Secret können unter <https://www.cloudflare.com/products/turnstile/> angefordert werden.

Recaptcha-Schlüssel und -Secret können unter <https://www.google.com/recaptcha> angefordert werden.

Beim Festlegen von Sicherheitsdomains müssen Sie sowohl die Website-Adresse als auch die Waline-Server-Adresse hinzufügen.

:::

## Markdown

| Umgebungsvariablen   | Standard  | Beschreibung                                                                         |
| -------------------- | --------- | ------------------------------------------------------------------------------------ |
| `MARKDOWN_CONFIG`    | `{}`      | MarkdownIt-Konfiguration                                                             |
| `MARKDOWN_HIGHLIGHT` | `true`    | Ob Syntaxhervorhebung aktiviert werden soll                                          |
| `MARKDOWN_EMOJI`     | `true`    | Ob Emoji aktiviert werden soll                                                       |
| `MARKDOWN_SUB`       | `true`    | Ob Tiefgestellt aktiviert werden soll                                                |
| `MARKDOWN_SUP`       | `true`    | Ob Hochgestellt aktiviert werden soll                                                |
| `MARKDOWN_TEX`       | `mathjax` | Service zum Parsen von Mathematik, `mathjax`, `katex` und `false` werden unterstützt |
| `MARKDOWN_MATHJAX`   | `{}`      | MathJax-Optionen                                                                     |
| `MARKDOWN_KATEX`     | `{}`      | KaTeX-Optionen                                                                       |

## E-Mail-Service

Der E-Mail-Service wird für E-Mail-Benachrichtigungen bei Benutzerregistrierung und Kommentaren verwendet. Nach der Konfiguration der Variablen für den E-Mail-Service wird bei der Benutzerregistrierung eine Bestätigung per E-Mail-Verifizierungscode hinzugefügt, um böswillige Registrierungen zu verhindern.

| Umgebungsvariablenname | Bemerkungen                  |
| ---------------------- | ---------------------------- |
| `SMTP_SERVICE`         | SMTP-E-Mail-Service-Anbieter |
| `SMTP_HOST`            | SMTP-Serveradresse           |
| `SMTP_PORT`            | SMTP-Serverport              |
| `SMTP_USER`            | SMTP-Benutzername            |
| `SMTP_PASS`            | SMTP-Passwort                |
| `SMTP_SECURE`          | SMTP-Verbindung mit SSL      |
| `SENDER_NAME`          | Absendername anpassen        |
| `SENDER_EMAIL`         | Absender-E-Mail anpassen     |

::: tip

Unterstützte Serviceanbieter finden Sie unter [nodemailer services](https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json). Sie können zwischen `SMTP_SERVICE` und (`SMTP_HOST`, `SMTP_PORT`) wählen. Wenn Sie den entsprechenden `SMTP_SERVICE` in der Liste nicht kennen, müssen Sie `SMTP_HOST` und `SMTP_PORT` konfigurieren, die normalerweise in den Postfacheinstellungen zu finden sind.

Der Benutzername von SMTP unterstützt normalerweise die vollständige E-Mail-Adresse des Benutzers, und das Passwort ist meist dasselbe wie das Postfachpasswort.

Bitte beachten Sie besonders, dass einige Postfächer separate SMTP-Passwörter verwenden.

:::

## Datenbank

### MongoDB

| Umgebungsvariable  | Erforderlich | Standard  | Beschreibung                                    |
| ------------------ | ------------ | --------- | ----------------------------------------------- |
| `MONGO_DB`         | ✅           |           | MongoDB-Datenbankname                           |
| `MONGO_USER`       | ✅           |           | MongoDB-Server-Benutzername                     |
| `MONGO_PASSWORD`   | ✅           |           | MongoDB-Server-Passwort                         |
| `MONGO_HOST`       |              | 127.0.0.1 | MongoDB-Serveradresse, unterstützt Array-Format |
| `MONGO_PORT`       |              | 27017     | MongoDB-Serverport, unterstützt Array-Format    |
| `MONGO_REPLICASET` |              |           | MongoDB-Replikat-Set                            |
| `MONGO_AUTHSOURCE` |              |           | MongoDB-Authentifizierungsquelle                |
| `MONGO_OPT_SSL`    |              | `false`   | SSL-Verbindung verwenden                        |

### MySQL

| Umgebungsvariable | Erforderlich | Standard  | Beschreibung                            |
| ----------------- | ------------ | --------- | --------------------------------------- |
| `MYSQL_DB`        | ✅           |           | MySQL-Datenbankname                     |
| `MYSQL_USER`      | ✅           |           | MySQL-Server-Benutzername               |
| `MYSQL_PASSWORD`  | ✅           |           | MySQL-Server-Passwort                   |
| `MYSQL_HOST`      |              | 127.0.0.1 | MySQL-Serveradresse                     |
| `MYSQL_PORT`      |              | 3306      | MySQL-Serverport                        |
| `MYSQL_PREFIX`    |              | `wl_`     | MySQL-Tabellenpräfix                    |
| `MYSQL_CHARSET`   |              | `utf8mb4` | MySQL-Tabellenzeichensatz               |
| `MYSQL_SSL`       |              | `false`   | Ob SSL-Verbindung verwendet werden soll |

### TiDB

[Erstellen Sie eine Datenbank auf TiDB](../../../de/guide/deploy/tidb.md)

| Umgebungsvariable | Erforderlich | Standard  | Beschreibung             |
| ----------------- | ------------ | --------- | ------------------------ |
| `TIDB_DB`         | ✅           |           | TiDB-Datenbankname       |
| `TIDB_USER`       | ✅           |           | TiDB-Server-Benutzername |
| `TIDB_PASSWORD`   | ✅           |           | TiDB-Server-Passwort     |
| `TIDB_HOST`       |              | 127.0.0.1 | TiDB-Serveradresse       |
| `TIDB_PORT`       |              | 4000      | TiDB-Serverport          |
| `TIDB_PREFIX`     |              | `wl_`     | TiDB-Tabellenpräfix      |
| `TIDB_CHARSET`    |              | `utf8mb4` | TiDB-Tabellenzeichensatz |

### SQLite

| Umgebungsvariable | Erforderlich | Standard | Beschreibung                                                                  |
| ----------------- | ------------ | -------- | ----------------------------------------------------------------------------- |
| `SQLITE_PATH`     | ✅           |          | SQLite-Speicherdateipfad, ohne Dateinamen                                     |
| `JWT_TOKEN`       | ✅           |          | Zufällige Zeichenfolge für den Login-Token-Generator                          |
| `SQLITE_DB`       |              | waline   | SQLite-Speicherdateiname, ändern Sie ihn, wenn Ihr Dateiname nicht waline ist |
| `SQLITE_PREFIX`   |              | `wl_`    | SQLite-Tabellenpräfix                                                         |

### PostgreSQL

| Umgebungsvariable   | Erforderlich | Standard  | Beschreibung                                      |
| ------------------- | ------------ | --------- | ------------------------------------------------- |
| `PG_DB`             | ✅           |           | PostgreSQL-Datenbankname                          |
| `PG_USER`           | ✅           |           | PostgreSQL-Server-Benutzername                    |
| `PG_PASSWORD`       | ✅           |           | PostgreSQL-Server-Passwort                        |
| `PG_HOST`           |              | 127.0.0.1 | PostgreSQL-Serveradresse                          |
| `PG_PORT`           |              | 3211      | PostgreSQL-Serverport                             |
| `PG_PREFIX`         |              | `wl_`     | PostgreSQL-Tabellenpräfix                         |
| `PG_SSL`            |              | `false`   | Auf `true` setzen, um SSL-Verbindung zu verwenden |
| `POSTGRES_DATABASE` |              |           | Alias für `PG_DB`                                 |
| `POSTGRES_USER`     |              |           | Alias für `PG_USER`                               |
| `POSTGRES_PASSWORD` |              |           | Alias für `PG_PASSWORD`                           |
| `POSTGRES_HOST`     |              | 127.0.0.1 | Alias für `PG_HOST`                               |
| `POSTGRES_PORT`     |              | 3211      | Alias für `PG_PORT`                               |
| `POSTGRES_PREFIX`   |              | `wl_`     | Alias für `PG_PREFIX`                             |
| `POSTGRES_SSL`      |              | `false`   | Alias für `POSTGRES_SSL`                          |

### GitHub

| Umgebungsvariable | Erforderlich | Standard | Beschreibung                                                                                                                       |
| ----------------- | ------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `GITHUB_TOKEN`    | ✅           |          | [Personal Access Tokens](https://github.com/settings/tokens)                                                                       |
| `GITHUB_REPO`     | ✅           |          | Repository-Name, z.B. `walinejs/waline`                                                                                            |
| GITHUB_PATH       |              |          | Das Datenspeicherverzeichnis, z.B. bedeutet `data`, dass es im Verzeichnis `data` gespeichert wird, standardmäßig Stammverzeichnis |

## Erweitert

| Umgebungsvariablen              | Standard                    | Beschreibung                                                                                                 |
| ------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `OAUTH_URL`                     | `https://oauth.lithub.cc`   | OAuth Social Login Service URL. Sie können [Ihren eigenen Auth erstellen](https://github.com/walinejs/auth). |
| `WEBHOOK`                       |                             | Sie können eine Webhook-URL festlegen, die ausgelöst wird, wenn Sie einen neuen Kommentar haben.             |
| `WALINE_ADMIN_MODULE_ASSET_URL` | `//unpkg.com/@waline/admin` | Waline-Admin-Link                                                                                            |
| `IP2REGION_DB`                  |                             | Angepasster IPv4-IP-Abfragebibliothekspfad (veraltet, verwenden Sie stattdessen `IP2REGION_DB_V4`)           |
| `IP2REGION_DB_V4`               |                             | Angepasster IPv4-IP-Abfragebibliothekspfad. Fällt auf `IP2REGION_DB` zurück, wenn nicht gesetzt              |
| `IP2REGION_DB_V6`               |                             | Angepasster IPv6-IP-Abfragebibliothekspfad. Setzen Sie dies, um die IPv6-Adressortsuche zu aktivieren        |
