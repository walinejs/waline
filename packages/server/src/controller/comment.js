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

async function formatCmt({ua, user_id, ip, ...comment}, users = [], {avatarProxy}) {
  ua = parser(ua);
  if(!think.config('disableUserAgent')) {
    comment.browser = [ua.browser.name, ua.browser.version].filter(v => v).join(' ');
    comment.os = [ua.os.name, ua.os.version].filter(v => v).join(' ');
  }

  if(user_id) {
    const user = users.find(({objectId}) => user_id === objectId);
    
    if(user) {
      comment.nick = user.display_name;
      comment.mail = user.email;
      comment.link = user.link;
      comment.type = user.type;
      
      let {avatar} = user;
      if(avatar) {
        if(/(github)/i.test(avatar)) {
          avatar = avatarProxy + '?url=' + encodeURIComponent(avatar);
        }
        comment.avatar = avatar;
      }
    }
  }
  comment.mail = helper.md5(comment.mail);
  
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
          status: ['NOT IN', ['waiting', 'spam']]
        }, {
          desc: 'insertedAt',
          limit: count
        });

        const userModel = this.service(`storage/${this.config('storage')}`, 'Users');
        const user_ids = Array.from(new Set(comments.map(({user_id}) => user_id).filter(v => v)));
        let users = [];
        if(user_ids.length) {
          users = await userModel.select({objectId: ['IN',  user_ids]}, {
            field: ['display_name', 'email', 'url', 'type', 'avatar']
          });
        }

        return this.json(await Promise.all(comments.map(cmt => formatCmt(cmt, users, this.config()))));
      }

      case 'count': {
        const {url} = this.get();
        const count = await this.modelInstance.count({url, status: ['NOT IN', ['waiting', 'spam']]});
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

          //compat with valine old data without status property
          if(status === 'approved') {
            where.status = ['NOT IN', ['waiting', 'spam']];
          }
        }
        
        if(keyword) {
          where.comment = ['LIKE', `%${keyword}%`];
        }

        const count = await this.modelInstance.count(where);
        const spamCount = await this.modelInstance.count({status: 'spam'});
        const waitingCount = await this.modelInstance.count({status: 'waiting'});
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
          waitingCount,
          data: comments
        });
      }

      default: {
        const {path: url, page, pageSize} = this.get();

        const comments = await this.modelInstance.select({
          url,
          status: ['NOT IN', ['waiting', 'spam']]
        }, {
          desc: 'insertedAt',
          field: [
            'comment', 'insertedAt', 'link', 'mail', 'nick', 'pid', 'rid', 'ua', 'user_id'
          ]
        });

        const userModel = this.service(`storage/${this.config('storage')}`, 'Users');
        const user_ids = Array.from(new Set(comments.map(({user_id}) => user_id).filter(v => v)));
        let users = [];
        if(user_ids.length) {
          users = await userModel.select({objectId: ['IN',  user_ids]}, {
            field: ['display_name', 'email', 'url', 'type', 'avatar']
          });
        }

        const rootCount = comments.filter(({rid}) => !rid).length;
        const pageOffset = Math.max((page - 1) * pageSize, 0);
        const rootComments = comments.filter(({rid}) => !rid).slice(pageOffset, pageOffset + pageSize);
        
        return this.json({
          page,
          totalPages: Math.ceil(rootCount / pageSize),
          pageSize,
          data: await Promise.all(rootComments.map(async comment => {
            const cmt = await formatCmt(comment, users, this.config());
            cmt.children = await Promise.all(comments
              .filter(({rid}) => rid === cmt.objectId)
              .map(cmt => formatCmt(cmt, users, this.config())));
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
      comment: marked(comment),
      user_id: this.ctx.state.userInfo.objectId
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
    const {COMMENT_AUDIT, AUTHOR_EMAIL, BLOGGER_EMAIL} = process.env;
    const AUTHOR = AUTHOR_EMAIL || BLOGGER_EMAIL;
    const isAuthorComment = AUTHOR ? data.mail.toLowerCase() === AUTHOR.toLowerCase() : false;
    data.status = COMMENT_AUDIT && !isAuthorComment ? 'waiting' : 'approved';
    if(data.status === 'approved') {
      const spam = await akismet(data, this.ctx.protocol + '://' + this.ctx.host).catch(e => console.log(e)); // ignore akismet error
      if(spam === true) {
        data.status = 'spam';
      }
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
      await notify.run({...resp, rawComment: comment}, pComment);
    }

    await this.hook('postSave', resp, pComment);
    return this.success(await formatCmt(resp, [ this.ctx.state.userInfo ], this.config()));
  }

  async putAction() {
    const data = this.post();
    const oldData = await this.modelInstance.select({objectId: this.id});
    const preUpdateResp = await this.hook('preUpdate', {...data, objectId: this.id});
    if(preUpdateResp) {
      return this.fail(preUpdateResp);
    }

    await this.modelInstance.update(data, {objectId: this.id});

    if(oldData.status === 'waiting' && data.status === 'approved' && oldData.pid) {
      let pComment = await this.modelInstance.select({objectId: pid});
      pComment = pComment[0];

      const notify = this.service('notify');
      await notify.run(resp, pComment, true);
    }
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
