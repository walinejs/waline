---
title: Виджет рейтинга и стены пользователей
icon: rank
---

Waline позволяет отображать рейтинг пользователей или стену пользователей с помощью виджета, что удобно для показа сведений о комментаторах в боковой панели блога.

<!-- more -->

## Параметры компонента

Виджет рейтинга и стены пользователей называется `UserList` и содержит шесть параметров:

- `el` (необязательно): элемент, в который выполняется монтирование
- `serverURL`: ссылка на сервер
- `count`: количество пользователей, которое нужно получить
- `mode`: `list` — рейтинг пользователей, `wall` — стена пользователей
- `lang`: поддержка i18n, подробнее см. [i18n](../i18n.md)
- `locale`: настройка языка, подробнее см. [i18n](../i18n.md)

Формат данных, возвращаемых компонентом: `Promise<{ users: WalineUser[], destroy: () => void }>`.

- свойство `users`: массив пользователей ровно в количестве `count`
- метод `destroy`: функция, которая уничтожает виджет

## Базовое использование

### Список рейтинга пользователей

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

### Стена пользователей

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

## Расширенное использование

Если стандартный формат вывода не подходит, можно вызвать компонент без параметра `el`, получить данные и отрисовать их самостоятельно.

Пример:

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
