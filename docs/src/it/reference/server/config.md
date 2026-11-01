---
title: Configurazione del server
icon: config
---

Le seguenti opzioni vanno configurate nel file di ingresso del server `index.js`.

::: warning

Se usi un template, tieni presente che devi salvare tu stesso queste configurazioni, perché vengono sovrascritte quando aggiorni il template ufficiale.

Ti consigliamo di creare un repository a partire dal template ufficiale e di fare lì le tue modifiche.

:::

## Opzioni di base

### plugins

- Tipo: `plugin[]`

Vedi [Sistema di plugin](./plugin.md) per i dettagli

### secureDomains

- Tipo: `string | RegExp | string[] | RegExp[]`

Impostazioni dei domini sicuri. Le richieste provenienti da altri domini ricevono un codice di stato 403. Supporta i tipi String, Regexp e Array. Se ometti questa configurazione, tutti i domini di provenienza sono consentiti.

::: details Esempio

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  secureDomains: 'waline.js.org',
});
```

:::

::: tip

- Per rendere più semplice lo sviluppo locale, `localhost` e `127.0.0.1` vengono aggiunti per impostazione predefinita all'elenco dei domini sicuri.
- Se questa opzione è impostata, la variabile d'ambiente `SECURE_DOMAINS` non ha effetto.

:::

### forbiddenWords

- Tipo: `string[]`

Se un commento contiene una parola vietata, viene contrassegnato come spam.

::: details Esempio

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  forbiddenWords: ['Trump'],
});
```

:::

### disallowIPList

- Tipo: `string[]`

Se l'IP di un commento è presente in questa lista, viene restituito il codice di stato 403.

::: details Esempio

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  disallowIPList: ['8.8.8.8', '4.4.4.4'],
});
```

:::

### mailSubject

- Tipo: `string`

Personalizza l'oggetto dell'e-mail di risposta ai commenti; equivale alla variabile d'ambiente `MAIL_SUBJECT`.

### mailTemplate

- Tipo: `string`

Personalizza il contenuto dell'e-mail di risposta ai commenti; equivale alla variabile d'ambiente `MAIL_TEMPLATE`.

### mailSubjectAdmin

- Tipo: `string`

Personalizza l'oggetto dell'e-mail di notifica dei nuovi commenti; equivale alla variabile d'ambiente `MAIL_SUBJECT_ADMIN`.

### mailTemplateAdmin

- Tipo: `string`

Personalizza il contenuto dell'e-mail di notifica dei nuovi commenti; equivale alla variabile d'ambiente `MAIL_TEMPLATE_ADMIN`.

### QQTemplate

- Tipo: `string`

Template di notifica dei commenti via QQ; equivale alla variabile d'ambiente `QQ_TEMPLATE`.

### TGTemplate

- Tipo: `string`

Template di notifica dei commenti via Telegram; equivale alla variabile d'ambiente `TG_TEMPLATE`.

### model

- tipo: `class`

Per i dettagli vedi [Personalizzare il servizio database](../../cookbook/customize/database.md)

### encryptPassword

- tipo: `function`

Vedi [Personalizzare il sistema utenti](../../cookbook/customize/userdb.md) per i dettagli

### locales

- tipo: `Record<string, Record<string, string>>`

Vedi [Personalizzare la localizzazione](../../cookbook/customize/locale.md)

## Hook dei commenti

Oltre alla configurazione tramite variabili d'ambiente, Waline fornisce alcuni hook personalizzati per gestire più facilmente esigenze specifiche. Vanno configurati nel file di ingresso del server `index.js`.

### preSave(comment)

Waline fornisce alcuni hook personalizzati che permettono di adattare il comportamento del server Waline alle proprie esigenze.

::: details Esempio

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async preSave(comment) {
    const isSpam = await Akismet.check(comment);
    if (isSpam) {
      return { errmsg: "It's a spam!" };
    }
  },
});
```

:::

### postSave(comment, pComment)

Azione eseguita dopo la pubblicazione del commento.

Quando il metodo viene eseguito, i dati del commento vengono passati come primo parametro; se il commento è una risposta a un altro commento, il commento padre viene passato come secondo parametro.

::: details Esempio

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async postSave(comment, pComment) {
    await mailto({
      mail: pComment.mail,
      text: `${comment.nick} replied your comment!`,
    });
  },
});
```

:::

### preUpdate(comment)

Azione eseguita prima che il contenuto di un commento venga aggiornato dalla dashboard. Se il metodo restituisce del contenuto, l'interfaccia risponde direttamente senza aggiornare i dati del commento.

::: details Esempio

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async preUpdate(comment) {
    return "Then you can't update comment data";
  },
});
```

:::

### postUpdate(comment)

Azione eseguita dopo che il contenuto di un commento è stato aggiornato dalla dashboard. Quando il metodo viene eseguito, riceve i dati del commento.

::: details Esempio

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async postUpdate(comment) {
    console.log(`comment ${comment.objectId} has been updated!`);
  },
});
```

:::

### preDelete(commentId)

Azione eseguita prima dell'eliminazione di un commento. Quando il metodo viene eseguito, riceve l'ID del commento interessato. Se il metodo restituisce del contenuto, l'interfaccia risponde direttamente senza aggiornare i dati del commento.

::: details Esempio

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async preDelete(commentId) {
    return "Then you can't delete comment";
  },
});
```

:::

### postDelete(commentId)

Azione eseguita dopo l'eliminazione di un commento; l'ID del commento viene passato come unico parametro.

::: details Esempio

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async postDelete(commentId) {
    console.log(`comment ${commentId} has been deleted!`);
  },
});
```

:::
