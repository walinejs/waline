const BaseRest = require('./rest.js');

module.exports = class UpgradeController extends BaseRest {
  async getAction() {
    const user = this.ctx.state.userInfo;
    if (user?.type !== 'administrator') return this.ctx.throw(403);
    return this.success(await this.service('upgrade').status(this));
  }

  async postAction() {
    const user = this.ctx.state.userInfo;
    if (user?.type !== 'administrator') return this.ctx.throw(403);
    return this.success(await this.service('upgrade').run(this));
  }
};
