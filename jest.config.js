const { resolve } = require('path');

module.exports = {
  rootDir: resolve(__dirname),
  preset: 'ts-jest',
  // preset: "ts-jest/presets/js-with-babel",
  collectCoverage: true,
  testEnvironment: 'node',
  transform: {
    '\\.js$': 'babel-jest',
    '\\.ts$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json',
    },
  },
  testMatch: ['<rootDir>/packages/**/__tests__/**/*.spec.{js,ts}'],
};
