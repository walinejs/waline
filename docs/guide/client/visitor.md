# 文章阅读量统计

Waline 支持文章阅读量统计，你可以通过设置 `visitor` 选项为 `true` 来开启它:

```js
Waline({
  el: '#waline',
  // ...
  visitor: true, // 阅读量统计
});
```

Waline 会自动查找页面中 `class` 值为 `leancloud-visitors` 的元素，获取其 `id` 为查询条件。并将得到的值填充到其 `class` 的值为 `leancloud-visitors-count` 的子元素里:

```html
<!-- id 将作为查询条件 -->
<span id="<Your/Path/Name>" class="leancloud-visitors">
  <em class="post-meta-item-text">阅读量 </em>
  <i class="leancloud-visitors-count"></i>
</span>
```

::: tip

如果 Waline 无法找到满足条件的子元素，它会直接输出数量到 `.leancloud-visitors` 元素中。

:::

## 例子

```html
<span id="/visitor.html" class="leancloud-visitors">
  <em class="post-meta-item-text"> 当前页访问次数 </em>
  <i class="leancloud-visitors-count"></i>
</span>
```

<span id="/visitor.html" class="leancloud-visitors" >
  <em class="post-meta-item-text"> 当前页访问次数 </em>
  <i class="leancloud-visitors-count"></i>
</span>

## Valine 兼容

为了方便用户无缝迁移，Waline 会兼容 Valine 的 `.leancloud_visitors` 与 `.leancloud-visitors-count`。

但是我们不会在未来的 V2 版本兼容它。
