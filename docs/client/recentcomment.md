# 最新评论挂件

Waline 也支持最新评论挂件显示，方便在博客侧边栏显示最近评论。

## 基本用法

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

## 高级用法

如果对默认输出的格式不满意，你也可以拿到数据之后自己进行渲染。

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
