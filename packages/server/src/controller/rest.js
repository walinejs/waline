const path = require('path');

module.exports = class extends think.Controller {
  static get _REST() {
    return true;
  }
  static get _method() {
    return 'method';
  }
  constructor(ctx) {
    super(ctx);
    this.resource = this.getResource();
    this.id = this.getId();
  }
  __before() {}
  getResource() {
    const filename = this.__filename || __filename;
    const last = filename.lastIndexOf(path.sep);
    return filename.substr(last + 1, filename.length - last - 4);
  }
  getId() {
    const id = this.get('id');
    if (id && (think.isString(id) || think.isNumber(id))) {
      return id;
    }
    const last = decodeURIComponent(this.ctx.path.split('/').pop());
    if (last !== this.resource && /^(\d+,?)*$/.test(last)) {
      return last;
    }
    return '';
  }
  __call() {}
};