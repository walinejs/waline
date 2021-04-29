const Base = require('./base');

module.exports = class extends Base {
  putAction() {
    const { userInfo } = this.ctx.state;
    if (think.isEmpty(userInfo)) {
      return this.fail();
    }
  }
};
