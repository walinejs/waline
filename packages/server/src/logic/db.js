const Base = require('./base.js');

module.exports = class DatabaseLogic extends Base {
  async __before(...args) {
    await super.__before(...args);

    const { userInfo } = this.ctx.state;

    if (think.isEmpty(userInfo)) {
      return this.fail(401);
    }

    if (userInfo.type !== 'administrator') {
      return this.fail(403);
    }
  }

  async getAction() {}

  async postAction() {
    this.rules = {
      table: {
        string: true,
        required: true,
        method: 'GET',
      },
    };
  }

  async putAction() {
    this.rules = {
      table: {
        string: true,
        required: true,
        method: 'GET',
      },
      objectId: {
        required: true,
        method: 'GET',
      },
    };
  }

  async deleteAction() {
    this.rules = {
      table: {
        string: true,
        required: true,
        method: 'GET',
      },
    };
  }
};
