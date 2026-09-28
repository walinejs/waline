const BaseRest = require('./rest.js');

module.exports = class OAuthController extends BaseRest {
  static _REST = false;

  indexAction() {
    const input = this.get();
    const { oauthUrl } = this.config();

    if (!input.code) {
      const redirectUrl = think.buildUrl(`${this.ctx.serverURL}/api/oauth`, {
        redirect: input.redirect,
        type: input.type,
      });
      this.redirect(
        think.buildUrl(`${oauthUrl}/${input.type}`, {
          redirect: redirectUrl,
          state: this.ctx.state.token || '',
        }),
      );
      return;
    }

    if (input.type === 'facebook') {
      const redirectUrl = think.buildUrl(`${this.ctx.serverURL}/api/oauth`, {
        redirect: input.redirect,
        type: input.type,
      });
      input.state = think.buildUrl(undefined, {
        redirect: redirectUrl,
        state: this.ctx.state.token || '',
      });
    }

    return this.runCore(
      async (core, ctx) => {
        const result = await core.oauth.authorize(input, ctx);

        if (ctx.state.userInfo?.objectId && !result.token) {
          this.redirect('/ui/profile');
        } else if (input.redirect && result.token) {
          this.redirect(think.buildUrl(input.redirect, { token: result.token }));
        } else {
          this.success();
        }
      },
      { raw: true },
    );
  }
};
