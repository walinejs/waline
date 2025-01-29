---
title: plugin system
icon: api
---

Users can extend the custom hook function through the Hook provided by Waline to realize custom functions. But if users want to share custom Hook methods, they can only use the copy method. To solve this problem, the Waline plugin system came into being.

## Install the plugin

A new `plugins` attribute has been added to Waline's initial configuration, which supports configuring multiple plugins.

```js
// index.js
const Waline = require('@waline/vercel');
const HelloWorldPlugin = require('@waline-plugins/hello-world');

module.exports = Waline({
  plugins: [HelloWorldPlugin],
});
```

To install others' plugin directly, you can also place plugin hooks direct in `plugins`:

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

## Create plugin

### Create based on Hook

It's easy to build a plugin. A plugin is contained by a collection of [hooks.](./config.md#hooks)

```js
module.exports = {
  hooks: {
    async postSave() {
      // do what ever you want after comment saved
    },
  },
};
```

It should be noted that if the user installs multiple Hook plugins, the execution of the same hook function is executed in the order in which the plugins are installed. If the pre-hook method returns early, no subsequent operations will be performed.

### Create based on middleware

If Hook can't meet your needs, you can use a more powerful middleware mode to customize development. The bottom layer of Waline uses the Node.js framework [Koa](https://koajs.com), and we expose Koa's middleware configuration as a whole, which can meet various customization needs of advanced developers.

If you don't know what Koa middleware is, you can search for it first. What you need to pay attention to when using the middleware mode to make plug-ins is that the callback method must write the execution of `await next()`, otherwise the follow-up operations will not be executed.

```js
module.exports = {
  middlewares: [
    async (ctx, next) => {
      await next();
    },
  ],
};
```

Of course, you can put the logic of Hook-type plug-ins and middleware-type plug-ins together, and Waline supports them.

### List of plugins

Welcome to submit plugins~

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
