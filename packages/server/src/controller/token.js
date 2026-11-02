const BaseRest = require('./rest.js');

module.exports = class extends BaseRest {
  getAction() {
    const { userInfo } = this.ctx.state;

    // Admins get the storage type so the dashboard can show storage-specific
    // notices (like the LeanCloud shutdown warning) only where they apply.
    if (userInfo?.type === 'administrator') {
      return this.success({ ...userInfo, storage: this.config('storage') });
    }

    return this.success(userInfo);
  }

  postAction() {
    return this.runCore(async (core, ctx) => ({
      ...(await core.auth.login(this.post(), ctx)),
      password: null,
    }));
  }

  deleteAction() {}
};
