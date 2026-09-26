const core = require('@waline/core');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');

const createCorePorts = (controller) => {
  const getRepository = (name) => controller.getModel(name);

  return {
    avatar: controller.service('avatar'),
    config: controller.config(),
    counters: getRepository('Counter'),
    passwordHasher: {
      verify: (password, hash) => controller.checkPassword(password, hash),
    },
    tokens: {
      sign: (subject) => jwt.sign(subject, controller.config('jwtKey')),
    },
    twoFactor: {
      generate: (name) => {
        const { otpauth_url, base32: secret } = speakeasy.generateSecret({ length: 20, name });
        return { otpauth_url, secret };
      },
      verify: (secret, code) =>
        speakeasy.totp.verify({ secret, encoding: 'base32', token: code, window: 2 }),
    },
    users: getRepository('Users'),
  };
};

const createDatabaseRepositories = (controller) => ({
  Comment: controller.getModel('Comment'),
  Counter: controller.getModel('Counter'),
  Users: controller.getModel('Users'),
});

module.exports = { ...core, createCorePorts, createDatabaseRepositories };
