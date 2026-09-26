/* oxlint-disable import/no-commonjs, import/unambiguous, typescript/no-require-imports, typescript/no-var-requires, unicorn/prefer-module */

const article = require('./actions/article.js');
const database = require('./actions/database.js');
const token = require('./actions/token.js');
const twoFactor = require('./actions/two-factor.js');
const errors = require('./errors.js');

module.exports = { ...article, ...database, ...token, ...twoFactor, ...errors };
