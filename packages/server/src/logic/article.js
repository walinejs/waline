const Base = require('./base.js');

// Validation and authorization live in @waline/core. This class remains so
// ThinkJS keeps its existing controller/logic discovery contract.
module.exports = class ArticleLogic extends Base {};
