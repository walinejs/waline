const BaseRest = require('./rest');

// title, time, url, xid
module.exports = class extends BaseRest {
  constructor(ctx) {
    super(ctx);
    this.modelInstance = this.service('storage/leancloud', 'Counter');
  }

  async getAction() {
    const {path} = this.get();
    const resp = await this.modelInstance.select({url: path}, {limit: 1});
    if(think.isEmpty(resp)) {
      return this.json(0);
    }
    return this.json(resp[0].time);
  }

  async postAction() {
    const {path} = this.post();
    const resp = await this.modelInstance.select({url: path});
    if(think.isEmpty(resp)) {
      const ret = await this.modelInstance.add(
        {url: path, time}, 
        {access: {read: true, write: true}}
      );
      return this.success(ret);
    }

    const ret = await this.modelInstance.update(function(counter) {
      return {time: counter.time + 1};
    }, {
      objectId: ['IN', ret.map(({objectId}) => objectId)]
    });
    return this.success(ret);
  }
}