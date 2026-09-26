---
title: Emoticon-Suche
icon: search
order: 3
---

`@waline/client` ermöglicht Benutzern, Emoji-Suchdienste hinzuzufügen und diese Funktionalität anzupassen.

Standardmäßig bietet `@waline/client` einen Meme-Suchdienst über [Giphy](https://giphy.com/). Dadurch können Sie Bilder suchen und zu Kommentaren hinzufügen.

<!-- more -->

## Deaktivieren

Wenn Sie den Standard-Bildsuchdienst nicht benötigen, können Sie ihn deaktivieren, indem Sie die Option `search` auf `false` setzen.

```js
Waline.init({
  el: '#waline',
  // ...
  search: false,
});
```

## Anpassen

Sie können den Bildsuchdienst über die Suchoption anpassen.

Für jede Operation sollten Sie ein Array mit den Bildinformationen als Suchergebnis zurückgeben, und jedes Element sollte ein Objekt mit den folgenden Eigenschaften sein:

- `src`: die Link-Adresse des Bildes
- `title`: Bildtitel und Alt-Text (optional)
- `preview`: Miniaturansicht des Bildes zur Verwendung in der Ergebnisliste (optional)

Die Option akzeptiert drei Funktionen, von denen jede ein Promise zurückgeben sollte, und das Ergebnis ist das Array der oben genannten Suchergebnisse.

- `search`: Suchoperation, der Suchbegriff wird als erster Parameter der Funktion übergeben
- `default`: Liste der standardmäßig anzuzeigenden Bilder (optional)
- `more`: Die Funktion, die startet, wenn das Bild nach unten gescrollt wird, wobei der Suchbegriff und die aktuelle Nummer als die ersten beiden Parameter übergeben werden (optional)

Für Tutorials zur benutzerdefinierten Suche siehe [Kochbuch → Benutzerdefinierte Emoji-Suche](../../cookbook/customize/search.md).
