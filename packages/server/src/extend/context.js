const nunjucks = require('nunjucks');

const locales = require('../locales');

module.exports = {
  locale(message, variables) {
    const { lang } = this.get();
    const locale = locales[(lang || 'zh-cn').toLowerCase()] || locales['zh-cn'];

    if (locale && locale[message]) {
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
};
