---
title: Users Rank List/Users Wall Widget
icon: rank
---

Waline supports displaying users rank list or users wall by widget, which is convenient for displaying the commentor's info in the sidebar of the blog.

<!-- more -->

## Component options

The users rank list/users wall widget is named `UserList` and contains six options:

- `el` (optional): the element to be mounted
- `serverURL`: server link
- `count` The number of users needed to get
- `mode`: `list` means users rank list, `wall` means users wall
- `lang`: i18n support, more ref to [i18n](../i18n.md)
- `locale`: customize the language, more ref to [i18n](../i18n.md)

The data format returned by the component should be `Promise<{ users: WalineUser[], destroy: () => void }>`.

- `users` property: an array of the user list with exact number of `count`
- `destroy` method: a function which will destroy the widget

## Basic usage

### Users Rank List

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

### Users Wall

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

## Advanced usage

If you are not satisfied with the default output format, you can call the component by omitting the `el` option to get the data and render it yourself.

Example:

```html
<div id="waline-users"></div>
<script type="module">
  import { UserList } from 'https://cdn.jsdelivr.net/npm/@waline/client/dist/waline.mjs';

  UserList({ serverURL: 'http://waline.vercel.app', count: 10 }).then(
    ({ users }) => {
      document.getElementById('waline-users').innerHTML = users.map(
        (user) => `<a href="${user.link}">${user.nick}</a>`,
      );
    },
  );
</script>
```
