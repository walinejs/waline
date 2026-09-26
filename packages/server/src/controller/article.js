const BaseRest = require('./rest.js');
const { getArticleCounters, updateArticleCounter } = require('../core.js');

module.exports = class extends BaseRest {
  constructor(ctx) {
    super(ctx);
    this.modelInstance = this.getModel('Counter');
  }

  async getAction() {
    const { path, type } = this.get();
    return this.jsonOrSuccess(
      await getArticleCounters(
        { path, type, deprecated: this.ctx.state.deprecated },
        { counters: this.modelInstance },
      ),
    );
  }

  async postAction() {
    const { path, type, action } = this.post();
    return this.jsonOrSuccess(
      await updateArticleCounter(
        { path, type, action, deprecated: this.ctx.state.deprecated },
        { counters: this.modelInstance },
      ),
    );
  }
};
