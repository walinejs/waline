const { parse } = require('url');

module.exports = class extends think.Service {
  constructor(app) {
    super(app);
    this.app = app;
  }

  getCompleteUrl(url = '') {
    if (url.slice(0, 4) === 'http') {
      try {
        const { host } = parse(url);

        if (this.app.host.toLowerCase() !== host.toLowerCase()) {
          throw new Error(403);
        }

        return url;
      } catch (err) {
        // ignore error
      }
    }
    const protocol = this.app.header('x-forwarded-proto') || 'http';

    if (!/^\//.test(url)) {
      url = `/${url}`;
    }

    return `${protocol}://${this.app.ctx.host}${url}`;
  }
};
