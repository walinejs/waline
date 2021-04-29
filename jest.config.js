const { resolve } = require('path');

module.exports = {
  rootDir: resolve(__dirname),
  collectCoverage: true,
  transform: {
    '\\.js$': 'babel-jest',
  },
  testMatch: ['<rootDir>/packages/**/__tests__/**/*.spec.js'],
};
