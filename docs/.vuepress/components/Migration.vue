<template>
  <div id="lc-to-tcb">
    <form>
      <textarea placeholder="请将 LeanCloud 导出文件数据粘贴至此" v-model="val"></textarea>
      <button v-on:click="click">转换</button>
    </form>
  </div>
</template>
<script>
function lc2tcb(json) {
  return json.results.map(function(comment) {
    comment._id = comment.objectId;
    delete comment.objectId;
    delete comment.ACL;
    return JSON.stringify(comment);
  }).join('\r\n');
};
function download(name, data) {
  function fake_click(obj) {
    var ev = document.createEvent('MouseEvents');
    ev.initMouseEvent(
      'click', true, false, window, 0, 0, 0, 0, 0
      , false, false, false, false, 0, null
      );
    obj.dispatchEvent(ev);
  }
  function export_raw(name, data) {
    var urlObject = window.URL || window.webkitURL || window;
    var export_blob = new Blob([data]);
    var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
    save_link.href = urlObject.createObjectURL(export_blob);
    save_link.download = name;
    fake_click(save_link);
  }
  export_raw(name, data);
};

export default {
  data() {
    return {
      val: ''
    }
  },
  methods: {
    click(e) {
      e.preventDefault();
      const val = this.val;
      if(!val) {
        return alert('请输入内容');
      }
      const text = lc2tcb(JSON.parse(val));
      download('cloudbase_import.json', text);
    }
  }
}
</script>

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