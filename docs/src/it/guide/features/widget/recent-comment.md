---
title: Widget dei commenti recenti
icon: recent
---

Waline permette di mostrare i commenti recenti tramite un widget, comodo per esporre gli ultimi commenti nella barra laterale del blog.

<!-- more -->

## Opzioni del componente

Il widget dei commenti recenti si chiama `RecentComments` e prevede tre opzioni:

- `el` (facoltativo): l'elemento in cui montare il widget
- `serverURL`: il link del server
- `count` il numero di commenti recenti da recuperare

Il formato dei dati restituiti dal componente dovrebbe essere `Promise<{ comment: WalineComment[], destroy: () => void }>`.

- proprietà `comment`: un array con gli ultimi commenti, in numero esattamente pari a `count`
- metodo `destroy`: una funzione che distrugge il widget

## Uso di base

```html
<div id="waline-recent"></div>
<script type="module">
  import { RecentComments } from 'https://cdn.jsdelivr.net/npm/@waline/client@v3/dist/waline.js';

  RecentComments({
    el: '#waline-recent',
    serverURL: 'http://waline.vercel.app',
    count: 10,
  });
</script>
```

::: tip

Il contenuto verrà renderizzato su `#waline-recent` usando lo stile predefinito.

:::

## Uso avanzato

Se il formato di output predefinito non ti soddisfa, puoi chiamare il componente omettendo l'opzione `el` per ottenere i dati e renderizzarli come preferisci.

Esempio:

```html
<div id="waline-recent"></div>
<script type="module">
  import { RecentComments } from 'https://cdn.jsdelivr.net/npm/@waline/client@v3/dist/waline.js';

  RecentComments({
    serverURL: 'http://waline.vercel.app',
    count: 10,
  }).then(({ comments }) => {
    document.getElementById('waline-recent').innerHTML = comments.map(
      (comment) => `${comment.nick}: ${comment.comment}`,
    );
  });
</script>
```
