const {
  LEAN_KEY,
  MYSQL_DB,
  MYSQL_PASSWORD
} = process.env;

let storage = 'leancloud';
let jwtKey = LEAN_KEY;
if(MYSQL_DB) {
  storage = 'mysql';
  jwtKey = MYSQL_PASSWORD;
}

module.exports = {
  workers: 1,
  storage, 
  jwtKey  
};
