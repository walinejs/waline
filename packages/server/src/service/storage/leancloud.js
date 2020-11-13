const AV = require('leancloud-storage');
const Base = require('./base');

AV.init({
  appId: process.env.LEAN_ID,
  appKey: process.env.LEAN_KEY,
  // required for leancloud china
  serverURL: process.env.LEAN_SERVER
});
module.exports = class extends Base {
  constructor(tableName) {
    super();
    this.tableName = tableName;
  }

  where(instance, where) {
    if(think.isEmpty(where)) {
      return;
    }

    for(const k in where) {
      if(think.isString(where[k])) {
        instance.equalTo(k, where[k]);
        continue;
      }
      if(where[k] === undefined) {
        instance.doesNotExist(k);
      }
      if(Array.isArray(where[k])) {
        if(where[k][0]) {
          const handler = where[k][0].toUpperCase();
          switch(handler) {
            case 'IN':
              instance.containedIn(k, where[k][1]);
              break;
            case 'NOT IN':
              instance.notContainedIn(k, where[k][1]);
              break;
            case '!=':
              instance.notEqualTo(k, where[k][1]);
              break;
          }
        }
      }
    }
  }

  async select(where, {desc, limit, offset, field} = {}) {
    const instance = new AV.Query(this.tableName);
    this.where(instance, where);
    if(desc) {
      instance.descending(desc);
    }
    if(limit) {
      instance.limit(limit);
    }
    if(offset) {
      instance.skip(offset);
    }

    const data = await (field ? instance.select(field) : instance.find());
    return data.map(item => item.toJSON());
  }

  async count(where = {}, options = {}) {
    const instance = new AV.Query(this.tableName);
    this.where(instance, where);
    return instance.count(options);
  }

  async add(data, {
    access: {read = true, write = false} = {read: true, write: false}
  } = {}) {
    const Table = new AV.Object.extend(this.tableName);
    const instance = new Table();
    instance.set(data);

    const acl = new AV.ACL();
    acl.setPublicReadAccess(read);
    acl.setPublicWriteAccess(write);
    instance.setACL(acl);

    return instance.save();
  }

  async update(data, where) {
    const ret = await this.select(where);
    return Promise.all(ret.map(item => {
      if(think.isFunction(data)) {
        ret.set(data(item.toJSON()))
      } else {
        ret.set(data);
      }
      return ret.save();
    }));
  }
}