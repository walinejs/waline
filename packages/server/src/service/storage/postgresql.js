const MySQL = require('./mysql');

module.exports = class extends MySQL {
  model(tableName) {
    return super.model(tableName.toLowerCase());
  }

  async select(where, options = {}) {
    const lowerWhere = {};

    for (const i in where) {
      lowerWhere[i.toLowerCase()] = where[i];
    }

    if (options && options.desc) {
      options.desc = options.desc.toLowerCase();
    }

    if (Array.isArray(options.field)) {
      options.field = options.field.map((field) => field.toLowerCase());
    }

    const data = await super.select(lowerWhere, options);

    return data.map(({ insertedat, createdat, updatedat, ...item }) => {
      const mapFields = {
        insertedAt: insertedat,
        createdAt: createdat,
        updatedAt: updatedat,
      };

      for (const field in mapFields) {
        if (!mapFields[field]) {
          continue;
        }
        item[field] = mapFields[field];
      }

      return item;
    });
  }

  async add(data) {
    ['insertedAt', 'createdAt', 'updatedAt']
      .filter((key) => data[key])
      .forEach((key) => {
        const val = data[key];

        data[key.toLowerCase()] =
          val instanceof Date
            ? think.datetime(val, 'YYYY-MM-DD HH:mm:ss')
            : val;
        delete data[key];
      });

    return super.add(data);
  }

  async count(...args) {
    let result = await super.count(...args);

    try {
      if (Array.isArray(result)) {
        result.forEach((r) => {
          r.count = parseInt(r.count);
        });
      } else {
        result = parseInt(result);
      }
    } catch (e) {
      console.log(e);
    }

    return result;
  }

  async setSeqId(id) {
    const instance = this.model(this.tableName);

    return instance.query(
      `ALTER SEQUENCE ${instance.tableName}_seq RESTART WITH ${id};`
    );
  }
};
