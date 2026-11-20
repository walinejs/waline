import { createWalineWorker } from '@waline/worker';
import type { D1Database } from '@waline/worker';

interface Env {
  DB: D1Database;
  JWT_TOKEN: string;
}

export default createWalineWorker<Env>();
