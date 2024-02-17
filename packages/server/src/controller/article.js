const BaseRest = require('./rest.js');

module.exports = class extends BaseRest {
  constructor(ctx) {
    super(ctx);
    this.modelInstance = this.getModel('Counter');
  }

  async getAction() {
    const { path, type } = this.get();
    const { deprecated } = this.ctx.state;

    // path is required
    if (!Array.isArray(path) || !path.length) {
      return this.jsonOrSuccess(0);
    }

    const resp = await this.modelInstance.select({ url: ['IN', path] });

    if (think.isEmpty(resp)) {
      const data = type.reduce((o, field) => {
        o[field] = 0;

        return o;
      }, {});

      return this.jsonOrSuccess(
        type.length === 1 && deprecated ? data[type[0]] : data,
      );
    }

    const respObj = resp.reduce((o, n) => {
      o[n.url] = n;

      return o;
    }, {});

    const data = [];

    for (let i = 0; i < path.length; i++) {
      const url = path[i];
      let counters = {};

      for (let j = 0; j < type.length; j++) {
        const field = type[j];

        counters[field] =
          respObj[url] && respObj[url][field] ? respObj[url][field] : 0;
      }

      if (type.length === 1 && deprecated) {
        counters = counters[type[0]];
      }
      data.push(counters);
    }

    return this.jsonOrSuccess(path.length === 1 && deprecated ? data[0] : data);
  }

  async postAction() {
    const { path, type, action } = this.post();
    const resp = await this.modelInstance.select({ url: path });
    const { deprecated } = this.ctx.state;

    if (think.isEmpty(resp)) {
      if (action === 'desc') {
        return this.jsonOrSuccess(deprecated ? 0 : [0]);
      }

      const count = 1;

      await this.modelInstance.add(
        { url: path, [type]: count },
        { access: { read: true, write: true } },
      );

      return this.jsonOrSuccess(deprecated ? count : [count]);
    }

    const ret = await this.modelInstance.update(
      (counter) => ({
        [type]:
          action === 'desc'
            ? (counter[type] || 1) - 1
            : (counter[type] || 0) + 1,
        updatedAt: new Date(),
      }),
      { objectId: ['IN', resp.map(({ objectId }) => objectId)] },
    );

    return this.jsonOrSuccess(
      deprecated ? ret[0][type] : [{ [type]: ret[0][type] }],
    );
  }
};
