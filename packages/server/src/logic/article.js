const Base = require('./base');

module.exports = class extends Base {
  getAction() {
    this.rules = {
      path: { array: true },
    };
  }
};
