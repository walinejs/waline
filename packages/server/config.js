// packages/server/config.js
const path = require('path');

module.exports = {
  db: 'sqlite',

  // SQLite 配置
  sqlite: {
    // 数据库文件存放路径
    path: path.join(__dirname, 'data', 'waline.sqlite'),
  },
  // JWT 密钥，用于加密用户信息，请修改为随机字符串
  jwtSecret: 'uEb_R$E@r2#p*',
};
