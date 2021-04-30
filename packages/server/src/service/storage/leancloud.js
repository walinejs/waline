const AV = require('leancloud-storage');
const Base = require('./base');
const { LEAN_ID, LEAN_KEY, LEAN_MASTER_KEY, LEAN_SERVER } = process.env;

if (LEAN_ID && LEAN_KEY && LEAN_MASTER_KEY) {
  AV.Cloud.useMasterKey(true);
  AV.init({
    appId: LEAN_ID,
    appKey: LEAN_KEY,
    masterKey: LEAN_MASTER_KEY,
    // required for leancloud china
    serverURL: LEAN_SERVER,
  });
}
module.exports = class extends Base {
  where(instance, where) {
    if (think.isEmpty(where)) {
      return;
    }

    for (const k in where) {
      if (think.isString(where[k])) {
        instance.equalTo(k, where[k]);
        continue;
      }
      if (where[k] === undefined) {
        instance.doesNotExist(k);
      }
      if (Array.isArray(where[k])) {
        if (where[k][0]) {
          const handler = where[k][0].toUpperCase();
          switch (handler) {
            case 'IN':
              instance.containedIn(k, where[k][1]);
              break;
            case 'NOT IN':
              instance.notContainedIn(k, where[k][1]);
              break;
            case 'LIKE': {
              const first = where[k][1][0];
              const last = where[k][1].slice(-1);
              if (first === '%' && last === '%') {
                instance.contains(k, where[k][1].slice(1, -1));
              } else if (first === '%') {
                instance.endsWith(k, where[k][1].slice(1));
              } else if (last === '%') {
                instance.startsWith(k, where[k][1].slice(0, -1));
              }
              break;
            }
            case '!=':
              instance.notEqualTo(k, where[k][1]);
              break;
            case '>':
              instance.greaterThan(k, where[k][1]);
              break;
          }
        }
      }
    }
  }

  async select(where, { desc, limit, offset, field } = {}) {
    const instance = new AV.Query(this.tableName);
    this.where(instance, where);
    if (desc) {
      instance.descending(desc);
    }
    if (limit) {
      instance.limit(limit);
    }
    if (offset) {
      instance.skip(offset);
    }
    if (field) {
      instance.select(field);
    }

    const data = await instance.find().catch((e) => {
      if (e.code === 101) {
        return [];
      }
      throw e;
    });
    return data.map((item) => item.toJSON());
  }

  async count(where = {}, options = {}) {
    const instance = new AV.Query(this.tableName);
    this.where(instance, where);
    return instance.count(options).catch((e) => {
      if (e.code === 101) {
        return 0;
      }
      throw e;
    });
  }

  async add(
    data,
    { access: { read = true, write = true } = { read: true, write: true } } = {}
  ) {
    const Table = AV.Object.extend(this.tableName);
    const instance = new Table();
    instance.set(data);

    const acl = new AV.ACL();
    acl.setPublicReadAccess(read);
    acl.setPublicWriteAccess(write);
    instance.setACL(acl);

    const resp = await instance.save();
    return resp.toJSON();
  }

  async update(data, where) {
    const instance = new AV.Query(this.tableName);
    this.where(instance, where);
    const ret = await instance.find();

    return Promise.all(
      ret.map(async (item) => {
        if (think.isFunction(data)) {
          item.set(data(item.toJSON()));
        } else {
          item.set(data);
        }

        const resp = await item.save();
        return resp.toJSON();
      })
    );
  }

  async delete(where) {
    const instance = new AV.Query(this.tableName);
    this.where(instance, where);
    const data = await instance.find();

    return AV.Object.destroyAll(data);
  }
};
