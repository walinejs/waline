---
title: Счётчик комментариев
icon: counter
order: 8
---

Waline позволяет отдельно отображать количество комментариев вне области комментариев.

<!-- more -->

## Автоматическое обновление

Вы можете включить подсчёт комментариев в функции `init`, установив для параметра `comment` значение `true`.

```html
<script type="module">
  import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

  init({
    el: '#waline',
    // ...
    comment: true, // enable comment counting
  });
</script>
```

Waline будет пытаться заполнить или обновить количество комментариев при каждом вызове функции `init` или при обновлении пути.

Waline находит на странице элементы с классом `waline-comment-count` и использует их атрибут `data-path` в качестве условия запроса. Затем в полученное значение подставляется результат:

```html
<!-- data-path will be the query condition -->
<span data-path="<Your/Path/Name>" class="waline-comment-count" /> comments
```

Если вам нужен другой селектор, установите для параметра `comment` этот селектор.

При каждом вызове `WalineInstance.update()` Waline будет заново просматривать содержимое страницы и автоматически обновлять счётчик комментариев.

::: tip Примеры

```html
The current page has <span class="waline-comment-count" /> comments, the home page has
<span data-path="/en/" class="waline-comment-count" /> comments.
```

На текущей странице <span class="waline-comment-count" /> комментариев, на главной
странице <span data-path="/en/" class="waline-comment-count" /> комментариев.

:::

## Ручное обновление

Помимо автоматического обновления с помощью функции `init`, вы можете вручную обновлять счётчик комментариев текущей страницы через API `commentCount`:

```html
<script type="module">
  import { commentCount } from 'https://unpkg.com/@waline/client@v3/dist/comment.js';

  commentCount({
    serverURL,
    path,

    // optional, for custom selectors, defaults to `'.waline-pageview-count'`
    // selector: '.waline-pageview-count',
  });
</script>
```

::: info Отмена

Поскольку получение количества комментариев является асинхронной сетевой операцией, в некоторых обстоятельствах может потребоваться отменить выполняющееся обновление счётчика комментариев.

`commentCount` возвращает функцию, вызов которой отменяет обновление:

```js
const abort = Waline.commentCount({
  serverURL: '<YOUR_SERVER_URL>',
  path: window.location.pathname,
});

// After 500ms, if the network request has not been completed, cancel this operation
setTimeout(() => abort(), 500);
```

:::

## Подключение только счётчика

Иногда требуется показывать количество комментариев некоторых страниц в списке статей или на главной странице, но загружать весь Waline не хочется. В этом случае можно использовать модуль `comment` размером Gzip < 1KB:

```html
<script type="module">
  import { commentCount } from 'https://unpkg.com/@waline/client@v3/dist/comment.js';

  commentCount({
    serverURL,
    path,

    // optional, for custom selectors, defaults to `'.waline-pageview-count'`
    // selector: '.waline-pageview-count',
  });
</script>
```

<script setup>
import { walineOptions } from '@source/.vuepress/client.ts'
import { commentCount } from '@waline/client/comment'
import { onMounted } from 'vue'
import { useRoute } from 'vuepress/client'

const { serverURL } = walineOptions
const route = useRoute()

onMounted(()=>{
  commentCount({
    serverURL: serverURL,
    path: route.path,
  })
})
</script>
