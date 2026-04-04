---
title: 記事へのリアクション
icon: reaction
order: 4
---

Waline では、ユーザーが記事の内容に対してリアクションを表現できます。

<!-- more -->

## はじめに

リアクションをすぐに有効にするには、`reaction` オプションを `true` に設定してデフォルトのリアクション一覧を表示します:

```js
Waline.init({
  el: '#waline',
  // ...
  reaction: true, // start the reaction
});
```

Waline はコメントボックスの上にデフォルトのリアクション一覧を表示します。

## リアクションのカスタマイズ

リアクションの絵文字をカスタマイズしたい場合は、リアクション絵文字画像のリンクを含む配列を渡すことで、ユーザーが選択できるリアクションを指定できます:

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

また、`locale` の `reactionTitle` でリアクションのタイトルをカスタマイズし、`reaction0` から `reaction8` でリアクション表現の名前をカスタマイズできます。詳細は [多言語設定](./i18n.md) を参照してください。

## 注意事項

::: tip 数の制限

Waline は最大 9 つのリアクションをサポートしており、9 つ未満であれば問題なく追加できます。

:::

::: warning カウントのルール

リアクションのカウントは位置に基づいて行われます。

リアクションの順序を変更・調整する必要がある場合は、[#1451](https://github.com/walinejs/waline/issues/1451#issuecomment-1264555264) を参照してください。

:::
