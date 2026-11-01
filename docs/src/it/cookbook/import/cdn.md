---
title: Importare Waline via CDN
icon: import
order: 1
---

Questo ricettario spiega come importare Waline via CDN.

<!-- more -->

Per gli utenti della Cina continentale consigliamo di usare [unpkg](https://unpkg.com/@waline/client). Per gli utenti esteri consigliamo jsDelivr.

A partire dalla V3, gli stili di Waline sono forniti in un file CSS separato per mantenere il client compatibile con l'SSR. Questo significa che devi importare il file CSS di Waline, poi importare e chiamare il file di script di Waline.

## Commenti

Normalmente potresti voler che Waline mostri un elenco di commenti: in quel caso puoi importare Waline come segue:

```html
<!-- style file -->
<link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css" />
<!-- script file -->
<script type="module">
  import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

  init({
    // options
  });
</script>
```

## Visualizzazioni e commenti

A volte potresti voler mostrare nella home page o nell'elenco degli articoli il numero di visualizzazioni e di commenti dell'articolo, senza però caricare il componente dei commenti: in questo caso puoi importare un file di script Gzip < 1KB nei modi seguenti:

Visualizzazioni:

```html
<script type="module">
  import { pageviewCount } from 'https://unpkg.com/@waline/client@v3/dist/pageview.js';

  pageviewCount({
    // options
  });
</script>
```

Conteggio dei commenti:

```html
<script type="module">
  import { commentCount } from 'https://unpkg.com/@waline/client@v3/dist/comment.js';

  commentCount({
    // options
  });
</script>
```

## Ulteriori informazioni

::: info Specificare la versione

Potresti aver notato che negli esempi precedenti abbiamo dichiarato esplicitamente la versione `@v3` dopo `@waline/client`. Questo è consigliato perché evita che il tuo sito si rompa quando viene pubblicata una nuova versione major del client Waline.

:::
