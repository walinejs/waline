const AV = require('leancloud-storage');
const Base = require('./base');

AV.init({
  appId: process.env.LEAN_ID,
  appKey: process.env.LEAN_KEY,
  serverURL: process.env.LEAN_API
});

module.exports = class extends Base {
  constructor(ctx) {
    super(ctx);
    this.modelInstance = new AV.Query('Comment');
  }

  async recentAction() {
    const {count} = this.get();
    const comments = await this.modelInstance.descending('insertedAt').limit(count).find();
    return this.json(comments.map(comment => {
      const {ip, ...cmt} = comment.toJSON();
      return cmt;
    }));
  }

  async listAction() {
    const {url, page, pageSize} = this.get();
    const comments = await this.modelInstance
      .descending('insertedAt')
      .equalTo('url', url)
      .skip(Math.max((page - 1) * pageSize, 0))
      .limit(pageSize).find();

    return this.json(comments.map(comment => {
      const {ip, ...cmt} = comment.toJSON();
      return cmt;
    }));
  }

  async countAction() {
    const {url} = this.get();
    const count = await this.modelInstance.equalTo('url', url).count();
    return this.json(count);
  }
}