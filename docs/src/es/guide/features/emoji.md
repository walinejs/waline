---
title: Personalizar emojis
icon: emoji
order: 2
---

Puedes personalizar los emojis del cuadro de comentarios estableciendo la opción `emoji`. Debes establecerla como un **array** que contenga _enlaces predefinidos_ u _objetos de configuración predefinidos_. Si no los quieres, simplemente establécelo en `false`.

<!-- more -->

## Predefinidos

Waline ofrece una serie de conjuntos de emojis predefinidos listos para usar. Puedes añadirlos directamente a las opciones de `emoji`:

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

  ::: details Otros predefinidos
  - Completo: (no recomendado)

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw
    ```

  - Cuerpo:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-body
    ```

  - Comida:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-food
    ```

  - Naturaleza:

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

  - Personas:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-people
    ```

  - Deportes:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-sport
    ```

  - Tiempo:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-time
    ```

  - Viajes:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-travel
    ```

  - Clima:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-weather
    ```

  - Banderas:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-flag
    ```

  :::

- Weibo

  ```http
  https://unpkg.com/@waline/emojis@1.4.0/weibo
  ```

- Emoji de Soul Knight

  ```http
  https://unpkg.com/@waline/emojis@1.4.0/soul-emoji
  ```

::: warning

Waline NO tiene ningún derecho de autor sobre los emojis anteriores; úsalos bajo tu propia responsabilidad.

:::

### Ejemplo

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

## Crea tus propios predefinidos

Además de los predefinidos que ofrece Waline, puedes crear los tuyos propios; consulta [Guía → Crear predefinidos de emojis](../../cookbook/customize/emoji.md).
