const Base = require('./base.js');

module.exports = class UserLogic extends Base {
  postAction() {
    return this.useCaptchaCheck();
  }
};
