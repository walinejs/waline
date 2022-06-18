const MySQL = require('./mysql');

module.exports = class extends MySQL {
  model(tableName) {
    return super.model(tableName.toLowerCase());
  }

  async select(...args) {
    const data = await super.select(...args);
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
};
