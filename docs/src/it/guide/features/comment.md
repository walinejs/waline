---
title: Contatore dei commenti
icon: counter
order: 8
---

Waline supporta la visualizzazione del numero di commenti separatamente, fuori dall'area dei commenti.

<!-- more -->

## Aggiornamento automatico

Puoi abilitare il conteggio dei commenti nella funzione `init` impostando l'opzione `comment` su `true`.

```html
<script type="module">
  import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

  init({
    el: '#waline',
    // ...
    comment: true, // enable comment counting
  });
</script>
```

Waline cercherà di inserire o aggiornare il numero di commenti ogni volta che chiami la funzione `init` o aggiorni il percorso.

Waline individua nella pagina gli elementi con la classe `waline-comment-count` e usa il loro attributo `data-path` come condizione di ricerca, poi vi inserisce il valore ottenuto:

```html
<!-- data-path will be the query condition -->
<span data-path="<Your/Path/Name>" class="waline-comment-count" /> comments
```

Se ti serve un selettore diverso, puoi impostare l'opzione `comment` su quel selettore.

Ogni volta che chiami `WalineInstance.update()`, Waline cerca nel contenuto della pagina e aggiorna automaticamente il numero di commenti.

::: tip Esempi

```html
The current page has <span class="waline-comment-count" /> comments, the home page has
<span data-path="/en/" class="waline-comment-count" /> comments.
```

La pagina corrente ha <span class="waline-comment-count" /> commenti, la pagina iniziale ne ha
<span data-path="/en/" class="waline-comment-count" />.

:::

## Aggiornamento manuale

Oltre all'aggiornamento automatico tramite la funzione `init`, puoi aggiornare manualmente il numero di commenti della pagina corrente con l'API `commentCount`:

```html
<script type="module">
  import { commentCount } from 'https://unpkg.com/@waline/client@v3/dist/comment.js';

  commentCount({
    serverURL,
    path,

    // optional, for custom selectors, defaults to `'.waline-pageview-count'`
    // selector: '.waline-pageview-count',
  });
</script>
```

::: info Annullare l'operazione

Poiché il recupero del numero di commenti è un'operazione di rete asincrona, in alcune situazioni potresti dover annullare un aggiornamento del numero di commenti in corso.

`commentCount` restituisce una funzione che puoi chiamare per annullare l'aggiornamento:

```js
const abort = Waline.commentCount({
  serverURL: '<YOUR_SERVER_URL>',
  path: window.location.pathname,
});

// After 500ms, if the network request has not been completed, cancel this operation
setTimeout(() => abort(), 500);
```

:::

## Importare solo il contatore

A volte potresti voler mostrare il numero di commenti di alcune pagine nell'elenco degli articoli o nella pagina iniziale, senza però caricare l'intero Waline. In questo caso puoi usare il modulo `comment`, che pesa meno di 1 KB gzip:

```html
<script type="module">
  import { commentCount } from 'https://unpkg.com/@waline/client@v3/dist/comment.js';

  commentCount({
    serverURL,
    path,

    // optional, for custom selectors, defaults to `'.waline-pageview-count'`
    // selector: '.waline-pageview-count',
  });
</script>
```

<script setup>
import { walineOptions } from '@source/.vuepress/client.ts'
import { commentCount } from '@waline/client/comment'
import { onMounted } from 'vue'
import { useRoute } from 'vuepress/client'

const { serverURL } = walineOptions
const route = useRoute()

onMounted(()=>{
  commentCount({
    serverURL: serverURL,
    path: route.path,
  })
})
</script>
