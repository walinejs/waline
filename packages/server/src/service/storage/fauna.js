const faunaORM = require('faunadb_orm');
const Base = require('./base');

const {FAUNA_SECRET} = process.env;
const FIELDS = {
  Comment: [
    'comment', 'insertedAt', 'ip', 'link', 'mail', 'nick', 'pid', 'rid', 'status', 'ua', 'url', 'user_id', 'createdAt', 'updatedAt', 'ref'
  ],
  Counter: [],
  Users: [
    'display_name', 'email', 'password', 'type', 'url', 'avatar', 'github', 'createdAt', 'updatedAt', 'ref'
  ]
};
const schema = {};
for(const tableName in FIELDS) {
  schema[tableName] = {
    fields: {}
  };
  FIELDS[tableName].forEach(field => {
    schema[tableName].fields[field] = {
      indexes: {
        find: `find_by_${field}`
      }
    }
  });
}

const client = new faunaORM(schema, FAUNA_SECRET);

const collections = {};

class Where {
  constructor() {
    this.data = {};
  }
  where(obj) {
    for(var i in obj) {
      this.data[i] = obj[i];
    }
  }
}
module.exports = class extends Base {
  async collection(tableName) {
    if (collections[tableName]) {
      return client.collection(tableName);
    }
  
    const collection = client.collection(tableName);
    await collection.create({}).run().catch(e => {
      if(e.description === 'Collection already exists.') {
        return;
      }
      throw e;
    });

    if(schema[tableName] && schema[tableName].fields) {
      const fields = schema[tableName].fields;
      await Promise.allSettled(
        Object.keys(fields).map(field => collection.index.create(
          fields[field].indexes.find, field, FIELDS[tableName]
        ).run())
      );
    }

    return client.collection(tableName);
  }

  where(instance, where) {
    if(think.isEmpty(where)) {
      return {};
    }

    const parseKey = k => k === 'objectId' ? '_id' : k;
    for(let k in where) {
      if(think.isString(where[k])) {
        instance.where({
          [parseKey(k)]: { $eq: k === 'objectId' ? ObjectId(where[k]) : where[k] }
        });
        continue;
      }
      if(where[k] === undefined) {
        instance.where({
          [parseKey(k)]: { $eq: null }
        });
      }
      if(Array.isArray(where[k])) {
        if(where[k][0]) {
          const handler = where[k][0].toUpperCase();
          switch(handler) {
            case 'IN':
              if(k === 'objectId') {
                instance.where({
                  [parseKey(k)]: { $in: where[k][1].map(ObjectId) }
                });
              } else {
                instance.where({
                  [parseKey(k)]: { $regex: new RegExp(`^(${where[k][1].join('|')})$`) }
                });
              }
              break;
            case 'NOT IN':
              instance.where({
                [parseKey(k)]: { $nin: k === 'objectId' ? where[k][1].map(ObjectId) : where[k][1] }
              });
              break;
            case 'LIKE':
              const first = where[k][1][0];
              const last = where[k][1][-1];
              if(first === '%' && last === '%') {
                instance.where({
                  [parseKey(k)]: { $regex: new RegExp(where[k][1].slice(1, -1)) }
                });
              } else if(first === '%') {
                instance.where({
                  [parseKey(k)]: { $regex: new RegExp(where[k][1].slice(1, -1) + '$') }
                });
              } else if(last === '%') {
                instance.where({
                  [parseKey(k)]: { $regex: new RegExp('^' + where[k][1].slice(1, -1)) }
                });
              }
              break;
            case '!=':
              instance.where({
                [parseKey(k)]: { $ne: where[k][1] }
              });
              break;
            case '>':
              instance.where({
                [parseKey(k)]: { $gt: where[k][1] }
              });
              break;
          }
        }
      }
    }
  }

  async select(where, {desc, limit, offset, field} = {}) {
    const collection = await this.collection(this.tableName);
    const instance = new Where();
    this.where(instance, where);
    let query = collection.query.findMany(instance.data);
    
    // if(desc) {
    //   query.order(`${desc} DESC`);
    // }
    if(limit || offset) {
      query = query.limit(limit);
      query = query.before(offset);
    }

    const ret = await query.run();
    return ret.data.map(item => {
      const obj = {};
      FIELDS[this.tableName].forEach((f, idx) => {
        if(Array.isArray(field) && !field.includes(f)) {
          return;
        }

        if(f === 'ref') {
          obj.objectId = item[idx].id;
        } else {
          obj[f] = item[idx];
        }
      });
      return obj;
    });
  }

  async count(where = {}) {
    const collection = await this.collection(this.tableName);
    const instance = new Where();
    this.where(instance, where);
    return collection.query.count({where: instance.data}).run();
  }

  async add(data) {
    for(const i in data) {
      if(!data[i]) {
        continue;
      }
      if(typeof data[i].toISOString === 'function') {
        data[i] = data[i].toISOString();
      }
    }

    const collection = await this.collection(this.tableName);
    const resp = await collection.query.create(data).run();
    resp[0].objectId = resp[0]._id;
    return resp[0];
  }

  async update(data, where) {
    const collection = await this.collection(this.tableName);
    const instance = new Where();
    this.where(instance, where);
    return collection.query.updateMany({...data, where: instance.data}).run();
  }

  async delete(where) {
    const collection = await this.collection(this.tableName);
    const instance = new Where();
    this.where(instance, where);
    return collection.query.deleteMany(instance.data).run();
  }
}