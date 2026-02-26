---
title: リアクティブな Waline インスタンス
icon: spa
order: -1
---

公式クライアント `@waline/client` は Vue3 をベースとしており、リアクティブなコンポーネントとインスタンスを提供し、SPA (**S**ingle **P**age **A**pplication) のサポートをもたらします。

<!-- more -->

## Vue コンポーネント

Vue プロジェクトを構築している場合、`@waline/client/components` から名前付きエクスポート `Waline` をインポートすることで、Waline コンポーネントを取得して使用できます。

すべてのコンポーネントプロパティはリアクティブです。つまり、プロパティを変更すると、コメントボックスは自動的に更新されます。

## その他のプロジェクト

その他の SPA では、Waline の初期化時に Waline 関数から返される `WalineInstance` を保存する必要があります。

`WalineInstance` には、インスタンスプロパティ `el` と、`update()` および `destroy()` の2つのメソッドがあります。

### update

`update()` をいつでも呼び出して Waline を更新できます（例：ユーザーが新しいルートを訪問したとき）。`update` メソッドはオプションのパラメーター `options` を受け取り、`el` を除くその他の Waline 初期オプションは新しい値を渡すことで更新できます。

例：

```js
// in `/` route
const waline = Waline.init({
  serverURL: 'https://example.com',
});

/* User: after some time, route has changed to `/a.html` */

waline.update(); // Now waline will start clear the comment and show a loading state.
// After some time, the counter and comments will be all updated

waline.update({
  lang: 'en',
  login: 'disable',
}); // waline will now display in English, and disable user login
```

#### 動作原理

`update` を呼び出すと、現在のオプションと過去のオプションが**シャローコピー**によってマージされ、Waline インスタンスは新しいオプションで更新されます（そして新しいオプションが保存されます）。

このメソッドのデフォルトの動作は、まだ設定されていないオプションについては常に**デフォルト値を再生成**し、設定済みのオプションについては**過去の値を使用**することです。

特に注意が必要なオプションが2つあります：`path` と `locale` です。

::: warning path に関する注意事項

V2 では、`path` パラメーターは `update()` 呼び出しのたびに**常にリセット**されます。

これは、`path` を指定しない限り、どの更新でも `path` が `window.location.pathname` にリセットされることを意味します。

:::

::: warning locale に関する注意事項

シャローコピーのため、古い `locale` オプションは `update` で渡された新しい `locale` オプションによって完全に上書きされます。

私たちの考えは、ユーザーは通常 locale を更新する際に表示言語を切り替えたいため、これをプラグインの期待される動作として設定しています。また、`update({ locale: {} })` を使用して過去のカスタム locale 設定をクリアすることもできます。

`locale` 内の特定のフィールドだけを更新する必要がある場合は、更新済みの `locale` 全体を渡す必要があります。

:::

また、`update()` は非同期ネットワークリクエストに対して最適化されており、以下が含まれます：

- パスが実際に変更された場合のみコメントエリアを更新して再リクエストする
- 新しい `update()` の呼び出しは、前の `update()` から不要になったリクエストを自動的に中断する

### el

`el` プロパティは、Waline の現在のインスタンスがマウントされている HTMLElement です。

`el: null` で Waline を初期化した場合（コメントとページビュー統計のみを使用する場合）、このプロパティは `null` になります。

### destroy

`serverURL` を渡し忘れた場合、またはページ上の `el` オプションを通じて Waline がマウント場所を見つけられない場合、Waline はエラーの理由を示す Error をスローします。

### 初期化の失敗

`serverURL` の設定を忘れた場合、またはページ上の `el` オプションを通じて Waline がマウント場所を見つけられない場合、Waline は `WalineErrorInstance` を返します。

`WalineErrorInstance` には、初期化失敗の理由を示す属性 `errMsg` のみがあります。

### 注意事項

::: warning インスタンスの破棄を忘れずに

Waline が適切にリソースを解放できるよう、Waline がマウントされている要素を削除する前に、手動で `WalineInstance.destroy()` を呼び出してください。

そうしないと、一部のリスナーが正しく削除されない場合があります。

:::
