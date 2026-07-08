const nunjucks = require('nunjucks');
const { PasswordHash } = require('phpass');

const defaultLocales = require('../locales/index.js');

const defaultLang = 'en-us';

const normalizeList = (value) => {
  if (!value) {
    return [];
  }

  return (Array.isArray(value) ? value : String(value).split(/\s*,\s*/u)).filter(Boolean);
};

const invalidRedirectError = 'Invalid login redirect URL.';

const getOrigin = (url) => {
  try {
    return new URL(url).origin;
  } catch {
    return null;
  }
};

module.exports = {
  success(...args) {
    this.ctx.success(...args);

    return think.prevent();
  },
  fail(...args) {
    this.ctx.fail(...args);

    return think.prevent();
  },
  jsonOrSuccess(...args) {
    return this[this.ctx.state.deprecated ? 'json' : 'success'](...args);
  },
  validateLoginRedirect(redirectUrl) {
    const allowedOrigins = normalizeList(this.config('loginRedirectAllowlist'))
      .map(getOrigin)
      .filter(Boolean);

    if (!redirectUrl || !allowedOrigins.length) {
      return redirectUrl;
    }

    if (
      redirectUrl !== redirectUrl.trim() ||
      /[\u0000-\u001F\u007F]/u.test(redirectUrl) ||
      redirectUrl.startsWith('\\') ||
      /^[\\/]{2}/u.test(redirectUrl)
    ) {
      throw new Error(invalidRedirectError);
    }

    let parsedUrl;

    try {
      parsedUrl = new URL(redirectUrl);
    } catch {
      return redirectUrl;
    }

    if (
      !['http:', 'https:'].includes(parsedUrl.protocol) ||
      !allowedOrigins.includes(parsedUrl.origin)
    ) {
      throw new Error(invalidRedirectError);
    }

    return redirectUrl;
  },
  locale(message, variables) {
    const { lang: userLang } = this.get();
    const lang = (userLang || defaultLang).toLowerCase();

    const customLocales = this.config('locales');
    const locales = customLocales || defaultLocales;

    const localMessage =
      locales?.[lang]?.[message] ||
      defaultLocales?.[lang]?.[message] ||
      defaultLocales[defaultLang][message];

    if (localMessage) {
      message = localMessage;
    }

    return nunjucks.renderString(message, variables);
  },
  getModel(modelName) {
    const { storage, customModel } = this.config();

    if (typeof customModel === 'function') {
      const modelInstance = customModel(modelName, this);

      if (modelInstance) {
        return modelInstance;
      }
    }

    return this.service(`storage/${storage}`, modelName);
  },
  hashPassword(password) {
    const PwdHash = this.config('encryptPassword') || PasswordHash;
    const pwdHash = new PwdHash();

    return pwdHash.hashPassword(password);
  },
  checkPassword(password, storeHash) {
    const PwdHash = this.config('encryptPassword') || PasswordHash;
    const pwdHash = new PwdHash();

    return pwdHash.checkPassword(password, storeHash);
  },
};
