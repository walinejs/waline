---
title: CDN을 통한 Waline 가져오기
icon: import
order: 1
---

이 쿡북은 CDN을 통해 Waline을 가져오는 방법에 대한 것입니다.

<!-- more -->

중국 본토 사용자의 경우 [unpkg](https://unpkg.com/@waline/client) 사용을 권장합니다. 해외 사용자의 경우 jsDelivr 사용을 권장합니다.

V3부터 Waline의 스타일은 클라이언트를 SSR 친화적으로 유지하기 위해 별도의 CSS 파일로 제공됩니다. 이는 Waline의 CSS 스타일 파일을 가져온 다음, Waline 스크립트 파일을 가져와 호출해야 한다는 의미입니다.

## 댓글

일반적으로 Waline이 댓글 목록을 렌더링하도록 하려면, 다음과 같이 Waline을 가져올 수 있습니다:

```html
<!-- style file -->
<link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css" />
<!-- script file -->
<script type="module">
  import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

  init({
    // options
  });
</script>
```

## 페이지뷰 및 댓글 수

때때로 홈 페이지나 글 목록에서 글의 페이지뷰 수와 댓글 수를 표시하고 싶지만, 댓글 컴포넌트를 로드할 필요는 없는 경우가 있습니다. 이 경우 다음과 같이 Gzip < 1KB 크기의 스크립트 파일을 가져올 수 있습니다:

페이지뷰:

```html
<script type="module">
  import { pageviewCount } from 'https://unpkg.com/@waline/client@v3/dist/pageview.js';

  pageviewCount({
    // options
  });
</script>
```

댓글 수:

```html
<script type="module">
  import { commentCount } from 'https://unpkg.com/@waline/client@v3/dist/comment.js';

  commentCount({
    // options
  });
</script>
```

## 더 보기

::: info 버전 지정

위의 예시에서 `@waline/client` 뒤에 `@v3` 버전을 명시적으로 선언한 것을 눈치채셨을 것입니다. 이는 새로운 메이저 버전의 Waline 클라이언트가 출시될 때 웹사이트가 깨지는 것을 방지하므로 권장됩니다.

:::
