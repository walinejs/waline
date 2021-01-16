const faunaORM = require('faunadb_orm');
const Base = require('./base');

const {FAUNA_SECRET} = process.env;
const schema = {
  Comment: {
    fields: {
      comment: {
        indexes: {
          find: 'findByComment'
        },
      },
      insertedAt: {
        indexes: {
          find: 'findByInsertedAt'
        }
      },
      ip: {
        indexes: {
          find: 'findByIp'
        }
      },
      link: {
        indexes: {
          find: 'findByLink'
        }
      },
      mail: {
        indexes: {
          find: 'findByMail'
        }
      },
      nick: {
        indexes: {
          find: 'findByNick'
        }
      },
      pid: {
        indexes: {
          find: 'findByPid'
        }
      },
      rid: {
        indexes: {
          find: 'findByRid'
        }
      },
      status: {
        indexes: {
          find: 'findByStatus'
        }
      },
      ua: {
        indexes: {
          find: 'findByUa'
        }
      },
      url: {
        indexes: {
          find: 'findByUrl'
        }
      },
      user_id: {
        indexes: {
          find: 'findByUserId'
        }
      },
      createdAt: {
        indexes: {
          find: 'findByCreatedAt'
        }
      },
      updatedAt: {
        indexes: {
          find: 'findByUpdatedAt'
        }
      }
    }
  },
  Counter: {

  },
  Users: {
    fields: {
      display_name: {
        indexes: {
          find: 'findByDisplayName'
        }
      },
      email: {
        indexes: {
          find: 'findByEmail'
        }
      },
      password: {
        indexes: {
          find: 'findByPassword'
        }
      },
      type: {
        indexes: {
          find: 'findByType'
        }
      },
      url: {
        indexes: {
          find: 'findByUrl'
        }
      },
      avatar: {
        indexes: {
          find: 'findByAvatar'
        }
      },
      github: {
        indexes: {
          find: 'findByGithub'
        }
      },
      createdAt: {
        indexes: {
          find: 'findByCreatedAt'
        }
      },
      updatedAt: {
        indexes: {
          find: 'findByUpdatedAt'
        }
      }
    }
  }
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
      return q.Collection(tableName);
    }
    
    try {
      await client.query(
        q.createCollection({ name: tableName })
      );
    } catch(e) {
      if(e.description === 'Collection already exists.') {
        collections[tableName] = true;
      }
      throw e;
    }
    return q.Collection(tableName);
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
    const collection = client.collection(this.tableName);
    const instance = new Where();
    this.where(instance, where);
    const query = collection.query.findMany(instance.data);
    
    if(desc) {
      query.order(`${desc} DESC`);
    }
    if(limit || offset) {
      query.limit(offset, limit);
    }
    if(field) {
      
      instance.field(field);
    }
    collection.query.findMany(instance.data).run();
  }

  async count(where = {}) {
    const collection = client.collection(this.tableName);
    const instance = new Where();
    this.where(instance, where);
    return collection.query.count(instance.data).run();
  }

  async add(data) {
  }

  async update(data, where) {
  }

  async delete(where) {
  }
}