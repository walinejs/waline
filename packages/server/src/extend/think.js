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
};
