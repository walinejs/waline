const cloudbase = require('@cloudbase/node-sdk');

const Base = require('./base.js');
const { normalizeOrder } = require('./order.js');
const { POPULARITY, REPLIES, isPopularityOrder, withoutPopularity } = require('./popularity.js');

const { TCB_ENV, TCB_ID, TCB_KEY } = process.env;
const app = cloudbase.init({
  env: TCB_ENV,
  secretId: TCB_ID,
  secretKey: TCB_KEY,
});

const db = app.database();
const _ = db.command;
const $ = db.command.aggregate;
const collections = {};

module.exports = class extends Base {
  async collection(tableName) {
    if (collections[tableName]) {
      return db.collection(tableName);
    }

    try {
      const instance = db.collection(tableName);

      await instance.count();
      collections[tableName] = true;

      return db.collection(tableName);
    } catch (err) {
      if (err.code === 'DATABASE_COLLECTION_NOT_EXIST') {
        await db.createCollection(tableName);
        collections[tableName] = true;

        return db.collection(tableName);
      }
      throw err;
    }
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
              reg = new RegExp(likePattern.slice(1, -1), 'u');
            } else if (first === '%') {
              reg = new RegExp(`${likePattern.slice(1)}$`, 'u');
            } else if (last === '%') {
              reg = new RegExp(`^${likePattern.slice(0, -1)}`, 'u');
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

    return filter;
  }

  where(instance, where, method = 'where') {
    const filter = this.parseWhere(where);

    if (!where._complex) {
      return instance[method](filter);
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

    return instance[method](_[where._complex._logic](...filters));
  }

  async _select(where, { desc, field, limit, offset, order } = {}) {
    let instance = await this.collection(this.tableName);

    instance = this.where(instance, where);
    const normalizedOrder = normalizeOrder(order, desc, (orderField) =>
      orderField === 'objectId' ? '_id' : orderField,
    );

    if (isPopularityOrder(normalizedOrder)) {
      const sameThread = $.and([$.eq(['$rid', '$$root']), $.eq(['$url', '$$url'])]);
      const replyScore = $.add([1, $.ifNull(['$like', 0])]);
      const repliesScore = $.arrayElemAt([`$${REPLIES}.score`, 0]);
      instance = this.where((await this.collection(this.tableName)).aggregate(), where, 'match');
      instance = instance
        .lookup({
          from: this.tableName,
          let: { root: '$_id', url: '$url' },
          pipeline: $.pipeline()
            .match({ status: _.nin(['waiting', 'spam']) })
            .match(_.expr(sameThread))
            .group({ _id: null, score: $.sum(replyScore) })
            .done(),
          as: REPLIES,
        })
        .addFields({
          [POPULARITY]: $.add([$.ifNull(['$like', 0]), $.ifNull([repliesScore, 0])]),
        })
        .sort(
          Object.fromEntries(
            normalizedOrder.map(({ field, direction }) => [
              field === 'popularity' ? POPULARITY : field,
              direction === 'desc' ? -1 : 1,
            ]),
          ),
        );

      if (offset) instance = instance.skip(offset);
      if (limit) instance = instance.limit(limit);
      instance = instance.project(
        field
          ? Object.fromEntries(
              ['_id', ...field].map((key) => [key === 'objectId' ? '_id' : key, 1]),
            )
          : { [POPULARITY]: 0, [REPLIES]: 0 },
      );
      const { data } = await instance.end();

      return data.map(({ _id, ...cmt }) => ({
        ...withoutPopularity(cmt),
        objectId: _id.toString(),
      }));
    }

    for (const { field: orderField, direction } of normalizedOrder) {
      instance = instance.orderBy(orderField, direction);
    }

    if (limit) {
      instance = instance.limit(limit);
    }

    if (offset) {
      instance = instance.skip(offset);
    }

    if (field) {
      const filedObj = {};

      field.forEach((f) => (filedObj[f] = true));
      instance = instance.field(filedObj);
    }

    const { data } = await instance.get();

    return data.map(({ _id, ...cmt }) => ({
      ...cmt,
      objectId: _id.toString(),
    }));
  }

  async select(where, options = {}) {
    const data = [];
    let ret = [];
    const offset = options.offset ?? 0;
    const { limit } = options;

    while (true) {
      const remaining = limit == null ? undefined : limit - data.length;
      const batchLimit = remaining == null ? undefined : Math.min(remaining, 100);

      // oxlint-disable-next-line no-underscore-dangle
      ret = await this._select(where, {
        ...options,
        limit: batchLimit,
        offset: offset + data.length,
      });
      data.push(...ret);

      if (ret.length < 100 || (limit != null && data.length >= limit)) break;
    }

    return data;
  }

  async count(where = {}, { group } = {}) {
    let instance = await this.collection(this.tableName);

    if (!group) {
      instance = this.where(instance, where);
      const { total } = await instance.count();

      return total;
    }

    // oxlint-disable-next-line no-underscore-dangle
    const _id = {};

    group.forEach((f) => {
      _id[f] = `$${f}`;
    });
    instance = instance.aggregate();
    this.where(instance, where, 'match');
    instance = instance.group({ _id, count: $.sum(1) });
    const { data } = await instance.end();

    return data.map(({ _id, count }) => ({ ..._id, count }));
  }

  async add(data) {
    if (data.objectId) {
      // oxlint-disable-next-line no-underscore-dangle
      data._id = data.objectId;
      delete data.objectId;
    }

    const instance = await this.collection(this.tableName);
    const { id } = await instance.add(data);

    return { ...data, objectId: id };
  }

  async update(data, where) {
    const instance = await this.collection(this.tableName);
    const { data: list } = await this.where(instance, where).get();

    return Promise.all(
      list.map(async (item) => {
        const updateData = typeof data === 'function' ? data(item) : data;
        const instance = await this.collection(this.tableName);

        // oxlint-disable-next-line no-underscore-dangle
        await instance.doc(item._id).update(updateData);

        return { ...item, ...updateData };
      }),
    );
  }

  async delete(where) {
    const instance = await this.collection(this.tableName);

    return this.where(instance, where).remove();
  }
};
