const crypto = require('node:crypto');

const LOGIN_CODE_TTL = 5 * 60 * 1000;
const codes = new Map();

module.exports = class extends think.Service {
  create({ token, state = '' }) {
    const code = crypto.randomBytes(32).toString('base64url');
    const expiresAt = Date.now() + LOGIN_CODE_TTL;

    codes.set(code, { token, state, expiresAt });

    return { code, state };
  }

  exchange({ code, state = '' }) {
    const data = codes.get(code);

    codes.delete(code);

    if (!data || data.expiresAt < Date.now() || data.state !== state) {
      return null;
    }

    return data.token;
  }
};
