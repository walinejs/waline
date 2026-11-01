---
title: Система плагинов
icon: api
---

Пользователи могут расширять функциональность с помощью хуков, которые предоставляет Waline, и реализовывать собственные возможности. Но если нужно поделиться собственными хуками, остаётся только копировать код. Для решения этой задачи и появилась система плагинов Waline.

## Установка плагина

В начальную конфигурацию Waline добавлен атрибут `plugins`, который поддерживает настройку нескольких плагинов.

```js
// index.js
const Waline = require('@waline/vercel');
const HelloWorldPlugin = require('@waline-plugins/hello-world');

module.exports = Waline({
  plugins: [HelloWorldPlugin],
});
```

Чтобы использовать чужой плагин напрямую, можно также поместить хуки плагина прямо в `plugins`:

```js
// index.js
const Waline = require('@waline/vercel');
const HelloWorldPlugin = require('@waline-plugins/hello-world');

module.exports = Waline({
  plugins: [
    {
      hooks: {
        async postSave() {
          // do what ever you want after comment saved
        },
      },
      middlewares: [
        async (ctx, next) => {
          await next();
        },
      ],
    },
  ],
});
```

## Создание плагина

### Создание на основе хуков

Создать плагин несложно. Плагин представляет собой набор [хуков](./config.md#хуки-комментариев).

```js
module.exports = {
  hooks: {
    async postSave() {
      // do what ever you want after comment saved
    },
  },
};
```

Обратите внимание: если установлено несколько плагинов с хуками, одинаковые хуки выполняются в порядке установки плагинов. Если метод pre-hook досрочно возвращает значение, последующие операции не выполняются.

### Создание на основе middleware

Если возможностей хуков не хватает, можно использовать более мощный режим middleware. В основе Waline лежит Node.js-фреймворк [Koa](https://koajs.com), и мы полностью открываем конфигурацию middleware Koa, что позволяет опытным разработчикам реализовывать самые разные задачи.

Если вы не знаете, что такое middleware в Koa, сначала поищите информацию о них. При создании плагина в режиме middleware важно, чтобы в функции обратного вызова присутствовал вызов `await next()`, иначе последующие операции не выполнятся.

```js
module.exports = {
  middlewares: [
    async (ctx, next) => {
      await next();
    },
  ],
};
```

Разумеется, логику плагинов на хуках и плагинов на middleware можно объединить — Waline это поддерживает.

### Список плагинов

Будем рады вашим плагинам~

- [@waline-plugins/hello-world](https://github.com/walinejs/plugins/tree/master/packages/hello-world)
- [@waline-plugins/privacy](https://github.com/walinejs/plugins/tree/master/packages/privacy)
- [@waline-plugins/tencent-tms](https://github.com/walinejs/plugins/tree/master/packages/tencent-tms)
- [@waline-plugins/link-interceptor](https://github.com/walinejs/plugins/tree/master/packages/link-interceptor)
- [waline-plugin-llm-reviewer](https://github.com/zhullyb/waline-plugin-llm-reviewer)
- [waline-notification-bark](https://github.com/wnwd/waline-notification-bark)
- [waline-notification-telegram-bot](https://github.com/wnwd/waline-notification-telegram-bot)
- [waline-notification-wecom-group-bot](https://github.com/wnwd/waline-notification-wecom-group-bot)
- [waline-notification-lark-group-bot](https://github.com/wnwd/waline-notification-lark-group-bot)
- [waline-notification-slack-app](https://github.com/wnwd/waline-notification-slack-app)
- [waline-openai-moderation](https://github.com/chenxv399/waline-openai-moderation)
