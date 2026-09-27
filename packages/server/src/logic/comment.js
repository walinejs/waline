const Base = require('./base.js');

// Request validation and resource authorization are handled by @waline/core.
// Base still performs transport-level origin and session initialization.
module.exports = class CommentLogic extends Base {};
