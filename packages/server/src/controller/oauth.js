const jwt = require('jsonwebtoken');

module.exports = class extends think.Controller {
  constructor(ctx) {
    super(ctx);
    this.modelInstance = this.getModel('Users');
  }

  async indexAction() {
    const { code, oauth_verifier, oauth_token, type, redirect } = this.get();
    const { oauthUrl } = this.config();

    const hasCode =
      type === 'twitter' ? oauth_token && oauth_verifier : Boolean(code);

    if (!hasCode) {
      const { serverURL } = this.ctx;
      const redirectUrl = think.buildUrl(`${serverURL}/api/oauth`, {redirect, type});

      return this.redirect(think.buildUrl(`${oauthUrl}/${type}`, {
        redirect: redirectUrl, 
        state: this.ctx.state.token || ''
      }));
    }

    /**
     * user = { id, name, email, avatar,url };
     */
    const params = { code, oauth_verifier, oauth_token };

    if (type === 'facebook') {
      const { serverURL } = this.ctx;
      const redirectUrl = think.buildUrl(`${serverURL}/api/oauth`, {redirect, type});

      params.state = think.buildUrl(undefined, {
        redirect: redirectUrl,
        state: this.ctx.state.token || '',
      });
    }

    const user = await fetch(
      think.buildUrl(`${oauthUrl}/${type}`, params),
      {
        method: 'GET',
        headers: {
          'user-agent': '@waline',
        },
      },
    ).then((resp) => resp.json());

    if (!user?.id) {
      return this.fail(user);
    }

    const userBySocial = await this.modelInstance.select({ [type]: user.id });

    if (!think.isEmpty(userBySocial)) {
      const token = jwt.sign(userBySocial[0].email, this.config('jwtKey'));

      if (redirect) {
        return this.redirect(think.buildUrl(redirect, { token }));
      }

      return this.success();
    }

    if (!user.email) {
      user.email = `${user.id}@mail.${type}`;
    }

    const current = this.ctx.state.userInfo;

    if (!think.isEmpty(current)) {
      const updateData = { [type]: user.id };

      if (!current.avatar && user.avatar) {
        updateData.avatar = user.avatar;
      }

      await this.modelInstance.update(updateData, {
        objectId: current.objectId,
      });

      return this.redirect('/ui/profile');
    }

    const userByEmail = await this.modelInstance.select({ email: user.email });

    if (think.isEmpty(userByEmail)) {
      const count = await this.modelInstance.count();
      const data = {
        display_name: user.name,
        email: user.email,
        url: user.url,
        avatar: user.avatar,
        [type]: user.id,
        password: this.hashPassword(Math.random()),
        type: think.isEmpty(count) ? 'administrator' : 'guest',
      };

      await this.modelInstance.add(data);
    } else {
      const updateData = { [type]: user.id };

      if (!userByEmail.avatar && user.avatar) {
        updateData.avatar = user.avatar;
      }
      await this.modelInstance.update(updateData, { email: user.email });
    }

    const token = jwt.sign(user.email, this.config('jwtKey'));

    if (redirect) {
      return this.redirect(
        redirect + (redirect.includes('?') ? '&' : '?') + 'token=' + token,
      );
    }

    return this.success();
  }
};
