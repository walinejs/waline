const BaseRest = require('./rest.js');

module.exports = class extends BaseRest {
  getAction() {
    return this.runCore(
      async (core, ctx) => {
        await core.verification.verifyEmail(this.get(), ctx);
        this.redirect('/ui/login');
      },
      { raw: true },
    );
  }
};
