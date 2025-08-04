const { version } = require('../../package.json');

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
  <style>
    body {
      background-color: #121212;
      color: #ffffff;
    }
    .waline-wrapper {
      background-color: #1e1e1e;
      color: #ffffff;
    }
    :root {
      --waline-theme-color: #90caf9;
      --waline-bg-color: #1e1e1e;
      --waline-text-color: #ffffff;
      --waline-border-color: #333;
    }
  </style>
</head>
<body>
  <div id="waline" style="max-width: 800px; margin: 0 auto;"></div>
  <link href='//unpkg.com/@waline/client@v3/dist/waline.css' rel='stylesheet' />
  <script type="module">
    import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

    console.log(
      '%c @waline/server %c v1.32.3 ',
      'color: white; background: #0078E7; padding:5px 0;',
      'padding:4px;border:1px solid #0078E7;'
    );

    const params = new URLSearchParams(location.search.slice(1));
    const waline = init({
      el: '#waline',
      path: params.get('path') || '/',
      lang: params.get('lng') || undefined,
      serverURL: location.protocol + '//' + location.host + location.pathname.replace(/\/+$/, ''),
      dark: 'body',
      recaptchaV3Key: '',
      turnstileKey: '',
    });
  </script>
  <script defer src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015" integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ==" data-cf-beacon='{"version":"2024.11.0","token":"21914e6e44314e5284ded58a3b2890fc","r":1,"server_timing":{"name":{"cfCacheStatus":true,"cfEdge":true,"cfExtPri":true,"cfL4":true,"cfOrigin":true,"cfSpeedBrain":true},"location_startswith":null}}' crossorigin="anonymous"></script>
</body>
</html>`;
  }
};
