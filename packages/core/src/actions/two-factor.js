/* oxlint-disable import/no-commonjs, import/unambiguous, typescript/no-require-imports, typescript/no-var-requires, unicorn/prefer-module */

const { unauthorized } = require('../errors.js');

const getTwoFactorSetup = async ({ email, userInfo }, { users, twoFactor }) => {
  if ((!userInfo || !userInfo.objectId) && email) {
    const usersByEmail = await users.select({ email }, { field: ['2fa'] });
    return { enable: Boolean(usersByEmail[0]?.['2fa']) };
  }
  if (!userInfo?.objectId) throw unauthorized();

  const name = `waline_${userInfo.objectId}`;
  if (userInfo['2fa']?.length === 32) {
    return {
      otpauth_url: `otpauth://totp/${name}?secret=${userInfo['2fa']}`,
      secret: userInfo['2fa'],
    };
  }

  return twoFactor.generate(name);
};

const enableTwoFactor = async ({ secret, code, userInfo }, { users, twoFactor }) => {
  if (!userInfo?.objectId) throw unauthorized();
  if (!twoFactor.verify(secret, code)) return null;

  await users.update({ '2fa': secret }, { objectId: userInfo.objectId });
  return {};
};

module.exports = { enableTwoFactor, getTwoFactorSetup };
