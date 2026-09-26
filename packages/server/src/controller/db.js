const BaseRest = require('./rest.js');
const {
  clearDatabaseTable,
  createDatabaseRepositories,
  exportDatabase,
  importDatabaseItem,
  updateDatabaseItem,
} = require('../core.js');

module.exports = class DBController extends BaseRest {
  async getAction() {
    return this.success(await exportDatabase(createDatabaseRepositories(this)));
  }

  async postAction() {
    const { table } = this.get();
    const item = this.post();
    return this.success(
      await importDatabaseItem(
        { table, item, storage: this.config('storage') },
        createDatabaseRepositories(this),
        { formatDate: (value) => think.datetime(value, 'YYYY-MM-DD HH:mm:ss') },
      ),
    );
  }

  async putAction() {
    const { table, objectId } = this.get();
    const data = this.post();
    await updateDatabaseItem({ table, objectId, data }, createDatabaseRepositories(this));

    return this.success();
  }

  async deleteAction() {
    const { table } = this.get();
    await clearDatabaseTable({ table }, createDatabaseRepositories(this));

    return this.success();
  }
};
