---
title: プラグインシステム
icon: api
---

ユーザーはWalineが提供するHookを通じてカスタムフック関数を拡張し、独自の機能を実現できます。しかし、カスタムHookメソッドを他のユーザーと共有したい場合は、コピーによる方法しかありませんでした。この問題を解決するために、Walineプラグインシステムが生まれました。

## プラグインのインストール

Walineの初期設定に新しい`plugins`属性が追加され、複数のプラグインを設定できるようになりました。

```js
// index.js
const Waline = require('@waline/vercel');
const HelloWorldPlugin = require('@waline-plugins/hello-world');

module.exports = Waline({
  plugins: [HelloWorldPlugin],
});
```

他のユーザーのプラグインを直接インストールする代わりに、プラグインのhookを`plugins`に直接記述することもできます：

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

## プラグインの作成

### Hookベースの作成

プラグインの作成は簡単です。プラグインは[フック](./config.md#hooks)の集合で構成されます。

```js
module.exports = {
  hooks: {
    async postSave() {
      // do what ever you want after comment saved
    },
  },
};
```

注意すべき点として、ユーザーが複数のHookプラグインをインストールした場合、同じフック関数の実行はプラグインがインストールされた順序で行われます。pre-hookメソッドが早期に返った場合、それ以降の処理は実行されません。

### ミドルウェアベースの作成

Hookでニーズを満たせない場合は、より強力なミドルウェアモードを使用してカスタム開発ができます。Walineの基盤はNode.jsフレームワーク[Koa](https://koajs.com)であり、Koaのミドルウェア設定を全体として公開しており、上級開発者のさまざまなカスタマイズニーズを満たすことができます。

Koaのミドルウェアが何かわからない場合は、まず調べてみてください。ミドルウェアモードでプラグインを作成する際に注意すべき点は、コールバックメソッドに必ず`await next()`の実行を記述する必要があるということです。そうでないと後続の処理が実行されません。

```js
module.exports = {
  middlewares: [
    async (ctx, next) => {
      await next();
    },
  ],
};
```

もちろん、Hookタイプのプラグインとミドルウェアタイプのプラグインのロジックを一緒にまとめることもできます。Walineはそれらをサポートしています。

### プラグイン一覧

プラグインの投稿を歓迎します！

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
