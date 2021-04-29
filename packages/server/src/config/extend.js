const Model = require('think-model');
const Mongo = require('think-mongo');

module.exports = [
  Model(think.app),
  Mongo(think.app),
  {
    controller: {
      fail(...args) {
        if (this.ctx.status === 200) {
          this.ctx.status = 500;
        }
        this.ctx.fail(...args);
      },
    },
  },
];
