const Model = require('think-model');
const Mongo = require('think-mongo');
const request = require('request-promise-native');

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
      async webhook(type, data) {
        const { WEBHOOK } = process.env;
        if (!WEBHOOK) {
          return;
        }

        return request({
          uri: WEBHOOK,
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({ type, data }),
        });
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
