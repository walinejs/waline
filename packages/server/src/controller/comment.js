const BaseRest = require('./rest.js');

module.exports = class CommentController extends BaseRest {
  getAction() {
    const input = this.get();

    return this.runCore(
      (core, ctx) => {
        switch (input.type) {
          case 'recent': {
            return core.comment.listRecent(input, ctx);
          }
          case 'count': {
            return core.comment.count(input, ctx);
          }
          case 'list': {
            return core.comment.listForAdmin(input, ctx);
          }
          default: {
            return core.comment.list(input, ctx);
          }
        }
      },
      { json: true },
    );
  }

  postAction() {
    const input = this.post();

    return this.runCore((core, ctx) =>
      core.comment.create(
        {
          ...input,
          captcha: {
            turnstile: input.turnstile,
            recaptchaV3: input.recaptchaV3,
          },
        },
        ctx,
      ),
    );
  }

  putAction() {
    return this.runCore((core, ctx) =>
      core.comment.update({ objectId: this.id, data: this.post() }, ctx),
    );
  }

  deleteAction() {
    return this.runCore((core, ctx) => core.comment.remove({ objectId: this.id }, ctx));
  }
};
