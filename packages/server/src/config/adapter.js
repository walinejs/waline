const {Console} = require('think-logger3');
const Mysql = require('think-model-mysql');

const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DB,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_PREFIX,
  MYSQL_ENCODING
} = process.env;
module.exports = {
  type: 'mysql',
  common: {
    logSql: true,
    logger: msg => think.logger.info(msg)
  },
  mysql: {
    handle: Mysql,
    dateStrings: true,
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    database: MYSQL_DB,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    prefix: MYSQL_PREFIX,
    encoding: MYSQL_ENCODING || 'utf8mb4'
  }
};
/**
 * logger adapter config
 * @type {Object}
 */
exports.logger = {
  type: 'console',
  console: {
    handle: Console
  }
};
