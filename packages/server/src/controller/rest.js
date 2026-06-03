import path from 'node:path';
import { fileURLToPath } from 'node:url';

const fileName = import.meta.filename;

export default class extends think.Controller {
  static _REST = true;

  static _method = 'method';

  constructor(ctx) {
    super(ctx);
    this.resource = this.getResource();
    this.id = this.getId();
  }

  __before() {}

  getResource() {
    const filename = this.__filename || fileName;
    const last = filename.lastIndexOf(path.sep);

    return filename.slice(last + 1, -3);
  }

  getId() {
    const id = this.get('id');

    if (id && (think.isString(id) || think.isNumber(id))) {
      return id;
    }

    const last = decodeURIComponent(this.ctx.path.split('/').pop());
    if (last !== this.resource && /^([a-z0-9]+,?)*$/iu.test(last)) {
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

  __call() {}
};
