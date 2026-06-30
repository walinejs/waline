import { spawn } from 'node:child_process';
import { cp, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const clientDist = join(root, 'packages/client/dist');
const previewClient = join(root, 'packages/server/__tests__/fixtures/vercel/client');

const run = (command, args) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: root,
      shell: process.platform === 'win32',
      stdio: 'inherit',
    });

    child.on('error', reject);
    child.on('exit', (code, signal) => {
      if (code === 0) {
        resolve();
      } else {
        reject(
          new Error(
            signal
              ? `${command} ${args.join(' ')} exited with signal ${signal}`
              : `${command} ${args.join(' ')} exited with code ${code}`,
          ),
        );
      }
    });
  });

await run('pnpm', ['api:build']);
await run('pnpm', ['client:build']);
await rm(previewClient, { recursive: true, force: true });
await cp(clientDist, previewClient, { recursive: true });
