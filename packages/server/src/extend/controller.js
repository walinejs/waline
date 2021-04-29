module.exports = {
  success(...args) {
    this.ctx.success(...args);
    return think.prevent();
  },
  fail(...args) {
    this.ctx.fail(...args);
    return think.prevent();
  },
};
