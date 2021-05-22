const preventMessage = 'PREVENT_NEXT_PROCESS';

module.exports = {
  prevent() {
    throw new Error(preventMessage);
  },
  isPrevent(err) {
    return think.isError(err) && err.message === preventMessage;
  },
};
