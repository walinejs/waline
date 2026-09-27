const BaseRest = require('./rest.js');

module.exports = class DBController extends BaseRest {
  getAction() {
    return this.runCore((core, ctx) => core.database.export({}, ctx));
  }

  postAction() {
    const { table } = this.get();
    const data = this.post();
    const storage = this.config('storage');

    if (storage === 'leancloud' || storage === 'mysql') {
      for (const field of ['insertedAt', 'createdAt', 'updatedAt']) {
        if (data[field]) data[field] = new Date(data[field]);
      }
    }
    if (storage === 'mysql') {
      for (const field of ['insertedAt', 'createdAt', 'updatedAt']) {
        if (data[field]) data[field] = think.datetime(data[field], 'YYYY-MM-DD HH:mm:ss');
      }
    }

    return this.runCore((core, ctx) => core.database.import({ table, data }, ctx));
  }

  putAction() {
    const { table, objectId } = this.get();

    return this.runCore((core, ctx) =>
      core.database.update({ table, objectId, data: this.post() }, ctx),
    );
  }

  deleteAction() {
    return this.runCore((core, ctx) => core.database.clear({ table: this.get('table') }, ctx));
  }
};
