const {
  JWT_TOKEN,
  LEAN_KEY,
  MYSQL_DB,
  MYSQL_PASSWORD,
  SQLITE_PATH
} = process.env;

let storage = 'leancloud';
let jwtKey = JWT_TOKEN || LEAN_KEY;
if (SQLITE_PATH) {
  storage = 'mysql';
} else if(MYSQL_DB) {
  storage = 'mysql';
  jwtKey = MYSQL_PASSWORD;
}
module.exports = {
  workers: 1,
  storage, 
  jwtKey  
};
