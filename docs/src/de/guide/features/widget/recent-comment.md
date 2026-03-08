---
title: Neueste Kommentare Widget
icon: recent
---

Waline unterstützt die Anzeige neuester Kommentare durch ein Widget, was es praktisch macht, die neuesten Kommentare in der Seitenleiste des Blogs anzuzeigen.

<!-- more -->

## Komponentenoptionen

Das neueste Kommentar-Widget heißt `RecentComments` und enthält drei Optionen:

- `el` (optional): das Element, das eingebunden werden soll
- `serverURL`: Serverlink
- `count` Die Anzahl der neuesten Kommentare, die abgerufen werden sollen

Das von der Komponente zurückgegebene Datenformat sollte `Promise<{ comment: WalineComment[], destroy: () => void }>` sein.

- `comment`-Eigenschaft: ein Array der neuesten Kommentare mit der genauen Anzahl von `count`
- `destroy`-Methode: eine Funktion, die das Widget zerstört

## Grundlegende Verwendung

```html
<div id="waline-recent"></div>
<script type="module">
  import { RecentComments } from 'https://cdn.jsdelivr.net/npm/@waline/client/dist/waline.mjs';

  RecentComments({
    el: '#waline-recent',
    serverURL: 'http://waline.vercel.app',
    count: 10,
  });
</script>
```

::: tip

Dies wird auf `#waline-recent` mit dem Standardstil gerendert.

:::

## Erweiterte Verwendung

Wenn Sie mit dem Standardausgabeformat nicht zufrieden sind, können Sie die Komponente aufrufen, indem Sie die `el`-Option weglassen, um die Daten zu erhalten und sie selbst zu rendern.

Beispiel:

```html
<div id="waline-recent"></div>
<script type="module">
  import { RecentComments } from 'https://cdn.jsdelivr.net/npm/@waline/client/dist/waline.mjs';

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
