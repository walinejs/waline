const { Deta } = require('deta');
const Base = require('./base');

module.exports = class extends Base {
  constructor(tableName) {
    super(tableName);
    const deta = Deta(process.env.DETA_KEY);
    this.instance = deta.Base(tableName);
  }

  where(where) {
    if (think.isEmpty(where)) {
      return;
    }

    const parseKey = (k) => (k === 'objectId' ? 'key' : k);
    const conditions = {};
    for (let k in where) {
      if (think.isString(where[k])) {
        conditions[parseKey(k)] = where[k];
        continue;
      }
      if (where[k] === undefined) {
        conditions[parseKey(k)] = null;
      }
      if (Array.isArray(where[k])) {
        if (where[k][0]) {
          const handler = where[k][0].toUpperCase();
          switch (handler) {
            case 'IN':
              conditions[parseKey(k)] = where[k][1];
              break;
            case 'NOT IN':
              conditions[parseKey(k) + '?ne'] = where[k][1];
              break;
            case 'LIKE': {
              const first = where[k][1][0];
              const last = where[k][1].slice(-1);
              if (first === '%' && last === '%') {
                conditions[parseKey(k) + '?contains'] = where[k][1].slice(
                  1,
                  -1
                );
              } else if (first === '%') {
                conditions[parseKey(k) + '?contains'] = where[k][1].slice(1);
              } else if (last === '%') {
                conditions[parseKey(k) + '?pfx'] = where[k][1].slice(0, -1);
              }
              break;
            }
            case '!=':
              conditions[parseKey(k) + '?ne'] = where[k][1];
              break;
            case '>':
              conditions[parseKey(k) + '?gt'] = where[k][1];
              break;
          }
        }
      }
    }

    return conditions;
  }

  async select(where, { limit, offset, field } = {}) {
    const conditions = this.where(where);
    console.log(conditions);
    let data = [];

    if (
      think.isObject(conditions) &&
      think.isString(conditions.key) &&
      conditions.key
    ) {
      const item = await this.instance.get(conditions.key);
      item && data.push(item);
    } else if (offset) {
      while (data.length < limit + offset) {
        const lastData = data[data.length - 1];
        const last = lastData ? lastData.key : undefined;
        const { items } = await this.instance.fetch(conditions, {
          limit,
          last,
        });
        if (items.length === 0) {
          break;
        }
      }

      data = data.slice(offset, offset + limit);
    } else {
      const { items } = await this.instance.fetch(conditions, {
        limit: limit,
      });
      data = items;
    }

    data = data.map(({ key, ...cmt }) => ({
      ...cmt,
      objectId: key,
    }));

    if (Array.isArray(field)) {
      const fieldMap = new Set(field);
      fieldMap.add('objectId');
      data.forEach((item) => {
        for (const k in item) {
          if (!fieldMap.has(k)) {
            delete item[k];
          }
        }
      });
    }

    return data;
  }

  async count(where = {}) {
    const conditions = this.where(where);
    const { count } = await this.instance.fetch(conditions);
    return count;
  }

  async add(data) {
    const resp = await this.instance.put(data);
    resp.objectId = resp.key;
    delete resp.key;
    return resp;
  }

  async update(data, where) {
    const items = await this.select(where);
    return Promise.all(
      items.map(async (item) => {
        const updateData = typeof data === 'function' ? data(item) : data;
        const nextData = { ...item, ...updateData };
        await this.instance.put(nextData, item.objectId);
        return nextData;
      })
    );
  }

  async delete(where) {
    const items = await this.select(where);
    return Promise.all(
      items.map(({ objectId }) => this.instance.delete(objectId))
    );
  }
};
