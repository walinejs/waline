const BaseRest = require('./rest.js');

module.exports = class extends BaseRest {
  getAction() {
    const redirectUrl = this.get('url');

    return this.success({
      valid: this.isValidRedirect(redirectUrl),
      url: redirectUrl,
    });
  }

  isValidRedirect(redirectUrl) {
    if (!redirectUrl || typeof redirectUrl !== 'string') {
      return false;
    }

    if (redirectUrl.startsWith('/') && !redirectUrl.startsWith('//')) {
      return true;
    }

    let hostname = '';

    try {
      hostname = new URL(redirectUrl).hostname;
    } catch {
      return false;
    }

    let { secureDomains } = this.config();

    secureDomains = secureDomains
      ? think.isArray(secureDomains)
        ? secureDomains
        : [secureDomains]
      : [];
    secureDomains = [
      ...secureDomains,
      'localhost',
      '127.0.0.1',
      ...this.ctx.state.oauthServices.map(({ origin }) => origin),
    ];

    return secureDomains.filter(Boolean).some((domain) => {
      if (typeof domain === 'string' && domain.startsWith('/') && domain.endsWith('/')) {
        try {
          return new RegExp(domain.slice(1, -1), 'u').test(hostname);
        } catch (err) {
          think.logger.debug(err);

          return false;
        }
      }

      return domain === hostname;
    });
  }

  postAction() {}

  deleteAction() {}

  putAction() {}
};
