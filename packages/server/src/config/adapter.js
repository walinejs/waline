const {Console} = require('think-logger3');
const Mysql = require('think-model-mysql');
const Sqlite = require('think-model-sqlite');
const Postgresql = require('think-model-postgresql');

const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DB,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_PREFIX,
  MYSQL_ENCODING,
  SQLITE_PATH,
  SQLITE_DB,
  SQLITE_PREFIX,
  PG_DB,
  PG_HOST,
  PG_PASSWORD,
  PG_PORT,
  PG_PREFIX,
  PG_USER
} = process.env;
let type = 'common';
if(PG_DB) {
  type = 'postgresql';
} if(SQLITE_PATH) {
  type = 'sqlite';
} else if(MYSQL_DB) {
  type = 'mysql';
}
exports.model = {
  type,
  common: {
    logSql: true,
    logger: msg => think.logger.info(msg)
  },
  postgresql: {
    handle: Postgresql,
    user: PG_USER,
    password: PG_PASSWORD,
    database: PG_DB,
    host: PG_HOST || '127.0.0.1',
    port: PG_PORT || '3211',
    connectionLimit: 1,
    prefix: PG_PREFIX || 'wl_'
  },
  sqlite: {
    handle: Sqlite, 
    path: SQLITE_PATH,
    database: SQLITE_DB || 'waline',
    connectionLimit: 1,
    prefix: SQLITE_PREFIX || 'wl_'
  },
  mysql: {
    handle: Mysql,
    dateStrings: true,
    host: MYSQL_HOST || '127.0.0.1',
    port: MYSQL_PORT || '3306',
    database: MYSQL_DB,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    prefix: MYSQL_PREFIX || 'wl_',
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
