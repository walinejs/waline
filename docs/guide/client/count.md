# 浏览量统计

Waline 支持浏览量统计与评论数显示。

<!-- more -->

## 浏览量

Waline 支持浏览量统计，你可以通过设置 `visitor` 选项为 `true` 来开启它:

```js
Waline({
  el: '#waline',
  // ...
  visitor: true, // 阅读量统计
});
```

Waline 会自动查找页面中 `class` 值为 `waline-visitor-count` 的元素，获取其 `id` 为查询条件，并将得到的值填充到其中:

```html
<!-- id 将作为查询条件 -->
阅读量: <span id="<Your/Path/Name>" class="waline-visitor-count" />
```

### 例子

```html
当前页阅读量为<span
  id="/guide/client/count.html"
  class="waline-visitor-count"
/>次。
```

当前页阅读量为<span id="/guide/client/count.html" class="waline-visitor-count" />次。

### Valine 兼容

为了方便用户无缝迁移，Waline 目前会兼容 Valine 的 `.leancloud_visitors` 与 `.leancloud-visitors-count`:

```html
<!-- id 将作为查询条件 -->
<span
  id="<Your/Path/Name>"
  class="leancloud_visitors"
  data-flag-title="Your Article Title"
>
  <em class="post-meta-item-text">阅读量 </em>
  <i class="leancloud-visitors-count"></i>
</span>
```

但是我们不会在未来的 V2 版本兼容它。

## 评论数统计

Waline 支持在非评论区单独显示评论数，其方式和页面浏览量类似。Waline 会自动查找页面中 `class` 值为 `waline-comment-count` 的元素，获取其 `id` 为查询条件，并将值填入其中。

```html
<!-- id 将作为查询条件 -->
<span id="<Your/Path/Name>" class="waline-comment-count" />条评论
```

### 例子

```html
当前页共有
<span id="/guide/client/count.html" class="waline-comment-count" />条评论
```

当前页共有 <span id="/guide/client/count.html" class="waline-comment-count" />条评论
