---
title: Import Waline via CDN
icon: import
---

This cookbook is about importing Waline with a CDN.

<!-- more -->

For China Mainland users, we recommend using [unpkg](https://unpkg.com/@waline/client). For foreign users, we recommend using jsDelivr.

To make Waline SSR friendly, we split Waline's styles in V2 version. This means, you need to import Waline's CSS style file, and import Waline script file and call Waline.

## Comment

Normally, you want Waline to render a list of comments, you can import Waline as follows:

```html
<!-- style file -->
<link
  rel="stylesheet"
  href="https://unpkg.com/@waline/client@v2/dist/waline.css"
/>
<!-- script file -->
<script type="module">
  import { init } from 'https://unpkg.com/@waline/client@v2/dist/waline.mjs';

  init({
    // options
  });
</script>
```

## Views and comments

Sometimes, you may want to display the number of page views and comments of the article on the home page or article list, but do not need to load the comment component, then you can import a Gzip < 1KB script file in the following ways:

Pageviews:

```html
<script type="module">
  import { pageviewCount } from 'https://unpkg.com/@waline/client@v2/dist/pageview.mjs';

  pageviewCount({
    // options
  });
</script>
```

Comments count:

```html
<script type="module">
  import { commentCount } from 'https://unpkg.com/@waline/client@v2/dist/comment.mjs';

  commentCount({
    // options
  });
</script>
```

## More

::: info Specifies version

You may have noticed that in the above cases, we have explicitly declared the `@v2` version after `@aline/client`. Your website is not working properly.

:::
