const Base = require('./base');

module.exports = class extends Base {
  async __before(...args) {
    await super.__before(...args);

    const { userInfo } = this.ctx.state;
    if (think.isEmpty(userInfo)) {
      return this.fail(401);
    }

    if (userInfo.type !== 'administrator') {
      return this.fail(403);
    }
  }

  /**
   * @api {GET} /db export site data
   * @apiGroup Site
   * @apiVersion  0.0.1
   */
  async getAction() {}

  /**
   * @api {GET} /db import site data
   * @apiGroup Site
   * @apiVersion  0.0.1
   */
  async postAction() {}
};
