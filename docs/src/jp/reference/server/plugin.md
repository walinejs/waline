---
title: プラグインシステム
icon: api
---

ユーザーは Waline が提供するフック関数を拡張して独自の機能を実現できます。しかし、カスタムフックのメソッドを共有したい場合はコピーする方法しかありませんでした。この問題を解決するために、Waline のプラグインシステムが生まれました。

## プラグインのインストール

Waline の初期設定に新しい `plugins` 属性が追加され、複数のプラグインを設定できるようになりました。

```js
// index.js
const Waline = require('@waline/vercel');
const HelloWorldPlugin = require('@waline-plugins/hello-world');

module.exports = Waline({
  plugins: [HelloWorldPlugin],
});
```

他の人のプラグインを直接インストールする代わりに、プラグインのフックを `plugins` に直接記述することもできます：

```js
// index.js
const Waline = require('@waline/vercel');
const HelloWorldPlugin = require('@waline-plugins/hello-world');

module.exports = Waline({
  plugins: [
    {
      hooks: {
        async postSave() {
          // コメントの保存後に任意の処理を行えます
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

### フックをベースに作成する

プラグインの作成は簡単です。プラグインは[フック](./config.md#コメントフック)の集合で構成されます。

```js
module.exports = {
  hooks: {
    async postSave() {
      // コメントの保存後に任意の処理を行えます
    },
  },
};
```

ユーザーが複数のフックプラグインをインストールした場合、同じフック関数はプラグインをインストールした順に実行される点に注意してください。pre フックのメソッドが早期に値を返した場合、以降の操作は実行されません。

### ミドルウェアをベースに作成する

フックでニーズを満たせない場合は、より強力なミドルウェアモードを使ってカスタム開発ができます。Waline の基盤は Node.js フレームワークの [Koa](https://koajs.com) を使用しており、Koa のミドルウェア設定をそのまま公開しているため、上級開発者のさまざまなカスタマイズ要件に対応できます。

Koa のミドルウェアについてご存じない場合は、まず調べてみてください。ミドルウェアモードでプラグインを作成する際に注意すべき点は、コールバックメソッドで必ず `await next()` を実行することです。そうしないと後続の操作が実行されません。

```js
module.exports = {
  middlewares: [
    async (ctx, next) => {
      await next();
    },
  ],
};
```

もちろん、フック型プラグインのロジックとミドルウェア型プラグインのロジックをまとめて記述することもでき、Waline はそれをサポートしています。

### プラグイン一覧

プラグインの投稿を歓迎します〜

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
