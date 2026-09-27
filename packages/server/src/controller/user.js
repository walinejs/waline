const BaseRest = require('./rest.js');

module.exports = class UserController extends BaseRest {
  getAction() {
    const input = this.get();

    return this.runCore((core, ctx) =>
      input.email ? core.user.get(input, ctx) : core.user.list(input, ctx),
    );
  }

  postAction() {
    return this.runCore((core, ctx) => core.user.register(this.post(), ctx));
  }

  putAction() {
    return this.runCore((core, ctx) =>
      core.user.update({ objectId: this.id || undefined, data: this.post() }, ctx),
    );
  }

  deleteAction() {
    return this.runCore((core, ctx) => core.user.remove({ objectId: this.id }, ctx));
  }
};
