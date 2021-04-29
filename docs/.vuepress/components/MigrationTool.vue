<template>
  <form>
    <div style="margin-bottom: 20px">
      <div class="input-group">
        <label for="">从</label>
        <select v-model="from">
          <option value="valine">Valine</option>
          <option value="disqus">Disqus</option>
          <option value="twikoo">Twikoo</option>
          <option value="typecho">Typecho</option>
          <option value="artalk">Artalk</option>
          <option value="commento">Commento</option>
        </select>
      </div>
      <div class="input-group">
        <label for="">迁移至</label>
        <select v-model="to">
          <option value="wleancloud">Waline LeanCloud</option>
          <option value="wcloudbase">Waline CloudBase</option>
          <option value="wsql">Waline MySQL/PostgreSQL/SQLite</option>
          <option value="wgithub">Github</option>
        </select>
      </div>
      <div class="input-group">存储服务。</div>
    </div>
    <div class="warning custom-block" v-if="from === 'typecho'">
      <p class="custom-block-title">友情提示</p>
      <p>
        Typecho 用户可以使用
        <a
          href="https://github.com/lizheming/typecho-export-valine"
          target="_blank"
          >Export2Valine</a
        >
        插件将评论数据导出成 Valine 数据后直接使用。
      </p>
    </div>
    <div
      class="warning custom-block"
      v-else-if="from === 'valine' && to === 'wleancloud'"
    >
      <p class="custom-block-title">友情提示</p>
      <p>
        Waline 和 Valine 的 LeanCloud 配置是可以共用的，不需要进行数据转换哦！
      </p>
    </div>
    <div v-else>
      <textarea
        placeholder="请将源导出文件数据粘贴至此"
        v-model="source"
      ></textarea>
      <button v-on:click="click">转换</button>
    </div>
  </form>
</template>
<script>
import marked from 'marked';
import CSV from './csv.js';

const m = {
  disqus: {
    wleancloud: disqus2lc,
    wcloudbase(data) {
      return lc2tcb(disqus2lc(data));
    },
    wsql(data) {
      return lc2csv(disqus2lc(data));
    },
    wgithub(data) {
      return lc2csv(disqus2lc(data));
    },
  },
  valine: {
    wcloudbase: lc2tcb,
    wsql: lc2csv,
    wgithub: lc2csv,
  },
  twikoo: {
    wleancloud: tk2lc,
    wcloudbase(data) {
      return lc2tcb(tk2lc(data));
    },
    wsql(data) {
      return lc2csv(tk2lc(data));
    },
    wgithub(data) {
      return lc2csv(tk2lc(data));
    },
  },
  artalk: {
    wleancloud: artalk2lc,
    wcloudbase(data) {
      return lc2tcb(artalk2lc(data));
    },
    wsql(data) {
      return lc2csv(artalk2lc(data));
    },
    wgithub(data) {
      return lc2csv(artalk2lc(data));
    },
  },
  commento: {
    wleancloud: commento2lc,
    wcloudbase(data) {
      return lc2tcb(commento2lc(data));
    },
    wsql(data) {
      return lc2csv(commento2lc(data));
    },
    wgithub(data) {
      return lc2csv(commento2lc(data));
    },
  },
};
//commento 数据结构转 leancloud
function commento2lc(input) {
  input = JSON.parse(input);
  const comments = input.comments;
  const commenters = {};
  if (Array.isArray(input.commenters)) {
    input.commenters.forEach((commenter) => {
      commenters[commenter.commenterHex] = {
        nick: commenter.name,
        mail: commenter.email,
        link: commenter.link !== 'undefined' ? commenter.link : undefined,
      };
    });
  }

  const hexMaps = {};
  comments
    .filter((comment) => comment.parentHex && comment.parentHex !== 'root')
    .forEach((comment) => {
      hexMaps[comment.commentHex] = comment.parentHex;
    });

  const rootHexMaps = {};
  comments
    .filter((comment) => comment.parentHex && comment.parentHex !== 'root')
    .forEach((comment) => {
      let rid = comment.parentHex;
      while (hexMaps[rid]) {
        rid = hexMaps[rid];
      }
      rootHexMaps[comment.commentHex] = rid;
    });

  return {
    results: comments
      .filter((comment) => !comment.deleted)
      .map((comment) => {
        const commenter = commenters[comment.commenterHex]
          ? commenters[comment.commenterHex]
          : {
              nick: 'Anonymous',
              mail: '',
              link: '',
            };

        return Object.assign(
          {
            objectId: comment.commentHex,
            QQAvatar: '',
            comment: comment.html || comment.markdown,
            insertedAt: {
              __type: 'Date',
              iso: comment.creationDate,
            },
            createdAt: comment.creationDate,
            updatedAt: comment.creationDate,
            ip: '',
            ua: '',
            url: comment.url,
            pid: comment.parentHex !== 'root' ? comment.parentHex : '',
            rid: rootHexMaps[comment.commentHex]
              ? rootHexMaps[comment.commentHex]
              : '',
            status: comment.state === 'approved' ? 'approved' : 'waiting',
          },
          commenter
        );
      }),
  };
}

//disqus 数据结构转 leancloud
function disqus2lc(input) {
  const parser = new DOMParser();
  const dom = parser.parseFromString(input, 'application/xml');
  const posts = Array.from(dom.querySelectorAll('post')).filter((postEl) => {
    const isDeleted = postEl
      .querySelector('isDeleted')
      .textContent.toLowerCase();
    return isDeleted === 'false';
  });
  const threads = Array.from(dom.querySelectorAll('disqus > thread'));

  const articleMap = {};
  threads.forEach((threadEl) => {
    const url = threadEl.querySelector('link').textContent;
    const anchor = new URL(url);
    const threadId = threadEl.getAttribute('dsq:id');
    articleMap[threadId] = anchor.pathname;
  });

  const idMap = {};
  posts.forEach((postEl) => {
    const objectId = postEl.getAttribute('dsq:id');
    if (!postEl.querySelector('parent')) {
      return;
    }

    const pid = postEl.querySelector('parent').getAttribute('dsq:id');
    idMap[objectId] = pid;
  });

  const rootIdMap = {};
  posts
    .filter((postEl) => postEl.querySelector('parent'))
    .forEach((postEl) => {
      const objectId = postEl.getAttribute('dsq:id');
      let rid = postEl.querySelector('parent').getAttribute('dsq:id');
      while (idMap[rid]) {
        rid = idMap[rid];
      }
      rootIdMap[objectId] = rid;
    });

  const data = posts.map((postEl) => {
    const objectId = postEl.getAttribute('dsq:id');
    const comment = postEl.querySelector('message').textContent;
    const insertedAt = new Date(
      postEl.querySelector('createdAt').textContent
    ).toISOString();
    const nick = postEl.querySelector('author name').textContent;
    const threadId = postEl.querySelector('thread').getAttribute('dsq:id');
    const url = articleMap[threadId];
    const parent = postEl.querySelector('parent');
    const pid = parent ? parent.getAttribute('dsq:id') : null;
    const rid = parent ? rootIdMap[objectId] : null;
    const isSpam =
      postEl.querySelector('isSpam').textContent.toLowerCase() !== 'false';

    return {
      objectId,
      QQAvatar: '',
      comment,
      insertedAt: {
        __type: 'Date',
        iso: insertedAt,
      },
      createdAt: insertedAt,
      updatedAt: insertedAt,
      ip: '',
      link: '',
      mail: '',
      nick,
      ua: '',
      url,
      pid,
      rid,
      status: isSpam ? 'spam' : 'approved',
    };
  });

  return {
    results: data,
  };
}
//artalk 数据结构转 leancloud
function artalk2lc(input) {
  input = JSON.parse(input);

  function parseKey(key) {
    const anchor = document.createElement('a');
    anchor.href = key;
    return anchor.pathname || key;
  }

  const idMap = {};
  for (let i = 0; i < input.length; i++) {
    idMap[input[i].id] = input[i].rid;
  }
  const rootIdMap = {};
  for (let i = 0; i < input.length; i++) {
    if (!input[i].rid) {
      continue;
    }

    let rid = input[i].rid;
    while (idMap[rid]) {
      rid = idMap[rid];
    }
    rootIdMap[input[i].id] = rid;
  }

  return {
    results: input.map(
      ({ content, date, email, id, ip, link, nick, page_key, rid, ua }) => {
        const time = new Date(date.replace(/-/g, '/')).toISOString();
        const url = parseKey(page_key);
        return {
          objectId: id,
          QQAvatar: '',
          comment: marked(content),
          insertedAt: {
            __type: 'Date',
            iso: time,
          },
          mail: email,
          createdAt: time,
          updatedAt: time,
          ip: ip,
          link: link,
          nick: nick,
          ua: ua,
          url: url,
          pid: rid ? rid : null,
          rid: rootIdMap[id] || null,
          status: 'approved',
        };
      }
    ),
  };
}
//twikoo 数据结构转 leancloud
function tk2lc(input) {
  const data = input
    .trim()
    .split(/[\r\n]+/)
    .filter((v) => v)
    .map((text) => {
      const cmt = JSON.parse(text);
      return {
        objectId: cmt._id,
        QQAvatar: '',
        comment: cmt.comment,
        insertedAt: {
          __type: 'Date',
          iso: new Date(cmt.created).toISOString(),
        },
        createdAt: new Date(cmt.created).toISOString(),
        updatedAt: new Date(cmt.updated).toISOString(),
        ip: cmt.ip,
        link: cmt.link,
        mail: cmt.mail,
        nick: cmt.nick,
        ua: cmt.ua,
        url: cmt.url,
        pid: cmt.pid,
        rid: cmt.rid,
        status: cmt.isSpam ? 'spam' : 'approved',
      };
    });

  return {
    results: data,
  };
}
//leancloud 数据结构转 csv
function lc2csv(input) {
  const field = [
    'id',
    'nick',
    'updatedAt',
    'mail',
    'ua',
    'ip',
    'status',
    'insertedAt',
    'createdAt',
    'comment',
    'pid',
    'rid',
    'link',
    'url',
    'user_id',
  ];

  const keyMaps = {};
  const getId = (row) => {
    if (row.hasOwnProperty('objectId')) {
      return row.objectId;
    }

    if (typeof row._id !== 'string' && row._id.$oid) {
      return row._id.$oid;
    }
  };
  let index = 1;
  input.results.forEach((row) => {
    const id = getId(row);
    if (id) {
      keyMaps[id] = index;
    }
    index += 1;
  });

  const records = [];
  input.results.forEach((row) => {
    const id = getId(row);
    if (id) {
      row.id = keyMaps[id].toString();
    }
    row.pid = keyMaps[row.pid];
    row.rid = keyMaps[row.rid];
    row.status = row.status || 'approved';

    const record = {};
    for (let i = 0; i < field.length; i++) {
      const key = field[i];
      switch (key) {
        case 'insertedAt':
          record[key] = row[key].iso.replace('T', ' ').replace(/.\d{3}Z$/i, '');
          break;
        case 'createdAt':
        case 'updatedAt':
          record[key] = row[key].replace('T', ' ').replace(/.\d{3}Z$/i, '');
          break;
        case 'rid':
        case 'pid':
          record[key] = row[key] || null;
          break;
        default:
          record[key] = row[key] || '';
          break;
      }
    }
    records.push(record);
  });

  const ret = CSV.serialize({
    fields: field.map((name) => ({ id: name, label: name })),
    records,
  });
  return ret;
}
//leancloud 数据结构转 cloudbase
function lc2tcb(json) {
  return json.results
    .map(function (comment) {
      if (comment.hasOwnProperty('objectId')) {
        comment._id = comment.objectId;
        delete comment.objectId;
      } else if (typeof comment._id !== 'string' && comment._id.$oid) {
        comment._id = comment._id.$oid;
      }

      if (typeof comment.insertedAt === 'object' && comment.insertedAt.iso) {
        comment.insertedAt = { $date: comment.insertedAt.iso };
      }

      delete comment.ACL;
      return JSON.stringify(comment);
    })
    .join('\r\n');
}
function download(name, data) {
  function fake_click(obj) {
    var ev = document.createEvent('MouseEvents');
    ev.initMouseEvent(
      'click',
      true,
      false,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    );
    obj.dispatchEvent(ev);
  }
  function export_raw(name, data) {
    var urlObject = window.URL || window.webkitURL || window;
    var export_blob = new Blob([data]);
    var save_link = document.createElementNS(
      'http://www.w3.org/1999/xhtml',
      'a'
    );
    save_link.href = urlObject.createObjectURL(export_blob);
    save_link.download = name;
    fake_click(save_link);
  }
  export_raw(name, data);
}

export default {
  data() {
    return {
      from: 'valine',
      to: 'wcloudbase',
      source: '',
    };
  },
  methods: {
    click(e) {
      e.preventDefault();
      const from = this.from;
      const to = this.to;

      let val = this.source;
      if (!val) {
        return alert('请输入内容');
      }

      if (from === 'valine') {
        //适配 LeanCloud 国内版导出非标准 JSON 情况
        val = val.trim();
        if (val.match(/},[\r\n]+/)) {
          val = JSON.parse(val);
        } else {
          val = JSON.parse(`{"results":[ ${val.split(/[\r\n]+/).join(',')} ]}`);
        }
      }

      const act = m[from][to];
      if (typeof act === 'function') {
        let text = act(val);
        console.log(text);
        if (typeof text !== 'string') {
          text = JSON.stringify(text, null, '\t');
        }
        download('output.' + (to !== 'wsql' ? 'json' : 'csv'), text);
      }
    },
  },
};
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
  color: #fff;
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
