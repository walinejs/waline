import model from 'think-model';
import mongo from 'think-mongo';

import { isNetlify, netlifyFunctionPrefix } from './netlify.js';

export default [
  model(think.app),
  mongo(think.app),
  {
    context: {
      get serverURL() {
        const { SERVER_URL } = process.env;

        if (SERVER_URL) {
          return SERVER_URL;
        }

        const { protocol, host } = this;

        if (isNetlify) {
          return `${protocol}://${host}${netlifyFunctionPrefix}`;
        }

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
