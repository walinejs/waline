const BaseRest = require('./rest.js');

module.exports = class SiteController extends BaseRest {
  getAction() {
    return this.runCore((core, ctx) => core.site.list({}, ctx), { json: true });
  }

  postAction() {
    const input = this.post();
    if (input.action === 'grant') {
      return this.runCore((core, ctx) => core.site.grant(input, ctx));
    }
    if (input.action === 'revoke') {
      return this.runCore((core, ctx) => core.site.revoke(input, ctx));
    }
    if (input.action === 'default') {
      return this.runCore((core, ctx) => core.site.setDefault(input, ctx));
    }
    return this.runCore((core, ctx) => core.site.create(input, ctx));
  }

  putAction() {
    return this.runCore((core, ctx) =>
      core.site.update({ siteId: this.get('siteId'), data: this.post() }, ctx),
    );
  }

  deleteAction() {
    return this.runCore((core, ctx) => core.site.remove({ siteId: this.get('siteId') }, ctx));
  }
};
