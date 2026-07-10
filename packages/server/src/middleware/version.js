const pkg = require('../../package.json');

module.exports = () => async (ctx, next) => {
  ctx.set('x-waline-version', pkg.version);
  // oxlint-disable-next-line node/callback-return
  await next();
};
