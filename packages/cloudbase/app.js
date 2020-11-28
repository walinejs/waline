const http = require('http');
const Waline = require('@waline/vercel');

module.exports = http.createServer(Waline());