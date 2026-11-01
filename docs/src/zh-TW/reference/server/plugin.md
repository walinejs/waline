---
title: 外掛系統
icon: api
---

使用者可以透過 Waline 提供的 Hook 擴充自訂掛鉤函式來實現自訂功能。但如果使用者之間想要共享自訂的 Hook 方法，只能使用複製的方式。為了解決這個問題，Waline 外掛系統應運而生。

## 安裝外掛

Waline 初始化設定新增了 `plugins` 屬性，支援設定多個外掛。

```js
// index.js
const Waline = require('@waline/vercel');
const HelloWorldPlugin = require('@waline-plugins/hello-world');

module.exports = Waline({
  plugins: [HelloWorldPlugin],
});
```

除了直接安裝別人的外掛之外，我們也可以在這裡設定自己的外掛邏輯。

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

## 製作外掛

### 基於 Hook 製作

開發一款外掛也非常簡單，基本上與之前 [Hook](./config.md#留言-hooks) 的使用方法一致，只是做了一層封裝。

```js
module.exports = {
  hooks: {
    async postSave() {
      // do what ever you want after comment saved
    },
  },
};
```

需要注意，如果使用者安裝了多個 Hook 類外掛，同一個掛鉤函式的執行是依安裝外掛載入的先後順序執行的。如果前置的掛鉤方法提前傳回的話，就不會執行後續的操作了。

### 基於中介軟體製作

如果 Hook 沒辦法滿足你的需求，則可以使用更強大的中介軟體模式來自訂開發。Waline 最底層使用了 Node.js 框架 [Koa](https://koajs.com)，我們將 Koa 的中介軟體設定整體公開出來，這樣可以滿足進階開發者的各種自訂需求。

如果你不清楚 Koa 中介軟體是什麼，可以先搜尋了解一下。使用中介軟體模式製作外掛需要注意的是，回呼方法一定要寫 `await next()` 的執行，否則不會執行後續操作。

```js
module.exports = {
  middlewares: [
    async (ctx, next) => {
      await next();
    },
  ],
};
```

當然你完全可以將 Hook 類外掛和中介軟體類外掛邏輯放在一起，這些 Waline 都是支援的。

### 外掛列表

歡迎提交外掛～

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
