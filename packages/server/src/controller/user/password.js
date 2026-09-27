const BaseRest = require('../rest.js');

module.exports = class extends BaseRest {
  putAction() {
    if (!process.env.SMTP_HOST && !process.env.SMTP_SERVICE) return this.fail();

    return this.runCore((core, ctx) =>
      core.auth.requestPasswordReset({ email: this.post('email') }, ctx),
    );
  }
};
