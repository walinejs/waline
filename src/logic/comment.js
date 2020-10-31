module.exports = class extends think.Logic {
  recentAction() {
    this.rules = {
      count: {
        int: true,
        default: 10
      }
    };
  }

  listAction() {
    this.rules = {
      url: {
        string: true,
        required: true
      },
      page: {
        int: true,
        default: 1
      },
      pageSize: {
        int: true,
        default: 10
      }
    }
  }
}