const BaseRest = require('./rest');

// title, time, url, xid
module.exports = class extends BaseRest {
  constructor(ctx) {
    super(ctx);
    this.modelInstance = this.service(
      `storage/${this.config('storage')}`,
      'Counter'
    );
  }

  async getAction() {
    const { path } = this.get();
    if (!Array.isArray(path) || !path.length) {
      return this.json(0);
    }

    const resp = await this.modelInstance.select({ url: ['IN', path] });
    if (think.isEmpty(resp)) {
      return this.json(0);
    }

    if (path.length === 1) {
      return this.json(resp[0].time);
    }
    const respObj = resp.reduce((o, n) => {
      o[n.url] = n.time;
      return o;
    }, {});
    return this.json(path.map((url) => respObj[url] || 0));
  }

  async postAction() {
    const { path } = this.post();
    const resp = await this.modelInstance.select({ url: path });
    if (think.isEmpty(resp)) {
      const time = 1;
      await this.modelInstance.add(
        { url: path, time },
        { access: { read: true, write: true } }
      );
      return this.json(time);
    }

    const ret = await this.modelInstance.update(
      function (counter) {
        return { time: counter.time + 1 };
      },
      {
        objectId: ['IN', resp.map(({ objectId }) => objectId)],
      }
    );
    return this.json(ret[0].time);
  }
};
