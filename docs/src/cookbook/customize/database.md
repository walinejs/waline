---
title: 自定义数据库服务
icon: database
order: -2
---

Waline 通过将数据库操作归类为 CURD 等几个操作，所有的上层逻辑通过这几个基本操作叠加完成。通过适配器模式，不同类型的数据库存储服务只需要实现这几个底层的原子操作，就能跑通所有的系统逻辑。

```js
// index.js
const Application = require('@waline/vercel');

module.exports = Application({
  model: class CustomModel {},
});
```

Waline 提供了 `model` 选项来自定义数据库模型，我们会统一使用传入的模型进行数据库操作。剩下的是我们需要实现这个 `CustomModel` 类。

```js
class CustomModel {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async select(where, { desc, limit, offset, field } = {}) {
    //to be implemented
  }

  async count(where = {}, options = {}) {
    //to be implemented
  }

  async add(data) {
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

上面这个是 `CustomModel` 类必须要实现的基础结构，它必须包含 `select`, `add`, `update`, `delete` 以及 `count` 几个基础方法的实现。Waline 是基于 [ThinkJS](https://thinkjs.org) 框架开发的，底层数据库操作采用了框架自带的数据库操作语法。在实现这几个方法之前，需要对数据库条件查询的语法有一些基础的理解。

## 条件查询

完整的条件查询语法可以参考 [ThinkJS 文档](https://thinkjs.org/zh-cn/doc/3.0/relation_model.html#toc-d47)，Waline 的实现是它的子集。

通过对象可以传入多条件查询，默认是等于条件。当值为二维数组时，第一位可以传入其他的判断操作，第二位则对应值，例如 `{user_id: ['!=', 0]}`。目前支持的主要有 `!=`, `>`, `IN`, `NOT IN`, `LIKE` 集中运算操作。

和 MySQL 比较类似，`LIKE` 操作中，我们通过 `%` 的位置来定义模糊查询的模式：

- `content%` 表示搜索以 `content` 开头的内容
- `%content` 表示搜索以 `content` 结尾的内容
- `%content%` 表示搜索包含 `content` 的内容

条件查询对象中支持传入多个查询条件，默认这些条件的关系是 `AND`，可以通过 `_logic` 魔术关键字指定他们的关系为 `OR`。又有 `AND` 又有 `OR` 的时候，我们则可以使用 `_complex` 魔术关键字表达。

文字可能无法很好理解，下面让我们看一下项目中使用到的查询示例可能就会加深印象了。

1. 普通查询：

   ```js
   const model = new CustomModel('Comment');
   await model.select({
     url: '/',
     user_id: ['!=', 0],
     createdAt: ['>', '2023-04-16 00:00:00'],
   });
   // SELECT * FROM Comment WHERE url = '/' AND user_id != 0 AND createdAt > "2023-04-16 00:00:00";
   ```

2. IN / NOT IN 查询

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

3. LIKE 查询

   ```js
   const model = new CustomModel('Comment');
   await model.select({ content: ['LIKE', '%content%'] });
   // SELECT * FROM Comment WHERE content LIKE "%content%";
   ```

4. 多条件查询

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

5. 复合查询

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

如果你比较熟悉 TypeScript，[这里](https://github.com/walinejs/dittorm/blob/master/src/types/where.ts)有条件查询的类型定义。

## 实现查询

适配器中 `select`, `update`, `delete`, `count` 这几个方法实际上复杂的地方都在条件查询中，上一部分理解了条件查询语法之后后续的逻辑就是数据库操作了，无需多表。

`select()` 方法还有第二个入参 `{desc, limit, offset, field}`。这个也比较好理解：

- `desc`：指定某个字段按照该字段的值降序排列
- `limit`：指定返回的数据条数
- `offset`：指定返回的数据从第几条开始返回
- `field`：指定返回数据的字段，默认返回所有字段

`update()` 方法需要兼容 `data` 入参可能是计算函数的场景，例如页面浏览人数加 1：

```js
const model = new CustomModel('Count');
await model.update((thread) => ({ view: thread.view + 1 }), { url: '/' });
```

返回数据类型 `select()` 永远返回的是数组，`add()` 和 `update()` 需要包含索引字段的完整数据。

## 参考

基于以上逻辑，官方除了实现了专业数据库的存储服务之外，还非常有意思的实现了 GitHub 存储服务。我们将数据以 CSV 文件的形式存储到 GitHub 中，每次查询的时候获取 CSV 文件内容在 JS 中根据条件查询语句筛选出最终的数据返回即可。以下是官方的实现，希望能给你一些参考。

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
      'https://api.github.com/repos/' +
        path.join(this.repo, 'contents', filename),
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
      'https://api.github.com/repos/' +
        path.join(this.repo, 'git/trees/HEAD') +
        '?recursive=1',
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
    return fetch(
      'https://api.github.com/repos/' +
        path.join(this.repo, 'contents', filename),
      {
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
      },
    );
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

    return data.filter((item) =>
      logicFn.call(filters, (filter) => filter.every((fn) => fn(item))),
    );
  }

  async select(where, { desc, limit, offset, field } = {}) {
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
