---
title: Kommentarbenachrichtigung
icon: notice
order: 10
---

Wenn ein Benutzer einen Kommentar auf der Website postet oder ein Benutzer auf einen Kommentar antwortet, unterstützt Waline E-Mail- oder WeChat-Benachrichtigungen an den Blogger und den Autor, der auf den Kommentar geantwortet hat.

- Wir unterstützen mehrere Arten von Benachrichtigungen für Blogger
- Wir senden einem Besucher eine E-Mail, sobald sein Kommentar eine Antwort erhält.

<!-- more -->

## E-Mail-Benachrichtigung

Für E-Mail-Benachrichtigungen müssen die folgenden Umgebungsvariablen konfiguriert werden:

- `SMTP_SERVICE`: SMTP Mail-Zustelldienst-Anbieter

  ::: tip

  Sie können alle unterstützten Anbieter in [nodemailer services](https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json) finden. Wenn Ihr Anbieter nicht aufgeführt ist, müssen Sie `SMTP_HOST` und `SMTP_PORT` konfigurieren.
  - `SMTP_HOST`: SMTP-Serveradresse, normalerweise auf der Einstellungsseite des Postfachs zu finden.
  - `SMTP_PORT`: SMTP-Server-Port, normalerweise auf der Einstellungsseite des Postfachs zu finden.

  :::

- `SMTP_USER`: SMTP-Mailversand-Dienstkonto, dies ist Ihre E-Mail-Adresse.
- `SMTP_PASS`: SMTP-Mailversand-Dienstpasswort, dies ist Ihr E-Mail-Passwort.
- `SMTP_SECURE`: SMTP-Verbindung mit SSL, entweder `true` oder `false`.
- `SITE_NAME`: Ihr Website-Name, wird in der Benachrichtigungsnachricht angezeigt.
- `SITE_URL`: Ihre Website-URL, wird in der Benachrichtigungsnachricht angezeigt.

Die folgenden Umgebungsvariablen sind optional:

- `SENDER_NAME`: Benutzerdefinierter Absendername in der Benachrichtigung
- `SENDER_EMAIL`: Benutzerdefinierte Absender-E-Mail in der Benachrichtigung, für einige SMTP-Dienste erforderlich.
- `MAIL_SUBJECT`: Benutzerdefinierter E-Mail-Titel für Kommentarantworten
- `MAIL_TEMPLATE`: Benutzerdefinierter E-Mail-Inhalt für Antworten
- `MAIL_SUBJECT_ADMIN`: Benutzerdefinierter E-Mail-Titel für neue Kommentarbenachrichtigungen
- `MAIL_TEMPLATE_ADMIN`: Benutzerdefinierter E-Mail-Inhalt für neue Kommentarbenachrichtigungen
- `AUTHOR_EMAIL`: Die E-Mail des Bloggers, wird verwendet, um zu prüfen, ob ein geposteter Kommentar vom Blogger stammt. Wenn er vom Blogger stammt, wird keine Erinnerungsbenachrichtigung gesendet.

## Wechat-Benachrichtigung

Wir verwenden [Mr. Server](http://sc.ftqq.com/3.version) für WeChat-Benachrichtigungen. Sie müssen `SC_KEY` in env setzen, das in Mr. Server angewendet wird.

- `SC_KEY`: Token, das in Mr. Server angewendet wird. Es ist für diesen Dienst erforderlich.
- `AUTHOR_EMAIL`: Die E-Mail des Bloggers wird verwendet, um zu unterscheiden, ob der gepostete Kommentar vom Blogger selbst gepostet wurde. Wenn er vom Blogger gepostet wurde, gibt es keine Erinnerungsbenachrichtigung.
- `SITE_NAME`: Ihr Website-Name, wird in der Benachrichtigungsnachricht angezeigt.
- `SITE_URL`: Ihre Website-URL, wird in der Benachrichtigungsnachricht angezeigt.

## QQ-Benachrichtigung

Wir verwenden [Mr. Qmsg](https://qmsg.zendee.cn), um QQ-Benachrichtigungen zu senden. Sie müssen `QMSG_KEY` in env setzen, das in Mr. Qmsg angewendet wird.

- `QMSG_KEY`: KEY, das in Mr. Qmsg angewendet wird. Es ist für diesen Dienst erforderlich.
- `QMSG_HOST`: HOST, das in Mr. QmsgPrivate angewendet wird, Optional. Es ist für diesen Host erforderlich. Standard ist `https://qmsg.zendee.cn`
- `QQ_ID`: Die QQ-ID des/der Empfänger(s), außer für QQ-Gruppen. Wenn es mehr als eine QQ-ID gibt, verwenden Sie Kommas, um mehrere Werte zu trennen, z.B. `1244453393,2952937634` (sollten alle in Ihrer Mr. Qmsg's QQ-ID-Liste enthalten sein).
- `AUTHOR_EMAIL`: Die E-Mail des Bloggers wird verwendet, um zu unterscheiden, ob der gepostete Kommentar vom Blogger selbst gepostet wurde. Wenn er vom Blogger gepostet wurde, gibt es keine Erinnerungsbenachrichtigung.
- `SITE_NAME`: Ihr Website-Name, wird in der Benachrichtigungsnachricht angezeigt.
- `SITE_URL`: Ihre Website-URL, wird in der Benachrichtigungsnachricht angezeigt.
- `QQ_TEMPLATE`: Benachrichtigungsvorlage, die von QQ verwendet wird. Variablen und spezifische Formate finden Sie in der Benachrichtigungsvorlage unten. Wenn nicht konfiguriert, wird die Standardvorlage verwendet.

## Telegram-Benachrichtigung

Wir verwenden Telegram-Bot, um Telegram-Benachrichtigungen zu senden. Sie müssen die folgenden env setzen.

- `TG_BOT_TOKEN`: Telegram-Bot-Token für den Zugriff auf die HTTP-API. Erstellen Sie einen Bot mit [@BotFather](https://t.me/BotFather), um diesen Token zu erhalten. Es ist für diesen Dienst erforderlich.
- `TG_CHAT_ID`: Die `chat_id` des Empfängers. Es kann ein Benutzer, ein Kanal oder eine Gruppe sein. [@userinfobot](https://t.me/userinfobot) zeigt diese `chat_id` an, wenn Sie eine Nachricht dorthin weiterleiten. Es ist für diesen Dienst erforderlich.
- `AUTHOR_EMAIL`: Die E-Mail des Bloggers wird verwendet, um zu unterscheiden, ob der gepostete Kommentar vom Blogger selbst gepostet wurde. Wenn er vom Blogger gepostet wurde, gibt es keine Erinnerungsbenachrichtigung.
- `SITE_NAME`: Ihr Website-Name, wird in der Benachrichtigungsnachricht angezeigt.
- `SITE_URL`: Ihre Website-URL, wird in der Benachrichtigungsnachricht angezeigt.
- `TG_TEMPLATE`: Benachrichtigungsvorlage, die von Telegram verwendet wird. Variablen und spezifische Formate finden Sie in der Benachrichtigungsvorlage unten. Wenn nicht konfiguriert, wird die Standardvorlage verwendet.

## PushPlus-Benachrichtigung

[pushplus](http://www.pushplus.plus/) ist eine Nachrichten-Push-Plattform, die viele Kanäle wie WeChat, WeChat Work, Ding Talk, SMS oder E-Mail unterstützt. Sie müssen die folgenden env setzen. Sie können zur [pushplus-Dokumentation](http://www.pushplus.plus/doc/guide/api.html#%E4%B8%80%E3%80%81%E5%8F%91%E9%80%81%E6%B6%88%E6%81%AF%E6%8E%A5%E5%8F%A3) gehen, um weitere Details zum Parameterformat zu erhalten.

- `PUSH_PLUS_KEY`： Benutzer-Token. Es ist für diesen Dienst erforderlich.
- `PUSH_PLUS_TOPIC`：Gruppen-ID. Senden Sie an sich selbst, wenn es leer ist. Und es ist nutzlos, wenn `PUSH_PLUS_CHANNEL` `webhook` entspricht.
- `PUSH_PLUS_TEMPLATE`：Sendevorlage
- `PUSH_PLUS_CHANNEL`：Sendekanal
- `PUSH_PLUS_WEBHOOK`：Webhook ist erforderlich, wenn `PUSH_PLUS_CHANNEL` `webhook` oder `cp` entspricht.
- `PUSH_PLUS_CALLBACKURL`：Callback-URL nach Sendeantwort.
- `AUTHOR_EMAIL`: Die E-Mail des Bloggers wird verwendet, um zu unterscheiden, ob der gepostete Kommentar vom Blogger selbst gepostet wurde. Wenn er vom Blogger gepostet wurde, gibt es keine Erinnerungsbenachrichtigung.
- `SITE_NAME`: Ihr Website-Name, wird in der Benachrichtigungsnachricht angezeigt.
- `SITE_URL`: Ihre Website-URL, wird in der Benachrichtigungsnachricht angezeigt.

## Discord-Benachrichtigung

Wir verwenden Discord-Webhook, um Discord-Benachrichtigungen zu senden. Sie müssen die folgenden env setzen.

- `DISCORD_WEBHOOK`: Discord-Webhook-URL, [Wie erstellt man eine Discord-Webhook-URL](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)?
- `DISCORD_TEMPLATE`: Sendevorlage
- `AUTHOR_EMAIL`: Die E-Mail des Bloggers wird verwendet, um zu unterscheiden, ob der gepostete Kommentar vom Blogger selbst gepostet wurde. Wenn er vom Blogger gepostet wurde, gibt es keine Erinnerungsbenachrichtigung.
- `SITE_NAME`: Ihr Website-Name, wird in der Benachrichtigungsnachricht angezeigt.
- `SITE_URL`: Ihre Website-URL, wird in der Benachrichtigungsnachricht angezeigt.

## Lark-Benachrichtigung

Wir verwenden Lark-Webhook, um seine Gruppenbenachrichtigungen zu senden. Die folgenden env-Variablen sind erforderlich.

- `LARK_WEBHOOK`: Lark-Gruppen-Bot [Webhook-Verwendung](https://open.larksuite.com/document/ukTMukTMukTM/ucTM5YjL3ETO24yNxkjN?lang=en-US)
- `LARK_SECRET`: Wie aus der Dokumentation von Lark hervorgeht, wird dieses Secret verwendet, um Ihre Anfrage zu signieren und Missbrauch zu vermeiden（Optional).
- `LARK_TEMPLATE`: Nachrichtenvorlage
- `SITE_NAME`: Ihr Website-Name, der in Benachrichtigungsnachrichten angezeigt wird.
- `SITE_URL`: Ihre Website-URL, die in Benachrichtigungsnachrichten angezeigt wird.

## Benachrichtigungsvorlage

Waline unterstützt die separate Konfiguration Ihrer benutzerdefinierten Benachrichtigungsvorlagen für jede Plattform, um stärkere Anpassungsfähigkeiten und i18n-Kompatibilität zu erreichen.

### Unterstützte Variablen

Die Vorlage übergibt Parameter durch `self`-, `parent`- und `site`-Objekte, die jeweils die folgenden Variablen enthalten:

- `self`: Der Kommentar selbst

  | Variable        | Beschreibung              |
  | --------------- | ------------------------- |
  | nick            | Nickname des Kommentators |
  | mail            | E-Mail des Kommentators   |
  | link            | Website des Kommentators  |
  | url             | Artikeladresse            |
  | comment         | Kommentarinhalt           |
  | browser         | Browsername               |
  | os              | Betriebssystemname        |
  | avatar          | Avatar                    |
  | _commentLink_\* | Links in Kommentaren      |

  \*: commentLink wird nur in Telegram-Benachrichtigungen bereitgestellt und wird automatisch im Markdown-Format gekapselt.

- `parent`: Kommentar, auf den geantwortet wurde (übergeordneter Kommentar).

  | Variable | Beschreibung              |
  | -------- | ------------------------- |
  | nick     | Nickname des Kommentators |
  | mail     | E-Mail des Kommentators   |
  | link     | Website des Kommentators  |
  | browser  | Browsername               |
  | os       | Betriebssystemname        |
  | avatar   | Avatar                    |
  | comment  | Kommentarinhalt           |

- `site`: Website-Konfiguration

  | Variable | Beschreibung                  |
  | -------- | ----------------------------- |
  | name     | Website-Name                  |
  | url      | Website-URL                   |
  | postUrl  | Vollständige Kommentaradresse |

### Standardvorlage

Die Standardvorlage ist hier zu Ihrer Referenz angehängt:

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

### Zusätzliche Informationen

1. Die Umgebungsvariablengröße von Vercel ist auf `4KB` begrenzt. Wenn Ihre Vorlage also lang ist, sollten Sie sie in der Haupteingangsdatei konfigurieren, siehe [issue#106](https://github.com/walinejs/waline/issues/106).
1. Die spezifischen Informationen der Variablen können sich während des Entwicklungsprozesses ändern. Die Variablenbeschreibungen hier dienen nur als Referenz. Bitte beziehen Sie sich für spezifische Inhalte auf die spezifischen Codebeispiele.
