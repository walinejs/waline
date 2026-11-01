---
title: 自訂資料庫服務
icon: database
order: -2
---

Waline 透過將資料庫操作歸類為 CURD 等幾個操作，所有的上層邏輯都透過這幾個基本操作疊加完成。透過轉接器模式，不同型別的資料庫儲存服務只需要實作這幾個底層的原子操作，就能跑通所有的系統邏輯。

```js
// index.js
const Application = require('@waline/vercel');

module.exports = Application({
  model: class CustomModel {},
});
```

Waline 提供了 `model` 選項來自訂資料庫模型，我們會統一使用傳入的模型進行資料庫操作。剩下的就是我們需要實作這個 `CustomModel` 類別。

```js
class CustomModel {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async select(where, { desc, limit, offset, field, order } = {}) {
    //to be implemented
  }

  async count(where = {}, options = {}) {
    //to be implemented
  }

  async add(data, { access } = { access: { read: true, write: true } }) {
    //to be implemented
  }

  async update(data, where) {
    //to be implemented
  }

  async delete(where) {
    //to be implemented
  }
}
```

上面這個是 `CustomModel` 類別必須要實作的基礎結構，它必須包含 `select`、`add`、`update`、`delete` 以及 `count` 幾個基礎方法的實作。Waline 是基於 [ThinkJS](https://thinkjs.org) 框架開發的，底層資料庫操作採用了框架內建的資料庫操作語法。在實作這幾個方法之前，需要對資料庫條件查詢的語法有一些基礎的理解。

## 條件查詢

完整的條件查詢語法可以參考 [ThinkJS 文件](https://thinkjs.org/zh-cn/doc/3.0/relation_model.html#toc-d47)，Waline 的實作是它的子集。

透過物件可以傳入多條件查詢，預設是等於條件。當值為二維陣列時，第一位可以傳入其他的判斷操作，第二位則對應值，例如 `{user_id: ['!=', 0]}`。目前支援的主要有 `!=`、`>`、`IN`、`NOT IN`、`LIKE` 這幾種運算操作。

和 MySQL 比較類似，`LIKE` 操作中，我們透過 `%` 的位置來定義模糊查詢的模式：

- `content%` 表示搜尋以 `content` 開頭的內容
- `%content` 表示搜尋以 `content` 結尾的內容
- `%content%` 表示搜尋包含 `content` 的內容

條件查詢物件中支援傳入多個查詢條件，預設這些條件的關係是 `AND`，可以透過 `_logic` 魔術關鍵字指定它們的關係為 `OR`。既有 `AND` 又有 `OR` 的時候，我們則可以使用 `_complex` 魔術關鍵字來表達。

文字可能無法很好地理解，下面讓我們看一下專案中使用到的查詢範例，可能就會加深印象了。

1. 普通查詢：

   ```js
   const model = new CustomModel('Comment');
   await model.select({
     url: '/',
     user_id: ['!=', 0],
     createdAt: ['>', '2023-04-16 00:00:00'],
   });
   // SELECT * FROM Comment WHERE url = '/' AND user_id != 0 AND createdAt > "2023-04-16 00:00:00";
   ```

2. IN / NOT IN 查詢

   ```js
   const model = new CustomModel('Users');
   await model.select({ objectId: ['IN', [1, 2, 3, 4]] });
   // SELECT * FROM Users WHERE objectId IN (1,2,3,4);
   ```

   ```js
   const model = new CustomModel('Comment');
   await model.select({ status: ['NOT IN', ['waiting', 'spam']] });
   // SELECT * FROM Comment WHERE status NOT IN ('waiting', 'spam');
   ```

3. LIKE 查詢

   ```js
   const model = new CustomModel('Comment');
   await model.select({ content: ['LIKE', '%content%'] });
   // SELECT * FROM Comment WHERE content LIKE "%content%";
   ```

4. 多條件查詢

   ```js
   const model = new CustomModel('Comment');
   await model.select({
     url: '/',
     user_id: ['!=', 0],
     createdAt: ['>', '2023-04-16 00:00:00'],
     _logic: 'OR',
   });
   // SELECT * FROM Comment WHERE url = '/' OR user_id != 0 OR createdAt > "2023-04-16 00:00:00";
   ```

5. 複合查詢

   ```js
   const model = new CustomModel('Comment');
   await model.select({
     url: '/',
     _complex: {
       user_id: 0,
       status: ['NOT IN', ['waiting', 'spam']]
       _logic: 'OR'
     }
   });
   // SELECT * FROM Comment WHERE url = '/' AND ( user_id = 0 OR status NOT IN ('waiting', 'spam'));
   ```

如果你比較熟悉 TypeScript，[這裡](https://github.com/walinejs/dittorm/blob/master/src/types/where.ts)有條件查詢的型別定義。

## 實作查詢

轉接器中 `select`、`update`、`delete`、`count` 這幾個方法實際上複雜的地方都在條件查詢中，上一部分理解了條件查詢語法之後，後續的邏輯就是資料庫操作了，無需多說。

`select()` 方法還有第二個入參 `{desc, limit, offset, field}`。這個也比較好理解：

- `desc`：指定某個欄位按照該欄位的值遞減排列
- `limit`：指定回傳的資料筆數
- `offset`：指定回傳的資料從第幾筆開始回傳
- `field`：指定回傳資料的欄位，預設回傳所有欄位

`update()` 方法需要相容 `data` 入參可能是計算函式的情境，例如頁面瀏覽人數加 1：

```js
const model = new CustomModel('Count');
await model.update((thread) => ({ view: thread.view + 1 }), { url: '/' });
```

回傳資料型別 `select()` 永遠回傳的是陣列，`add()` 和 `update()` 需要包含索引欄位的完整資料。

## 參考

基於以上邏輯，官方除了實作專業資料庫的儲存服務之外，還非常有意思地實作了 GitHub 儲存服務。我們將資料以 CSV 檔案的形式儲存到 GitHub 中，每次查詢的時候取得 CSV 檔案內容，在 JS 中根據條件查詢語句篩選出最終的資料回傳即可。以下是官方的實作，希望能給你一些參考。

```js
//source code: https://github.com/walinejs/waline/blob/main/packages/server/src/service/storage/github.js

const path = require('path');

const { parseString, writeToString } = require('fast-csv');

const Base = require('./base');

const CSV_HEADERS = {
  Comment: [
    'objectId',
    'user_id',
    'comment',
    'insertedAt',
    'ip',
    'link',
    'mail',
    'nick',
    'pid',
    'rid',
    'status',
    'ua',
    'url',
    'createdAt',
    'updatedAt',
  ],
  Counter: ['objectId', 'time', 'url', 'createdAt', 'updatedAt'],
  Users: [
    'objectId',
    'display_name',
    'email',
    'password',
    'type',
    'url',
    'avatar',
    'label',
    'github',
    'twitter',
    'facebook',
    'google',
    'weibo',
    'qq',
    'createdAt',
    'updatedAt',
  ],
};

class Github {
  constructor(repo, token) {
    this.token = token;
    this.repo = repo;
  }

  // content api can only get file < 1MB
  async get(filename) {
    const resp = await fetch(
      'https://api.github.com/repos/' + path.join(this.repo, 'contents', filename),
      {
        headers: {
          accept: 'application/vnd.github.v3+json',
          authorization: 'token ' + this.token,
          'user-agent': 'Waline',
        },
      },
    )
      .then((resp) => resp.json())
      .catch((e) => {
        const isTooLarge = e.message.includes('"too_large"');

        if (!isTooLarge) {
          throw e;
        }

        return this.getLargeFile(filename);
      });

    return {
      data: Buffer.from(resp.content, 'base64').toString('utf-8'),
      sha: resp.sha,
    };
  }

  // blob api can get file larger than 1MB
  async getLargeFile(filename) {
    const { tree } = await fetch(
      'https://api.github.com/repos/' + path.join(this.repo, 'git/trees/HEAD') + '?recursive=1',
      {
        headers: {
          accept: 'application/vnd.github.v3+json',
          authorization: 'token ' + this.token,
          'user-agent': 'Waline',
        },
      },
    ).then((resp) => resp.json());

    const file = tree.find(({ path }) => path === filename);

    if (!file) {
      const error = new Error('NOT FOUND');

      error.statusCode = 404;
      throw error;
    }

    return fetch(file.url, {
      headers: {
        accept: 'application/vnd.github.v3+json',
        authorization: 'token ' + this.token,
        'user-agent': 'Waline',
      },
    }).then((resp) => resp.json());
  }

  async set(filename, content, { sha }) {
    return fetch('https://api.github.com/repos/' + path.join(this.repo, 'contents', filename), {
      method: 'PUT',
      headers: {
        accept: 'application/vnd.github.v3+json',
        authorization: 'token ' + this.token,
        'user-agent': 'Waline',
      },
      body: JSON.stringify({
        sha,
        message: 'feat(waline): update comment data',
        content: Buffer.from(content, 'utf-8').toString('base64'),
      }),
    });
  }
}

module.exports = class extends Base {
  constructor(tableName) {
    super();
    this.tableName = tableName;

    const { GITHUB_TOKEN, GITHUB_REPO, GITHUB_PATH } = process.env;

    this.git = new Github(GITHUB_REPO, GITHUB_TOKEN);
    this.basePath = GITHUB_PATH;
  }

  async collection(tableName) {
    const filename = path.join(this.basePath, tableName + '.csv');
    const file = await this.git.get(filename).catch((e) => {
      if (e.statusCode === 404) {
        return '';
      }
      throw e;
    });

    return new Promise((resolve, reject) => {
      const data = [];

      data.sha = file.sha;

      return parseString(file.data, {
        headers: file ? true : CSV_HEADERS[tableName],
      })
        .on('error', reject)
        .on('data', (row) => data.push(row))
        .on('end', () => resolve(data));
    });
  }

  async save(tableName, data, sha) {
    const filename = path.join(this.basePath, tableName + '.csv');
    const csv = await writeToString(data, {
      headers: sha ? true : CSV_HEADERS[tableName],
      writeHeaders: true,
    });

    return this.git.set(filename, csv, { sha });
  }

  parseWhere(where) {
    const _where = [];

    if (think.isEmpty(where)) {
      return _where;
    }

    const filters = [];

    for (let k in where) {
      if (k === '_complex') {
        continue;
      }

      if (k === 'objectId') {
        filters.push((item) => item.id === where[k]);
        continue;
      }
      if (think.isString(where[k])) {
        filters.push((item) => item[k] === where[k]);
        continue;
      }
      if (where[k] === undefined) {
        filters.push((item) => item[k] === null || item[k] === undefined);
      }
      if (!Array.isArray(where[k]) || !where[k][0]) {
        continue;
      }

      const handler = where[k][0].toUpperCase();

      switch (handler) {
        case 'IN':
          filters.push((item) => where[k][1].includes(item[k]));
          break;
        case 'NOT IN':
          filters.push((item) => !where[k][1].includes(item[k]));
          break;
        case 'LIKE': {
          const first = where[k][1][0];
          const last = where[k][1].slice(-1);
          let reg;

          if (first === '%' && last === '%') {
            reg = new RegExp(where[k][1].slice(1, -1));
          } else if (first === '%') {
            reg = new RegExp(where[k][1].slice(1) + '$');
          } else if (last === '%') {
            reg = new RegExp('^' + where[k][1].slice(0, -1));
          }
          filters.push((item) => reg.test(item[k]));
          break;
        }
        case '!=':
          filters.push((item) => item[k] !== where[k][1]);
          break;
        case '>':
          filters.push((item) => item[k] >= where[k][1]);
          break;
      }
    }

    return filters;
  }

  where(data, where) {
    const filter = this.parseWhere(where);

    if (!where._complex) {
      return data.filter((item) => filter.every((fn) => fn(item)));
    }

    const logicMap = {
      and: Array.prototype.every,
      or: Array.prototype.some,
    };
    const filters = [];

    for (const k in where._complex) {
      if (k === '_logic') {
        continue;
      }

      filters.push([...filter, ...this.parseWhere({ [k]: where._complex[k] })]);
    }

    const logicFn = logicMap[where._complex._logic];

    return data.filter((item) => logicFn.call(filters, (filter) => filter.every((fn) => fn(item))));
  }

  async select(where, { desc, limit, offset, field, order } = {}) {
    const instance = await this.collection(this.tableName);
    let data = this.where(instance, where);

    if (desc) {
      data.sort((a, b) => {
        if (['insertedAt', 'createdAt', 'updatedAt'].includes(desc)) {
          const aTime = new Date(a[desc]).getTime();
          const bTime = new Date(b[desc]).getTime();

          return bTime - aTime;
        }

        return a[desc] - b[desc];
      });
    }

    data = data.slice(limit || 0, offset || data.length);
    if (field) {
      field.push('id');
      const fieldObj = {};

      field.forEach((f) => (fieldObj[f] = true));
      data = data.map((item) => {
        const ret = {};

        for (const k in item) {
          if (fieldObj[k]) {
            ret[k] = item[k];
          }
        }

        return ret;
      });
    }

    return data.map(({ id, ...cmt }) => ({ ...cmt, objectId: id }));
  }

  async count(where = {}, { group } = {}) {
    const instance = await this.collection(this.tableName);
    const data = this.where(instance, where);

    if (!group) {
      return data.length;
    }

    const counts = {};

    for (let i = 0; i < data.length; i++) {
      const key = group.map((field) => data[field]).join();

      if (!counts[key]) {
        counts[key] = { count: 0 };
        group.forEach((field) => {
          counts[key][field] = data[field];
        });
      }
      counts[key].count += 1;
    }

    return Object.keys(counts);
  }

  async add(
    data,
    // { access: { read = true, write = true } = { read: true, write: true } } = {}
  ) {
    const instance = await this.collection(this.tableName);
    const id = Math.random().toString(36).substr(2, 15);

    instance.push({ ...data, id });
    await this.save(this.tableName, instance, instance.sha);

    return { ...data, objectId: id };
  }

  async update(data, where) {
    delete data.objectId;

    const instance = await this.collection(this.tableName);
    const list = this.where(instance, where);

    list.forEach((item) => {
      if (typeof data === 'function') {
        data(item);
      } else {
        for (const k in data) {
          item[k] = data[k];
        }
      }
    });
    await this.save(this.tableName, instance, instance.sha);

    return list;
  }

  async delete(where) {
    const instance = await this.collection(this.tableName);
    const deleteData = this.where(instance, where);
    const deleteId = deleteData.map(({ id }) => id);
    const data = instance.filter((data) => !deleteId.includes(data.id));

    await this.save(this.tableName, data, instance.sha);
  }
};
```
