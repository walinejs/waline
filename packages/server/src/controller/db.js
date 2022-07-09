const fs = require('fs');
const util = require('util');
const BaseRest = require('./rest');

const readFileAsync = util.promisify(fs.readFile);

function formatID(data, idGenerator) {
  const objectIdMap = {};
  for (let i = 0; i < data.length; i++) {
    const { objectId } = data[i];
    objectIdMap[objectId] = idGenerator(data[i], i, data);
  }

  for (let i = 0; i < data.length; i++) {
    ['objectId', 'pid', 'rid']
      .filter((k) => data[i][k])
      .forEach((k) => {
        data[i][k] = objectIdMap[data[i][k]];
      });
  }

  return data;
}

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

      const idMaps = {};
      const storage = this.config('storage');

      for (let i = 0; i < importData.tables.length; i++) {
        const tableName = importData.tables[i];
        const model = this.service(`storage/${storage}`, tableName);

        idMaps[tableName] = new Map();
        let data = importData.data[tableName];
        if (['postgresql', 'mysql', 'sqlite'].includes(storage)) {
          let i = 0;
          data = formatID(data, () => (i = i + 1));
        } else if (storage === 'leancloud') {
          data
            .filter(({ insertedAt }) => insertedAt)
            .forEach((item) => {
              item.insertedAt = new Date(item.insertedAt);
            });
        }

        // delete all data at first
        await model.delete({});
        // then add data one by one
        for (let j = 0; j < data.length; j++) {
          const ret = await model.add(data[j]);

          idMaps[tableName].set(data[j].objectId, ret.objectId);
        }
      }

      const cmtModel = this.service(`storage/${storage}`, 'Comment');
      const commentData = importData.data.Comment;
      const willUpdateData = [];

      for (let i = 0; i < commentData.length; i++) {
        const cmt = commentData[i];
        const willUpdateItem = {};

        [
          { tableName: 'Comment', field: 'pid' },
          { tableName: 'Comment', field: 'rid' },
          { tableName: 'Users', field: 'user_id' },
        ].forEach(({ tableName, field }) => {
          if (!cmt[field]) {
            return;
          }
          const oldId = cmt[field];
          const newId = idMaps[tableName].get(cmt[field]);

          if (oldId !== newId) {
            willUpdateItem[field] = newId;
          }
        });
        if (!think.isEmpty(willUpdateItem)) {
          willUpdateData.push([
            willUpdateItem,
            { objectId: idMaps.Comment.get(cmt.objectId) },
          ]);
        }
      }
      for (let i = 0; i < willUpdateData.length; i++) {
        const [data, where] = willUpdateData[i];

        await cmtModel.update(data, where);
      }

      return this.success();
    } catch (e) {
      if (think.isPrevent(e)) {
        return this.success();
      }
      console.log(e);
      return this.fail(e.message);
    }
  }
};
