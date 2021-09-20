const Base = require('./base');

module.exports = class extends Base {
  /**
   * @api {GET} /token  get login user info
   * @apiGroup User
   * @apiVersion  0.0.1
   *
   * @apiSuccess  (200) {Number}  errno 0
   * @apiSuccess  (200) {String}  errmsg  return error message if error
   * @apiSuccess  (200) {Object}  data user info
   * @apiSuccess  (200) {String}  data.avatar user avatar
   * @apiSuccess  (200) {String}  data.createdAt user register time
   * @apiSuccess  (200) {String}  data.display_name user nick name
   * @apiSuccess  (200) {String}  data.emal user email address
   * @apiSuccess  (200) {String}  data.github user github account name
   * @apiSuccess  (200) {String}  data.mailMd5 user mail md5
   * @apiSuccess  (200) {String}  data.objectId user id
   * @apiSuccess  (200) {String}  data.type user type, administrator or guest
   * @apiSuccess  (200) {String}  data.url user link
   */
  getAction() {}

  /**
   * @api {POST} /token user login
   * @apiGroup User
   * @apiVersion  0.0.1
   *
   * @apiParam  {String}  email login user email
   * @apiParam  {String}  password login user password
   *
   * @apiSuccess  (200) {Number}  errno 0
   * @apiSuccess  (200) {String}  errmsg  return error message if error
   */
  postAction() {}

  /**
   * @api {DELETE} /token  user logout
   * @apiGroup User
   * @apiVersion  0.0.1
   *
   * @apiSuccess  (200) {Number}  errno 0
   * @apiSuccess  (200) {String}  errmsg  return error message if error
   */
  deleteAction() {}
};
