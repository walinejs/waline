const jwt = require('jsonwebtoken');
const { PasswordHash } = require('phpass');
const BaseRest = require('./rest');

module.exports = class extends BaseRest {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.service('storage/leancloud', 'Users');
  }

  getAction() {
    return this.json(this.ctx.state.userInfo);
  }

  async postAction() {
    const {email, password} = this.post();
    const user = await this.modelInstance.select({email});
    if(think.isEmpty(user)) {
      return this.fail();
    }

    const checkPassword = (new PasswordHash()).checkPassword(password, user[0].password);
    if(!checkPassword) {
      return this.fail();
    }

    return this.json({
      ...user[0], 
      token: jwt.sign(user[0].email, this.config('jwtKey'))
    });
  }

  deleteAction() {
    
  }
}