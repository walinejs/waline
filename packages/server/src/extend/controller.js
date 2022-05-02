const locales = require('../locales');

module.exports = {
  success(...args) {
    this.ctx.success(...args);
    return think.prevent();
  },
  fail(message, ...args) {
    if (this.ctx.status === 200) {
      this.ctx.status = 500;
    }

    const { lang } = this.get();
    const locale = locales[(lang || '').toLowerCase()];
    if (locale && locale[message]) {
      message = locale[message];
    }

    this.ctx.fail(message, ...args);
    return think.prevent();
  },
};
