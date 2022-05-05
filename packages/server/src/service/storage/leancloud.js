const AV = require('leancloud-storage');
const Base = require('./base');
const { LEAN_ID, LEAN_KEY, LEAN_MASTER_KEY, LEAN_SERVER } = process.env;

if (LEAN_ID && LEAN_KEY && LEAN_MASTER_KEY) {
  AV.Cloud.useMasterKey(true);
  AV.init({
    appId: LEAN_ID,
    appKey: LEAN_KEY,
    masterKey: LEAN_MASTER_KEY,
    // required for leancloud china
    serverURL: LEAN_SERVER,
  });
}
module.exports = class extends Base {
  parseWhere(className, where) {
    const instance = new AV.Query(className);
    if (think.isEmpty(where)) {
      return instance;
    }

    for (const k in where) {
      if (k === '_complex') {
        continue;
      }

      if (think.isString(where[k])) {
        instance.equalTo(k, where[k]);
        continue;
      }

      if (where[k] === undefined) {
        instance.doesNotExist(k);
      }

      if (Array.isArray(where[k])) {
        if (where[k][0]) {
          const handler = where[k][0].toUpperCase();
          switch (handler) {
            case 'IN':
              instance.containedIn(k, where[k][1]);
              break;
            case 'NOT IN':
              instance.notContainedIn(k, where[k][1]);
              break;
            case 'LIKE': {
              const first = where[k][1][0];
              const last = where[k][1].slice(-1);
              if (first === '%' && last === '%') {
                instance.contains(k, where[k][1].slice(1, -1));
              } else if (first === '%') {
                instance.endsWith(k, where[k][1].slice(1));
              } else if (last === '%') {
                instance.startsWith(k, where[k][1].slice(0, -1));
              }
              break;
            }
            case '!=':
              instance.notEqualTo(k, where[k][1]);
              break;
            case '>':
              instance.greaterThan(k, where[k][1]);
              break;
          }
        }
      }
    }
    return instance;
  }

  where(className, where) {
    if (!where._complex) {
      return this.parseWhere(className, where);
    }

    const filters = [];
    for (const k in where._complex) {
      if (k === '_logic') {
        continue;
      }

      const filter = this.parseWhere(className, {
        ...where,
        [k]: where._complex[k],
      });
      filters.push(filter);
    }

    return AV.Query[where._complex._logic](...filters);
  }

  async _select(where, { desc, limit, offset, field } = {}) {
    const instance = this.where(this.tableName, where);
    if (desc) {
      instance.descending(desc);
    }
    if (limit) {
      instance.limit(limit);
    }
    if (offset) {
      instance.skip(offset);
    }
    if (field) {
      instance.select(field);
    }

    const data = await instance.find().catch((e) => {
      if (e.code === 101) {
        return [];
      }
      throw e;
    });
    return data.map((item) => item.toJSON());
  }

  async select(where, options = {}) {
    let data = [];
    let ret = [];
    let offset = options.offset || 0;
    do {
      options.offset = offset + data.length;
      ret = await this._select(where, options);
      data = data.concat(ret);
    } while (ret.length === 100);

    return data;
  }

  async _getCmtGroupByMailUserIdCache(key, where) {
    if (this.tableName !== 'Comment' || key !== 'user_id_mail') {
      return [];
    }

    const cacheTableName = `cache_group_count_${key}`;
    const currentTableName = this.tableName;
    this.tableName = cacheTableName;
    const cacheData = await this.select({ _complex: where._complex });
    this.tableName = currentTableName;
    return cacheData;
  }

  async _setCmtGroupByMailUserIdCache(key, data) {
    if (this.tableName !== 'Comment' || key !== 'user_id_mail') {
      return;
    }

    const cacheTableName = `cache_group_count_${key}`;
    const currentTableName = this.tableName;
    this.tableName = cacheTableName;

    await think.promiseAllQueue(
      data.map((item) => {
        if (item.user_id && !think.isString(item.user_id)) {
          item.user_id = item.user_id.toString();
        }
        return this.add(item);
      }),
      1
    );
    this.tableName = currentTableName;
  }

  async _updateCmtGroupByMailUserIdCache(data, method) {
    if (this.tableName !== 'Comment') {
      return;
    }

    if (!data.user_id && !data.mail) {
      return;
    }

    const cacheTableName = `cache_group_count_user_id_mail`;
    const cacheData = await this.select({
      _complex: {
        _logic: 'or',
        user_id: think.isObject(data.user_id)
          ? data.user_id.toString()
          : data.user_id,
        mail: data.mail,
      },
    });
    if (think.isEmpty(data)) {
      return;
    }

    let count = cacheData[0].count;
    switch (method) {
      case 'add':
        if (data.status === 'approved') {
          count += 1;
        }
        break;
      case 'udpate_status':
        if (data.status === 'approved') {
          count += 1;
        } else {
          count -= 1;
        }
        break;
      case 'delete':
        count -= 1;
        break;
    }

    const currentTableName = this.tableName;
    this.tableName = cacheTableName;
    await this.update({ count }, { objectId: cacheData[0].objectId }).catch(
      (e) => {
        if (e.code === 101) {
          return;
        }
        throw e;
      }
    );
    this.tableName = currentTableName;
  }

  async count(where = {}, options = {}) {
    const instance = this.where(this.tableName, where);
    if (!options.group) {
      return instance.count(options).catch((e) => {
        if (e.code === 101) {
          return 0;
        }
        throw e;
      });
    }

    // get group count cache by group field where data
    const cacheData = await this._getCmtGroupByMailUserIdCache(
      options.group.join('_'),
      where
    );
    const cacheDataMap = {};
    for (let i = 0; i < cacheData.length; i++) {
      const key = options.group
        .map((item) => cacheData[i][item] || undefined)
        .join('_');
      cacheDataMap[key] = cacheData[i];
    }

    const counts = [];
    const countsPromise = [];
    for (let i = 0; i < options.group.length; i++) {
      const groupName = options.group[i];
      if (!where._complex || !Array.isArray(where._complex[groupName])) {
        continue;
      }

      const groupFlatValue = {};
      options.group.slice(0, i).forEach((group) => {
        groupFlatValue[group] = undefined;
      });

      for (let j = 0; j < where._complex[groupName][1].length; j++) {
        const cacheKey = options.group
          .map(
            (item) =>
              ({
                ...groupFlatValue,
                [groupName]: where._complex[groupName][1][j],
              }[item] || undefined)
          )
          .join('_');
        if (cacheDataMap[cacheKey]) {
          continue;
        }

        const groupWhere = {
          ...where,
          ...groupFlatValue,
          _complex: undefined,
          [groupName]: where._complex[groupName][1][j],
        };
        const countPromise = this.count(groupWhere, {
          ...options,
          group: undefined,
        }).then((num) => {
          counts.push({
            ...groupFlatValue,
            [groupName]: where._complex[groupName][1][j],
            count: num,
          });
        });
        countsPromise.push(countPromise);
      }
    }

    await think.promiseAllQueue(countsPromise, 1);
    // cache data
    await this._setCmtGroupByMailUserIdCache(options.group.join('_'), counts);
    return [...cacheData, ...counts];
  }

  async add(
    data,
    { access: { read = true, write = true } = { read: true, write: true } } = {}
  ) {
    const Table = AV.Object.extend(this.tableName);
    const instance = new Table();
    instance.set(data);

    const acl = new AV.ACL();
    acl.setPublicReadAccess(read);
    acl.setPublicWriteAccess(write);
    instance.setACL(acl);

    const resp = await instance.save();
    await this._updateCmtGroupByMailUserIdCache(data, 'add');
    return resp.toJSON();
  }

  async update(data, where) {
    const instance = this.where(this.tableName, where);
    const ret = await instance.find();

    return Promise.all(
      ret.map(async (item) => {
        const _oldStatus = item.get('status');
        if (think.isFunction(data)) {
          item.set(data(item.toJSON()));
        } else {
          item.set(data);
        }
        const _newStatus = item.get('status');
        if (_newStatus && _oldStatus !== _newStatus) {
          await this._updateCmtGroupByMailUserIdCache(data, 'update_status');
        }

        const resp = await item.save();
        return resp.toJSON();
      })
    );
  }

  async delete(where) {
    const instance = this.where(this.tableName, where);
    const data = await instance.find();
    await this._updateCmtGroupByMailUserIdCache(data, 'delete');

    return AV.Object.destroyAll(data);
  }
};
