const jwt = require('jsonwebtoken');
const helper = require('think-helper');

module.exports = class extends think.Logic {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.service(
      `storage/${this.config('storage')}`,
      'Users'
    );
    this.id = this.getId();
  }

  async __before() {
    const referrer = this.ctx.referrer(true);
    let { secureDomains } = this.config();
    if (secureDomains && referrer && this.ctx.host.indexOf(referrer) !== 0) {
      secureDomains = think.isArray(secureDomains)
        ? secureDomains
        : [secureDomains];
      secureDomains.push(
        'localhost',
        '127.0.0.1',
        'github.com',
        'api.twitter.com',
        'www.facebook.com'
      );

      const match = secureDomains.some((domain) =>
        think.isFunction(domain.test)
          ? domain.test(referrer)
          : domain === referrer
      );
      if (!match) {
        return this.ctx.throw(403);
      }
    }

    this.ctx.state.userInfo = {};
    const { authorization } = this.ctx.req.headers;
    const { state } = this.get();
    if (!authorization && !state) {
      return;
    }
    const token = state || authorization.replace(/^Bearer /, '');
    const userMail = jwt.verify(token, think.config('jwtKey'));
    if (think.isEmpty(userMail) || !think.isString(userMail)) {
      return;
    }

    const user = await this.modelInstance.select(
      { email: userMail },
      {
        field: [
          'id',
          'email',
          'url',
          'display_name',
          'type',
          'github',
          'twitter',
          'facebook',
          'google',
          'weibo',
          'qq',
          'avatar',
          '2fa',
          'label',
        ],
      }
    );
    if (think.isEmpty(user)) {
      return;
    }

    const userInfo = user[0];

    let avatarUrl = userInfo.avatar
      ? userInfo.avatar
      : await think.service('avatar').stringify({
          mail: userInfo.email,
          nick: userInfo.display_name,
          link: userInfo.url,
        });
    const { avatarProxy } = think.config();
    if (avatarProxy) {
      avatarUrl = avatarProxy + '?url=' + encodeURIComponent(avatarUrl);
    }
    userInfo.avatar = avatarUrl;
    userInfo.mailMd5 = helper.md5(userInfo.email);
    this.ctx.state.userInfo = userInfo;
    this.ctx.state.token = token;
  }

  getId() {
    const id = this.get('id');

    if (id && (think.isString(id) || think.isNumber(id))) {
      return id;
    }

    const last = decodeURIComponent(this.ctx.path.split('/').pop());

    if (last !== this.resource && /^([a-z0-9]+,?)*$/i.test(last)) {
      return last;
    }

    return '';
  }
};
