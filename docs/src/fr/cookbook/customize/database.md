---
title: Service de base de données personnalisé
icon: database
order: -2
---

Waline classe les opérations de base de données en plusieurs opérations telles que CRUD, et toute la logique de haut niveau est réalisée par la superposition de ces opérations de base. Grâce au mode adaptateur, les différents types de services de stockage de base de données n'ont qu'à implémenter ces opérations atomiques de bas niveau pour faire fonctionner toute la logique du système.

```js
// index.js
const Application = require('@waline/vercel');

module.exports = Application({
  model: class CustomModel {},
});
```

Waline fournit l'option `model` pour personnaliser le modèle de base de données, et nous utilisons uniformément le modèle transmis pour les opérations sur la base de données. Il ne reste plus qu'à implémenter cette classe `CustomModel`.

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

Ce qui précède constitue la structure de base que la classe `CustomModel` doit implémenter : elle doit inclure l'implémentation de plusieurs méthodes de base, `select`, `add`, `update`, `delete` et `count`. Waline est développé sur la base du framework [ThinkJS](https://thinkjs.org/en) et les opérations de base de données sous-jacentes utilisent la syntaxe fournie par le framework. Avant d'implémenter ces méthodes, vous devez avoir une compréhension minimale de la syntaxe des requêtes conditionnelles.

## Requête conditionnelle

Pour la syntaxe complète des requêtes conditionnelles, consultez la [documentation ThinkJS](https://thinkjs.org/en/doc/3.0/relation_model.html#toc-d47) ; l'implémentation de Waline en est un sous-ensemble.

Plusieurs requêtes conditionnelles peuvent être transmises via l'objet, et par défaut la condition est une égalité. Lorsque la valeur est un tableau à deux dimensions, le premier élément peut être une autre opération de comparaison et le second correspond à la valeur, par exemple `{user_id: ['!=', 0]}`. Les opérations actuellement prises en charge sont `!=`, `>`, `IN`, `NOT IN` et `LIKE`.

Comme pour MySQL, dans l'opération `LIKE`, nous définissons le mode de la requête floue par la position de `%` :

- `content%` : recherche un contenu commençant par `content`
- `%content` : recherche un contenu se terminant par `content`
- `%content%` : recherche un contenu contenant `content`

L'objet de requête conditionnelle accepte plusieurs conditions. La relation par défaut entre ces conditions est `AND`, et le mot-clé magique `_logic` permet de spécifier une relation `OR`. Lorsqu'il y a à la fois `AND` et `OR`, nous pouvons utiliser l'expression du mot-clé magique `_complex`.

Le texte n'est peut-être pas très clair. Examinons les exemples de requêtes utilisés dans le projet pour bien ancrer les idées.

1. Requête générale :

   ```js
   const model = new CustomModel('Comment');
   await model.select({
     url: '/',
     user_id: ['!=', 0],
     createdAt: ['>', '2023-04-16 00:00:00'],
   });
   // SELECT * FROM Comment WHERE url = '/' AND user_id != 0 AND createdAt > "2023-04-16 00:00:00";
   ```

2. Requête IN / NOT IN

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

3. Requête LIKE

   ```js
   const model = new CustomModel('Comment');
   await model.select({ content: ['LIKE', '%content%'] });
   // SELECT * FROM Comment WHERE content LIKE "%content%";
   ```

4. Requête multi-conditions

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

5. Requête composée

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

Si vous êtes plus à l'aise avec TypeScript, [les définitions de type des requêtes conditionnelles se trouvent ici](https://github.com/walinejs/dittorm/blob/master/src/types/where.ts).

## Implémenter la requête

Les méthodes `select`, `update`, `delete` et `count` de l'adaptateur sont en réalité complexes en ce qui concerne la requête conditionnelle. Après avoir compris la syntaxe des requêtes conditionnelles dans la partie précédente, la logique suivante relève des opérations de base de données.

La méthode `select()` possède un second argument `{desc, limit, offset, field}`. Il est également plus simple à comprendre :

- `desc` : spécifie le champ selon lequel trier par ordre décroissant de la valeur de ce champ
- `limit` : spécifie le nombre de données renvoyées
- `offset` : spécifie à partir de quel élément les données sont renvoyées
- `field` : spécifie les champs à renvoyer ; par défaut, tous les champs sont renvoyés

La méthode `update()` doit gérer les scénarios où le paramètre `data` peut être une fonction de calcul, par exemple pour incrémenter de 1 le nombre de vues :

```js
const model = new CustomModel('Count');
await model.update((thread) => ({ view: thread.view + 1 }), { url: '/' });
```

Type de retour : `select()` renvoie toujours un tableau ; `add()` et `update()` doivent inclure l'ensemble des données du champ indexé.

## Pour aller plus loin

Sur la base de la logique ci-dessus, outre la mise en œuvre de services de stockage de bases de données professionnelles, l'équipe officielle a également implémenté, de manière très intéressante, un service de stockage GitHub. Nous stockons les données de GitHub sous forme de fichier CSV, récupérons le contenu du fichier CSV à chaque requête, filtrons les données finales en JS selon l'instruction de requête conditionnelle, puis les renvoyons. Voici l'implémentation officielle, en espérant qu'elle vous servira de référence.

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
