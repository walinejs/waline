const MySQL = require('./mysql');

module.exports = class extends MySQL {
  async add(data) {
    for (const key in data) {
      if (typeof data[key] instanceof Date) {
        data[key] = data[key].toString(); //convert date to string
      }
    }
    return await super.add(data);
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
