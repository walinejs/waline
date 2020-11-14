const Base = require('./base');
module.exports = class extends Base {
  getAction() {
    const {type} = this.get();
    switch(type) {
      case 'recent': 
        this.rules = {
          count: {
            int: {max: 50},
            default: 10
          }
        };
        break;

      case 'count':
        this.rules = {
          url: {
            string: true,
            required: true
          }
        };
        break;

      case 'list':
        const {userInfo} = this.ctx.state;
        if(userInfo.type !== 'administrator') {
          return this.fail();
        }
        this.rules = {
          page: {
            int: true,
            default: 1
          },
          pageSize: {
            int: {max: 100},
            default: 10
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
            int: {max: 100},
            default: 10
          }
        };
        break;
    }
  }

  putAction() {
    const {userInfo} = this.ctx.state;
    if(userInfo.type !== 'administrator') {
      return this.fail();
    }
  }

  deleteAction() {
    const {userInfo} = this.ctx.state;
    if(userInfo.type !== 'administrator') {
      return this.fail();
    }
  }
}