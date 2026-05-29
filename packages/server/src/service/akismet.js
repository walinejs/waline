const { Author, Blog, CheckResult, Client, Comment } = require('@cedx/akismet');

const DEFAULT_KEY = '70542d86693e';

module.exports = class extends think.Service {
  constructor(blog) {
    super(blog);

    const { AKISMET_KEY, SITE_URL } = process.env;
    const key = AKISMET_KEY || DEFAULT_KEY;

    if (key.toLowerCase() !== 'false') {
      this.akismet = new Client(key, new Blog({ url: blog || SITE_URL }));
    }
  }

  async check(comment) {
    const { SITE_URL } = process.env;

    if (!this.akismet) {
      return false;
    }

    const isValid = await this.akismet.verifyKey();

    if (!isValid) {
      throw new Error('Akismet API_KEY verify failed!');
    }

    const result = await this.akismet.checkComment(
      new Comment({
        author: new Author({
          ipAddress: comment.ip,
          name: comment.nick,
          email: comment.mail,
        }),
        content: comment.comment,
        permalink: SITE_URL ? SITE_URL + comment.url : undefined,
      }),
    );

    return result !== CheckResult.ham;
  }
};
