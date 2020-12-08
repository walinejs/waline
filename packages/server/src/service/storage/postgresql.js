const MySQL = require('./mysql');

module.exports = class extends MySQL {
  model(tableName) {
    return super.model(tableName.toLowerCase());
  }

  async count(...args) {
    let result = await super.count(...args);
    if(!Array.isArray(result)) {
      return result;
    }
    
    return result[0].think_count;
  }
}