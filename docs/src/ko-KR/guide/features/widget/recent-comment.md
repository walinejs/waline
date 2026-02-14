---
title: Recent comment Widget
icon: recent
---

Waline supports displaying recent comments by widget, which is convenient for displaying the latest comments in the sidebar of the blog.

<!-- more -->

## Component options

The latest comment widget is named `RecentComments` and contains three options:

- `el` (optional): the element to be mounted
- `serverURL`: server link
- `count` The number of recent comments needed to get

The data format returned by the component should be `Promise<{ comment: WalineComment[], destroy: () => void }>`.

- `comment` property: an array of the most recent comments with exact number of `count`
- `destroy` method: a function which will destroy the widget

## Basic usage

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

This will be rendered on `#waline-recent` using the default style.

:::

## Advanced usage

If you are not satisfied with the default output format, you can call the component by omitting the `el` option to get the data and render it yourself.

Example:

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
