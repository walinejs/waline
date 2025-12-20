module.exports = () => async (ctx, next) => {
  const { oauthUrl } = think.config();
  const oauthResp = await fetch(oauthUrl, {
    method: 'GET',
    headers: {
      'user-agent': '@waline',
    },
  }).then((resp) => resp.json());

  if (!oauthResp || !Array.isArray(oauthResp.services)) {
    ctx.throw(502);
  }
  ctx.state.oauthServices = oauthResp.services || [];

  await next();
};
