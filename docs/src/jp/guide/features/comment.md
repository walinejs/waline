---
title: コメント数カウンター
icon: counter
order: 8
---

Waline はコメント欄以外の場所にコメント数を個別に表示できます。

<!-- more -->

## 自動更新

`init` 関数で `comment` オプションを `true` に設定すると、コメント数のカウントを有効にできます。

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

Waline は `init` 関数を呼び出したときやパスを更新したときに、コメント数の反映や更新を試みます。

Waline はページ内から `waline-comment-count` クラスを持つ要素を探し、その `data-path` 属性をクエリ条件として取得します。そして取得した値をその要素に埋め込みます：

```html
<!-- data-path will be the query condition -->
<span data-path="<Your/Path/Name>" class="waline-comment-count" /> comments
```

別のセレクターを使いたい場合は、`comment` オプションにそのセレクターを設定してください。

`WalineInstance.update()` を呼び出すたびに、Waline はページの内容を検索し、コメント数を自動的に更新します。

::: tip 例

```html
The current page has <span class="waline-comment-count" /> comments, the home page has
<span data-path="/en/" class="waline-comment-count" /> comments.
```

現在のページには <span class="waline-comment-count" /> 件のコメントがあり、ホームページには
<span data-path="/en/" class="waline-comment-count" /> 件のコメントがあります。

:::

## 手動更新

`init` 関数による自動更新のほか、`commentCount` API を使って現在のページのコメント数を手動で更新できます：

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

コメント数の取得は非同期のネットワーク処理であるため、状況によっては実行中のコメント数更新処理をキャンセルする必要があるかもしれません。

`commentCount` は、呼び出すと更新をキャンセルできる関数を返します：

```js
const abort = Waline.commentCount({
  serverURL: '<YOUR_SERVER_URL>',
  path: window.location.pathname,
});

// After 500ms, if the network request has not been completed, cancel this operation
setTimeout(() => abort(), 500);
```

:::

## カウンターのみをインポート

記事一覧やホームページで一部のページのコメント数を表示したいものの、Waline 全体は読み込みたくない場合があります。その場合は Gzip サイズが 1KB 未満の `comment` モジュールを利用できます：

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
