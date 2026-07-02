const tencentcloud = require('tencentcloud-sdk-nodejs');

const TcbClient = tencentcloud.tcb.v20180608.Client;
const { Credential } = tencentcloud.common;
const { ClientProfile, HttpProfile } = tencentcloud.common.profile;

const Base = require('./base.js');

const { TCB_ENV, TCB_ID, TCB_KEY, TCB_REGION = 'ap-shanghai' } = process.env;

const httpProfile = new HttpProfile();

httpProfile.endpoint = 'tcb.tencentcloudapi.com';

const clientProfile = new ClientProfile();

clientProfile.httpProfile = httpProfile;

const client = new TcbClient(new Credential(TCB_ID, TCB_KEY), TCB_REGION, clientProfile);
const collections = {};

const runCommand = async (tableName, commandType, command) => {
  const { Data } = await client.RunCommands({
    EnvId: TCB_ENV,
    MgoCommands: [
      {
        TableName: tableName,
        CommandType: commandType,
        Command: JSON.stringify(command),
      },
    ],
  });
  const [result = '[]'] = Data ?? [];

  return JSON.parse(result);
};

const parseDoc = (doc) => (typeof doc === 'string' ? JSON.parse(doc) : doc);

const normalizeDoc = ({ _id, ...doc }) => ({
  ...doc,
  objectId: _id?.toString(),
});

const eq = (value) => ({ $eq: value });
const neq = (value) => ({ $ne: value });
const gt = (value) => ({ $gt: value });
const includes = (value) => ({ $in: value });
const excludes = (value) => ({ $nin: value });
const sum = (value) => ({ $sum: value });
const and = (...filters) => ({ $and: filters });
const or = (...filters) => ({ $or: filters });

const _ = { eq, neq, gt, in: includes, nin: excludes, and, or };
const $ = { sum };

module.exports = class extends Base {
  async collection(tableName) {
    if (!collections[tableName]) {
      try {
        await runCommand(tableName, 'QUERY', { count: tableName });
      } catch (err) {
        if (err.code !== 'ResourceNotFound.Table') {
          throw err;
        }

        await runCommand(tableName, 'COMMAND', { create: tableName });
      }

      collections[tableName] = true;
    }

    return tableName;
  }

  parseWhere(where) {
    if (think.isEmpty(where)) {
      return {};
    }

    const filter = {};
    const parseKey = (k) => (k === 'objectId' ? '_id' : k);

    for (const k in where) {
      if (k === '_complex') {
        continue;
      }

      if (think.isString(where[k])) {
        filter[parseKey(k)] = _.eq(where[k]);
        continue;
      }
      if (where[k] === undefined) {
        filter[parseKey(k)] = _.eq(null);
      }

      if (Array.isArray(where[k]) && where[k][0]) {
        const handler = where[k][0].toUpperCase();

        switch (handler) {
          case 'IN': {
            filter[parseKey(k)] = _.in(where[k][1]);
            break;
          }
          case 'NOT IN': {
            filter[parseKey(k)] = _.nin(where[k][1]);
            break;
          }
          case 'LIKE': {
            const [, likePattern] = where[k];
            const [first] = likePattern;
            const last = likePattern.slice(-1);
            let reg;

            if (first === '%' && last === '%') {
              reg = { $regex: likePattern.slice(1, -1) };
            } else if (first === '%') {
              reg = { $regex: `${likePattern.slice(1)}$` };
            } else if (last === '%') {
              reg = { $regex: `^${likePattern.slice(0, -1)}` };
            }

            filter[parseKey(k)] = reg;
            break;
          }
          case '!=': {
            filter[parseKey(k)] = _.neq(where[k][1]);
            break;
          }
          case '>': {
            filter[parseKey(k)] = _.gt(where[k][1]);
            break;
          }
          default: {
            break;
          }
        }
      }
    }

    if (!where._complex) {
      return filter;
    }

    const filters = [];

    for (const k in where._complex) {
      if (k === '_logic') {
        continue;
      }

      filters.push({
        ...this.parseWhere({ [k]: where._complex[k] }),
        ...filter,
      });
    }

    return _[where._complex._logic](...filters);
  }

  async _select(where, { desc, limit, offset, field } = {}) {
    const tableName = await this.collection(this.tableName);
    const command = { find: tableName, filter: this.parseWhere(where) };

    if (desc) {
      command.sort = { [desc]: -1 };
    }

    if (limit) {
      command.limit = limit;
    }

    if (offset) {
      command.skip = offset;
    }

    if (field) {
      command.projection = {};
      field.forEach((f) => (command.projection[f] = 1));
    }

    const data = await runCommand(tableName, 'QUERY', command);

    return data.map((item) => normalizeDoc(parseDoc(item)));
  }

  async select(where, options = {}) {
    const data = [];
    let ret = [];
    const offset = options.offset ?? 0;

    do {
      options.offset = offset + data.length;
      // oxlint-disable-next-line no-underscore-dangle
      ret = await this._select(where, options);
      data.push(...ret);
    } while (ret.length === 100);

    return data;
  }

  async count(where = {}, { group } = {}) {
    const tableName = await this.collection(this.tableName);
    const filter = this.parseWhere(where);

    if (!group) {
      const { n = 0 } = await runCommand(tableName, 'QUERY', {
        count: tableName,
        query: filter,
      });

      return n;
    }

    // oxlint-disable-next-line no-underscore-dangle
    const _id = {};

    group.forEach((f) => {
      _id[f] = `$${f}`;
    });

    const data = await runCommand(tableName, 'QUERY', {
      aggregate: tableName,
      pipeline: [{ $match: filter }, { $group: { _id, count: $.sum(1) } }],
      cursor: {},
    });

    return (data.cursor?.firstBatch ?? data).map(({ _id, count }) => ({
      ..._id,
      count,
    }));
  }

  async add(data) {
    if (data.objectId) {
      // oxlint-disable-next-line no-underscore-dangle
      data._id = data.objectId;
      delete data.objectId;
    }

    const tableName = await this.collection(this.tableName);
    const result = await runCommand(tableName, 'INSERT', {
      insert: tableName,
      documents: [data],
    });
    const insertedId = result.insertedId ?? result.insertedIds?.[0];

    return { ...data, objectId: insertedId ?? data._id };
  }

  async update(data, where) {
    const tableName = await this.collection(this.tableName);
    const list = await this._select(where);

    return Promise.all(
      list.map(async (item) => {
        const updateData = typeof data === 'function' ? data(item) : data;

        await runCommand(tableName, 'UPDATE', {
          update: tableName,
          updates: [
            {
              q: { _id: item.objectId },
              u: { $set: updateData },
              multi: false,
            },
          ],
        });

        return { ...item, ...updateData };
      }),
    );
  }

  async delete(where) {
    const tableName = await this.collection(this.tableName);

    return runCommand(tableName, 'DELETE', {
      delete: tableName,
      deletes: [{ q: this.parseWhere(where), limit: 0 }],
    });
  }
};
