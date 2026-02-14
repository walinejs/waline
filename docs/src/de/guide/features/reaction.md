---
title: Artikel-Reaktionen
icon: reaction
order: 4
---

Waline ermöglicht es Benutzern, Reaktionen auf Artikelinhalte auszudrücken.

<!-- more -->

## Erste Schritte

Um Reaktionen schnell zu aktivieren, können Sie die Option `reaction` auf `true` setzen, um eine Standardliste von Reaktionen anzuzeigen:

```js
Waline.init({
  el: '#waline',
  // ...
  reaction: true, // Reaktion starten
});
```

Waline zeigt die Standardliste der Reaktionen über dem Kommentarfeld an.

## Reaktionen anpassen

Wenn Sie diese Reaktions-Emoticons anpassen müssen, können Sie ein Array übergeben, das den Link des Reaktions-Emoticon-Bildes enthält, das die Reaktionen darstellt, die der Benutzer auswählen soll:

```js
Waline.init({
  el: '#waline',
  // ...
  reaction: [
    'https://unpkg.com/@waline/emojis@1.1.0/weibo/weibo_heart_eyes.png',
    'https://unpkg.com/@waline/emojis@1.1.0/weibo/weibo_dog_joy.png',
    'https://unpkg.com/@waline/emojis@1.1.0/weibo/weibo_dog_consider.png',
    'https://unpkg.com/@waline/emojis@1.1.0/weibo/weibo_sob.png',
  ],
});
```

In der Zwischenzeit können Sie den Titel der Reaktion über `reactionTitle` in `locale` anpassen, und Sie können auch den Namen des Reaktionsausdrucks über `reaction0` bis `reaction8` anpassen. Siehe [Mehrsprachige Einstellungen](./i18n.md).

## Vorsichtsmaßnahmen

::: tip Zahlenbegrenzung

Waline unterstützt bis zu 9 Reaktionen, und Sie können problemlos weniger als 9 Reaktionen hinzufügen.

:::

::: warning Zählregeln

Die Zählung der Reaktionen basiert auf dem Standort.

Wenn Sie die Reaktionen neu anordnen und anpassen müssen, überprüfen Sie [#1451](https://github.com/walinejs/waline/issues/1451#issuecomment-1264555264) für weitere Details.

:::
