/* eslint-disable no-unused-vars */

module.exports = class extends think.Service {
  constructor(tableName) {
    super();
    this.tableName = tableName;
  }

  async select(where, { desc, limit, offset, field } = {}) {
    //to be implemented
  }

  async count(where = {}, options = {}) {
    //to be implemented
  }

  async add(
    data,
    { access: { read = true, write = true } = { read: true, write: true } } = {}
  ) {
    //to be implemented
  }

  async update(data, where) {
    //to be implemented
  }

  async delete(where) {
    //to be implemented
  }
};
