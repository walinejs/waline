module.exports = class extends think.Controller {
  async githubAction() {
    const instance = this.service('auth/github', this);
    const socialInfo = await instance.getUserInfo();
    return this.success(socialInfo);
  }
};
