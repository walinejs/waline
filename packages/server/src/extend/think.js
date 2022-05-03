const preventMessage = 'PREVENT_NEXT_PROCESS';

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
};
