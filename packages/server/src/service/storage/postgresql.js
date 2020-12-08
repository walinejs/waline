const MySQL = require('./mysql');

module.exports = class extends MySQL {
  model(tableName) {
    return super.model(tableName.toLowerCase());
  }

  async count(...args) {
    let result = await super.count(...args);
    try {
      result = parseInt(result);
    } catch(e) {
      console.log(e);
    }
    return result;
  }
}