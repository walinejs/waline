// example: node scripts/workspace-publish.cjs @waline/client
import fs from 'node:fs';
import path from 'node:path';

const isCI = process.env.CI;

const packagesDir = path.join(import.meta.dirname, '../packages');

const getPkgs = async (pkgDir) => {
  const dirs = await Promise.all(
    fs
      .readdirSync(pkgDir)
      .filter((dir) => {
        const dirname = path.join(pkgDir, dir);
        const isDir = fs.statSync(dirname).isDirectory();

        if (!isDir) return false;

        try {
          const stat = fs.statSync(path.join(dirname, 'package.json'));

          return stat.isFile();
        } catch {
          return false;
        }
      })
      .map(async (dir) => {
        const dirname = path.join(pkgDir, dir);
        const pkg = (
          await import(path.join(dirname, 'package.json'), {
            with: { type: 'json' },
          })
        ).default;

        return [pkg.name, { dirname, info: pkg }];
      }),
  );

  return new Map(dirs);
};

function setPkg(pkg, pkgs) {
  const pkgMap = pkgs.get(pkg);

  if (!pkgMap) return;

  let writeFlag = false;

  const DEP_KEYS = [
    'dependencies',
    'devDependencies',
    'peerDependencies',
    'optionalDependencies',
    'bundleDependencies',
  ];

  DEP_KEYS.forEach((depKey) => {
    if (!pkgMap.info[depKey]) return;

    for (const depName in pkgMap.info[depKey]) {
      const version = pkgMap.info[depKey][depName];

      if (!version.startsWith('workspace:')) continue;

      const workPkg = pkgs.get(depName);

      if (!workPkg) continue;

      const range = ['workspace:^', 'workspace:~'].includes(version)
        ? version[version.length - 1]
        : '';

      pkgMap.info[depKey][depName] = range + workPkg.info.version;
      writeFlag = true;
    }
  });

  const handler = isCI
    ? fs.writeFileSync.bind(fs, path.join(pkgMap.dirname, 'package.json'))
    : console.log.bind(console);

  if (writeFlag) handler(JSON.stringify(pkgMap.info, null, 2) + '\n');
}

setPkg(process.argv[2], await getPkgs(packagesDir));
