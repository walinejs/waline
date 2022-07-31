const fetch = require('node-fetch');
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
      async webhook(type, data) {
        const { WEBHOOK } = process.env;

        if (!WEBHOOK) {
          return;
        }

        return fetch(WEBHOOK, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({ type, data }),
        }).then((resp) => resp.json());
      },
    },
  },
];
