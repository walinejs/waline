const nunjucks = require('nunjucks');
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

    this.ctx.fail(message, ...args);
    return think.prevent();
  },
  locale(message, variables) {
    const { lang } = this.get();
    const locale = locales[(lang || '').toLowerCase()];
    if (locale && locale[message]) {
      message = locale[message];
    }
    return nunjucks.renderString(message, variables);
  },
};
