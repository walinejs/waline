# 评论数统计

Waline 支持在非评论区单独显示评论数，效果和文章阅读量统计差不多。Waline 会自动查找页面中`class`值为`waline-comment-count`的元素，获取其`id`为查询条件，并将值填入其中。

```html
<!-- id 将作为查询条件 -->
<span id="<Your/Path/Name>" class="waline-comment-count"></span>条评论
```

当前页共有 <span id="/en/client/count.html" class="waline-comment-count"></span> 条评论
