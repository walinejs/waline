const ip2region = require('dy-node-ip2region');
const helper = require('think-helper');
const parser = require('ua-parser-js');

const preventMessage = 'PREVENT_NEXT_PROCESS';

const regionSearch = ip2region.create(process.env.IP2REGION_DB);

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
  promiseAllQueue(promises, taskNum) {
    return new Promise((resolve, reject) => {
      if (!promises.length) {
        return resolve();
      }

      const ret = [];
      let index = 0;
      let count = 0;

      function runTask() {
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
      }

      for (let i = 0; i < taskNum; i++) {
        runTask();
      }
    });
  },
  async ip2region(ip, { depth = 1 }) {
    if (!ip || ip.includes(':')) return '';

    try {
      const search = helper.promisify(regionSearch.btreeSearch, regionSearch);
      const result = await search(ip);

      if (!result) {
        return '';
      }
      const { region } = result;
      const [, , province, city, isp] = region.split('|');
      const address = Array.from(
        new Set([province, city, isp].filter((v) => v)),
      );

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

    const level = think.findLastIndex(levels, (l) => l <= val);

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
        return middleware.filter((m) => think.isFunction(m));
      }
    });

    return middlewares.flat();
  },
  getPluginHook(hookName) {
    return think
      .pluginMap('hooks', (hook) =>
        think.isFunction(hook[hookName]) ? hook[hookName] : undefined,
      )
      .filter((v) => v);
  },
};
