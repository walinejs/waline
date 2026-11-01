---
title: Reazioni agli articoli
icon: reaction
order: 4
---

Waline permette agli utenti di esprimere le proprie reazioni al contenuto degli articoli.

<!-- more -->

## Per iniziare

Per abilitare rapidamente le reazioni, puoi impostare l'opzione `reaction` su `true` e mostrare un elenco predefinito di reazioni:

```js
Waline.init({
  el: '#waline',
  // ...
  reaction: true, // start the reaction
});
```

Waline mostrerà l'elenco predefinito di reazioni sopra il riquadro dei commenti.

## Personalizzare le reazioni

Se devi personalizzare queste emoticon di reazione, puoi passare un array contenente il link dell'immagine dell'emoticon di reazione, che rappresenta le reazioni tra cui vuoi far scegliere all'utente:

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

Allo stesso tempo, puoi personalizzare il titolo delle reazioni tramite `reactionTitle` in `locale`, e puoi anche personalizzare il nome delle espressioni di reazione tramite `reaction0` … `reaction8`; vedi [Impostazioni multilingua](./i18n.md).

## Avvertenze

::: tip Numero massimo

Waline supporta fino a 9 reazioni e puoi aggiungerne meno di 9 senza alcun problema.

:::

::: warning Regole di conteggio

Il conteggio delle reazioni si basa sulla posizione.

Se devi riordinarle o modificarle, consulta [#1451](https://github.com/walinejs/waline/issues/1451#issuecomment-1264555264) per maggiori dettagli.

:::
