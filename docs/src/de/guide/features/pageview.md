---
title: Seitenaufruf-Zähler
icon: counter
order: 7
---

Waline unterstützt Seitenaufruf-Zählung.

<!-- more -->

## Verwendung mit Kommentar

Wenn Sie den Kommentardienst von Waline verwenden, können Sie Seitenaufruf-Statistiken aktivieren, indem Sie die Option `pageview` während der Initialisierung auf `true` setzen:

```js
Waline.init({
  el: '#waline',
  // ...
  pageview: true, // Seitenaufruf-Statistik
});
```

Waline findet automatisch die Elemente mit dem `class`-Wert `waline-pageview-count` auf der Seite und ruft ihr `data-path` als Abfragebedingung ab. Und füllt es mit dem erhaltenen Wert:

Wenn Sie einen anderen Selektor benötigen, können Sie die Option `pageview` auf diesen Selektor setzen.

```html
<!-- data-path wird die Abfragebedingung sein -->
Seitenaufrufe: <span class="waline-pageview-count" data-path="<Your/Path/Name>"></i>
```

Jedes Mal, wenn Sie `WalineInstance.update()` aufrufen, durchsucht Waline den Seiteninhalt erneut und aktualisiert automatisch die Seitenaufrufe.

::: tip Beispiele

```html
Die aktuelle Seite wurde
<span class="waline-pageview-count" data-path="/de/guide/client/count.html" />
Mal angesehen.
```

Die aktuelle Seite wurde
<span class="waline-pageview-count" data-path="/de/guide/client/count.html" /> Mal angesehen.

:::

## Allein verwenden

Wenn Sie nur die Seitenaufruf-Statistikfunktion verwenden müssen, können Sie das von Waline bereitgestellte Seitenaufruf-Modul importieren, dessen Gzip-Größe < 1KB beträgt.

```html
<ul>
  <li>
    Aktuelle Seitenaufrufe:
    <span class="waline-pageview-count" />
  </li>
  <li>
    Seitenaufrufe:
    <span class="waline-pageview-count" data-path="/" />
  </li>
</ul>
<script type="module">
  import { pageviewCount } from 'https://unpkg.com/@waline/client@v3/dist/pageview.js';

  pageviewCount({
    serverURL: '<YOUR_SERVER_URL>',
    path: window.location.pathname,

    // optional, für benutzerdefinierte Selektoren, Standard ist `'.waline-pageview-count'`
    // selector: 'waline-pageview-count',

    // optional, ob die Anzahl der Besuche beim Abrufen erhöht werden soll, Standard ist `true`
    // update: true,
  });
</script>
```

- Aktuelle Seitenaufrufe: <span class="waline-pageview-count" />

- Startseiten-Seitenaufrufe: <span class="waline-pageview-count" data-path="/" />

::: info Abbrechen

Da das Abrufen von Seitenaufrufen eine asynchrone Netzwerkoperation ist, müssen Sie möglicherweise unter bestimmten Umständen eine laufende Aktualisierungsoperation für Seitenaufrufe abbrechen.

`pageviewCount` gibt eine Funktion zurück, die aufgerufen werden kann, um die Aktualisierung abzubrechen:

```html
<script type="module">
  import { pageviewCount } from 'https://unpkg.com/@waline/client@v3/dist/pageview.js';

  const abort = Waline.pageviewCount({
    serverURL: '<YOUR_SERVER_URL>',
    path: window.location.pathname,
  });

  // Nach 500ms, wenn die Netzwerkanfrage nicht abgeschlossen wurde, brechen Sie diesen Vorgang ab
  setTimeout(() => abort(), 500);
</script>
```

:::
