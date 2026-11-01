---
title: Waline über CDN importieren
icon: import
order: 1
---

Dieses Kochbuch behandelt den Import von Waline über CDN.

<!-- more -->

Für Benutzer in Festlandchina empfehlen wir die Verwendung von [unpkg](https://unpkg.com/@waline/client). Für ausländische Benutzer empfehlen wir die Verwendung von jsDelivr.

Seit V3 werden die Stile von Waline als separate CSS-Datei bereitgestellt, um den Client SSR-freundlich zu halten. Das bedeutet, Sie müssen die CSS-Stildatei von Waline importieren und anschließend die Waline-Skriptdatei importieren und Waline aufrufen.

## Kommentar

Normalerweise möchten Sie möglicherweise, dass Waline eine Liste von Kommentaren rendert. Sie können Waline wie folgt importieren:

```html
<!-- Stildatei -->
<link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css" />
<!-- Skriptdatei -->
<script type="module">
  import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

  init({
    // Optionen
  });
</script>
```

## Seitenaufrufe und Kommentare

Manchmal möchten Sie möglicherweise die Anzahl der Seitenaufrufe und Kommentare des Artikels auf der Startseite oder der Artikelliste anzeigen, müssen aber die Kommentarkomponente nicht laden. Dann können Sie eine Gzip < 1KB-Skriptdatei auf folgende Weise importieren:

Seitenaufrufe:

```html
<script type="module">
  import { pageviewCount } from 'https://unpkg.com/@waline/client@v3/dist/pageview.js';

  pageviewCount({
    // Optionen
  });
</script>
```

Kommentarzählung:

```html
<script type="module">
  import { commentCount } from 'https://unpkg.com/@waline/client@v3/dist/comment.js';

  commentCount({
    // Optionen
  });
</script>
```

## Mehr

::: info Version angeben

Sie haben vielleicht bemerkt, dass wir in den obigen Beispielen die Version `@v3` nach `@waline/client` explizit deklariert haben. Das Festlegen der Hauptversion wird empfohlen, da es verhindert, dass Ihre Website bricht, wenn eine neue Hauptversion des Waline-Clients veröffentlicht wird.

:::
