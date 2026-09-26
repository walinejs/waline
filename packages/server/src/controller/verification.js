const BaseRest = require('./rest.js');

module.exports = class extends BaseRest {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.getModel('Users');
  }

  async getAction() {
    const { token, email } = this.get();
    const users = await this.modelInstance.select({ email });

    if (think.isEmpty(users)) {
      return this.fail(this.locale('USER_NOT_EXIST'));
    }

    const [user] = users;
    const match = user.type.match(/^verify:(?<code>\d{4}):(?<timestamp>\d+)$/iu);

    if (!match) {
      return this.fail(this.locale('USER_REGISTERED'));
    }

    if (token === match.groups.code && Date.now() < Math.trunc(Number(match.groups.timestamp))) {
      await this.modelInstance.update({ type: 'guest' }, { email });

      this.redirect('/ui/login');
      return;
    }

    return this.fail(this.locale('TOKEN_EXPIRED'));
  }
};
