---
title: Variabili d'ambiente del server
icon: config
---

Puoi personalizzare il server Waline tramite le seguenti variabili d'ambiente.

::: warning

Devi **ridistribuire** il servizio dopo aver aggiornato le variabili d'ambiente perché le modifiche abbiano effetto.

Se usi Vercel, imposta le variabili da `Settings` - `Environment Variables`.

:::

<!-- more -->

## Base

| Variabili d'ambiente | Obbligatoria | Descrizione                                                                             |
| -------------------- | ------------ | --------------------------------------------------------------------------------------- |
| `SITE_NAME`          |              | nome del sito                                                                           |
| `SITE_URL`           |              | URL del sito                                                                            |
| `LOGIN`              |              | con `LOGIN=force` l'utente deve accedere prima di poter commentare                      |
| `SERVER_URL`         |              | URL del server Waline, utile quando l'indirizzo generato automaticamente non è corretto |

## Visualizzazione

| Variabili d'ambiente    | Valore predefinito                                                      | Descrizione                                                                                  |
| ----------------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `DISABLE_USERAGENT`     |                                                                         | indica se nascondere lo user agent dell'utente che commenta. Il valore predefinito è `false` |
| `DISABLE_REGION`        |                                                                         | indica se nascondere la regione dell'utente che commenta. Il valore predefinito è `false`    |
| `DISABLE_AUTHOR_NOTIFY` |                                                                         | indica se disabilitare la notifica all'autore                                                |
| `AVATAR_PROXY`          | `''`                                                                    | URL del servizio proxy per gli avatar. Lascia vuoto per disabilitarlo                        |
| `GRAVATAR_STR`          | <span v-pre>`https://seccdn.libravatar.org/avatar/{{mail\|md5}}`</span> | stringa di rendering di Gravatar, basata su un template nunjucks                             |
| `LEVELS`                |                                                                         | assegna a ogni utente un'etichetta di livello in base al numero di commenti                  |

::: tip Etichetta di livello

In base al numero di commenti dell'utente, all'autore del commento viene aggiunta un'etichetta di livello secondo le condizioni di valutazione. Questa funzione è disabilitata per impostazione predefinita e si abilita impostando la variabile d'ambiente `LEVELS`. La configurazione è una sequenza di numeri separati da virgole: ad esempio `0,10,20,50,100,200` significa:

| Livello | Condizioni         | Etichette predefinite |
| ------- | ------------------ | --------------------- |
| 0       | 0 <= count < 10    | Nani                  |
| 1       | 10 <= count < 20   | Hobbit                |
| 2       | 20 <= count < 50   | Ent                   |
| 3       | 50 <= count < 100  | Stregoni              |
| 4       | 100 <= count < 200 | Elfi                  |
| 5       | 200 <= count       | Maiar                 |

Oltre a personalizzare le regole di valutazione dei livelli, puoi personalizzare anche le etichette dei livelli. Configura i testi nel client in questo modo:

```js
Waline.init({
  locale: {
    level0: 'Dwarves',
    level1: 'Hobbits',
    level2: 'Ents',
    level3: 'Wizards',
    level4: 'Elves',
    level5: 'Maiar',
  },
});
```

Per impostazione predefinita sono forniti solo 6 testi di livello, ma ciò non significa che i livelli possano essere solo 6: il limite effettivo dipende dalle regole di valutazione che imposti. Per aggiungere un nuovo livello, ti consigliamo di configurare tu il testo dell'etichetta corrispondente. Se non viene fornito alcun testo, viene mostrata l'etichetta predefinita, ad esempio `Level 10`.

:::

## Sicurezza

| Variabili d'ambiente  | Valore predefinito | Descrizione                                                                                                                                                               |
| --------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `IPQPS`               | `60`               | limite di frequenza di pubblicazione dei commenti per IP, in secondi. Imposta 0 per nessun limite                                                                         |
| `SECURE_DOMAINS`      |                    | configurazione dei domini sicuri. Supporta più domini separati da virgole                                                                                                 |
| `AKISMET_KEY`         | `70542d86693e`     | chiave del servizio antispam Akismet; imposta `false` se vuoi disattivarlo.                                                                                               |
| `COMMENT_AUDIT`       | `false`            | interruttore della moderazione dei commenti. Se attivo, ogni commento deve essere approvato dall'amministratore; in questo caso è consigliabile indicarlo nel placeholder |
| `RECAPTCHA_V3_KEY`    |                    | chiave reCAPTCHA V3, da impostare insieme a quella del client                                                                                                             |
| `RECAPTCHA_V3_SECRET` |                    | segreto reCAPTCHA V3 per il server.                                                                                                                                       |
| `TURNSTILE_KEY`       |                    | chiave Turnstile, da impostare insieme a quella del client                                                                                                                |
| `TURNSTILE_SECRET`    |                    | segreto Turnstile per il server                                                                                                                                           |

::: tip reCAPTCHA e Turnstile

La Key e il Secret di Turnstile si richiedono su <https://www.cloudflare.com/products/turnstile/>.

La Key e il Secret di reCAPTCHA si richiedono su <https://www.google.com/recaptcha>.

Quando imposti i domini sicuri devi aggiungere sia l'indirizzo del sito sia quello del server Waline.

:::

## Markdown

| Variabili d'ambiente | Valore predefinito | Descrizione                                                                                  |
| -------------------- | ------------------ | -------------------------------------------------------------------------------------------- |
| `MARKDOWN_CONFIG`    | `{}`               | configurazione di MarkdownIt                                                                 |
| `MARKDOWN_HIGHLIGHT` | `true`             | se abilitare l'evidenziazione del codice                                                     |
| `MARKDOWN_EMOJI`     | `true`             | se abilitare le emoji                                                                        |
| `MARKDOWN_SUB`       | `true`             | se abilitare il pedice                                                                       |
| `MARKDOWN_SUP`       | `true`             | se abilitare l'apice                                                                         |
| `MARKDOWN_TEX`       | `mathjax`          | servizio per analizzare le formule matematiche; sono supportati `mathjax`, `katex` e `false` |
| `MARKDOWN_MATHJAX`   | `{}`               | opzioni di MathJax                                                                           |
| `MARKDOWN_KATEX`     | `{}`               | opzioni di KaTeX                                                                             |

## Servizio e-mail

Il servizio e-mail viene usato per le notifiche via e-mail di registrazioni e commenti. Dopo aver configurato le variabili relative al servizio e-mail, alla registrazione dell'utente si aggiunge la conferma tramite codice di verifica inviato per e-mail, per prevenire registrazioni dannose.

| Nome della variabile d'ambiente | Note                               |
| ------------------------------- | ---------------------------------- |
| `SMTP_SERVICE`                  | provider del servizio e-mail SMTP  |
| `SMTP_HOST`                     | indirizzo del server SMTP          |
| `SMTP_PORT`                     | porta del server SMTP              |
| `SMTP_USER`                     | nome utente SMTP                   |
| `SMTP_PASS`                     | password SMTP.                     |
| `SMTP_SECURE`                   | connessione SMTP tramite SSL       |
| `SENDER_NAME`                   | personalizza il nome del mittente  |
| `SENDER_EMAIL`                  | personalizza l'e-mail del mittente |

::: tip

I provider supportati sono elencati in [servizi di nodemailer](https://github.com/nodemailer/nodemailer/blob/master/src/well-known/services.json). Puoi scegliere tra `SMTP_SERVICE` e (`SMTP_HOST`, `SMTP_PORT`). Se non conosci il `SMTP_SERVICE` corrispondente nell'elenco, devi configurare `SMTP_HOST` e `SMTP_PORT`, che di solito trovi nelle impostazioni della casella di posta.

Il nome utente SMTP di solito è l'indirizzo e-mail completo dell'utente, mentre la password coincide quasi sempre con quella della casella.

Attenzione in particolare al fatto che alcune caselle usano una password SMTP separata.

:::

## Database

### MongoDB

| Variabile d'ambiente | Obbligatoria | Valore predefinito | Descrizione                                             |
| -------------------- | ------------ | ------------------ | ------------------------------------------------------- |
| `MONGO_DB`           | ✅           |                    | nome del database MongoDB                               |
| `MONGO_USER`         | ✅           |                    | nome utente del server MongoDB                          |
| `MONGO_PASSWORD`     | ✅           |                    | password del server MongoDB                             |
| `MONGO_HOST`         |              | 127.0.0.1          | indirizzo del server MongoDB; supporta il formato array |
| `MONGO_PORT`         |              | 27017              | porta del server MongoDB; supporta il formato array     |
| `MONGO_REPLICASET`   |              |                    | replica set di MongoDB                                  |
| `MONGO_AUTHSOURCE`   |              |                    | auth source di MongoDB                                  |
| `MONGO_OPT_SSL`      |              | `false`            | usa una connessione SSL                                 |

### MySQL

| Variabile d'ambiente | Obbligatoria | Valore predefinito | Descrizione                  |
| -------------------- | ------------ | ------------------ | ---------------------------- |
| `MYSQL_DB`           | ✅           |                    | nome del database MySQL      |
| `MYSQL_USER`         | ✅           |                    | nome utente del server MySQL |
| `MYSQL_PASSWORD`     | ✅           |                    | password del server MySQL    |
| `MYSQL_HOST`         |              | 127.0.0.1          | indirizzo del server MySQL   |
| `MYSQL_PORT`         |              | 3306               | porta del server MySQL       |
| `MYSQL_PREFIX`       |              | `wl_`              | prefisso delle tabelle MySQL |
| `MYSQL_CHARSET`      |              | `utf8mb4`          | charset delle tabelle MySQL  |
| `MYSQL_SSL`          |              | `false`            | se usare una connessione SSL |

### TiDB

[Creare un database su TiDB](../../../it/guide/deploy/tidb.md)

| Variabile d'ambiente | Obbligatoria | Valore predefinito | Descrizione                 |
| -------------------- | ------------ | ------------------ | --------------------------- |
| `TIDB_DB`            | ✅           |                    | nome del database TiDB      |
| `TIDB_USER`          | ✅           |                    | nome utente del server TiDB |
| `TIDB_PASSWORD`      | ✅           |                    | password del server TiDB    |
| `TIDB_HOST`          |              | 127.0.0.1          | indirizzo del server TiDB   |
| `TIDB_PORT`          |              | 4000               | porta del server TiDB       |
| `TIDB_PREFIX`        |              | `wl_`              | prefisso delle tabelle TiDB |
| `TIDB_CHARSET`       |              | `utf8mb4`          | charset delle tabelle TiDB  |

### SQLite

| Variabile d'ambiente | Obbligatoria | Valore predefinito | Descrizione                                                                           |
| -------------------- | ------------ | ------------------ | ------------------------------------------------------------------------------------- |
| `SQLITE_PATH`        | ✅           |                    | percorso del file di archiviazione SQLite, senza il nome del file                     |
| `JWT_TOKEN`          | ✅           |                    | stringa casuale per generare il token di accesso                                      |
| `SQLITE_DB`          |              | waline             | nome del file di archiviazione SQLite; modificalo se il tuo file non si chiama waline |
| `SQLITE_PREFIX`      |              | `wl_`              | prefisso delle tabelle SQLite                                                         |

### PostgreSQL

| Variabile d'ambiente | Obbligatoria | Valore predefinito | Descrizione                                  |
| -------------------- | ------------ | ------------------ | -------------------------------------------- |
| `PG_DB`              | ✅           |                    | nome del database PostgreSQL                 |
| `PG_USER`            | ✅           |                    | nome utente del server PostgreSQL            |
| `PG_PASSWORD`        | ✅           |                    | password del server PostgreSQL               |
| `PG_HOST`            |              | 127.0.0.1          | indirizzo del server PostgreSQL              |
| `PG_PORT`            |              | 5432               | porta del server PostgreSQL                  |
| `PG_PREFIX`          |              | `wl_`              | prefisso delle tabelle PostgreSQL            |
| `PG_SSL`             |              | `false`            | imposta `true` per usare una connessione SSL |
| `POSTGRES_DATABASE`  |              |                    | alias di `PG_DB`                             |
| `POSTGRES_USER`      |              |                    | alias di `PG_USER`                           |
| `POSTGRES_PASSWORD`  |              |                    | alias di `PG_PASSWORD`                       |
| `POSTGRES_HOST`      |              | 127.0.0.1          | alias di `PG_HOST`                           |
| `POSTGRES_PORT`      |              | 5432               | alias di `PG_PORT`                           |
| `POSTGRES_PREFIX`    |              | `wl_`              | alias di `PG_PREFIX`                         |
| `POSTGRES_SSL`       |              | `false`            | alias di `PG_SSL`                            |

### GitHub

| Variabile d'ambiente | Obbligatoria | Valore predefinito | Descrizione                                                                                                                                                         |
| -------------------- | ------------ | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GITHUB_TOKEN`       | ✅           |                    | [token di accesso personale](https://github.com/settings/tokens)                                                                                                    |
| `GITHUB_REPO`        | ✅           |                    | nome del repository, ad esempio `walinejs/waline`                                                                                                                   |
| GITHUB_PATH          |              |                    | directory di archiviazione dei dati: ad esempio `data` significa che i dati sono salvati nella directory `data`; per impostazione predefinita è la directory radice |

## Avanzate

| Variabili d'ambiente            | Valore predefinito          | Descrizione                                                                                                                         |
| ------------------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `OAUTH_URL`                     | `https://oauth.lithub.cc`   | URL del servizio di accesso social OAuth. Puoi [creare un tuo servizio di autenticazione](https://github.com/walinejs/auth).        |
| `WEBHOOK`                       |                             | puoi impostare un URL Webhook che viene chiamato quando arriva un nuovo commento.                                                   |
| `WALINE_ADMIN_MODULE_ASSET_URL` | `//unpkg.com/@waline/admin` | link del pannello di amministrazione di Waline                                                                                      |
| `IP2REGION_DB`                  |                             | percorso personalizzato della libreria di interrogazione IP IPv4 (deprecato, usa `IP2REGION_DB_V4`)                                 |
| `IP2REGION_DB_V4`               |                             | percorso personalizzato della libreria di interrogazione IP IPv4. Se non impostato usa `IP2REGION_DB`                               |
| `IP2REGION_DB_V6`               |                             | percorso personalizzato della libreria di interrogazione IP IPv6. Impostalo per abilitare la geolocalizzazione degli indirizzi IPv6 |
