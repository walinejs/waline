const BaseRest = require('./rest.js');

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

    for (const tableName of exportData.tables) {
      const model = this.getModel(tableName);

      const data = await model.select({});

      exportData.data[tableName] = data;
    }

    return this.success(exportData);
  }

  async postAction() {
    const { table } = this.get();
    const item = this.post();
    const storage = this.config('storage');
    const model = this.getModel(table);

    if (storage === 'leancloud' || storage === 'mysql') {
      if (item.insertedAt) item.insertedAt = new Date(item.insertedAt);
      if (item.createdAt) item.createdAt = new Date(item.createdAt);
      if (item.updatedAt) item.updatedAt = new Date(item.updatedAt);
    }

    if (storage === 'mysql') {
      if (item.insertedAt)
        item.insertedAt = think.datetime(
          item.insertedAt,
          'YYYY-MM-DD HH:mm:ss',
        );
      if (item.createdAt)
        item.createdAt = think.datetime(item.createdAt, 'YYYY-MM-DD HH:mm:ss');
      if (item.updatedAt)
        item.updatedAt = think.datetime(item.updatedAt, 'YYYY-MM-DD HH:mm:ss');
    }

    delete item.objectId;
    const resp = await model.add(item);

    return this.success(resp);
  }

  async putAction() {
    const { table, objectId } = this.get();
    const data = this.post();
    const model = this.getModel(table);

    delete data.objectId;
    delete data.createdAt;
    delete data.updatedAt;
    await model.update(data, { objectId });

    return this.success();
  }

  async deleteAction() {
    const { table } = this.get();
    const model = this.getModel(table);

    await model.delete({});

    return this.success();
  }
};
