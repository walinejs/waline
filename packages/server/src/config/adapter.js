const {Console} = require('think-logger3');
const Mysql = require('think-model-mysql');
const Postgresql = require('think-model-postgresql');
let Sqlite = class {};
try {
  Sqlite = require('think-model-sqlite');
} catch(e) {
  console.log(e);
}

const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DB,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_PREFIX,
  MYSQL_CHARSET,
  SQLITE_PATH,
  SQLITE_DB,
  SQLITE_PREFIX,
  PG_DB,
  PG_HOST,
  PG_PASSWORD,
  PG_PORT,
  PG_PREFIX,
  PG_USER,
  MONGO_AUTHSOURCE,
  MONGO_DB,
  MONGO_HOST,
  MONGO_PASSWORD,
  MONGO_PORT,
  MONGO_REPLICASET,
  MONGO_USER,
} = process.env;
let type = 'common';
let mongoOpt = {
  replicaSet: MONGO_REPLICASET,
  authSource: MONGO_AUTHSOURCE
};
if(MONGO_DB) {
  type = 'mongo';
  for(const i in process.env) {
    if(/MONGO_OPT_/.test(i)) {
      const k = i.slice(10).toLocaleLowerCase().replace(/_([a-z])/g, (_, b) => b.toUpperCase());
      mongoOpt[k] = process.env[i];
    }
  }
} else if(PG_DB) {
  type = 'postgresql';
} else if(SQLITE_PATH) {
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
  mongo: {
    host: MONGO_HOST ? ( MONGO_HOST.startsWith('[') ? JSON.parse(MONGO_HOST) : MONGO_HOST ) : '127.0.0.1',
    port: MONGO_PORT ? ( MONGO_PORT.startsWith('[') ? JSON.parse(MONGO_PORT) : MONGO_PORT ) :  27017,
    user: MONGO_USER,
    password: MONGO_PASSWORD,
    database: MONGO_DB,
    options: mongoOpt
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
    charset: MYSQL_CHARSET || 'utf8mb4'
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
