---
title: Waline über CDN importieren
icon: import
order: 1
---

Dieses Cookbook behandelt den Import von Waline über CDN.

<!-- more -->

Für Benutzer in Festlandchina empfehlen wir die Verwendung von [unpkg](https://unpkg.com/@waline/client). Für ausländische Benutzer empfehlen wir die Verwendung von jsDelivr.

Um Waline SSR-freundlich zu machen, haben wir die Stile von Waline in Version V2 aufgeteilt. Das bedeutet, Sie müssen die CSS-Stildatei von Waline importieren und die Waline-Skriptdatei importieren und Waline aufrufen.

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

Sie haben vielleicht bemerkt, dass wir in den obigen Fällen die Version `@v3` nach `@waline/client` explizit deklariert haben. Ihre Website funktioniert möglicherweise nicht ordnungsgemäß.

:::
