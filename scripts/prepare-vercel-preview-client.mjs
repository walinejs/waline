import { cp, rm } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const clientDist = resolve(root, 'packages/client/dist');
const fixtureClient = resolve(root, 'packages/server/__tests__/fixtures/vercel/client');

await rm(fixtureClient, { force: true, recursive: true });
await cp(clientDist, fixtureClient, { recursive: true });
