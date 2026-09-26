const BaseRest = require('../rest.js');
const { createCorePorts, enableTwoFactor, getTwoFactorSetup } = require('../../core.js');

module.exports = class extends BaseRest {
  async getAction() {
    const { userInfo } = this.ctx.state;
    const { email } = this.get();

    return this.success(await getTwoFactorSetup({ email, userInfo }, createCorePorts(this)));
  }

  async postAction() {
    const data = this.post();
    const result = await enableTwoFactor(
      { ...data, userInfo: this.ctx.state.userInfo },
      createCorePorts(this),
    );

    if (!result) {
      return this.fail(this.locale('TWO_FACTOR_AUTH_ERROR_DETAIL'));
    }

    return this.success();
  }
};
