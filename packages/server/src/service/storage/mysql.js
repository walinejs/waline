const Base = require('./base.js');
const { normalizeOrder, toSqlOrder } = require('./order.js');
const { sqlPopularity } = require('./popularity.js');

module.exports = class extends Base {
  mapOrderField(field) {
    return field === 'objectId' ? 'id' : field;
  }

  getOrder(order, desc) {
    return normalizeOrder(order, desc, (field) => this.mapOrderField(field));
  }

  quoteIdentifier(value) {
    return `\`${value.replaceAll('`', '``')}\``;
  }

  getQueryOrder(order, instance) {
    return order.map((entry) =>
      entry.field === 'popularity'
        ? { ...entry, field: sqlPopularity(instance.tableName, (key) => this.quoteIdentifier(key)) }
        : entry,
    );
  }

  getSqlOrder(order, instance) {
    return toSqlOrder(this.getQueryOrder(order, instance));
  }

  parseWhere(filter) {
    const where = {};

    if (think.isEmpty(filter)) {
      return where;
    }

    for (const k in filter) {
      if (k === 'objectId' || k === 'objectid') {
        where.id = filter[k];
        continue;
      }

      if (k === '_complex') {
        where[k] = this.parseWhere(filter[k]);
        continue;
      }

      if (filter[k] === undefined) {
        where[k] = null;
        continue;
      }

      if (Array.isArray(filter[k])) {
        if (filter[k][0] === 'IN' && filter[k][1].length === 0) {
          continue;
        }

        if (think.isDate(filter[k][1])) {
          filter[k][1] = think.datetime(filter[k][1]);
        }
      }

      where[k] = filter[k];
    }

    return where;
  }

  async select(where, { desc, field, limit, offset, order } = {}) {
    const instance = this.model(this.tableName);

    instance.where(this.parseWhere(where));
    const normalizedOrder = this.getOrder(order, desc);

    if (normalizedOrder.length > 0) {
      instance.order(this.getSqlOrder(normalizedOrder, instance));
    }

    if (limit || offset) {
      instance.limit(offset ?? 0, limit);
    }

    if (field) {
      instance.field([...field, 'id']);
    }

    const data = await instance.select();

    return data.map(({ id, ...cmt }) => ({ ...cmt, objectId: id }));
  }

  async count(where = {}, { group } = {}) {
    const instance = this.model(this.tableName);

    instance.where(this.parseWhere(where));
    if (!group) {
      return instance.count();
    }

    instance.field([...group, 'COUNT(*) as count'].join(','));
    instance.group(group);

    return instance.select();
  }

  async add(data) {
    if (data.objectId) {
      data.id = data.objectId;
      delete data.objectId;
    }
    const date = new Date();

    data.createdAt ??= date;
    data.updatedAt ??= date;

    const instance = this.model(this.tableName);
    const id = await instance.add(data);

    return { ...data, objectId: id };
  }

  async update(data, where) {
    const list = await this.model(this.tableName).where(this.parseWhere(where)).select();

    return Promise.all(
      list.map(async (item) => {
        const updateData = typeof data === 'function' ? data(item) : data;

        await this.model(this.tableName).where({ id: item.id }).update(updateData);

        return { ...item, ...updateData };
      }),
    );
  }

  async delete(where) {
    const instance = this.model(this.tableName);

    return instance.where(this.parseWhere(where)).delete();
  }
};
