const nunjucks = require('nunjucks');
const { PasswordHash } = require('phpass');

const locales = require('../locales/index.js');

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

    if (locale?.[message]) {
      message = locale[message];
    }

    return nunjucks.renderString(message, variables);
  },
  getModel(modelName) {
    const { storage, model } = this.config();

    if (typeof model === 'function') {
      const modelInstance = model(modelName, this);

      if (modelInstance) {
        return modelInstance;
      }
    }

    return this.service(`storage/${storage}`, modelName);
  },
  hashPassword(password) {
    const PwdHash = this.config('encryptPassword') || PasswordHash;
    const pwdHash = new PwdHash();

    return pwdHash.hashPassword(password);
  },
  checkPassword(password, storeHash) {
    const PwdHash = this.config('encryptPassword') || PasswordHash;
    const pwdHash = new PwdHash();

    return pwdHash.checkPassword(password, storeHash);
  },
};
