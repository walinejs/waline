---
title: Contatore delle visualizzazioni
icon: counter
order: 7
---

Waline supporta il conteggio delle visualizzazioni delle pagine.

<!-- more -->

## Usarlo insieme ai commenti

Se stai usando il servizio di commenti di Waline, puoi abilitare le statistiche delle visualizzazioni impostando l'opzione `pageview` su `true` durante l'inizializzazione:

```js
Waline.init({
  el: '#waline',
  // ...
  pageview: true, // pageview statistics
});
```

Waline individua automaticamente nella pagina gli elementi con il valore di `class` `waline-pageview-count` e usa il loro `data-path` come condizione di ricerca, poi vi inserisce il valore ottenuto:

Se ti serve un selettore diverso, puoi impostare l'opzione `pageview` su quel selettore.

```html
<!-- data-path will be the query condition -->
Pageviews: <span class="waline-pageview-count" data-path="<Your/Path/Name>"></span>
```

Ogni volta che chiami `WalineInstance.update()`, Waline cerca di nuovo nel contenuto della pagina e aggiorna automaticamente le visualizzazioni.

::: tip Esempi

```html
The current page has been viewed
<span class="waline-pageview-count" data-path="/en/guide/client/count.html" />
times.
```

La pagina corrente è stata visualizzata
<span class="waline-pageview-count" data-path="/en/guide/client/count.html" /> volte.

:::

## Usarlo da solo

Se ti serve solo la funzione di statistica delle visualizzazioni, puoi importare il modulo dedicato di Waline: la sua dimensione gzip è inferiore a 1 KB.

```html
<ul>
  <li>
    Current page views:
    <span class="waline-pageview-count" />
  </li>
  <li>
    Page Views:
    <span class="waline-pageview-count" data-path="/" />
  </li>
</ul>
<script type="module">
  import { pageviewCount } from 'https://unpkg.com/@waline/client@v3/dist/pageview.js';

  pageviewCount({
    serverURL: '<YOUR_SERVER_URL>',
    path: window.location.pathname,

    // optional, for custom selectors, defaults to `'.waline-pageview-count'`
    // selector: 'waline-pageview-count',

    // optional, whether to increase the number of visits when fetching, the default is `true`
    // update: true,
  });
</script>
```

- Visualizzazioni della pagina corrente: <span class="waline-pageview-count" />

- Visualizzazioni della pagina iniziale: <span class="waline-pageview-count" data-path="/" />

::: info Annullare l'operazione

Poiché il recupero delle visualizzazioni è un'operazione di rete asincrona, in alcune circostanze potresti dover annullare un aggiornamento delle visualizzazioni in corso.

`pageviewCount` restituisce una funzione che puoi chiamare per annullare l'aggiornamento:

```html
<script type="module">
  import { pageviewCount } from 'https://unpkg.com/@waline/client@v3/dist/pageview.js';

  const abort = Waline.pageviewCount({
    serverURL: '<YOUR_SERVER_URL>',
    path: window.location.pathname,
  });

  // After 500ms, if the network request has not been completed, cancel this operation
  setTimeout(() => abort(), 500);
</script>
```

:::
