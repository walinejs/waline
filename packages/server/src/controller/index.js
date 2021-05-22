module.exports = class extends think.Controller {
  indexAction() {
    this.type = 'html';
    this.body = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Waline Example</title>
    </head>
    <body>
      <div id="waline" style="max-width: 800px;margin: 0 auto;"></div> <script src="https://cdn.jsdelivr.net/npm/@waline/client/dist/Waline.min.js"></script>
      <script>
        const waline = new Waline({
          el: '#waline',
          path: '/',
          serverURL: location.protocol + '//' + location.host + location.pathname.replace(/\\/+$/, '')
        });
      </script>
    </body>
    </html>`;
  }
};
