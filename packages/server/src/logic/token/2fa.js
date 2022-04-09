const Base = require('../base');

module.exports = class extends Base {
  async __before(...args) {
    await super.__before(...args);

    const { userInfo } = this.ctx.state;
    if (think.isEmpty(userInfo)) {
      return this.fail(401);
    }
  }

  async getAction() {}

  async postAction() {
    this.rules = {
      code: {
        required: true,
        string: true,
        length: 6,
      },
    };
  }
};
