const Base = require('./base.js');

module.exports = class OAuthLogic extends Base {
  indexAction() {}

  /**
   * @api {POST} /api/oauth/code exchange short login code
   * @apiGroup OAuth
   * @apiVersion 0.0.1
   *
   * @apiParam {String} code short login code
   * @apiParam {String} state login state
   */
  codeAction() {
    this.rules = {
      code: {
        required: true,
        string: true,
      },
      state: {
        string: true,
      },
    };
  }
};
