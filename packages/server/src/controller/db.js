const fs = require('fs');
const util = require('util');
const BaseRest = require('./rest');

const readFileAsync = util.promisify(fs.readFile);
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
    const file = this.file('file');
    try {
      const jsonText = await readFileAsync(file.path, 'utf-8');
      const importData = JSON.parse(jsonText);
      if (!importData || importData.type !== 'waline') {
        return this.fail(this.locale('import data format not support!'));
      }

      for (let i = 0; i < importData.tables.length; i++) {
        const tableName = importData.tables[i];
        const storage = this.config('storage');
        const model = this.service(`storage/${storage}`, tableName);

        // delete all data at first
        await model.delete({});
        // then add data one by one
        for (let j = 0; j < importData.data[tableName].length; j++) {
          await model.add(importData.data[tableName][j]);
        }
      }
      return this.success();
    } catch (e) {
      if (think.isPrevent(e)) {
        return this.success();
      }
      return this.fail(e.message);
    }
  }
};
