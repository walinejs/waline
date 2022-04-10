const Base = require('../base');

module.exports = class extends Base {
  async getAction() {
    const { email } = this.get();
    const { userInfo } = this.ctx.state;

    if (think.isEmpty(userInfo) && !email) {
      return this.fail(401);
    }
  }

  async postAction() {
    const { userInfo } = this.ctx.state;
    if (think.isEmpty(userInfo)) {
      return this.fail(401);
    }

    this.rules = {
      code: {
        required: true,
        string: true,
        length: 6,
      },
    };
  }
};
