# 从 Valine 迁移

由于 Waline 在存储上完全复用了 Valine 的数据结构，所以从 Valine 迁移至 Waline 非常简单。

1. 按照快速开始中的 [Vercel 部署](/quick-start.html#vercel-%E9%83%A8%E7%BD%B2) 一节部署服务端。这块的 `LEAN_ID` 和 `LEAN_KEY` 和之前 Valine 申请的一致即可。
2. 按照快速开始中的 [HTML 片段](/quick-start.html#html-%E7%89%87%E6%AE%B5) 一节修改对应的前端脚本。注意这里需要删除 Valine 原始的配置 `appId` 和 `appKey`，增加 `serverURL`。

```html
- <script src='//unpkg.com/valine/dist/Valine.min.js'></script>
+ <script src='//unpkg.com/@waline/client/dist/Waline.min.js'></script>

  new Valine({
    el: '#vcomments',
-  appId: 'Your appId',
-  appKey: 'Your appKey'
+  serverURL: 'YOUR SERVER URL'
  });
  ```

**注：** Waline 和 Valine 大部分的配置都是一样的，但也不能完全保证没有差异。Waline 具体的配置可查看 [配置项](/configuration.html)。