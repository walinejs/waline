---
title: Personnaliser les emoji
icon: emoji
order: 2
---

Vous pouvez personnaliser les emoji de la zone de commentaire avec l'option `emoji` : définissez-la sur un **tableau** contenant un _lien de preset_ ou un _objet de configuration de preset_. Si vous n'en voulez pas, définissez-la simplement sur `false`.

<!-- more -->

## Presets

Waline fournit une série de presets d'emoji prêts à l'emploi. Vous pouvez les ajouter directement aux options `emoji` :

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
  - Emoji :

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-emoji
    ```

  ::: details Autres presets
  - Full : (non recommandé)

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw
    ```

  - Corps :

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-body
    ```

  - Nourriture :

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-food
    ```

  - Nature :

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-natural
    ```

  - Objets :

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-object
    ```

  - Symboles :

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-symbol
    ```

  - Personnes :

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-people
    ```

  - Sport :

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-sport
    ```

  - Temps :

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-time
    ```

  - Voyage :

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-travel
    ```

  - Météo :

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-weather
    ```

  - Drapeaux :

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

Waline ne détient aucun droit d'auteur sur les emoji ci-dessus ; utilisez-les à vos risques et périls.

:::

### Exemple

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

## Créer vos propres presets

En plus des presets fournis par Waline, vous pouvez créer les vôtres. Voir [Guide → Créer des presets d'emoji](../../cookbook/customize/emoji.md).
