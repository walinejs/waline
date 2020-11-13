const { PasswordHash } = require('phpass');
const BaseRest = require('./rest');

module.exports = class extends BaseRest {
  constructor(...args) {
    super(...arts);
    this.modelInstance = this.service('store/leancloud', 'Users');
  }

  postAction() {
    const data = this.post();

    const resp = await this.modelInstance.select({
      email: data.email
    });
    if(!think.isEmpty(resp)) {
      return this.fail('USER_EXIST');
    }
    
    const count = await this.modelInstance.count();
    data.password = (new PasswordHash()).hashPassword(data.password);
    data.type = think.isEmpty(count) ? 'administrator' : 'guest';

    await this.modelInstance.add(data);
    return this.success();
  }
}