const AV = require('leancloud-storage');
const BaseRest = require('./rest');

AV.init({
  appId: process.env.LEAN_ID,
  appKey: process.env.LEAN_KEY,
  // required for leancloud china
  serverURL: process.env.LEAN_SERVER
});

// title, time, url, xid
module.exports = class extends BaseRest {
  constructor(ctx) {
    super(ctx);
    this.modelInstance = new AV.Query('Counter');
  }

  async getAction() {
    const {path} = this.get();
    const resp = await this.modelInstance.equalTo('url', path).limit(1).find();
    if(think.isEmpty(resp)) {
      return this.json(0);
    }
    return this.json(resp[0].get('time'));
  }

  async postAction() {
    const {path} = this.post();
    const resp = await this.modelInstance.equalTo('url', path).find();
    if(think.isEmpty(resp)) {
      const Counter = AV.Object.extend('Counter');
      const counter = new Counter();
      counter.set({url: path, time: 1});
      const acl = new AV.ACL();
      acl.setPublicReadAccess(true);
      acl.setPublicWriteAccess(true);
      counter.setACL(acl);
      const resp = (await counter.save()).toJSON();

      return this.success(resp);
    }

    const ret = await Promise.all(resp.map(counter => counter.set('time', counter.get('time') + 1).save()));
    return this.success(ret);
  }
}