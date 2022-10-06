const Base = require('./base');

module.exports = class extends Base {
  /**
   * @api {GET} /user user list
   * @apiGroup User
   * @apiVersion  0.0.1
   *
   * @apiParam  {String}  pageSize  page size
   *
   * @apiSuccess  (200) {Number}  errno 0
   * @apiSuccess  (200) {String}  errmsg  return error message if error
   */
  getAction() {
    const { userInfo } = this.ctx.state;

    if (think.isEmpty(userInfo) || userInfo.type !== 'administrator') {
      this.rules = {
        pageSize: {
          int: { max: 50 },
          default: 20,
        },
      };

      return;
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
      email: {
        string: true,
      },
    };
  }

  /**
   * @api {POST} /user user register
   * @apiGroup User
   * @apiVersion  0.0.1
   *
   * @apiParam  {String}  display_name  user nick name
   * @apiParam  {String}  email user email
   * @apiParam  {String}  password user password
   * @apiParam  {String}  url user link
   *
   * @apiSuccess  (200) {Number}  errno 0
   * @apiSuccess  (200) {String}  errmsg  return error message if error
   * @apiSuccess  (200) {Object[]}  data  user list
   * @apiSuccess  (200) {String}  data.nick comment user nick name
   * @apiSuccess  (200) {String}  data.link comment user link
   * @apiSuccess  (200) {String}  data.avatar comment user avatar
   * @apiSuccess  (200) {String}  data.level comment user level
   * @apiSuccess  (200) {String}  data.label comment user label
   */
  postAction() {
    return this.useCaptchaCheck();
  }

  /**
   * @api {PUT} /user update user profile
   * @apiGroup User
   * @apiVersion  0.0.1
   *
   * @apiParam  {String}  [display_name]  user new nick name
   * @apiParam  {String}  [url] user new link
   * @apiParam  {String}  [password] user new password
   * @apiParam  {String}  [github] user github account name
   *
   * @apiSuccess  (200) {Number}  errno 0
   * @apiSuccess  (200) {String}  errmsg  return error message if error
   */
  putAction() {
    // you need login to update yourself profile
    const { userInfo } = this.ctx.state;

    if (think.isEmpty(userInfo)) {
      return this.fail();
    }

    // you should be a administrator to update otherself info
    if (this.id && userInfo.type !== 'administrator') {
      return this.fail();
    }
  }
};
