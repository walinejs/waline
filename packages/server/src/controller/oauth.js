module.exports = class extends think.Controller {
  constructor(ctx) {
    super(ctx);
    this.modelInstance = this.service(`storage/${this.config('storage')}`, 'Users');
  }

  async githubAction() {
    const instance = this.service('auth/github', this);
    const userInfo = await instance.getUserInfo();

    const {email, github} = userInfo;
    const current = this.ctx.state.userInfo;

    if(think.isEmpty(current)) {
      const user = await this.modelInstance.select({email});
      if(think.isEmpty(user)) {
        const count = await this.modelInstance.count();
        const data = {
          ...userInfo,
          password: (new PasswordHash()).hashPassword(Math.random()),
          type: think.isEmpty(count) ? 'administrator' : 'guest'
        };
        await this.modelInstance.add(data);
      } else {
        await this.modelInstance.update({github}, {email});
      }
    } else {
      await this.modelInstance.update({github}, {objectId: current.objectId});
    }

    const {redirect} = this.get();
    if(redirect) {
      return this.redirect(redirect);
    }
    
    return this.success();
  }
};
