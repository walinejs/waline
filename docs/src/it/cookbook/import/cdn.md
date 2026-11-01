---
title: Importare Waline via CDN
icon: import
order: 1
---

Questo ricettario spiega come importare Waline via CDN.

<!-- more -->

Per gli utenti della Cina continentale consigliamo di usare [unpkg](https://unpkg.com/@waline/client). Per gli utenti esteri consigliamo jsDelivr.

Per rendere Waline compatibile con l'SSR, nella versione V2 abbiamo separato gli stili di Waline. Questo significa che devi importare il file CSS di Waline, poi importare il file di script di Waline e chiamare Waline.

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

Potresti aver notato che nei casi precedenti abbiamo dichiarato esplicitamente la versione `@v2` dopo `@aline/client`. Il tuo sito web non funzionerà correttamente.

:::
