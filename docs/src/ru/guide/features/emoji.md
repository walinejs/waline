---
title: Настройка эмодзи
icon: emoji
order: 2
---

Вы можете настроить эмодзи поля комментариев, задав параметр `emoji`. Ему нужно передать **массив**, содержащий _ссылку на набор_ или _объект конфигурации набора_. Если эмодзи не нужны, просто установите `false`.

<!-- more -->

## Наборы

Waline предоставляет ряд готовых наборов эмодзи, которые можно использовать сразу. Их можно добавить прямо в параметр `emoji`:

- Alus

  ```http
  https://unpkg.com/@waline/emojis@1.4.0/alus
  ```

- Bmoji

  ```http
  https://unpkg.com/@waline/emojis@1.4.0/bmoji
  ```

- Bilibili

  ```http
  https://unpkg.com/@waline/emojis@1.4.0/bilibili
  ```

- QQ

  ```http
  https://unpkg.com/@waline/emojis@1.4.0/qq
  ```

- Tieba

  ```http
  https://unpkg.com/@waline/emojis@1.4.0/tieba
  ```

- Twemoji
  - Эмодзи:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-emoji
    ```

  ::: details Другие наборы
  - Полный набор: (не рекомендуется)

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw
    ```

  - Тело:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-body
    ```

  - Еда:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-food
    ```

  - Природа:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-natural
    ```

  - Предметы:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-object
    ```

  - Символы:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-symbol
    ```

  - Люди:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-people
    ```

  - Спорт:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-sport
    ```

  - Время:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-time
    ```

  - Путешествия:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-travel
    ```

  - Погода:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-weather
    ```

  - Флаги:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-flag
    ```

  :::

- Weibo

  ```http
  https://unpkg.com/@waline/emojis@1.4.0/weibo
  ```

- Soul knight Emoji

  ```http
  https://unpkg.com/@waline/emojis@1.4.0/soul-emoji
  ```

::: warning

Waline НЕ обладает авторскими правами на перечисленные эмодзи, используйте их на свой страх и риск.

:::

### Пример

```html
<div id="waline"></div>
<script type="module">
  import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

  init({
    el: '#waline',
    serverURL: '<YOUR SERVER URL>',
    // Set emoji to Weibo and Bmoji
    emoji: ['//unpkg.com/@waline/emojis@1.4.0/weibo', '//unpkg.com/@waline/emojis@1.4.0/bmoji'],
  });
</script>
```

## Создание собственных наборов

Помимо наборов, предоставляемых Waline, вы можете создавать собственные, см. [Руководство → Создание наборов эмодзи](../../cookbook/customize/emoji.md).
