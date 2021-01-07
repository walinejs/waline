const qs = require('querystring');
const request = require('request-promise-native');
const Base = require('./base');

const OAUTH_URL = 'https://github.com/login/oauth/authorize';
const ACCESS_TOKEN_URL = 'https://github.com/login/oauth/access_token';
const USER_INFO_URL = 'https://api.github.com/user';
const {GITHUB_ID, GITHUB_SECRET} = process.env;
module.exports = class extends Base {
  getAuthUrl(opts) {
    const params = {
      client_id: GITHUB_ID,
      redirect_uri: opts.rdUrl,
      scope: 'user'
    };
    return OAUTH_URL + '?' + qs.stringify(params);
  }

  async getAccessToken(opts) {
    const params = {
      client_id: GITHUB_ID,
      client_secret: GITHUB_SECRET,
      code: opts.code
    };

    const body = await request.post({
      url: ACCESS_TOKEN_URL,
      headers: {'Accept': 'application/json'},
      form: params,
      json: true
    });
    return body;
  }

  async getUserInfoByToken(opts) {
    const userInfo = await request.get({
      url: USER_INFO_URL,
      headers: {
        'User-Agent': '@waline',
        'Authorization': 'token ' + opts.access_token
      },
      json: true
    });

    return {
      id: userInfo.login,
      name: userInfo.name,
      desc: userInfo.bio,
      avatar: userInfo.avatar_url
    };
  }

  async redirect() {
    const {app} = this;
    const {type, rdurl} = app.get();
    const rdUrlAfterLogin = this.getCompleteUrl(rdurl);

    const params = { rdurl: rdUrlAfterLogin, type };
    const signinUrl = this.getCompleteUrl('/oauth') + '?' + qs.stringify(params);
    const AUTH_URL = this.getAuthUrl({rdUrl: signinUrl});
    app.redirect(AUTH_URL);
    return app.success();
  }

  async getUserInfo() {
    const {code} = this.app.get();
    if (!code) {
      return this.redirect();
    }

    const accessTokenInfo = await this.getAccessToken({code});
    return this.getUserInfoByToken(accessTokenInfo);
  }
};
