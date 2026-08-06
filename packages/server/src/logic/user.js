const Base = require('./base.js');

module.exports = class UserLogic extends Base {
  getAction() {
    const { userInfo } = this.ctx.state;

    if (think.isEmpty(userInfo) || userInfo.type !== 'administrator') {
      this.rules = {
        pageSize: {
          int: { max: 50 },
          default: 20,
        },
      };

      return;
    }

    this.rules = {
      page: {
        int: true,
        default: 1,
      },
      pageSize: {
        int: { max: 100 },
        default: 10,
      },
      email: {
        string: true,
      },
    };
  }

  async postAction() {
    return this.useCaptchaCheck();
  }

  putAction() {
    // you need login to update yourself profile
    const { userInfo } = this.ctx.state;

    if (think.isEmpty(userInfo)) {
      return this.fail();
    }

    // you should be a administrator to update others info
    if (this.id && userInfo.type !== 'administrator') {
      return this.fail();
    }

    this.rules = {
      email: {
        email: true,
      },
    };
  }

  deleteAction() {
    // you need to be logged in to delete users
    const { userInfo } = this.ctx.state;

    if (think.isEmpty(userInfo)) {
      return this.fail();
    }

    // you must be an administrator to delete other users and cannot delete yourself
    if (userInfo.type !== 'administrator' || this.id === userInfo.objectId) {
      return this.fail();
    }
  }
};
