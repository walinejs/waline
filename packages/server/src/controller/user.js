const { PasswordHash } = require('phpass');
const BaseRest = require('./rest');

module.exports = class extends BaseRest {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.service(
      `storage/${this.config('storage')}`,
      'Users'
    );
  }

  async postAction() {
    const data = this.post();

    const resp = await this.modelInstance.select({
      email: data.email,
    });
    if (!think.isEmpty(resp)) {
      return this.fail('USER_EXIST');
    }

    const count = await this.modelInstance.count();
    data.password = new PasswordHash().hashPassword(data.password);
    data.type = think.isEmpty(count) ? 'administrator' : 'guest';

    await this.modelInstance.add(data);
    return this.success();
  }

  async putAction() {
    const { display_name, url, password, github } = this.post();
    const { objectId } = this.ctx.state.userInfo;

    const updateData = {};
    if (display_name) {
      updateData.display_name = display_name;
    }
    if (url) {
      updateData.url = url;
    }
    if (password) {
      updateData.password = new PasswordHash().hashPassword(password);
    }
    if (think.isString(github)) {
      updateData.github = github;
    }
    if (think.isEmpty(updateData)) {
      return this.success();
    }

    await this.modelInstance.update(updateData, { objectId });
    return this.success();
  }
};
