const cors = require('@koa/cors');
const routerREST = require('think-router-rest');

const { isNetlify, netlifyFunctionPrefix } = require('./netlify.js');

const isDev = think.env === 'development';
const isTcb = think.env === 'cloudbase';
const isDeta = think.env === 'deta' || process.env.DETA_RUNTIME === 'true';
const isAliyunFC =
  think.env === 'aliyun-fc' || Boolean(process.env.FC_RUNTIME_VERSION);

module.exports = [
  {
    handle: 'dashboard',
    match: isNetlify ? new RegExp(`${netlifyFunctionPrefix}/ui`, 'i') : /^\/ui/,
  },

  {
    handle: 'prefix-warning',
  },
  {
    handle: 'meta',
    options: {
      logRequest: isDev,
      sendResponseTime: isDev,
      requestTimeoutCallback:
        isTcb || isDeta || isAliyunFC || isNetlify ? false : () => {},
    },
  },

  {
    handle: 'version',
  },

  { handle: cors },

  {
    handle: 'trace',
    enable: !think.isCli,
    options: {
      debug: true,
      contentType: () => 'json',
      error(err, ctx) {
        if (/favicon.ico$/.test(ctx.url)) {
          return;
        }
        if (think.isPrevent(err)) {
          return false;
        }

        console.error(err);
      },
    },
  },

  {
    handle: 'payload',
    options: {
      keepExtensions: true,
      limit: '5mb',
    },
  },

  {
    handle: 'router',
    options: {
      prefix: ['/api', `${netlifyFunctionPrefix}/api`, netlifyFunctionPrefix],
    },
  },

  { handle: routerREST },

  'logic',
  {
    handle: 'plugin',
  },
  'controller',
];
