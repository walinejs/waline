---
title: Server-Konfiguration
icon: config
---

Die folgenden Optionen müssen in der Server-Eingangsdatei `index.js` konfiguriert werden.

::: warning

Wenn Sie eine Vorlage verwenden, beachten Sie bitte, dass Sie diese Konfigurationen selbst speichern müssen, da sie überschrieben werden, wenn Sie die neueste offizielle Vorlage abrufen.

Wir empfehlen Ihnen, ein Repository aus der offiziellen Vorlage zu erstellen und Ihre Änderungen dort vorzunehmen.

:::

## Grundlegende Optionen

### plugins

- Typ: `plugin[]`

Siehe [Plugin-System](./plugin.md) für Details

### secureDomains

- Typ: `string | RegExp | string[] | RegExp[]`

Sichere Domain-Einstellungen. Anfragen von anderen Domains erhalten den Statuscode 403. Es unterstützt String-, Regexp- und Array-Typen. Wenn diese Konfiguration leer gelassen wird, sind alle Domain-Referrer erlaubt.

::: details Beispiel

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  secureDomains: 'waline.js.org',
});
```

:::

::: tip

- Um die lokale Entwicklung zu erleichtern, werden `localhost` und `127.0.0.1` standardmäßig zur Liste der sicheren Domainnamen hinzugefügt.
- Die Umgebungsvariable `SECURE_DOMAINS` funktioniert nicht, wenn diese Option gesetzt ist.

:::

### forbiddenWords

- Typ: `string[]`

Wenn ein Kommentar ein verbotenes Wort enthält, wird er als Spam markiert.

::: details Beispiel

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  forbiddenWords: ['Trump'],
});
```

:::

### disallowIPList

- Typ: `string[]`

Wenn eine Kommentar-IP mit dieser Liste übereinstimmt, wird der Statuscode 403 zurückgegeben.

::: details Beispiel

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  disallowIPList: ['8.8.8.8', '4.4.4.4'],
});
```

:::

### mailSubject

- Typ: `string`

Passen Sie den Titel der Kommentarantwort-E-Mail an, was der Umgebungsvariable `MAIL_SUBJECT` entspricht.

### mailTemplate

- Typ: `string`

Passen Sie den Inhalt der Kommentarantwort-E-Mail an, was der Umgebungsvariable `MAIL_TEMPLATE` entspricht.

### mailSubjectAdmin

- Typ: `string`

Passen Sie den Titel der neuen Kommentarbenachrichtigungs-E-Mail an, was der Umgebungsvariable `MAIL_SUBJECT_ADMIN` entspricht.

### mailTemplateAdmin

- Typ: `string`

Passen Sie den Inhalt der neuen Kommentarbenachrichtigungs-E-Mail an, was der Umgebungsvariable `MAIL_TEMPLATE_ADMIN` entspricht.

### QQTemplate

- Typ: `string`

Die QQ-Kommentarbenachrichtigungsvorlage, die der Umgebungsvariable `QQ_TEMPLATE` entspricht.

### TGTemplate

- Typ: `string`

Telegram-Kommentarbenachrichtigungsvorlage, die der Umgebungsvariable `TG_TEMPLATE` entspricht.

### model

- Typ: `class`

Für Details siehe [Datenbank-Service anpassen](../../cookbook/customize/database.md)

### encryptPassword

- Typ: `function`

Siehe [Benutzersystem anpassen](../../cookbook/customize/userdb.md) für Details

### locales

- Typ: `Record<string, Record<string, string>>`

Siehe [Benutzerdefinierte Sprache](../../cookbook/customize/locale.md)

## Kommentar-Hooks

Neben der Konfiguration von Umgebungsvariablen bietet Waline auch einige benutzerdefinierte Hooks, um die Verarbeitung benutzerdefinierter Anforderungen zu erleichtern. Diese müssen nur in der Server-Eingangsdatei `index.js` konfiguriert werden.

### preSave(comment)

Waline bietet einige benutzerdefinierte Hooks, mit denen Benutzer das Verhalten des Waline-Servers nach ihren eigenen Bedürfnissen anpassen können.

::: details Beispiel

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

Die Aktion, die nach dem Posten des Kommentars ausgeführt wird.

Wenn die Methode ausgeführt wird, werden die Kommentardaten als erster Parameter übergeben, und wenn es sich um eine Antwort auf den Kommentar handelt, wird der übergeordnete Kommentar als zweiter Parameter übergeben.

::: details Beispiel

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

Aktion bevor ein Kommentarinhalt im Dashboard aktualisiert wird. Wenn die Methode Inhalt zurückgibt, wird die Schnittstelle direkt zurückkehren, ohne die Kommentardaten zu aktualisieren.

::: details Beispiel

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

### afterUpdate(comment)

Aktion nachdem ein Kommentarinhalt im Dashboard aktualisiert wurde. Kommentardaten werden beim Ausführen der Methode übergeben.

::: details Beispiel

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

Aktion bevor ein Kommentar gelöscht wird. Wenn die Methode ausgeführt wird, wird die zu bearbeitende Kommentar-ID übergeben. Wenn die Methode Inhalt zurückgibt, wird die Schnittstelle direkt zurückkehren, ohne die Kommentardaten zu aktualisieren.

::: details Beispiel

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

### afterDelete(commentId)

Aktion nachdem ein Kommentar gelöscht wurde, die Kommentar-ID wird als einziger Parameter übergeben.

::: details Beispiel

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
