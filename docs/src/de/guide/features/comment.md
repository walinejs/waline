---
title: Kommentarzähler
icon: counter
order: 8
---

Waline unterstützt die separate Anzeige der Anzahl der Kommentare im Nicht-Kommentarbereich.

<!-- more -->

## Automatische Aktualisierung

Sie können die Kommentarzählung in der Funktion `init` aktivieren, indem Sie die Option `comment` auf `true` setzen.

```html
<script type="module">
  import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

  init({
    el: '#waline',
    // ...
    comment: true, // Kommentarzählung aktivieren
  });
</script>
```

Waline versucht, die Kommentarzahl zu füllen oder zu aktualisieren, wann immer Sie die Funktion `init` aufrufen oder den Pfad aktualisieren.

Waline findet die Elemente mit der Klasse `waline-comment-count` auf der Seite und ruft ihr Attribut `data-path` als Abfragebedingung ab. Und füllt es mit dem erhaltenen Wert:

```html
<!-- data-path wird die Abfragebedingung sein -->
<span data-path="<Your/Path/Name>" class="waline-comment-count" /> Kommentare
```

Wenn Sie einen anderen Selektor benötigen, können Sie die Option `comment` auf diesen Selektor setzen.

Jedes Mal, wenn Sie `WalineInstance.update()` aufrufen, durchsucht Waline den Seiteninhalt und aktualisiert automatisch die Kommentarzahl.

::: tip Beispiele

```html
Die aktuelle Seite hat <span class="waline-comment-count" /> Kommentare, die Startseite hat
<span data-path="/de/" class="waline-comment-count" /> Kommentare.
```

Die aktuelle Seite hat <span class="waline-comment-count" /> Kommentare, die Startseite hat <span data-path="/de/" class="waline-comment-count" /> Kommentare.

:::

## Manuelle Aktualisierung

Neben der automatischen Aktualisierung über die Funktion `init` können Sie die Kommentarzahl der aktuellen Seite auch manuell über die API `commentCount` aktualisieren:

```html
<script type="module">
  import { commentCount } from 'https://unpkg.com/@waline/client@v3/dist/comment.js';

  commentCount({
    serverURL,
    path,

    // optional, für benutzerdefinierte Selektoren, Standard ist `'.waline-pageview-count'`
    // selector: '.waline-pageview-count',
  });
</script>
```

::: info Abbrechen

Da das Abrufen der Kommentarzahl eine asynchrone Netzwerkoperation ist, müssen Sie möglicherweise unter bestimmten Umständen eine laufende Aktualisierungsoperation für die Kommentarzahl abbrechen.

`commentCount` gibt eine Funktion zurück, die aufgerufen werden kann, um die Aktualisierung abzubrechen:

```js
const abort = Waline.commentCount({
  serverURL: '<YOUR_SERVER_URL>',
  path: window.location.pathname,
});

// Nach 500ms, wenn die Netzwerkanfrage nicht abgeschlossen wurde, brechen Sie diesen Vorgang ab
setTimeout(() => abort(), 500);
```

:::

## Nur Zähler importieren

Manchmal möchten Sie möglicherweise die Kommentarzahl einiger Seiten in der Artikelliste oder auf der Startseite anzeigen, möchten aber nicht das gesamte Waline laden. An diesem Punkt können Sie ein Gzip < 1KB `comment`-Modul verwenden:

```html
<script type="module">
  import { commentCount } from 'https://unpkg.com/@waline/client@v3/dist/comment.js';

  commentCount({
    serverURL,
    path,

    // optional, für benutzerdefinierte Selektoren, Standard ist `'.waline-pageview-count'`
    // selector: '.waline-pageview-count',
  });
</script>
```
