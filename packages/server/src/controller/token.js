const BaseRest = require('./rest.js');
const { createCorePorts, getCurrentUser, login } = require('../core.js');

module.exports = class extends BaseRest {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.getModel('Users');
  }

  getAction() {
    return this.success(getCurrentUser(this.ctx.state));
  }

  async postAction() {
    const { email, password, code } = this.post();
    const user = await login({ email, password, code }, createCorePorts(this));

    return user ? this.success(user) : this.fail();
  }

  deleteAction() {}
};
