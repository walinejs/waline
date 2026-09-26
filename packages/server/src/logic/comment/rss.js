const Base = require('../base.js');

module.exports = class CommentRSSLogic extends Base {
  getAction() {
    this.rules = {
      path: {
        string: true,
      },
      email: {
        email: true,
      },
      user_id: {
        string: true,
      },
      count: {
        int: { max: 50 },
        default: 20,
      },
    };
  }
};
