const MySQL = require('./mysql.js');

module.exports = class extends MySQL {
  async setSeqId(id) {
    const instance = this.model(this.tableName);

    return instance.query(
      `UPDATE SQLITE_SEQUENCE SET SEQ=${id} WHERE NAME='${instance.tableName}';`,
    );
  }
};
