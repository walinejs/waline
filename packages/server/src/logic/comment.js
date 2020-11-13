module.exports = class extends think.Logic {
  getAction() {
    const {type} = this.get();
    switch(type) {
      case 'recent': 
        this.rules = {
          count: {
            int: true,
            default: 10,
            max: 50
          }
        };
        break;
      
      default:
        this.rules = {
          path: {
            string: true,
            required: true
          },
          page: {
            int: true,
            default: 1
          },
          pageSize: {
            int: true,
            default: 10,
            max: 100
          }
        };
        break;
    }
  }
}