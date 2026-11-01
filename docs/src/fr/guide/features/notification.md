---
title: Notification de commentaires
icon: notice
order: 10
---

Lorsqu'un utilisateur publie un commentaire sur le site ou répond à un commentaire, Waline prend en charge les notifications par e-mail ou par WeChat au blogueur ainsi qu'à l'auteur auquel on répond.

- Nous prenons en charge plusieurs types de notifications pour le blogueur
- Un visiteur reçoit un e-mail dès que son commentaire obtient une réponse.

<!-- more -->

## Notification par e-mail

La notification par e-mail nécessite la configuration des variables d'environnement suivantes :

- `SMTP_SERVICE` : fournisseur du service d'envoi d'e-mails SMTP

  ::: tip

  Vous trouverez la liste des fournisseurs pris en charge dans [nodemailer services](https://github.com/nodemailer/nodemailer/blob/master/src/well-known/services.json). Si votre fournisseur n'y figure pas, vous devez configurer `SMTP_HOST` et `SMTP_PORT`.

  - `SMTP_HOST` : adresse du serveur SMTP, généralement indiquée dans les paramètres de votre boîte de réception.
  - `SMTP_PORT` : port du serveur SMTP, généralement indiqué dans les paramètres de votre boîte de réception.

  :::

- `SMTP_USER` : compte du service d'envoi d'e-mails SMTP, c'est-à-dire votre adresse e-mail.
- `SMTP_PASS` : mot de passe du service d'envoi d'e-mails SMTP, c'est-à-dire le mot de passe de votre e-mail.
- `SMTP_SECURE` : connexion SMTP en SSL, `true` ou `false`.
- `SITE_NAME` : nom de votre site, affiché dans les notifications.
- `SITE_URL` : URL de votre site, affichée dans les notifications.

Les variables d'environnement suivantes sont facultatives :

- `SENDER_NAME` : nom de l'expéditeur personnalisé dans la notification
- `SENDER_EMAIL` : adresse de l'expéditeur personnalisée dans la notification, requise pour certains services SMTP.
- `MAIL_SUBJECT` : objet personnalisé de l'e-mail de réponse à un commentaire
- `MAIL_TEMPLATE` : contenu personnalisé de l'e-mail de réponse
- `MAIL_SUBJECT_ADMIN` : objet personnalisé de l'e-mail de notification de nouveau commentaire
- `MAIL_TEMPLATE_ADMIN` : contenu personnalisé de l'e-mail de notification de nouveau commentaire
- `AUTHOR_EMAIL` : adresse e-mail du blogueur, utilisée pour déterminer si le commentaire publié provient du blogueur. S'il provient du blogueur, aucune notification de rappel n'est envoyée.

## Notification WeChat

Nous utilisons [Mr. Server](http://sc.ftqq.com/3.version) pour les notifications WeChat. Vous devez définir `SC_KEY` dans les variables d'environnement de Mr. Server.

- `SC_KEY` : jeton obtenu auprès de Mr. Server, requis pour ce service.
- `AUTHOR_EMAIL` : l'adresse e-mail du blogueur sert à déterminer si le commentaire publié provient du blogueur lui-même. S'il provient du blogueur, aucune notification de rappel n'est envoyée.
- `SITE_NAME` : nom de votre site, il sera affiché dans le message de notification.
- `SITE_URL` : URL de votre site, elle sera affichée dans le message de notification.

## Notification QQ

Nous utilisons [Mr. Qmsg](https://qmsg.zendee.cn) pour envoyer les notifications QQ. Vous devez définir `QMSG_KEY` dans les variables d'environnement de Mr. Qmsg.

- `QMSG_KEY` : clé obtenue auprès de Mr. Qmsg, requise pour ce service.
- `QMSG_HOST` : hôte obtenu auprès de Mr. QmsgPrivate, facultatif. Il est requis pour cet hôte. La valeur par défaut est `https://qmsg.zendee.cn`
- `QQ_ID` : l'identifiant QQ du ou des destinataires, à l'exception des groupes QQ. S'il y a plusieurs identifiants QQ, séparez les valeurs par des virgules, par exemple `1244453393,2952937634` (ils doivent tous figurer dans la liste d'identifiants QQ de votre compte Mr. Qmsg).
- `AUTHOR_EMAIL` : l'adresse e-mail du blogueur sert à déterminer si le commentaire publié provient du blogueur lui-même. S'il provient du blogueur, aucune notification de rappel n'est envoyée.
- `SITE_NAME` : nom de votre site, il sera affiché dans le message de notification.
- `SITE_URL` : URL de votre site, elle sera affichée dans le message de notification.
- `QQ_TEMPLATE` : modèle de notification utilisé par QQ. Les variables et les formats spécifiques sont décrits dans le modèle de notification ci-dessous. S'il n'est pas configuré, le modèle par défaut est utilisé.

## Notification Telegram

Nous utilisons un bot Telegram pour envoyer les notifications Telegram. Vous devez définir les variables d'environnement suivantes.

- `TG_BOT_TOKEN` : jeton du bot Telegram permettant d'accéder à l'API HTTP. Créez un bot avec [@BotFather](https://t.me/BotFather) pour obtenir ce jeton. Il est requis pour ce service.
- `TG_CHAT_ID` : le `chat_id` du destinataire. Il peut s'agir d'un utilisateur, d'un canal ou d'un groupe. [@userinfobot](https://t.me/userinfobot) affiche ce `chat_id` lorsque vous lui transférez un message. Il est requis pour ce service.
- `AUTHOR_EMAIL` : l'adresse e-mail du blogueur sert à déterminer si le commentaire publié provient du blogueur lui-même. S'il provient du blogueur, aucune notification de rappel n'est envoyée.
- `SITE_NAME` : nom de votre site, il sera affiché dans le message de notification.
- `SITE_URL` : URL de votre site, elle sera affichée dans le message de notification.
- `TG_TEMPLATE` : modèle de notification utilisé par Telegram. Les variables et les formats spécifiques sont décrits dans le modèle de notification ci-dessous. S'il n'est pas configuré, le modèle par défaut est utilisé.

## Notification PushPlus

[pushplus](http://www.pushplus.plus/) est une plateforme de push de messages qui prend en charge de nombreux canaux comme WeChat, WeChat Work, DingTalk, SMS ou e-mail. Vous devez définir les variables d'environnement suivantes. Vous pouvez consulter la [documentation pushplus](http://www.pushplus.plus/doc/guide/api.html#%E4%B8%80%E3%80%81%E5%8F%91%E9%80%81%E6%B6%88%E6%81%AF%E6%8E%A5%E5%8F%A3) pour plus de détails sur le format des paramètres.

- `PUSH_PLUS_KEY` : jeton utilisateur. Il est requis pour ce service.
- `PUSH_PLUS_TOPIC` : identifiant de groupe. S'il est vide, le message vous est envoyé. Et il est inutile si `PUSH_PLUS_CHANNEL` vaut `webhook`.
- `PUSH_PLUS_TEMPLATE` : modèle d'envoi
- `PUSH_PLUS_CHANNEL` : canal d'envoi
- `PUSH_PLUS_WEBHOOK` : le webhook est requis si `PUSH_PLUS_CHANNEL` vaut `webhook` ou `cp`.
- `PUSH_PLUS_CALLBACKURL` : URL de rappel après l'envoi de la réponse.
- `AUTHOR_EMAIL` : l'adresse e-mail du blogueur sert à déterminer si le commentaire publié provient du blogueur lui-même. S'il provient du blogueur, aucune notification de rappel n'est envoyée.
- `SITE_NAME` : nom de votre site, il sera affiché dans le message de notification.
- `SITE_URL` : URL de votre site, elle sera affichée dans le message de notification.

## Notification Discord

Nous utilisons un webhook Discord pour envoyer les notifications Discord. Vous devez définir les variables d'environnement suivantes.

- `DISCORD_WEBHOOK` : URL du webhook Discord, [Comment créer une URL de webhook Discord](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks) ?
- `DISCORD_TEMPLATE` : modèle d'envoi
- `AUTHOR_EMAIL` : l'adresse e-mail du blogueur sert à déterminer si le commentaire publié provient du blogueur lui-même. S'il provient du blogueur, aucune notification de rappel n'est envoyée.
- `SITE_NAME` : nom de votre site, il sera affiché dans le message de notification.
- `SITE_URL` : URL de votre site, elle sera affichée dans le message de notification.

## Notification Lark

Nous utilisons un webhook Lark pour envoyer les notifications de groupe. Les variables d'environnement suivantes sont requises.

- `LARK_WEBHOOK` : bot de groupe Lark, voir [Webhook Usages](https://open.larksuite.com/document/ukTMukTMukTM/ucTM5YjL3ETO24yNxkjN?lang=en-US)
- `LARK_SECRET` : comme indiqué dans la documentation de Lark, ce secret sert à signer vos requêtes pour éviter les abus (facultatif).
- `LARK_TEMPLATE` : modèle de message
- `SITE_NAME` : nom de votre site, il sera affiché dans les messages de notification.
- `SITE_URL` : URL de votre site, elle sera affichée dans les messages de notification.

## Modèle de notification

Waline permet de configurer des modèles de notification personnalisés pour chaque plateforme séparément, afin d'offrir des possibilités de personnalisation plus poussées et une meilleure compatibilité i18n.

### Variables disponibles

Le modèle transmet les paramètres via les objets `self`, `parent` et `site`, qui contiennent respectivement les variables suivantes :

- `self` : le commentaire lui-même

  | variable        | description                   |
  | --------------- | ----------------------------- |
  | nick            | Pseudo du commentateur        |
  | mail            | E-mail du commentateur        |
  | link            | Site web du commentateur      |
  | url             | Adresse de l'article          |
  | comment         | Contenu du commentaire        |
  | browser         | Nom du navigateur             |
  | os              | Nom du système d'exploitation |
  | avatar          | avatar                        |
  | _commentLink_\* | Liens dans les commentaires   |

  \* : commentLink n'est fourni que dans les notifications Telegram et est automatiquement encapsulé au format Markdown.

- `parent` : le commentaire auquel on répond (commentaire parent).

  | variable | description                   |
  | -------- | ----------------------------- |
  | nick     | Pseudo du commentateur        |
  | mail     | E-mail du commentateur        |
  | link     | Site web du commentateur      |
  | browser  | Nom du navigateur             |
  | os       | Nom du système d'exploitation |
  | avatar   | avatar                        |
  | comment  | Contenu du commentaire        |

- `site` : configuration du site

  | variable | description                     |
  | -------- | ------------------------------- |
  | name     | Nom du site                     |
  | url      | URL du site                     |
  | postUrl  | Adresse complète du commentaire |

### Modèle par défaut

Le modèle par défaut est reproduit ci-dessous à titre de référence :

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

### Informations complémentaires

1. La taille des variables d'environnement de Vercel est limitée à `4KB` ; si votre modèle est long, configurez-le plutôt dans le fichier d'entrée principal, voir [issue#106](https://github.com/walinejs/waline/issues/106).
1. Les informations détaillées des variables peuvent évoluer au cours du développement. Les descriptions ci-dessus ne sont données qu'à titre indicatif. Référez-vous aux exemples de code pour le contenu exact.
