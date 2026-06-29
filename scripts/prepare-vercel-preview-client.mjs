import { access, cp, readdir, rm } from 'node:fs/promises';
import { constants } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const clientDist = resolve(root, 'packages/client/dist');
const fixtureClient = resolve(root, 'packages/server/__tests__/fixtures/vercel/client');

await rm(fixtureClient, { force: true, recursive: true });
await cp(clientDist, fixtureClient, { recursive: true });

await Promise.all(
  ['waline.js', 'waline.css'].map((file) =>
    access(resolve(fixtureClient, file), constants.R_OK),
  ),
);

const assets = await readdir(fixtureClient);

console.log(`Copied ${assets.length} @waline/client preview assets into ${fixtureClient}`);
