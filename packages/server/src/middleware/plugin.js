const compose = require('koa-compose');

module.exports = function() {
  return (ctx, next) => {
    const middlewares = think.getPluginMiddlewares();
    if (!think.isArray(middlewares) || !middlewares.length) {
      next();
    }
  
    compose(middlewares)(ctx, next);
  };
}