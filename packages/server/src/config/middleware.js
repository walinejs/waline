const cors = require('@koa/cors');
const routerREST = require('think-router-rest');

const isDev = think.env === 'development';
const isTcb = think.env === 'cloudbase';
const isDeta = think.env === 'deta' || process.env.DETA_RUNTIME === 'true';
const isAliyunFC =
  think.env === 'aliyun-fc' || Boolean(process.env.FC_RUNTIME_VERSION);
const isNetlify = process.env.NETLIFY_IMAGES_CDN_DOMAIN && process.env._HANDLER;
const netlifyFunctionPrefix = `/.netlify/functions/${process.env._HANDLER.replace(
  /\.handler$/,
  ''
)}`;

module.exports = [
  {
    handle: 'dashboard',
    match: /^\/ui/,
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
      prefix: ['/api', netlifyFunctionPrefix, `${netlifyFunctionPrefix}/api`],
    },
  },

  { handle: routerREST },

  'logic',
  'controller',
];
