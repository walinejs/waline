const path = require('node:path');
const qs = require('node:querystring');

const jwt = require('jsonwebtoken');

module.exports = class BaseLogic extends think.Logic {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.getModel('Users');
    this.resource = this.getResource();
    this.id = this.getId();
  }

  // oxlint-disable-next-line max-statements
  async __before() {
    const referrerCheckResult = this.referrerCheck();
    if (!referrerCheckResult) {
      return this.ctx.throw(403);
    }

    this.ctx.state.userInfo = {};
    const { authorization } = this.ctx.req.headers;
    const { state } = this.get();

    if (!authorization && !state) {
      return;
    }
    const token = state || authorization.replace(/^Bearer /, '');
    let userId = '';

    try {
      userId = jwt.verify(token, think.config('jwtKey'));
    } catch (err) {
      think.logger.debug(err);
    }

    if (think.isEmpty(userId) || !think.isString(userId)) {
      return;
    }

    const user = await this.modelInstance.select(
      { objectId: userId, type: ['!=', 'banned'] },
      {
        field: [
          'id',
          'email',
          'url',
          'display_name',
          'type',
          'avatar',
          '2fa',
          'label',
          ...this.ctx.state.oauthServices.map(({ name }) => name),
        ],
      },
    );

    if (think.isEmpty(user)) {
      return;
    }

    const [userInfo] = user;

    let avatarUrl =
      userInfo.avatar ||
      (await think.service('avatar').stringify({
        mail: userInfo.email,
        nick: userInfo.display_name,
        link: userInfo.url,
      }));
    const { avatarProxy } = think.config();

    if (avatarProxy) {
      avatarUrl = `${avatarProxy}?url=${encodeURIComponent(avatarUrl)}`;
    }
    userInfo.avatar = avatarUrl;
    this.ctx.state.userInfo = userInfo;
    this.ctx.state.token = token;
  }

  referrerCheck() {
    let { secureDomains } = this.config();
    if (!secureDomains) {
      return true;
    }

    const whitelistPath = ['/api/comment/rss'];
    if (this.ctx.path && whitelistPath.includes(this.ctx.path)) {
      return true;
    }

    const referrer = this.ctx.referrer(true);
    let { origin } = this.ctx;
    if (origin) {
      try {
        const parsedOrigin = new URL(origin);

        origin = parsedOrigin.hostname;
      } catch (err) {
        console.error('Invalid origin format:', origin, err);
      }
    }

    secureDomains = think.isArray(secureDomains) ? secureDomains : [secureDomains];
    secureDomains.push('localhost', '127.0.0.1');
    secureDomains = [...secureDomains, ...this.ctx.state.oauthServices.map(({ origin }) => origin)];

    // 转换可能的正则表达式字符串为正则表达式对象
    secureDomains = secureDomains
      .map((domain) => {
        // 如果是正则表达式字符串，创建一个 RegExp 对象
        if (typeof domain === 'string' && domain.startsWith('/') && domain.endsWith('/')) {
          try {
            return new RegExp(domain.slice(1, -1)); // 去掉斜杠并创建 RegExp 对象
          } catch (err) {
            console.error('Invalid regex pattern in secureDomains:', domain, err);

            return null;
          }
        }

        return domain;
      })
      .filter(Boolean); // 过滤掉无效的正则表达式

    // 有 referrer 检查 referrer，没有则检查 origin
    const checking = referrer || origin;
    const isSafe = secureDomains.some((domain) =>
      think.isFunction(domain.test) ? domain.test(checking) : domain === checking,
    );

    return isSafe;
  }

  getResource() {
    const filename = this.__filename || __filename;
    const last = filename.lastIndexOf(path.sep);

    return filename.slice(last + 1, -3);
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

  async useCaptchaCheck() {
    const { RECAPTCHA_V3_SECRET, TURNSTILE_SECRET } = process.env;
    const { turnstile, recaptchaV3, captcha } = this.post();

    if (TURNSTILE_SECRET) {
      return this.useRecaptchaOrTurnstileCheck({
        secret: TURNSTILE_SECRET,
        token: captcha || turnstile,
        api: 'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        method: 'POST',
      });
    }

    if (RECAPTCHA_V3_SECRET) {
      console.log('lizheming', {
        secret: RECAPTCHA_V3_SECRET,
        token: captcha || recaptchaV3,
        api: 'https://recaptcha.net/recaptcha/api/siteverify',
        method: 'GET',
      });
      return this.useRecaptchaOrTurnstileCheck({
        secret: RECAPTCHA_V3_SECRET,
        token: captcha || recaptchaV3,
        api: 'https://recaptcha.net/recaptcha/api/siteverify',
        method: 'GET',
      });
    }
  }

  async useRecaptchaOrTurnstileCheck({ secret, token, api, method }) {
    if (!secret) {
      return;
    }

    if (!token) {
      return this.ctx.throw(403);
    }

    const query = qs.stringify({
      secret,
      response: token,
      remoteip: this.ctx.ip,
    });

    const requestUrl = method === 'GET' ? `${api}?${query}` : api;
    const options =
      method === 'GET'
        ? {}
        : {
            method,
            headers: {
              'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            body: query,
          };

    const response = await fetch(requestUrl, options).then((resp) => resp.json());

    if (!response.success) {
      think.logger.debug('RecaptchaV3 or Turnstile Result:', JSON.stringify(response, null, '\t'));

      return this.ctx.throw(403);
    }
  }
};
