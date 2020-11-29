# 从 Valine 迁移

由于 Waline 在存储上完全复用了 Valine 的数据结构，所以从 Valine 迁移至 Waline 非常简单。

1. 按照快速开始中的 [Vercel 部署](/quick-start.html#vercel-%E9%83%A8%E7%BD%B2) 一节部署服务端。这块的 `LEAN_ID` 和 `LEAN_KEY` 和之前 Valine 申请的一致即可。
2. 按照快速开始中的 [HTML 片段](/quick-start.html#html-%E7%89%87%E6%AE%B5) 一节修改对应的前端脚本。注意这里需要删除 Valine 原始的配置 `appId` 和 `appKey`，增加 `serverURL`。

```html
- <script src='//unpkg.com/valine/dist/Valine.min.js'></script>
+ <script src='//unpkg.com/@waline/client/dist/Waline.min.js'></script>

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

**注1：** Waline 和 Valine 大部分的配置都是一样的，但也不能完全保证没有差异。Waline 具体的配置可查看 [配置项](/configuration.html)。

**注2：** 如果你是 Leancloud 国内版用户的话，除了 `LEAN_ID` 和 `LEAN_KEY`，还需要设置 `LEAN_SERVER` 环境变量，值为你的应用后台绑定的已备案域名。

## 迁移至 Cloudbase

如果你想要将你的 Valine 数据迁移至腾讯云开发的云数据库中的话，可以使用 LeanCloud 的导出功能配合云数据库的导入功能完成。LeanCloud 后台选择 <kbd>导入导出<kbd> > <kbd>限定Class</kbd> > <kbd>Comment</kbd> > <kbd>导出</kbd>，之后会收到导出成功的邮件。

将导出成功的文件内容粘贴至下方的文本框中，点击下方的转换按钮，获得待导入的文件。进入腾讯云开发后台[数据库](https://console.cloud.tencent.com/tcb/db/index)界面，选择 `Comment` 集合。若该集合不存在，点击左上角 <kbd>新建集合</kbd> 创建。进入后点击上方的导入按钮，选择刚才获得的转换后文件稍待片刻即可完成导入。

<style type="text/css">
#lc-to-tcb textarea {
  width: 100%;
  height: 200px;
  border: 1px solid #eaecef;
  border-radius: 3px;
  padding: 10px;
}
#lc-to-tcb button {
  font-size: 17px;
  line-height: 2em;
  padding: 0 20px;
  border: none;
  background: #3eaf7c;
  color: #FFF;
  border-radius: 3px;
  cursor: pointer;
}
</style>
<div id="lc-to-tcb">
  <form>
    <textarea placeholder="请将 LeanCloud 导出文件数据粘贴至此"></textarea>
    <button>转换</button>
  </form>
</div>
<script>
function lc2tcb(json) {
  return json.results.map(comment => {
    comment._id = comment.objectId;
    delete comment.objectId;
    delete comment.ACL;
    return JSON.stringify(comment);
  }).join('\r\n');
};
function download(name, data) {
  function fake_click(obj) {
    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent(
      "click", true, false, window, 0, 0, 0, 0, 0
      , false, false, false, false, 0, null
      );
    obj.dispatchEvent(ev);
  }
  function export_raw(name, data) {
    var urlObject = window.URL || window.webkitURL || window;
    var export_blob = new Blob([data]);
    var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
    save_link.href = urlObject.createObjectURL(export_blob);
    save_link.download = name;
    fake_click(save_link);
  }
  export_raw(name, data);
};
const textarea = document.querySelector('#lc-to-tcb textarea');
const btn = document.querySelector('#lc-to-tcb button');
btn.addEventListener('click', function(e) {
  e.preventDefault();
  if(!textarea.value) {
    return alert('请输入内容');
  }
  const text = lc2tcb(JSON.parse(textarea.value));
  download('cloudbase_import.json', text);
});
</script>