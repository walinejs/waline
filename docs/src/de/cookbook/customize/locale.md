---
title: Sprache anpassen
icon: i18n
---

Dieser Artikel führt Sie durch die Anpassung der Waline-Mehrsprachigkeit und Anzeigetexte.

<!-- more -->

## Client-Sprache und -Text anpassen

`@waline/client` bietet die Option `locale`, über die Sie mehrere Sprachen und Anzeigetexte anpassen können.

Standardmäßig werden die integrierten mehrsprachigen Literale verwendet, und es wird auf `en-US` (Englisch US) zurückgegriffen, wenn die Sprache nicht unterstützt wird.

Sie können eine vollständige mehrsprachige Konfiguration an die Option `locale` übergeben, um Sprachunterstützung hinzuzufügen, oder einige davon festlegen, um vorhandenen UI-Text zu überschreiben.

### Locale-Optionen

- Level-bezogen:
  - `level${number}`: Bezeichnung für Levelnummer

  ::: tip

  Sie können zum Beispiel die Bezeichnungen für 6 Level folgendermaßen anpassen:

  ```ts
  Waline.init({
    locale: {
      level0: '炼体',
      level1: '炼气',
      level2: '筑基',
      level3: '金丹',
      level4: '元婴',
      level5: '化神',
    },
  });
  ```

  :::

- Reaction-bezogen:
  - `reactionTitle`: Reaction-Titel
  - `reaction0`: Reaction 1 Text
  - `reaction1`: Reaction 2 Text
  - `reaction2`: Reaction 3 Text
  - `reaction3`: Reaction 4 Text
  - `reaction4`: Reaction 5 Text
  - `reaction5`: Reaction 6 Text
  - `reaction6`: Reaction 7 Text
  - `reaction7`: Reaction 8 Text
  - `reaction8`: Reaction 9 Text

- UI-bezogen:
  - `nick`: Nickname
  - `mail`: E-Mail
  - `link`: Link
  - `placeholder`: Standardtext der Kommentarbox
  - `sofa`: Anzeigetext, wenn der Kommentarbereich leer ist
  - `submit`: Text der Senden-Schaltfläche
  - `comment`: Text der Kommentar-Schaltfläche
  - `refresh`: Text der Aktualisieren-Schaltfläche
  - `more`: Text der Mehr-Laden-Schaltfläche
  - `uploading`: Anzeigetext beim Hochladen
  - `login`: Text der Anmeldeschaltfläche
  - `admin`: Die Bezeichnung des Administrators
  - `sticky`: Angehefteter Text
  - `word`: Wort
  - `anonymous`: Standard-Name anonymer Benutzer
  - `optional`: Text, der optionale Optionen anzeigt
  - `gifSearchPlaceholder`: Emoji-Such-Platzhaltertext
  - `oldest`: ältester Kommentar
  - `latest`: neuester Kommentar
  - `hottest`: beliebtester Kommentar

  ::: info

  Der obige Text wird auf der Seite angezeigt.

  :::

- Aufforderungsinformationen-bezogen:
  - `nickError`: Fehlermeldung, dass der Nickname die Bedingungen nicht erfüllt
  - `mailError`: Die Fehlermeldung, dass das Postfach die Bedingungen nicht erfüllt
  - `wordHint`: Fehleraufforderung für Kommentar-Wortanzahl, wobei `$0` `$1` `$2` automatisch durch die Untergrenze der zulässigen Wortanzahl, die Obergrenze der zulässigen Wortanzahl und die aktuelle Wortanzahl ersetzt werden.

- Kommentarzeit-bezogen:
  - `seconds`: vor Sekunden
  - `minutes`: vor Minuten
  - `hours`: vor Stunden
  - `days`: vor Tagen
  - `now`: gerade jetzt

- Verwaltungsbezogen:
  - `approved`: Schaltfläche, die Kommentar als genehmigt markiert
  - `waiting`: Schaltfläche, die Kommentar als wartend auf Prüfung markiert
  - `spam`: Schaltfläche, die Kommentare als Spam markiert
  - `unsticky`: Schaltfläche zum Lösen der Anheftung des Kommentars

- Barrierefreiheitsbezogen:
  - `like`: der Beschriftungstext der Like-Schaltfläche
  - `cancelLike`: der Beschriftungstext der Like-Abbrechen-Schaltfläche
  - `reply`: der Beschriftungstext der Antworten-Schaltfläche
  - `cancelReply`: der Beschriftungstext der Antworten-Abbrechen-Schaltfläche
  - `preview`: Beschriftungstext der Vorschau-Schaltfläche
  - `emoji`: der Beschriftungstext der Emoji-Schaltfläche
  - `gif`: Der Beschriftungstext der Gif-Schaltfläche
  - `uploadImage`: der Beschriftungstext der Bild-hochladen-Schaltfläche
  - `profile`: Der Link-Titel der Profilseite
  - `logout`: der Beschriftungstext der Abmeldeschaltfläche

  ::: info

  Diese Texte dienen nur Barrierefreiheitszwecken und werden nicht auf der Seite angezeigt.

  :::

### Beispiel

```js
// en default
const locale = {
  nick: 'NickName',
  nickError: 'NickName cannot be less than 3 bytes.',
  mail: 'E-Mail',
  mailError: 'Please confirm your email address.',
  link: 'Website',
  optional: 'Optional',
  placeholder: 'Comment here...',
  sofa: 'No comment yet.',
  submit: 'Submit',
  like: 'Like',
  cancelLike: 'Cancel like',
  reply: 'Reply',
  cancelReply: 'Cancel reply',
  comment: 'Comments',
  refresh: 'Refresh',
  more: 'Load More...',
  preview: 'Preview',
  emoji: 'Emoji',
  uploadImage: 'Upload Image',
  seconds: 'seconds ago',
  minutes: 'minutes ago',
  hours: 'hours ago',
  days: 'days ago',
  now: 'just now',
  uploading: 'Uploading',
  login: 'Login',
  logout: 'logout',
  admin: 'Admin',
  sticky: 'Sticky',
  word: 'Words',
  wordHint: 'Please input comments between $0 and $1 words!\n Current word number: $2',
  anonymous: 'Anonymous',
  level0: 'Dwarves',
  level1: 'Hobbits',
  level2: 'Ents',
  level3: 'Wizards',
  level4: 'Elves',
  level5: 'Maiar',
  gif: 'GIF',
  gifSearchPlaceholder: 'Search GIF',
  profile: 'Profile',
  approved: 'Approved',
  waiting: 'Waiting',
  spam: 'Spam',
  unsticky: 'Unsticky',
  oldest: 'Oldest',
  latest: 'Latest',
  hottest: 'Hottest',
  reactionTitle: 'What do you think?',
};

Waline.init({
  el: '#waline',
  path: location.pathname,
  serverURL: 'YOUR_SERVER_URL',
  // ...
  locale,
});
```

## Server-Antworttext anpassen

`@waline/vercel` bietet eine Option `locales`, mit der Sie den Antworttext anpassen können.

Standardmäßig werden die integrierten mehrsprachigen Texte verwendet, und es wird auf die Sprachtexte `en-US` zurückgegriffen, wenn die Sprache nicht unterstützt wird.

Sie können eine vollständige mehrsprachige Konfiguration an die Option `locales` übergeben, um Sprachunterstützung hinzuzufügen, oder einige davon festlegen, um den vorhandenen Text zu überschreiben.
::: tip

Alle benutzerdefinierten Texte werden schließlich unter Verwendung der nunjucks-Template-Engine gerendert, die das Schreiben relativ komplexer logischer Ausdrücke unterstützt. Zum Beispiel:

```
Registration confirm mail send failed, please {%- if isAdmin -%}check your mail configuration{%- else -%}check your email address and contact administrator{%- endif -%}.
```

:::

### locale 选项

- Aufforderungsinformationen-bezogen:
  - `import data format not support!`
  - `USER_EXIST`
  - `USER_NOT_EXIST`
  - `USER_REGISTERED`
  - `TOKEN_EXPIRED`
  - `TWO_FACTOR_AUTH_ERROR_DETAIL`
  - `Duplicate Content`
  - `Comment too fast`

- Registrierung/Anmelde-E-Mail-Benachrichtigung-bezogen:
  - `[{{name | safe}}] Registration Confirm Mail`
  - `Please click <a href=\"{{url}}\">{{url}}<a/> to confirm registration, the link is valid for 1 hour. If you are not registering, please ignore this email.`
  - `[{{name | safe}}] Reset Password`
  - `Please click <a href=\"{{url}}\">{{url}}</a> to login and change your password as soon as possible!`
  - `Registration confirm mail send failed, please {%- if isAdmin -%}check your mail configuration{%- else -%}check your email address and contact administrator{%- endif -%}.`

- Kommentar-E-Mail-Benachrichtigung-bezogen:
  - `MAIL_SUBJECT`：`Your comment on {{site.name | safe}} received a reply`
  - `MAIL_TEMPLATE`：`<div style='border-top:2px solid #12ADDB;box-shadow:0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;margin:50px auto;font-size:12px;'> <h2 style='border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;'> Your comment on <a style='text-decoration:none;color: #12ADDB;' href='{{site.url}}' target='_blank'>{{site.name}}</a> received a reply </h2>{{parent.nick}}, you wrote: <div style='padding:0 12px 0 12px;margin-top:18px'> <div style='background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;'>{{parent.comment | safe}}</div><p><strong>{{self.nick}}</strong> replied:</p><div style='background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;'>{{self.comment | safe}}</div><p><a style='text-decoration:none; color:#12addb' href='{{site.postUrl}}' target='_blank'>View full reply</a> or visit <a style='text-decoration:none; color:#12addb' href='{{site.url}}' target='_blank'>{{site.name}}</a>.</p><br/> </div></div>`
  - `MAIL_SUBJECT_ADMIN`：`New comment on {{site.name | safe}}`
  - `MAIL_TEMPLATE_ADMIN`：`<div style='border-top:2px solid #12ADDB;box-shadow:0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;margin:50px auto;font-size:12px;'> <h2 style='border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;'> New comment on <a style='text-decoration:none;color: #12ADDB;' href='{{site.url}}' target='_blank'>{{site.name}}</a> </h2> <p><strong>{{self.nick}}</strong> wrote:</p><div style='background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;'>{{self.comment | safe}}</div><p><a style='text-decoration:none; color:#12addb' href='{{site.postUrl}}' target='_blank'>View page</a></p><br/></div>`

### Beispiel

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  locales: {
    'en-US': {
      USER_EXIST: 'Warning! User exist!',
    },
  },
});
```
