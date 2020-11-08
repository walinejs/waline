const AV = require('leancloud-storage');
const helper = require('think-helper');
const marked = require('marked');
const Base = require('./base');
const detect = require('../service/detect');

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
  appKey: process.env.LEAN_KEY
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
    const comments = await this.modelInstance.descending('insertedAt').limit(count).find();
    return this.json(comments.map(comment => {
      const {ip, ...cmt} = comment.toJSON();
      return cmt;
    }));
  }

  async listAction() {
    const {path: url, page, pageSize} = this.get();

    const rootCount = await this.modelInstance.equalTo('url', url).doesNotExist('rid').count();
    // const comments = await this.modelInstance.equalTo('url', url).descending('insertedAt').select([
    //   'comment', 'insertedAt', 'link', 'mail', 'nick', 'pid', 'rid', 'ua'
    // ]).find();
    // const rootComments = comments.filter(comment => !comment.rid).slice((page - 1) * pageSize, pageSize * page);
    // return this.json(rootComments);

    const rootComments = await this.modelInstance
      .descending('insertedAt')
      .equalTo('url', url)
      .doesNotExist('rid')
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
    const count = await this.modelInstance.equalTo('url', url).count();
    return this.json(count);
  }

  async saveAction() {
    const {comment, link, mail, nick, pid, rid, ua, url, at} = this.post();
    const Ct = AV.Object.extend('Comment');
    const cmt = new Ct();

    const data = {
      link, mail, nick, pid, rid, ua, url, 
      ip: this.ctx.ip,
      insertedAt: new Date(),
      comment: marked(escapeHTML(comment))
    };

    if(pid) {
      data.comment = data.comment.replace('<p>', `<p><a class="at" href="#${pid}">@${at}</a> , `);
    }
    cmt.set(data);
    const acl = new AV.ACL();
    acl.setPublicReadAccess(true);
    acl.setPublicWriteAccess(false);
    cmt.setACL(acl);
    const resp = await cmt.save();

    return this.success(formatCmt(resp.toJSON()));
  }
}