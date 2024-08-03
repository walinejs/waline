//example: node scripts/workspace-publish.cjs @waline/client

const fs = require('fs');
const path = require('path');

const workspaceRoot = path.join(__dirname, '../');

setPkg(process.argv[2], getPkgs(workspaceRoot));

function getPkgs(workspaceRoot) {
  const workspacePkgRoot = path.join(workspaceRoot, 'packages');

  const dirs = fs
    .readdirSync(workspacePkgRoot)
    .filter((dir) => {
      const dirname = path.join(workspacePkgRoot, dir);
      const isDir = fs.statSync(dirname).isDirectory();

      if (!isDir) {
        return false;
      }

      try {
        const stat = fs.statSync(path.join(dirname, 'package.json'));

        return stat.isFile();
      } catch {
        return false;
      }
    })
    .map((dir) => {
      const dirname = path.join(workspacePkgRoot, dir);
      const pkg = require(path.join(dirname, 'package.json'));

      return [pkg.name, { dirname, info: pkg }];
    });

  return new Map(dirs);
}

function setPkg(pkg, pkgs) {
  const pkgMap = pkgs.get(pkg);

  if (!pkgMap) {
    return;
  }

  const depKeys = [
    'dependencies',
    'devDependencies',
    'peerDependencies',
    'optionalDependencies',
    'bundleDependencies',
  ];
  let writeFlag = false;

  depKeys.forEach((depKey) => {
    if (!pkgMap.info[depKey]) {
      return;
    }

    for (const depName in pkgMap.info[depKey]) {
      const ver = pkgMap.info[depKey][depName];

      if (!ver.startsWith('workspace')) {
        continue;
      }

      const workPkg = pkgs.get(depName);

      if (!workPkg) {
        continue;
      }

      pkgMap.info[depKey][depName] = workPkg.info.version;
      writeFlag = true;
    }
  });

  const handler = isCI()
    ? fs.writeFileSync.bind(fs, path.join(pkgMap.dirname, 'package.json'))
    : console.log.bind(console);

  if (writeFlag) handler(JSON.stringify(pkgMap.info, null, '\t'));
}

function isCI() {
  return process.env.CI;
}
