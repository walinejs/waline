const { Deta } = require('deta');
const { performance } = require('perf_hooks');
const Base = require('./base');

module.exports = class extends Base {
  constructor(tableName) {
    super(tableName);
    const deta = Deta(process.env.DETA_PROJECT_KEY);
    this.instance = deta.Base(tableName);
  }

  complex(obj, keys) {
    const result = new Array(keys.reduce((a, b) => a * obj[b].length, 1));
    for (let i = 0; i < result.length; i++) {
      result[i] = { ...obj };
      for (let n = 0; n < keys.length; n++) {
        const divisor = keys
          .slice(n + 1)
          .reduce((a, b) => a * obj[b].length, 1);
        const idx = Math.floor(i / divisor) % obj[keys[n]].length;
        result[i][keys[n]] = obj[keys[n]][idx];
      }
    }

    return result;
  }

  /**
   * deta base doesn't support order data by field
   * it will order by key default
   * so we need create a lower key than before to keep latest data in front
   * @returns string
   */
  async uuid() {
    const items = await this.select({}, { limit: 1 });
    let lastKey;
    if (items.length && !isNaN(parseInt(items[0].objectId))) {
      lastKey = parseInt(items[0].objectId);
    } else {
      lastKey = Number.MAX_SAFE_INTEGER - performance.now();
    }
    return (lastKey - Math.round(Math.random() * 100)).toString();
  }

  where(where) {
    if (think.isEmpty(where)) {
      return;
    }

    const parseKey = (k) => (k === 'objectId' ? 'key' : k);
    const conditions = {};
    const _isArrayKeys = [];
    for (let k in where) {
      if (think.isString(where[k])) {
        conditions[parseKey(k)] = where[k];
        continue;
      }
      if (where[k] === undefined) {
        conditions[parseKey(k)] = null;
      }

      if (!think.isArray(where[k]) || !where[k][0]) {
        continue;
      }
      const handler = where[k][0].toUpperCase();
      switch (handler) {
        case 'IN':
          conditions[parseKey(k)] = where[k][1];
          if (think.isArray(where[k][1])) {
            _isArrayKeys.push(parseKey(k));
          }
          break;
        case 'NOT IN':
          /**
           * deta base doesn't support not equal with multiple value query
           * so we have to transfer it into equal with some value in most of scene
           */
          if (Array.isArray(where[k][1]) && parseKey(k) === 'status') {
            const STATUS = ['approved', 'waiting', 'spam'];
            let val = STATUS.filter((s) => !where[k][1].includes(s));
            if (val.length === 1) {
              val = val[0];
            }
            conditions[parseKey(k)] = val;
          }
          conditions[parseKey(k) + '?ne'] = where[k][1];
          break;
        case 'LIKE': {
          const first = where[k][1][0];
          const last = where[k][1].slice(-1);
          if (first === '%' && last === '%') {
            conditions[parseKey(k) + '?contains'] = where[k][1].slice(1, -1);
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

    if (_isArrayKeys.length === 0) {
      return conditions;
    }

    return this.complex(conditions, _isArrayKeys);
  }

  async select(where, { limit, offset, field } = {}) {
    const conditions = this.where(where);
    if (think.isArray(conditions)) {
      return Promise.all(
        conditions.map((condition) =>
          this.select(condition, { limit, offset, field })
        )
      ).then((data) => data.flat());
    }

    let data = [];
    if (
      think.isObject(conditions) &&
      think.isString(conditions.key) &&
      conditions.key
    ) {
      /**
       * deta base doesn't support fetch with key field query
       * if you want query by key field
       * you need use `get()` rather than `fetch()` method.
       */
      const item = await this.instance.get(conditions.key);
      item && data.push(item);
    } else if (offset) {
      /**
       * deta base need last data key when pagination
       * so we need fetch data list again and again
       * because only that we can get last data key
       */
      while (data.length < limit + offset) {
        const lastData = data[data.length - 1];
        const last = lastData ? lastData.key : undefined;
        const { items } = await this.instance.fetch(conditions, {
          limit,
          last,
        });
        data = data.concat(items);

        if (items.length < limit) {
          break;
        }
      }

      data = data.slice(offset, offset + limit);
    } else {
      const { items } = await this.instance.fetch(conditions, {
        limit: limit,
      });
      data = items || [];
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

  async count(where = {}, { group } = {}) {
    if (!group) {
      const conditions = this.where(where);
      if (think.isArray(conditions)) {
        return Promise.all(
          conditions.map((condition) => this.count(condition))
        ).then((counts) => counts.reduce((a, b) => a + b, 0));
      }

      const { count } = await this.instance.fetch(conditions);
      return count;
    }

    const counts = [];
    for (let i = 0; i < group.length; i++) {
      const groupName = group[i];
      if (!where._complex || !Array.isArray(where._complex[groupName])) {
        continue;
      }

      const groupFlatValue = {};
      group.slice(0, i).forEach((group) => {
        groupFlatValue[group] = null;
      });

      for (let j = 0; j < where._complex[groupName][1].length; j++) {
        const groupWhere = {
          ...where,
          ...groupFlatValue,
          _complex: undefined,
          [groupName]: where._complex[groupName][1][j],
        };
        const num = await this.count(groupWhere);
        counts.push({
          ...groupFlatValue,
          [groupName]: where._complex[groupName][1][j],
          count: num,
        });
      }
    }
    return counts;
  }

  async add(data) {
    const uuid = await this.uuid();
    const resp = await this.instance.put(data, uuid);
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
