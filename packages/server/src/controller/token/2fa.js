const speakeasy = require('speakeasy');
const BaseRest = require('../rest');

module.exports = class extends BaseRest {
  async getAction() {
    const { userInfo } = this.ctx.state;
    const { email } = this.get();

    if (think.isEmpty(userInfo) && email) {
      const userModel = this.service(
        `storage/${this.config('storage')}`,
        'Users'
      );

      const user = await userModel.select(
        { email },
        {
          field: ['2fa'],
        }
      );
      const is2FAEnabled = !think.isEmpty(user) && Boolean(user[0]['2fa']);
      return this.success({ enable: is2FAEnabled });
    }

    const name = `waline_${userInfo.objectId}`;
    if (userInfo['2fa'] && userInfo['2fa'].length == 32) {
      return this.success({
        otpauth_url: `otpauth://totp/${name}?secret=${userInfo['2fa']}`,
        secret: userInfo['2fa'],
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

    const userModel = this.service(
      `storage/${this.config('storage')}`,
      'Users'
    );
    const { objectId } = this.ctx.state.userInfo;
    await userModel.update({ ['2fa']: data.secret }, { objectId });

    return this.success();
  }
};
