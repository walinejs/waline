---
title: Импорт Waline через CDN
icon: import
order: 1
---

Этот раздел руководства посвящён импорту Waline через CDN.

<!-- more -->

Пользователям из материкового Китая мы рекомендуем использовать [unpkg](https://unpkg.com/@waline/client), а пользователям из других стран — jsDelivr.

Чтобы Waline лучше работал с SSR, в версии V2 мы разделили его стили. Это значит, что нужно импортировать CSS-файл стилей Waline, а затем импортировать скрипт Waline и вызвать его.

## Комментарии

Обычно требуется, чтобы Waline отображал список комментариев. В этом случае импортируйте Waline следующим образом:

```html
<!-- style file -->
<link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css" />
<!-- script file -->
<script type="module">
  import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

  init({
    // options
  });
</script>
```

## Просмотры и комментарии

Иногда нужно отображать количество просмотров и комментариев статьи на главной странице или в списке статей, но без загрузки компонента комментариев. В этом случае можно импортировать скрипт размером Gzip < 1 КБ следующими способами:

Просмотры:

```html
<script type="module">
  import { pageviewCount } from 'https://unpkg.com/@waline/client@v3/dist/pageview.js';

  pageviewCount({
    // options
  });
</script>
```

Количество комментариев:

```html
<script type="module">
  import { commentCount } from 'https://unpkg.com/@waline/client@v3/dist/comment.js';

  commentCount({
    // options
  });
</script>
```

## Дополнительно

::: info Указание версии

Возможно, вы заметили, что во всех приведённых выше примерах мы явно указали версию `@v2` после `@aline/client`. Без этого ваш сайт не будет работать корректно.

:::
