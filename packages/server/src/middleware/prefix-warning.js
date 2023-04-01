const DEPRECATE_ROUTER_NEXT_VERSION = [
  '/comment',
  '/db',
  '/oauth',
  '/token',
  '/user',
  '/verification',
  '/token/2fa',
  '/user/password'
];

module.exports = () => async (ctx, next) => {
  ctx.state.deprecated = DEPRECATE_ROUTER_NEXT_VERSION.some(prefix => ctx.path.indexOf(prefix) === 0);
  if (ctx.state.deprecated) {
    think.logger.warn(`[Deprecated] ${ctx.path} API will be deprecated in the next major version, please don't use it anymore. If you are using \`@waline/client\` please upgrade to \`@waline/client@3\`. For other scenarios, you can use \`/api${ctx.path}\` to replace it.`)
  }

  await next();
};
