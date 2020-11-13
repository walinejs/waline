const Base = require('./base');
module.exports = class extends Base {
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

      case 'list':
        const {userInfo} = this.ctx.sate;
        if(userInfo.type !== 'administrator') {
          return this.fail();
        }
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

  putAction() {
    const {userInfo} = this.ctx.sate;
    if(userInfo.type !== 'administrator') {
      return this.fail();
    }
  }

  deleteAction() {
    const {userInfo} = this.ctx.sate;
    if(userInfo.type !== 'administrator') {
      return this.fail();
    }
  }
}