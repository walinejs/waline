import Akismet from 'akismet';

const DEFAULT_KEY = '70542d86693e';

export default class extends think.Service {
  constructor(blog) {
    super(blog);

    const { AKISMET_KEY, SITE_URL } = process.env;
    const key = AKISMET_KEY || DEFAULT_KEY;

    if (key.toLowerCase() !== 'false') {
      this.akismet = Akismet.client({
        blog: blog || SITE_URL,
        apiKey: key,
      });
    }
  }

  async check(comment) {
    const { SITE_URL } = process.env;

    return new Promise((resolve, reject) => {
      if (!this.akismet) {
        reject(new Error('Akismet is not configured!'));
        return;
      }

      this.akismet.verifyKey((err, verifyKey) => {
        if (err) {
          reject(err);
          return;
        } else if (!verifyKey) {
          reject(new Error('Akismet API_KEY verify failed!'));
          return;
        }

        this.akismet.checkComment(
          {
            user_ip: comment.ip,
            permalink: SITE_URL + comment.url,
            comment_author: comment.nick,
            comment_content: comment.comment,
          },
          (err, spam) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(spam);
          },
        );
      });
    });
  }
}
