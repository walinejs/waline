const DEFAULT_KEY = '70542d86693e';

module.exports = async function (comment, blog) {
  let { AKISMET_KEY, SITE_URL } = process.env;

  if (!AKISMET_KEY) {
    AKISMET_KEY = DEFAULT_KEY;
  }

  if (AKISMET_KEY.toLowerCase() === 'false') {
    return false;
  }

  const { Author, Blog, CheckResult, Client, Comment } =
    await import('@cedx/akismet');

  const client = new Client(AKISMET_KEY, new Blog({ url: blog }));
  const isValid = await client.verifyKey();

  if (!isValid) {
    throw new Error('Akismet API_KEY verify failed!');
  }

  const result = await client.checkComment(
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
};
