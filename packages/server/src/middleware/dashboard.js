module.exports = function() {
  return ctx =>  {
    ctx.type = 'html';
    ctx.body = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Waline Management System</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
  </head>
  <body>
    <script src="https://cdn.jsdelivr.net/npm/@waline/admin"></script>
  </body>
</html>`;
  }
}