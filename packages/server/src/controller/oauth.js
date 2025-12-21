const jwt = require('jsonwebtoken');

module.exports = class extends think.Controller {
  constructor(ctx) {
    super(ctx);
    this.modelInstance = this.getModel('Users');
  }

  async indexAction() {
    const {
      code,
      oauth_verifier,
      oauth_token,
      type: rawType,
      redirect,
    } = this.get();
    const type = rawType ? rawType.replace(/\/$/, '') : rawType;
    const { oauthUrl: rawOauthUrl } = this.config();
    const oauthUrl = rawOauthUrl ? rawOauthUrl.replace(/\/$/, '') : rawOauthUrl;
    const { serverURL } = this.ctx;

    const hasCode =
      type === 'twitter' ? oauth_token && oauth_verifier : Boolean(code);

    if (!hasCode) {
      const redirectUrl = think.buildUrl(`${serverURL}/api/oauth`, {
        type,
        redirect,
      });

      return this.redirect(
        think.buildUrl(`${oauthUrl}/${type}`, {
          redirect: redirectUrl,
          state: this.ctx.state.token || '',
        }),
      );
    }

    /**
     * user = { id, name, email, avatar,url };
     */
    const params = {
      code,
      oauth_verifier,
      oauth_token,
      redirect: think.buildUrl(`${serverURL}/api/oauth`, {
        type,
        redirect,
      }),
    };

    if (type === 'facebook') {
      const redirectUrl = think.buildUrl(`${serverURL}/api/oauth`, {
        redirect,
        type,
      });

      params.state = think.buildUrl(undefined, {
        redirect: redirectUrl,
        state: this.ctx.state.token || '',
      });
    }

    const fetchUrl = think.buildUrl(`${oauthUrl}/${type}`, params);

    const user = await fetch(fetchUrl, {
      method: 'GET',
      headers: {
        'user-agent': '@waline',
      },
    }).then(async (resp) => {
      const contentType = resp.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
        return resp.json();
      }
      const text = await resp.text();

      return { error: `Failed to fetch user info: ${resp.status} ${text}` };
    });

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
