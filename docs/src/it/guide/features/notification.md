---
title: Notifiche dei commenti
icon: notice
order: 10
---

Quando un utente pubblica un commento sul sito o risponde a un commento, Waline può inviare notifiche via e-mail o WeChat al blogger e all'autore della risposta.

- Supportiamo vari tipi di notifica per il blogger
- Inviamo un'e-mail a un visitatore non appena il suo commento riceve una risposta.

<!-- more -->

## Notifica via e-mail

Per la notifica via e-mail servono le seguenti variabili d'ambiente:

- `SMTP_SERVICE`: il provider del servizio di invio e-mail SMTP

  ::: tip

  Puoi trovare tutti i provider supportati in [nodemailer services](https://github.com/nodemailer/nodemailer/blob/master/src/well-known/services.json). Se il tuo provider non è in elenco, devi configurare `SMTP_HOST` e `SMTP_PORT`.

  - `SMTP_HOST`: indirizzo del server SMTP; di norma si trova nella pagina delle impostazioni della casella di posta.
  - `SMTP_PORT`: porta del server SMTP; di norma si trova nella pagina delle impostazioni della casella di posta.

  :::

- `SMTP_USER`: account del servizio di invio e-mail SMTP, cioè il tuo indirizzo e-mail.
- `SMTP_PASS`: password del servizio di invio e-mail SMTP, cioè la password della tua e-mail.
- `SMTP_SECURE`: connessione SMTP con SSL, `true` o `false`.
- `SITE_NAME`: il nome del tuo sito, mostrato nel messaggio di notifica.
- `SITE_URL`: l'URL del tuo sito, mostrato nel messaggio di notifica.

Le seguenti variabili d'ambiente sono facoltative:

- `SENDER_NAME`: nome personalizzato del mittente nella notifica
- `SENDER_EMAIL`: nome personalizzato del mittente nella notifica, richiesto da alcuni servizi SMTP.
- `MAIL_SUBJECT`: titolo personalizzato dell'e-mail di risposta a un commento
- `MAIL_TEMPLATE`: contenuto personalizzato dell'e-mail di risposta
- `MAIL_SUBJECT_ADMIN`: titolo personalizzato dell'e-mail di notifica di un nuovo commento
- `MAIL_TEMPLATE_ADMIN`: contenuto personalizzato dell'e-mail di notifica di un nuovo commento
- `AUTHOR_EMAIL`: l'e-mail del blogger, usata per capire se il commento pubblicato è suo. Se il commento è del blogger non viene inviata alcuna notifica di promemoria.

## Notifica via WeChat

Per le notifiche WeChat usiamo [Mr. Server](http://sc.ftqq.com/3.version). Devi impostare `SC_KEY` nell'ambiente, con il valore ottenuto da Mr. Server.

- `SC_KEY`: token ottenuto da Mr. Server, obbligatorio per questo servizio.
- `AUTHOR_EMAIL`: l'e-mail del blogger serve a distinguere se il commento pubblicato è suo. Se il commento è del blogger non viene inviata alcuna notifica di promemoria.
- `SITE_NAME`: il nome del tuo sito, mostrato nel messaggio di notifica.
- `SITE_URL`: l'URL del tuo sito, mostrato nel messaggio di notifica.

## Notifica via QQ

Per inviare le notifiche QQ usiamo [Mr. Qmsg](https://qmsg.zendee.cn). Devi impostare `QMSG_KEY` nell'ambiente, con il valore ottenuto da Mr. Qmsg.

- `QMSG_KEY`: chiave ottenuta da Mr. Qmsg, obbligatoria per questo servizio.
- `QMSG_HOST`: HOST ottenuto da Mr. QmsgPrivate, facoltativo. È obbligatorio per questo host. Il valore predefinito è `https://qmsg.zendee.cn`
- `QQ_ID`: l'ID QQ dei destinatari, esclusi i gruppi QQ. Se ci sono più ID QQ, separali con virgole, ad esempio `1244453393,2952937634` (devono essere tutti presenti nell'elenco di ID QQ del tuo Mr. Qmsg).
- `AUTHOR_EMAIL`: l'e-mail del blogger serve a distinguere se il commento pubblicato è suo. Se il commento è del blogger non viene inviata alcuna notifica di promemoria.
- `SITE_NAME`: il nome del tuo sito, mostrato nel messaggio di notifica.
- `SITE_URL`: l'URL del tuo sito, mostrato nel messaggio di notifica.
- `QQ_TEMPLATE`: modello di notifica usato da QQ. Le variabili e i formati specifici sono descritti nel modello di notifica qui sotto. Se non è configurato, viene usato il modello predefinito.

## Notifica via Telegram

Per inviare le notifiche Telegram usiamo un bot di Telegram. Devi impostare le seguenti variabili d'ambiente.

- `TG_BOT_TOKEN`: token del bot Telegram per accedere all'HTTP API. Crea un bot con [@BotFather](https://t.me/BotFather) per ottenere il token. È obbligatorio per questo servizio.
- `TG_CHAT_ID`: il `chat_id` del destinatario. Può essere un utente, un canale o un gruppo. [@userinfobot](https://t.me/userinfobot) mostra questo `chat_id` quando gli inoltri un messaggio. È obbligatorio per questo servizio.
- `AUTHOR_EMAIL`: l'e-mail del blogger serve a distinguere se il commento pubblicato è suo. Se il commento è del blogger non viene inviata alcuna notifica di promemoria.
- `SITE_NAME`: il nome del tuo sito, mostrato nel messaggio di notifica.
- `SITE_URL`: l'URL del tuo sito, mostrato nel messaggio di notifica.
- `TG_TEMPLATE`: modello di notifica usato da Telegram. Le variabili e i formati specifici sono descritti nel modello di notifica qui sotto. Se non è configurato, viene usato il modello predefinito.

## Notifica via PushPlus

[pushplus](http://www.pushplus.plus/) è una piattaforma di push dei messaggi che supporta molti canali, come WeChat, WeChat Work, DingTalk, SMS o e-mail. Devi impostare le seguenti variabili d'ambiente. Puoi consultare la [documentazione di pushplus](http://www.pushplus.plus/doc/guide/api.html#%E4%B8%80%E3%80%81%E5%8F%91%E9%80%81%E6%B6%88%E6%81%AF%E6%8E%A5%E5%8F%A3) per maggiori dettagli sul formato dei parametri.

- `PUSH_PLUS_KEY`： token utente. È obbligatorio per questo servizio.
- `PUSH_PLUS_TOPIC`：ID del gruppo. Se è vuoto, il messaggio viene inviato a te. Non ha effetto se `PUSH_PLUS_CHANNEL` è uguale a `webhook`.
- `PUSH_PLUS_TEMPLATE`：modello di invio
- `PUSH_PLUS_CHANNEL`：canale di invio
- `PUSH_PLUS_WEBHOOK`：il webhook è obbligatorio se `PUSH_PLUS_CHANNEL` è uguale a `webhook` o `cp`.
- `PUSH_PLUS_CALLBACKURL`：URL di callback dopo la risposta all'invio.
- `AUTHOR_EMAIL`: l'e-mail del blogger serve a distinguere se il commento pubblicato è suo. Se il commento è del blogger non viene inviata alcuna notifica di promemoria.
- `SITE_NAME`: il nome del tuo sito, mostrato nel messaggio di notifica.
- `SITE_URL`: l'URL del tuo sito, mostrato nel messaggio di notifica.

## Notifica via Discord

Per inviare le notifiche Discord usiamo i Discord Webhook. Devi impostare le seguenti variabili d'ambiente.

- `DISCORD_WEBHOOK`: URL del Discord Webhook, [come creare un URL di Discord Webhook](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)?
- `DISCORD_TEMPLATE`: modello di invio
- `AUTHOR_EMAIL`: l'e-mail del blogger serve a distinguere se il commento pubblicato è suo. Se il commento è del blogger non viene inviata alcuna notifica di promemoria.
- `SITE_NAME`: il nome del tuo sito, mostrato nel messaggio di notifica.
- `SITE_URL`: l'URL del tuo sito, mostrato nel messaggio di notifica.

## Notifica via Lark

Per inviare le notifiche di gruppo usiamo i Lark Webhook. Sono richieste le seguenti variabili d'ambiente.

- `LARK_WEBHOOK`: bot di gruppo Lark, [utilizzo dei Webhook](https://open.larksuite.com/document/ukTMukTMukTM/ucTM5YjL3ETO24yNxkjN?lang=en-US)
- `LARK_SECRET`: come chiarito dalla documentazione di Lark, questo segreto serve a firmare le richieste per evitarne l'abuso (facoltativo).
- `LARK_TEMPLATE`: modello del messaggio
- `SITE_NAME`: il nome del tuo sito, mostrato nei messaggi di notifica.
- `SITE_URL`: l'URL del tuo sito, mostrato nei messaggi di notifica.

## Modelli di notifica

Waline permette di configurare modelli di notifica personalizzati per ogni piattaforma, così da ottenere maggiori possibilità di personalizzazione e compatibilità i18n.

### Variabili supportate

Il modello riceve i parametri tramite gli oggetti `self`, `parent` e `site`, che contengono rispettivamente le seguenti variabili:

- `self`: il commento stesso

  | variabile       | descrizione                |
  | --------------- | -------------------------- |
  | nick            | Nickname di chi commenta   |
  | mail            | E-mail di chi commenta     |
  | link            | Sito web di chi commenta   |
  | url             | Indirizzo dell'articolo    |
  | comment         | Contenuto del commento     |
  | browser         | Nome del browser           |
  | os              | Nome del sistema operativo |
  | avatar          | avatar                     |
  | _commentLink_\* | Link nei commenti          |

  \*: commentLink è disponibile solo nelle notifiche Telegram e viene automaticamente racchiuso nel formato Markdown.

- `parent`: il commento a cui si risponde (commento padre).

  | variabile | descrizione                |
  | --------- | -------------------------- |
  | nick      | Nickname di chi commenta   |
  | mail      | E-mail di chi commenta     |
  | link      | Sito web di chi commenta   |
  | browser   | Nome del browser           |
  | os        | Nome del sistema operativo |
  | avatar    | avatar                     |
  | comment   | Contenuto del commento     |

- `site`: configurazione del sito web

  | variabile | descrizione                     |
  | --------- | ------------------------------- |
  | name      | Nome del sito                   |
  | url       | URL del sito                    |
  | postUrl   | Indirizzo completo del commento |

### Modello predefinito

Qui sotto trovi il modello predefinito, a titolo di riferimento:

- MAIL_SUBJECT:

  ```plain
  {{parent.nick | safe}}，『{{site.name | safe}}』上的评论收到了回复
  ```

- MAIL_TEMPLATE:

```html
<div
  style="border-top:2px solid #12ADDB;box-shadow:0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;margin:50px auto;font-size:12px;"
>
  <h2
    style="border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;"
  >
    您在<a style="text-decoration:none;color: #12ADDB;" href="{{site.url}}" target="_blank"
      >{{site.name}}</a
    >上的评论有了新的回复
  </h2>
  {{parent.nick}} 同学，您曾发表评论：
  <div style="padding:0 12px 0 12px;margin-top:18px">
    <div style="background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;">
      {{parent.comment | safe}}
    </div>
    <p><strong>{{self.nick}}</strong>回复说：</p>
    <div style="background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;">
      {{self.comment | safe}}
    </div>
    <p>
      您可以点击<a
        style="text-decoration:none; color:#12addb"
        href="{{site.postUrl}}"
        target="_blank"
        >查看回复的完整內容</a
      >，欢迎再次光临<a
        style="text-decoration:none; color:#12addb"
        href="{{site.url}}"
        target="_blank"
        >{{site.name}}</a
      >。
    </p>
    <br />
  </div>
</div>
```

- MAIL_SUBJECT_ADMIN:

  ```plain
  {{site.name | safe}} 上有新评论了
  ```

- MAIL_TEMPLATE_ADMIN:

```html
<div
  style="border-top:2px solid #12ADDB;box-shadow:0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;margin:50px auto;font-size:12px;"
>
  <h2
    style="border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;"
  >
    您在<a style="text-decoration:none;color: #12ADDB;" href="{{site.url}}" target="_blank"
      >{{site.name}}</a
    >上的文章有了新的评论
  </h2>
  <p><strong>{{self.nick}}</strong>回复说：</p>
  <div style="background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;">
    {{self.comment | safe}}
  </div>
  <p>
    您可以点击<a style="text-decoration:none; color:#12addb" href="{{site.postUrl}}" target="_blank"
      >查看回复的完整內容</a
    >
  </p>
  <br />
</div>
```

- QQ_TEMPLATE:

  ```plain
  💬 {{site.name|safe}} 有新评论啦
  {{self.nick}} 评论道:
  {{self.comment}}
  邮箱: {{self.mail}}
  状态: {{self.status}}
  仅供评论预览，查看完整內容:
  {{site.postUrl}}
  ```

- TG_TEMPLATE:

  ````md
  💬 _[{{site.name}}]({{site.url}}) 有新评论啦_

  _{{self.nick}}_ 回复说:

  ```
  {{self.comment-}}
  ```

  {{-self.commentLink}}
  _邮箱: _\`{{self.mail}}\`
  _审核: _{{self.status}}

  仅供评论预览，点击[查看完整內容]({{site.postUrl}})
  ````

### Informazioni aggiuntive

1. La dimensione delle variabili d'ambiente di Vercel è limitata a `4KB`, quindi se il tuo modello è lungo dovresti configurarlo nel file di entry principale; vedi [issue#106](https://github.com/walinejs/waline/issues/106).
1. Le informazioni specifiche delle variabili possono cambiare durante lo sviluppo. Le descrizioni qui riportate sono solo indicative: per il contenuto esatto fai riferimento agli esempi di codice concreti.
