const Model = require('think-model');
const Mongo = require('think-mongo');

module.exports = [
  Model(think.app),
  Mongo(think.app),
  {
    context: {
      get serverURL() {
        const { SERVER_URL } = process.env;
        if (SERVER_URL) {
          return SERVER_URL;
        }

        const { protocol, host } = this;
        return `${protocol}://${host}`;
      },
    },
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
