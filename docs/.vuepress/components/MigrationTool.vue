<template>
  <form>
    <div style="margin-bottom: 20px;">
      <div class="input-group">
        <label for="">从</label>
        <select v-model="from">
          <option value="valine">Valine</option>
          <option value="disqus">Disqus</option>
          <option value="twikoo">Twikoo</option>
          <option value="typecho">Typecho</option>
        </select>
      </div>
      <div class="input-group">
        <label for="">迁移至</label>
        <select v-model="to">
          <option value="wleancloud">Waline LeanCloud</option>
          <option value="wcloudbase">Waline CloudBase</option>
          <option value="wsql">Waline MySQL/PostgreSQL/SQLite</option>
        </select>
      </div>
      <div class="input-group">
        存储服务。
      </div>
    </div>
    
    <div class="warning custom-block" v-if="from === 'disqus'">
      <p class="custom-block-title">友情提示</p> 
      <p>Disqus 数据可以使用 <a href="https://taosky.github.io/disqus-to-valine/" target="_blank">Disqus to Valine</a> 工具导出成 Valine 数据后直接使用。</p>
    </div>
    <div class="warning custom-block" v-if="from === 'typecho'">
      <p class="custom-block-title">友情提示</p>
      <p>Typecho 用户可以使用 <a href="https://github.com/lizheming/typecho-export-valine" target="_blank">Export2Valine</a> 插件将评论数据导出成 Valine 数据后直接使用。</p>
    </div>
    <div class="warning custom-block" v-else-if="from === 'valine' && to === 'wleancloud'">
      <p class="custom-block-title">友情提示</p> 
      <p>Waline 和 Valine 的 LeanCloud 配置是可以共用的，不需要进行数据转换哦！</p>
    </div>
    <div v-else>
      <textarea placeholder="请将源导出文件数据粘贴至此" v-model="source"></textarea>
      <button v-on:click="click">转换</button>
    </div>
  </form>
</template>
<script>
const m = {
  valine: {
    wcloudbase: lc2tcb,
    wsql: lc2csv
  },
  twikoo: {
    wleancloud: tk2lc,
    wcloudbase(data) {
      return lc2tcb(tk2lc(data));
    },
    wsql(data) {
      return lc2csv(tk2lc(data));
    } 
  }
}
//twikoo 数据结构转 leancloud
function tk2lc(input) {
  const data = input.trim().split(/[\r\n]+/).filter(v => v).map(text => {
    const cmt = JSON.parse(text);
    return {
      objectId: cmt._id,
      QQAvatar: '',
      comment: cmt.comment,
      insertedAt: {
        __type: 'Date',
        iso: (new Date(cmt.created)).toISOString()
      },
      createdAt: (new Date(cmt.created)).toISOString(),
      updatedAt: (new Date(cmt.updated)).toISOString(),
      ip: cmt.ip,
      link: cmt.link,
      mail: cmt.mail,
      nick: cmt.nick,
      ua: cmt.ua,
      url: cmt.url,
      pid: cmt.pid, 
      rid: cmt.rid,
      status: cmt.isSpam ? 'spam' : 'approved'
    }
  });

  return {
    results: data
  };
}
//leancloud 数据结构转 csv 
function lc2csv(input) {
  let output = [];
  const field = [
      "id",
      "nick",
      "updatedAt",
      "mail",
      "ua",
      "insertedAt",
      "createdAt",
      "comment",
      "pid",
      "rid",
      "link",
      "url"
  ];
  output.push(field.join(","));

  const keyMaps = {};
  const getId = row => {
    if(row.hasOwnProperty('objectId')) {
      return row.objectId;
    } 

    if(typeof row._id !== 'string' && row._id.$oid) {
      return row._id.$oid;
    }
  }
  let index = 1;
  input.results.forEach(row => {
    const id = getId(row);
    if(id) {
      keyMaps[ id ] = index;
    }
    index += 1;
  });

  const [_head, ...body] = input.results;
  body.forEach(row => {
    const id = getId(row);
    if(id) {
      row.id = keyMaps[ id ].toString();
    }
    row.pid = keyMaps[ row.pid ]?.toString();
    row.rid = keyMaps[ row.rid ]?.toString();
    
    let data = field.map(key => {
      if (key == "insertedAt") {
        return row[key].iso;
      }
      return row[key]?.replaceAll('"', '""');
    });

    output.push('"' + data.join('","') + '"');
  });

  return output.join("\n");
}
//leancloud 数据结构转 cloudbase
function lc2tcb(json) {
  return json.results.map(function(comment) {
    if(comment.hasOwnProperty('objectId')) {
      comment._id = comment.objectId;
      delete comment.objectId;
    } else if(typeof comment._id !== 'string' && comment._id.$oid) {
      comment._id = comment._id.$oid;
    }
    
    if(typeof comment.insertedAt === 'object' && comment.insertedAt.iso) {
      comment.insertedAt = { $date: comment.insertedAt.iso };
    }
    
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
      from: 'valine',
      to: 'wcloudbase',
      source: ''
    }
  },
  methods: {
    click(e) {
      e.preventDefault();
      const from = this.from;
      const to = this.to;

      let val = this.source;
      if(!val) {
        return alert('请输入内容');
      }

      if(from === 'valine') {
        val = JSON.parse(val);
      }
      
      const act = m[from][to];
      if(typeof act === 'function') {
        let text = act(val);
        console.log(text);
        if(typeof text !== 'string') {
          text = JSON.stringify(text, null, '\t');
        }
        download('output.' + (to !== 'wsql' ? 'json' : 'csv'), text);
      }
    }
  }
}
</script>

<style type="text/css">
textarea {
  width: 100%;
  height: 200px;
  border: 1px solid #eaecef;
  border-radius: 3px;
  padding: 10px;
}
button {
  font-size: 17px;
  line-height: 2em;
  padding: 0 20px;
  border: none;
  background: #3eaf7c;
  color: #FFF;
  border-radius: 3px;
  cursor: pointer;
}
.input-group {
  display: inline-block;
  font-size: 20px;
}
select {
  border: 2px solid #eaecef;
  font-size: 20px;
  padding: 5px 10px;
  border-radius: 3px;
}
</style>