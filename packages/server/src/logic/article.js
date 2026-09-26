const Base = require('./base.js');

module.exports = class ArticleLogic extends Base {
  getAction() {
    const { identifier } = this.get();

    this.rules = {
      identifier: { array: true },
      path: { array: true, default: identifier },
      type: { array: true, default: ['time'] },
    };
  }

  postAction() {
    const { identifier } = this.post();

    this.rules = {
      identifier: {
        string: true,
      },
      path: {
        string: true,
        default: identifier,
      },
      type: {
        string: true,
        default: 'time',
      },
      action: {
        string: true,
        in: ['inc', 'desc'],
        default: 'inc',
      },
    };
  }
};
