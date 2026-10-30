/**
 * GitHub storage entry point.
 *
 * This file only picks an implementation; both live in the sibling
 * ./github/ directory so this path stays the single thing the service loader
 * and the config need to know:
 *
 *   ./github/legacy.js    one CSV per table, upstream behaviour kept verbatim
 *                         (semantics included, quirks and all)
 *   ./github/sharded.js   sharded CSV store (see its header comment)
 *
 * GITHUB_STORAGE=sharded opts into the sharded store; anything else keeps the
 * legacy behaviour, so an unrelated upgrade never changes the data layout of an
 * existing deployment.
 *
 * Directory constraint: thinkjs loads src/service/** recursively and registers
 * every .js file under it as a service (storage/github/csv.js and so on), so
 * files in ./github/ must only export a class or an object — an arrow-function
 * export would break boot, because the loader assigns `__filename` on the
 * exported function's prototype. Reading environment variables or building
 * singletons at module scope is off-limits for the same reason: those modules
 * are require'd even in legacy mode, where the sharded store never runs.
 *
 * The adapter is deliberately named sharded.js rather than index.js: inside
 * ./github/, `require('./github')` resolves to this entry file, so an index.js
 * would turn every such typo into a self-require.
 */

const { isSharded } = require('./github/mode.js');

module.exports = isSharded() ? require('./github/sharded.js') : require('./github/legacy.js');
