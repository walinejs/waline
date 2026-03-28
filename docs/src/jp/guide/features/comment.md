---
title: コメントカウンター
icon: counter
order: 8
---

Waline は、コメントエリア以外の場所でコメント数を個別に表示することをサポートしています。

<!-- more -->

## 自動更新

`init` 関数で `comment` オプションを `true` に設定することで、コメントカウントを有効にできます。

```html
<script type="module">
  import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

  init({
    el: '#waline',
    // ...
    comment: true, // コメントカウントを有効にする
  });
</script>
```

`init` 関数を呼び出したり、パスを更新したりするたびに、Waline はコメント数の入力または更新を試みます。

Waline はページ内で `waline-comment-count` クラスを持つ要素を探し、それらの `data-path` 属性をクエリ条件として取得します。そして取得した値を要素に反映します:

```html
<!-- data-path がクエリ条件になります -->
<span data-path="<Your/Path/Name>" class="waline-comment-count" /> comments
```

異なるセレクターが必要な場合は、`comment` オプションにそのセレクターを設定できます。

`WalineInstance.update()` を呼び出すたびに、Waline はページ内容を検索してコメント数を自動更新します。

::: tip 例

```html
The current page has <span class="waline-comment-count" /> comments, the home page has
<span data-path="/jp/" class="waline-comment-count" /> comments.
```

このページのコメント数は <span class="waline-comment-count" /> 件、
ホームページのコメント数は <span data-path="/jp/" class="waline-comment-count" /> 件です。

:::

## 手動更新

`init` 関数による自動更新に加えて、`commentCount` API を使って現在のページのコメント数を手動で更新することもできます:

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

::: info 中断

コメント数の取得は非同期のネットワーク操作であるため、状況によっては進行中のコメント数更新操作をキャンセルする必要が生じることがあります。

`commentCount` はキャンセルに使える関数を返します:

```js
const abort = Waline.commentCount({
  serverURL: '<YOUR_SERVER_URL>',
  path: window.location.pathname,
});

// After 500ms, if the network request has not been completed, cancel this operation
setTimeout(() => abort(), 500);
```

:::

## カウンターのみのインポート

記事一覧やホームページで一部のページのコメント数を表示したいが、Waline 全体を読み込みたくない場合があります。そのような場合は Gzip サイズが 1KB 未満の `comment` モジュールを使用できます:

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
