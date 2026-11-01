---
title: File del client
icon: file
---

`@waline/client` fornisce file in più versioni

<!-- more -->

## Elenco dei file CDN

- `dist/waline.js`: versione completa, formato ESM

  Questo è il file consigliato per importare `@waline/client`, 100 KB di dimensione Gzip

- `dist/waline.umd.js`: versione completa, formato UMD

- `dist/slim.js`: versione completa senza bundle delle dipendenze, formato ES Module

  Questo è il file predefinito per importare `@waline/client` con Node.js, 27 KB di dimensione Gzip

- `dist/waline.css`: stili CSS di Waline

- `dist/waline-meta.css`: CSS delle icone meta di Waline

- `dist/component.js`: componente Vue di Waline, formato ES Module, senza bundle delle dipendenze

  Questo file serve per usare i commenti Waline in modalità componente in un progetto Vue, 25 KB di dimensione Gzip

- `dist/comment.js`: modulo del conteggio dei commenti di Waline, formato ESM, < 1KB di dimensione Gzip

  Questo file si usa per l'importazione da CDN quando serve solo il numero di commenti della pagina

- `dist/pageview.js`: modulo delle visualizzazioni di Waline, formato ESM, < 1KB di dimensione Gzip

  Questo file si usa per l'importazione da CDN quando servono solo le visualizzazioni della pagina

## Esportazioni dei moduli

`@waline/client` è un modulo ESM standard e richiede Node.js versione >= 22:

- `@waline/client`: voce principale di Waline senza bundle delle dipendenze

- `@waline/client/waline.css`: file di stile di Waline

- `@waline/client/waline-meta.css`: file di stile delle icone meta di Waline

- `@waline/client/comment`: modulo del conteggio dei commenti di Waline

- `@waline/client/pageview`: modulo del conteggio delle visualizzazioni di Waline

- `@waline/client/full`: voce principale di Waline con tutte le dipendenze incluse
