---
title: Виджет последних комментариев
icon: recent
---

Waline позволяет отображать последние комментарии с помощью виджета, что удобно для показа свежих комментариев в боковой панели блога.

<!-- more -->

## Параметры компонента

Виджет последних комментариев называется `RecentComments` и содержит три параметра:

- `el` (необязательно): элемент, в который выполняется монтирование
- `serverURL`: ссылка на сервер
- `count`: количество последних комментариев, которое нужно получить

Формат данных, возвращаемых компонентом: `Promise<{ comment: WalineComment[], destroy: () => void }>`.

- свойство `comment`: массив последних комментариев ровно в количестве `count`
- метод `destroy`: функция, которая уничтожает виджет

## Базовое использование

```html
<div id="waline-recent"></div>
<script type="module">
  import { RecentComments } from 'https://cdn.jsdelivr.net/npm/@waline/client@v3/dist/waline.js';

  RecentComments({
    el: '#waline-recent',
    serverURL: 'http://waline.vercel.app',
    count: 10,
  });
</script>
```

::: tip

Результат будет отрисован в `#waline-recent` со стилем по умолчанию.

:::

## Расширенное использование

Если стандартный формат вывода не подходит, можно вызвать компонент без параметра `el`, получить данные и отрисовать их самостоятельно.

Пример:

```html
<div id="waline-recent"></div>
<script type="module">
  import { RecentComments } from 'https://cdn.jsdelivr.net/npm/@waline/client@v3/dist/waline.js';

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
