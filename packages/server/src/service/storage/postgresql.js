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

  async count(...args) {
    let result = await super.count(...args);
    try {
      result = parseInt(result);
    } catch (e) {
      console.log(e);
    }
    return result;
  }
};
