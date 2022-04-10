const Base = require('../base');

module.exports = class extends Base {
  async putAction() {
    this.rules = {
      email: {
        required: true,
      },
    };
  }
};
