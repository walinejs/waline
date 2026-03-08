---
title: Benutzerdefinierter Datenbankdienst
icon: database
order: -2
---

Waline klassifiziert Datenbankoperationen in mehrere Operationen wie CURD, und die gesamte Logik auf höherer Ebene wird durch die Überlagerung dieser grundlegenden Operationen abgeschlossen. Durch den Adapter-Modus müssen unterschiedliche Arten von Datenbankspeicherdiensten nur diese grundlegenden atomaren Operationen auf niedriger Ebene implementieren, um die gesamte Systemlogik durchzuführen.

```js
// index.js
const Application = require('@waline/vercel');

module.exports = Application({
  model: class CustomModel {},
});
```

Waline bietet die Option `model` zum Anpassen des Datenbankmodells, und wir werden das eingehende Modell einheitlich für Datenbankoperationen verwenden. Alles, was noch bleibt, ist, dass wir diese `CustomModel`-Klasse implementieren müssen.

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

Das Obige ist die grundlegende Struktur, die die Klasse `CustomModel` implementieren muss, und sie muss die Implementierung mehrerer grundlegender Methoden `select`, `add`, `update`, `delete` und `count` enthalten. Waline wird basierend auf dem [ThinkJS](https://thinkjs.org/en)-Framework entwickelt, und die zugrunde liegenden Datenbankoperationen verwenden die mit dem Framework gelieferte Datenbank-Operationssyntax. Bevor Sie diese Methoden implementieren, müssen Sie ein grundlegendes Verständnis der Syntax von Datenbank-Bedingungsabfragen haben.

## Bedingungsabfrage

Für die vollständige Syntax der Bedingungsabfrage siehe [ThinkJS-Dokumentation](https://thinkjs.org/de/doc/3.0/relation_model.html#toc-d47), und die Implementierung von Waline ist eine Teilmenge davon.

Mehrere Bedingungsabfragen können über das Objekt übergeben werden, und standardmäßig entspricht es der Bedingung. Wenn der Wert ein zweidimensionales Array ist, kann das erste Bit an andere Beurteilungsoperationen übergeben werden, und das zweite Bit entspricht dem Wert, wie `{user_id: ['!=', 0]}`. Derzeit werden `!=`, `>`, `IN`, `NOT IN`, `LIKE` zentralisierte Operationen unterstützt.

Ähnlich wie bei MySQL definieren wir in der `LIKE`-Operation den Modus der unscharfen Suche über die Position von `%`:

- `content%` bedeutet Suche nach Inhalten, die mit `content` beginnen
- `%content` bedeutet Suche nach Inhalten, die mit `content` enden
- `%content%` bedeutet Suche nach Inhalten, die `content` enthalten

Das Bedingungsabfrageobjekt unterstützt die Übergabe mehrerer Abfragebedingungen. Die Standardbeziehung zwischen diesen Bedingungen ist `AND`, und das magische Schlüsselwort `_logic` kann verwendet werden, um ihre Beziehung als `OR` anzugeben. Wenn es `AND` und `OR` gibt, können wir das magische Schlüsselwort `_complex` verwenden.

Der Text kann nicht gut verstanden werden. Schauen wir uns die im Projekt verwendeten Abfragebeispiele an, um unseren Eindruck zu vertiefen.

1. Allgemeine Abfrage:

   ```js
   const model = new CustomModel('Comment');
   await model.select({
     url: '/',
     user_id: ['!=', 0],
     createdAt: ['>', '2023-04-16 00:00:00'],
   });
   // SELECT * FROM Comment WHERE url = '/' AND user_id != 0 AND createdAt > "2023-04-16 00:00:00";
   ```

2. IN / NOT IN Abfrage

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

3. LIKE Abfrage

   ```js
   const model = new CustomModel('Comment');
   await model.select({ content: ['LIKE', '%content%'] });
   // SELECT * FROM Comment WHERE content LIKE "%content%";
   ```

4. Mehrbedingungsabfrage

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

5. Zusammengesetzte Abfrage

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

Wenn Sie mit TypeScript besser vertraut sind, [finden Sie hier Typdefinitionen für Bedingungsabfragen](https://github.com/walinejs/dittorm/blob/master/src/types/where.ts).

## Abfrage implementieren

Die Methoden `select`, `update`, `delete`, `count` im Adapter sind bei der Bedingungsabfrage tatsächlich kompliziert. Nachdem Sie die Bedingungsabfragesyntax im vorherigen Teil verstanden haben, ist die nachfolgende Logik die Datenbank-Operationsoberfläche.

Die Methode `select()` hat ein zweites Argument `{desc, limit, offset, field}`. Dies ist auch leichter zu verstehen:

- `desc`: Geben Sie ein Feld an, um in absteigender Reihenfolge des Werts des Felds zu sortieren
- `limit`: Geben Sie die Anzahl der zurückgegebenen Daten an
- `offset`: Geben Sie die zurückgegebenen Daten an, ab welchem Element zurückgegeben werden soll
- `field`: Geben Sie das Feld an, um Daten zurückzugeben, alle Felder werden standardmäßig zurückgegeben

Die Methode `update()` muss mit Szenarien kompatibel sein, in denen der Eingabeparameter `data` eine Berechnungsfunktion sein kann, z. B. das Hinzufügen von 1 zur Anzahl der Seitenaufrufe:

```js
const model = new CustomModel('Count');
await model.update((thread) => ({ view: thread.view + 1 }), { url: '/' });
```

Rückgabedatentyp `select()` gibt immer ein Array zurück, `add()` und `update()` müssen die vollständigen Daten des indizierten Felds enthalten.

## Referenz

Basierend auf der obigen Logik hat die offizielle Stelle neben der Implementierung des Speicherdienstes professioneller Datenbanken auch den GitHub-Speicherdienst sehr interessant implementiert. Wir speichern die Daten in GitHub in Form einer CSV-Datei und erhalten jedes Mal, wenn wir abfragen, den Inhalt der CSV-Datei und filtern die endgültigen Daten gemäß der Bedingungsabfrageanweisung in JS heraus und geben sie zurück. Das Folgende ist die offizielle Implementierung, die Ihnen hoffentlich als Referenz dient.

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
