const inspirecloud = require('@byteinspire/api');
const Base = require('./base');

module.exports = class extends Base {
  constructor(tableName) {
    super(tableName);
    this.db = inspirecloud.db;
  }

  where(where) {
    if (think.isEmpty(where)) {
      return;
    }

    const _where = {};
    const parseKey = (k) => (k === 'objectId' ? '_id' : k);
    for (const k in where) {
      if (think.isString(where[k])) {
        _where[parseKey(k)] =
          k === 'objectId' ? this.db.ObjectId(where[k]) : where[k];
        continue;
      }
      if (where[k] === undefined) {
        _where[parseKey(k)] = undefined;
      }
      if (Array.isArray(where[k])) {
        if (where[k][0]) {
          const handler = where[k][0].toUpperCase();
          switch (handler) {
            case 'IN':
              _where[parseKey(k)] = this.db.in(
                k === 'objectId'
                  ? where[k][1].map(this.db.ObjectId)
                  : where[k][1]
              );
              break;
            case 'NOT IN':
              _where[parseKey(k)] = this.db.nin(
                k === 'objectId'
                  ? where[k][1].map(this.db.ObjectId)
                  : where[k][1]
              );
              break;
            case 'LIKE': {
              const first = where[k][1][0];
              const last = where[k][1].slice(-1);
              let reg;
              if (first === '%' && last === '%') {
                reg = new RegExp(where[k][1].slice(1, -1));
              } else if (first === '%') {
                reg = new RegExp(where[k][1].slice(1) + '$');
              } else if (last === '%') {
                reg = new RegExp('^' + where[k][1].slice(0, -1));
              }
              _where[parseKey(k)] = this.db.regex(reg);
              break;
            }
            case '!=':
              _where[parseKey(k)] = this.db.ne(where[k]);
              break;
            case '>':
              _where[parseKey(k)] = this.db.gt(where[k]);
              break;
          }
        }
      }
    }

    return _where;
  }

  async _select(where, { desc, limit, offset, field } = {}) {
    const instance = this.db.table(this.tableName);
    const query = instance.where(this.where(where));

    if (desc) {
      query.sort({ [desc]: -1 });
    }
    if (limit) {
      query.limit(limit);
    }
    if (offset) {
      query.skip(offset);
    }
    if (field) {
      const _field = {};
      field.forEach((f) => {
        _field[f] = 1;
      });
      query.projection(_field);
    }

    const data = await query.find();
    data.forEach((item) => {
      item.objectId = item._id.toString();
      delete item._id;
    });
    return data;
  }

  async select(where, options = {}) {
    let data = [];
    let ret = [];
    do {
      options.offset = (options.offset || 0) + data.length;
      ret = await this._select(where, options);
      data = data.concat(ret);
    } while (ret.length === 1000);

    return data;
  }

  async count(where = {}) {
    const instance = this.db.table(this.tableName);
    const query = instance.where(this.where(where));

    return query.count();
  }

  async add(data) {
    const instance = this.db.table(this.tableName);
    const tableData = instance.create(data);
    await instance.save(tableData);

    tableData.objectId = tableData._id.toString();
    delete tableData._id;
    return tableData;
  }

  async update(data, where) {
    const instance = this.db.table(this.tableName);
    const query = instance.where(this.where(where));
    const items = await query.find();

    return Promise.all(
      items.map(async (item) => {
        const updateData = typeof data === 'function' ? data(item) : data;
        for (const k in updateData) {
          item[k] = updateData[k];
        }
        await instance.save(item);
        return item;
      })
    );
  }

  async delete(where) {
    const instance = this.db.table(this.tableName);
    const query = instance.where(this.where(where));
    return query.delete();
  }
};
