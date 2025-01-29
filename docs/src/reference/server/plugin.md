---
title: 插件系统
icon: api
---

用户可以通过 Waline 提供的 Hook 扩展自定义钩子函数来实现自定义功能。但如果用户之间想要共享自定义的 Hook 方法的话，只能使用复制的方式。为了解决这个问题，Waline 插件系统应运而生。

## 安装插件

Waline 初始化配置新增了 `plugins` 属性，支持配置多个插件。

```js
// index.js
const Waline = require('@waline/vercel');
const HelloWorldPlugin = require('@waline-plugins/hello-world');

module.exports = Waline({
  plugins: [HelloWorldPlugin],
});
```

除了直接安装别人的插件之外，我们也可以在这里配置自己的插件逻辑。

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

## 制作插件

### 基于 Hook 制作

开发一款插件也非常的简单，基本和之前 [Hook](./config.md#%E8%AF%84%E8%AE%BA-hooks) 的使用方法一致，只是做了一层封装。

```js
module.exports = {
  hooks: {
    async postSave() {
      // do what ever you want after comment saved
    },
  },
};
```

需要注意，如果用户安装了多个 Hook 类插件，同一个钩子函数的执行是安装插件加载的先后顺序来执行的。如果前置有钩子方法提前返回的话，就不会执行后续的操作了。

### 基于中间件制作

如果 Hook 没办法满足你的需求，则可以使用更强大的中间件模式来自定义开发。Waline 最底层是使用了 Node.js 框架 [Koa](https://koajs.com)，我们将 Koa 的中间件配置整体暴露出来，这样可以满足高级开发者的各种自定义需求。

如果你不清楚 Koa 中间件是什么，可以先搜索了解一下。使用中间件模式制作插件需要注意的是，回调方法一定要写 `await next()` 的执行，否则不会执行后续操作。

```js
module.exports = {
  middlewares: [
    async (ctx, next) => {
      await next();
    },
  ],
};
```

当然你完全可以将 Hook 类插件和中间件类插件逻辑放在一块，这些 Waline 都是支持的。

### 插件列表

欢迎提交插件~

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
