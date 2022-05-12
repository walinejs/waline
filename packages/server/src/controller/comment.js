const parser = require('ua-parser-js');
const BaseRest = require('./rest');
const akismet = require('../service/akismet');
const { getMarkdownParser } = require('../service/markdown');

const markdownParser = getMarkdownParser();
async function formatCmt(
  { ua, user_id, ip, ...comment },
  users = [],
  { avatarProxy },
  loginUser
) {
  ua = parser(ua);
  if (!think.config('disableUserAgent')) {
    comment.browser = `${ua.browser.name || ''}${(ua.browser.version || '')
      .split('.')
      .slice(0, 2)
      .join('.')}`;
    comment.os = [ua.os.name, ua.os.version].filter((v) => v).join(' ');
  }

  const user = users.find(({ objectId }) => user_id === objectId);
  if (!think.isEmpty(user)) {
    comment.nick = user.display_name;
    comment.mail = user.email;
    comment.link = user.url;
    comment.type = user.type;
    comment.label = user.label;
  }

  const avatarUrl =
    user && user.avatar
      ? user.avatar
      : await think.service('avatar').stringify(comment);
  comment.avatar =
    avatarProxy && !avatarUrl.includes(avatarProxy)
      ? avatarProxy + '?url=' + encodeURIComponent(avatarUrl)
      : avatarUrl;

  const isAdmin = loginUser && loginUser.type === 'administrator';
  if (!isAdmin) {
    delete comment.mail;
  } else {
    comment.orig = comment.comment;
    comment.ip = ip;
  }

  // administrator can always show region
  if (isAdmin || !think.config('disableRegion')) {
    comment.addr = await think.ip2region(ip, { depth: isAdmin ? 3 : 1 });
  }
  comment.comment = markdownParser(comment.comment);
  comment.like = Number(comment.like) || 0;
  return comment;
}

module.exports = class extends BaseRest {
  constructor(ctx) {
    super(ctx);
    this.modelInstance = this.service(
      `storage/${this.config('storage')}`,
      'Comment'
    );
  }

  async getAction() {
    const { type } = this.get();
    const { userInfo } = this.ctx.state;

    switch (type) {
      case 'recent': {
        const { count } = this.get();
        const where = {};
        if (think.isEmpty(userInfo) || this.config('storage') === 'deta') {
          where.status = ['NOT IN', ['waiting', 'spam']];
        } else {
          where._complex = {
            _logic: 'or',
            status: ['NOT IN', ['waiting', 'spam']],
            user_id: userInfo.objectId,
          };
        }

        const comments = await this.modelInstance.select(where, {
          desc: 'insertedAt',
          limit: count,
          field: [
            'status',
            'comment',
            'insertedAt',
            'link',
            'mail',
            'nick',
            'url',
            'pid',
            'rid',
            'ua',
            'ip',
            'user_id',
            'sticky',
            'like',
          ],
        });

        const userModel = this.service(
          `storage/${this.config('storage')}`,
          'Users'
        );
        const user_ids = Array.from(
          new Set(comments.map(({ user_id }) => user_id).filter((v) => v))
        );

        let users = [];
        if (user_ids.length) {
          users = await userModel.select(
            { objectId: ['IN', user_ids] },
            {
              field: [
                'display_name',
                'email',
                'url',
                'type',
                'avatar',
                'label',
              ],
            }
          );
        }

        return this.json(
          await Promise.all(
            comments.map((cmt) =>
              formatCmt(cmt, users, this.config(), userInfo)
            )
          )
        );
      }

      case 'count': {
        const { url } = this.get();
        const where = { url: ['IN', url] };
        if (think.isEmpty(userInfo) || this.config('storage') === 'deta') {
          where.status = ['NOT IN', ['waiting', 'spam']];
        } else {
          where._complex = {
            _logic: 'or',
            status: ['NOT IN', ['waiting', 'spam']],
            user_id: userInfo.objectId,
          };
        }
        const data = await this.modelInstance.select(where, { field: ['url'] });
        const counts = url.map(
          (u) => data.filter(({ url }) => url === u).length
        );

        return this.json(counts.length === 1 ? counts[0] : counts);
      }

      case 'list': {
        const { page, pageSize, owner, status, keyword } = this.get();
        const where = {};

        if (owner === 'mine') {
          const { userInfo } = this.ctx.state;
          where.mail = userInfo.email;
        }

        if (status) {
          where.status = status;

          // compat with valine old data without status property
          if (status === 'approved') {
            where.status = ['NOT IN', ['waiting', 'spam']];
          }
        }

        if (keyword) {
          where.comment = ['LIKE', `%${keyword}%`];
        }

        const count = await this.modelInstance.count(where);
        const spamCount = await this.modelInstance.count({ status: 'spam' });
        const waitingCount = await this.modelInstance.count({
          status: 'waiting',
        });
        const comments = await this.modelInstance.select(where, {
          desc: 'insertedAt',
          limit: pageSize,
          offset: Math.max((page - 1) * pageSize, 0),
        });

        const userModel = this.service(
          `storage/${this.config('storage')}`,
          'Users'
        );
        const user_ids = Array.from(
          new Set(comments.map(({ user_id }) => user_id).filter((v) => v))
        );

        let users = [];
        if (user_ids.length) {
          users = await userModel.select(
            { objectId: ['IN', user_ids] },
            {
              field: [
                'display_name',
                'email',
                'url',
                'type',
                'avatar',
                'label',
              ],
            }
          );
        }

        return this.success({
          page,
          totalPages: Math.ceil(count / pageSize),
          pageSize,
          spamCount,
          waitingCount,
          data: await Promise.all(
            comments.map((cmt) =>
              formatCmt(cmt, users, this.config(), userInfo)
            )
          ),
        });
      }

      default: {
        const { path: url, page, pageSize } = this.get();
        const where = { url };
        if (think.isEmpty(userInfo) || this.config('storage') === 'deta') {
          where.status = ['NOT IN', ['waiting', 'spam']];
        } else if (userInfo.type !== 'administrator') {
          where._complex = {
            _logic: 'or',
            status: ['NOT IN', ['waiting', 'spam']],
            user_id: userInfo.objectId,
          };
        }

        const totalCount = await this.modelInstance.count(where);
        const pageOffset = Math.max((page - 1) * pageSize, 0);
        let comments = [];
        let rootComments = [];
        let rootCount = 0;
        const selectOptions = {
          desc: 'insertedAt',
          field: [
            'status',
            'comment',
            'insertedAt',
            'link',
            'mail',
            'nick',
            'pid',
            'rid',
            'ua',
            'ip',
            'user_id',
            'sticky',
            'like',
          ],
        };

        /**
         * most of case we have just little comments
         * while if we want get rootComments, rootCount, childComments with pagination
         * we have to query three times from storage service
         * That's so expensive for user, especially in the serverless.
         * so we have a comments length check
         * If you have less than 1000 comments, then we'll get all comments one time
         * then we'll compute rootComment, rootCount, childComments in program to reduce http request query
         *
         * Why we have limit and the limit is 1000?
         * Many serverless storages have fetch data limit, for example LeanCloud is 100, and CloudBase is 1000
         * If we have much commments, We should use more request to fetch all comments
         * If we have 3000 comments, We have to use 30 http request to fetch comments, things go athwart.
         * And Serverless Service like vercel have excute time limit
         * if we have more http requests in a serverless function, it may timeout easily.
         * so we use limit to avoid it.
         */
        if (totalCount < 1000) {
          comments = await this.modelInstance.select(where, selectOptions);
          rootCount = comments.filter(({ rid }) => !rid).length;
          rootComments = [
            ...comments.filter(({ rid, sticky }) => !rid && sticky),
            ...comments.filter(({ rid, sticky }) => !rid && !sticky),
          ].slice(pageOffset, pageOffset + pageSize);
          const rootIds = {};
          rootComments.forEach(({ objectId }) => {
            rootIds[objectId] = true;
          });
          comments = comments.filter(
            (cmt) => rootIds[cmt.objectId] || rootIds[cmt.rid]
          );
        } else {
          rootComments = await this.modelInstance.select(
            { ...where, rid: undefined },
            {
              ...selectOptions,
              offset: pageOffset,
              limit: pageSize,
            }
          );
          const children = await this.modelInstance.select(
            {
              ...where,
              rid: ['IN', rootComments.map(({ objectId }) => objectId)],
            },
            selectOptions
          );
          comments = [...rootComments, ...children];
          rootCount = await this.modelInstance.count({
            ...where,
            rid: undefined,
          });
        }

        const userModel = this.service(
          `storage/${this.config('storage')}`,
          'Users'
        );
        const user_ids = Array.from(
          new Set(comments.map(({ user_id }) => user_id).filter((v) => v))
        );
        let users = [];

        if (user_ids.length) {
          users = await userModel.select(
            { objectId: ['IN', user_ids] },
            {
              field: [
                'display_name',
                'email',
                'url',
                'type',
                'avatar',
                'label',
              ],
            }
          );
        }

        if (think.isArray(this.config('levels'))) {
          const countWhere = {
            status: ['NOT IN', ['waiting', 'spam']],
            _complex: {},
          };
          if (user_ids.length) {
            countWhere._complex.user_id = ['IN', user_ids];
          }
          const mails = Array.from(
            new Set(comments.map(({ mail }) => mail).filter((v) => v))
          );
          if (mails.length) {
            countWhere._complex.mail = ['IN', mails];
          }
          if (!think.isEmpty(countWhere._complex)) {
            countWhere._complex._logic = 'or';
          } else {
            delete countWhere._complex;
          }
          const counts = await this.modelInstance.count(countWhere, {
            group: ['user_id', 'mail'],
          });
          comments.forEach((cmt) => {
            const countItem = (counts || []).find(({ mail, user_id }) => {
              if (cmt.user_id) {
                return user_id === cmt.user_id;
              }
              return mail === cmt.mail;
            });

            let level = 0;
            if (countItem) {
              const _level = think.findLastIndex(
                this.config('levels'),
                (l) => l <= countItem.count
              );
              if (_level !== -1) {
                level = _level;
              }
            }
            cmt.level = level;
          });
        }

        return this.json({
          page,
          totalPages: Math.ceil(rootCount / pageSize),
          pageSize,
          count: totalCount,
          data: await Promise.all(
            rootComments.map(async (comment) => {
              const cmt = await formatCmt(
                comment,
                users,
                this.config(),
                userInfo
              );
              cmt.children = await Promise.all(
                comments
                  .filter(({ rid }) => rid === cmt.objectId)
                  .map((cmt) => formatCmt(cmt, users, this.config(), userInfo))
                  .reverse()
              );
              return cmt;
            })
          ),
        });
      }
    }
  }

  async postAction() {
    think.logger.debug('Post Comment Start!');

    const { comment, link, mail, nick, pid, rid, ua, url, at } = this.post();
    const data = {
      link,
      mail,
      nick,
      pid,
      rid,
      ua,
      url,
      comment,
      ip: this.ctx.ip,
      insertedAt: new Date(),
      user_id: this.ctx.state.userInfo.objectId,
    };

    if (pid) {
      data.comment = `[@${at}](#${pid}): ` + data.comment;
    }

    think.logger.debug('Post Comment initial Data:', data);

    const { userInfo } = this.ctx.state;

    if (!userInfo || userInfo.type !== 'administrator') {
      /** IP disallowList */
      const { disallowIPList } = this.config();

      if (
        think.isArray(disallowIPList) &&
        disallowIPList.length &&
        disallowIPList.includes(data.ip)
      ) {
        think.logger.debug(`Comment IP ${data.ip} is in disallowIPList`);

        return this.ctx.throw(403);
      }

      think.logger.debug(`Comment IP ${data.ip} check OK!`);

      /** Duplicate content detect */
      const duplicate = await this.modelInstance.select({
        url,
        mail: data.mail,
        nick: data.nick,
        link: data.link,
        comment: data.comment,
      });

      if (!think.isEmpty(duplicate)) {
        think.logger.debug(
          'The comment author had post same comment content before'
        );

        return this.fail(this.locale('Duplicate Content'));
      }

      think.logger.debug('Comment duplicate check OK!');

      /** IP Frequence */
      const { IPQPS = 60 } = process.env;

      const recent = await this.modelInstance.select({
        ip: this.ctx.ip,
        insertedAt: ['>', new Date(Date.now() - IPQPS * 1000)],
      });

      if (!think.isEmpty(recent)) {
        think.logger.debug(`The author has posted in ${IPQPS} seconeds.`);
        return this.fail(this.locale('Comment too fast!'));
      }

      think.logger.debug(`Comment post frequence check OK!`);

      /** Akismet */
      const { COMMENT_AUDIT, AUTHOR_EMAIL, BLOGGER_EMAIL } = process.env;
      const AUTHOR = AUTHOR_EMAIL || BLOGGER_EMAIL;
      const isAuthorComment = AUTHOR
        ? data.mail.toLowerCase() === AUTHOR.toLowerCase()
        : false;

      data.status = COMMENT_AUDIT && !isAuthorComment ? 'waiting' : 'approved';

      think.logger.debug(`Comment initial status is ${data.status}`);

      if (data.status === 'approved') {
        const spam = await akismet(data, this.ctx.serverURL).catch((e) =>
          console.log(e)
        ); // ignore akismet error

        if (spam === true) {
          data.status = 'spam';
        }
      }

      think.logger.debug(`Comment akismet check result: ${data.status}`);

      if (data.status !== 'spam') {
        /** KeyWord Filter */
        const { forbiddenWords } = this.config();

        if (!think.isEmpty(forbiddenWords)) {
          const regexp = new RegExp('(' + forbiddenWords.join('|') + ')', 'ig');
          if (regexp.test(comment)) {
            data.status = 'spam';
          }
        }
      }

      think.logger.debug(`Comment keyword check result: ${data.status}`);
    } else {
      data.status = 'approved';
    }

    const preSaveResp = await this.hook('preSave', data);

    if (preSaveResp) {
      return this.fail(preSaveResp.errmsg);
    }

    think.logger.debug(`Comment post hooks preSave done!`);

    const resp = await this.modelInstance.add(data);

    think.logger.debug(`Comment have been added to storage.`);

    let parentComment;
    if (pid) {
      parentComment = await this.modelInstance.select({ objectId: pid });
      parentComment = parentComment[0];
    }

    await this.ctx.webhook('new_comment', {
      comment: { ...resp, rawComment: comment },
      reply: parentComment,
    });

    if (comment.status !== 'spam') {
      const notify = this.service('notify');
      await notify.run(
        { ...resp, comment: markdownParser(resp.comment), rawComment: comment },
        parentComment
          ? { ...parentComment, comment: markdownParser(parentComment.comment) }
          : undefined
      );
    }

    think.logger.debug(`Comment notify done!`);

    await this.hook('postSave', resp, parentComment);

    think.logger.debug(`Comment post hooks postSave done!`);

    return this.success(
      await formatCmt(resp, [userInfo], this.config(), userInfo)
    );
  }

  async putAction() {
    const { userInfo } = this.ctx.state;
    let data = this.post();
    let oldData = await this.modelInstance.select({ objectId: this.id });
    if (think.isEmpty(oldData)) {
      return this.success();
    }

    oldData = oldData[0];
    if (think.isEmpty(userInfo) || userInfo.type !== 'administrator') {
      if (!think.isBoolean(data.like)) {
        return this.success();
      }

      const likeIncMax = this.config('LIKE_INC_MAX') || 1;
      data = {
        like:
          (Number(oldData.like) || 0) +
          (data.like ? Math.ceil(Math.random() * likeIncMax) : -1),
      };
    }

    const preUpdateResp = await this.hook('preUpdate', {
      ...data,
      objectId: this.id,
    });

    if (preUpdateResp) {
      return this.fail(preUpdateResp);
    }

    const newData = await this.modelInstance.update(data, {
      objectId: this.id,
    });

    if (
      oldData.status === 'waiting' &&
      data.status === 'approved' &&
      oldData.pid
    ) {
      let pComment = await this.modelInstance.select({
        objectId: oldData.pid,
      });
      pComment = pComment[0];

      const notify = this.service('notify');
      await notify.run(
        { ...newData, comment: markdownParser(newData.comment) },
        { ...pComment, comment: markdownParser(pComment.comment) },
        true
      );
    }

    await this.hook('postUpdate', data);

    return this.success();
  }

  async deleteAction() {
    const preDeleteResp = await this.hook('preDelete', this.id);

    if (preDeleteResp) {
      return this.fail(preDeleteResp);
    }

    await this.modelInstance.delete({ objectId: this.id });
    await this.hook('postDelete', this.id);

    return this.success();
  }
};
