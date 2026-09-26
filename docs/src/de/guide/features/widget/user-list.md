---
title: Benutzer-Rangliste/Benutzerwand Widget
icon: rank
---

Waline unterstützt die Anzeige einer Benutzer-Rangliste oder Benutzerwand durch ein Widget, was es praktisch macht, die Informationen der Kommentatoren in der Seitenleiste des Blogs anzuzeigen.

<!-- more -->

## Komponentenoptionen

Das Benutzer-Rangliste/Benutzerwand Widget heißt `UserList` und enthält sechs Optionen:

- `el` (optional): das Element, das eingebunden werden soll
- `serverURL`: Serverlink
- `count` Die Anzahl der Benutzer, die abgerufen werden sollen
- `mode`: `list` bedeutet Benutzer-Rangliste, `wall` bedeutet Benutzerwand
- `lang`: i18n-Unterstützung, mehr dazu unter [i18n](../i18n.md)
- `locale`: Sprache anpassen, mehr dazu unter [i18n](../i18n.md)

Das von der Komponente zurückgegebene Datenformat sollte `Promise<{ users: WalineUser[], destroy: () => void }>` sein.

- `users`-Eigenschaft: ein Array der Benutzerliste mit der genauen Anzahl von `count`
- `destroy`-Methode: eine Funktion, die das Widget zerstört

## Grundlegende Verwendung

### Benutzer-Rangliste

```html
<div id="waline-users"></div>
<script type="module">
  import { UserList } from 'https://cdn.jsdelivr.net/npm/@waline/client/dist/waline.mjs';

  UserList({
    el: '#waline-users',
    serverURL: 'http://waline.vercel.app',
    count: 10,
  });
</script>
```

### Benutzerwand

```html
<div id="waline-users"></div>
<script type="module">
  import { UserList } from 'https://cdn.jsdelivr.net/npm/@waline/client/dist/waline.mjs';

  UserList({
    el: '#waline-users',
    serverURL: 'http://waline.vercel.app',
    count: 50,
    mode: 'wall',
  });
</script>
```

## Erweiterte Verwendung

Wenn Sie mit dem Standardausgabeformat nicht zufrieden sind, können Sie die Komponente aufrufen, indem Sie die `el`-Option weglassen, um die Daten zu erhalten und sie selbst zu rendern.

Beispiel:

```html
<div id="waline-users"></div>
<script type="module">
  import { UserList } from 'https://cdn.jsdelivr.net/npm/@waline/client/dist/waline.mjs';

  UserList({ serverURL: 'http://waline.vercel.app', count: 10 }).then(({ users }) => {
    document.getElementById('waline-users').innerHTML = users.map(
      (user) => `<a href="${user.link}">${user.nick}</a>`,
    );
  });
</script>
```
