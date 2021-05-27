# RecentComments Widget

Waline also support recent comments widget to help you display recent comment at the side of your blog.

## Basic

```html
<div id="waline-recent"></div>
<script>
  window.addEventListener('load', function () {
    Waline.Widget.RecentComments({
      el: '#waline-recent',
      serverURL: 'http://waline.vercel.app',
      count: 10,
    });
  });
</script>
```

## Advanced

If you dislike default output HTML format, you can also render by yourself.

```html
<div id="waline-recent"></div>
<script>
  window.addEventListener('load', function () {
    Waline.Widget.RecentComments({
      el: '#waline-recent',
      serverURL: 'http://waline.vercel.app',
      count: 10,
    }).then((comments) => {
      document.getElementById('waline-recent').innerHTML = comments.map(
        (cmt) => `${cmt.nick}: ${cmt.comment}`
      );
    });
  });
</script>
```
