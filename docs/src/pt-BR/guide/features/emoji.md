---
title: Personalizar emojis
icon: emoji
order: 2
---

Você pode personalizar os emojis da caixa de comentários com a opção `emoji`, que deve ser definida como um **array** contendo _links de predefinições_ ou _objetos de configuração de predefinições_. Se você não quiser emojis, basta defini-la como `false`.

<!-- more -->

## Predefinições

O Waline oferece uma série de predefinições de emojis prontas para usar. Você pode adicioná-las diretamente à opção `emoji`:

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
  - Emoji:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-emoji
    ```

  ::: details Outras predefinições
  - Completo: (não recomendado)

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw
    ```

  - Corpo:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-body
    ```

  - Comida:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-food
    ```

  - Natureza:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-natural
    ```

  - Objetos:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-object
    ```

  - Símbolos:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-symbol
    ```

  - Pessoas:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-people
    ```

  - Esportes:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-sport
    ```

  - Tempo:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-time
    ```

  - Viagem:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-travel
    ```

  - Clima:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-weather
    ```

  - Bandeiras:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-flag
    ```

  :::

- Weibo

  ```http
  https://unpkg.com/@waline/emojis@1.4.0/weibo
  ```

- Emoji do Soul Knight

  ```http
  https://unpkg.com/@waline/emojis@1.4.0/soul-emoji
  ```

::: warning

O Waline não detém nenhum direito autoral sobre os emojis acima, use-os por sua conta e risco.

:::

### Exemplo

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

## Criar suas próprias predefinições

Além das predefinições oferecidas pelo Waline, você pode criar as suas próprias; veja [Guia → Criar predefinições de emojis](../../cookbook/customize/emoji.md).
