const ip2region = require('dy-node-ip2region');
const helper = require('think-helper');
const preventMessage = 'PREVENT_NEXT_PROCESS';

const regionSearch = ip2region.create();

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
    if (!ip) return '';

    try {
      const search = helper.promisify(regionSearch.btreeSearch, regionSearch);
      const result = await search(ip);
      if (!result) {
        return '';
      }
      const { region } = result;
      const [, , province, city, isp] = region.split('|');
      const address = Array.from(new Set([province, city, isp]));
      return address.slice(0, depth).join(' ');
    } catch (e) {
      console.log(e);
      return '';
    }
  },
};
