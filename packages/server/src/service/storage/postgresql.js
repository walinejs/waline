const MySQL = require('./mysql');

module.exports = class extends MySQL {
  model(tableName) {
    return super.model(tableName.toLowerCase());
  }

  async select(...args) {
    const data = await super.select(...args.map(x=>{
      if (x.field && x.desc) {
        return {
          desc: x.desc.toLowerCase(),
          field: x.field.map(y=>y.toLowerCase()),
        }
      }
      return x
    }));

    return data.map(({ insertedat, createdat, updatedat, ...item }) => {
      const mapFields = {
        insertedat: insertedat,
        createdat: createdat,
        updatedat: updatedat,
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
