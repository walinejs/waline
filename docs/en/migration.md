# Migration from Valine

Since Waline completely reuses Valine's data structure in storage, migrating from Valine to Waline is very simple.

1. Deploy backend with quick start documentation [Vercel Deploy](/quick-start.html#vercel-%E9%83%A8%E7%BD%B2). `LEAN_ID` and `LEAN_KEY` is same with before Valine applied. Don't forget add `LEAN_MASTER_KEY` for Waline.
2. Modifiy frontend scripts with quick start documentation [HTML](/quick-start.html#vercel-%E9%83%A8%E7%BD%B2). Please remind we should remove old configuration `appId` and `appKey`, and add `serverURL` configure.

```diff
- <script src='//unpkg.com/valine/dist/Valine.min.js'></script>
+ <script src='//cdn.jsdelivr.net/npm/@waline/client/dist/Waline.min.js'></script>

  <script>
-  new Valine({
+  new Waline({
    el: '#vcomments',
-  appId: 'Your appId',
-  appKey: 'Your appKey'
+  serverURL: 'YOUR SERVER URL'
  });
  </script>
```

**Tips 1：** Most configuration are same between Waline and Valine, but there has little difference. All waline configuratioin can watch [configuration](/en/client/basic.html)。

**Tips 2：** Except `LEAN_ID` and `LEAN_KEY`, you also need config `LEAN_SERVER` environment variable if you're the user of LeanCloud China.
