const Akismet = require('akismet');
const DEFAULT_KEY = '70542d86693e';

module.exports = function (comment, blog) {
  let { AKISMET_KEY, SITE_URL } = process.env;
  if (!AKISMET_KEY) {
    AKISMET_KEY = DEFAULT_KEY;
  }

  if (AKISMET_KEY.toLowerCase() === 'false') {
    return Promise.resolve(false);
  }

  return new Promise(function (resolve, reject) {
    const akismet = Akismet.client({ blog, apiKey: AKISMET_KEY });

    akismet.verifyKey(function (err, verifyKey) {
      if (err) {
        return reject(err);
      } else if (!verifyKey) {
        return reject(new Error('Akismet API_KEY verify failed!'));
      }

      akismet.checkComment(
        {
          user_ip: comment.ip,
          permalink: SITE_URL + comment.url,
          comment_author: comment.nick,
          comment_content: comment.comment,
        },
        function (err, spam) {
          if (err) {
            return reject(err);
          }
          resolve(spam);
        }
      );
    });
  });
};
