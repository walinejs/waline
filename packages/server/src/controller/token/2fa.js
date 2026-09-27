const BaseRest = require('../rest.js');

module.exports = class extends BaseRest {
  getAction() {
    const input = this.get();

    return this.runCore((core, ctx) =>
      input.email
        ? core.auth.getTwoFactorStatus(input, ctx)
        : core.auth.createTwoFactorSecret(input, ctx),
    );
  }

  postAction() {
    return this.runCore((core, ctx) => core.auth.enableTwoFactor(this.post(), ctx));
  }
};
