---
title: sistema de plugins
icon: api
---

Os usuários podem estender a função de hook personalizada através dos Hooks fornecidos pelo Waline para implementar funcionalidades personalizadas. Mas, se quiserem compartilhar métodos de Hook personalizados, eles só podem usar o método de copiar. Para resolver esse problema, o sistema de plugins do Waline surgiu.

## Instalar o plugin

Um novo atributo `plugins` foi adicionado à configuração inicial do Waline, que suporta configurar vários plugins.

```js
// index.js
const Waline = require('@waline/vercel');
const HelloWorldPlugin = require('@waline-plugins/hello-world');

module.exports = Waline({
  plugins: [HelloWorldPlugin],
});
```

Para instalar diretamente o plugin de outras pessoas, você também pode colocar os hooks do plugin diretamente em `plugins`:

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

## Criar plugin

### Criar com base em Hook

Criar um plugin é simples. Um plugin é composto por uma coleção de [hooks](./config.md#hooks-de-comentario).

```js
module.exports = {
  hooks: {
    async postSave() {
      // do what ever you want after comment saved
    },
  },
};
```

Vale observar que, se o usuário instalar vários plugins de Hook, a execução da mesma função de hook ocorre na ordem em que os plugins foram instalados. Se o método de pré-hook retornar antecipadamente, nenhuma operação subsequente será executada.

### Criar com base em middleware

Se o Hook não atender às suas necessidades, você pode usar o modo middleware, mais poderoso, para personalizar o desenvolvimento. A camada inferior do Waline usa o framework Node.js [Koa](https://koajs.com), e expomos toda a configuração de middleware do Koa, o que pode atender às diversas necessidades de personalização de desenvolvedores avançados.

Se você não sabe o que é um middleware do Koa, pode pesquisar primeiro. O que você precisa observar ao usar o modo middleware para criar plugins é que o método de callback deve escrever a execução de `await next()`, caso contrário as operações seguintes não serão executadas.

```js
module.exports = {
  middlewares: [
    async (ctx, next) => {
      await next();
    },
  ],
};
```

Claro, você pode juntar a lógica de plugins do tipo Hook e de plugins do tipo middleware; o Waline suporta ambos.

### Lista de plugins

Boas-vindas para enviar plugins~

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
