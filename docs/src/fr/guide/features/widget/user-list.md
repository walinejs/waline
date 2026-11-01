---
title: Widget classement des utilisateurs / mur des utilisateurs
icon: rank
---

Waline permet d'afficher un classement des utilisateurs ou un mur des utilisateurs via un widget, ce qui est pratique pour présenter les informations des personnes qui commentent dans la barre latérale du blog.

<!-- more -->

## Options du composant

Le widget classement des utilisateurs / mur des utilisateurs s'appelle `UserList` et comporte six options :

- `el` (facultatif) : l'élément sur lequel monter le widget
- `serverURL` : lien du serveur
- `count` : nombre d'utilisateurs à récupérer
- `mode` : `list` pour le classement des utilisateurs, `wall` pour le mur des utilisateurs
- `lang` : prise en charge i18n, voir [i18n](../i18n.md)
- `locale` : personnaliser la langue, voir [i18n](../i18n.md)

Le format de données renvoyé par le composant doit être `Promise<{ users: WalineUser[], destroy: () => void }>`.

- propriété `users` : un tableau de la liste des utilisateurs, avec exactement `count` éléments
- méthode `destroy` : une fonction qui détruit le widget

## Utilisation de base

### Classement des utilisateurs

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

### Mur des utilisateurs

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

## Utilisation avancée

Si le format de sortie par défaut ne vous convient pas, vous pouvez appeler le composant en omettant l'option `el` afin de récupérer les données et de les afficher vous-même.

Exemple :

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
