---
title: Reaktive Waline-Instanz
icon: spa
order: -1
---

Der offizielle Client `@waline/client` basiert auf Vue3, bietet responsive Komponenten und Instanzen und bringt SPA (**S**ingle **P**age **A**pplication)-Unterstützung.

<!-- more -->

## Vue-Komponente

Wenn Sie ein Vue-Projekt erstellen, können Sie die Waline-Komponente erhalten und verwenden, indem Sie benannte Exporte `Waline` aus `@waline/client/components` importieren.

Alle Komponenteneigenschaften sind reaktiv, was bedeutet, dass das Kommentarfeld automatisch aktualisiert wird, wenn Sie die Eigenschaften ändern.

## Andere Projekte

In anderen SPAs müssen Sie die `WalineInstance` speichern, die von der Waline-Funktion zurückgegeben wird, wenn Waline initialisiert wird.

Sie finden eine Instanzeigenschaft `el` und zwei Methoden: `update()` und `destroy()` auf `WalineInstance`.

### update

Sie können jederzeit `update()` aufrufen, um Waline zu aktualisieren (z.B.: wenn der Benutzer eine neue Route besucht). Die Methode `update` erhält einen optionalen Parameter `options`, außer `el` können andere anfängliche Waline-Optionen durch Übergabe neuer Werte aktualisiert werden.

Beispiel:

```js
// in `/`-Route
const waline = Waline.init({
  serverURL: 'https://example.com',
});

/* Benutzer: Nach einiger Zeit hat sich die Route zu `/a.html` geändert */

waline.update(); // Jetzt wird Waline den Kommentar löschen und einen Ladezustand anzeigen.
// Nach einiger Zeit werden der Zähler und die Kommentare alle aktualisiert

waline.update({
  lang: 'de',
  login: 'disable',
}); // Waline wird jetzt auf Deutsch angezeigt und die Benutzeranmeldung deaktiviert
```

#### Funktionsprinzip

Beim Aufruf von `update` werden die aktuelle Option und die historische Option durch **flache Kopie** zusammengeführt, und die Waline-Instanz wird mit der neuen Option aktualisiert (und speichert die neue Option).

Das Standardverhalten dieser Methode ist, immer **Standardwerte zu regenerieren** für Optionen, die noch nicht festgelegt wurden, und **historische Werte zu verwenden** für Optionen, die festgelegt wurden.

Es gibt zwei Optionen, auf die Sie besonders achten müssen: `path` und `locale`.

::: warning Path-Vorsichtsmaßnahmen

In V2 wird der Parameter `path` bei `update()` **immer zurückgesetzt**.

Das bedeutet, dass bei jedem Update, solange Sie `path` nicht angeben, `path` auf `window.location.pathname` zurückgesetzt wird.

:::

::: warning locale-Vorsichtsmaßnahmen

Aufgrund der flachen Kopie werden die alten `locale`-Optionen vollständig von den neuen `locale`-Optionen überschrieben, die von `update` übergeben werden.

Unser Punkt ist: Benutzer möchten normalerweise die Anzeigesprache wechseln, wenn sie das Locale aktualisieren, also setzen wir es als erwartetes Verhalten des Plugins. Das bedeutet auch, dass Sie `update({ locale: {} })` verwenden können, um die benutzerdefinierte Locale-Konfiguration in der Historie zu löschen.

Wenn Sie wirklich ein oder mehrere bestimmte Felder in `locale` aktualisieren müssen, müssen Sie das gesamte aktualisierte `locale` übergeben.

:::

Gleichzeitig wurde die Option `update()` für asynchrone Netzwerkanfragen optimiert, einschließlich:

- Aktualisieren Sie den Kommentarbereich und fordern Sie nur dann erneut an, wenn sich der Pfad tatsächlich ändert
- Der neue `update()`-Aufruf beendet automatisch die nicht mehr benötigte Anfrage vom vorherigen `update()`.

### el

Die Eigenschaft `el` ist das HTMLElement, das von der aktuellen Instanz von Waline gemountet wird.

Wenn Sie Waline mit `el: null` initialisieren (nur Kommentare und Seitenaufruf-Statistiken verwenden), ist diese Eigenschaft `null`.

### destroy

Wenn Sie vergessen, `serverURL` zu übergeben, oder Waline die Mount-Position über die Option `el` auf der Seite nicht finden kann, wirft Waline einen Fehler, der den Grund für den Fehler angibt.

### Initialisierungsfehler

Wenn Sie vergessen, `serverURL` festzulegen, oder Waline die Mount-Position über die Option `el` auf der Seite nicht finden kann, gibt Waline eine `WalineErrorInstance` zurück.

Es gibt nur ein Attribut `errMsg` auf `WalineErrorInstance`, um den Grund für den Initialisierungsfehler anzugeben.

### Vorsichtsmaßnahmen

::: warning Denken Sie daran, die Instanz zu zerstören

Damit Waline Ressourcen ordnungsgemäß freigeben kann, rufen Sie bitte manuell `WalineInstance.destroy()` auf, bevor Sie das Element entfernen, auf dem Waline gemountet ist.

Andernfalls werden einige Listener möglicherweise nicht ordnungsgemäß entfernt.

:::
