const helper = require('think-helper');
const marked = require('marked');
const BaseRest = require('./rest');
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
module.exports = class extends BaseRest {
  constructor(ctx) {
    super(ctx);
    this.modelInstance = this.service('storage/leancloud', 'Comment');
  }

  async getAction() {
    const {type} = this.get();
    switch(type) {
      case 'recent': {
        const {count} = this.get();
        const comments = await this.modelInstance.select({
          status: ['NOT IN', ['spam']]
        }, {
          desc: 'insertedAt',
          limit: count
        });

        return this.json(comments.map(({ip, ...cmt}) => cmt));
      }

      case 'count': {
        const {url} = this.get();
        const count = await this.modelInstance.count({url, status: ['NOT IN', ['spam']]});
        return this.json(count);
      }

      case 'list': {
        const {page, pageSize, owner, status, keyword} = this.get();
        const where = {};
        if(owner === 'mine') {
          const {userInfo} = this.ctx.state;
          where.email = userInfo.email;
        }
        if(status) {
          where.status = status;
        }
        if(keyword) {
          where.comment = ['LIKE', `%${keyword}%`];
        }

        const count = await this.modelInstance.count(where);
        const comments = await this.modelInstance.select(where, {
          desc: 'insertedAt',
          limit: pageSize,
          offset: Math.max((page - 1) * pageSize, 0),
        });

        return this.success({
          page,
          totalPages: Math.ceil(count / pageSize),
          pageSize,
          data: comments.map(formatCmt)
        });
      }

      default: {
        const {path: url, page, pageSize} = this.get();

        const rootCount = await this.modelInstance.count({
          url,
          rid: undefined,
          status: ['NOT IN', ['spam']]
        });
    
        const rootComments = await this.modelInstance.select({
          url, 
          rid: undefined,
          status: ['NOT IN', ['spam']]
        }, {
          desc: 'insertedAt',
          limit: pageSize,
          offset: Math.max((page - 1) * pageSize, 0),
          field: [
            'comment', 'insertedAt', 'link', 'mail', 'nick', 'pid', 'rid', 'ua'
          ]
        });
    
        const childrenComments = await this.modelInstance.select({
          url,
          rid: ['IN', rootComments.map(comment => comment.get('objectId'))],
          status: ['NOT IN', ['spam']],
        }, {
          desc: 'insertedAt',
          field: [
            'comment', 'insertedAt', 'link', 'mail', 'nick', 'pid', 'rid', 'ua'
          ]
        });
    
        return this.json({
          page,
          totalPages: Math.ceil(rootCount / pageSize),
          pageSize,
          data: rootComments.map(comment => {
            const cmt = formatCmt(comment);
            cmt.children = childrenComments.filter(comment => comment.rid === cmt.objectId).map(cmt => formatCmt(cmt));
            return cmt;
          })
        });
      }
    }
  }

  async postAction() {
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

    const resp = await this.modelInstance.add(data);
    
    let pComment;
    if(pid) {
      pComment = await AV.Query('Comment').get(pid);
      pComment = pComment.toJSON();
    }
    if(comment.status !== 'spam') {
      const notify = this.service('notify');
      await notify.run(resp, pComment);
    }

    if(think.isFunction(postSave)) {
      await postSave(resp, pComment);
    }

    return this.success(formatCmt(resp));
  }
}