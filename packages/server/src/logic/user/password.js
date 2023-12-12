const Base = require('../base.js');

module.exports = class extends Base {
  async putAction() {
    this.rules = {
      email: {
        required: true,
      },
    };
  }
};
