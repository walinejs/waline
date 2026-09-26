---
title: 페이지뷰 카운터
icon: counter
order: 7
---

Waline은 페이지뷰 카운팅을 지원합니다.

<!-- more -->

## 댓글과 함께 사용

Waline의 댓글 서비스를 사용하고 있다면, 초기화 시 `pageview` 옵션을 `true`로 설정하여 페이지뷰 통계를 활성화할 수 있습니다:

```js
Waline.init({
  el: '#waline',
  // ...
  pageview: true, // pageview statistics
});
```

Waline은 페이지에서 `class` 값이 `waline-pageview-count`인 요소를 자동으로 찾고, 해당 요소의 `data-path`를 쿼리 조건으로 사용합니다. 그리고 가져온 값으로 채웁니다:

다른 선택자가 필요한 경우, `pageview` 옵션을 해당 선택자로 설정할 수 있습니다.

```html
<!-- data-path will be the query condition -->
Pageviews: <span class="waline-pageview-count" data-path="<Your/Path/Name>"></i>
```

`WalineInstance.update()`를 호출할 때마다 Waline은 페이지 콘텐츠를 다시 검색하고 페이지뷰를 자동으로 업데이트합니다.

::: tip 예시

```html
The current page has been viewed
<span class="waline-pageview-count" data-path="/ko-KR/guide/client/count.html" />
times.
```

현재 페이지 조회수:
<span class="waline-pageview-count" data-path="/ko-KR/guide/client/count.html" /> 회.

:::

## 단독 사용

페이지뷰 통계 기능만 사용하려면, Waline에서 제공하는 pageview 모듈을 가져올 수 있습니다. Gzip 크기는 1KB 미만입니다.

```html
<ul>
  <li>
    Current page views:
    <span class="waline-pageview-count" />
  </li>
  <li>
    Page Views:
    <span class="waline-pageview-count" data-path="/" />
  </li>
</ul>
<script type="module">
  import { pageviewCount } from 'https://unpkg.com/@waline/client@v3/dist/pageview.js';

  pageviewCount({
    serverURL: '<YOUR_SERVER_URL>',
    path: window.location.pathname,

    // optional, for custom selectors, defaults to `'.waline-pageview-count'`
    // selector: 'waline-pageview-count',

    // optional, whether to increase the number of visits when fetching, the default is `true`
    // update: true,
  });
</script>
```

- 현재 페이지 조회수: <span class="waline-pageview-count" />

- 홈페이지 조회수: <span class="waline-pageview-count" data-path="/" />

::: info 중단

페이지뷰 가져오기는 비동기 네트워크 작업이므로, 특정 상황에서 진행 중인 페이지뷰 업데이트 작업을 취소해야 할 수 있습니다.

`pageviewCount`는 업데이트를 취소하기 위해 호출할 수 있는 함수를 반환합니다:

```html
<script type="module">
  import { pageviewCount } from 'https://unpkg.com/@waline/client@v3/dist/pageview.js';

  const abort = Waline.pageviewCount({
    serverURL: '<YOUR_SERVER_URL>',
    path: window.location.pathname,
  });

  // After 500ms, if the network request has not been completed, cancel this operation
  setTimeout(() => abort(), 500);
</script>
```

:::
