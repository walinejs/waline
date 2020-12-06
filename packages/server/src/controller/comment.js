const helper = require('think-helper');
const marked = require('marked');
const katext = require('katex');
const parser = require('ua-parser-js');
const BaseRest = require('./rest');
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

async function formatCmt({ua, ip, ...comment}) {
  ua = parser(ua)
  comment.mail = helper.md5(comment.mail);
  if(!think.config('disableUserAgent')) {
    comment.browser = ua.browser.name + ' ' + ua.browser.version;
    comment.os = ua.os.name + ' ' + ua.os.version;
  }
  
  const blockMathRegExp = /(^|[\r\n]+|<p>|<br>)\$\$([^$]+)\$\$([\r\n]+|<\/p>|<br>|$)/g;
  const match = comment.comment.match(blockMathRegExp);
  if(match) {
    for(let i = 0; i < match.length; i++) {
      const text = match[i]
        .replace(/(^|[\r\n]+|<p>|<br>)\$\$/, '')
        .replace(/\$\$([\r\n]+|<\/p>|<br>|$)/, '')
        .replace(/<br>/g, '\r\n');

      const math = katext.renderToString(text, {
        output: 'mathml'
      });
      comment.comment = comment.comment.replace(match[i], math);
    }
  }
  
  return comment;
}

module.exports = class extends BaseRest {
  constructor(ctx) {
    super(ctx);
    this.modelInstance = this.service(`storage/${this.config('storage')}`, 'Comment');
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

        return this.json(await Promise.all(comments.map(formatCmt)));
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
          where.mail = userInfo.email;
        }
        if(status) {
          where.status = status;
        }
        if(keyword) {
          where.comment = ['LIKE', `%${keyword}%`];
        }

        const count = await this.modelInstance.count(where);
        const spamCount = await this.modelInstance.count({status: 'spam'});
        const comments = await this.modelInstance.select(where, {
          desc: 'insertedAt',
          limit: pageSize,
          offset: Math.max((page - 1) * pageSize, 0),
        });

        return this.success({
          page,
          totalPages: Math.ceil(count / pageSize),
          pageSize,
          spamCount,
          data: comments
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
          rid: ['IN', rootComments.map(comment => comment.objectId)],
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
          data: await Promise.all(rootComments.map(async comment => {
            const cmt = await formatCmt(comment);
            cmt.children = await Promise.all(childrenComments
              .filter(comment => comment.rid === cmt.objectId)
              .map(cmt => formatCmt(cmt)));
            return cmt;
          }))
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
      comment: marked(comment)
    };
    if(pid) {
      data.comment = data.comment.replace('<p>', `<p><a class="at" href="#${pid}">@${at}</a> , `);
    }

    /** IP disallowList */
    const {disallowIPList} = this.config();
    if(think.isArray(disallowIPList) && disallowIPList.length && disallowIPList.includes(data.ip)) {
      return this.ctx.throw(403);
    }
    
    /** Duplicate content detect */
    const duplicate = await this.modelInstance.select({
      url, mail: data.mail, nick: data.nick, link: data.link, comment: data.comment
    });
    if(!think.isEmpty(duplicate)) {
      return this.fail('Duplicate Content');
    }

    /** IP Frequence */
    const {IPQPS = 60} = process.env;
    const recent =  await this.modelInstance.select({
      ip: this.ctx.ip,
      insertedAt: ['>', new Date(Date.now() - IPQPS * 1000)]
    });
    if(!think.isEmpty(recent)) {
      return this.fail('Comment too fast!');
    }

    /** Akismet */
    data.status = 'approved';
    const spam = await akismet(data, this.ctx.protocol + '://' + this.ctx.host).catch(e => console.log(e)); // ignore akismet error
    if(spam === true) {
      data.status = 'spam';
    }
    
    if(data.status !== 'spam') {
      /** KeyWord Filter */
      const {forbiddenWords} = this.config();
      if(!think.isEmpty(forbiddenWords)) {
        const regexp = new RegExp('(' + forbiddenWords.join('|') + ')', 'ig');
        if(regexp.test(comment)) {
          data.status = 'spam';
        }
      }
    }
    
    const preSaveResp = await this.hook('preSave', data);
    if(preSaveResp) {
      return this.fail(preSaveResp.errmsg);
    }

    const resp = await this.modelInstance.add(data);
    
    let pComment;
    if(pid) {
      pComment = await this.modelInstance.select({objectId: pid});
      pComment = pComment[0];
    }
    if(comment.status !== 'spam') {
      const notify = this.service('notify');
      await notify.run(resp, pComment);
    }

    await this.hook('postSave', resp, pComment);
    return this.success(await formatCmt(resp));
  }

  async putAction() {
    const data = this.post();
    const preUpdateResp = await this.hook('preUpdate', {...data, objectId: this.id});
    if(preUpdateResp) {
      return this.fail(preUpdateResp);
    }

    await this.modelInstance.update(data, {objectId: this.id});
    await this.hook('postUpdate', data);
    return this.success();
  }

  async deleteAction() {
    const preDeleteResp = await this.hook('preDelete', this.id);
    if(preDeleteResp) {
      return this.fail(preDeleteResp);
    }
    
    await this.modelInstance.delete({objectId: this.id});
    await this.hook('postDelete', this.id);
    return this.success();
  }
}
