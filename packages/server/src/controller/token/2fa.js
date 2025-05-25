const speakeasy = require('speakeasy');

const BaseRest = require('../rest.js');

module.exports = class extends BaseRest {
  async getAction() {
    const { userInfo } = this.ctx.state;
    const { email } = this.get();

    if (think.isEmpty(userInfo) && email) {
      const userModel = this.getModel('Users');

      const user = await userModel.select(
        { email },
        {
          field: ['two_fa'],
        },
      );

      const is2FAEnabled = !think.isEmpty(user) && Boolean(user[0].two_fa);

      return this.success({ enable: is2FAEnabled });
    }

    const name = `waline_${userInfo.objectId}`;
    const twoFactorAuth = userInfo.two_fa;

    if (twoFactorAuth && twoFactorAuth.length === 32) {
      return this.success({
        otpauth_url: `otpauth://totp/${name}?secret=${twoFactorAuth}`,
        secret: twoFactorAuth,
      });
    }

    const { otpauth_url, base32: secret } = speakeasy.generateSecret({
      length: 20,
      name,
    });

    return this.success({ otpauth_url, secret });
  }

  async postAction() {
    const data = this.post();
    const verified = speakeasy.totp.verify({
      secret: data.secret,
      encoding: 'base32',
      token: data.code,
      window: 2,
    });

    if (!verified) {
      return this.fail(this.locale('TWO_FACTOR_AUTH_ERROR_DETAIL'));
    }

    const userModel = this.getModel('Users');
    const { objectId } = this.ctx.state.userInfo;

    await userModel.update({ two_fa: data.secret }, { objectId });

    return this.success();
  }
};
