---
title: Sistema di plugin
icon: api
---

Gli utenti possono estendere le funzionalità tramite gli Hook forniti da Waline per realizzare funzioni personalizzate. Ma se vogliono condividere i metodi Hook personalizzati possono solo copiarli. Per risolvere questo problema è nato il sistema di plugin di Waline.

## Installare un plugin

Alla configurazione iniziale di Waline è stato aggiunto l'attributo `plugins`, che supporta la configurazione di più plugin.

```js
// index.js
const Waline = require('@waline/vercel');
const HelloWorldPlugin = require('@waline-plugins/hello-world');

module.exports = Waline({
  plugins: [HelloWorldPlugin],
});
```

Per installare direttamente il plugin di qualcun altro, puoi anche inserire gli hook del plugin direttamente in `plugins`:

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

## Creare un plugin

### Creare un plugin basato sugli Hook

Creare un plugin è semplice: un plugin è composto da un insieme di [hook](./config.md#hook-dei-commenti).

```js
module.exports = {
  hooks: {
    async postSave() {
      // do what ever you want after comment saved
    },
  },
};
```

Tieni presente che, se vengono installati più plugin Hook, l'esecuzione della stessa funzione hook avviene nell'ordine in cui i plugin sono stati installati. Se un metodo pre-hook restituisce un valore in anticipo, le operazioni successive non vengono eseguite.

### Creare un plugin basato sui middleware

Se gli Hook non bastano, puoi usare la modalità middleware, più potente, per sviluppare funzionalità personalizzate. Alla base Waline usa il framework Node.js [Koa](https://koajs.com) ed espone integralmente la configurazione dei middleware di Koa, così da soddisfare le varie esigenze di personalizzazione degli sviluppatori esperti.

Se non sai cosa sono i middleware di Koa, cerca prima qualche informazione. Quando usi la modalità middleware per creare plugin devi fare attenzione a scrivere l'esecuzione di `await next()` nel metodo di callback, altrimenti le operazioni successive non vengono eseguite.

```js
module.exports = {
  middlewares: [
    async (ctx, next) => {
      await next();
    },
  ],
};
```

Naturalmente puoi combinare la logica dei plugin di tipo Hook e di quelli di tipo middleware: Waline li supporta entrambi.

### Elenco dei plugin

Sei invitato a proporre i tuoi plugin~

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
