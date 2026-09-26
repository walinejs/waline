---
title: Emoji anpassen
icon: emoji
order: 2
---

Sie können das Emoji des Kommentarfelds anpassen, indem Sie die Option `emoji` festlegen. Sie sollten es auf ein **Array** setzen, das _Vorlagenlink_ oder _Vorlagenkonfigurationsobjekt_ enthält. Wenn Sie es nicht möchten, setzen Sie es einfach auf `false`.

<!-- more -->

## Vorlagen

Waline bietet eine Reihe von Emoji-Vorlagen, die sofort verwendet werden können. Sie können sie direkt zu den `emoji`-Optionen hinzufügen:

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

  ::: details Andere Vorlagen
  - Vollständig: (Nicht empfohlen)

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw
    ```

  - Körper:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-body
    ```

  - Essen:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-food
    ```

  - Natürlich:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-natural
    ```

  - Objekt:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-object
    ```

  - Symbol:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-symbol
    ```

  - Menschen:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-people
    ```

  - Sport:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-sport
    ```

  - Zeit:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-time
    ```

  - Reise:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-travel
    ```

  - Wetter:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-weather
    ```

  - Flagge:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-flag
    ```

  :::

- Weibo

  ```http
  https://unpkg.com/@waline/emojis@1.4.0/weibo
  ```

- Soul Knight Emoji

  ```http
  https://unpkg.com/@waline/emojis@1.4.0/soul-emoji
  ```

::: warning

Waline hat KEINE Urheberrechte an den oben genannten Emojis, verwenden Sie sie auf eigenes Risiko.

:::

### Beispiel

```html
<div id="waline"></div>
<script type="module">
  import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

  init({
    el: '#waline',
    serverURL: '<YOUR SERVER URL>',

    // Emoji auf Weibo und Bmoji setzen
    emoji: ['//unpkg.com/@waline/emojis@1.4.0/weibo', '//unpkg.com/@waline/emojis@1.4.0/bmoji'],
  });
</script>
```

## Erstellen Sie Ihre eigenen Vorlagen

Neben den von Waline bereitgestellten Vorlagen können Sie Ihre eigenen Vorlagen erstellen. Siehe [Anleitung → Emoji-Vorlagen erstellen](../../cookbook/customize/emoji.md).
