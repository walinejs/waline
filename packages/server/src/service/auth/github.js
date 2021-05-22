const qs = require('querystring');
const request = require('request-promise-native');
const Base = require('./base');

const OAUTH_URL = 'https://github.com/login/oauth/authorize';
const ACCESS_TOKEN_URL = 'https://github.com/login/oauth/access_token';
const USER_INFO_URL = 'https://api.github.com/user';
const USER_EMAILS = 'https://api.github.com/user/emails';
const { GITHUB_ID, GITHUB_SECRET } = process.env;
module.exports = class extends Base {
  getAuthUrl(opts) {
    const params = {
      client_id: GITHUB_ID,
      redirect_uri: opts.rdUrl,
      scope: 'read:user,user:email',
    };
    return OAUTH_URL + '?' + qs.stringify(params);
  }

  async getAccessToken(opts) {
    const params = {
      client_id: GITHUB_ID,
      client_secret: GITHUB_SECRET,
      code: opts.code,
    };

    const body = await request.post({
      url: ACCESS_TOKEN_URL,
      headers: { Accept: 'application/json' },
      form: params,
      json: true,
    });

    return body;
  }

  async getUserInfoByToken(opts) {
    const userInfo = await request.get({
      url: USER_INFO_URL,
      headers: {
        'User-Agent': '@waline',
        Authorization: 'token ' + opts.access_token,
      },
      json: true,
    });

    if (!userInfo.email) {
      const emails = await request.get({
        url: USER_EMAILS,
        headers: {
          'User-Agent': '@waline',
          Authorization: 'token ' + opts.access_token,
        },
        json: true,
      });

      if (emails.length) {
        userInfo.email = emails[0].email;
      }
    }

    return {
      github: userInfo.login,
      display_name: userInfo.name,
      email: userInfo.email,
      url: userInfo.blog,
      avatar: userInfo.avatar_url,
    };
  }

  async redirect() {
    const { app } = this;
    const { redirect, state } = app.get();
    const rdUrlAfterLogin = this.getCompleteUrl(redirect);

    const params = { redirect: rdUrlAfterLogin, state };
    const signinUrl =
      this.getCompleteUrl('/oauth/github') + '?' + qs.stringify(params);
    const AUTH_URL = this.getAuthUrl({ rdUrl: signinUrl });

    app.redirect(AUTH_URL);

    return app.success();
  }

  async getUserInfo() {
    const { code } = this.app.get();

    if (!code) {
      return this.redirect();
    }

    const accessTokenInfo = await this.getAccessToken({ code });

    return this.getUserInfoByToken(accessTokenInfo);
  }
};
