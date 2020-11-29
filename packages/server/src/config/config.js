const cloudbase = require('@cloudbase/node-sdk');
const {
  JWT_TOKEN,
  LEAN_KEY,
  MYSQL_DB,
  MYSQL_PASSWORD,
  SQLITE_PATH,
  PG_DB,
  PG_PASSWORD,
  MONGO_DB,
  MONGO_PASSWORD,
  FORBIDDEN_WORDS,
  TCB_ENV
} = process.env;

let storage = 'leancloud';
let jwtKey = JWT_TOKEN || LEAN_KEY;
if(think.env === 'cloudbase' || TCB_ENV) {
  storage = 'cloudbase';
  jwtKey = jwtKey || cloudbase.SYMBOL_CURRENT_ENV || TCB_ENV;
} else if (MONGO_DB) {
  storage = 'mongodb';
  jwtKey = jwtKey || MONGO_PASSWORD;
} else if (PG_DB) {
  storage = 'mysql';
  jwtKey = jwtKey || PG_PASSWORD;
} else if (SQLITE_PATH) {
  storage = 'mysql';
} else if(MYSQL_DB) {
  storage = 'mysql';
  jwtKey = jwtKey || MYSQL_PASSWORD;
}

if(think.env === 'cloudbase' && storage === 'sqlite') {
  throw new Error('You can\'t use SQLite in CloudBase platform.');
}

let forbiddenWords = [];
if(FORBIDDEN_WORDS) {
  forbiddenWords = FORBIDDEN_WORDS.split(/\s*,\s*/);
}

module.exports = {
  workers: 1,
  storage, 
  jwtKey,
  forbiddenWords,
  disallowIPList: []
};
