const BaseRest = require('./rest.js');

module.exports = class UpgradeController extends BaseRest {
  async getAction() {
    const user = this.ctx.state.userInfo;
    if (!['administrator', 'super_admin'].includes(user?.type)) return this.ctx.throw(403);
    return this.success(await this.service('upgrade').status(this));
  }

  async postAction() {
    const user = this.ctx.state.userInfo;
    if (!['administrator', 'super_admin'].includes(user?.type)) return this.ctx.throw(403);
    return this.success(await this.service('upgrade').run(this));
  }
};
