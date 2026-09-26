const Base = require('../base.js');

module.exports = class CommentRSSLogic extends Base {
  getAction() {
    const { identifier } = this.get();

    this.rules = {
      identifier: {
        string: true,
      },
      path: {
        string: true,
        default: identifier,
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
