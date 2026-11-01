---
title: Widget classifica utenti / muro degli utenti
icon: rank
---

Waline permette di mostrare la classifica degli utenti o il muro degli utenti tramite un widget, comodo per esporre nella barra laterale del blog le informazioni su chi commenta.

<!-- more -->

## Opzioni del componente

Il widget classifica utenti / muro degli utenti si chiama `UserList` e prevede sei opzioni:

- `el` (facoltativo): l'elemento in cui montare il widget
- `serverURL`: il link del server
- `count` il numero di utenti da recuperare
- `mode`: `list` indica la classifica utenti, `wall` il muro degli utenti
- `lang`: supporto i18n, vedi [i18n](../i18n.md)
- `locale`: personalizza la lingua, vedi [i18n](../i18n.md)

Il formato dei dati restituiti dal componente dovrebbe essere `Promise<{ users: WalineUser[], destroy: () => void }>`.

- proprietà `users`: un array con l'elenco degli utenti, in numero esattamente pari a `count`
- metodo `destroy`: una funzione che distrugge il widget

## Uso di base

### Classifica utenti

```html
<div id="waline-users"></div>
<script type="module">
  import { UserList } from 'https://cdn.jsdelivr.net/npm/@waline/client@v3/dist/waline.js';

  UserList({
    el: '#waline-users',
    serverURL: 'http://waline.vercel.app',
    count: 10,
  });
</script>
```

### Muro degli utenti

```html
<div id="waline-users"></div>
<script type="module">
  import { UserList } from 'https://cdn.jsdelivr.net/npm/@waline/client@v3/dist/waline.js';

  UserList({
    el: '#waline-users',
    serverURL: 'http://waline.vercel.app',
    count: 50,
    mode: 'wall',
  });
</script>
```

## Uso avanzato

Se il formato di output predefinito non ti soddisfa, puoi chiamare il componente omettendo l'opzione `el` per ottenere i dati e renderizzarli come preferisci.

Esempio:

```html
<div id="waline-users"></div>
<script type="module">
  import { UserList } from 'https://cdn.jsdelivr.net/npm/@waline/client@v3/dist/waline.js';

  UserList({ serverURL: 'http://waline.vercel.app', count: 10 }).then(({ users }) => {
    document.getElementById('waline-users').innerHTML = users.map(
      (user) => `<a href="${user.link}">${user.nick}</a>`,
    );
  });
</script>
```
