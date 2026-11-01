---
title: Dịch vụ cơ sở dữ liệu tùy chỉnh
icon: database
order: -2
---

Waline phân loại các thao tác cơ sở dữ liệu thành một số thao tác như CURD, và toàn bộ logic cấp trên được hoàn thành thông qua việc chồng ghép các thao tác cơ bản này. Nhờ chế độ adapter, các dịch vụ lưu trữ cơ sở dữ liệu khác nhau chỉ cần triển khai các thao tác nguyên tử cấp thấp này là có thể chạy được toàn bộ logic của hệ thống.

```js
// index.js
const Application = require('@waline/vercel');

module.exports = Application({
  model: class CustomModel {},
});
```

Waline cung cấp tùy chọn `model` để tùy chỉnh mô hình cơ sở dữ liệu, và chúng tôi sẽ dùng thống nhất mô hình được truyền vào cho các thao tác cơ sở dữ liệu. Phần còn lại là chúng ta cần triển khai lớp `CustomModel` này.

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

Trên đây là cấu trúc cơ bản mà lớp `CustomModel` phải triển khai, và phải bao gồm việc triển khai một số phương thức cơ bản `select`, `add`, `update`, `delete` và `count`. Waline được phát triển dựa trên framework [ThinkJS](https://thinkjs.org/en), và các thao tác cơ sở dữ liệu ở tầng dưới dùng cú pháp thao tác cơ sở dữ liệu đi kèm framework. Trước khi triển khai các phương thức này, bạn cần có hiểu biết cơ bản về cú pháp truy vấn có điều kiện của cơ sở dữ liệu.

## Truy vấn có điều kiện

Về cú pháp truy vấn có điều kiện đầy đủ, hãy tham khảo [Tài liệu ThinkJS](https://thinkjs.org/en/doc/3.0/relation_model.html#toc-d47); cách triển khai của Waline là một tập con của cú pháp đó.

Có thể truyền nhiều điều kiện truy vấn qua đối tượng, và mặc định là điều kiện bằng nhau. Khi giá trị là mảng hai chiều, phần tử đầu tiên có thể là các phép so sánh khác, phần tử thứ hai tương ứng với giá trị, ví dụ `{user_id: ['!=', 0]}`. Hiện tại hỗ trợ các phép `!=`, `>`, `IN`, `NOT IN`, `LIKE`.

Tương tự MySQL, trong phép `LIKE`, chúng ta xác định kiểu truy vấn mờ thông qua vị trí của `%`:

- `content%` có nghĩa là tìm nội dung bắt đầu bằng `content`
- `%content` có nghĩa là tìm nội dung kết thúc bằng `content`
- `%content%` có nghĩa là tìm nội dung chứa `content`

Đối tượng truy vấn có điều kiện hỗ trợ truyền nhiều điều kiện truy vấn. Quan hệ mặc định giữa các điều kiện này là `AND`, và có thể dùng từ khóa đặc biệt `_logic` để chỉ định quan hệ là `OR`. Khi có cả `AND` và `OR`, chúng ta có thể dùng biểu thức với từ khóa đặc biệt `_complex`.

Phần văn bản có thể chưa dễ hiểu. Hãy xem các ví dụ truy vấn được dùng trong dự án để nhớ kỹ hơn.

1. Truy vấn thông thường:

   ```js
   const model = new CustomModel('Comment');
   await model.select({
     url: '/',
     user_id: ['!=', 0],
     createdAt: ['>', '2023-04-16 00:00:00'],
   });
   // SELECT * FROM Comment WHERE url = '/' AND user_id != 0 AND createdAt > "2023-04-16 00:00:00";
   ```

2. Truy vấn IN / NOT IN

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

3. Truy vấn LIKE

   ```js
   const model = new CustomModel('Comment');
   await model.select({ content: ['LIKE', '%content%'] });
   // SELECT * FROM Comment WHERE content LIKE "%content%";
   ```

4. Truy vấn nhiều điều kiện

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

5. Truy vấn phức hợp

   ```js
   const model = new CustomModel('Comment');
   await model. select({
     url: '/',
     _complex: {
       user_id: 0,
       status: ['NOT IN', ['waiting', 'spam']]
       _logic: 'OR'
     }
   });
   // SELECT * FROM Comment WHERE url = '/' AND ( user_id = 0 OR status NOT IN ('waiting', 'spam'));
   ```

Nếu bạn quen thuộc hơn với TypeScript, [định nghĩa kiểu cho truy vấn có điều kiện ở đây](https://github.com/walinejs/dittorm/blob/master/src/types/where.ts).

## Triển khai truy vấn

Các phương thức `select`, `update`, `delete`, `count` trong adapter thực ra phức tạp ở phần truy vấn có điều kiện. Sau khi hiểu cú pháp truy vấn có điều kiện ở phần trước, logic tiếp theo chỉ là thao tác cơ sở dữ liệu.

Phương thức `select()` có tham số thứ hai `{desc, limit, offset, field}`. Điều này cũng dễ hiểu:

- `desc`: Chỉ định trường để sắp xếp giảm dần theo giá trị của trường đó
- `limit`: chỉ định số lượng dữ liệu trả về
- `offset`: Chỉ định dữ liệu trả về bắt đầu từ mục nào
- `field`: Chỉ định trường dữ liệu trả về, mặc định trả về tất cả các trường

Phương thức `update()` cần tương thích với trường hợp tham số đầu vào `data` có thể là một hàm tính toán, ví dụ tăng số lượt xem trang thêm 1:

```js
const model = new CustomModel('Count');
await model.update((thread) => ({ view: thread.view + 1 }), { url: '/' });
```

Về kiểu dữ liệu trả về: `select()` luôn trả về một mảng, `add()` và `update()` cần bao gồm toàn bộ dữ liệu của trường được lập chỉ mục.

## Tham khảo

Dựa trên logic trên, ngoài việc triển khai dịch vụ lưu trữ cho các cơ sở dữ liệu chuyên dụng, nhóm chính thức còn triển khai dịch vụ lưu trữ GitHub một cách khá thú vị. Chúng tôi lưu dữ liệu trên GitHub dưới dạng tệp CSV, mỗi lần truy vấn đều lấy nội dung tệp CSV, lọc ra dữ liệu cuối cùng theo câu truy vấn có điều kiện bằng JS rồi trả về. Dưới đây là cách triển khai chính thức, hy vọng có thể cho bạn một số tham khảo.

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
