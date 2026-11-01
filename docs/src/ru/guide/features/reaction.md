---
title: Реакции на статью
icon: reaction
order: 4
---

Waline позволяет пользователям выражать своё отношение к содержимому статьи.

<!-- more -->

## Начало работы

Чтобы быстро включить реакции, установите для параметра `reaction` значение `true` — отобразится список реакций по умолчанию:

```js
Waline.init({
  el: '#waline',
  // ...
  reaction: true, // start the reaction
});
```

Waline отобразит список реакций по умолчанию над полем комментариев.

## Настройка реакций

Если нужно настроить эти эмоции-реакции, можно передать массив, содержащий ссылки на изображения эмоций-реакций, которые будут предложены пользователю:

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

Кроме того, заголовок блока реакций можно настроить через `reactionTitle` в `locale`, а названия реакций — через `reaction0` … `reaction8`, см. [Настройка языков](./i18n.md) .

## Меры предосторожности

::: tip Ограничение количества

Waline поддерживает до 9 реакций, можно без проблем добавить и меньше 9 реакций.

:::

::: warning Правила подсчёта

Подсчёт реакций основан на позиции.

Если нужно изменить порядок и состав реакций, подробности см. в [#1451](https://github.com/walinejs/waline/issues/1451#issuecomment-1264555264).

:::
