---
title: Système de plugins
icon: api
---

Les utilisateurs peuvent étendre les fonctions de hook personnalisées grâce aux Hooks fournis par Waline afin de réaliser des fonctionnalités sur mesure. Mais si un utilisateur souhaite partager ses méthodes Hook personnalisées, il n'a d'autre choix que de les copier. Pour résoudre ce problème, le système de plugins de Waline a vu le jour.

## Installer le plugin

Une nouvelle propriété `plugins` a été ajoutée à la configuration initiale de Waline ; elle prend en charge la configuration de plusieurs plugins.

```js
// index.js
const Waline = require('@waline/vercel');
const HelloWorldPlugin = require('@waline-plugins/hello-world');

module.exports = Waline({
  plugins: [HelloWorldPlugin],
});
```

Pour installer directement le plugin de quelqu'un d'autre, vous pouvez également placer les hooks du plugin directement dans `plugins` :

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

## Créer un plugin

### Créer un plugin à partir des Hooks

Créer un plugin est simple. Un plugin est constitué d'une collection de [hooks](./config.md#hooks-de-commentaires).

```js
module.exports = {
  hooks: {
    async postSave() {
      // do what ever you want after comment saved
    },
  },
};
```

Il faut noter que si l'utilisateur installe plusieurs plugins de type Hook, l'exécution d'une même fonction de hook se fait dans l'ordre d'installation des plugins. Si une méthode pre-hook renvoie une valeur de façon anticipée, aucune opération suivante n'est effectuée.

### Créer un plugin à partir d'un middleware

Si les Hooks ne répondent pas à vos besoins, vous pouvez utiliser le mode middleware, plus puissant, pour un développement personnalisé. La couche basse de Waline utilise le framework Node.js [Koa](https://koajs.com), et nous exposons l'intégralité de la configuration des middlewares de Koa, ce qui permet de répondre à divers besoins de personnalisation des développeurs avancés.

Si vous ne savez pas ce qu'est un middleware Koa, vous pouvez commencer par vous renseigner. Ce qu'il faut garder à l'esprit lorsque vous utilisez le mode middleware pour créer des plugins, c'est que la méthode de rappel doit contenir l'exécution de `await next()`, sinon les opérations suivantes ne seront pas exécutées.

```js
module.exports = {
  middlewares: [
    async (ctx, next) => {
      await next();
    },
  ],
};
```

Bien entendu, vous pouvez regrouper la logique des plugins de type Hook et celle des plugins de type middleware : Waline prend les deux en charge.

### Liste des plugins

Vous êtes invités à soumettre vos plugins ~

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
