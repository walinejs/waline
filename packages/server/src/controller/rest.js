const path = require('node:path');
const { WalineError } = require('@waline/core');

module.exports = class extends think.Controller {
  static _REST = true;

  static _method = 'method';

  constructor(ctx) {
    super(ctx);
    this.resource = this.getResource();
    this.id = this.getId();
  }

  __before() {}

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
    if (last !== this.resource && /^(?:[a-z0-9]+,?)*$/iu.test(last)) {
      return last;
    }

    return '';
  }

  isLogin() {
    const { userInfo } = this.ctx.state;

    return think.isEmpty(userInfo);
  }

  async hook(name, ...args) {
    const fn = this.config(name);
    const plugins = think.getPluginHook(name);

    if (think.isFunction(fn)) {
      plugins.unshift(fn);
    }

    for (const plugin of plugins) {
      if (!think.isFunction(plugin)) {
        continue;
      }

      const resp = await plugin.call(this, ...args);

      if (resp) {
        return resp;
      }
    }
  }

  getCore(configOverride) {
    return this.service('core').create(this, configOverride);
  }

  getCoreContext() {
    return {
      headers: this.ctx.req.headers,
      state: this.ctx.state,
      ip: this.ctx.ip,
      origin: this.ctx.origin,
      referrer: this.ctx.referrer(true),
      requestUrl: this.ctx.url,
      serverUrl: this.ctx.serverURL,
    };
  }

  async runCore(handler, { json = false, raw = false } = {}) {
    try {
      const { site, config } = await this.resolveSite();
      if (site) this.ctx.state.site = site;
      if (config) this.ctx.state.siteConfig = config;
      const data = await handler(this.getCore(config), this.getCoreContext());

      if (raw) return data;

      return json ? this.jsonOrSuccess(data) : this.success(data);
    } catch (err) {
      if (!(err instanceof WalineError)) {
        throw err;
      }

      if (err.status === 401 || err.status === 403) {
        return this.ctx.throw(err.status);
      }

      const message = err.messageKey ? this.locale(err.messageKey) : undefined;

      return this.fail(message || err.details || err.code);
    }
  }

  async resolveSite() {
    const siteResources = new Set(['comment', 'article']);
    if (
      !siteResources.has(this.resource) &&
      !(this.resource === 'user' && this.ctx.method === 'GET')
    ) {
      return {};
    }

    const requested = this.get('siteId') || this.post('siteId');
    const model = this.getModel('Site');
    let sites;
    try {
      sites = requested ? await model.select({ objectId: requested }) : await model.select({});
      if (!requested) {
        sites = sites.filter(({ default: isDefault }) =>
          [true, 1, '1', 'true'].includes(isDefault),
        );
      }
    } catch (err) {
      // Legacy installations remain reachable until the explicit upgrade is run.
      think.logger.warn('Site table is not available; running in legacy mode.', err.message);
      return {};
    }

    const [site] = sites;
    if (!site || site.status !== 'active') this.ctx.throw(404, 'Site not found');

    const user = this.ctx.state.userInfo;
    if (user?.type === 'supervisor') {
      const grants = await this.getModel('SiteAdmin').select({
        site_id: site.objectId,
        user_id: user.objectId,
      });
      this.ctx.state.siteAdmin = Boolean(grants.length);
      if (this.get('type') === 'list' && !grants.length) this.ctx.throw(403);
    }

    let config = {};
    try {
      config =
        typeof site.config === 'string' ? JSON.parse(site.config || '{}') : site.config || {};
    } catch {
      this.ctx.throw(500, 'Invalid site configuration');
    }

    return { site, config: { ...config, siteName: site.name, siteUrl: site.url } };
  }

  __call() {}
};
