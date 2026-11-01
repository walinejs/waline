---
title: Servizio database personalizzato
icon: database
order: -2
---

Waline classifica le operazioni sul database in diverse operazioni come CURD, e tutta la logica di livello superiore viene realizzata tramite la sovrapposizione di queste operazioni di base. Grazie alla modalità adapter, i vari tipi di servizi di archiviazione del database devono implementare solo queste operazioni atomiche di basso livello per far funzionare l'intera logica del sistema.

```js
// index.js
const Application = require('@waline/vercel');

module.exports = Application({
  model: class CustomModel {},
});
```

Waline mette a disposizione l'opzione `model` per personalizzare il modello del database: tutte le operazioni sul database useranno in modo uniforme il modello passato. Non resta altro che implementare questa classe `CustomModel`.

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

Quella sopra è la struttura di base che la classe `CustomModel` deve implementare, e deve includere l'implementazione dei metodi fondamentali `select`, `add`, `update`, `delete` e `count`. Waline è sviluppato sulla base del framework [ThinkJS](https://thinkjs.org/en) e le operazioni di basso livello sul database usano la sintassi di query fornita dal framework. Prima di implementare questi metodi devi avere una conoscenza di base della sintassi delle query condizionali sul database.

## Query condizionali

Per la sintassi completa delle query condizionali, consulta la [documentazione di ThinkJS](https://thinkjs.org/en/doc/3.0/relation_model.html#toc-d47); l'implementazione di Waline ne è un sottoinsieme.

Puoi passare più query condizionali tramite l'oggetto e, per impostazione predefinita, il confronto è di uguaglianza. Quando il valore è un array bidimensionale, il primo elemento indica l'operazione di confronto e il secondo il valore, ad esempio `{user_id: ['!=', 0]}`. Al momento sono supportate le operazioni `!=`, `>`, `IN`, `NOT IN` e `LIKE`.

Come in MySQL, nell'operazione `LIKE` definiamo il tipo di ricerca fuzzy tramite la posizione di `%`:

- `content%` cerca il contenuto che inizia con `content`
- `%content` cerca il contenuto che termina con `content`
- `%content%` cerca il contenuto che contiene `content`

L'oggetto di query condizionale può contenere più condizioni. Per impostazione predefinita la relazione tra queste condizioni è `AND`, e la parola chiave speciale `_logic` permette di impostarla a `OR`. Quando servono sia `AND` sia `OR`, puoi usare l'espressione con la parola chiave speciale `_complex`.

La teoria da sola può non bastare: vediamo alcuni esempi di query usati nel progetto per fissare i concetti.

1. Query generica:

   ```js
   const model = new CustomModel('Comment');
   await model.select({
     url: '/',
     user_id: ['!=', 0],
     createdAt: ['>', '2023-04-16 00:00:00'],
   });
   // SELECT * FROM Comment WHERE url = '/' AND user_id != 0 AND createdAt > "2023-04-16 00:00:00";
   ```

2. Query IN / NOT IN

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

3. Query LIKE

   ```js
   const model = new CustomModel('Comment');
   await model.select({ content: ['LIKE', '%content%'] });
   // SELECT * FROM Comment WHERE content LIKE "%content%";
   ```

4. Query con più condizioni

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

5. Query composta

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

Se hai più familiarità con TypeScript, [qui trovi le definizioni dei tipi per le query condizionali](https://github.com/walinejs/dittorm/blob/master/src/types/where.ts).

## Implementare le query

Nei metodi `select`, `update`, `delete` e `count` dell'adapter la parte davvero complicata è la query condizionale. Una volta compresa la sintassi della query condizionale nella sezione precedente, la logica successiva è la normale operazione sul database.

Il metodo `select()` accetta un secondo argomento `{desc, limit, offset, field}`, anch'esso facile da capire:

- `desc`: specifica il campo in base al quale ordinare in modo decrescente per valore
- `limit`: specifica il numero di dati restituiti
- `offset`: specifica da quale record iniziare a restituire i dati
- `field`: specifica i campi da restituire; per impostazione predefinita vengono restituiti tutti i campi

Il metodo `update()` deve gestire anche i casi in cui il parametro `data` è una funzione di calcolo, ad esempio per incrementare di 1 il numero di visualizzazioni:

```js
const model = new CustomModel('Count');
await model.update((thread) => ({ view: thread.view + 1 }), { url: '/' });
```

Per quanto riguarda i tipi restituiti: `select()` restituisce sempre un array, mentre `add()` e `update()` devono includere tutti i dati del record indicizzato.

## Riferimenti

Sulla base di questa logica, oltre a implementare i servizi di archiviazione dei database professionali, il team ufficiale ha realizzato in modo molto interessante anche un servizio di archiviazione su GitHub. Salviamo i dati su GitHub sotto forma di file CSV, a ogni query leggiamo il contenuto del file CSV, filtriamo i dati in JS in base alla query condizionale e li restituiamo. Qui sotto trovi l'implementazione ufficiale, sperando che ti sia utile come riferimento.

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
