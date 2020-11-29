const jwt = require('jsonwebtoken');

module.exports = class extends think.Logic {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.service(`storage/${this.config('storage')}`, 'Users');
  }

  async __before() {
    this.ctx.state.userInfo = {};

    const {authorization} = this.ctx.req.headers;
    if(!authorization) {
      return;
    }
    const token = authorization.replace(/^Bearer /, '');
    const userMail = jwt.verify(token, think.config('jwtKey'));
    if(think.isEmpty(userMail) || !think.isString(userMail)) {
      return;
    }
  
    const user = await this.modelInstance.select(
      {email: userMail},
      {field: ['email', 'display_name', 'type']}
    );
    if(!think.isEmpty(user)) {
      this.ctx.state.userInfo = user[0];
    }
  }
}