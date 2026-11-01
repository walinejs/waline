---
title: Formato dei commenti supportato
icon: format
order: 1
---

Puoi aggiungere contenuti diversi ai commenti, tra cui la sintassi Markdown estesa e i tag HTML.

<!-- more -->

## Formati supportati

Supportiamo l'intero CommonMark (la sintassi Markdown standard) insieme alle seguenti estensioni:

- Tabelle in stile GFM
- Barrato in stile GFM
- Pedice e apice
- Emoji
- Evidenziazione dei blocchi di codice
- Formule $\TeX$

::: info GFM

Github Flavored Markdown

:::

Inoltre puoi incorporare liberamente qualsiasi contenuto HTML senza attivare il [meccanismo di protezione](./safety.md#sicurezza-dei-commenti).

## Supporto limitato nell'anteprima

Per contenere le dimensioni del client, nel client ufficiale `@waline/client` inseriamo solo un piccolo parser Markdown: per questo molte sintassi non vengono mostrate correttamente nel pannello di anteprima (ma vengono **resi correttamente nell'area dei commenti**).

Tra le limitazioni troviamo:

- La sintassi emoji standard (ad es. :tada:`:tada:`) non viene renderizzata correttamente

- I pedici e gli apici (ad es. `H~2~O`, `x^2^`) non possono essere renderizzati correttamente

- La sintassi $\TeX$, cioè le formule matematiche (ad es. `$a = 1$`), non viene renderizzata per impostazione predefinita.

  Con il client ufficiale puoi personalizzare il rendering $\TeX$ nell'anteprima impostando l'opzione `texRenderer`; vedi [Cookbook → Usare un renderer $\TeX$ personalizzato](../../cookbook/customize/tex-renderer.md).

- Con l'evidenziatore predefinito i blocchi di codice vengono evidenziati con colori casuali e delimitatori specifici.

  Con il client ufficiale puoi personalizzare l'evidenziazione del codice in anteprima impostando l'opzione `highlighter`; vedi [Cookbook → Evidenziazione del codice personalizzata](../../cookbook/customize/highlighter.md).

## Approfondimenti

::: tip Come funziona

1. Per contenere le dimensioni del pacchetto, il client usa `marked` per il rendering e, per impostazione predefinita, un evidenziatore di dimensioni inferiori a 1 KB, e non include un renderer $\TeX$: da qui derivano le limitazioni descritte sopra.

1. Quando un utente invia un commento, il client incorpora l'immagine emoji personalizzata e invia al server il commento originale.

1. Il server riceve il testo originale, usa `markdown-it` con i plugin correlati per renderizzare correttamente il Markdown, usa `prismjs` per evidenziare i blocchi di codice in base al linguaggio ed esegue il rendering $\TeX$ in base alle impostazioni dell'utente; infine applica la protezione XSS.

1. Al termine dell'elaborazione il server memorizza il contenuto renderizzato correttamente e lo restituisce al client quando serve, per garantire la corretta visualizzazione dell'area dei commenti.

:::
