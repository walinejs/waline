---
title: Sistema de plugins
icon: api
---

Los usuarios pueden ampliar las funciones personalizadas mediante los hooks que ofrece Waline. Pero si quieren compartir sus métodos de hook personalizados, solo pueden hacerlo copiándolos. Para resolver este problema nació el sistema de plugins de Waline.

## Instalar el plugin

Se ha añadido un nuevo atributo `plugins` a la configuración inicial de Waline, que permite configurar varios plugins.

```js
// index.js
const Waline = require('@waline/vercel');
const HelloWorldPlugin = require('@waline-plugins/hello-world');

module.exports = Waline({
  plugins: [HelloWorldPlugin],
});
```

Si quieres instalar directamente el plugin de otra persona, también puedes colocar los hooks del plugin directamente en `plugins`:

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

## Crear un plugin

### Crear a partir de un hook

Crear un plugin es sencillo. Un plugin consiste en una colección de [hooks](./config.md#hooks-de-comentarios).

```js
module.exports = {
  hooks: {
    async postSave() {
      // do what ever you want after comment saved
    },
  },
};
```

Conviene tener en cuenta que, si el usuario instala varios plugins de hooks, la ejecución de una misma función de hook sigue el orden en que se instalaron los plugins. Si un método pre-hook devuelve algo antes de tiempo, no se realizarán las operaciones posteriores.

### Crear a partir de un middleware

Si los hooks no cubren tus necesidades, puedes usar el modo middleware, más potente, para personalizar tu desarrollo. La capa inferior de Waline utiliza el framework de Node.js [Koa](https://koajs.com), y exponemos su configuración de middlewares al completo, lo que permite cubrir las distintas necesidades de personalización de los desarrolladores avanzados.

Si no sabes qué es un middleware de Koa, búscalo primero. Al usar el modo middleware para crear plugins debes tener en cuenta que el método de callback debe incluir la ejecución de `await next()`; de lo contrario, las operaciones posteriores no se ejecutarán.

```js
module.exports = {
  middlewares: [
    async (ctx, next) => {
      await next();
    },
  ],
};
```

Por supuesto, puedes combinar la lógica de los plugins de tipo hook y la de los plugins de tipo middleware: Waline los admite ambos.

### Lista de plugins

Anímate a enviar tus plugins~

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
