const fs = require('node:fs');
const path = require('node:path');

const adminBundlePath = path.resolve(__dirname, '../../../admin/dist/admin.js');

const getUiBasePath = (requestPath = '') =>
  requestPath.match(/^(.*?\/ui)(?:$|\/.*$)/u)?.[1] || '/ui';

// oxlint-disable-next-line func-names
module.exports = function () {
  return (ctx) => {
    const uiBasePath = getUiBasePath(ctx.path);
    const localAdminAssetPath = `${uiBasePath}/assets/admin.js`;
    const localAdminBundleAvailable = fs.existsSync(adminBundlePath);

    if (ctx.path === localAdminAssetPath) {
      if (!localAdminBundleAvailable) {
        ctx.status = 404;
        ctx.body = 'Local admin bundle not found';
        return;
      }

      ctx.type = 'js';
      ctx.body = fs.createReadStream(adminBundlePath);
      return;
    }

    const adminScriptSrc = localAdminBundleAvailable
      ? `${localAdminAssetPath}?v=${encodeURIComponent(require('../../../admin/package.json').version)}`
      : process.env.WALINE_ADMIN_MODULE_ASSET_URL || '//unpkg.com/@waline/admin';
    const scriptType = localAdminBundleAvailable ? ' type="module"' : '';

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
    window.recaptchaV3Key = ${JSON.stringify(process.env.RECAPTCHA_V3_KEY)};
    window.turnstileKey = ${JSON.stringify(process.env.TURNSTILE_KEY)};
    window.oauthServices = ${JSON.stringify(ctx.state.oauthServices || [])};
    window.serverURL = '${ctx.serverURL}/api/';
    </script>
    <script${scriptType} src="${adminScriptSrc}"></script>
  </body>
</html>`;
  };
};
