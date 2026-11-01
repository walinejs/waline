---
title: Счётчик просмотров
icon: counter
order: 7
---

Waline поддерживает подсчёт просмотров страниц.

<!-- more -->

## Совместное использование с комментариями

Если вы используете сервис комментариев Waline, подсчёт просмотров можно включить, установив для параметра `pageview` значение `true` при инициализации:

```js
Waline.init({
  el: '#waline',
  // ...
  pageview: true, // pageview statistics
});
```

Waline автоматически найдёт на странице элементы со значением `class`, равным `waline-pageview-count`, и получит их `data-path` в качестве условия запроса. Затем подставит полученное значение:

Если вам нужен другой селектор, установите для параметра `pageview` этот селектор.

```html
<!-- data-path will be the query condition -->
Pageviews: <span class="waline-pageview-count" data-path="<Your/Path/Name>"></i>
```

При каждом вызове `WalineInstance.update()` Waline будет заново просматривать содержимое страницы и автоматически обновлять просмотры.

::: tip Примеры

```html
The current page has been viewed
<span class="waline-pageview-count" data-path="/en/guide/client/count.html" />
times.
```

Текущая страница просмотрена
<span class="waline-pageview-count" data-path="/en/guide/client/count.html" /> раз.

:::

## Использование отдельно

Если вам нужна только функция подсчёта просмотров, можно подключить модуль pageview, предоставляемый Waline, его размер Gzip составляет < 1KB.

```html
<ul>
  <li>
    Current page views:
    <span class="waline-pageview-count" />
  </li>
  <li>
    Page Views:
    <span class="waline-pageview-count" data-path="/" />
  </li>
</ul>
<script type="module">
  import { pageviewCount } from 'https://unpkg.com/@waline/client@v3/dist/pageview.js';

  pageviewCount({
    serverURL: '<YOUR_SERVER_URL>',
    path: window.location.pathname,

    // optional, for custom selectors, defaults to `'.waline-pageview-count'`
    // selector: 'waline-pageview-count',

    // optional, whether to increase the number of visits when fetching, the default is `true`
    // update: true,
  });
</script>
```

- Просмотры текущей страницы: <span class="waline-pageview-count" />

- Просмотры главной страницы: <span class="waline-pageview-count" data-path="/" />

::: info Отмена

Поскольку получение просмотров является асинхронной сетевой операцией, в некоторых обстоятельствах может потребоваться отменить выполняющееся обновление просмотров.

`pageviewCount` возвращает функцию, вызов которой отменяет обновление:

```html
<script type="module">
  import { pageviewCount } from 'https://unpkg.com/@waline/client@v3/dist/pageview.js';

  const abort = Waline.pageviewCount({
    serverURL: '<YOUR_SERVER_URL>',
    path: window.location.pathname,
  });

  // After 500ms, if the network request has not been completed, cancel this operation
  setTimeout(() => abort(), 500);
</script>
```

:::
