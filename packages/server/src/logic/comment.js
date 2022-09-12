const Base = require('./base');
const qs = require('querystring');
const fetch = require('node-fetch');

module.exports = class extends Base {
  checkAdmin() {
    const { userInfo } = this.ctx.state;

    if (think.isEmpty(userInfo)) {
      return this.ctx.throw(401);
    }

    if (userInfo.type !== 'administrator') {
      return this.ctx.throw(403);
    }
  }

  /**
   * @api {GET} /comment Get comment list for client
   * @apiGroup Comment
   * @apiVersion  0.0.1
   *
   * @apiParam  {String}  path  comment url path
   * @apiParam  {String}  page  page
   * @apiParam  {String}  pagesize  page size
   * @apiParam  {String}  sortBy  comment sort type, one of 'insertedAt_desc', 'insertedAt_asc', 'like_desc'
   *
   * @apiSuccess  (200) {Number}  page return current comments list page
   * @apiSuccess  (200) {Number}  pageSize  to  return error message if error
   * @apiSuccess  (200) {Object[]}  data  comments list
   * @apiSuccess  (200) {String}  data.nick comment user nick name
   * @apiSuccess  (200) {String}  data.mail comment user mail md5
   * @apiSuccess  (200) {String}  data.link comment user link
   * @apiSuccess  (200) {String}  data.objectId comment id
   * @apiSuccess  (200) {String}  data.browser comment user browser
   * @apiSuccess  (200) {String}  data.os comment user os
   * @apiSuccess  (200) {String}  data.insertedAt comment created time
   * @apiSuccess  (200) {String}  data.avatar comment user avatar
   * @apiSuccess  (200) {String}  data.type comment login user type
   * @apiSuccess  (200) {Object[]}  data.children children comments list
   * @apiSuccess  (200) {String}  data.children.nick comment user nick name
   * @apiSuccess  (200) {String}  data.children.mail comment user mail md5
   * @apiSuccess  (200) {String}  data.children.link comment user link
   * @apiSuccess  (200) {String}  data.children.objectId comment id
   * @apiSuccess  (200) {String}  data.children.browser comment user browser
   * @apiSuccess  (200) {String}  data.children.os comment user os
   * @apiSuccess  (200) {String}  data.children.insertedAt comment created time
   * @apiSuccess  (200) {String}  data.children.avatar comment user avatar
   * @apiSuccess  (200) {String}  data.children.type comment login user type
   */
  /**
   * @api {GET} /comment?type=list Get comment list for admin
   * @apiGroup Comment
   * @apiVersion  0.0.1
   *
   * @apiParam  {String}  page  page
   * @apiParam  {String}  pagesize  page size
   *
   * @apiSuccess  (200) {Number}  errno 0
   * @apiSuccess  (200) {String}  errmsg  return error message if error
   * @apiSuccess  (200) {Object}  data
   * @apiSuccess  (200) {Number}  data.page comments list current page
   * @apiSuccess  (200) {Number}  data.pageSize comments list page size
   * @apiSuccess  (200) {Number}  data.totalPages comments list total pages
   * @apiSuccess  (200) {Number}  data.spamCount spam comments count
   * @apiSuccess  (200) {Number}  data.waitingCount waiting comments count
   * @apiSuccess  (200) {Object[]}  data.data comments list data
   * @apiSuccess  (200) {String}  data.data.ip comment user ip address
   * @apiSuccess  (200) {String}  data.data.nick comment user nick name
   * @apiSuccess  (200) {String}  data.data.mail comment user mail md5
   * @apiSuccess  (200) {String}  data.data.link comment user link
   * @apiSuccess  (200) {String}  data.data.objectId comment id
   * @apiSuccess  (200) {String}  data.data.status comment status, approved, waiting or spam
   * @apiSuccess  (200) {String}  data.data.ua  comment user agent
   * @apiSuccess  (200) {String}  data.data.insertedAt comment created time
   * @apiSuccess  (200) {String}  data.data.avatar comment user avatar
   * @apiSuccess  (200) {String}  data.data.url comment article link
   */
  /**
   * @api {GET} /comment?type=count Get comment count for articles
   * @apiGroup Comment
   * @apiVersion  0.0.1
   *
   * @apiParam  {String}  url a array string join by comma just like `a` or `a,b`, return site comment count if url empty
   *
   * @apiSuccessExample {Number} Single Path Response:
   * 300
   * @apiSuccessExample {Number} Multiple Path Response:
   * [300, 100]
   */
  /**
   * @api {GET} /comment?type=recent Get recent comments
   * @apiGroup Comment
   * @apiVersion  0.0.1
   *
   * @apiParam  {String}  count return comments number, default value is 10
   *
   * @apiSuccess  (200) {Object[]} response
   * @apiSuccess  (200) {String}  response.nick comment user nick name
   * @apiSuccess  (200) {String}  response.mail comment user mail md5
   * @apiSuccess  (200) {String}  response.link comment user link
   * @apiSuccess  (200) {String}  response.objectId comment id
   * @apiSuccess  (200) {String}  response.browser comment user browser
   * @apiSuccess  (200) {String}  response.os comment user os
   * @apiSuccess  (200) {String}  response.insertedAt comment created time
   * @apiSuccess  (200) {String}  response.avatar comment user avatar
   * @apiSuccess  (200) {String}  response.type comment login user type
   */
  getAction() {
    const { type, path } = this.get();
    const isAllowedGet = type !== 'list' || path;

    if (!isAllowedGet) {
      this.checkAdmin();
    }

    switch (type) {
      case 'recent':
        this.rules = {
          count: {
            int: { max: 50 },
            default: 10,
          },
        };
        break;

      case 'count':
        this.rules = {
          url: {
            array: true,
          },
        };
        break;

      case 'list': {
        const { userInfo } = this.ctx.state;

        if (userInfo.type !== 'administrator') {
          return this.fail();
        }
        this.rules = {
          page: {
            int: true,
            default: 1,
          },
          pageSize: {
            int: { max: 100 },
            default: 10,
          },
        };
        break;
      }

      default:
        this.rules = {
          path: {
            string: true,
            required: true,
          },
          page: {
            int: true,
            default: 1,
          },
          pageSize: {
            int: { max: 100 },
            default: 10,
          },
          sortBy: {
            in: ['insertedAt_desc', 'insertedAt_asc', 'like_desc'],
            default: 'insertedAt_desc',
          },
        };
        break;
    }
  }

  /**
   * @api {POST} /comment post comment
   * @apiGroup Comment
   * @apiVersion  0.0.1
   *
   * @apiParam  {String}  nick post comment user nick name
   * @apiParam  {String}  mail  post comment user mail address
   * @apiParam  {String}  link  post comment user link
   * @apiParam  {String}  comment  post comment text
   * @apiParam  {String}  url  the artcile url path of comment
   * @apiParam  {String}  ua  browser user agent
   * @apiParam  {String}  pid parent comment id
   * @apiParam  {String}  rid root comment id
   * @apiParam  {String}  at  parent comment user nick name
   *
   * @apiSuccess  (200) {Number}  errno 0
   * @apiSuccess  (200) {String}  errmsg  return error message if error
   * @apiSuccess  (200) {Object}  data  return comment data
   * @apiSuccess  (200) {String}  data.nick comment user nick name
   * @apiSuccess  (200) {String}  data.mail comment user mail md5
   * @apiSuccess  (200) {String}  data.link comment user link
   * @apiSuccess  (200) {String}  data.objectId comment id
   * @apiSuccess  (200) {String}  data.browser comment user browser
   * @apiSuccess  (200) {String}  data.os comment user os
   * @apiSuccess  (200) {String}  data.insertedAt comment created time
   * @apiSuccess  (200) {String}  data.avatar comment user avatar
   * @apiSuccess  (200) {String}  data.type comment login user type
   */
  async postAction() {
    const { LOGIN, RECAPTCHA_V3_SECRET } = process.env;
    const { userInfo } = this.ctx.state;

    if (!think.isEmpty(userInfo)) {
      return;
    }

    if (LOGIN === 'force') {
      return this.ctx.throw(401);
    }
    
    if (!RECAPTCHA_V3_SECRET) {
      return;
    }
    const { recaptchaV3 } = this.get();
    if (!recaptchaV3) {
      return this.ctx.throw(403);
    }

    const query = qs.string({
      secret: RECAPTCHA_V3_SECRET,
      response: recaptchaV3,
      remoteip: this.ctx.ip,
    });
    const recaptchaV3Result = await fetch(`https://recaptcha.net/recaptcha/api/siteverify?${query}`).then(resp => resp.json());
    if (!recaptchaV3Result.success) {
      think.logger.debug('RecaptchaV3 Result:', JSON.stringify(recaptchaV3Result, null, '\t'));
      return this.ctx.throw(403);
    }
  }

  /**
   * @api {PUT} /comment/:id update comment data
   * @apiGroup Comment
   * @apiVersion  0.0.1
   *
   * @apiParam  {String}  [nick] post comment user nick name
   * @apiParam  {String}  [mail]  post comment user mail address
   * @apiParam  {String}  [link]  post comment user link
   * @apiParam  {String}  [comment]  post comment text
   * @apiParam  {String}  [url]  the artcile url path of comment
   * @apiParam  {Boolean} [like] like comment
   *
   * @apiSuccess  (200) {Number}  errno 0
   * @apiSuccess  (200) {String}  errmsg  return error message if error
   */
  async putAction() {
    const { userInfo } = this.ctx.state;
    const { like } = this.post();

    // 1. like
    if (think.isEmpty(userInfo) && think.isBoolean(like)) {
      this.rules = {
        like: {
          required: true,
          boolean: true,
        },
      };

      return;
    }

    if (think.isEmpty(userInfo)) {
      return this.ctx.throw(401);
    }

    // 2. administrator
    if (userInfo.type === 'administrator') {
      return;
    }

    // 3. comment author modify comment content
    const modelInstance = this.service(
      `storage/${this.config('storage')}`,
      'Comment'
    );
    const commentData = await modelInstance.select({
      user_id: userInfo.objectId,
      objectId: this.id,
    });

    if (!think.isEmpty(commentData)) {
      return;
    }

    return this.ctx.throw(403);
  }

  /**
   * @api {DELETE} /comment/:id delete comment
   * @apiGroup Comment
   * @apiVersion  0.0.1
   *
   * @apiSuccess  (200) {Number}  errno 0
   * @apiSuccess  (200) {String}  errmsg  return error message if error
   */
  async deleteAction() {
    const { userInfo } = this.ctx.state;

    if (think.isEmpty(userInfo)) {
      return this.ctx.throw(401);
    }

    if (userInfo.type === 'administrator') {
      return;
    }

    const modelInstance = this.service(
      `storage/${this.config('storage')}`,
      'Comment'
    );
    const commentData = await modelInstance.select({
      user_id: userInfo.objectId,
      objectId: this.id,
    });

    if (!think.isEmpty(commentData)) {
      return;
    }

    return this.ctx.throw(403);
  }
};
