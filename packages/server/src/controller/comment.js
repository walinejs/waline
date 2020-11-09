const AV = require('leancloud-storage');
const helper = require('think-helper');
const marked = require('marked');
const Base = require('./base');
const detect = require('../service/detect');
const akismet = require('../service/akismet');

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: false,
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: true
});

AV.init({
  appId: process.env.LEAN_ID,
  appKey: process.env.LEAN_KEY,
  // required for leancloud china
  serverURL: process.env.LEAN_SERVER
});

function formatCmt({ua, ip, ...comment}) {
  ua = detect(ua);
  comment.mail = helper.md5(comment.mail);
  comment.browser = ua.browser + ' ' + ua.version;
  comment.os = ua.os + ' ' + ua.osVersion;
  return comment;
}

function escapeHTML(text) {
  const arr = [
    ['<', '&lt;'],
    ['>', '&gt;'],
    ['"', '&quot;'],
    ["'", '&#39;']
  ];
  arr.forEach(([target, replaced]) => 
    (text = text.replace(new RegExp(target, 'g'), replaced))
  );
  return text;
}
module.exports = class extends Base {
  constructor(ctx) {
    super(ctx);
    this.modelInstance = new AV.Query('Comment');
  }

  async recentAction() {
    const {count} = this.get();
    const comments = await this.modelInstance
      .descending('insertedAt')
      .notContainedIn('status', ['spam'])
      .limit(count)
      .find();

    return this.json(comments.map(comment => {
      const {ip, ...cmt} = comment.toJSON();
      return cmt;
    }));
  }

  async listAction() {
    const {path: url, page, pageSize} = this.get();

    const rootCount = await this.modelInstance
      .equalTo('url', url)
      .doesNotExist('rid')
      .notContainedIn('status', ['spam'])
      .count();

    const rootComments = await this.modelInstance
      .descending('insertedAt')
      .equalTo('url', url)
      .doesNotExist('rid')
      .notContainedIn('status', ['spam'])
      .skip(Math.max((page - 1) * pageSize, 0))
      .limit(pageSize)
      .select([
        'comment', 'insertedAt', 'link', 'mail', 'nick', 'pid', 'rid', 'ua'
      ])
      .find();

    const childrenComments = await this.modelInstance
      .ascending('insertedAt')
      .equalTo('url', url)
      .exists('rid')
      .notContainedIn('status', ['spam'])
      .containedIn('rid', rootComments.map(comment => comment.get('objectId')))
      .select([
        'comment', 'insertedAt', 'link', 'mail', 'nick', 'pid', 'rid', 'ua'
      ])
      .skip(NaN)
      .limit(NaN)
      .find();

    return this.json({
      page,
      totalPages: Math.ceil(rootCount / pageSize),
      pageSize,
      data: rootComments.map(comment => {
        const cmt = formatCmt(comment.toJSON());
        cmt.children = childrenComments.filter(comment => comment.get('rid') === cmt.objectId).map(cmt => formatCmt(cmt.toJSON()));
        return cmt;
      })
    });
  }

  async countAction() {
    const {url} = this.get();
    const count = await this.modelInstance
      .equalTo('url', url)
      .notContainedIn('status', ['spam'])
      .count();

    return this.json(count);
  }

  async saveAction() {
    const {comment, link, mail, nick, pid, rid, ua, url, at} = this.post();
    const data = {
      link, mail, nick, pid, rid, ua, url, 
      ip: this.ctx.ip,
      insertedAt: new Date(),
      comment: marked(escapeHTML(comment))
    };
    if(pid) {
      data.comment = data.comment.replace('<p>', `<p><a class="at" href="#${pid}">@${at}</a> , `);
    }

    data.status = 'approved';
    const spam = await akismet(data, this.ctx.protocol + '://' + this.ctx.host).catch(e => console.log(e)); // ignore akismet error
    if(spam === true) {
      data.status = 'spam';
    }
    
    const {preSave, postSave} = think.config();
    if(think.isFunction(preSave)) {
      const resp = await preSave(data);
      if(resp) {
        return this.fail(resp.errmsg);
      }
    }

    const Ct = AV.Object.extend('Comment');
    const cmt = new Ct();
    cmt.set(data);
    const acl = new AV.ACL();
    acl.setPublicReadAccess(true);
    acl.setPublicWriteAccess(false);
    cmt.setACL(acl);
    const resp = (await cmt.save()).toJSON();

    let pComment;
    if(pid) {
      pComment = await AV.Query('Comment').get(pid);
      pComment = pComment.toJSON();
    }
    if(comment.status !== 'spam') {
      const notify = this.service('notify');
      //run in background without await
      notify.run(resp, pComment);
    }

    if(think.isFunction(postSave)) {
      await postSave(resp, pComment);
    }

    return this.success(formatCmt(resp));
  }
}