ncc build index.js
node -e "pkg = require('./package.json'); pkg.version += '-deta'; delete pkg.dependencies['think-model-sqlite']; delete pkg.scripts; console.log(JSON.stringify(pkg, null, '\t'));" > ./dist/package.json
cd dist && npm publish --tag deta