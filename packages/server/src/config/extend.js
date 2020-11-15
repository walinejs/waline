const Model = require('think-model');
const Mongo = require('think-mongo');

module.exports = [
  Model(think.app),
  Mongo(think.app)
];