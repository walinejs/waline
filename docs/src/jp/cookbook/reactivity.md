---
title: リアクティブな Waline インスタンス
icon: spa
order: -1
---

公式クライアント `@waline/client` は Vue3 をベースにしており、リアクティブなコンポーネントとインスタンスを提供することで、SPA（**S**ingle **P**age **A**application）をサポートします。

<!-- more -->

## Vue コンポーネント

Vue プロジェクトを構築している場合は、`@waline/client/component` から名前付きエクスポート `Waline` をインポートすることで、Waline コンポーネントを取得して利用できます。

コンポーネントのすべてのプロパティはリアクティブです。つまり、プロパティを変更すると、コメントボックスが自動的に更新されます。

## その他のプロジェクト

その他の SPA では、Waline の初期化時に Waline 関数が返す `WalineInstance` を保持しておく必要があります。

`WalineInstance` には、インスタンスプロパティ `el` と、`update()`・`destroy()` の 2 つのメソッドがあります。

### update

`update()` を呼び出すことで、いつでも Waline を更新できます（例: ユーザーが新しいルートに遷移したとき）。`update` メソッドは省略可能なパラメータ `options` を受け取り、`el` を除く Waline の初期オプションは新しい値を渡して更新できます。

例:

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

`update` を呼び出すと、現在のオプションと履歴のオプションが**浅いコピー**でマージされ、Waline インスタンスが新しいオプションで更新されます（新しいオプションは保存されます）。

このメソッドのデフォルトの動作では、まだ設定されていないオプションについては常に**デフォルト値を再生成**し、設定済みのオプションについては**履歴の値を使用**します。

特に注意が必要なオプションが 2 つあります。`path` と `locale` です。

::: warning path の注意点

V2 では、`update()` の呼び出し時に `path` パラメータが**常にリセット**されます。

つまり、どのような更新でも `path` を指定しなければ、`path` は `window.location.pathname` にリセットされます。

:::

::: warning locale の注意点

浅いコピーのため、古い `locale` オプションは `update` で渡された新しい `locale` オプションによって完全に上書きされます。

私たちの意図は、ユーザーは通常 locale を更新するときに表示言語を切り替えたいはずだという点にあります。そのため、これをプラグインの期待される動作としています。これは、`update({ locale: {} })` を使って履歴上のカスタム locale 設定をクリアできることも意味します。

`locale` 内の特定のフィールドだけを更新する必要がある場合は、更新後の `locale` 全体を渡す必要があります。

:::

また、`update()` のオプションは非同期のネットワークリクエスト向けに最適化されており、次のような特徴があります:

- パスが実際に変更された場合にのみ、コメントエリアを更新して再リクエストします
- 新しい `update()` の呼び出しは、前の `update()` による不要になったリクエストを自動的に中断します。

### el

`el` プロパティは、Waline の現在のインスタンスがマウントされている HTMLElement です。

`el: null` で Waline を初期化した場合（コメントと閲覧数の統計のみを使用）、このプロパティは `null` になります。

### destroy

`destroy()` メソッドは Waline インスタンスを破棄します。また、Waline がマウントされている要素の内容もすべてクリアします。

### 初期化の失敗

`serverURL` の設定を忘れた場合や、ページ上の `el` オプションで Waline がマウント位置を見つけられない場合、Waline は `WalineErrorInstance` を返します。

`WalineErrorInstance` には、初期化の失敗理由を示す `errMsg` という属性が 1 つだけあります。

### 注意事項

::: warning インスタンスの破棄を忘れずに

Waline がリソースを正しく解放できるよう、Waline をマウントしている要素を削除する前に、手動で `WalineInstance.destroy()` を呼び出してください。

そうしないと、一部のリスナーが適切に削除されない可能性があります。

:::
