const Base = require('./base');

module.exports = class extends Base {
  constructor(tableName) {
    super();
    this.tableName = tableName;
  }

  parseWhere(filter) {
    const where = {};
    if(think.isEmpty(filter)) {
      return where;
    }

    for(const k in filter) {
      if(k === 'objectId') {
        where.id = filter[k];
        continue;
      }
      
      where[k] = filter[k];
    }
  }

  async select(where, {desc, limit, offset, field} = {}) {
    const instance = this.model(this.tableName);
    instance.where(this.parseWhere(where));
    if(desc) {
      instance.order(`${desc} DESC`);
    }
    if(limit || offset) {
      instance.limit(offset, limit);
    }
    if(field) {
      instance.field(field);
    }

    const data = await instance.select();
    return data.map(({id, ...cmt}) => ({...cmt, objectId: id}));
  }

  async count(where = {}) {
    const instance = this.model(this.tableName);
    instance.where(this.parseWhere(where));
    return instance.count();
  }

  async add(data) {
    const instance = this.model(this.tableName);
    return instance.add(data);
  }

  async update(data, where) {
    const instance = this.model(this.tableName);
    instance.where(this.parseWhere(where));
    return instance.update(data);
  }

  async delete(where) {
    const instance = this.model(this.tableName);
    return instance.where(this.parseWhere(where)).delete();
  }
}