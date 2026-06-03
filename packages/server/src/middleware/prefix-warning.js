const DEPRECATE_ROUTER_NEXT_VERSION = [
  '/article',
  '/comment',
  '/db',
  '/oauth',
  '/token',
  '/user',
  '/verification',
  '/token/2fa',
  '/user/password',
];

export default () => async (ctx, next) => {
  ctx.state.deprecated = DEPRECATE_ROUTER_NEXT_VERSION.some((prefix) => {
    const oldAPI = new RegExp(`${prefix}$`, 'iu');
    const newAPI = new RegExp(`/api${prefix}$`, 'iu');

    return !newAPI.test(ctx.path) && oldAPI.test(ctx.path);
  });

  if (ctx.state.deprecated) {
    think.logger.warn(
      `[Deprecated] ${ctx.path} API will be deprecated in the next major version, please don't use it anymore. If you are using \`@waline/client\` please upgrade to \`@waline/client@3\`. For other scenarios, you can use \`/api${ctx.path}\` to replace it.`,
    );
  }

  await next();
};
