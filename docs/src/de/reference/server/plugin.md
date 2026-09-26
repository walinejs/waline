---
title: Plugin-System
icon: api
---

Benutzer können die benutzerdefinierte Hook-Funktion über das von Waline bereitgestellte Hook erweitern, um benutzerdefinierte Funktionen zu realisieren. Aber wenn Benutzer benutzerdefinierte Hook-Methoden teilen möchten, können sie nur die Kopiermethode verwenden. Um dieses Problem zu lösen, wurde das Waline-Plugin-System entwickelt.

## Plugin installieren

Der Erstkonfiguration von Waline wurde ein neues `plugins`-Attribut hinzugefügt, das die Konfiguration mehrerer Plugins unterstützt.

```js
// index.js
const Waline = require('@waline/vercel');
const HelloWorldPlugin = require('@waline-plugins/hello-world');

module.exports = Waline({
  plugins: [HelloWorldPlugin],
});
```

Um das Plugin anderer direkt zu installieren, können Sie auch Plugin-Hooks direkt in `plugins` platzieren:

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

## Plugin erstellen

### Erstellen basierend auf Hook

Es ist einfach, ein Plugin zu erstellen. Ein Plugin besteht aus einer Sammlung von [Hooks.](./config.md#hooks)

```js
module.exports = {
  hooks: {
    async postSave() {
      // do what ever you want after comment saved
    },
  },
};
```

Es ist zu beachten, dass wenn der Benutzer mehrere Hook-Plugins installiert, die Ausführung derselben Hook-Funktion in der Reihenfolge ausgeführt wird, in der die Plugins installiert wurden. Wenn die Pre-Hook-Methode vorzeitig zurückkehrt, werden keine nachfolgenden Operationen ausgeführt.

### Erstellen basierend auf Middleware

Wenn Hook Ihre Anforderungen nicht erfüllen kann, können Sie einen leistungsfähigeren Middleware-Modus für die benutzerdefinierte Entwicklung verwenden. Die unterste Schicht von Waline verwendet das Node.js-Framework [Koa](https://koajs.com), und wir stellen Koas Middleware-Konfiguration als Ganzes zur Verfügung, die verschiedene Anpassungsbedürfnisse fortgeschrittener Entwickler erfüllen kann.

Wenn Sie nicht wissen, was Koa-Middleware ist, können Sie zuerst danach suchen. Worauf Sie achten müssen, wenn Sie den Middleware-Modus verwenden, um Plugins zu erstellen, ist, dass die Callback-Methode die Ausführung von `await next()` schreiben muss, sonst werden die nachfolgenden Operationen nicht ausgeführt.

```js
module.exports = {
  middlewares: [
    async (ctx, next) => {
      await next();
    },
  ],
};
```

Natürlich können Sie die Logik von Hook-Typ-Plugins und Middleware-Typ-Plugins zusammenfügen, und Waline unterstützt sie.

### Liste der Plugins

Willkommen, Plugins einzureichen~

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
