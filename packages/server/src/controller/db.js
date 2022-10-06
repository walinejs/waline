const BaseRest = require('./rest');

module.exports = class extends BaseRest {
  async getAction() {
    const exportData = {
      type: 'waline',
      version: 1,
      time: Date.now(),
      tables: ['Comment', 'Counter', 'Users'],
      data: {
        Comment: [],
        Counter: [],
        Users: [],
      },
    };

    for (let i = 0; i < exportData.tables.length; i++) {
      const tableName = exportData.tables[i];
      const storage = this.config('storage');
      const model = this.service(`storage/${storage}`, tableName);

      const data = await model.select({});

      exportData.data[tableName] = data;
    }

    return this.success(exportData);
  }

  async postAction() {
    const { table } = this.get();
    const item = this.post();
    const storage = this.config('storage');
    const model = this.service(`storage/${storage}`, table);

    if (storage === 'leancloud' || storage === 'mysql') {
      item.insertedAt && (item.insertedAt = new Date(item.insertedAt));
      item.createdAt && (item.createdAt = new Date(item.createdAt));
      item.updatedAt && (item.updatedAt = new Date(item.updatedAt));
    }

    delete item.objectId;
    const resp = await model.add(item);

    return this.success(resp);
  }

  async putAction() {
    const { table, objectId } = this.get();
    const data = this.post();
    const storage = this.config('storage');
    const model = this.service(`storage/${storage}`, table);

    delete data.objectId;
    delete data.createdAt;
    delete data.updatedAt;
    await model.update(data, { objectId });

    return this.success();
  }

  async deleteAction() {
    const { table } = this.get();
    const storage = this.config('storage');
    const model = this.service(`storage/${storage}`, table);

    await model.delete({});

    return this.success();
  }
};
