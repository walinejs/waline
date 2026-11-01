---
title: 記事へのリアクション
icon: reaction
order: 4
---

Waline では、ユーザーが記事の内容に対してリアクションを表明できます。

<!-- more -->

## はじめに

すぐにリアクションを有効にしたい場合は、`reaction` オプションを `true` に設定すると、デフォルトのリアクション一覧が表示されます：

```js
Waline.init({
  el: '#waline',
  // ...
  reaction: true, // start the reaction
});
```

Waline はコメント欄の上にデフォルトのリアクション一覧を表示します。

## リアクションのカスタマイズ

リアクションの絵文字をカスタマイズしたい場合は、ユーザーに選んでほしいリアクション画像のリンクを含む配列を渡します：

```js
Waline.init({
  el: '#waline',
  // ...
  reaction: [
    'https://unpkg.com/@waline/emojis@1.1.0/weibo/weibo_heart_eyes.png',
    'https://unpkg.com/@waline/emojis@1.1.0/weibo/weibo_dog_joy.png',
    'https://unpkg.com/@waline/emojis@1.1.0/weibo/weibo_dog_consider.png',
    'https://unpkg.com/@waline/emojis@1.1.0/weibo/weibo_sob.png',
  ],
});
```

また、`locale` の `reactionTitle` でリアクションのタイトルを、`reaction0` から `reaction8` で各リアクション表現の名前をカスタマイズできます。詳しくは [多言語設定](./i18n.md) を参照してください。

## 注意事項

::: tip 数の上限

Waline は最大 9 個のリアクションに対応しています。9 個未満であれば問題なく設定できます。

:::

::: warning カウントのルール

リアクションのカウントは位置に基づいて行われます。

リアクションの並び替えや調整を行う場合は、詳細について [#1451](https://github.com/walinejs/waline/issues/1451#issuecomment-1264555264) を確認してください。

:::
