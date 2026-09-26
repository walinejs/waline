---
title: 댓글 수 카운터
icon: counter
order: 8
---

Waline은 댓글 영역 외부에서 댓글 수를 별도로 표시하는 기능을 지원합니다.

<!-- more -->

## 자동 업데이트

`init` 함수에서 `comment` 옵션을 `true`로 설정하면 댓글 수 카운팅을 활성화할 수 있습니다.

```html
<script type="module">
  import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

  init({
    el: '#waline',
    // ...
    comment: true, // enable comment counting
  });
</script>
```

Waline은 `init` 함수를 호출하거나 경로를 업데이트할 때마다 댓글 수를 채우거나 업데이트하려고 시도합니다.

Waline은 페이지에서 `waline-comment-count` 클래스를 가진 요소를 찾고, `data-path` 속성을 쿼리 조건으로 사용합니다. 그리고 얻은 값으로 채웁니다:

```html
<!-- data-path will be the query condition -->
<span data-path="<Your/Path/Name>" class="waline-comment-count" /> comments
```

다른 선택자가 필요한 경우, `comment` 옵션을 해당 선택자로 설정할 수 있습니다.

`WalineInstance.update()`를 호출할 때마다 Waline은 페이지 콘텐츠를 검색하고 댓글 수를 자동으로 업데이트합니다.

::: tip 예시

```html
The current page has <span class="waline-comment-count" /> comments, the home page has
<span data-path="/ko-KR/" class="waline-comment-count" /> comments.
```

현재 페이지에는 <span class="waline-comment-count" /> 개의 댓글이 있고, 홈페이지에는
<span data-path="/ko-KR/" class="waline-comment-count" /> 개의 댓글이 있습니다.

:::

## 수동 업데이트

`init` 함수를 통한 자동 업데이트 외에도, `commentCount` API를 사용하여 현재 페이지의 댓글 수를 수동으로 업데이트할 수 있습니다:

```html
<script type="module">
  import { commentCount } from 'https://unpkg.com/@waline/client@v3/dist/comment.js';

  commentCount({
    serverURL,
    path,

    // optional, for custom selectors, defaults to `'.waline-pageview-count'`
    // selector: '.waline-pageview-count',
  });
</script>
```

::: info 중단하기

댓글 수 가져오기는 비동기 네트워크 작업이므로, 특정 상황에서 진행 중인 댓글 수 업데이트 작업을 취소해야 할 수 있습니다.

`commentCount`는 업데이트를 취소하기 위해 호출할 수 있는 함수를 반환합니다:

```js
const abort = Waline.commentCount({
  serverURL: '<YOUR_SERVER_URL>',
  path: window.location.pathname,
});

// After 500ms, if the network request has not been completed, cancel this operation
setTimeout(() => abort(), 500);
```

:::

## 카운터만 가져오기

때때로 글 목록이나 홈페이지에서 일부 페이지의 댓글 수를 표시하고 싶지만, 전체 Waline을 로드하고 싶지 않을 수 있습니다. 이 경우 Gzip < 1KB의 `comment` 모듈을 사용할 수 있습니다:

```html
<script type="module">
  import { commentCount } from 'https://unpkg.com/@waline/client@v3/dist/comment.js';

  commentCount({
    serverURL,
    path,

    // optional, for custom selectors, defaults to `'.waline-pageview-count'`
    // selector: '.waline-pageview-count',
  });
</script>
```

<script setup>
import { walineOptions } from '@source/.vuepress/client.ts'
import { commentCount } from '@waline/client/comment'
import { onMounted } from 'vue'
import { useRoute } from 'vuepress/client'

const { serverURL } = walineOptions
const route = useRoute()

onMounted(()=>{
  commentCount({
    serverURL: serverURL,
    path: route.path,
  })
})
</script>
