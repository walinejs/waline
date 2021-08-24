const jwt = require('jsonwebtoken');
const helper = require('think-helper');
const { PasswordHash } = require('phpass');
const BaseRest = require('./rest');

module.exports = class extends BaseRest {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.service(
      `storage/${this.config('storage')}`,
      'Users'
    );
  }

  getAction() {
    return this.success(this.ctx.state.userInfo);
  }

  async postAction() {
    const { email, password } = this.post();
    const user = await this.modelInstance.select({ email });

    if (think.isEmpty(user) || /^verify:/i.test(user[0].type)) {
      return this.fail();
    }

    const checkPassword = new PasswordHash().checkPassword(
      password,
      user[0].password
    );

    if (!checkPassword) {
      return this.fail();
    }

    let avatar = user[0].avatar;

    if (/(github)/i.test(avatar)) {
      avatar =
        this.config('avatarProvider') + '?url=' + encodeURIComponent(avatar);
    }

    user[0].avatar = avatar;

    return this.success({
      ...user[0],
      password: null,
      mailMd5: helper.md5(user[0].email.toLowerCase()),
      token: jwt.sign(user[0].email, this.config('jwtKey')),
    });
  }

  deleteAction() {}
};
