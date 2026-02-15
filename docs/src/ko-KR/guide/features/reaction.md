---
title: 게시글 반응
icon: reaction
order: 4
---

Waline은 사용자가 게시글 콘텐츠에 대해 반응을 표현할 수 있도록 합니다.

<!-- more -->

## 시작하기

반응 기능을 빠르게 활성화하려면 `reaction` 옵션을 `true`로 설정하여 기본 반응 목록을 표시할 수 있습니다:

```js
Waline.init({
  el: '#waline',
  // ...
  reaction: true, // start the reaction
});
```

Waline은 댓글 상자 위에 기본 반응 목록을 표시합니다.

## 반응 맞춤 설정

반응 이모티콘을 맞춤 설정하려면, 사용자가 선택할 수 있는 반응 이모티콘 이미지 링크가 포함된 배열을 전달할 수 있습니다:

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

또한, `locale`의 `reactionTitle`을 통해 반응의 제목을 맞춤 설정할 수 있으며, `reaction0`부터 `reaction8`까지를 통해 반응 표현의 이름을 맞춤 설정할 수도 있습니다. [다국어 설정](./i18n.md)을 참조하세요.

## 주의사항

::: tip 개수 제한

Waline은 최대 9개의 반응을 지원하며, 9개 미만의 반응을 추가해도 문제없이 작동합니다.

:::

::: warning 카운팅 규칙

반응의 카운팅은 위치를 기반으로 합니다.

반응의 순서를 변경하거나 조정해야 하는 경우, [#1451](https://github.com/walinejs/waline/issues/1451#issuecomment-1264555264)에서 자세한 내용을 확인하세요.

:::
