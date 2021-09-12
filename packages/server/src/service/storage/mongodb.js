const { ObjectId } = require('mongodb');
const Base = require('./base');

module.exports = class extends Base {
  where(instance, where) {
    if (think.isEmpty(where)) {
      return;
    }

    const parseKey = (k) => (k === 'objectId' ? '_id' : k);
    for (let k in where) {
      if (think.isString(where[k])) {
        instance.where({
          [parseKey(k)]: {
            $eq: k === 'objectId' ? ObjectId(where[k]) : where[k],
          },
        });
        continue;
      }
      if (where[k] === undefined) {
        instance.where({
          [parseKey(k)]: { $eq: null },
        });
      }
      if (Array.isArray(where[k])) {
        if (where[k][0]) {
          const handler = where[k][0].toUpperCase();
          switch (handler) {
            case 'IN':
              if (k === 'objectId') {
                instance.where({
                  [parseKey(k)]: { $in: where[k][1].map(ObjectId) },
                });
              } else {
                instance.where({
                  [parseKey(k)]: {
                    $regex: new RegExp(`^(${where[k][1].join('|')})$`),
                  },
                });
              }
              break;
            case 'NOT IN':
              instance.where({
                [parseKey(k)]: {
                  $nin:
                    k === 'objectId' ? where[k][1].map(ObjectId) : where[k][1],
                },
              });
              break;
            case 'LIKE': {
              const first = where[k][1][0];
              const last = where[k][1].slice(-1);
              if (first === '%' && last === '%') {
                instance.where({
                  [parseKey(k)]: {
                    $regex: new RegExp(where[k][1].slice(1, -1)),
                  },
                });
              } else if (first === '%') {
                instance.where({
                  [parseKey(k)]: {
                    $regex: new RegExp(where[k][1].slice(1) + '$'),
                  },
                });
              } else if (last === '%') {
                instance.where({
                  [parseKey(k)]: {
                    $regex: new RegExp('^' + where[k][1].slice(0, -1)),
                  },
                });
              }
              break;
            }
            case '!=':
              instance.where({
                [parseKey(k)]: { $ne: where[k][1] },
              });
              break;
            case '>':
              instance.where({
                [parseKey(k)]: { $gt: where[k][1] },
              });
              break;
          }
        }
      }
    }
  }

  async select(where, { desc, limit, offset, field } = {}) {
    const instance = this.mongo(this.tableName);
    this.where(instance, where);
    if (desc) {
      instance.order(`${desc} DESC`);
    }
    if (limit || offset) {
      instance.limit(offset || 0, limit);
    }
    if (field) {
      instance.field(field);
    }

    const data = await instance.select();
    return data.map(({ _id, ...cmt }) => ({
      ...cmt,
      objectId: _id.toString(),
    }));
  }

  async count(where = {}) {
    const instance = this.mongo(this.tableName);
    this.where(instance, where);
    return instance.count();
  }

  async add(data) {
    const instance = this.mongo(this.tableName);
    const id = await instance.add(data);
    return { ...data, objectId: id.toString() };
  }

  async update(data, where) {
    const instance = this.mongo(this.tableName);
    this.where(instance, where);
    const list = await instance.select();

    return Promise.all(
      list.map(async (item) => {
        const updateData = typeof data === 'function' ? data(item) : data;
        const instance = this.mongo(this.tableName);
        this.where(instance, where);
        await instance.update(updateData);
        return { ...item, ...updateData };
      })
    );
  }

  async delete(where) {
    const instance = this.mongo(this.tableName);
    this.where(instance, where);
    return instance.delete();
  }
};
