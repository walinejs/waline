---
title: 사용자 정의 데이터베이스 서비스
icon: database
order: -2
---

Waline은 데이터베이스 작업을 CURD와 같은 여러 작업으로 분류하며, 모든 상위 수준의 로직은 이러한 기본 작업의 조합을 통해 완성됩니다. 어댑터 패턴을 통해 다양한 유형의 데이터베이스 저장 서비스는 이러한 하위 수준의 원자적 작업만 구현하면 전체 시스템 로직을 실행할 수 있습니다.

```js
// index.js
const Application = require('@waline/vercel');

module.exports = Application({
  model: class CustomModel {},
});
```

Waline은 데이터베이스 모델을 사용자 정의할 수 있는 `model` 옵션을 제공하며, 전달된 모델을 데이터베이스 작업에 일관되게 사용합니다. 남은 것은 이 `CustomModel` 클래스를 구현하는 것입니다.

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

위는 `CustomModel` 클래스가 구현해야 하는 기본 구조이며, `select`, `add`, `update`, `delete`, `count` 등 여러 기본 메서드의 구현을 포함해야 합니다. Waline은 [ThinkJS](https://thinkjs.org/en) 프레임워크를 기반으로 개발되었으며, 하위 수준의 데이터베이스 작업은 프레임워크에 내장된 데이터베이스 작업 구문을 사용합니다. 이러한 메서드를 구현하기 전에 데이터베이스 조건부 쿼리 구문에 대한 기본적인 이해가 필요합니다.

## 조건부 쿼리

완전한 조건부 쿼리 구문은 [ThinkJS 문서](https://thinkjs.org/ko-KR/doc/3.0/relation_model.html#toc-d47)를 참조하세요. Waline의 구현은 그 하위 집합입니다.

객체를 통해 여러 조건부 쿼리를 전달할 수 있으며, 기본값은 동등 조건입니다. 값이 2차원 배열인 경우 첫 번째 요소에 다른 판단 연산을 전달할 수 있고, 두 번째 요소는 값에 해당합니다. 예를 들어 `{user_id: ['!=', 0]}`과 같습니다. 현재 지원되는 연산은 `!=`, `>`, `IN`, `NOT IN`, `LIKE`입니다.

MySQL과 유사하게, `LIKE` 연산에서 `%`의 위치를 통해 퍼지 쿼리의 모드를 정의합니다:

- `content%`는 `content`로 시작하는 내용을 검색합니다
- `%content`는 `content`로 끝나는 내용을 검색합니다
- `%content%`는 `content`를 포함하는 내용을 검색합니다

조건부 쿼리 객체는 여러 쿼리 조건을 전달하는 것을 지원합니다. 이러한 조건 간의 기본 관계는 `AND`이며, `_logic` 매직 키워드를 사용하여 관계를 `OR`로 지정할 수 있습니다. `AND`와 `OR`가 모두 있는 경우, `_complex` 매직 키워드 표현식을 사용할 수 있습니다.

텍스트만으로는 이해하기 어려울 수 있습니다. 프로젝트에서 사용된 쿼리 예제를 살펴보며 이해를 깊이해 봅시다.

1. 일반 쿼리:

   ```js
   const model = new CustomModel('Comment');
   await model.select({
     url: '/',
     user_id: ['!=', 0],
     createdAt: ['>', '2023-04-16 00:00:00'],
   });
   // SELECT * FROM Comment WHERE url = '/' AND user_id != 0 AND createdAt > "2023-04-16 00:00:00";
   ```

2. IN / NOT IN 쿼리

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

3. LIKE 쿼리

   ```js
   const model = new CustomModel('Comment');
   await model.select({ content: ['LIKE', '%content%'] });
   // SELECT * FROM Comment WHERE content LIKE "%content%";
   ```

4. 다중 조건 쿼리

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

5. 복합 쿼리

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

TypeScript에 더 익숙하다면, [조건부 쿼리의 타입 정의는 여기에서](https://github.com/walinejs/dittorm/blob/master/src/types/where.ts) 확인할 수 있습니다.

## 쿼리 구현

어댑터의 `select`, `update`, `delete`, `count` 메서드에서 실제로 복잡한 부분은 조건부 쿼리입니다. 이전 부분에서 조건부 쿼리 구문을 이해했다면, 나머지 로직은 간단한 데이터베이스 작업입니다.

`select()` 메서드에는 두 번째 인수 `{desc, limit, offset, field}`가 있습니다. 이것도 이해하기 쉽습니다:

- `desc`: 해당 필드의 값을 기준으로 내림차순 정렬할 필드를 지정합니다
- `limit`: 반환할 데이터의 수를 지정합니다
- `offset`: 어느 항목부터 데이터를 반환할지 지정합니다
- `field`: 반환할 데이터의 필드를 지정하며, 기본적으로 모든 필드가 반환됩니다

`update()` 메서드는 `data` 입력 매개변수가 계산 함수일 수 있는 시나리오와 호환되어야 합니다. 예를 들어 페이지 조회수에 1을 더하는 경우:

```js
const model = new CustomModel('Count');
await model.update((thread) => ({ view: thread.view + 1 }), { url: '/' });
```

반환 데이터 타입에서 `select()`는 항상 배열을 반환하며, `add()`와 `update()`는 인덱싱된 필드의 전체 데이터를 포함해야 합니다.

## 참고

위의 로직을 기반으로, 전문적인 데이터베이스의 저장 서비스를 구현하는 것 외에도, 공식적으로 GitHub 저장 서비스도 매우 흥미롭게 구현되었습니다. 데이터를 CSV 파일 형태로 GitHub에 저장하고, 쿼리할 때마다 CSV 파일의 내용을 가져온 후 JS에서 조건부 쿼리 문에 따라 최종 데이터를 필터링하여 반환합니다. 다음은 공식 구현이며, 참고가 되길 바랍니다.

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
