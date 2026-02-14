---
title: Article Reactions
icon: reaction
order: 4
---

Waline allows users to express reactions for article content.

<!-- more -->

## Getting Started

To quickly enable reactions, you can set the `reaction` option to `true` to display a default list of reactions:

```js
Waline.init({
  el: '#waline',
  // ...
  reaction: true, // start the reaction
});
```

Waline will display the default list of reactions above the comment box.

## Customize Reactions

If you need to customize these reaction emoticons, you can pass in an array containing the link of the reaction emoticon image, representing reactions you want the user to choose with:

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

Meanwhile, you can customize the title of the reaction through `reactionTitle` in `locale`, and you can also customize the name of the reaction expression through `reaction0` to `reaction8`, see [Multilingual Settings](./i18n.md) .

## Precautions

::: tip Number Limitation

Waline supports up to 9 reactions, and you can add less than 9 reactions without any problems.

:::

::: warning Counting Rules

Counting of reactions is based on location.

If you need to reorder and adjust the reactions, check [#1451](https://github.com/walinejs/waline/issues/1451#issuecomment-1264555264) for more details.

:::
