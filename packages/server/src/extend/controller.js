const nunjucks = require('nunjucks');
const locales = require('../locales');

module.exports = {
  success(...args) {
    this.ctx.success(...args);

    return think.prevent();
  },
  fail(...args) {
    this.ctx.fail(...args);

    return think.prevent();
  },
  jsonOrSuccess(...args) {
    return this[this.ctx.state.deprecated ? 'json' : 'success'](...args);
  },
  locale(message, variables) {
    const { lang } = this.get();
    const locale = locales[(lang || 'zh-cn').toLowerCase()] || locales['zh-cn'];

    if (locale && locale[message]) {
      message = locale[message];
    }

    return nunjucks.renderString(message, variables);
  },
};
