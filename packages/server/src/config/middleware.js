const cors = require('@koa/cors');
const isDev = think.env === 'development';

module.exports = [
  {
    handle: 'meta',
    options: {
      logRequest: isDev,
      sendResponseTime: isDev
    }
  },
  {
    handle: cors
  },
  {
    handle: 'trace',
    enable: !think.isCli,
    options: {
      debug: true,
      error(err, ctx) {
        if(/favicon.ico$/.test(ctx.url)) {
          return;
        }
        console.error(err);
      }
    }
  },
  {
    handle: 'payload',
    options: {
      keepExtensions: true,
      limit: '5mb'
    }
  },
  {
    handle: 'router',
    options: {}
  },
  'logic',
  'controller'
];
