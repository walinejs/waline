---
title: 최근 댓글 위젯
icon: recent
---

Waline은 위젯을 통해 최근 댓글을 표시하는 기능을 지원하며, 블로그 사이드바에 최신 댓글을 표시하는 데 편리합니다.

<!-- more -->

## 컴포넌트 옵션

최근 댓글 위젯의 이름은 `RecentComments`이며, 세 가지 옵션을 포함합니다:

- `el` (선택 사항): 마운트할 요소
- `serverURL`: 서버 링크
- `count`: 가져올 최근 댓글 수

컴포넌트가 반환하는 데이터 형식은 `Promise<{ comment: WalineComment[], destroy: () => void }>`입니다.

- `comment` 속성: `count` 수만큼의 최근 댓글 배열
- `destroy` 메서드: 위젯을 파괴하는 함수

## 기본 사용법

```html
<div id="waline-recent"></div>
<script type="module">
  import { RecentComments } from 'https://cdn.jsdelivr.net/npm/@waline/client/dist/waline.mjs';

  RecentComments({
    el: '#waline-recent',
    serverURL: 'http://waline.vercel.app',
    count: 10,
  });
</script>
```

::: tip

이것은 기본 스타일을 사용하여 `#waline-recent`에 렌더링됩니다.

:::

## 고급 사용법

기본 출력 형식이 만족스럽지 않은 경우, `el` 옵션을 생략하고 컴포넌트를 호출하여 데이터를 가져온 후 직접 렌더링할 수 있습니다.

예시:

```html
<div id="waline-recent"></div>
<script type="module">
  import { RecentComments } from 'https://cdn.jsdelivr.net/npm/@waline/client/dist/waline.mjs';

  RecentComments({
    serverURL: 'http://waline.vercel.app',
    count: 10,
  }).then(({ comments }) => {
    document.getElementById('waline-recent').innerHTML = comments.map(
      (comment) => `${comment.nick}: ${comment.comment}`,
    );
  });
</script>
```
