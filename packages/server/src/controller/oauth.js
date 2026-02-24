const jwt = require('jsonwebtoken');

module.exports = class extends think.Controller {
  constructor(ctx) {
    super(ctx);
    this.modelInstance = this.getModel('Users');
  }

  async indexAction() {
    const { code, state, type, redirect } = this.get();
    const { oauthUrl } = this.config();

    if (!code) {
      const { serverURL } = this.ctx;
      const redirectUrl = think.buildUrl(`${serverURL}/api/oauth`, {
        redirect,
        type,
      });

      this.redirect(
        think.buildUrl(`${oauthUrl}/${type}`, {
          redirect: redirectUrl,
          state: this.ctx.state.token || '',
        }),
      );
      return;
    }

    /**
     * user = { id, name, email, avatar,url };
     */
    const params = { code, state };

    if (type === 'facebook') {
      const { serverURL } = this.ctx;
      const redirectUrl = think.buildUrl(`${serverURL}/api/oauth`, {
        redirect,
        type,
      });

      params.state = think.buildUrl(undefined, {
        redirect: redirectUrl,
        state: this.ctx.state.token || '',
      });
    }

    const user = await fetch(think.buildUrl(`${oauthUrl}/${type}`, params), {
      method: 'GET',
      headers: {
        'user-agent': '@waline',
      },
    }).then((resp) => resp.json());

    if (!user?.id) {
      return this.fail(user);
    }

    const userBySocial = await this.modelInstance.select({ [type]: user.id });

    // when the social account has been linked, then redirect to this linked account profile page. It may be current account or another.
    // If it's another account, user should unlink the social type in that account and then link it.
    if (!think.isEmpty(userBySocial)) {
      const token = jwt.sign(userBySocial[0].objectId, this.config('jwtKey'));

      if (redirect) {
        this.redirect(think.buildUrl(redirect, { token }));
        return;
      }

      return this.success();
    }

    const current = this.ctx.state.userInfo;

    // when login user link social type, then update data
    if (!think.isEmpty(current)) {
      const updateData = { [type]: user.id };

      if (!current.avatar && user.avatar) {
        updateData.avatar = user.avatar;
      }

      await this.modelInstance.update(updateData, {
        objectId: current.objectId,
      });

      this.redirect('/ui/profile');
      return;
    }

    // when user has not login, then we create account by the social type!
    const count = await this.modelInstance.count();
    const data = {
      display_name: user.name,
      email: user.email,
      url: user.url,
      avatar: user.avatar,
      [type]: user.id,
      passowrd: this.hashPassword(Math.random()),
      type: think.isEmpty(count) ? 'administrator' : 'guest',
    };

    const cmtUser = await this.modelInstance.add(data);

    if (!redirect) {
      return this.success();
    }

    // and then generate token!
    const token = jwt.sign(cmtUser.objectId, this.config('jwtKey'));

    this.redirect(redirect + (redirect.includes('?') ? '&' : '?') + 'token=' + token);
  }
};
