const Base = require('./base');

module.exports = class extends Base {
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
   */
  postAction() {}

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
    const { userInfo } = this.ctx.state;
    if (think.isEmpty(userInfo)) {
      return this.fail();
    }
  }
};
