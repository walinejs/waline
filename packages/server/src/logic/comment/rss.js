const Base = require('../base.js');

module.exports = class extends Base {
  /**
   * @api {GET} /api/comment/rss Get site recent comments RSS
   * @apiGroup Comment
   * @apiVersion  0.0.1
   *
   * @apiParam  {String}  [count]  return comments number, default value is 20
   *
   * @apiHeader  {String}  Content-Type  application/rss+xml
   * @apiSuccess  (200) {String}  body  RSS 2.0 xml content
   */
  /**
   * @api {GET} /api/comment/rss?path= Get comments RSS for a path
   * @apiGroup Comment
   * @apiVersion  0.0.1
   *
   * @apiParam  {String}  path  comment url path
   * @apiParam  {String}  [count]  return comments number, default value is 20
   *
   * @apiHeader  {String}  Content-Type  application/rss+xml
   * @apiSuccess  (200) {String}  body  RSS 2.0 xml content
   */
  /**
   * @api {GET} /api/comment/rss?email=&user_id= Get reply comments RSS for user
   * @apiGroup Comment
   * @apiVersion  0.0.1
   *
   * @apiParam  {String}  [email]  comment user email
   * @apiParam  {String}  [user_id]  comment user id
   * @apiParam  {String}  [count]  return comments number, default value is 20
   *
   * @apiHeader  {String}  Content-Type  application/rss+xml
   * @apiSuccess  (200) {String}  body  RSS 2.0 xml content
   */
  getAction() {
    this.rules = {
      path: {
        string: true,
      },
      email: {
        email: true,
      },
      user_id: {
        string: true,
      },
      count: {
        int: { max: 50 },
        default: 20,
      },
    };
  }
};
