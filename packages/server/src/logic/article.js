const Base = require('./base');

module.exports = class extends Base {
  getAction() {
    this.rules = {
      path: { array: true },
      type: { array: true, default: ['time'] },
    };
  }

  postAction() {
    this.rules = {
      path: {
        string: true,
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
