---
title: Personalizza la lingua
icon: i18n
---

Questa guida ti mostra come personalizzare le lingue e i testi mostrati da Waline.

<!-- more -->

## Personalizza lingua e testi del client

`@waline/client` fornisce l'opzione `locale`, tramite la quale puoi personalizzare le lingue e i testi mostrati.

Per impostazione predefinita usa le traduzioni integrate e, se la lingua non è supportata, ricade su `en-US` (inglese americano).

Puoi passare all'opzione `locale` una configurazione completa per aggiungere una lingua, oppure impostare solo alcune voci per sovrascrivere i testi esistenti dell'interfaccia.

### Opzioni di `locale`

- Relative ai livelli:
  - `level${number}`: etichetta del livello numero indicato

  ::: tip

  Ad esempio, puoi personalizzare le etichette di 6 livelli così:

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

- Relative alle reazioni:
  - `reactionTitle`: titolo delle reazioni
  - `reaction0`: testo della reazione 1
  - `reaction1`: testo della reazione 2
  - `reaction2`: testo della reazione 3
  - `reaction3`: testo della reazione 4
  - `reaction4`: testo della reazione 5
  - `reaction5`: testo della reazione 6
  - `reaction6`: testo della reazione 7
  - `reaction7`: testo della reazione 8
  - `reaction8`: testo della reazione 9

- Relative all'interfaccia:
  - `nick`: nickname
  - `mail`: e-mail
  - `link`: link
  - `placeholder`: testo predefinito del riquadro dei commenti
  - `sofa`: testo mostrato quando l'area dei commenti è vuota
  - `submit`: testo del pulsante di invio
  - `comment`: testo del pulsante dei commenti
  - `refresh`: testo del pulsante di aggiornamento
  - `more`: testo del pulsante per caricare altri commenti
  - `uploading`: testo mostrato durante il caricamento
  - `login`: testo del pulsante di accesso
  - `admin`: l'etichetta dell'amministratore
  - `sticky`: testo dei commenti fissati
  - `word`: parola
  - `anonymous`: nome predefinito dell'utente anonimo
  - `optional`: testo che indica i campi facoltativi
  - `gifSearchPlaceholder`: testo segnaposto della ricerca emoji
  - `oldest`: commenti meno recenti
  - `latest`: commenti più recenti
  - `hottest`: commenti più popolari

  ::: info

  I testi qui sopra vengono mostrati nella pagina.

  :::

- Relative ai messaggi di errore:
  - `nickError`: messaggio di errore quando il nickname non rispetta i requisiti
  - `mailError`: messaggio di errore quando l'indirizzo e-mail non rispetta i requisiti
  - `wordHint`: messaggio di errore per il conteggio delle parole, in cui `$0`, `$1` e `$2` vengono sostituiti automaticamente con il limite minimo di parole consentite, il limite massimo e il numero di parole attuale.

- Relativi all'ora dei commenti:
  - `seconds`: secondi fa
  - `minutes`: minuti fa
  - `hours`: ore fa
  - `days`: giorni fa
  - `now`: adesso

- Relative alla moderazione:
  - `approved`: pulsante che contrassegna il commento come approvato
  - `waiting`: pulsante che contrassegna il commento come in attesa di revisione
  - `spam`: pulsante che contrassegna i commenti come spam
  - `unsticky`: pulsante che rimuove il commento da quelli fissati

- Relative all'accessibilità:
  - `like`: il testo dell'etichetta del pulsante «mi piace»
  - `cancelLike`: il testo dell'etichetta del pulsante per annullare il «mi piace»
  - `reply`: il testo dell'etichetta del pulsante di risposta
  - `cancelReply`: il testo dell'etichetta del pulsante per annullare la risposta
  - `preview`: testo dell'etichetta del pulsante di anteprima
  - `emoji`: il testo dell'etichetta del pulsante emoji
  - `gif`: il testo dell'etichetta del pulsante GIF
  - `uploadImage`: il testo dell'etichetta del pulsante per caricare un'immagine
  - `profile`: il titolo del link alla pagina del profilo
  - `logout`: il testo dell'etichetta del pulsante di uscita

  ::: info

  Questi testi servono solo per l'accessibilità e non vengono mostrati nella pagina.

  :::

### Esempio

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

## Personalizza i testi di risposta del server

`@waline/vercel` fornisce l'opzione `locales`, che permette di personalizzare i testi di risposta.

Per impostazione predefinita usa i testi multilingue integrati e, se la lingua non è supportata, ricade sui testi in `en-US`.

Puoi passare all'opzione `locales` una configurazione completa per aggiungere una lingua, oppure impostarne solo alcune voci per sovrascrivere i testi esistenti.

::: tip

Tutti i testi personalizzati vengono infine renderizzati con il motore di template nunjucks, che supporta espressioni logiche piuttosto complesse. Ad esempio:

```
Registration confirm mail send failed, please {%- if isAdmin -%}check your mail configuration{%- else -%}check your email address and contact administrator{%- endif -%}.
```

:::

### Opzioni di `locales`

- Relative ai messaggi di errore:
  - `import data format not support!`
  - `USER_EXIST`
  - `USER_NOT_EXIST`
  - `USER_REGISTERED`
  - `TOKEN_EXPIRED`
  - `TWO_FACTOR_AUTH_ERROR_DETAIL`
  - `Duplicate Content`
  - `Comment too fast`

- Relative alle e-mail di registrazione/accesso:
  - `[{{name | safe}}] Registration Confirm Mail`
  - `Please click <a href=\"{{url}}\">{{url}}<a/> to confirm registration, the link is valid for 1 hour. If you are not registering, please ignore this email.`
  - `[{{name | safe}}] Reset Password`
  - `Please click <a href=\"{{url}}\">{{url}}</a> to login and change your password as soon as possible!`
  - `Registration confirm mail send failed, please {%- if isAdmin -%}check your mail configuration{%- else -%}check your email address and contact administrator{%- endif -%}.`

- Relative alle e-mail di notifica dei commenti:
  - `MAIL_SUBJECT`：`Your comment on {{site.name | safe}} received a reply`
  - `MAIL_TEMPLATE`：`<div style='border-top:2px solid #12ADDB;box-shadow:0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;margin:50px auto;font-size:12px;'> <h2 style='border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;'> Your comment on <a style='text-decoration:none;color: #12ADDB;' href='{{site.url}}' target='_blank'>{{site.name}}</a> received a reply </h2>{{parent.nick}}, you wrote: <div style='padding:0 12px 0 12px;margin-top:18px'> <div style='background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;'>{{parent.comment | safe}}</div><p><strong>{{self.nick}}</strong> replied:</p><div style='background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;'>{{self.comment | safe}}</div><p><a style='text-decoration:none; color:#12addb' href='{{site.postUrl}}' target='_blank'>View full reply</a> or visit <a style='text-decoration:none; color:#12addb' href='{{site.url}}' target='_blank'>{{site.name}}</a>.</p><br/> </div></div>`
  - `MAIL_SUBJECT_ADMIN`：`New comment on {{site.name | safe}}`
  - `MAIL_TEMPLATE_ADMIN`：`<div style='border-top:2px solid #12ADDB;box-shadow:0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;margin:50px auto;font-size:12px;'> <h2 style='border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;'> New comment on <a style='text-decoration:none;color: #12ADDB;' href='{{site.url}}' target='_blank'>{{site.name}}</a> </h2> <p><strong>{{self.nick}}</strong> wrote:</p><div style='background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;'>{{self.comment | safe}}</div><p><a style='text-decoration:none; color:#12addb' href='{{site.postUrl}}' target='_blank'>View page</a></p><br/></div>`

### Esempio

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
