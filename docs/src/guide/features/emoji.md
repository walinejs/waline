---
title: 表情选项卡
icon: emoji
order: 2
---

你可以通过设置 `emoji` 选项自定义评论输入框的表情，你应该将它设置为包含*预设地址*或*预设配置对象*的**数组**。如果你不需要它，只需将它设置为 `false`。

<!-- more -->

## 预设

Waline 提供了一系列开箱即用的表情预设。你可以直接将它们添加到 `emoji` 选项中:

- Alus

  ```http
  https://unpkg.com/@waline/emojis@1.2.0/alus
  ```

- 哔哩哔哩

  ```http
  https://unpkg.com/@waline/emojis@1.2.0/bilibili
  ```

- 哔哩哔哩小黄脸

  ```http
  https://unpkg.com/@waline/emojis@1.2.0/bmoji
  ```

- QQ

  ```http
  https://unpkg.com/@waline/emojis@1.2.0/qq
  ```

- 贴吧

  ```http
  https://unpkg.com/@waline/emojis@1.2.0/tieba
  ```

- Twitter Emoji

  - 表情:

    ```http
    https://unpkg.com/@waline/emojis@1.2.0/tw-emoji
    ```

  ::: details 其他可用预设

  - 完整: (不推荐使用)

    ```http
    https://unpkg.com/@waline/emojis@1.2.0/tw
    ```

  - 身体:

    ```http
    https://unpkg.com/@waline/emojis@1.2.0/tw-body
    ```

  - 食物:

    ```http
    https://unpkg.com/@waline/emojis@1.2.0/tw-food
    ```

  - 自然:

    ```http
    https://unpkg.com/@waline/emojis@1.2.0/tw-natural
    ```

  - 对象:

    ```http
    https://unpkg.com/@waline/emojis@1.2.0/tw-object
    ```

  - 符号:

    ```http
    https://unpkg.com/@waline/emojis@1.2.0/tw-symbol
    ```

  - 人物:

    ```http
    https://unpkg.com/@waline/emojis@1.2.0/tw-people
    ```

  - 运动:

    ```http
    https://unpkg.com/@waline/emojis@1.2.0/tw-sport
    ```

  - 时间:

    ```http
    https://unpkg.com/@waline/emojis@1.2.0/tw-time
    ```

  - 旅行:

    ```http
    https://unpkg.com/@waline/emojis@1.2.0/tw-travel
    ```

  - 天气:

    ```http
    https://unpkg.com/@waline/emojis@1.2.0/tw-weather
    ```

  - 旗帜:

    ```http
    https://unpkg.com/@waline/emojis@1.2.0/tw-flag
    ```

  :::

- 微博

  ```http
  https://unpkg.com/@waline/emojis@1.2.0/weibo
  ```

- 《元气骑士》

  ```http
  https://unpkg.com/@waline/emojis@1.2.0/soul-emoji
  ```

::: warning

Waline 不含有上述 Emoji 表情的任何版权，你需要自行承担使用风险。

:::

### 例子

```html
<div id="waline"></div>
<script type="module">
  import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

  init({
    el: '#waline',
    serverURL: '<YOUR SERVER URL>',

    // 设置 emoji 为微博与哔哩小黄脸
    emoji: [
      '//unpkg.com/@waline/emojis@1.2.0/weibo',
      '//unpkg.com/@waline/emojis@1.2.0/bmoji',
    ],
  });
</script>
```

## 创建自己的预设

除了 Waline 提供的预设外，你可以创建自己的预设，参见 [Cookbook → 创建 emoji 预设](../../cookbook/customize/emoji.md)。
