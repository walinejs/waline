const MySQL = require('./mysql.js');
const { toSqlOrder } = require('./order.js');

const PG_FIELDS = {
  insertedAt: 'insertedat',
  createdAt: 'createdat',
  updatedAt: 'updatedat',
  siteId: 'siteid',
  isDefault: 'isdefault',
};

const mapWriteKeys = (data) =>
  Object.fromEntries(
    Object.entries(data).map(([field, value]) => [
      PG_FIELDS[field] ?? field,
      PG_FIELDS[field] && value instanceof Date
        ? think.datetime(value, 'YYYY-MM-DD HH:mm:ss')
        : value,
    ]),
  );

const mapKeys = ({ insertedat, createdat, updatedat, siteid, isdefault, ...item }) => {
  const mapFields = {
    insertedAt: insertedat,
    createdAt: createdat,
    updatedAt: updatedat,
  };
  if (siteid !== undefined) item.siteId = siteid;
  if (isdefault !== undefined) item.isDefault = isdefault;

  for (const field in mapFields) {
    if (!mapFields[field]) {
      continue;
    }

    item[field] = mapFields[field];
  }

  return item;
};
module.exports = class extends MySQL {
  mapOrderField(field) {
    return super.mapOrderField(field).toLowerCase();
  }

  getSqlOrder(order) {
    return toSqlOrder(order, { nulls: true });
  }

  model(tableName) {
    return super.model(tableName.toLowerCase());
  }

  parseWhere(filter) {
    const lowerFilter = Object.fromEntries(
      Object.entries(filter).map(([key, value]) => [
        key === '_complex' ? key : key.toLowerCase(),
        value,
      ]),
    );

    return super.parseWhere(lowerFilter);
  }

  async select(where, options = {}) {
    const lowerWhere = {};

    for (const i in where) {
      lowerWhere[i.toLowerCase()] = where[i];
    }

    if (Array.isArray(options.field)) {
      options.field = options.field.map((field) => field.toLowerCase());
    }

    const data = await super.select(lowerWhere, options);

    return data.map(mapKeys);
  }

  async add(data) {
    return super.add(mapWriteKeys(data)).then(mapKeys);
  }

  async update(data, where) {
    const updateData =
      typeof data === 'function'
        ? (current) => mapWriteKeys(data(mapKeys({ ...current })))
        : mapWriteKeys(data);

    return super.update(updateData, where).then((items) => items.map(mapKeys));
  }

  async count(...args) {
    let result = await super.count(...args);

    try {
      if (Array.isArray(result)) {
        result.forEach((r) => {
          r.count = Math.trunc(Number(r.count));
        });
      } else {
        result = Math.trunc(Number(result));
      }
    } catch (err) {
      console.log(err);
    }

    return result;
  }

  async setSeqId(id) {
    const instance = this.model(this.tableName);

    return instance.query(`ALTER SEQUENCE ${instance.tableName}_seq RESTART WITH ${id};`);
  }
};
