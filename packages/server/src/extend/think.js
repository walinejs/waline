const fs = require('node:fs');
const { isIP } = require('node:net');
const path = require('node:path');

const { IP2Region } = require('ip2region/node');
const parser = require('ua-parser-js');

const preventMessage = 'PREVENT_NEXT_PROCESS';

// Field layout of the bundled ip2region XDB data,
// it is required when opening a custom XDB database.
const IP2REGION_FIELDS = ['country_name', 'region_name', 'city_name', 'isp', 'country_code'];

// `families` can not be combined with custom databases, so resolve the bundled
// XDB paths manually when only one of the address families is customized.
const getBundledDBPath = (family) =>
  path.join(
    path.dirname(require.resolve('ip2region/package.json')),
    `data/ip2region_v${family}.xdb`,
  );

const parseDatabaseFormat = (data) => {
  // IPIP databases start with a big-endian metadata length followed by JSON metadata.
  if (data.length > 5) {
    const metadataSize = data.readUInt32BE(0);

    if (metadataSize > 0 && metadataSize + 4 < data.length && data[4] === 0x7b) return 'ipip';
  }

  // ip2region XDB structure 2 (IPv4) and 3 (IPv4/IPv6).
  if (data.length > 4 && data.readUInt16LE(2) === 1) {
    const structure = data.readUInt16LE(0);

    if (structure === 2 || structure === 3) return 'xdb';
  }

  return null;
};

const getCustomDatabaseOptions = (dbPath) => {
  const data = fs.readFileSync(dbPath);
  const format = parseDatabaseFormat(data);

  if (!format) {
    throw new TypeError(
      `Unsupported ip2region database: ${dbPath}. Please use an ip2region XDB or an IPIP IPDB file, or unset the custom database path to use the bundled data.`,
    );
  }

  return format === 'xdb' ? { format, data, fields: IP2REGION_FIELDS } : { format, data };
};

const createIP2Region = () => {
  const ipv4db = process.env.IP2REGION_DB_V4 || process.env.IP2REGION_DB;
  const ipv6db = process.env.IP2REGION_DB_V6;

  // Map IPv4-mapped IPv6 addresses (e.g. `::ffff:127.0.0.1`) to IPv4 lookups.
  const options = { mappedIPv6: 'ipv4' };

  if (!ipv4db && !ipv6db) return new IP2Region(options);

  return new IP2Region({
    ...options,
    databases: {
      4: ipv4db
        ? getCustomDatabaseOptions(ipv4db)
        : { format: 'xdb', path: getBundledDBPath(4), fields: IP2REGION_FIELDS },
      6: ipv6db
        ? getCustomDatabaseOptions(ipv6db)
        : { format: 'xdb', path: getBundledDBPath(6), fields: IP2REGION_FIELDS },
    },
  });
};

// Cached IP2Region instance using IIFE closure pattern
// Instance is created on first access and reused for all subsequent calls
const getIP2RegionInstance = (() => {
  let instance = null;

  // oxlint-disable-next-line react/function-component-definition
  return () => {
    if (!instance) {
      instance = createIP2Region();
    }

    return instance;
  };
})();

const OS_VERSION_MAP = {
  Windows: {
    'NT 11.0': '11',
  },
};

module.exports = {
  prevent() {
    throw new Error(preventMessage);
  },
  isPrevent(err) {
    return think.isError(err) && err.message === preventMessage;
  },
  findLastIndex(arr, fn) {
    for (let i = arr.length - 1; i >= 0; i--) {
      const ret = fn(arr[i], i, arr);

      if (!ret) {
        continue;
      }

      return i;
    }

    return -1;
  },
  async promiseAllQueue(promises, taskNum) {
    return new Promise((resolve, reject) => {
      if (promises.length === 0) {
        resolve();

        return;
      }

      const ret = [];
      let index = 0;
      let count = 0;

      const runTask = () => {
        const idx = index;

        index += 1;
        if (index > promises.length) {
          return Promise.resolve();
        }

        return promises[idx].then((data) => {
          ret[idx] = data;
          count += 1;
          if (count === promises.length) {
            resolve(ret);
          }

          return runTask();
        }, reject);
      };

      for (let i = 0; i < taskNum; i++) {
        runTask();
      }
    });
  },
  async ip2region(ip, { depth = 1 }) {
    if (!ip || !isIP(ip)) return '';

    try {
      const res = getIP2RegionInstance().lookup(ip);

      if (!res) {
        return '';
      }

      const { country, subdivisions, city, isp } = res;
      const address = [
        ...new Set([subdivisions?.[0]?.name || country?.name, city?.name, isp].filter(Boolean)),
      ];
      return address.slice(0, depth).join(' ');
    } catch (err) {
      console.log(err);

      return '';
    }
  },
  uaParser(uaText) {
    const ua = parser(uaText);

    if (OS_VERSION_MAP[ua.os.name]?.[ua.os.version]) {
      ua.os.version = OS_VERSION_MAP[ua.os.name][ua.os.version];
    }

    return ua;
  },
  getLevel(val) {
    const levels = this.config('levels');
    const defaultLevel = 0;

    if (!val) {
      return defaultLevel;
    }

    // oxlint-disable-next-line unicorn/no-array-method-this-argument
    const level = think.findLastIndex(levels, (item) => item <= val);

    return level === -1 ? defaultLevel : level;
  },
  pluginMap(type, callback) {
    const plugins = think.config('plugins');
    const fns = [];

    if (!think.isArray(plugins)) {
      return fns;
    }

    for (const plugin of plugins) {
      if (!plugin?.[type]) {
        continue;
      }

      // oxlint-disable-next-line node/callback-return
      const res = callback(plugin[type]);

      if (!res) {
        continue;
      }

      fns.push(res);
    }

    return fns;
  },
  getPluginMiddlewares() {
    const middlewares = think.pluginMap('middlewares', (middleware) => {
      if (think.isFunction(middleware)) {
        return middleware;
      }

      if (think.isArray(middleware)) {
        return middleware.filter((item) => think.isFunction(item));
      }
    });

    return middlewares.flat();
  },
  getPluginHook(hookName) {
    return think
      .pluginMap('hooks', (hook) => (think.isFunction(hook[hookName]) ? hook[hookName] : null))
      .filter(Boolean);
  },
  buildUrl(path, query = {}) {
    const notEmptyQuery = {};

    for (const key in query) {
      if (!query[key]) {
        continue;
      }

      notEmptyQuery[key] = query[key];
    }

    const notEmptyQueryStr = new URLSearchParams(notEmptyQuery).toString();

    let destUrl = path;

    if (destUrl && notEmptyQueryStr) {
      destUrl += destUrl.includes('?') ? '&' : '?';
    }

    if (notEmptyQueryStr) {
      destUrl += notEmptyQueryStr;
    }

    return destUrl;
  },
};
