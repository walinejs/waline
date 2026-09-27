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

  getCore() {
    return this.service('core').create(this);
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

  async runCore(callback, { json = false, raw = false } = {}) {
    try {
      const data = await callback(this.getCore(), this.getCoreContext());

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

  __call() {}
};
