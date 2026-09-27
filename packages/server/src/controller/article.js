const BaseRest = require('./rest.js');

module.exports = class extends BaseRest {
  getAction() {
    return this.runCore((core, ctx) => core.counter.get(this.get(), ctx), { json: true });
  }

  postAction() {
    return this.runCore((core, ctx) => core.counter.update(this.post(), ctx), { json: true });
  }
};
