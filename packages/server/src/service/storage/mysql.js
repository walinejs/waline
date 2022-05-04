const Base = require('./base');

module.exports = class extends Base {
  parseWhere(filter) {
    const where = {};
    if (think.isEmpty(filter)) {
      return where;
    }

    for (const k in filter) {
      if (k === 'objectId') {
        where.id = filter[k];
        continue;
      }

      if (filter[k] === undefined) {
        where[k] = null;
        continue;
      }

      if (Array.isArray(filter[k])) {
        if (filter[k][0] === 'IN' && !filter[k][1].length) {
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

  async select(where, { desc, limit, offset, field } = {}) {
    const instance = this.model(this.tableName);
    instance.where(this.parseWhere(where));
    if (desc) {
      instance.order(`${desc} DESC`);
    }
    if (limit || offset) {
      instance.limit(offset || 0, limit);
    }
    if (field) {
      field.push('id');
      instance.field(field);
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

    instance.field([...group, 'COUNT(*) as count']);
    instance.group(group);
    return instance.select();
  }

  async add(data) {
    if (data.objectId) {
      data.id = data.objectId;
      delete data.objectId;
    }

    const instance = this.model(this.tableName);
    const id = await instance.add(data);
    return { ...data, objectId: id };
  }

  async update(data, where) {
    const list = await this.model(this.tableName)
      .where(this.parseWhere(where))
      .select();
    return Promise.all(
      list.map(async (item) => {
        const updateData = typeof data === 'function' ? data(item) : data;
        await this.model(this.tableName)
          .where({ id: item.id })
          .update(updateData);
        return { ...item, ...updateData };
      })
    );
  }

  async delete(where) {
    const instance = this.model(this.tableName);
    return instance.where(this.parseWhere(where)).delete();
  }
};
