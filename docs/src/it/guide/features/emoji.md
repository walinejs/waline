---
title: Personalizzare le emoji
icon: emoji
order: 2
---

Puoi personalizzare le emoji del riquadro dei commenti impostando l'opzione `emoji`: deve essere un **array** che contiene _link di preset_ o _oggetti di configurazione dei preset_. Se non le vuoi, impostala su `false`.

<!-- more -->

## Preset

Waline offre una serie di preset di emoji pronti all'uso. Puoi aggiungerli direttamente alle opzioni `emoji`:

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

  ::: details Altri preset
  - Full: (sconsigliato)

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw
    ```

  - Body:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-body
    ```

  - Food:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-food
    ```

  - Natural:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-natural
    ```

  - Object:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-object
    ```

  - Symbol:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-symbol
    ```

  - People:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-people
    ```

  - Sport:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-sport
    ```

  - Time:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-time
    ```

  - Travel:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-travel
    ```

  - Weather:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-weather
    ```

  - Flag:

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

Waline non detiene alcun diritto d'autore sulle emoji elencate: usale a tuo rischio.

:::

### Esempio

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

## Creare preset personalizzati

Oltre ai preset forniti da Waline, puoi creare i tuoi; vedi [Guida → Creare preset di emoji](../../cookbook/customize/emoji.md).
