const Akismet = require('akismet');

const DEFAULT_KEY = '70542d86693e';

// oxlint-disable-next-line func-names
module.exports = async function (comment, blog) {
  let { AKISMET_KEY, SITE_URL } = process.env;

  if (!AKISMET_KEY) {
    AKISMET_KEY = DEFAULT_KEY;
  }

  if (AKISMET_KEY.toLowerCase() === 'false') {
    return false;
  }

  return new Promise((resolve, reject) => {
    const akismet = Akismet.client({ blog, apiKey: AKISMET_KEY });

    akismet.verifyKey((err, verifyKey) => {
      if (err) {
        reject(err);
        return;
      } else if (!verifyKey) {
        reject(new Error('Akismet API_KEY verify failed!'));
        return;
      }

      akismet.checkComment(
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
};
