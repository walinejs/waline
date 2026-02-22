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

  async __before() {
    const referrer = this.ctx.referrer(true);
    let { origin } = this.ctx;

    if (origin) {
      try {
        origin = new URL(origin).hostname;
      } catch (err) {
        console.error('Invalid origin:', origin);
      }
    }

    let { secureDomains } = this.config();
    const oauthServices = this.ctx.state.oauthServices || [];

    if (secureDomains) {
      secureDomains = think.isArray(secureDomains) ? secureDomains : [secureDomains];
      secureDomains.push('localhost', '127.0.0.1');
      secureDomains = [...secureDomains, ...oauthServices.map(s => s.origin)];

      secureDomains = secureDomains.map(domain => {
        if (typeof domain === 'string' && domain.startsWith('/') && domain.endsWith('/')) {
          try { return new RegExp(domain.slice(1, -1)); } catch (e) { return null; }
        }
        return domain;
      }).filter(Boolean);

      const checking = referrer || origin;
      const isSafe = secureDomains.some(domain => 
        think.isFunction(domain.test) ? domain.test(checking) : domain === checking
      );
      if (!isSafe) return this.ctx.throw(403);
    }

    this.ctx.state.userInfo = null;
    this.ctx.state.token = null;

    const { authorization } = this.ctx.req.headers;
    if (!authorization) return;

    const token = authorization.replace(/^Bearer /, '');
    try {
      const decoded = jwt.verify(token, think.config('jwtKey'));
      if (decoded && think.isString(decoded)) {
        const users = await this.modelInstance.select(
          { objectId: decoded, type: ['!=', 'banned'] },
          { field: ['id', 'email', 'url', 'display_name', 'type', 'avatar', '2fa', ...oauthServices.map(s => s.name)] }
        );

        if (!think.isEmpty(users)) {
          const [user] = users;
          this.ctx.state.userInfo = user;
          this.ctx.state.token = token;
        }
      }
    } catch (err) {
      think.logger.debug('JWT error:', err.message);
    }
  }

  getResource() {
    const filename = this.__filename || __filename;
    const last = filename.lastIndexOf(path.sep);
    return filename.slice(last + 1, filename.length - last - 4);
  }

  getId() {
    const id = this.get('id');
    if (id && (think.isString(id) || think.isNumber(id))) return id;
    const last = decodeURIComponent(this.ctx.path.split('/').pop());
    return (last !== this.resource && /^([a-z0-9]+,?)*$/i.test(last)) ? last : '';
  }

  async useCaptchaCheck() {
    const { RECAPTCHA_V3_SECRET, TURNSTILE_SECRET } = process.env;
    const { turnstile, recaptchaV3 } = this.post();
    if (TURNSTILE_SECRET) return this.verifyCaptcha(TURNSTILE_SECRET, turnstile, 'https://challenges.cloudflare.com/turnstile/v0/siteverify', 'POST');
    if (RECAPTCHA_V3_SECRET) return this.verifyCaptcha(RECAPTCHA_V3_SECRET, recaptchaV3, 'https://recaptcha.net/recaptcha/api/siteverify', 'GET');
  }

  async verifyCaptcha(secret, token, api, method) {
    if (!secret || !token) return this.ctx.throw(403);
    const body = qs.stringify({ secret, response: token, remoteip: this.ctx.ip });
    const options = method === 'POST' ? { method, headers: { 'content-type': 'application/x-www-form-urlencoded' }, body } : {};
    const url = method === 'GET' ? `${api}?${body}` : api;
    const res = await fetch(url, options).then(r => r.json());
    if (!res.success) return this.ctx.throw(403);
  }
};
