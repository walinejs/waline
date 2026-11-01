---
title: Servicio de base de datos personalizado
icon: database
order: -2
---

Waline clasifica las operaciones de base de datos en varias operaciones como CRUD, y toda la lógica de nivel superior se completa mediante la superposición de estas operaciones básicas. Gracias al modo adaptador, los distintos tipos de servicios de almacenamiento de base de datos solo necesitan implementar estas operaciones atómicas de bajo nivel para que funcione toda la lógica del sistema.

```js
// index.js
const Application = require('@waline/vercel');

module.exports = Application({
  model: class CustomModel {},
});
```

Waline ofrece la opción `model` para personalizar el modelo de base de datos, y usaremos siempre el modelo recibido para las operaciones de base de datos. Solo queda implementar esta clase `CustomModel`.

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

La anterior es la estructura básica que debe implementar la clase `CustomModel`, e incluye necesariamente la implementación de varios métodos básicos: `select`, `add`, `update`, `delete` y `count`. Waline está desarrollado sobre el framework [ThinkJS](https://thinkjs.org/en), y las operaciones de base de datos subyacentes usan la sintaxis de operación de base de datos que trae el framework. Antes de implementar estos métodos, necesitas tener una comprensión básica de la sintaxis de las consultas condicionales de base de datos.

## Consultas condicionales

Para conocer la sintaxis completa de las consultas condicionales, consulta la [documentación de ThinkJS](https://thinkjs.org/en/doc/3.0/relation_model.html#toc-d47); la implementación de Waline es un subconjunto de ella.

Puedes pasar varias condiciones de consulta a través del objeto, y de forma predeterminada se interpreta como igualdad. Cuando el valor es un array de dos dimensiones, la primera posición puede ser otra operación de comparación y la segunda corresponde al valor, por ejemplo `{user_id: ['!=', 0]}`. Actualmente se admiten las operaciones `!=`, `>`, `IN`, `NOT IN` y `LIKE`.

Igual que en MySQL, en la operación `LIKE` definimos el modo de la consulta difusa según la posición de `%`:

- `content%` significa buscar contenido que empieza por `content`
- `%content` significa buscar contenido que termina en `content`
- `%content%` significa buscar contenido que incluye `content`

El objeto de consulta condicional admite varias condiciones de consulta. La relación predeterminada entre ellas es `AND`, y puedes usar la palabra clave mágica `_logic` para indicar que la relación es `OR`. Cuando haya `AND` y `OR` a la vez, puedes usar la palabra clave mágica `_complex`.

Puede que el texto no se entienda bien. Veamos algunos ejemplos de consultas usadas en el proyecto para afianzar la idea.

1. Consulta general:

   ```js
   const model = new CustomModel('Comment');
   await model.select({
     url: '/',
     user_id: ['!=', 0],
     createdAt: ['>', '2023-04-16 00:00:00'],
   });
   // SELECT * FROM Comment WHERE url = '/' AND user_id != 0 AND createdAt > "2023-04-16 00:00:00";
   ```

2. Consulta IN / NOT IN

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

3. Consulta LIKE

   ```js
   const model = new CustomModel('Comment');
   await model.select({ content: ['LIKE', '%content%'] });
   // SELECT * FROM Comment WHERE content LIKE "%content%";
   ```

4. Consulta con varias condiciones

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

5. Consulta compuesta

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

Si estás más familiarizado con TypeScript, [aquí tienes las definiciones de tipos para las consultas condicionales](https://github.com/walinejs/dittorm/blob/master/src/types/where.ts).

## Implementar las consultas

Los métodos `select`, `update`, `delete` y `count` del adaptador se complican en realidad en la consulta condicional. Una vez entendida la sintaxis de las consultas condicionales de la sección anterior, el resto de la lógica es la operación de base de datos en sí.

El método `select()` tiene un segundo argumento `{desc, limit, offset, field}`, que también es fácil de entender:

- `desc`: especifica un campo por el que ordenar de forma descendente según el valor de ese campo
- `limit`: especifica el número de registros devueltos
- `offset`: especifica a partir de qué registro se devuelven los datos
- `field`: especifica los campos que se devuelven; de forma predeterminada se devuelven todos

El método `update()` debe ser compatible con los escenarios en los que el parámetro `data` sea una función de cálculo, por ejemplo, para sumar 1 al número de visitas de la página:

```js
const model = new CustomModel('Count');
await model.update((thread) => ({ view: thread.view + 1 }), { url: '/' });
```

Sobre el tipo de los datos devueltos: `select()` siempre devuelve un array, mientras que `add()` y `update()` deben incluir todos los datos del campo indexado.

## Referencia

Partiendo de la lógica anterior, además de implementar el servicio de almacenamiento de bases de datos profesionales, el equipo oficial también implementó, de forma muy curiosa, un servicio de almacenamiento basado en GitHub. Guardamos los datos en GitHub en forma de archivo CSV, obtenemos el contenido del CSV en cada consulta y, en JS, filtramos los datos finales según la sentencia de consulta condicional y los devolvemos. A continuación tienes la implementación oficial, con la esperanza de que te sirva de referencia.

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
