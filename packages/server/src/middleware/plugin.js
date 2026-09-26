const compose = require('koa-compose');

module.exports = () => async (ctx, next) => {
  const middlewares = think.getPluginMiddlewares();

  if (!think.isArray(middlewares) || middlewares.length === 0) {
    return next();
  }

  return compose(middlewares)(ctx, next);
};
