const { GITHUB_ID, GITHUB_SECRET } = process.env;

module.exports = function () {
  const socials = [['github', GITHUB_ID && GITHUB_SECRET]]
    .filter(([_, condition]) => condition)
    .map(([name]) => name);

  return (ctx) => {
    ctx.type = 'html';
    ctx.body = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Waline Management System</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
  </head>
  <body>
    <script>
    window.SITE_URL = ${JSON.stringify(process.env.SITE_URL)};
    window.SITE_NAME = ${JSON.stringify(process.env.SITE_NAME)};
    window.ALLOW_SOCIALS = ${JSON.stringify(socials)};
    </script>
    <script src="https://cdn.jsdelivr.net/npm/@waline/admin"></script>
  </body>
</html>`;
  };
};
