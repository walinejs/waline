const crypto = require('node:crypto');

const tencentcloud = require('tencentcloud-sdk-nodejs');

const Base = require('./base.js');

const TcbClient = tencentcloud.tcb.v20180608.Client;
const {
  TCB_ENV,
  TCB_ID,
  TCB_KEY,
  TCB_REGION,
  TENCENTCLOUD_REGION,
  TENCENTCLOUD_SECRETID,
  TENCENTCLOUD_SECRETKEY,
  TENCENTCLOUD_SECRET_ID,
  TENCENTCLOUD_SECRET_KEY,
} = process.env;

const client = new TcbClient({
  credential: {
    secretId: TCB_ID || TENCENTCLOUD_SECRETID || TENCENTCLOUD_SECRET_ID,
    secretKey: TCB_KEY || TENCENTCLOUD_SECRETKEY || TENCENTCLOUD_SECRET_KEY,
  },
  region: TENCENTCLOUD_REGION || TCB_REGION || 'ap-shanghai',
});

const collections = {};

const isPlainObject = (value) => Object.prototype.toString.call(value) === '[object Object]';

const serialize = (value) => {
  if (value instanceof Date) {
    return { $date: value.toISOString() };
  }

  if (value instanceof RegExp) {
    return {
      $regularExpression: {
        pattern: value.source,
        options: value.flags,
      },
    };
  }

  if (Array.isArray(value)) {
    return value.map((item) => serialize(item));
  }

  if (!isPlainObject(value)) {
    return value;
  }

  return Object.fromEntries(
    Object.entries(value).flatMap(([key, item]) =>
      item === undefined ? [] : [[key, serialize(item)]],
    ),
  );
};

const deserialize = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => deserialize(item));
  }

  if (!isPlainObject(value)) {
    return value;
  }

  if (Object.keys(value).length === 1) {
    if ('$oid' in value) {
      return value.$oid;
    }

    if ('$numberLong' in value) {
      return Number(value.$numberLong);
    }

    if ('$date' in value) {
      if (isPlainObject(value.$date) && '$numberLong' in value.$date) {
        return new Date(Number(value.$date.$numberLong));
      }

      return new Date(value.$date);
    }
  }

  return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, deserialize(item)]));
};

const parseCommandResult = (response) => {
  const [result] = response?.Data || [];

  if (!result) {
    return {};
  }

  return deserialize(typeof result === 'string' ? JSON.parse(result) : result);
};

const normalizeDocument = ({ _id, ...data }) => ({
  ...data,
  objectId: _id?.toString?.() ?? _id,
});

module.exports = class extends Base {
  async collection(tableName) {
    if (collections[tableName]) {
      return tableName;
    }

    try {
      await client.CreateTable({
        EnvId: TCB_ENV,
        TableName: tableName,
      });
    } catch (err) {
      await client
        .DescribeTable({
          EnvId: TCB_ENV,
          TableName: tableName,
        })
        .catch(() => {
          throw err;
        });
    }

    collections[tableName] = true;

    return tableName;
  }

  parseWhere(where) {
    if (think.isEmpty(where)) {
      return {};
    }

    const filter = {};
    const parseKey = (key) => (key === 'objectId' ? '_id' : key);

    for (const key in where) {
      if (key === '_complex') {
        continue;
      }

      if (think.isString(where[key])) {
        filter[parseKey(key)] = { $eq: where[key] };
        continue;
      }

      if (where[key] === undefined) {
        filter[parseKey(key)] = { $eq: null };
      }

      if (Array.isArray(where[key]) && where[key][0]) {
        const handler = where[key][0].toUpperCase();

        switch (handler) {
          case 'IN': {
            filter[parseKey(key)] = { $in: where[key][1] };
            break;
          }
          case 'NOT IN': {
            filter[parseKey(key)] = { $nin: where[key][1] };
            break;
          }
          case 'LIKE': {
            const [, likePattern] = where[key];
            const [first] = likePattern;
            const last = likePattern.slice(-1);
            let reg;

            if (first === '%' && last === '%') {
              reg = new RegExp(likePattern.slice(1, -1), 'u');
            } else if (first === '%') {
              reg = new RegExp(`${likePattern.slice(1)}$`, 'u');
            } else if (last === '%') {
              reg = new RegExp(`^${likePattern.slice(0, -1)}`, 'u');
            }

            if (reg) {
              filter[parseKey(key)] = reg;
            }

            break;
          }
          case '!=': {
            filter[parseKey(key)] = { $ne: where[key][1] };
            break;
          }
          case '>': {
            filter[parseKey(key)] = { $gt: where[key][1] };
            break;
          }
          default: {
            break;
          }
        }
      }
    }

    return filter;
  }

  where(where) {
    const filter = this.parseWhere(where);

    if (!where._complex) {
      return filter;
    }

    const filters = [];

    for (const key in where._complex) {
      if (key === '_logic') {
        continue;
      }

      filters.push({
        ...this.parseWhere({ [key]: where._complex[key] }),
        ...filter,
      });
    }

    return { [`$${where._complex._logic}`]: filters };
  }

  async runCommand(commandType, command) {
    await this.collection(this.tableName);

    const response = await client.RunCommands({
      EnvId: TCB_ENV,
      MgoCommands: [
        {
          TableName: this.tableName,
          CommandType: commandType,
          Command: JSON.stringify(serialize(command)),
        },
      ],
    });

    return parseCommandResult(response);
  }

  async _select(where, { desc, limit, offset, field } = {}) {
    const projection = field ? Object.fromEntries(field.map((item) => [item, 1])) : undefined;
    const result = await this.runCommand('QUERY', {
      find: this.tableName,
      filter: this.where(where),
      ...(desc ? { sort: { [desc]: -1 } } : {}),
      ...(limit ? { limit } : { limit: 100 }),
      ...(offset ? { skip: offset } : {}),
      ...(projection ? { projection } : {}),
    });
    const list =
      result?.cursor?.firstBatch ||
      result?.cursor?.nextBatch ||
      result?.documents ||
      result?.results ||
      result?.data ||
      result;

    return Array.isArray(list) ? list.map((item) => normalizeDocument(item)) : [];
  }

  async select(where, options = {}) {
    if (options.limit) {
      return this._select(where, options);
    }

    const data = [];
    let ret = [];
    const offset = options.offset ?? 0;

    do {
      ret = await this._select(where, {
        ...options,
        limit: 100,
        offset: offset + data.length,
      });
      data.push(...ret);
    } while (ret.length === 100);

    return data;
  }

  async count(where = {}, { group } = {}) {
    if (!group) {
      const result = await this.runCommand('COMMAND', {
        count: this.tableName,
        query: this.where(where),
      });

      return result.n ?? result.total ?? 0;
    }

    const result = await this.runCommand('COMMAND', {
      aggregate: this.tableName,
      pipeline: [
        { $match: this.where(where) },
        {
          $group: {
            _id: Object.fromEntries(group.map((item) => [item, `$${item}`])),
            count: { $sum: 1 },
          },
        },
      ],
      cursor: {},
    });
    const data = result?.cursor?.firstBatch || result?.cursor?.nextBatch || [];

    return data.map(({ _id, count }) => ({ ..._id, count }));
  }

  async add(data) {
    const objectId = data.objectId || crypto.randomUUID();
    const document = {
      ...data,
      _id: objectId,
    };

    delete document.objectId;

    await this.runCommand('INSERT', {
      insert: this.tableName,
      documents: [document],
    });

    return { ...data, objectId };
  }

  async update(data, where) {
    const list = await this.select(where);

    return Promise.all(
      list.map(async ({ objectId, ...item }) => {
        const updateData = typeof data === 'function' ? data({ ...item, objectId }) : data;
        const document = { ...updateData };

        delete document.objectId;

        await this.runCommand('UPDATE', {
          update: this.tableName,
          updates: [
            {
              q: { _id: objectId },
              u: { $set: document },
              multi: false,
              upsert: false,
            },
          ],
        });

        return { ...item, ...document, objectId };
      }),
    );
  }

  async delete(where) {
    return this.runCommand('DELETE', {
      delete: this.tableName,
      deletes: [
        {
          q: this.where(where),
          limit: 0,
        },
      ],
    });
  }
};
