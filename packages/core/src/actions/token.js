/* oxlint-disable import/no-commonjs, import/unambiguous, typescript/no-require-imports, typescript/no-var-requires, unicorn/prefer-module */

const { unauthorized } = require('../errors.js');

const getCurrentUser = ({ userInfo }) => userInfo || {};

const login = async (
  { email, password, code },
  { users, passwordHasher, tokens, avatar, config, twoFactor },
) => {
  const records = await users.select({ email });
  const [user] = records;

  if (!user || /^verify:/iu.test(user.type) || user.type === 'banned') {
    return null;
  }
  if (!passwordHasher.verify(password, user.password)) {
    return null;
  }
  if (user['2fa'] && !twoFactor?.verify(user['2fa'], code)) {
    return null;
  }

  const avatarUrl =
    user.avatar ||
    (await avatar.stringify({ mail: user.email, nick: user.display_name, link: user.url }));
  user.avatar =
    config.avatarProxy && !avatarUrl.includes(config.avatarProxy)
      ? `${config.avatarProxy}?url=${encodeURIComponent(avatarUrl)}`
      : avatarUrl;

  return { ...user, password: null, token: tokens.sign(user.objectId) };
};

const requireAuthenticated = ({ userInfo }) => {
  if (!userInfo || !userInfo.objectId) throw unauthorized();
  return userInfo;
};

module.exports = { getCurrentUser, login, requireAuthenticated };
