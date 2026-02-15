---
title: 사용자 순위 목록/사용자 월 위젯
icon: rank
---

Waline은 위젯을 통해 사용자 순위 목록이나 사용자 월을 표시하는 기능을 지원하며, 블로그 사이드바에 댓글 작성자 정보를 표시하는 데 편리합니다.

<!-- more -->

## 컴포넌트 옵션

사용자 순위 목록/사용자 월 위젯의 이름은 `UserList`이며, 여섯 가지 옵션을 포함합니다:

- `el` (선택 사항): 마운트할 요소
- `serverURL`: 서버 링크
- `count`: 가져올 사용자 수
- `mode`: `list`는 사용자 순위 목록, `wall`은 사용자 월을 의미합니다
- `lang`: 다국어 지원, 자세한 내용은 [다국어](../i18n.md)를 참조하세요
- `locale`: 언어 사용자 정의, 자세한 내용은 [다국어](../i18n.md)를 참조하세요

컴포넌트가 반환하는 데이터 형식은 `Promise<{ users: WalineUser[], destroy: () => void }>`입니다.

- `users` 속성: `count` 수만큼의 사용자 목록 배열
- `destroy` 메서드: 위젯을 파괴하는 함수

## 기본 사용법

### 사용자 순위 목록

```html
<div id="waline-users"></div>
<script type="module">
  import { UserList } from 'https://cdn.jsdelivr.net/npm/@waline/client/dist/waline.mjs';

  UserList({
    el: '#waline-users',
    serverURL: 'http://waline.vercel.app',
    count: 10,
  });
</script>
```

### 사용자 월

```html
<div id="waline-users"></div>
<script type="module">
  import { UserList } from 'https://cdn.jsdelivr.net/npm/@waline/client/dist/waline.mjs';

  UserList({
    el: '#waline-users',
    serverURL: 'http://waline.vercel.app',
    count: 50,
    mode: 'wall',
  });
</script>
```

## 고급 사용법

기본 출력 형식이 만족스럽지 않은 경우, `el` 옵션을 생략하고 컴포넌트를 호출하여 데이터를 가져온 후 직접 렌더링할 수 있습니다.

예시:

```html
<div id="waline-users"></div>
<script type="module">
  import { UserList } from 'https://cdn.jsdelivr.net/npm/@waline/client/dist/waline.mjs';

  UserList({ serverURL: 'http://waline.vercel.app', count: 10 }).then(({ users }) => {
    document.getElementById('waline-users').innerHTML = users.map(
      (user) => `<a href="${user.link}">${user.nick}</a>`,
    );
  });
</script>
```
