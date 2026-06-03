import pkg from '../../package.json' with { type: 'json' };

export default () => async (ctx, next) => {
  ctx.set('x-waline-version', pkg.version);
  await next();
};
