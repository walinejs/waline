const BaseRest = require('./rest.js');

module.exports = class extends BaseRest {
  getAction() {
    return this.success(this.ctx.state.userInfo);
  }

  postAction() {
    return this.runCore(async (core, ctx) => ({
      ...(await core.auth.login(this.post(), ctx)),
      password: null,
    }));
  }

  deleteAction() {}
};
