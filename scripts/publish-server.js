import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const rootDir = path.join(import.meta.dirname, '..');
const serverDir = path.join(rootDir, 'packages/server');
const coreDir = path.join(rootDir, 'packages/core');
const dryRun = process.argv.includes('--dry-run');
const skipBuild = process.argv.includes('--skip-build');
const destinationIndex = process.argv.indexOf('--pack-destination');
const packDestination =
  destinationIndex === -1 ? rootDir : path.resolve(process.argv[destinationIndex + 1]);

if (destinationIndex !== -1 && !process.argv[destinationIndex + 1]) {
  throw new Error('--pack-destination requires a directory');
}

if (skipBuild && !dryRun) {
  throw new Error('--skip-build can only be used with --dry-run');
}

const readPackage = (directory) =>
  JSON.parse(fs.readFileSync(path.join(directory, 'package.json'), 'utf8'));

const run = (command, args, options = {}) =>
  execFileSync(command, args, {
    cwd: rootDir,
    stdio: 'inherit',
    ...options,
  });

const stageRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'waline-server-'));
const stageDir = path.join(stageRoot, 'package');
const npmOptions = {
  cwd: stageDir,
  env: {
    ...process.env,
    npm_config_cache: path.join(stageRoot, 'npm-cache'),
  },
};

try {
  if (!skipBuild) run('pnpm', ['--dir', coreDir, 'build']);

  fs.cpSync(serverDir, stageDir, {
    recursive: true,
    filter: (source) => path.basename(source) !== 'node_modules',
  });

  const serverPackage = readPackage(serverDir);
  const corePackage = readPackage(coreDir);

  serverPackage.dependencies['@waline/core'] = corePackage.version;
  serverPackage.bundledDependencies = ['@waline/core'];
  fs.writeFileSync(
    path.join(stageDir, 'package.json'),
    `${JSON.stringify(serverPackage, null, 2)}\n`,
  );

  const bundledCoreDir = path.join(stageDir, 'node_modules/@waline/core');
  fs.mkdirSync(bundledCoreDir, { recursive: true });
  fs.cpSync(path.join(coreDir, 'dist'), path.join(bundledCoreDir, 'dist'), {
    recursive: true,
  });
  fs.copyFileSync(path.join(coreDir, 'package.json'), path.join(bundledCoreDir, 'package.json'));
  fs.copyFileSync(path.join(rootDir, 'LICENSE'), path.join(bundledCoreDir, 'LICENSE'));
  fs.copyFileSync(path.join(rootDir, 'LICENSE'), path.join(stageDir, 'LICENSE'));

  if (dryRun) {
    fs.mkdirSync(packDestination, { recursive: true });
    run('npm', ['pack', '--pack-destination', packDestination], npmOptions);
  } else {
    run('npm', ['publish', '--access', 'public'], npmOptions);
  }
} finally {
  fs.rmSync(stageRoot, { recursive: true, force: true });
}
